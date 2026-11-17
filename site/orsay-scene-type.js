// Keep scene lettering crisp while its plates and frames stay on the pixel canvas.
(() => {
  const labels=new Map(),visible=new Set(),applied=new WeakMap();
  let layer=null,world=null;
  function style(node,values){
    // CSSOM normalises hex colours to rgb(); compare requested values instead
    // so stationary lettering does not rewrite colour styles every frame.
    const previous=applied.get(node)||{};
    for(const [name,value] of Object.entries(values))if(previous[name]!==value){node.style[name]=value;previous[name]=value;}
    applied.set(node,previous);
  }
  function ensureLayer(){
    if(layer)return true;
    if(typeof document==='undefined'||typeof document.createElement!=='function')return false;
    const scene=document.getElementById('scene');
    world=document.getElementById('world');
    if(!scene||!world)return false;
    layer=document.createElement('div');layer.className='scene-labels';
    layer.setAttribute('aria-hidden','true');
    style(layer,{
      position:'absolute',left:'0px',top:'0px',width:'3150px',height:'620px',
      transformOrigin:'top left',zIndex:'1',overflow:'hidden',pointerEvents:'none',userSelect:'none'
    });
    scene.appendChild(layer);
    return true;
  }
  function begin(){visible.clear();}
  function show({key,text,x,y,width,size=12,color='#34443b',weight=500,align='left'}){
    if(![x,y,width,size].every(Number.isFinite)||width<0||size<=0||!ensureLayer())return false;
    const id=String(key??`${x}:${y}`);
    let span=labels.get(id);
    if(!span){
      span=document.createElement('span');span.setAttribute('aria-hidden','true');
      style(span,{
        position:'absolute',display:'block',whiteSpace:'nowrap',overflow:'hidden',
        pointerEvents:'none',userSelect:'none',
        fontFamily:'"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif'
      });
      labels.set(id,span);layer.appendChild(span);
    }
    const content=String(text??'');
    if(span.textContent!==content)span.textContent=content;
    style(span,{
      left:`${x}px`,top:`${y}px`,width:`${width}px`,height:`${size+2}px`,
      fontSize:`${size}px`,lineHeight:`${size+2}px`,color,fontWeight:String(weight),textAlign:align
    });
    visible.add(id);
    return true;
  }
  function sync(){
    if(!layer)return;
    for(const [key,span] of labels){
      if(visible.has(key))continue;
      layer.removeChild(span);labels.delete(key);
    }
    style(layer,{left:world.style.left||'0px',transform:world.style.transform||'',clipPath:world.style.clipPath||''});
  }
  window.ORSAY_SCENE_TYPE={begin,show,sync};
})();
