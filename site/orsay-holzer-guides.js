// Exhibition-wide learning points. Museum English and French pages disagree on the room list; neither locates individual installations.
const holzerSource='https://www.musee-orsay.fr/en/program/whats-on/exhibitions/jenny-holzer-jai-vu';
const holzerBooklet='https://www.musee-orsay.fr/sites/default/files/exposition/booklet/2026-10/Brochure%20Expo-Holzer_web_1.pdf';
const holzerTextCredits='https://www.musee-orsay.fr/fr/magazine/2026-10-21/jai-savoure-les-mots-jenny-holzer';
const holzerInteriorImage='https://cdn.mediatheque.epmoo.fr/link/3c9igq/lmu1d14i1r9rwu8.jpg';
const holzerEyewitness='https://www.pinkpink.space/2026/10/26/jenny-holzer-musee-dorsay-jai-vu-en/';
const holzerPressKit='https://presse-orsay-orangerie.epmo-musees.fr/download/?n=DP-PK+Jenny+Holzer+J%27ai+vu+au+mus%C3%A9e+d%27Orsay.pdf&picid=34515';
window.ORSAY_HOLZER_GUIDES={
  '55':{
    id:'holzerWarHistory55',room:'55',readerOnly:true,locationScope:'programContext',checkedAt:'2026-10-28',validThrough:'2027-02-21',
    artist:'亨利·卢梭 × 珍妮·霍尔泽',title:'《战争》：与 J’AI VU 对读',original:'La Guerre / J’AI VU',year:'约 1894／2026',
    imageUrl:'https://cdn.mediatheque.epmoo.fr/link/3c9igq/iut1butm3xrpxxc.jpg',imageCredit:'作品图像：© RMN-Grand Palais (Musée d’Orsay) / image RMN-GP；10 月 26 日独立报道指认 55 厅，馆方逐件页仍标未展出，墙位未确认。',source:'https://www.musee-orsay.fr/fr/oeuvres/la-guerre-8002',imagePage:'https://www.musee-orsay.fr/fr/oeuvres/la-guerre-8002',extraSource:holzerEyewitness,extraSourceLabel:'10 月 26 日现场报道与自摄照片 ↗',exhibitionSource:holzerPressKit,exhibitionSourceLabel:'馆方新闻资料包第 22 页 ↗',
    question:'一间历史画厅把不同战争放在一起时，谁决定我们先看见什么？',
    short:'馆方新闻资料包第 22 页指明 55 厅安排八幅大幅遮盖画；10 月 26 日独立现场报道还将卢梭《战争》与 LED 同框照片指向本厅，但馆方逐件页仍写未展出。数字点不表示实物墙位。',
    chapters:[
      {title:'先辨认战争画中的视线',text:'10 月 26 日现场作者明确写博物馆将 55 厅重挂为战争主题，列出卢梭《战争》、德塔耶《梦》和埃尔维耶《1848 年六月的街垒》；随文自摄照片拍到《战争》与霍尔泽 LED、遮盖绘画同框，但画面里没有 55 厅门牌。馆方 10 月 19 日新闻资料包第 22 页已直接指名 55 厅有八幅大幅遮盖画；它比现场报道更明确地确认展览规划的厅号，却没有给这些画的逐件题名或墙位，也早于开幕一天。卢梭《战争》是否在开幕后挂于此厅仍须另证。馆方作品页描述《战争》里一名持剑和火炬的女子骑在怪异的马形生物上，下面是尸体和乌鸦，红与黑几乎占尽画面。先看视线被骑者拉到哪里，再看底部的人如何几乎失去个体身份；游戏数字点不能替代真实墙位。'},
      {title:'比较图像与被遮住的文字',text:'《战争》约作于 1894 年，馆方认为它仍带着 1870 年战争与巴黎公社的记忆；馆方新闻资料包说明 55 厅八幅遮盖画的议题包括伊拉克战争、针对被拘押者的审讯手法和新兴人工智能威胁；资料包没有给八幅画的逐件题名。霍尔泽借文件中的涂黑痕迹，把“谁决定什么可见”变成画面本身的问题。一个用色彩和形体讲战争，一个让缺失的文字也成为证据。对照时先分开作品描绘的年代、档案原本写成的时间和今天展览的编排。独立报道把同场照片指向 55 厅，但馆方 10 月 16 日更新的《战争》逐件页仍标未展出；新闻资料包确认了霍尔泽遮盖画的厅号，但《战争》的实际挂位仍需带厅牌的照片或馆方开幕后画单。'},
      {title:'把脚步带向四种展厅',text:'另一处《该隐》数字导览使用馆藏图像讲述流亡；馆方 10 月 19 日逐件页标 55 厅，但早于《J’AI VU》开幕，开幕后位置待核。馆方法文展页称灯光作品跨越历史画、自然主义、象征主义和下层库尔贝厅；公开施工合同写 55、58、59、7 厅。沿连接带去 58、59 厅，再经楼层通路去底层 7 厅，比较不同的历史叙述。这个顺序是学习路线；合同只说明工程范围，不能证明最终 LED 经过哪些门洞或作品挂位。'}
    ],focus:{x:51,y:40,label:'骑者、怪马与画面底部的人群',note:'从骑者手中的剑与火炬移到画面下方，分辨寓言形象和躺倒的人。此图是馆藏复制，不是 55 厅现场照片。'}
  },
  '57':{
    id:'holzerArchiveVoices',room:'57',readerOnly:true,locationScope:'programContext',checkedAt:'2026-10-28',validThrough:'2027-02-21',
    artist:'珍妮·霍尔泽',title:'J’AI VU：谁留下了十九世纪的声音？',original:'J’AI VU',year:'2026',
    imageUrl:holzerInteriorImage,imageCredit:'2026 年馆方展览现场照片：© Musée d’Orsay / Laëtitia Striffling-Marcu © Adagp, Paris, 2026；馆方未给出照片中的厅号。',source:holzerSource,imagePage:holzerTextCredits,extraSource:holzerEyewitness,extraSourceLabel:'10 月 26 日 57 厅现场报道 ↗',exhibitionSource:holzerPressKit,exhibitionSourceLabel:'馆方新闻资料包第 22–23 页 ↗',
    question:'走进一间正在换陈的展厅时，谁的文字通常不在墙上？',
    short:'馆方新闻资料包第 22–23 页明确 57 厅安排两幅大画和 34 幅较小金属箔画；10 月 26 日现场报道也指向本厅。逐件题名、挂位和开幕后在场状态仍待核；这里是数字学习入口。',
    chapters:[
      {title:'先辨认说话的人',text:'馆方 10 月 21 日公布：霍尔泽研究了约 985 个文字来源，最后从 424 个来源选出约 753 段文字，涉及 73 位作者；研究阶段统计的 91 个单位还包括报刊与机构。片段、文件和作者不能混为一谈：一份文件可截取几段，一位作者可留下多份文件。遇到一句话，先问谁在什么时间、对谁说，再问为什么今天只读到这一段。上述数字属于整展，不是 57 厅的逐件清单。'},
      {title:'一段历史有很多声音',text:'馆方为 LED《ÉCRIT》列出的写作者包含玛丽·巴什基尔采夫、玛丽·卡萨特与路易丝·米歇尔；同一名单还收有报纸、档案机构和政治文本。展览主题跨越战争、巴黎公社、殖民主义、劳工与艺术批评。这些文字不构成一幅画的统一说明词，彼此可能分歧。回想 55 厅历史画学习点：画家用构图把人群组织为可见场面，霍尔泽让不同的文字在画面旁重新发声。作者在 LED 名单中，不等于她的某句话就显示在你脚下的 57 厅。'},
      {title:'从遮盖的档案读到一句话',text:'馆方统计全展约 753 段所选文字中，331 段以法英双语呈现、243 段只以法语呈现、179 段只以英语呈现。先问自己读懂了哪一种语言，再找原文、日期与出处。10 月 26 日一位现场作者以自摄照片指认 57 厅有 34 幅较小的金属箔绘画，并写到一幅被大面积遮盖、只露出“shifting to softer targets”的画，以及另一幅讨论人工智能的《Teaching Robots》。试着比较：前者剩下的四个词让你产生什么猜测？哪些关键事实仍被黑块挡住？后者为何需要知道文件写作的年代和目的，才能讨论今天的技术？这不是让观众凭一行字猜出整份档案，而是学习区分可见证据、解释和未知。馆方新闻资料包已直接确认 57 厅规划两幅大画与三十四幅小画：两幅大画一幅讨论人工智能引发的伦理和道德责任，另一幅取材于一份讨论国内威胁的报告，文字几乎全部遮盖，只剩“shifting to softer targets”可读。独立报道拍到小画群，却未给逐墙清单；不能由议题相近就认定《Teaching Robots》是资料包所指的哪一幅，或推定其具体墙位。馆方 LED 照片也未标厅号，不能当作 57 厅的逐墙实拍。走到 60 厅整展学习点，再比较金属反光、石刻与滚动文字各要求怎样停留。'}
    ],focus:{x:50,y:37,label:'拱顶下的 LED 文字',note:'对照发光文字、浅色墙面与装饰拱顶，想一想文字如何改变视线。这是馆方现场照片，厅号与墙体属性待核。'}
  },
  '60':{
    id:'holzerStoneAndLight',room:'57／58／60',readerOnly:true,locationScope:'programContext',checkedAt:'2026-10-27',validThrough:'2027-02-21',
    artist:'珍妮·霍尔泽',title:'J’AI VU：同一段文字如何改变观看？',original:'J’AI VU',year:'2026',
    imageUrl:holzerInteriorImage,imageCredit:'2026 年馆方展览现场照片：© Musée d’Orsay / Laëtitia Striffling-Marcu © Adagp, Paris, 2026；馆方未给出照片中的厅号。与 57 厅数字学习点共用同一张未定位的现场图。',source:holzerBooklet,imagePage:'https://www.musee-orsay.fr/fr/magazine/2026-10-21/jai-savoure-les-mots-jenny-holzer',extraSource:'https://www.musee-orsay.fr/fr/magazine/2026-10-21/jai-savoure-les-mots-jenny-holzer',extraSourceLabel:'馆方现场照片与文字来源 ↗',exhibitionSource:'https://www.musee-orsay.fr/fr/programme/agenda/evenements/projections-lumineuses-jenny-holzer-eclaire',exhibitionSourceLabel:'《ÉCLAIRÉ》时间与馆内屏幕 ↗',
    question:'文字放在石凳、立柱或 LED 上，会变成同一种阅读吗？',
    short:'先看馆方现场照片：LED 横过拱顶前方，但照片没有厅号。本区是整展学习入口，不是装置在 60 厅的定位。再比较石刻与灯光要求怎样移动和等待。',
    chapters:[
      {title:'材料决定阅读速度',text:'馆方 2026 年 10 月 21 日刊出的现场照片，拍到文字灯带、拱顶和窗；照片未标厅号，不能据拱顶把它放入 60 厅。展览折页列出十七张刻字石凳、两根石柱；第 2 页示意图把编号 1–10 标在底层、11–19 标在中层。但馆方同日文章又说十九件石作分布在底层空间，楼层表述彼此冲突；具体位置须以现场展签核对。跨层 LED 装置另以逾 650 段文字组成 24 小时循环。折页把《A CONFLICT》列为萨朗科兰－伊列大理石凳，把《MAD JUST NOW》列为绿色奇波利诺大理石柱；两件的厅号仍待核。刻在石上的句子可以靠近、停留；电子文字则随时间消失或重现。开幕周另有塞纳侧外墙投影《ÉCLAIRÉ》，仅在 10 月 18–22 日晚间播放；馆方称从 23 日到闭幕会在馆内屏幕重放片段，但未公布屏幕位置。屏幕不是这张 LED 现场照里的装置，也不能放进本厅的虚拟墙面。比较不同媒介要求的行走与等待；手册的楼层点位尚未配准到本 Demo 的 60 厅。'},
      {title:'一份文件怎样成为一幅画',text:'馆方手册说，霍尔泽将解密政府文件手工转写到亚麻布上，叠加油彩，有时再覆金属箔；她也借鉴俄国至上主义对色、光与形的探索。遮盖文字的黑块既是档案里留下的缺口，也是画面上的形状。馆方新闻资料包第 22–23 页进一步指明：临塞纳河的 57 厅规划两幅大画与三十四幅小幅金属箔遮盖画，表面会随河面的光线改变；这是资料包的厅级信息，不是每幅的现场墙位。试着分开两种观看：先问哪些字被遮住、谁作出遮盖决定；再看黑块、留白与反光怎样组织视线。作品让“保密可能保护谁、又可能掩盖什么”成为问题，并未替每份文件给出同一个答案。法文展页只说独立展室在塞纳河侧，折页的着色区域未印厅号；现在馆方新闻资料包已直接指名 57 厅，10 月 26 日独立现场作者也这样指认。资料包生成于开幕前一天，现场照片未见厅牌，仍需可配准的开幕后资料确认具体画位与通道。'},
      {title:'让文字和画互相追问',text:'馆方说，每件刻字石作都与一件馆藏绘画或雕塑对话，却没有在手册中逐一列出配对和厅号；现场看到石凳时，先核对展签，不用距离替代证据。霍尔泽也以十九世纪资料回应奥赛所收藏的时代。读完后经 F 交通核走到底层 7 厅，读库尔贝《画家的画室》的数字导览：画面让谁可见，文字又让谁开口？馆方只说 LED 延伸至下层库尔贝厅，没有说明对应 6／7 厅或具体站位；这条步行路线是学习顺序，不是装置动线。'}
    ],focus:{x:48,y:52,label:'灯带与拱顶的相对位置',note:'看发光文字如何横向穿过视野，再追问：原处的建筑细节是否仍看得清？这张现场照片不能定位到 60 厅。'}
  }
};

