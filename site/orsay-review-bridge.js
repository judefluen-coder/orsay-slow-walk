// Review-only positioning tools. Coordinates are the existing Demo's coordinates,
// never a claim about measured museum doorways or a normal visitor shortcut.
(() => {
  if (typeof ORSAY_REVIEW_MODE === 'undefined' || !ORSAY_REVIEW_MODE) return;
  const zoneList = atlas.floors.flatMap(floor => floor.zones.filter(zone => zone.playable).map(zone => ({id:zone.id,name:zone.name || zone.label || walkZoneLabel(zone.id),floor:String(floor.level),kind:zone.kind || (/^-?\d+-\d/.test(zone.id) ? 'gallery' : 'landmark')})));
  const zoneIndex = new Map(zoneList.map(zone => [zone.id,zone]));
  const aliases = {'cafe-gare':'groundCafe',entrance:'groundEntrance','core-f':'core','core-c':'coreC','core-d':'coreD','tower-t':'tower',aisle:'groundAisle',sculpture:'groundAisle','lille-1':'lille1','lille-2':'lille2','seine-1':'seine1','seine-2':'seine2',paris:'paris','temp-i':'tempI','temp-ii':'tempII','pavilion-amont':'pav2','art-nouveau':'pav','50':'medalBridge','51':'feteHall',restaurant:'museumRestaurant','terrace-rodin':'rodin','terrace-1870':'terrace1870','terrace-1880':'terrace1880','west-connector':'westMiddleWing','west-south-connector':'middleSouthWing','sculpture-connector':'middleWing','cachin-entry':'wing',cachin:'wing',cafe:'main',terrace:'terrace5','cafe-west':'cafeWest'};
  const cache = new Map();
  let checkpointId = null;
  function descriptor(id) {
    const zone = zoneIndex.get(id);
    if (!zone) throw new Error('未知验收区域：'+id);
    const suffix = id.slice(zone.floor.length+1);
    let sceneZone = aliases[suffix] || 'room'+suffix;
    if (['core-f','core-c','core-d','tower-t','art-nouveau'].includes(suffix)) sceneZone += zone.floor;
    if (zone.floor === '5' && /^(28|29|30|31|32|33|34)$/.test(suffix)) sceneZone = suffix === '34' ? 'west' : 'west'+suffix;
    if (zone.floor === '5' && ['35','36','37'].includes(suffix)) sceneZone = 'main';
    const bounds = sceneZone === 'main' ? ({'35':[54,ROOM_START-1],'36':[ROOM_START,ROOM_END-1],'37':[ROOM_END,ROOM37_END-1],cafe:[ROOM37_END,W-56]})[suffix] : sceneZone === 'groundAisle' ? (suffix === 'aisle' ? [54,599] : [600,W-56]) : sceneZone === 'wing' ? (suffix === 'cachin-entry' ? [54,CACHIN_BEND_X] : [CACHIN_BEND_X+1,WING_W-56]) : null;
    return {id,sceneZone,bounds};
  }
  function inZone(desc,fn) {
    const saved = {...player},transitions = [liftRide,stairWalk,cachinBendWalk],floorName=$('floorName').textContent;
    try {
      liftRide=null;stairWalk=null;cachinBendWalk=null;
      Object.assign(player,{zone:desc.sceneZone,x:desc.bounds ? (desc.bounds[0]+desc.bounds[1])/2 : 450,y:390,facing:'up'});
      // Proximity hooks resolve gallery IDs through the current floor label.
      // Keep that temporary context aligned while enumerating another floor.
      $('floorName').textContent='ORSAY / LEVEL '+zoneIndex.get(desc.id).floor;
      return fn();
    } finally {Object.assign(player,saved);[liftRide,stairWalk,cachinBendWalk]=transitions;$('floorName').textContent=floorName;}
  }
  function nearbyWork() {
    const item=nearWork();if(item)return item;
    if(player.facing==='up'&&(nearELift()||nearLift()||nearCLift()||nearDLift()||nearStair()))return null;
    if(nearRodinNote()&&player.facing==='up')return rodinTerraceNote;
    if(nearRodinMinotaurNote()&&player.facing==='up')return rodinMinotaurNote;
    if(nearEntranceAxis()&&player.facing==='up')return null;
    if(nearRestaurantArchitecture()&&player.facing==='up')return restaurantArchitectureNote;
    if(nearTowerNote()&&player.facing==='up')return nearTowerNote();
    if(nearRoom67Note()&&player.facing==='up')return nearRoom67Note();
    if(nearRoom57Vault()&&player.facing==='up')return null;
    if(nearRoom58Dome()&&player.facing==='up')return null;
    if(nearLilleInnerWall()&&player.facing==='up')return null;
    if(nearSeineInnerWall()&&player.facing==='up')return null;
    if(nearCachinCrossView()&&player.facing==='up')return null;
    if(nearCachinTurn()&&player.facing==='up')return null;
    if(nearWestMiddleCrossView()&&player.facing==='up')return null;
    if(nearPavilionMiddleGuide()&&player.facing==='up')return nearPavilionMiddleGuide();
    if(nearRoom69MarvilleNote()&&player.facing==='up')return room69MarvilleNote;
    if(nearRoom69SoitouxNote()&&player.facing==='up')return room69SoitouxNote;
    if(nearMiddleTerraceView()&&player.facing==='up')return nearMiddleTerraceView();
    if(nearMiddleNote()&&player.facing===(nearMiddleNote()===room57MeetingNote?'left':[room57ArchiveNote,room59JasonNote,room68SecondNote,room70SecondNote,room71SecondNote,room72SecondNote,room65FireplaceNote,room61AubecqNote].includes(nearMiddleNote())?'right':'up'))return nearMiddleNote();
    if(nearGroundNote()&&player.facing===(groundNoteFacing(nearGroundNote())))return nearGroundNote();
    if(nearTemporaryGuide()&&player.facing==='up')return nearTemporaryGuide();
    if(nearPavilionLightwell()&&player.facing==='left')return null;
    if(nearPavilionNote()&&player.facing==='up')return nearPavilionNote();
    if(nearRoom28Bench()&&player.facing==='down')return null;
    if(nearRoom28Clock()&&player.facing==='up')return room28ClockNote;
    if(nearRoom28Note()&&player.facing==='up')return room28Note;
    if(nearRoom29Note()&&player.facing==='up')return room29Note;
    if(nearRoom29SecondNote()&&player.facing==='up')return room29SecondNote;
    if(nearRoom29GardenNote()&&player.facing==='left')return room29GardenNote;
    if(nearRoom30RegattaNote()&&player.facing==='up')return room30RegattaNote;
    if(nearRoom30Note()&&player.facing==='up')return room30Note;
    if(nearRoom31DanceNote()&&player.facing==='up')return room31DanceNote;
    if(nearRoom31BoatNote()&&player.facing==='up')return room31BoatNote;
    if(nearRoom31Note()&&player.facing==='up')return room31Note;
    if(nearRoom32Note()&&player.facing==='up')return room32Note;
    if(nearRoom32SecondNote()&&player.facing==='up')return room32SecondNote;
    if(nearRoom32ThirdNote()&&player.facing==='up')return room32ThirdNote;
    if(nearRoom33FelixNote()&&player.facing==='up')return room33FelixNote;
    if(nearRoom33Note()&&player.facing==='up')return activeRoom33Note();
    if(nearRoom34RightUmbrellaNote()&&player.facing==='up')return room34RightUmbrellaNote;
    if(nearRoom34Note()&&player.facing==='up')return room34Note;
    if(nearRoom35MonetNote()&&player.facing==='up')return room35MonetNote;
    if(nearRoom35CathedralNote()&&player.facing==='up')return room35CathedralNote;
    if(nearRoom35Note()&&player.facing==='up')return room35Note;
    if(nearRoom37Note()&&player.facing==='up')return room37Note;
    if(nearRoom37MorisotNote()&&player.facing==='up')return room37MorisotNote;
    if(nearRoom37RenoirNote()&&player.facing==='up')return room37RenoirNote;
    if(nearRoom38Note()&&player.facing==='up')return room38Note;
    if(nearRoom38SecondNote()&&player.facing==='right')return room38SecondNote;
    if(nearRoom38ThirdNote()&&player.facing==='left')return room38ThirdNote;
    if(nearRoom39Note()&&player.facing==='up')return room39Note;
    if(nearRoom39SecondNote()&&player.facing==='up')return room39SecondNote;
    if(nearRoom40SecondNote()&&player.facing==='up')return room40SecondNote;
    if(nearRoom40ThirdNote()&&player.facing==='right')return room40ThirdNote;
    if(nearRoom40Note()&&player.facing==='up')return room40Note;
    if(nearRoom41Note()&&player.facing==='up')return room41Note;
    if(nearRoom41SecondNote()&&player.facing==='up')return room41SecondNote;
    if(nearRoom42Note()&&player.facing==='up')return room42Note;
    if(nearRoom43Note()&&player.facing==='up')return room43Note;
    if(nearRoom44Note()&&player.facing==='up')return room44Note;
    if(nearRoom45Note()&&player.facing==='up')return room45Note;
    if(nearRoom46ZolaNote()&&player.facing==='up')return room46ZolaNote;
    if(nearRoom46SecondNote()&&player.facing==='up')return room46SecondNote;
    if(nearRoom46Note()&&player.facing==='up')return room46Note;
    if(nearRoom47SecondNote()&&player.facing==='up')return room47SecondNote;
    if(nearRoom47Note()&&player.facing==='up')return room47Note;
    if(nearClock()&&player.facing==='up')return campanaClockNote;
    return null;
  }
  // Checkpoint enumeration only reads proximity predicates. It never presses E,
  // advances a route, opens a reader, or writes the visitor's learning history.
  function checkpoints(id) {
    const desc=descriptor(id),day=parisDay(new Date()),cached=cache.get(id);
    if(cached?.day===day)return cached.points;
    const points=inZone(desc,()=>{
      const result=[],width=navigationSceneWidth(),bounds=desc.bounds || [54,width-56],expectedRoom=room();
      const valid=(x,y)=>x>=bounds[0]&&x<=bounds[1]&&canMove(x,y);
      const add=(key,label,kind,x,y,facing='up',extra={})=>{
        if(!valid(x,y))return;
        result.push({id:`${id}:${key}`,label,kind,x,y,facing,...extra});
      };
      const baseY=player.zone==='terrace1880'?315:390;
      let startX=Math.round((bounds[0]+bounds[1])/2);
      if(!valid(startX,baseY))startX=Array.from({length:Math.ceil((bounds[1]-bounds[0])/10)},(_,i)=>bounds[0]+i*10).find(x=>valid(x,baseY));
      if(Number.isFinite(startX))add('start','厅内总览','view',startX,baseY);
      const side=sideExitDirections(),sideY=player.zone==='terrace1880'?350:390;
      if(side.left)add('exit-left',player.zone==='rodin'?'左侧楼梯连桥 · 向左':'左侧通道 · 向左',player.zone==='rodin'?'stairs':'exit',90,sideY,'left');
      if(side.right)add('exit-right',['core2','coreC0'].includes(player.zone)?'右侧楼梯 · 向右':'右侧通道 · 向右',['core2','coreC0'].includes(player.zone)?'stairs':'exit',width-90,sideY,'right');
      if(player.zone==='terrace1880')add('return-platform','回展厅侧 · 向下（连续平台）','exit',startX,335,'down');
      else for(const x of downwardExitPositions()){
        const cafeStair=player.zone==='groundAisle'&&x===GROUND_CAFE_PORTAL_X,bend=player.zone==='wing'&&x===CACHIN_BEND_X+45;
        add('exit-down-'+x,cafeStair?'Café de la Gare 下楼入口 · 向下':bend?'返回入口短段 · 向下经过折角':'下侧通道 · 向下',cafeStair?'stairs':'exit',x,440,'down');
      }
      const up=[];
      const push=(x,label='上侧通道 · 向上',kind='exit')=>up.push({x,label,kind});
      if(player.zone==='groundAisle'){
        [...groundSeinePortals,...groundOppositePortals].forEach(p=>push(p.x,`${p.number} 厅口 · 向上`));push(PARIS_AISLE_SEAM_X,'巴黎专题区 · 向上');
      }
      if(player.zone==='wing'){
        wingPortals.filter(p=>p.side==='up').forEach(p=>push(p.x,`${p.number} 厅口 · 向上`));
        push(70,'返回 Café Campana · 向上');push(1050,'D 交通点 · 向上');push(CACHIN_BEND_X-35,'画廊折角 · 向上');
      }
      if(player.zone==='westMiddleWing')westMiddlePortals.filter(p=>p.side==='up').forEach(p=>push(p.x,`${p.number} 厅口 · 向上`));
      if(player.zone==='middleWing')push(startX,'靠近雕塑平台栏杆 · 向上');
      if(temporaryPortals[player.zone])push(temporaryPortals[player.zone].x,'临展入口 · 向上');
      const special={groundEntrance:[500],groundCafe:[180],coreC0:[180],coreC2:[500],pav2:[180],terrace5:[180],west28:[500],tower5:[710],tower2:[710],rodin:[500],feteHall:[FETE_BRIDGE_PORTAL_X,550],terrace1870:[SEINE_TERRACE_WEST_JUNCTION_X]};
      (special[player.zone]||[]).forEach(x=>push(x,['groundCafe','coreC2','tower5','tower2'].includes(player.zone)?'楼梯入口 · 向上':'上侧通道 · 向上',['groundCafe','coreC2','tower5','tower2'].includes(player.zone)?'stairs':'exit'));
      if(player.zone==='main'&&expectedRoom==='cafe')push(2580,'室外露台 · 向上');
      if(expectedRoom==='7')push(ROOM7_TEMP_I_DOOR_X,'返回临展 I · 向上');
      const portalUp=wingPortals.some(p=>p.side==='down'&&p.number===expectedRoom)||middlePortals.some(p=>p.number===expectedRoom)||middleSouthPortals.some(p=>p.number===expectedRoom)||groundPortals.some(p=>p.number===expectedRoom)||lillePortals.some(p=>p.number===expectedRoom)||lille2Portals.some(p=>p.number===expectedRoom)||seinePortals.some(p=>p.number===expectedRoom)||!!middleSouthInner[expectedRoom];
      if(portalUp)push(180,'返回连接带 · 向上');
      const nave=groundLillePortals.find(p=>p.number===expectedRoom);if(nave)push(nave.naveRoomX,'返回中央通道 · 向上');
      if(westMiddleOuter[expectedRoom])push(780,`${westMiddleOuter[expectedRoom]} 厅口 · 向上`);
      up.forEach(p=>add('exit-up-'+p.x,p.label,p.kind,p.x,365));
      // The main gallery and nave have continuous logical sections, not extra doors.
      if(desc.bounds&&player.zone!=='wing'){
        if(bounds[0]>54)add('section-left','相邻区域 · 向左继续','exit',bounds[0]+30,390,'left');
        if(bounds[1]<width-56)add('section-right','相邻区域 · 向右继续','exit',bounds[1]-30,390,'right');
      }
      if(liftFloors.includes(player.zone)){add('lift-f','F 电梯 · 面向门选择楼层','lift',430,390);add('stairs-f','F 楼梯 · 向上走入 / 可选相邻层','stairs',715,390);}
      if(eLiftFloors.includes(player.zone))add('lift-e','E 无障碍电梯','lift',185,390);
      if(['coreC0','coreC2'].includes(player.zone))add('lift-c','C 电梯','lift',300,390);
      if(['coreD2','coreD5'].includes(player.zone))add('lift-d','D 电梯','lift',500,390);
      const landmarks=[
        [nearEntranceAxis,'entrance-axis','入馆中轴远望','up'],[nearRoom57Vault,'vault','高拱观察点','up'],[nearRoom58Dome,'dome','穹顶观察点','up'],
        [nearLilleInnerWall,'lille-wall','里尔侧内墙观察','up'],[nearSeineInnerWall,'seine-wall','塞纳侧内墙观察','up'],[nearCachinCrossView,'cachin-cross','画廊对侧观察','up'],
        [nearCachinTurn,'cachin-turn','画廊折角观察','up'],[nearWestMiddleCrossView,'west-cross','内外排展厅关系','up'],[nearPavilionLightwell,'lightwell','采光井观察','left'],[nearRoom28Bench,'clock-bench','钟厅长凳','down']
      ];
      const matches=new Map(),landmarkMatches=new Map();
      const sample=(x,y,facing)=>{
        if(!valid(x,y))return;
        Object.assign(player,{x,y,facing});if(room()!==expectedRoom)return;
        const item=nearbyWork();
        if(item){const entries=matches.get(item.id)||{item,positions:[]};entries.positions.push({x,y,facing});matches.set(item.id,entries);}
        for(const [test,key,label,direction] of landmarks)if(facing===direction&&test()){
          const entries=landmarkMatches.get(key)||{label,direction,positions:[]};entries.positions.push({x,y,facing});landmarkMatches.set(key,entries);
        }
      };
      const ys=player.zone==='terrace1880'?[300,315,330]:[355,380,390,430,450];
      for(let x=Math.ceil(bounds[0]/20)*20;x<=bounds[1];x+=20)for(const y of ys)for(const facing of ['up','down','left','right'])sample(x,y,facing);
      for(const item of catalog)if(item.place)sample(item.place.lookX,item.place.lookY,wallFacing[item.place.wall]);
      const centered=positions=>{
        const cx=positions.reduce((sum,p)=>sum+p.x,0)/positions.length;
        return positions.slice().sort((a,b)=>Math.abs(a.x-cx)+Math.abs(a.y-baseY)*2-Math.abs(b.x-cx)-Math.abs(b.y-baseY)*2)[0];
      };
      for(const {item,positions} of matches.values()){
        const exact=item.place&&positions.find(p=>p.x===item.place.lookX&&p.y===item.place.lookY&&p.facing===wallFacing[item.place.wall]),p=exact||centered(positions);
        add('work-'+item.id,item.title,'art',p.x,p.y,p.facing,{workId:item.id});
      }
      for(const [key,entry] of landmarkMatches){const p=centered(entry.positions);add(key,entry.label,'landmark',p.x,p.y,p.facing);}
      // Several doors may face the same direction; distinguish their screen order.
      const labelGroups=new Map();
      for(const point of result){const group=labelGroups.get(point.label)||[];group.push(point);labelGroups.set(point.label,group);}
      for(const group of labelGroups.values())if(group.length>1)group.sort((a,b)=>a.x-b.x).forEach((point,index)=>{point.label+=`（从左第 ${index+1} 处）`;});
      return result;
    });
    cache.set(id,{day,points});return points;
  }
  function closePanels() {
    keys.clear();window.ORSAY_COLLECTION_UI?.close();stopVoice();clearTimeout(toastTimer);$('toast').hidden=true;
    for(const id of ['viewerShade','journalShade','atlasShade','mapShade','collectionShade'])$(id).classList.remove('open');
    $('viewerImage').src='';$('artStage').dataset.imageState='idle';$('artImageStatus').hidden=true;
    $('deepGuide').open=false;$('collectionReaderNav').hidden=true;
    $('toggleMiniMap').setAttribute('aria-expanded','false');$('openRoomCollection').setAttribute('aria-expanded','false');
    current=null;chapter=0;zoom=1;
  }
  function snapshot() {
    const zoneId=currentAtlasZoneId(),zone=zoneIndex.get(zoneId),selected=checkpointId&&cache.get(zoneId)?.points.find(point=>point.id===checkpointId);
    if(!selected||Math.hypot(selected.x-player.x,selected.y-player.y)>8||selected.facing!==player.facing)checkpointId=null;
    const view=$('mapShade').classList.contains('open')?'map':$('viewerShade').classList.contains('open')?$('deepGuide').open?'deep':'viewer':$('collectionShade').classList.contains('open')?'collection':$('atlasShade').classList.contains('open')?'atlas':$('journalShade').classList.contains('open')?'journal':'walk';
    return {zoneId,roomName:$('roomName').textContent,floor:zone?.floor || floorNumber(player.zone),player:{x:player.x,y:player.y,facing:player.facing},checkpointId,workId:$('viewerShade').classList.contains('open')?current?.id||null:null,transition:liftRide?'lift':stairWalk?'stairs':cachinBendWalk?'bend':null,view,build:window.ORSAY_REVIEW_BUILD || null};
  }
  function moveTo(id,point) {
    const desc=descriptor(id);
    closePanels();keys.clear();liftRide=null;stairWalk=null;cachinBendWalk=null;pendingVisitResume=null;$('resumeVisit').hidden=true;
    // A review jump is not a traversed link, and cannot complete a staged walk.
    lastWalkedZoneId=null;walkTargetId=null;restaurantReturnStage=restaurantReturnStage===3?3:0;modernLifeRouteStage=modernLifeRouteStage===3?3:0;
    emotionPaletteRouteStage=emotionPaletteRouteStage===4?4:0;bartholdiVrRouteStage=bartholdiVrRouteStage===3?3:0;westSouthTerraceStage=0;
    Object.assign(player,{zone:desc.sceneZone,x:point.x,y:point.y,facing:point.facing});
    checkpointId=point.id;lastRoom='';lastNearby='';
    setRoomUI();updateMapPlayer();positionWorld(navigationSceneWidth());renderWalkTarget();window.ORSAY_COLLECTION_UI?.sync(id);
    captureVisitCheckpoint();saveVisitProgress();focusWalkingSurface();return snapshot();
  }
  function selectZone(id) {const start=checkpoints(id).find(point=>point.kind==='view');if(!start)throw new Error('区域缺少安全检查起点：'+id);return moveTo(id,start);}
  function goToCheckpoint(id) {
    const zoneId=String(id).split(':')[0],point=checkpoints(zoneId).find(point=>point.id===id);
    if(!point)throw new Error('未知检查点：'+id);
    return moveTo(zoneId,point);
  }
  function getWorks() {return checkpoints(currentAtlasZoneId()).filter(point=>point.workId).map(point=>({id:point.workId,title:point.label}));}
  function showWork(workId,deep=false) {
    const point=checkpoints(currentAtlasZoneId()).find(point=>point.workId===workId);if(!point)return false;
    goToCheckpoint(point.id);const item=nearbyWork();if(item?.id!==workId)return false;
    openViewer(item);if(deep){$('deepGuide').open=true;renderChapter();recordOpenedChapter();$('deepGuide').scrollIntoView?.({block:'start'});}return true;
  }
  // A saved review session must not put the continuation dialog over the iframe.
  if(pendingVisitResume)finishVisitResume(true);
  window.ORSAY_REVIEW={listZones:()=>zoneList.map(zone=>({...zone})),selectZone,getCheckpoints:(id=currentAtlasZoneId())=>checkpoints(id).map(point=>({...point})),goToCheckpoint,getWorks,showWork,openMap:()=>{keys.clear();closePanels();openMuseumMap();return snapshot();},closePanels,focusScene:focusWalkingSurface,snapshot};
})();
