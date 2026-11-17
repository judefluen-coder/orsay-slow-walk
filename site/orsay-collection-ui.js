// A room-bound study folio. Opening it never changes the visitor's position.
(() => {
  const additions = [
    ...(window.ORSAY_COLLECTION_GROUND_ADDITIONS || []),
    ...(window.ORSAY_COLLECTION_UPPER_ADDITIONS || []),
    ...(window.ORSAY_COLLECTION_MIDDLE_ADDITIONS || []),
    ...(window.ORSAY_REVIEW_ADDITIONS || []),
    ...(window.ORSAY_COMPLETION_ADDITIONS || [])
  ];
  const additionIds = new Set(additions.map(work => work.id));
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const officialId = work => work.source?.match(/\/(?:oeuvres|artworks)\/[^/?#]+-(\d+)(?:[?#]|$)/)?.[1];
  // A shared exhibition URL can describe several different works. Only an official
  // object identifier is a safe cross-language deduplication key.
  const sourceKey = work => officialId(work) || work.id;
  const isArtwork = work => work.objectType!=='architecture' && (!!officialId(work) || window.ORSAY_GUIDE_KINDS?.[work.id]==='artwork');
  const appearances = new Map(Object.entries(window.ORSAY_SCENE_ASSOCIATIONS || {}));
  const drawnAppearances = new Map(Object.entries(window.ORSAY_SCENE_DRAWN_ASSOCIATIONS || {}));
  const existingScene = (work,zone) => (drawnAppearances.get(work.id)||[]).includes(zone);
  const byZone = new Map();
  const isImage = work => !!(work.imageUrl || work.file);
  const evidenceZonesFor = work => {
    if (work.zoneIds) return work.zoneIds;
    if (work.zoneId) return [work.zoneId];
    if (['collection','archiveContext','gallery','scheduledExhibition','programContext'].includes(work.locationScope)) return [];
    if(work.room==='terrace1880')return ['2-sculpture-connector','2-terrace-1880'];
    if(work.locationScope==='seineGallery')return ['0-seine-1','0-seine-2'];
    if(work.locationScope==='pavilionMiddleRange')return ['2-pavilion-amont'];
    if(work.locationScope==='pavilion'&&['3','4'].includes(String(work.floor)))return [`${work.floor}-art-nouveau`];
    const namedRooms={'里尔画廊 1':'0-lille-1','里尔画廊 2':'0-lille-2','罗丹平台':'2-terrace-rodin',terrace1870:'2-terrace-1870',terrace1880:'2-terrace-1880',sculptureAisle:'0-sculpture',paris:'0-paris'};
    if(namedRooms[work.room])return [namedRooms[work.room]];
    const number = String(work.room || (catalog.includes(work) ? '36' : ''));
    if (number === '69') return ['2-69a','2-69b'];
    if (!/^\d+[abc]?$|^9bis$/.test(number)) return [];
    const level = Number.parseInt(number) >= 50 ? '2' : Number.parseInt(number) >= 28 ? '5' : '0';
    return [`${level}-${number}`].filter(id => visitZones.has(id));
  };
  const zonesFor = work => [...new Set([...evidenceZonesFor(work),...(appearances.get(work.id)||[]),...(work.appearanceZoneIds||[])])].filter(id=>visitZones.has(id));
  const entryKind = work => isArtwork(work) ? 'artwork' : /architecture|clock|tower|cafe|restaurant/i.test(work.id) || /钟厅|车站时钟|餐厅里抬头|塔楼与|从中层平台/.test(work.title) ? 'architecture' : 'topic';
  function addToZone(work,zone) {
    const entries = byZone.get(zone) || [];
    const previous = entries.findIndex(item => sourceKey(item) === sourceKey(work));
    if (previous < 0) entries.push(work);
    else if (additionIds.has(work.id)) {
      const old=entries[previous];
      appearances.set(work.id,[...new Set([...(appearances.get(old.id)||[]),...(appearances.get(work.id)||[])])]);
      drawnAppearances.set(work.id,[...new Set([...(drawnAppearances.get(old.id)||[]),...(drawnAppearances.get(work.id)||[])])]);
      entries[previous] = work;
    }
    byZone.set(zone, entries);
  }
  for (const work of [...visitGuideIndex.values()]) {
    if (!isArtwork(work) && !appearances.has(work.id)) continue;
    for (const zone of zonesFor(work)) addToZone(work,zone);
  }
  let openZone = null, readerId = null, lastZone = null;
  let visible = [];
  const statusText = work => work.status==='location-conflict' ? '不同馆方记录的陈列地点存在冲突，当前在展未确认。' : work.locationScope==='archiveContext' ? '这是一件档案阅读作品，不表示原作此刻在本厅展出。' : work.locationScope==='gallery' ? '馆方地点记录到画廊范围，尚不能确定具体厅号与墙位。' : work.locationScope==='seineGallery' ? '馆方地点记录到塞纳画廊范围，1／2 分段与墙位未确认。' : ['collection','programContext','scheduledExhibition'].includes(work.locationScope) ? '与本区主题关联的数字阅读，不作为本厅原作在展证明。' : !isArtwork(work) ? '建筑或专题导览，来源见原始资料；不计作一件馆藏作品。' : !additionIds.has(work.id) ? '陈列时间与地点以作品说明和馆方档案为准。' : work.status === 'index-location-unconfirmed' || work.evidenceMethod === 'official-page-index' ? '检索记录提供厅号线索，尚待逐件档案复核。' : work.locationText ? `${work.locationText}；馆方地点记录不等于具体墙位或当天现场核验。` : '馆方逐件档案提供本厅范围，具体墙位未核实。';
  const sceneCandidates = zone => (byZone.get(zone)||[]).filter(work => {
    if(!isImage(work))return false;
    if(existingScene(work,zone))return true;
    if(!isArtwork(work))return false;
    if(['archiveContext','collection','programContext','scheduledExhibition'].includes(work.locationScope))return false;
    if(work.status==='location-conflict'||work.status==='index-location-unconfirmed'||work.evidenceMethod==='official-page-index')return false;
    return true;
  });
  const registeredPlacements = new Map();
  function registerScenePlacements(zone,works) {
    registeredPlacements.set(zone,new Set(works.map(work=>sourceKey(work.work||work))));
    for(const item of works){const work=item.work||item;if(work?.id&&!((byZone.get(zone)||[]).some(entry=>sourceKey(entry)===sourceKey(work))))addToZone(work,zone);}
    lastZone=null;
  }
  const hasScenePlacement = (work,zone) => existingScene(work,zone)||registeredPlacements.get(zone)?.has(sourceKey(work));
  const entryLabel = (work,zone) => !isArtwork(work) ? entryKind(work)==='architecture'?'空间导览':'专题阅读' : hasScenePlacement(work,zone)?'漫游中的作品':'延伸阅读';
  const normalized = work => ({...work, readerOnly:true, imagePage:work.imagePage || work.source,
    question:work.question || '先停一会儿，看看这件作品怎样引导你的目光。',
    focus:work.focus || {x:50,y:50,label:'作品整体',note:'先看整幅构图或整体形体，再核对讲解中的细节。'},
    collectionSupplement:additionIds.has(work.id)
  });
  function sync(zone = currentAtlasZoneId()) {
    if (zone === lastZone) return;
    lastZone = zone;
    const count = (byZone.get(zone) || []).length;
    $('roomCollectionCount').textContent = count ? String(count) : '';
    $('openRoomCollection').setAttribute('aria-label', count ? `查看本厅 ${count} 条作品档案` : '查看本厅作品收录情况');
  }
  function render() {
    const items = byZone.get(openZone) || [], query = $('collectionSearch').value.trim().toLocaleLowerCase();
    visible = items.filter(work => [work.title,work.original,work.artist,work.inventoryNumber].join(' ').toLocaleLowerCase().includes(query));
    $('collectionTitle').textContent = walkZoneLabel(openZone) || '本厅作品册';
    $('collectionRoomNumber').textContent = /^\d+-\d+[abc]?$|^0-9bis$/.test(openZone || '') ? openZone.split('-').slice(1).join('-') : 'M’O';
    const artCount=items.filter(isArtwork).length,topicCount=items.length-artCount;
    $('collectionCount').textContent = `${artCount} 件作品${topicCount?` · ${topicCount} 篇空间与专题`:''}`;
    $('collectionResultCount').textContent = query ? `${visible.length} 条匹配` : '看完合上，继续在原地漫游';
    $('collectionGrid').innerHTML = visible.map(work => `<li class="collection-item" data-entry-kind="${entryKind(work)}"><button type="button" class="collection-work" data-collection-work="${escape(work.id)}"><div class="collection-image">${isImage(work) ? `<img loading="lazy" decoding="async" src="${escape(imageUrl(work,700))}" alt="${escape(work.artist || '')}《${escape(work.title)}》"><span class="collection-no-image" hidden>图像暂未加载<br>可阅读档案与讲解</span>` : '<span class="collection-no-image">空间与故事<br>打开阅读</span>'}${readGuides.has(work.id) ? '<span class="collection-read">曾打开</span>' : ''}</div><p class="collection-entry-kind">${entryLabel(work,openZone)}</p><h3>${escape(work.title)}</h3><p>${escape(work.artist || '奥赛导览')}${work.year?` · ${escape(work.year)}`:''}</p><p class="collection-original">${escape(work.original||'')}</p></button><details class="collection-evidence"><summary>作品与陈列资料</summary><p>${escape(statusText(work))}</p><a href="${escape(work.locationEvidenceSource || work.source)}" target="_blank" rel="noopener noreferrer">${officialId(work)?'馆方作品档案':isArtwork(work)?'馆方展览与研究':'原始资料'} ↗${work.inventoryNumber ? ` · ${escape(work.inventoryNumber)}` : ''}</a></details></li>`).join('');
    $('collectionEmpty').hidden = visible.length > 0;
    $('collectionEmptyText').textContent = items.length ? '没有找到匹配的作品，试试作者、原文题名或清除搜索。' : '这里暂时没有作品阅读条目。可以合上作品册，继续沿通道探索。';
    $('collectionScopeText').textContent = '作品册汇集本段漫游的作品、关联阅读和空间故事。“漫游中的作品”描述本 Demo 的呈现；“延伸阅读”不代表原作在这里展出。每件作品的陈列依据可单独展开。馆方目录记录、当日现场与具体墙位分别核对，这里的计数不是实馆全部藏品或当季完整陈列总数。';
    for (const img of $('collectionGrid').querySelectorAll('img')) img.addEventListener('error', () => {img.hidden=true;img.nextElementSibling.hidden=false;}, {once:true});
  }
  function open() {
    if (pendingVisitResume || stairWalk || liftRide) return;
    openZone = currentAtlasZoneId();
    if (!openZone) return;
    readerId = null;
    keys.clear();$('collectionSearch').value='';render();
    $('collectionShade').classList.add('open');$('openRoomCollection').setAttribute('aria-expanded','true');$('closeCollection').focus();
  }
  function close() {
    keys.clear();readerId=null;$('collectionShade').classList.remove('open');$('openRoomCollection').setAttribute('aria-expanded','false');$('openRoomCollection').focus();
  }
  function view(id) {
    // A stale button cannot open a work after moving to another room.
    if (currentAtlasZoneId() !== openZone) {close();return false;}
    const work = (byZone.get(openZone) || []).find(item => item.id === id);
    if (!work) return false;
    readerId=id;$('collectionShade').classList.remove('open');
    openViewer(normalized(work));
    $('artIndex').textContent='本厅作品册 · 数字阅读';
    const index=visible.findIndex(item=>item.id===id);
    $('collectionReaderNav').hidden=false;
    $('collectionReaderPosition').textContent=`${index+1} / ${visible.length} · 本厅作品册`;
    $('collectionPrevious').disabled=index<=0;$('collectionNext').disabled=index<0||index>=visible.length-1;
    return true;
  }
  function returnToShelf() {
    $('collectionReaderNav').hidden=true;
    if (!readerId || currentAtlasZoneId() !== openZone) {readerId=null;return false;}
    const id=readerId;readerId=null;render();$('collectionShade').classList.add('open');keys.clear();
    ($('collectionGrid').querySelector(`[data-collection-work="${id}"]`) || $('closeCollection')).focus();
    return true;
  }
  function next(direction) {
    const index=visible.findIndex(item=>item.id===readerId),work=visible[index+direction];
    if (index>=0 && work) {stopVoice();view(work.id);}
  }
  $('openRoomCollection').addEventListener('click',open);
  $('closeCollection').addEventListener('click',close);
  $('collectionShade').addEventListener('click',event=>{if(event.target===$('collectionShade'))close();});
  $('collectionSearch').addEventListener('input',render);
  $('collectionGrid').addEventListener('click',event=>{const button=event.target.closest('[data-collection-work]');if(button)view(button.dataset.collectionWork);});
  $('collectionOpenAtlas').addEventListener('click',()=>{close();openAtlas();});
  $('collectionPrevious').addEventListener('click',()=>next(-1));
  $('collectionNext').addEventListener('click',()=>next(1));
  window.ORSAY_COLLECTION_UI={open,close,sync,returnToShelf,view,byZone,additions,sourceKey,isArtwork,entryKind,sceneCandidates,existingScene,zonesFor,registerScenePlacements,hasScenePlacement};
  sync();
})();
