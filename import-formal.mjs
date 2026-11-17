import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url)),dist=path.join(root,'site');
assert(process.argv[2],'Usage: node import-formal.mjs <museum source directory>');
const source=path.resolve(process.argv[2]);
assert(source!==dist,'Import from the development source, not the publication directory');
const digest=content=>crypto.createHash('sha256').update(content).digest('hex');
const unique=values=>[...new Set(values)];
const reviewFiles=['orsay-review.html','orsay-review.js','orsay-review-center.css','orsay-review.css','orsay-review-version.js','orsay-review-bridge.js','orsay-review/index.html'];
function localFile(reference){
  const file=String(reference).split(/[?#]/)[0];
  assert(file&&!/^(?:[a-z][\w+.-]*:|[\\/])/i.test(file)&&!file.includes('\\')&&!file.split('/').includes('..'),'portable runtime asset: '+reference);
  return file.replace(/^\.\//,'');
}
function withParameter(reference,key,value){
  const [withoutHash,...hash]=reference.replaceAll('&amp;','&').split('#');
  const [file,...query]=withoutHash.split('?'),parameters=new URLSearchParams(query.join('?'));
  parameters.delete(key);
  if(value!==null)parameters.set(key,value);
  return file+(parameters.size?'?'+parameters.toString():'')+(hash.length?'#'+hash.join('#'):'');
}
function transformReferences(html,transform){
  return html.replace(/<(script|link|a)\b[^>]*>/gi,(tag,kind)=>{
    const attribute=kind.toLowerCase()==='script'?'src':'href';
    return tag.replace(new RegExp('\\b'+attribute+'\\s*=\\s*(["\'])(.*?)\\1','i'),(match,quote,reference)=>{
      const filename=reference.split(/[?#]/)[0];
      const asset=(kind.toLowerCase()==='script'&&filename.endsWith('.js'))||(kind.toLowerCase()==='link'&&filename.endsWith('.css'));
      return asset||filename==='orsay.html'?attribute+'='+quote+transform(reference,asset?'v':'build')+quote:match;
    });
  });
}
let html=fs.readFileSync(path.join(source,'orsay.html'),'utf8');
html=html.replace(/^.*<(?:script|link)\b[^>]*(?:src|href)=["'](orsay-review(?:-version|-bridge)?\.(?:js|css))(?:\?[^"']*)?["'][^>]*>.*\r?\n/gm,'');
const reviewMode="const ORSAY_REVIEW_MODE=new URLSearchParams(location.search).get('review')==='1';\nconst orsayStorageKey=key=>ORSAY_REVIEW_MODE?`orsay-review:${key}`:key;\nif(ORSAY_REVIEW_MODE)document.documentElement?.classList?.add('review-mode');";
assert.equal(html.split(reviewMode).length,2,'review integration must match the inspected source');
html=html.replace(reviewMode,'const orsayStorageKey=key=>key;');
html=transformReferences(html,(reference,key)=>withParameter(reference,key,null));
assert(!/ORSAY_REVIEW_MODE|orsay-review-(?:bridge|version)|orsay-review\.css/.test(html));
const linked=[];
transformReferences(html,(reference,key)=>{if(key==='v')linked.push(localFile(reference));return reference;});
const cacheScope={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(source,'image-cache-manifest.js'),'utf8'),cacheScope,{timeout:1000});
const images=unique(Object.values(cacheScope.window.ORSAY_LOCAL_IMAGES).map(localFile)).sort();
assert(images.length,'Image cache must not be empty');
vm.runInNewContext(fs.readFileSync(path.join(source,'image-thumbnail-manifest.js'),'utf8'),cacheScope,{timeout:1000});
const thumbnailEntries=Object.entries(cacheScope.window.ORSAY_LOCAL_THUMBNAILS||{}).map(([original,preview])=>[localFile(original),localFile(preview)]);
assert.deepEqual(thumbnailEntries.map(([original])=>original).sort(),images,'Every original must have a thumbnail mapping');
const thumbnails=unique(thumbnailEntries.map(([,preview])=>preview)).sort();
assert(thumbnails.every(file=>/^assets\/image-thumbnails\/[a-f0-9]{24}\.webp$/.test(file)),'Thumbnail paths must refer to generated previews');
assert(linked.includes('image-thumbnail-manifest.js'),'The museum must load its thumbnail manifest');
// review-additions contains actual artwork records; it is not the review tool.
const extraAssets=unique(['orsay-room28-clock.svg',...linked.filter(file=>file.endsWith('.css'))]);
const inputs=unique(['orsay.html',...linked,...extraAssets]);
const runtimeFiles=unique(['index.html',...inputs,...images,...thumbnails]);
assert(!runtimeFiles.some(file=>reviewFiles.includes(file)),'Review tools must not enter the public package');
const contents=new Map([['orsay.html',Buffer.from(html)]]);
for(const file of runtimeFiles.filter(file=>!['index.html','orsay.html'].includes(file))){
  const bytes=fs.readFileSync(path.join(source,localFile(file)));
  assert(bytes.length,'Empty runtime asset: '+file);
  contents.set(file,bytes);
}
const hash=crypto.createHash('sha256');
for(const file of inputs)hash.update(file+'\n').update(contents.get(file)).update('\n');
const sha256=hash.digest('hex'),cacheKey=sha256.slice(0,16);
html=transformReferences(html,(reference,key)=>withParameter(reference,key,key==='v'?digest(contents.get(localFile(reference))).slice(0,16):cacheKey));
contents.set('orsay.html',Buffer.from(html));
contents.set('index.html',contents.get('orsay.html'));
// All inputs are validated before changing the GitHub package. The source stays intact.
for(const [file,bytes] of contents){
  const destination=path.join(dist,file);
  fs.mkdirSync(path.dirname(destination),{recursive:true});
  fs.writeFileSync(destination,bytes);
}
for(const file of reviewFiles)fs.rmSync(path.join(dist,file),{force:true});
const oldAlias=path.join(dist,'orsay-review');
if(fs.existsSync(oldAlias)&&fs.readdirSync(oldAlias).length===0)fs.rmdirSync(oldAlias);
fs.writeFileSync(path.join(dist,'.nojekyll'),'');
const manifest={entry:'index.html',primarySource:'orsay.html',sourceSha256:digest(contents.get('index.html')),
  scripts:[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match=>match[1]),images,thumbnails,extraAssets,
  bytes:runtimeFiles.reduce((bytes,file)=>bytes+contents.get(file).length,0),runtimeFiles:runtimeFiles.length,
  release:{kind:'public',inputs,sha256,hashMethod:'canonical-cache-urls-v1',cacheKey}};
fs.writeFileSync(path.join(root,'static-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({status:'PACKAGED',kind:'public',cacheKey,scripts:manifest.scripts.length,images:images.length,thumbnails:thumbnails.length,runtimeFiles:runtimeFiles.length}));
