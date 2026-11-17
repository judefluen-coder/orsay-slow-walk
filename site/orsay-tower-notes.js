// T is marked as an architecture area with stair symbols on levels 2 and 5 of the 2026 guide.
// The archival photograph is a digital guide image, not a reconstruction of either tower room.
window.ORSAY_TOWER_NOTES={
  tower5:{
    id:'orsayTower5',room:'T',floor:'5',locationScope:'tower',readerOnly:true,checkedAt:'2026-10-21',
    artist:'吉姆·珀塞尔（历史照片）',title:'从车站看向塔楼',original:'Nef, vue d’ensemble vers les tours',year:'1986',
    imageUrl:'https://cdn.mediatheque.epmoo.fr/link/3c9igq/lxs1bfzd2msljog.jpg',
    source:'https://www.musee-orsay.fr/fr/magazine/2024-12-19/de-la-gare-au-musee',
    extraSource:'https://www.lrsh.fr/wp-content/uploads/2007/03/SYNTHESE_LRSH_ORSAY_avril07.pdf',extraSourceLabel:'2007 年访客路线 ↗',
    imageCredit:'1986 年馆方档案照片；不是 2026 年塔楼内景。',
    question:'为什么馆方导览图在 28 厅旁又标出一个 T？',
    short:'先在导览图上辨认钟厅、F 交通核与 T 的相对位置，再想这座车站怎样被改造成可漫游的美术馆。',
    chapters:[
      {title:'先读空间，而不是寻找一幅画',text:'馆方 2026 夏季图把 T 标为塔楼建筑展区，五层的标记位于 28 厅一端。这张 1986 年馆方档案照片从中央大厅朝塔楼方向拍摄，适合辨认建筑体量；它不能证明塔楼内部的当季展品、门洞和观看方向。'},
      {title:'石头包着金属',text:'馆方建筑史说明，维克多·拉鲁设计的奥赛车站于 1900 年启用。面向城市的石质外立面遮掩了现代金属结构，而室内使用电力牵引、升降设备和宽阔大厅。看似古典的外表与工业时代的内部并存，是这座建筑最值得追问的张力。'},
      {title:'从 28 厅走进建筑史',text:'1986 年车站成为美术馆后，ACT 建筑师保留中央大厅作为参观主轴，盖·奥兰蒂团队设计了新的室内陈列。馆方当季图在五层和中层 T 都画了楼梯，2007 年访客研究记录经塞纳侧塔楼从中层上五层；Demo 因此加入可步行的跨层路线。两端对应为跨来源推定，真实门位、踏步、当前通行和藏品位置仍待核实。'}
    ],focus:{x:52,y:40,label:'大厅与塔楼的体量',note:'沿中央大厅的长轴看向远处的塔楼，比较低处行人与高处建筑的尺度。'}
  },
  tower2:{
    id:'orsayTower2',room:'T',floor:'2',locationScope:'tower',readerOnly:true,checkedAt:'2026-10-21',
    artist:'吉姆·珀塞尔（历史照片）',title:'塔楼与中层的关系',original:'Nef, vue d’ensemble vers les tours',year:'1986',
    imageUrl:'https://cdn.mediatheque.epmoo.fr/link/3c9igq/lxs1bfzd2msljog.jpg',
    source:'https://www.musee-orsay.fr/fr/magazine/2024-12-19/de-la-gare-au-musee',
    extraSource:'https://www.lrsh.fr/wp-content/uploads/2007/03/SYNTHESE_LRSH_ORSAY_avril07.pdf',extraSourceLabel:'2007 年访客路线 ↗',
    imageCredit:'1986 年馆方档案照片；不是 2026 年塔楼内景。',
    question:'从罗丹平台转向 T，建筑怎样决定你先看见什么？',
    short:'先看馆方图：中层 T 紧邻罗丹平台，再比较平台、展厅与中央大厅的层次。',
    chapters:[
      {title:'在中层读三种高度',text:'馆方 2026 导览图把 T 画在中层罗丹平台一端。馆方建筑史指出：底层展厅沿中央大厅两侧分布，中层平台俯瞰大厅，顶层位于旧车站门厅上方。这张历史照片给出建筑总体印象，不是此处的现场视角。'},
      {title:'旧车站，新参观路线',text:'车站原来要把旅客带向列车，美术馆则让观众在中央轴线、平台和各层展厅之间选择路线。馆方记载 1986 年改造保留了大空间，并在其中组织新的展览动线。离开罗丹平台进入 T 时，试着记住自己经过了哪个层次，再返回同一平台。'},
      {title:'哪里仍未知',text:'导览图能确认中层 T 和罗丹平台的相对关系，并在中层与五层 T 都画了楼梯；2007 年访客研究记录了塞纳侧塔楼的中层至五层路线。Demo 允许沿这条有历史依据的路线步行换层和原路返回，但两端门洞、真实踏步、展柜位置和当日开放状态仍未核实。'}
    ],focus:{x:52,y:40,label:'大厅上方的层次',note:'辨认中央大厅的纵深与两侧较高的建筑体量，别把历史照片当成中层现场视线。'}
  }
};
for(const note of Object.values(window.ORSAY_TOWER_NOTES))note.imagePage=note.source;
