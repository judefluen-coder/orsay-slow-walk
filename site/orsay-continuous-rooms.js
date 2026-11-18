// Join only the existing horizontal fifth-floor chain. Room coordinates, doors,
// interactions and visit records remain owned by the ordinary walking code.
(() => {
  const order=['core5','west28','west29','west30','west31','west32','west33','west','main'];
  const defaults={core5:900,west28:680,west29:600,west30:670,west31:600,west32:1080,west33:470,west:670,main:3150};
  function createLayout(widths=defaults){
    let offset=0;
    return order.map((zone,index)=>{
      const width=Number(widths[zone]);
      if(!Number.isFinite(width)||width<=110)throw new Error('Invalid continuous room width: '+zone);
      const item={zone,width,offset,left:index?54:0,right:index===order.length-1?width:width-56};
      offset+=width-110;
      return item;
    });
  }
  function project(layout,zone,x,viewport){
    const item=layout.find(room=>room.zone===zone);
    if(!item||!Number.isFinite(viewport)||viewport<=0)return null;
    const last=layout[layout.length-1],total=last.offset+last.width;
    const globalX=item.offset+x;
    const globalCamera=Math.max(0,Math.min(Math.max(0,total-viewport),globalX-viewport*.43));
    return {globalX,globalCamera,camera:globalCamera-item.offset,center:Math.max(0,(viewport-total)/2),viewport,total,item};
  }
  function seamPlayerFragment(item,x,y){
    if(!item||y<350||y>455)return null;
    const left=Math.round(x)-32,top=Math.round(415+(y-281)*205/339)-72,width=64,height=128;
    if(item.left>0&&left<item.left&&left+width>item.left)return {left,top,width,height,clipLeft:0,clipRight:left+width-item.left};
    if(item.right<item.width&&left<item.right&&left+width>item.right)return {left,top,width,height,clipLeft:item.right-left,clipRight:0};
    return null;
  }
  const api={createLayout,project,seamPlayerFragment,capturing:false,active:()=>false,preparePosition:()=>null,beforeDraw(){},afterDraw(){},drawPlayerFragment(){}};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(typeof window==='undefined')return;
  window.ORSAY_CONTINUOUS_ROOMS=api;
  if(typeof document==='undefined'||typeof document.createElement!=='function'||typeof player==='undefined')return;
  const stage=document.getElementById('scene'),world=document.getElementById('world'),images=document.getElementById('sceneImages');
  if(!stage||!world||!images||typeof world.cloneNode!=='function')return;
  const layout=createLayout({...westWidths,core5:SIDE_W,main:W}),byZone=new Map(layout.map(item=>[item.zone,item]));
  const cache=new Map(),padding=180;
  let host=null,view=null,playerLayer=null;
  const styles=(node,values)=>Object.assign(node.style,values);
  function active(){return byZone.has(player.zone)&&!stairWalk&&!liftRide&&!cachinBendWalk;}
  function ensureHost(){
    if(host)return;
    host=document.createElement('div');host.id='continuousRooms';host.className='continuous-room-neighbors';host.setAttribute('aria-hidden','true');
    styles(host,{position:'absolute',inset:'0',overflow:'hidden',pointerEvents:'none',zIndex:'0'});
    stage.insertBefore(host,world);
  }
  function placement(item,projection,scale){
    return {left:`${(projection.center+item.offset-projection.globalCamera)*scale}px`,transform:`scale(${scale})`,clipPath:`inset(0 ${W-item.right}px 0 ${item.left}px)`};
  }
  function preparePosition(){
    if(!active()){if(host){host.hidden=true;host.dataset.active='false';}if(playerLayer)playerLayer.hidden=true;view=null;return null;}
    const scale=Math.max(.01,stage.clientHeight/H),projection=project(layout,player.zone,player.x,stage.clientWidth/scale);
    if(!projection)return null;
    view={...projection,scale};camera=projection.camera;
    styles(world,placement(projection.item,projection,scale));
    const boundary=document.getElementById('sceneBoundary');if(boundary)boundary.hidden=true;
    return {center:projection.center,scale};
  }
  const imageState=nodes=>nodes.map(image=>`${image.currentSrc||image.src}|${image.naturalWidth}|${image.naturalHeight}|${!!image.failed}|${!!image.requested}`).join(';');
  function capture(item,time,signature){
    const savedPlayer={...player},savedCamera=camera,savedWorld=world.style.cssText,savedImages=images.style.cssText;
    const savedVisible=[...visibleSceneImages];
    const entry=cache.get(item.zone)||{pane:document.createElement('div')};
    entry.pane.dataset.room=item.zone;entry.pane.setAttribute('aria-hidden','true');
    styles(entry.pane,{position:'absolute',top:'0',height:`${H}px`,width:`${item.right-item.left}px`,overflow:'hidden',transformOrigin:'top left',pointerEvents:'none'});
    try{
      api.capturing=true;
      // Drawing has no traffic side effects. Keep floor labels and visit state
      // untouched; this chain is entirely on level 5.
      player.zone=item.zone;player.x=Math.max(54,Math.min(item.width-56,view.globalX-item.offset));
      camera=view.globalCamera-item.offset;
      styles(world,placement(item,view,view.scale));
      draw(time);
      const raster=document.createElement('canvas'),width=item.right-item.left;
      raster.width=width;raster.height=H;raster.setAttribute('aria-hidden','true');
      styles(raster,{position:'absolute',left:'0',top:'0',width:`${width}px`,height:`${H}px`,transform:'none',clipPath:'none'});
      raster.getContext('2d').drawImage(world,item.left,0,width,H,0,0,width,H);
      const photoLayer=document.createElement('div');photoLayer.className='scene-images';photoLayer.setAttribute('aria-hidden','true');
      styles(photoLayer,{left:`${-item.left}px`,top:'0',transform:'none',clipPath:'none'});
      const dependencies=[...visibleSceneImages];
      for(const image of dependencies)if(!image.hidden&&image.naturalWidth>0){
        const copy=image.cloneNode(true);copy.removeAttribute('id');photoLayer.appendChild(copy);
      }
      const labelLayer=stage.querySelector(':scope > .scene-labels')?.cloneNode(true);
      if(labelLayer){labelLayer.removeAttribute('id');styles(labelLayer,{left:`${-item.left}px`,top:'0',transform:'none',clipPath:'none'});}
      entry.pane.replaceChildren(raster,photoLayer,...(labelLayer?[labelLayer]:[]));
      entry.images=dependencies;entry.imageState=imageState(dependencies);entry.signature=signature;
      cache.set(item.zone,entry);
      if(entry.pane.parentNode!==host)host.appendChild(entry.pane);
      return entry;
    }finally{
      Object.assign(player,savedPlayer);camera=savedCamera;world.style.cssText=savedWorld;images.style.cssText=savedImages;
      visibleSceneImages.clear();for(const image of savedVisible)visibleSceneImages.add(image);
      api.capturing=false;
    }
  }
  function beforeDraw(time){
    if(api.capturing)return;
    if(playerLayer)playerLayer.hidden=true;
    if(!active()){if(host){host.hidden=true;host.dataset.active='false';}view=null;return;}
    preparePosition();if(!view)return;
    ensureHost();host.hidden=false;host.dataset.active='true';
    const needed=new Set();
    for(const item of layout){
      const left=item.offset+item.left,right=item.offset+item.right;
      if(right<view.globalCamera-padding||left>view.globalCamera+view.viewport+padding)continue;
      needed.add(item.zone);
      if(item.zone===player.zone)continue;
      // Refresh a cached room when a new part approaches the viewport, on a
      // resize, or as one of its requested images finishes loading/falls back.
      const signature=`${stage.clientWidth}:${stage.clientHeight}:${document.getElementById('floorName')?.textContent}:${Math.floor((view.globalCamera-item.offset)/padding)}`;
      let entry=cache.get(item.zone);
      if(!entry||entry.signature!==signature||entry.imageState!==imageState(entry.images))entry=capture(item,time,signature);
      entry.pane.hidden=false;
      styles(entry.pane,{left:`${(view.center+item.offset+item.left-view.globalCamera)*view.scale}px`,transform:`scale(${view.scale})`});
    }
    for(const [zone,entry] of cache){
      if(!needed.has(zone)){entry.pane.remove();cache.delete(zone);}
      else if(zone===player.zone)entry.pane.hidden=true;
    }
    // The caller's ordinary draw immediately rebuilds the current room's
    // labels and image visibility after these isolated neighbor captures.
  }
  function afterDraw(){
    if(api.capturing)return;
    if(!active()){if(host){host.hidden=true;host.dataset.active='false';}if(playerLayer)playerLayer.hidden=true;}
  }
  function drawPlayerFragment(x,y,facing,step,coat){
    if(api.capturing||!active()||!view)return;
    const fragment=seamPlayerFragment(view.item,player.x,player.y);
    if(!fragment){if(playerLayer)playerLayer.hidden=true;return;}
    if(!playerLayer){
      playerLayer=document.createElement('canvas');playerLayer.id='continuousRoomPlayer';playerLayer.setAttribute('aria-hidden','true');
      playerLayer.width=64;playerLayer.height=128;
      styles(playerLayer,{position:'absolute',width:'64px',height:'128px',transformOrigin:'top left',pointerEvents:'none',zIndex:'0'});
      stage.insertBefore(playerLayer,images);
    }
    const context=playerLayer.getContext('2d');context.clearRect(0,0,64,128);
    // The ordinary sprite retains its position beneath the foreground wall.
    // Only its missing half is painted here, outside this room's clipping plane
    // and inside the existing side passage. No room/background pixels overlap.
    pixelVisitor(x,y,facing,step,coat,studyScale,'visitor','player',(rx,ry,w,h,color)=>{
      context.fillStyle=color;context.fillRect(Math.round(rx)-fragment.left,Math.round(ry)-fragment.top,Math.round(w),Math.round(h));
    });
    styles(playerLayer,{left:`${(view.center+view.item.offset+fragment.left-view.globalCamera)*view.scale}px`,top:`${fragment.top*view.scale}px`,transform:`scale(${view.scale})`,clipPath:`inset(0 ${fragment.clipRight}px 0 ${fragment.clipLeft}px)`});
    playerLayer.hidden=false;
  }
  Object.assign(api,{active,preparePosition,beforeDraw,afterDraw,drawPlayerFragment,layout});
})();
