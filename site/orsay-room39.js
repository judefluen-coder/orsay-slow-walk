// Checked on 2026-10-20: Musée d'Orsay lists this work in upper-level room 39.
// The scene image is a reproduction; its wall position remains unverified.
window.ORSAY_ROOM39_NOTE = {
  id: 'signac1893', room: '39', readerOnly: true, checkedAt: '2026-10-27',
  artist: '保罗·西涅克', title: '撑伞的女人', original: "Femme à l'ombrelle", year: '1893',
  file: "Paul Signac, 1893, Femme à l'ombrelle, oil on canvas, 81 x 65 cm, Musée d'Orsay.jpg",
  source: 'https://www.musee-orsay.fr/fr/oeuvres/femme-lombrelle-25640',
  question: '人物为什么既像一幅肖像，又像一块精心设计的彩色织物？',
  short: '先看伞、衣袖和身体边缘的弧线，再看红绿、黄紫怎样在平面上相遇。',
  chapters: [
    {title:'先辨认一位具体的人', text:'画中撑伞者是贝尔特·罗布莱斯。馆方记录，她与西涅克在十九世纪八十年代初相识，1892 年结婚，画作完成于次年。作品并不因曲线和色点而失去肖像身份：先找侧脸、伞柄和衣袖，再问画家给了脸多少立体感。奥赛指出，明暗塑形主要留在脸部，身体和伞更依靠颜色边界与连续曲线被认出。'},
    {title:'一张肖像也能是一块平面', text:'从伞顶沿袖口、衣褶的弧线向下看，再找绿色与红橙、黄色与紫色的相邻处。奥赛的作品释文明确说，画家有意把空间压到近乎二维，并用互补色的同时对比、花饰和滚边强化装饰效果。这里不必假定所有色点在眼中混成一种新颜色：你仍能看见相邻色块各自的强度。平面装饰与可辨人物同时成立，才是这幅肖像值得停步的地方。'},
    {title:'走到两幅不同的撑伞画前', text:'馆方作品页直接把这幅画与莫奈在奥赛的两幅户外人物习作联系起来。先在 39 厅看西涅克怎样用轮廓和对比色稳定人物，再沿游戏路线返回 34 厅，看莫奈怎样让风、云与衣裙的笔触一起变化。若继续到 38 厅看修拉《背面模特》，还可以比较色点如何压平画面、如何塑造背部体积。馆方确认三作各自厅号，但 Demo 的站位和门距不是实测。'}
  ],
  focus:{x:48,y:28,label:'伞面与衣袖的曲线',note:'沿伞的弧线看向衣袖，再找红绿和黄紫的相邻边界。'}
};

// The artwork page was updated in October 2026 and identifies room 39.
// The museum's 2002 teaching sheet informs the reading, not the current location.
window.ORSAY_ROOM39_SECOND_NOTE = {
  id:'lucePileDrivers1902',room:'39',readerOnly:true,checkedAt:'2026-10-26',
  artist:'马克西米连·吕斯',title:'打桩工人',original:'Les Batteurs de pieux',year:'1902–1903',
  imageUrl:'https://cdn.mediatheque.epmoo.fr/link/3c9igq/hpl1buzzlrk655s.jpg',
  imagePage:'https://www.musee-orsay.fr/fr/oeuvres/les-batteurs-de-pieux-669',
  imageCredit:'© RMN-Grand Palais (Musée d’Orsay) / Hervé Lewandowski',
  source:'https://www.musee-orsay.fr/fr/oeuvres/les-batteurs-de-pieux-669',
  extraSource:'https://www.musee-orsay.fr/sites/default/files/2020-12/fiche_visite_monde_industriel.pdf',
  extraSourceLabel:'馆方历史教学资料 ↗',
  sourceCaveat:'2002 年教学资料所写 56 厅为历史位置；当前厅号以 2026 年更新的作品页所列 39 厅为准。',
  question:'为什么这群工人看起来既在施工，又像一幅历史画的主角？',
  short:'先看一起拉绳的身体，再看左下角休息的人和河对岸的烟囱。',
  chapters:[
    {title:'把动作读成节奏',text:'画面右侧几名工人同时拉紧绳索，斜线汇向高高的木桩。你的目光会跟着绳子从手臂走到桩顶，又落回用力的身体。左下角有人坐下休息，画中并非只有一个永不停歇的动作。'},
    {title:'劳动为何有了历史画的尺度',text:'这幅油画宽近两米。奥赛的教学资料指出，吕斯用惯于表现重大历史事件的大尺幅和集中的构图，让集体劳动成为画面中心；工人相近的姿态强调协作。裸露的上身带有英雄化处理，不能把这幅画当成未经选择的工地快照。'},
    {title:'再看他们身后的城市',text:'越过河面，远处的旧建筑、工厂烟囱与烟雾并列。馆方教学资料把它读作传统城市向工业城市的过渡，也提醒我们这种打桩方式当时已偏旧：画家选择它，是为了让人的力量可见。现在转身去看同厅西涅克《撑伞的女人》：相近时代的颜色研究，在肖像中强调装饰，在这里能否帮助你看见劳动现场的光与空气？'}
  ],
  focus:{x:68,y:48,label:'绳索与合力的身体',note:'顺着斜绳看集体动作，再把视线移向左下角休息的人。'}
};
