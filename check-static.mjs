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
const index=read('index.html').toString('utf8');
assert.equal(index,read('orsay.html').toString('utf8'),'both entry URLs serve the latest museum');
assert.equal(digest(read('index.html')),manifest.sourceSha256);
assert(!/file:\/\/|\/Users\/|localhost:\d|127\.0\.0\.1/.test(index),'no machine-specific runtime URLs');
const scripts=[...index.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(scripts,manifest.scripts,'manifest preserves main script order and content fingerprints');
assert(Array.isArray(manifest.thumbnails),'The package records thumbnail assets separately from originals');
const runtimeFiles=[...new Set(['index.html','orsay.html',...scripts,...manifest.images,...manifest.thumbnails,...manifest.extraAssets].map(localFile))];
for(const file of runtimeFiles){
  const stat=fs.statSync(path.join(dist,file));
  assert(stat.isFile()&&stat.size>0,file);
}
assert.equal(runtimeFiles.length,manifest.runtimeFiles,'runtime file count is unique and ignores URL query strings');
assert.equal(runtimeFiles.reduce((bytes,file)=>bytes+read(file).length,0),manifest.bytes,'runtime byte count matches the package');
const linked=[];
for(const html of [index]){
  transformReferences(html,(reference,key)=>{
    const url=new URL(reference.replaceAll('&amp;','&'),projectBase);
    assert(url.pathname.startsWith('/orsay-slow-walk/'),'resource remains within the GitHub Pages project');
    if(key==='v'){
      const file=localFile(reference);
      linked.push(file);
      assert.equal(url.searchParams.get('v'),digest(read(file)).slice(0,16),'resource URL must match its own bytes: '+file);
      assert(runtimeFiles.includes(file),'all public JS and CSS are packaged: '+file);
      assert(manifest.release.inputs.includes(file),'build ID covers linked resource: '+file);
    }else assert.equal(url.searchParams.get('build'),manifest.release.cacheKey,'museum links use the current public build');
    return reference;
  });
  for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g))if(!/\bsrc\s*=/.test(m[1]))new vm.Script(m[2]);
}
for(const script of new Set(linked.filter(file=>file.endsWith('.js'))))new vm.Script(read(script).toString('utf8'),{filename:script});
const cacheScope={window:{}};
vm.runInNewContext(read('image-cache-manifest.js').toString('utf8'),cacheScope,{timeout:1000});
assert.deepEqual([...new Set(Object.values(cacheScope.window.ORSAY_LOCAL_IMAGES).map(localFile))].sort(),manifest.images);
vm.runInNewContext(read('image-thumbnail-manifest.js').toString('utf8'),cacheScope,{timeout:1000});
const thumbnailEntries=Object.entries(cacheScope.window.ORSAY_LOCAL_THUMBNAILS||{}).map(([original,preview])=>[localFile(original),localFile(preview)]);
assert.deepEqual(thumbnailEntries.map(([original])=>original).sort(),manifest.images,'Thumbnail mapping covers every packaged original');
assert.deepEqual([...new Set(thumbnailEntries.map(([,preview])=>preview))].sort(),manifest.thumbnails,'Thumbnail asset list is complete and deduplicated');
assert(manifest.thumbnails.every(file=>/^assets\/image-thumbnails\/[a-f0-9]{24}\.webp$/.test(file)),'Only generated preview paths belong in thumbnails');
assert(linked.includes('image-thumbnail-manifest.js'),'The museum loads the packaged thumbnail manifest');
assert(manifest.images.length>=201,'retain the previously published image cache while expanding');
assert(manifest.extraAssets.includes('orsay-collection.css'),'room folio stylesheet is packaged');
assert.equal(manifest.release.kind,'public');
assert.equal(manifest.release.hashMethod,'canonical-cache-urls-v1');
assert(!manifest.review,'public manifest has no review entry');
for(const file of fs.readdirSync(dist))assert(!file.startsWith('orsay-review')||file==='orsay-review-additions.js','no review center files or aliases: '+file);
assert(!/ORSAY_REVIEW_MODE|ORSAY_REVIEW_BUILD|review-mode|orsay-review\.html|orsay-review-bridge/.test(index),'query parameters cannot activate inspection mode');
assert(index.includes('const orsayStorageKey=key=>key;'),'ordinary visits retain their existing storage keys');
assert(manifest.release.inputs.includes('orsay.html'),'build ID includes the public entry');
const releaseHash=crypto.createHash('sha256');
for(const file of manifest.release.inputs){
  const content=read(file);
  releaseHash.update(file+'\n').update(file.endsWith('.html')?canonicalHTML(content.toString('utf8')):content).update('\n');
}
assert.equal(releaseHash.digest('hex'),manifest.release.sha256,'public version matches scene files after removing only generated URL fingerprints');
assert.equal(manifest.release.cacheKey,manifest.release.sha256.slice(0,16));
assert(read('orsay-room28-clock.svg').toString('utf8').includes('<svg'));
assert(!fs.existsSync(path.join(dist,'output'))&&!fs.existsSync(path.join(dist,'tmp'))&&!fs.existsSync(path.join(dist,'sources')),'only runtime assets are hosted');
console.log(JSON.stringify({status:'PASS',entry:'index.html',kind:'public',scripts:scripts.length,images:manifest.images.length,thumbnails:manifest.thumbnails.length,cacheKey:manifest.release.cacheKey,sourceSha256:manifest.sourceSha256,bytes:manifest.bytes,browserVerified:false}));
