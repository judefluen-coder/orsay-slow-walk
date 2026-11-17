// Checked on 2026-10-20: Musée d'Orsay lists this work in upper-level room 34.
// The scene image is a reproduction; its wall position remains unverified.
window.ORSAY_ROOM34_NOTE = {
  id: 'monet1886', room: '34', readerOnly: true, checkedAt: '2026-10-21',
  artist: '克洛德·莫奈', title: '户外人物习作：面向左侧的撑伞女人',
  original: "Essai de figure en plein-air : Femme à l'ombrelle tournée vers la gauche", year: '1886',
  imageUrl: 'https://cdn.mediatheque.epmoo.fr/link/3c9igq/squ1buwr1mf8qo0.jpg',
  imagePage: 'https://www.musee-orsay.fr/fr/oeuvres/essai-de-figure-en-plein-air-femme-lombrelle-tournee-vers-la-gauche-1182',
  imageCredit: '© RMN-Grand Palais (Musée d’Orsay) / Stéphane Maréchalle',
  source: 'https://www.musee-orsay.fr/fr/oeuvres/essai-de-figure-en-plein-air-femme-lombrelle-tournee-vers-la-gauche-1182',
  question: '这幅画的主角是撑伞的人，还是包围她的风和光？',
  short: '先从伞边和裙摆看风，再看天空、草地和衣服上的色块如何互相响应。',
  chapters: [
    {title:'从低处看向天空', text:'我们仿佛站在人物下方，身体与撑开的伞一同压向高处的天空。馆方档案将人物标为苏珊娜·奥什代；但这幅画没有把身份写在脸上。沿着伞沿、肩部、裙摆看一圈：边缘有些地方清晰，有些地方似乎被流动的空气松开。'},
    {title:'人物也在天气里', text:'这不是一张先画好人物、再填上风景的肖像。裙子上的亮色、草地的绿、天空的蓝和云影彼此牵连。低视点放大了天空，风吹起的布料又让你感到画面之外的时间。莫奈把户外瞬间的光和空气，带进了几乎与真人等大的单人形象。'},
    {title:'把一把伞带到另一翼', text:'读完后要亲自走过 35、36、37 厅和 Café Campana，再沿连接带去 39 厅看西涅克《撑伞的女人》。奥赛在西涅克的作品说明中，直接提到莫奈的两幅户外人物习作。比较同样的伞与人物：莫奈让人物浸在流动的天气里；西涅克怎样用轮廓和对比色，把她组织成近乎平面的装饰？这是作品关系，不是两厅墙位的推断。'}
  ],
  focus:{x:54,y:45,label:'伞沿与天空相接处',note:'放大伞沿，再沿人物的肩和裙摆追踪风的方向。'}
};

// The museum's 2026-10-21 record places this companion study in room 34.
// The demo's two image stands are a walking comparison, not a wall plan.
window.ORSAY_ROOM34_RIGHT_UMBRELLA_NOTE = {
  id: 'monetUmbrellaRight1886', room: '34', readerOnly: true, checkedAt: '2026-10-24',
  artist: '克洛德·莫奈', title: '户外人物习作：面向右侧的撑伞女人',
  original: "Essai de figure en plein-air : Femme à l'ombrelle tournée vers la droite", year: '1886',
  imageUrl: 'https://cdn.mediatheque.epmoo.fr/link/3c9igq/mav1butnz1mg6f4.jpg',
  imagePage: 'https://www.musee-orsay.fr/fr/oeuvres/essai-de-figure-en-plein-air-femme-lombrelle-tournee-vers-la-droite-1183',
  imageCredit: '© RMN-Grand Palais (Musée d’Orsay) / Stéphane Maréchalle',
  source: 'https://www.musee-orsay.fr/fr/oeuvres/essai-de-figure-en-plein-air-femme-lombrelle-tournee-vers-la-droite-1183',
  question: '同一位模特转过身，画里的风和观看位置也会改变吗？',
  short: '先看伞的绿色内侧、飘起的蓝色围巾与裙摆，再步行去另一处数字图像点比较。',
  chapters: [
    {title:'沿着风的方向看',text:'人物稍向右转，绿色伞面几乎围住头部。蓝色围巾向画面左边散开，裙摆与草丛用短而松动的笔触接在一起。先找伞沿、围巾和地面的三个边缘：哪一处给你最强的运动感？画中没有写出风速，却让布料和笔触替风留下痕迹。'},
    {title:'大幅户外人物实验',text:'馆方档案将模特辨认为苏珊娜·奥什代，记载此作绘于 1886 年，画幅约 130.5 × 89.3 厘米，1927 年由米歇尔·莫奈捐赠。同厅另一幅《面向左侧的撑伞女人》也画于 1886 年。尺寸接近真人，人物却没有被安排在室内肖像常见的固定背景前；天空、草地与身体一起参与构图。模特身份和收藏沿革来自档案，眼前能直接核对的是两幅画的形象差异。'},
    {title:'转身后再看另一幅',text:'走到本 Demo 里《面向左侧的撑伞女人》数字图像点，比较伞面遮住天空的面积、围巾向哪一侧飘、人物与地面怎样相接。两幅画不是简单的镜像：右转图里绿色伞内侧和前景草丛更显眼，左转图里裙身、云团与更高的草地构成另一种节奏。馆方逐件页都标 34 厅，却没有给出两幅原作的相对挂位；数字点的位置只是让你亲自走过去比较。'}
  ],
  focus:{x:55,y:29,label:'伞沿、围巾与天空',note:'放大绿色伞内侧和向左散开的蓝色围巾，再沿着裙摆向下看。'}
};