// The museum's current object page says this painting is not displayed. Its former room-57
// placement belongs to a dated teaching route; this is a separate, nonphysical archive stand.
window.ORSAY_ROOM57_ARCHIVE_NOTE={
  id:'devambezCharge1902Archive',room:'57',readerOnly:true,locationScope:'collection',checkedAt:'2026-10-21',
  artist:'安德烈·德瓦姆贝兹',title:'《冲锋》',original:'La Charge',year:'约 1902',
  imageUrl:'https://cdn.mediatheque.epmoo.fr/link/3c9igq/utk1buws80l1hi8.jpg',
  imagePage:'https://www.musee-orsay.fr/fr/oeuvres/la-charge-9246',
  imageCredit:'图像：© RMN-Grand Palais (Musée d’Orsay) / Hervé Lewandowski；经馆方作品页在线展示。原作当前未展出。',
  source:'https://www.musee-orsay.fr/fr/oeuvres/la-charge-9246',
  extraSource:'https://www.musee-orsay.fr/sites/default/files/2020-12/fiche_visite_art_et_pouvoir.pdf',extraSourceLabel:'馆方旧教学路线（非当季厅位）↗',
  question:'从楼上俯看一场冲突，画家把谁放在画面中央？',
  short:'先沿画中的斜线找警察与奔散的人，再看中央路灯周围的空地。馆方现行档案写原作未展出；这里是历史馆藏数字图像，不是 57 厅挂画。',
  chapters:[
    {title:'让目光顺着斜线走',text:'德瓦姆贝兹以俯视角度画街头冲突。先从画面一端沿斜线寻找警察队列，再看奔散的人群与中央路灯附近的空处。透视并非只是记录：它决定我们先看见队列的秩序，还是个人的处境。馆方把作品年代记为约 1902 年，不能把画中人直接认作某一场已确认的示威者。'},
    {title:'同一画面可以被不同权力观看',text:'馆方作品页说明，此画曾长期放在 1927–1934 年任巴黎警察局长的 Chiappe 办公室。作品诞生、后来悬挂的行政空间与今天的馆藏解读，是三个不同的时间和语境。观看位置会改变提问：在画面里被当作“人群”的人，若能说话，会怎样描述这条街？'},
    {title:'走向另一侧，换一种证据',text:'同厅另一处霍尔泽数字学习点介绍十九世纪档案文字。读完两处再比较：画家让我们从高处看见人群的形状，档案文字可能把某个具体写作者的经历带回来；文字同样经过选择和剪辑，不能自动代表所有人的声音。馆方旧教学路线曾把《冲锋》写在 57 厅，但 2026 年作品页明确标原作未展出。两个数字点之间的方向与距离纯属交互设计。'}
  ],
  focus:{x:51,y:51,label:'路灯周围的空处',note:'从这里追随画面的斜线，再观察谁在画面中央、谁被压向边缘。'}
};
