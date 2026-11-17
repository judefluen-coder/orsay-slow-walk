// Checked on 2026-10-20: Musée d'Orsay lists this work in upper-level room 35.
// The scene image is a reproduction; its wall position remains unverified.
window.ORSAY_ROOM35_NOTE = {
  id: 'renoir1907', room: '35', readerOnly: true, checkedAt: '2026-10-20',
  artist: '奥古斯特·雷诺阿', title: '大裸女', original: 'Grand nu', year: '1907',
  file: 'Auguste Renoir - Large Nude - Google Art Project.jpg',
  source: 'https://www.musee-orsay.fr/fr/oeuvres/grand-nu-78695',
  question: '一位印象派画家，为什么把目光转回古典人体？',
  short: '先看横卧的人体与软垫，再看身体和背景被哪些颜色连接。',
  chapters: [
    {title:'从画面上能看见什么', text:'人物横卧在软垫上，身体占据画面很大的横向空间。温暖的肤色与周围较柔和的颜色相接，边缘并非处处一样清晰。先沿着肩、腰与腿的轮廓看一遍，再回头观察垫子怎样承托这条曲线。'},
    {title:'雷诺阿为何这样画', text:'奥赛的作品说明指出，雷诺阿在这件作品中收紧了鲜亮的用色，转向较和谐的色调，也把人物放进提香、鲁本斯与安格尔的人体传统里。这不是“印象派画家不再研究光”那么简单；他换了问题，追求身体的体量、柔和的光与画面的连续性。'},
    {title:'走到隔壁再比较', text:'这件画作于 1907 年，晚于隔壁梵高 1887 年的自画像。相邻展厅让两种选择可以被并置观看，却不代表一条从雷诺阿到梵高的时间线。读完后亲自走到 36 厅的《自画像：巴黎》前，比较人物与背景相接的方式：雷诺阿怎样让它们柔和地过渡，梵高又怎样让笔触持续可见？'}
  ],
  focus:{x:49,y:58,label:'人体与软垫相接处',note:'沿人物的外轮廓看一遍，再看暖色怎样与软垫的颜色相接。'}
};

// The museum's 2026-10-13 object record lists room 35 and the 2026–27 Monet route.
// The freestanding image in the demo does not reproduce its unknown wall position.
window.ORSAY_ROOM35_MONET_DIEPPE_NOTE = {
  id: 'monetDieppe1897', room: '35', readerOnly: true, checkedAt: '2026-10-24',
  artist: '克洛德·莫奈', title: '迪耶普悬崖', original: 'Sur la falaise de Dieppe', year: '1897',
  imageUrl: 'https://cdn.mediatheque.epmoo.fr/link/3c9igq/jcp1butw8ryswn4.jpg',
  imagePage: 'https://www.musee-orsay.fr/fr/oeuvres/sur-la-falaise-de-dieppe-266458',
  imageCredit: '© Musée d’Orsay, dist. RMN-Grand Palais / Sophie Crépy',
  source: 'https://www.musee-orsay.fr/fr/oeuvres/sur-la-falaise-de-dieppe-266458',
  question: '没有人物、也没有故事情节，悬崖怎样让人感到“正在观看”？',
  short: '先找海天交界，再沿右侧陆地回到近处的崖缘。馆方标注 35 厅，但没有公布这幅画的墙位。',
  chapters: [
    {title:'把目光放在边缘',text:'海平线在画面较高处，左边是宽阔的海和天空；右边的陆地斜向近处延伸，前景崖壁却截断了看向海面的路。画面没有安放一个替你观察的游客。试着先沿海平线水平看，再顺着右侧海岸往回走：视线在哪里被近处的悬崖挡住？这种被遮挡的感觉，是画面组织观看的方式。'},
    {title:'地点与画法是两类证据',text:'馆方档案记载此作绘于 1897 年，题为“在迪耶普悬崖上”，尺寸 65 × 92 厘米，并于 2023 年以抵税方式入藏。你能从图上看到冷暖色在崖壁、海与天之间交织，却不能只凭笔触精确确定画家站在哪一处崖边。地名来自馆方作品档案，具体观察点仍需要别的证据。'},
    {title:'在同厅换一个观看问题',text:'走到本 Demo 里另一处雷诺阿《大裸女》数字图像点。雷诺阿让身体轮廓与软垫柔和相接，莫奈则让海岸、海面与天空在色彩变化中相连；前者以人体占住画面，后者让观众在崖边寻找立足之处。比较两幅画最明确的一条边缘，再找一处边缘变得不稳定的地方。馆方分别标注两作在 35 厅，却未公布两幅画的相对墙位。'}
  ],
  focus:{x:66,y:48,label:'右侧陆地与近处崖缘',note:'沿右上方海岸向近处看，找到崖缘把海面遮住的位置；画中没有可据以定位的游客。'}
};

// The current museum record lists room 35 and the 2026–27 Monet route.
// This digital stand is a learning position, not a documented wall position.
window.ORSAY_ROOM35_MONET_CATHEDRAL_NOTE = {
  id:'monetRouenPortal1892',room:'35',readerOnly:true,checkedAt:'2026-10-27',
  artist:'克洛德·莫奈',title:'鲁昂大教堂：正面门廊',original:'La Cathédrale de Rouen. Le Portail vu de face',year:'1892',
  imageUrl:'https://cdn.mediatheque.epmoo.fr/link/3c9igq/tva1butplbsoxr4.jpg',
  imagePage:'https://www.musee-orsay.fr/fr/oeuvres/la-cathedrale-de-rouen-le-portail-vu-de-face-1286',
  imageCredit:'© Musée d’Orsay, dist. RMN-Grand Palais / Patrice Schmidt',
  source:'https://www.musee-orsay.fr/fr/oeuvres/la-cathedrale-de-rouen-le-portail-vu-de-face-1286',
  question:'一座坚硬的石头建筑，为什么在画里像被光重新塑形？',
  short:'先找到正门的暗处，再沿门廊向上看：石雕的轮廓在哪些地方清楚，在哪些地方融进色层？',
  chapters:[
    {title:'先辨认建筑，再看它变得不稳定',text:'画面正对鲁昂大教堂的门廊。门洞深处较暗，周围石面被褐色、灰紫和暖光分成许多细碎的区域。试着沿门廊立柱向上追踪：你能一直画出一条完整的石头轮廓吗？题名中的“正面”说明取景方向，画面却没有把建筑处理成一张线条清楚的立面图。'},
    {title:'同一对象，可以成为不同的绘画问题',text:'奥赛把此作题为“正面门廊”，另题为“棕色和谐”，并记为 1892 年油画、107 × 74 厘米。这两个题名提示我们从两个层次观看：一个是可辨认的建筑，另一个是颜色在画面上形成的关系。不能单凭此画给出作画当天的钟点或天气；此处讨论的是可见的色层与明暗。'},
    {title:'在同厅换一个视线方向',text:'走到本 Demo 中莫奈《迪耶普悬崖》的另一处数字图像点，再比较观看位置。悬崖画让目光横向走向海天交界，门廊画让目光沿石雕上下移动；两幅都让稳定的地形或建筑在光与笔触中变得难以用单一轮廓概括。馆方现行逐件档案把两作都标在 35 厅，但没有公布它们的相对墙位；数字图像点只为步行比较而设。'}
  ],
  focus:{x:48,y:55,label:'暗门洞与受光石面',note:'先看门洞深处，再沿立柱向上追踪轮廓在哪里消散。'}
};
