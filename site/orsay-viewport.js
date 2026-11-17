// Keep architecture, artwork positions and camera math unchanged; resize only the stage.
(() => {
  if(typeof document==='undefined'||typeof window==='undefined')return;
  if(document.documentElement?.classList?.contains('review-mode'))return;
  const stage=document.getElementById('scene'),app=document.querySelector('.app');
  if(!stage||!app||typeof stage.getBoundingClientRect!=='function')return;
  let pending=false;
  function fit(){
    pending=false;
    const narrow=window.matchMedia('(max-width:620px)').matches;
    const viewportHeight=window.visualViewport?.height||window.innerHeight;
    const style=getComputedStyle(stage),border=parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth);
    const siblings=[...app.children],stageIndex=siblings.indexOf(stage);
    const remaining=siblings.slice(stageIndex+1).reduce((height,node)=>{
      const css=getComputedStyle(node);
      return height+node.getBoundingClientRect().height+(parseFloat(css.marginTop)||0)+(parseFloat(css.marginBottom)||0);
    },0);
    const top=stage.getBoundingClientRect().top+window.scrollY;
    // Expanded source notes can scroll normally; a short landscape still retains a usable room.
    const height=Math.max(viewportHeight<520?180:narrow?290:260,Math.min(620,Math.floor(viewportHeight-top-remaining-6)));
    const availableWidth=app.clientWidth-(narrow?12:32);
    const width=narrow||viewportHeight<520?availableWidth:Math.min(availableWidth,Math.round((height-border)*16/9+border));
    app.style.setProperty('--walking-height',height+'px');
    app.style.setProperty('--walking-width',Math.max(280,width)+'px');
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(fit);}}
  if(typeof ResizeObserver==='function'){
    const observer=new ResizeObserver(schedule);
    for(const node of app.children)if(node!==stage)observer.observe(node);
  }
  window.addEventListener('resize',schedule);
  window.visualViewport?.addEventListener('resize',schedule);
  fit();
})();
