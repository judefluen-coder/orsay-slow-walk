import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url)),dist=path.join(root,'site');
const projectBase='https://judefluen-coder.github.io/orsay-slow-walk/';
const manifest=JSON.parse(fs.readFileSync(path.join(root,'static-manifest.json'),'utf8'));
const digest=content=>crypto.createHash('sha256').update(content).digest('hex');
function localFile(reference){
  const file=String(reference).split(/[?#]/)[0];
  assert(file&&!/^(?:[a-z][\w+.-]*:|[\\/])/i.test(file)&&!file.includes('\\')&&!file.split('/').includes('..'),'portable runtime asset: '+reference);
  return file.replace(/^\.\//,'');
}
const read=reference=>fs.readFileSync(path.join(dist,localFile(reference)));
function withoutParameter(reference,key){
  const [withoutHash,...hash]=reference.replaceAll('&amp;','&').split('#');
  const [file,...query]=withoutHash.split('?'),parameters=new URLSearchParams(query.join('?'));
  parameters.delete(key);
  return file+(parameters.size?'?'+parameters.toString():'')+(hash.length?'#'+hash.join('#'):'');
}
function transformReferences(html,transform){
  return html.replace(/<(script|link|iframe|a)\b[^>]*>/gi,(tag,kind)=>{
    const attribute=['script','iframe'].includes(kind.toLowerCase())?'src':'href';
    return tag.replace(new RegExp('\\b'+attribute+'\\s*=\\s*(["\\\'])(.*?)\\1','i'),(match,quote,reference)=>{
      const filename=reference.split(/[?#]/)[0];
      const asset=(kind.toLowerCase()==='script'&&filename.endsWith('.js'))||(kind.toLowerCase()==='link'&&filename.endsWith('.css'));
      const entry=['iframe','a'].includes(kind.toLowerCase())&&filename==='orsay.html';
      return asset||entry?attribute+'='+quote+transform(reference,asset?'v':'build')+quote:match;
    });
  });
}
const canonicalHTML=html=>transformReferences(html,withoutParameter);
const index=read('index.html').toString('utf8'),review=read('orsay-review.html').toString('utf8');
assert.equal(index,read('orsay.html').toString('utf8'),'both entry URLs serve the latest museum');
assert.equal(digest(read('index.html')),manifest.sourceSha256);
for(const html of [index,review])assert(!/file:\/\/|\/Users\/|localhost:\d|127\.0\.0\.1/.test(html),'no machine-specific runtime URLs');
const scripts=[...index.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(scripts,manifest.scripts,'manifest preserves main script order and content fingerprints');
const runtimeFiles=[...new Set(['index.html','orsay.html',...scripts,...manifest.images,...manifest.extraAssets].map(localFile))];
for(const file of runtimeFiles){
  const stat=fs.statSync(path.join(dist,file));
  assert(stat.isFile()&&stat.size>0,file);
}
assert.equal(runtimeFiles.length,manifest.runtimeFiles,'runtime file count is unique and ignores URL query strings');
assert.equal(runtimeFiles.reduce((bytes,file)=>bytes+read(file).length,0),manifest.bytes,'runtime byte count matches the package');
const linked=[];
for(const html of [index,review]){
  transformReferences(html,(reference,key)=>{
    const url=new URL(reference.replaceAll('&amp;','&'),projectBase);
    assert(url.pathname.startsWith('/orsay-slow-walk/'),'resource remains within the GitHub Pages project');
    if(key==='v'){
      const file=localFile(reference);
      linked.push(file);
      assert.equal(url.searchParams.get('v'),digest(read(file)).slice(0,16),'resource URL must match its own bytes: '+file);
      assert(runtimeFiles.includes(file),'all main/review JS and CSS are packaged: '+file);
      if(file!=='orsay-review-version.js')assert(manifest.review.inputs.includes(file),'build ID covers linked resource: '+file);
    }else assert.equal(url.searchParams.get('build'),manifest.review.cacheKey,'museum links and review frame use the current build');
    return reference;
  });
  for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g))if(!/\bsrc\s*=/.test(m[1]))new vm.Script(m[2]);
}
for(const script of new Set(linked.filter(file=>file.endsWith('.js'))))new vm.Script(read(script).toString('utf8'),{filename:script});
const cacheScope={window:{}};
vm.runInNewContext(read('image-cache-manifest.js').toString('utf8'),cacheScope,{timeout:1000});
assert.deepEqual([...new Set(Object.values(cacheScope.window.ORSAY_LOCAL_IMAGES).map(localFile))].sort(),manifest.images);
assert(manifest.images.length>=201,'retain the previously published image cache while expanding');
assert(manifest.extraAssets.includes('orsay-collection.css'),'room folio stylesheet is packaged');
const iframe=review.match(/<iframe\b[^>]*\bid="museumFrame"[^>]*\bsrc="([^"]+)"/)?.[1];
assert(iframe,'standalone review has the actual museum frame');
const iframeURL=new URL(iframe.replaceAll('&amp;','&'),projectBase);
assert.equal(iframeURL.pathname,'/orsay-slow-walk/orsay.html');
assert.equal(iframeURL.searchParams.get('review'),'1','standalone review retains inspection mode');
assert.equal(iframeURL.searchParams.get('build'),manifest.review.cacheKey,'review requests current museum HTML');
assert(!index.includes('href="orsay-review.html"'),'ordinary visits have no inspection UI entry');
assert.equal(manifest.review.hashMethod,'canonical-cache-urls-v1');
assert(!manifest.review.inputs.includes('orsay-review-version.js'),'generated version has no hash self-reference');
for(const file of ['orsay.html','orsay-review.html'])assert(manifest.review.inputs.includes(file),'build ID includes both entry pages');
const reviewHash=crypto.createHash('sha256');
for(const file of manifest.review.inputs){
  const content=read(file);
  reviewHash.update(file+'\n').update(file.endsWith('.html')?canonicalHTML(content.toString('utf8')):content).update('\n');
}
assert.equal(reviewHash.digest('hex'),manifest.review.sha256,'review version matches all scene and tool files after removing only generated URL fingerprints');
assert.equal(manifest.review.cacheKey,manifest.review.sha256.slice(0,16));
const versionScope={window:{}};
vm.runInNewContext(read('orsay-review-version.js').toString('utf8'),versionScope,{timeout:1000});
assert.equal(versionScope.window.ORSAY_REVIEW_BUILD.sha256,manifest.review.sha256);
assert(read('orsay-room28-clock.svg').toString('utf8').includes('<svg'));
assert(!fs.existsSync(path.join(dist,'output'))&&!fs.existsSync(path.join(dist,'tmp'))&&!fs.existsSync(path.join(dist,'sources')),'only runtime assets are hosted');
console.log(JSON.stringify({status:'PASS',entry:'index.html',scripts:scripts.length,images:manifest.images.length,cacheKey:manifest.review.cacheKey,sourceSha256:manifest.sourceSha256,bytes:manifest.bytes,browserVerified:false}));
