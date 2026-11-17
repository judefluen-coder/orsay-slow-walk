// The museum names the sculpture terrace, but does not publish each sculpture's standing coordinates.
window.ORSAY_MIDDLE_TERRACE_NOTES={
  terrace1870:{
    id:'barriasNature1899',room:'terrace1870',readerOnly:true,locationScope:'sculptureTerrace',checkedAt:'2026-10-19',
    artist:'埃内斯特·巴里亚斯',title:'揭开面纱的自然',original:'La Nature se dévoilant',year:'1899',
    imageUrl:'https://cdn.mediatheque.epmoo.fr/link/3c9igq/tln1bvf1zhi4atc.jpg',source:'https://www.musee-orsay.fr/fr/oeuvres/la-nature-se-devoilant-2016',
    question:'一尊雕像为什么用不止一种石材来表现“自然”？',short:'沿着掀开的面纱，看表面颜色和质地怎样改变。',
    chapters:[
      {title:'不要把雕像当成平面的照片',text:'这件作品高约两米。站在平台上观看时，先留意人物身体、面纱和基座在前后方向的关系；换个位置看，轮廓和遮挡就会改变。数字导览展示的是作品资料，实际站位尚未定位。'},
      {title:'材料也在讲故事',text:'馆方列出多色大理石、阿尔及利亚缟玛瑙、孔雀石和青金石。不同材质让肌肤、布料及细部各有光泽。作品原为波尔多医学院装饰而作，用“自然”揭开面纱的寓言，把科学求知的理想变成人物动作。'},
      {title:'从平台回望建筑',text:'奥赛把中层雕塑平台置于中央大厅两侧，从这里看雕塑，能同时感到作品与车站大厅的尺度。馆方 2011 年年报记载，一座金属连桥从塞纳平台通往 Pavillon Amont 二层；站在这里可以想象游客如何横跨大厅、再进入另一侧展区。Demo 还没有核实这座桥在当季的落点与通行状态，因此不能从这里走捷径。巴里亚斯的古典寓言和底层现实主义的劳动形象也可比较：谁被塑造成知识与力量的象征？馆方作品页只确认雕像位于塞纳平台，具体站位未知。'}
    ],focus:{x:51,y:42,label:'面纱与身体的交界',note:'看不同材质如何分隔皮肤、衣料和象征性细部。'}
  },
  terrace1880:{
    id:'pomponPolarBear',room:'terrace1880',readerOnly:true,locationScope:'sculptureTerrace',checkedAt:'2026-10-27',
    artist:'弗朗索瓦·蓬蓬',title:'白熊',original:'Ours blanc',year:'1923–1933',
    imageUrl:'https://cdn.mediatheque.epmoo.fr/link/3c9igq/wij1bxaknbd15pc.jpg',source:'https://www.musee-orsay.fr/fr/oeuvres/ours-blanc-15496',
    question:'删去毛发与肌肉细节之后，为什么白熊的体积和步伐仍然鲜明？',short:'沿背线与腹线走一遍，再辨认这件石雕的年代。',
    chapters:[
      {title:'先用脚步追踪外轮廓',text:'馆方编目给这件石雕的尺寸为高 163、长 251、深 90 厘米。沿背部的长弧线走向头，再从腹线回到四足：熊的身体像一块连续的体积，脚却把重量一次次交给地面。眼、毛发和肌肉细节被压低后，你仍能从四足与身体的关系辨认行走。若换到另一侧，背与腹的轮廓会重新接合；游戏中的数字站位不是原作的实测围观路线。'},
      {title:'先观察许多细节，再决定删去',text:'蓬蓬曾为罗丹和卡米耶·克洛岱尔加工大理石，1905 年后转而在巴黎植物园观察动物。馆方转述他的做法：先保留许多细节，再逐步删减；他偏爱轮廓圆润、日光能顺着表面流过的浅色石材。比较背、腹和前腿的交界：哪里用一个大转折就说清了姿态，哪里仍必须保留足部的接地信息？这里的简化来自长期观察和雕刻选择，并非对动物身体的忽略。'},
      {title:'分清成名的造型与眼前的版本',text:'《白熊》的造型在 1922 年秋季沙龙使蓬蓬晚年获得公众关注；这件奥赛石雕的现行编目却定为 1923–1933 年间。馆方另记载国家于 1927 年订购，工匠让－约阿希姆·叙佩里参与制作，1929 年交付。将“造型首次成名”与“这一件石雕的制作、入藏”分开，才能读懂复制和版本在雕塑史里的意义。再走到另一侧巴里亚斯的多材料寓言，比较色彩与材质差异如何讲故事，而这里如何依靠一整块浅色体量；两作真实站位与平台距离未核。'}
    ],focus:{x:54,y:48,label:'从背到四足的轮廓',note:'先遮住细部只看外形，仍能看出向前迈步吗？'}
  }
};
for(const note of Object.values(window.ORSAY_MIDDLE_TERRACE_NOTES))note.imagePage=note.source;
