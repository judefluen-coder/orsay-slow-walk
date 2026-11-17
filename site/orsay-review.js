// The review shell uses the live museum renderer. It never writes normal visit storage.
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const frame = $('museumFrame');
  const build = window.ORSAY_REVIEW_BUILD || {};
  const buildLabel = build.label || '验收首版';
  $('buildLabel').textContent = buildLabel;
  $('buildLabel').title = build.sha256 || buildLabel;
  const initialQuery = new URLSearchParams(location.search);
  const expectedMethods = ['listZones', 'selectZone', 'getCheckpoints', 'goToCheckpoint', 'getWorks', 'showWork', 'openMap', 'closePanels', 'focusScene', 'snapshot'];
  const directionNames = {up: '朝上', down: '朝下', left: '朝左', right: '朝右'};
  const directionMarks = {up: '↑', down: '↓', left: '←', right: '→'};
  const viewNames = {walk: '漫游中', viewer: '看画首屏', deep: '深读讲解', map: '馆内地图', collection: '本厅作品', atlas: '全馆导览', journal: '行程单'};
  const kindNames = {view: '厅内位置', exit: '出入口', art: '作品前', lift: '电梯', stairs: '楼梯', landmark: '景观'};
  const controlIds = ['zoneSearch', 'floorFilter', 'focusScene', 'showMap', 'closePanels', 'copyLocation'];
  let api = null, zones = [], checkpoints = [], works = [], selectedZone = '', lastSnapshot = null;
  let deadline = 0, initialized = false, wasReady = false, lastLocationSignature = '', selectedPoint = '';

  function message(text, error = false) {
    $('reviewStatus').textContent = text;
    $('reviewStatus').classList.toggle('error', error);
  }
  function setReady(ready) {
    for (const id of controlIds) $(id).disabled = !ready;
    for (const button of document.querySelectorAll('[data-zone], [data-point]')) button.disabled = !ready;
    if (!ready) {
      $('workSelect').disabled = true;
      $('showWork').disabled = true;
      $('showDeep').disabled = true;
    }
  }
  function showLoading() {
    api = null; initialized = false; wasReady = false; deadline = Date.now() + 25000;
    setReady(false);
    $('frameStatus').hidden = false;
    $('frameStatus').classList.remove('failed');
    $('frameStatusTitle').textContent = '正在连接正式场景';
    $('frameStatusText').textContent = '地点和检查点准备好后，即可直接试玩。';
    $('retryFrame').hidden = true;
    $('openFrame').hidden = true;
  }
  function showConnectionError() {
    setReady(false);
    $('frameStatus').hidden = false;
    $('frameStatus').classList.add('failed');
    $('frameStatusTitle').textContent = '场景暂未连接';
    $('frameStatusText').textContent = '可以重新载入。若需要登录，请先在新页面打开验收场景，完成登录后再回来重试。';
    $('retryFrame').hidden = false;
    $('openFrame').hidden = false;
    message('场景尚未就绪，没有执行任何定位。', true);
  }
  function normalize(value) { return String(value || '').toLocaleLowerCase().replace(/\s+/g, ''); }
  function roomNumber(zone) { return zone.id.match(/^-?\d+-(\d+[a-z]*)$/)?.[1] || ''; }
  function floorLabel(value) { return `${value} 层`; }
  function renderZones(scrollToCurrent = false) {
    const q = normalize($('zoneSearch').value), floor = $('floorFilter').value;
    const filtered = zones.filter(zone => (floor === 'all' || String(zone.floor) === floor) && normalize(`${zone.id} ${zone.name} ${zone.floor}层 ${roomNumber(zone)}厅`).includes(q));
    $('zoneCount').textContent = `${filtered.length} / ${zones.length}`;
    const fragment = document.createDocumentFragment();
    let previousFloor = null;
    for (const zone of filtered) {
      if (previousFloor !== zone.floor) {
        const heading = document.createElement('div'); heading.className = 'floor-group-title'; heading.textContent = floorLabel(zone.floor);
        fragment.append(heading); previousFloor = zone.floor;
      }
      const button = document.createElement('button'); button.type = 'button'; button.className = 'zone-button'; button.dataset.zone = zone.id;
      button.setAttribute('aria-current', String(zone.id === selectedZone));
      const name = document.createElement('span'); name.className = 'zone-name';
      const number = roomNumber(zone); name.textContent = `${number ? `${number} 厅 · ` : ''}${zone.name}`;
      const detail = document.createElement('span'); detail.className = 'zone-detail'; detail.textContent = `${floorLabel(zone.floor)} · ${zone.id === selectedZone ? '正在这里' : '直接定位'}`;
      button.append(name, detail); fragment.append(button);
    }
    if (!filtered.length) {
      const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = '没有匹配的地点。试试厅号，或切换“所有楼层”。'; fragment.append(empty);
    }
    $('zoneList').replaceChildren(fragment);
    if (scrollToCurrent) $('zoneList').querySelector('[aria-current="true"]')?.scrollIntoView({block: 'nearest'});
  }
  function renderPoints() {
    const fragment = document.createDocumentFragment();
    let priorKind = null;
    for (const point of checkpoints) {
      if (point.kind && point.kind !== priorKind) {
        const label = document.createElement('p'); label.className = 'point-kind'; label.textContent = kindNames[point.kind] || '检查点'; fragment.append(label); priorKind = point.kind;
      }
      const button = document.createElement('button'); button.type = 'button'; button.className = 'checkpoint-button'; button.dataset.point = point.id;
      button.setAttribute('aria-pressed', String(point.id === selectedPoint));
      const title = document.createElement('span'); title.textContent = point.label;
      const facing = document.createElement('span'); facing.className = 'point-direction'; facing.textContent = directionMarks[point.facing] || '·'; facing.setAttribute('aria-label', directionNames[point.facing] || '');
      button.append(title, facing); fragment.append(button);
    }
    if (!checkpoints.length) {
      const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = '此处暂无额外检查点，可直接在画面里试玩。'; fragment.append(empty);
    }
    $('checkpointList').replaceChildren(fragment);
    $('pointCount').textContent = `${checkpoints.length} 处`;
  }
  function updatePointSelection() {
    for (const button of $('checkpointList').querySelectorAll('[data-point]')) button.setAttribute('aria-pressed', String(button.dataset.point === selectedPoint));
  }
  function renderWorks() {
    const previous = $('workSelect').value;
    $('workSelect').replaceChildren();
    for (const work of works) {
      const option = document.createElement('option'); option.value = work.id; option.textContent = work.title; $('workSelect').append(option);
    }
    if (!works.length) {
      const option = document.createElement('option'); option.value = ''; option.textContent = '此处暂无可观赏作品'; $('workSelect').append(option);
    } else if (works.some(work => work.id === previous)) $('workSelect').value = previous;
    $('workSelect').disabled = !works.length;
    $('showWork').disabled = !works.length;
    $('showDeep').disabled = !works.length;
    $('workNote').textContent = works.length ? `${works.length} 个现有观赏点；点按钮会定位到相应作品。` : '可以检查本区的景观、出入口和交通。';
  }
  function refreshZone(zoneId, scroll = false) {
    selectedZone = zoneId;
    checkpoints = api.getCheckpoints(zoneId) || [];
    works = api.getWorks() || [];
    if (!checkpoints.some(point => point.id === selectedPoint)) selectedPoint = '';
    renderZones(scroll); renderPoints(); renderWorks();
  }
  function updateQuery(state, workId = '') {
    if (!state?.zoneId || !zones.some(zone => zone.id === state.zoneId)) return;
    const url = new URL(location.href);
    for (const key of ['zone', 'point', 'work', 'view']) url.searchParams.delete(key);
    url.searchParams.set('zone', state.zoneId);
    const point = checkpoints.find(item => item.id === selectedPoint);
    if (point) url.searchParams.set('point', point.id);
    if (['viewer', 'deep'].includes(state.view) && workId && works.some(work => work.id === workId)) url.searchParams.set('work', workId);
    if (['viewer', 'deep', 'map'].includes(state.view)) url.searchParams.set('view', state.view);
    history.replaceState(null, '', url);
  }
  function sync(scroll = false) {
    if (!api) return null;
    const state = api.snapshot();
    if (!state || !zones.some(zone => zone.id === state.zoneId)) return state;
    const changedZone = selectedZone !== state.zoneId;
    if (changedZone) { selectedPoint = ''; refreshZone(state.zoneId, scroll); }
    if (state.checkpointId && state.checkpointId !== selectedPoint && checkpoints.some(point => point.id === state.checkpointId)) {
      selectedPoint = state.checkpointId; updatePointSelection();
    }
    if (state.workId && works.some(work => work.id === state.workId)) $('workSelect').value = state.workId;
    const previousView = lastSnapshot?.view;
    lastSnapshot = state;
    const zone = zones.find(item => item.id === state.zoneId);
    $('currentRoomTitle').textContent = state.roomName || zone.name;
    $('currentFloor').textContent = `${floorLabel(state.floor ?? zone.floor)} / 正式场景 · 验收定位`;
    const point = checkpoints.find(item => item.id === (state.checkpointId || selectedPoint));
    const locationLabel = state.transition ? '正在通过连接 · 完成后继续检查' : `${directionNames[state.player?.facing] || '原地观察'} · ${viewNames[state.view] || state.view || '漫游中'}`;
    const signature = `${state.zoneId}|${state.view}|${state.player?.facing}|${state.transition}|${point?.id || ''}`;
    if (signature !== lastLocationSignature) {
      $('positionLabel').textContent = locationLabel; lastLocationSignature = signature;
    }
    if (initialized && (changedZone || previousView !== state.view)) updateQuery(state, state.workId || '');
    return state;
  }
  function invoke(action, success) {
    if (!api || !initialized) return;
    try {
      const result = action();
      if (result === false) throw new Error('这个检查状态暂时不可用，请换一个检查点。');
      const state = sync();
      if (success) message(success);
      return state;
    } catch (error) { message(error?.message || '这次定位未完成，请重试。', true); return null; }
  }
  function chooseZone(id, pointId) {
    if (!zones.some(zone => zone.id === id)) return false;
    api.selectZone(id); selectedPoint = ''; refreshZone(id, true);
    if (pointId && checkpoints.some(point => point.id === pointId)) { api.goToCheckpoint(pointId); selectedPoint = pointId; updatePointSelection(); }
    const state = sync(); updateQuery(state); return true;
  }
  function applyInitialQuery() {
    const requested = initialQuery.get('zone');
    const fallback = zones.some(zone => zone.id === '5-29') ? '5-29' : zones[0]?.id;
    chooseZone(zones.some(zone => zone.id === requested) ? requested : fallback, initialQuery.get('point'));
    const workId = initialQuery.get('work'), view = initialQuery.get('view');
    if (workId && works.some(work => work.id === workId) && ['viewer', 'deep'].includes(view)) {
      $('workSelect').value = workId; api.showWork(workId, view === 'deep'); sync(); updateQuery(lastSnapshot, workId);
    } else if (view === 'map') { api.openMap(); sync(); updateQuery(lastSnapshot); }
    message(requested && !zones.some(zone => zone.id === requested) ? '链接中的地点不存在，已回到可检查的展厅。' : '验收场景已就绪。选检查点，或点击“开始试玩”自由行走。');
  }
  function connect() {
    if (initialized) {
      try { sync(); } catch (_) { showLoading(); }
      return;
    }
    let candidate;
    try { candidate = frame.contentWindow?.ORSAY_REVIEW; } catch (_) { /* A login page may be on another origin. */ }
    if (candidate && expectedMethods.every(name => typeof candidate[name] === 'function')) {
      try {
        api = candidate;
        zones = api.listZones().filter(zone => zone?.id && zone?.name && zone.floor !== undefined);
        if (!zones.length) throw new Error('没有可检查的区域');
        const floors = [...new Set(zones.map(zone => String(zone.floor)))];
        $('floorFilter').replaceChildren();
        const all = document.createElement('option'); all.value = 'all'; all.textContent = '所有楼层'; $('floorFilter').append(all);
        for (const floor of floors) { const option = document.createElement('option'); option.value = floor; option.textContent = floorLabel(floor); $('floorFilter').append(option); }
        setReady(true); initialized = true; wasReady = true; $('frameStatus').hidden = true;
        applyInitialQuery();
      } catch (error) { initialized = false; api = null; showConnectionError(); message(`场景初始化未完成：${error.message}`, true); }
    } else if (Date.now() > deadline) showConnectionError();
  }
  function feedbackText() {
    const state = api.snapshot(), zone = zones.find(item => item.id === state.zoneId);
    const point = checkpoints.find(item => item.id === selectedPoint);
    const face = directionNames[state.player?.facing] || state.player?.facing || '未知';
    return [
      `奥赛验收 · ${buildLabel}`,
      `地点：${floorLabel(state.floor ?? zone?.floor)}／${state.roomName || zone?.name || state.zoneId}（${state.zoneId}）`,
      `检查起点：${point?.label || '厅内自由试玩'}`,
      `当前位置：x=${Math.round(state.player?.x || 0)}，y=${Math.round(state.player?.y || 0)}；${face}`,
      `界面：${viewNames[state.view] || state.view || '漫游中'}${state.transition ? '；正在通过连接' : ''}${state.workId ? `；作品：${works.find(work => work.id === state.workId)?.title || state.workId}` : ''}`,
      `验收入口：${location.href}`,
      '我的意见：'
    ].join('\n');
  }

  $('zoneSearch').addEventListener('input', () => renderZones());
  $('floorFilter').addEventListener('change', () => renderZones());
  $('zoneList').addEventListener('click', event => {
    const button = event.target.closest('[data-zone]'); if (!button) return;
    invoke(() => chooseZone(button.dataset.zone), '已定位到厅内起点；可以选择出口或作品继续检查。');
  });
  $('checkpointList').addEventListener('click', event => {
    const button = event.target.closest('[data-point]'); if (!button) return;
    const point = checkpoints.find(item => item.id === button.dataset.point); if (!point) return;
    const state = invoke(() => { api.goToCheckpoint(point.id); selectedPoint = point.id; updatePointSelection(); if (point.workId && works.some(work => work.id === point.workId)) $('workSelect').value = point.workId; }, `已定位：${point.label}。请实际试玩，不会自动标记通过。`);
    if (state) updateQuery(state);
  });
  for (const [id, deep] of [['showWork', false], ['showDeep', true]]) {
    $(id).addEventListener('click', () => {
      const workId = $('workSelect').value; if (!works.some(work => work.id === workId)) return;
      const state = invoke(() => api.showWork(workId, deep), deep ? '已打开这件作品的深读状态。' : '已打开这件作品的观看首屏。');
      if (state) updateQuery(state, workId);
    });
  }
  $('showMap').addEventListener('click', () => { const state = invoke(() => api.openMap(), '已打开当前位置的地图。'); if (state) updateQuery(state); });
  $('closePanels').addEventListener('click', () => { const state = invoke(() => { api.closePanels(); api.focusScene(); }, '已返回当前地点，继续实际试玩。'); if (state) updateQuery(state); });
  $('focusScene').addEventListener('click', () => invoke(() => { api.closePanels(); api.focusScene(); }, '方向键或 WASD 行走，靠近并面向作品后按 E。'));
  $('togglePanels').addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('panels-collapsed');
    $('togglePanels').textContent = collapsed ? '展开侧栏' : '收起侧栏'; $('togglePanels').setAttribute('aria-expanded', String(!collapsed));
  });
  $('copyLocation').addEventListener('click', async () => {
    if (!api) return;
    let text;
    try { text = feedbackText(); $('feedbackText').value = text; }
    catch (_) { message('当前场景状态暂不可读取，请重新连接后复制。', true); return; }
    try { await navigator.clipboard.writeText(text); $('feedbackStatus').textContent = '已复制。贴到聊天里，补一句你的意见即可。'; $('feedbackText').hidden = true; }
    catch (_) { $('feedbackText').hidden = false; $('feedbackText').focus(); $('feedbackText').select(); $('feedbackStatus').textContent = '请复制下面选中的定位信息，再贴到聊天里。'; }
  });
  $('retryFrame').addEventListener('click', () => { showLoading(); frame.src = frame.getAttribute('src'); });
  frame.addEventListener('load', () => { if (wasReady) showLoading(); connect(); });
  frame.addEventListener('error', showConnectionError);
  showLoading();
  setInterval(connect, 300);
})();
