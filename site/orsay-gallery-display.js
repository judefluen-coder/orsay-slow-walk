// Connect the existing room corpus to walking, without upgrading catalogue locations
// into measured wall positions. Original paintings and circulation anchors stay intact.
(() => {
  const collection=window.ORSAY_COLLECTION_UI;
  if(!collection)return;
  const key=work=>collection.sourceKey(work);
  const baseline=new Map((window.ORSAY_EXISTING_DISPLAY_LAYOUT||[]).map(item=>[item.zone,item]));
  const cache=new Map();
  const relocated=new Set(['hortaAubecqEnsemble1904','damptKnightFireplace1906','gervex1885jury','fritelPoetry1900','fritelApollo1900']);
  const escape=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sourceId=work=>String(work.source||'').match(/\/(?:oeuvres|artworks)\/[^/?#]+-(\d+)/)?.[1];
  const sculptureIds=new Set(['16058','4813','15496','15567','15564','15645','6300','5029','16029']);
  const isSculpture=(work,zone)=>work.objectType==='sculpture'||sculptureIds.has(sourceId(work))||/terrace-(?:1870|1880|rodin)/.test(zone)&&!['89351','9493'].includes(sourceId(work));
  function bounds(zone){
    if(zone==='5-35')return [54,510];
    if(zone==='5-36')return [530,1890];
    if(zone==='5-37')return [1910,2400];
    if(zone==='0-sculpture')return [640,W-80];
    if(zone==='0-aisle')return [54,590];
    if(zone==='5-cachin')return [CACHIN_BEND_X+90,WING_W-90];
    return [player.zone==='seine2'?200:64,navigationSceneWidth()-74];
  }
  function standable(zone,x,y){
    const previous=player.zone;
    try{if(zone==='2-terrace-1880')player.zone='terrace1880';return canMove(x,y)}finally{player.zone=previous}
  }
  // Capacity belongs to the room, not to the number of catalogue records.
  // Keep one readable foreground face; the complete corpus remains in the folio.
  function frontSpans(zone){
    const [left,right]=bounds(zone),old=baseline.get(zone)||{images:[],doors:[]};
    let spans=[[left+14,right-14]];
    const cuts=(old.doors||[]).filter(d=>d.facing==='down').map(d=>[d.x-75,d.x+75]);
    for(const image of old.images)if(501<image.y+image.h+53&&620>image.y-13)cuts.push([image.x-20,image.x+image.w+20]);
    for(const [a,b] of cuts)spans=spans.flatMap(([l,r])=>b<=l||a>=r?[[l,r]]:[[l,Math.max(l,a)],[Math.min(r,b),r]].filter(([x,y])=>y>x));
    return spans;
  }
  function frontSlots(zone,count){
    const places=[],w=132,h=64,gap=60,margin=14;
    for(const [left,right] of frontSpans(zone)){
      const capacity=Math.max(0,Math.floor((right-left-2*margin+gap)/(w+gap)));
      const n=Math.min(capacity,count-places.length);
      for(let i=0;i<n;i++){
        const x=left+(right-left)/2+(i-(n-1)/2)*(w+gap),y=zone==='2-terrace-1880'?330:390;
        if(standable(zone,x,y))places.push({x,y,facing:'down',drawX:x-w/2,drawY:514,w,h,wall:'front'});
      }
    }
    return places;
  }
  function slots(zone,count){
    const [left,right]=bounds(zone),span=right-left,result=[];
    if(span>1300||/terrace|sculpture|temp-|seine|lille|cachin/.test(zone)){
      // Long galleries retain continuous walking. Doors occupy floor openings;
      // source-backed image stops are spaced along the existing gallery span.
      const old=baseline.get(zone)||{images:[],points:[],doors:[]};
      const blocked=old.images.map(image=>[image.x-22,image.x+image.w+22]);
      for(const door of (old.doors||[]).filter(d=>d.facing!=='down'))blocked.push([door.x-85,door.x+85]);
      const drawnKeys=new Set(old.images.map(image=>key(image)));
      for(const point of old.points){const work=visitGuideIndex.get(point.id);if(work&&(work.imageUrl||work.file)&&!drawnKeys.has(key(work)))blocked.push([point.x-100,point.x+100]);}
      for(let i=0;i<count;i++){
        const ideal=left+(right-left)*(i+1)/(count+1),half=90;
        const candidates=[];
        for(let x=left+half;x<=right-half;x+=18)if(!blocked.some(([a,b])=>x+half>a&&x-half<b)&&standable(zone,x,zone==='2-terrace-1880'?315:365))candidates.push(x);
        const x=candidates.sort((a,b)=>Math.abs(a-ideal)-Math.abs(b-ideal))[0];
        if(x===undefined)break;
        blocked.push([x-half,x+half]);
        const terrace=zone==='2-terrace-1880';
        result.push({x,y:terrace?315:365,facing:'up',drawX:x-75,drawY:terrace?250:190,w:150,h:150,wall:'back'});
      }
      result.push(...frontSlots(zone,count-result.length));
      return result;
    }
    // Add side/foreground displays to the fixed cutaway. They leave existing
    // rear paintings and the floor-level side passages uncovered.
    const original=baseline.get(zone)||{images:[],points:[],doors:[]};
    const occupied=original.images.map(image=>({x:image.x-13,y:image.y-13,w:image.w+26,h:image.h+53}));
    for(const door of (original.doors||[]).filter(d=>d.facing!=='down'))occupied.push({x:door.x-72,y:110,w:144,h:310});
    const renderedKeys=new Set(original.images.map(image=>key(image)));
    for(const point of original.points){const work=visitGuideIndex.get(point.id);if(work&&(work.imageUrl||work.file)&&!renderedKeys.has(key(work)))occupied.push({x:point.x-95,y:177,w:190,h:216});}
    const overlaps=p=>occupied.some(b=>p.drawX-9<b.x+b.w&&p.drawX+p.w+9>b.x&&p.drawY-9<b.y+b.h&&p.drawY+p.h+40>b.y);
    const side=zone==='2-51'?0:span>600?4:2;
    for(let i=0;i<side&&result.length<count;i++){
      const onLeft=i%2===0,row=Math.floor(i/2),x=onLeft?left+78:right-78;
      const place={x,y:row?415:355,facing:onLeft?'left':'right',drawX:onLeft?left+3:right-86,drawY:row?310:173,w:83,h:83,wall:onLeft?'left':'right'};
      if(!overlaps(place)&&standable(zone,place.x,place.y))result.push(place);
    }
    result.push(...frontSlots(zone,count-result.length));
    return result;
  }
  function entriesFor(zone=currentAtlasZoneId()){
    if(cache.has(zone))return cache.get(zone);
    const old=baseline.get(zone)||{images:[],points:[]};
    const drawn=new Set(old.images.map(item=>key(item)));
    const existingPoints=new Map(old.points.map(point=>[key(visitGuideIndex.get(point.id)||point),point]));
    const candidates=collection.sceneCandidates?collection.sceneCandidates(zone):(collection.byZone.get(zone)||[]);
    const missing=candidates.filter(work=>(work.imageUrl||work.file)&&!drawn.has(key(work)));
    const newWorks=missing.filter(work=>!existingPoints.has(key(work))||relocated.has(existingPoints.get(key(work))?.id));
    const available=slots(zone,newWorks.length);
    // These large fragments / exceptionally narrow source images need a full-height
    // display. Keep their complete images in the folio until such space exists.
    const tallWorks=new Set(['10737','25651','8018','70032']);
    const ordered=[...newWorks].sort((a,b)=>Number(relocated.has(existingPoints.get(key(b))?.id))-Number(relocated.has(existingPoints.get(key(a))?.id)));
    const placed=new Map();
    for(const place of available){
      const index=ordered.findIndex(work=>!tallWorks.has(sourceId(work))||place.h>=150);
      if(index<0)continue;
      placed.set(key(ordered.splice(index,1)[0]),place);
    }
    const entries=missing.map(work=>{
      const oldPoint=existingPoints.get(key(work)),point=oldPoint&&!relocated.has(oldPoint.id)?oldPoint:null;
      const canonical=oldPoint&&visitGuideIndex.get(oldPoint.id)||work;
      const sculpture=isSculpture(canonical,zone);
      const place=point?{...point,drawX:point.x-(sculpture?76:82),drawY:sculpture?240:190,w:sculpture?152:164,h:sculpture?170:156,wall:'back'}:placed.get(key(work));
      if(!place)return null;
      if(sculpture&&!point&&place.wall==='back'){place.drawY=zone==='2-terrace-1880'?228:215;place.h=175;place.w=158;place.drawX=place.x-79;}
      return {work:canonical,place,sculpture,added:true};
    }).filter(Boolean);
    // Some older wall images had no E point at all (notably the Seine gallery).
    for(const image of old.images){
      if(existingPoints.has(key(image)))continue;
      const work=visitGuideIndex.get(image.id)||candidates.find(w=>key(w)===key(image));
      if(!work)continue;
      const x=image.x+image.w/2;
      entries.push({work,place:{x,y:365,facing:'up',wall:'back'},added:false});
    }
    cache.set(zone,entries);
    collection.registerScenePlacements?.(zone,entries);
    return entries;
  }
  const originalCaption=captionPlate;
  captionPlate=function(value,x,y,w,status=''){
    const clean=String(value).replace(/\s*·\s*(数字图像|数字导览|位置示意).*$/,'');
    const work=[...visitGuideIndex.values()].find(work=>work.title===clean);
    const subtitle=/暂不可用|暂缺/.test(status)?'图像暂不可用 · 可按 E 阅读':/加载中/.test(status)?'图像载入中':work?[work.artist,work.year].filter(Boolean).join(' · '):'';
    return originalCaption(clean,x,y,w,subtitle);
  };
  function framed(work,p){
    const {drawX:x,drawY:y,w,h,wall:face}=p;
    if(face==='left'||face==='right'){
      const edge=face==='left'?x-10:x+w+4;
      polygon(face==='left'?[[x-12,y-20],[x+w+7,y-6],[x+w+7,y+h+42],[x-12,y+h+50]]:[[x-7,y-6],[x+w+12,y-20],[x+w+12,y+h+50],[x-7,y+h+42]],'#8f9690');
      rect(edge,y-14,7,h+53,'#596563');rect(edge+2,y-14,2,h+53,'#a4aaa1');
    }
    const {image}=framedArtwork(work,x,y,w,h);
    captionPlate(work.title,x-6,y+h+11,w+12,image.failed?'暂缺':'');
  }
  function sculpture(work,x,y,w,h,foreground=false){
    // Source photographs remain intact: no generated substitute for the real object.
    // A plain stone plinth replaces the misleading gilt painting frame.
    const base=y+h,center=x+w/2;
    polygon([[x-10,base+18],[x+w+14,base+18],[x+w+28,base+31],[x-23,base+31]],'#30342d28');
    rect(x+3,base-2,w-6,28,'#aaa596');rect(x+3,base-2,w-6,3,'#e4e0d4');
    rect(x+3,base+1,5,24,'#c4bfb0');rect(x+w-10,base+1,7,25,'#8c887e');
    rect(x-3,base-7,w+6,8,'#ddd9cd');rect(x-3,base-7,w+6,2,'#f4efe4');
    // A small documented bronze should not read as a life-size statue. This
    // remains an intact photograph; its centimetre height is shown on the label.
    const objectHeight=Number(work.dimensionsCm?.height),smallObject=!foreground&&h>120&&objectHeight>0&&objectHeight<=65;
    const photoHeight=smallObject?Math.min(h,80):h;
    const image=scenicImage(work,{x,width:w});showSceneImage(image,x,base-photoHeight,w,photoHeight);image.style.objectPosition='center bottom';
    if(image.complete&&image.naturalWidth){
      const ratio=Math.min(w/image.naturalWidth,photoHeight/image.naturalHeight),iw=image.naturalWidth*ratio,ih=image.naturalHeight*ratio;
      ctx.drawImage(image,Math.round(center-iw/2),Math.round(base-ih),Math.round(iw),Math.round(ih));
    }
    captionPlate(smallObject?`${work.title} · 高 ${objectHeight} cm`:work.title,center-Math.min(w,150)/2,foreground?base+11:base+32,Math.min(w,150),image.failed?'暂缺':'');
  }
  const originalObject=drawScenicObjectImage;
  drawScenicObjectImage=function(work,x,y,w,h){
    const zone=currentAtlasZoneId();
    if(isSculpture(work,zone)){
      const height=Math.max(115,h);
      return sculpture(work,x,415-height,w,height);
    }
    return originalObject(work,x,y,w,h);
  };
  function supplementalFrontWall(zone,entries){
    const fronts=entries.filter(entry=>entry.added&&entry.place.wall==='front');
    if(!fronts.length)return;
    const color=['5-36','5-37'].includes(zone)?galleryPigments.vanGogh:/^5-/.test(zone)?galleryPigments.slate:galleryPigments.neutral;
    for(const [left,right] of frontSpans(zone)){
      if(!fronts.some(entry=>entry.place.x>left&&entry.place.x<right))continue;
      rect(left,501,right-left,H-501,pigmentShade(color,-.12));
      rect(left,501,right-left,5,pigmentShade(color,.28));
      rect(left,506,right-left,4,pigmentShade(color,-.28));
      rect(left,611,right-left,9,pigmentShade(color,-.3));
    }
  }
  function drawEntry(entry){
    if(!entry.added)return;
    const p=entry.place;
    if(entry.sculpture)sculpture(entry.work,p.drawX,p.drawY,p.w,p.h,p.wall==='front');
    else framed(entry.work,p);
  }
  const originalSprite=sprite;
  sprite=function(time){
    if(stairWalk||cachinBendWalk)return originalSprite(time);
    const zones=player.zone==='main'?['5-35','5-36','5-37']:player.zone==='groundAisle'?['0-aisle','0-sculpture']:player.zone==='middleWing'||player.zone==='terrace1880'?['2-terrace-1880']: [currentAtlasZoneId()];
    const displays=zones.map(zone=>({zone,entries:entriesFor(zone)}));
    for(const {entries} of displays)for(const entry of entries)if(entry.place.wall!=='front')drawEntry(entry);
    const result=originalSprite(time);
    if(player.zone==='main'){
      frontWall();
      for(const work of catalog)if(work.place.wall==='front')frame(work);
    }
    // The visitor stands behind the cutaway front wall, never over its pictures.
    for(const {zone,entries} of displays){
      supplementalFrontWall(zone,entries);
      for(const entry of entries)if(entry.place.wall==='front')drawEntry(entry);
    }
    return result;
  };
  function nearby(facingOnly=true){
    let best=null,distance=Infinity;
    for(const entry of entriesFor()){
      const p=entry.place;if(facingOnly&&p.facing!==player.facing)continue;
      const d=Math.hypot(player.x-p.x,(player.y-p.y)*1.5);
      const limit=p.wall==='left'||p.wall==='right'?30:p.wall==='front'?Math.min(44,p.w*.45):65;
      if(d<limit&&d<distance){best=entry;distance=d;}
    }
    return best;
  }
  const originalMiddleNote=nearMiddleNote;
  nearMiddleNote=function(){const work=originalMiddleNote();return relocated.has(work?.id)?null:work};
  nearRoom28Note=function(){return false};
  const originalNearWork=nearWork;
  nearWork=function(){return nearby()?.work||originalNearWork()};
  const originalRoomUI=setRoomUI;
  const direction={up:'上',down:'下',left:'左',right:'右'};
  function cleanHint(html){
    return html.replace(/(?:；|，|、| · )?(?:原作)?(?:真实|实际|准确|当季|当日)?(?:门位|墙位|展位|站位|跨度|位置|尺度|距离|运行|隔墙|分配|走向)(?:与[^<；，。]*?)?(?:仍|尚)?(?:待核|未核|未配准|未知|示意)/g,'')
      .replace(/（[^）]*(?:待核|示意|推定)[^）]*）/g,'')
      .replace(/(?:；|，| · )?[^<>；，。]*(?:待核|待复核|未核|未配准|未确认)[^<>；，。]*/g,'')
      .replace(/(?:Demo )?示意楼梯/g,'楼梯').replace(/示意入口|图示开口|图示位置|示意门/g,'入口')
      .replace(/ · (?:位置示意|数字图像台|非现场设施)/g,'').replace(/；<\//g,'</').replace(/（\s*）|\(\s*\)/g,'');
  }
  setRoomUI=function(){
    const result=originalRoomUI();
    const hint=$('nearby');
    const visitorTitles={'0-8a':'8a 厅','0-8b':'8b 厅','0-temp-i':'临时展区 I','0-temp-ii':'临时展区 II','2-55':'55 · 战争主题','2-57':'57 · J’AI VU','2-60':'60 · J’AI VU','2-69a':'69a 厅','2-69b':'69b 厅','5-42':'42 厅'};
    const title=visitorTitles[currentAtlasZoneId()];if(title)$('roomName').textContent=title;
    if(hint){
      hint.innerHTML=cleanHint(hint.innerHTML);
      if(/待核|未核|推定|未配准|候选/.test(hint.innerHTML))hint.innerHTML='<small>'+escape($('roomName').textContent)+'</small><strong>沿展墙慢慢走，靠近作品后按 E 观赏。</strong>';
      if(!liftFloors.includes(player.zone)&&!/^core[CD]/.test(player.zone)&&!stairWalk&&!liftRide){
        const heading=String($('roomName').textContent||'奥赛').split('；')[0].replace(/（[^）]*(?:待核|示意|推定)[^）]*）/g,'');
        hint.innerHTML=hint.innerHTML.replace(/<small>[\s\S]*?<\/small>/,`<small>${escape(heading)}</small>`);
      }
    }
    const entry=nearby(false);
    if(entry&&!stairWalk&&!liftRide&&!cachinBendWalk){
      const facing=entry.place.facing===player.facing;
      hint.innerHTML=`<small>${escape(entry.work.artist)} · ${escape(entry.work.year)}</small><strong>${facing?'按 E 观赏':'向'+direction[entry.place.facing]+'转身，观赏'}《${escape(entry.work.title)}》</strong>`;
    }
    // Curatorial provenance remains in work details / the collection's evidence
    // disclosure. Main walking UI only carries visitor-facing viewing guidance.
    if(typeof holzerRouteCue==='function')for(const id of ['holzerRouteText','holzerRouteMobileText']){
      const el=$(id);if(el?.textContent)el.textContent=el.textContent.split('。')[0].replace(/LED.*$/,'');
    }
    return result;
  };
  window.ORSAY_GALLERY_DISPLAY={entriesFor,nearby,clearCache:()=>cache.clear(),sculpture,baseline};
  setRoomUI();
})();
