// Fictional museum visitors. Appearance is stable across all four directions;
// these profiles describe designed characters, not real museum staff.
(() => {
  const profiles={
    player:{name:'绿衣旅行者',gender:'男',age:'青年',hairStyle:'侧分短发',hair:'#333b35',skin:'#c79a78',rise:0,shoulders:7,face:11,bag:'backpack',coat:'#466861',trousers:'#46544e'},
    reception:{name:'入口接待员',gender:'女',age:'成年',hairStyle:'低盘发',hair:'#302d2c',skin:'#d2ac8e',rise:-1,shoulders:6,face:10,bag:null,coat:'#45555a',trousers:'#38464a',uniform:'staff'},
    entranceWoman:{name:'栗发长外套访客',gender:'女',age:'成年',hairStyle:'齐肩发',hair:'#714630',skin:'#c99776',rise:0,shoulders:6,face:10,bag:'crossbody',coat:'#a0806b',trousers:'#514b43',longCoat:true},
    entranceMan:{name:'卷发眼镜访客',gender:'男',age:'青年',hairStyle:'卷发',hair:'#3d322b',skin:'#ac7755',rise:-2,shoulders:8,face:12,bag:null,coat:'#787d8a',trousers:'#414851',glasses:true},
    cafeHostWoman:{name:'咖啡厅迎宾员',gender:'女',age:'成年',hairStyle:'栗色短波波头',hair:'#6d4937',skin:'#d7ad8d',rise:1,shoulders:6,face:10,bag:null,coat:'#4c5e56',trousers:'#454c45',uniform:'host'},
    cafeHostMan:{name:'咖啡厅服务员',gender:'男',age:'成年',hairStyle:'贴头短发',hair:'#2c2d2a',skin:'#825c43',rise:-2,shoulders:8,face:12,bag:null,coat:'#475b51',trousers:'#38483f',uniform:'host',beard:'#40382e'},
    cafeGuestWoman:{name:'马尾裙装访客',gender:'女',age:'青年',hairStyle:'马尾',hair:'#4b3027',skin:'#bc8d6d',rise:-1,shoulders:6,face:10,bag:'shoulder',coat:'#9a7264',trousers:'#564a49',skirt:true},
    cafeGuestOlder:{name:'灰发眼镜访客',gender:'男',age:'年长',hairStyle:'灰发侧分',hair:'#b5b5a9',skin:'#c89f83',rise:1,shoulders:8,face:12,bag:null,coat:'#697887',trousers:'#545b5f',glasses:true,cardigan:true},
    galleryWoman:{name:'围巾短发访客',gender:'女',age:'成年',hairStyle:'黑色短波波头',hair:'#302e2c',skin:'#d1aa8a',rise:1,shoulders:6,face:10,bag:'shoulder',coat:'#8b5147',trousers:'#535349',scarf:'#c8b99b'},
    galleryMan:{name:'白发胡须访客',gender:'男',age:'年长',hairStyle:'灰白短发',hair:'#ccc9ba',skin:'#b58a6e',rise:-1,shoulders:8,face:12,bag:null,coat:'#414d5b',trousers:'#4d514d',beard:'#b8b5a6'}
  };
  for(const profile of Object.values(profiles))Object.freeze(profile);
  Object.freeze(profiles);

  function draw({x,y,facing='down',step=0,coat,scale=1,role='visitor',appearance='player'},rect,shade){
    const person=profiles[appearance]||profiles.player;
    const p=(dx,dy,w,h,color)=>rect(x+dx*scale,y+dy*scale,w*scale,h*scale,color);
    const side=facing==='left'||facing==='right',right=facing==='right',back=facing==='up';
    // Side poses are one drawing mirrored at the character's centre, including
    // nose, fringe, bags and apron. Both feet remain on the existing floor plane.
    const q=side?(dx,dy,w,h,color)=>p(right?dx:-dx-w,dy,w,h,color):p;
    const clothing=coat||person.coat,dark=shade(clothing,-.24),light=shade(clothing,.18);
    const skin=person.skin,skinShade=shade(skin,-.13),skinLight=shade(skin,.12);
    const hair=person.hair,hairLight=shade(hair,.19),hairDark=shade(hair,-.13);
    const stride=step?2:0,rise=person.rise,top=-10+rise,head=-25+rise;
    const shoulder=person.shoulders,pants=person.trousers,foot='#29322f';
    const uniform=person.uniform||(role==='host'||role==='staff'?role:null);

    p(-10,15,20,2,'#252a2a20');p(-7,16,14,1,'#252a2a2a');

    // Legs are independently readable beneath short jackets, coats and skirts.
    const legTop=person.skirt?9:person.longCoat?7:4;
    if(side){
      q(-4-stride,legTop,4,15-legTop,pants);q(1+stride,legTop,4,15-legTop,shade(pants,-.18));
      q(-5-stride,15,7,2,foot);q(1+stride,15,7,2,foot);
      q(-4-stride,15,4,1,shade(pants,.26));q(2+stride,15,4,1,shade(pants,.17));
    }else{
      p(-6,legTop,5,15+stride-legTop,pants);p(1,legTop,5,17-stride-legTop,shade(pants,-.16));
      p(-7,14+stride,7,2,foot);p(1,16-stride,7,2,foot);
      p(-6,14+stride,4,1,shade(pants,.28));p(2,16-stride,4,1,shade(pants,.2));
    }

    if(side){
      q(-5,top,10,16-rise,clothing);q(-5,top+1,2,14-rise,light);q(3,top+1,2,14-rise,dark);
      if(person.longCoat){q(-5,3,11,6,clothing);q(-5,8,11,1,dark)}
      if(person.skirt){q(-5,1,11,4,dark);q(-6,5,13,3,dark);q(-7,8,14,2,shade(clothing,-.16))}
      q(-1,top+2,4,11-stride,shade(clothing,-.08));q(0,top+12-stride,3,4,skin);
      q(4,top+2+stride,2,8-stride,dark);q(4,top+10,2,3,skinShade);
      q(-2,top-2,5,2,skinShade);
      q(3,top,2,3,light);
      if(person.cardigan){q(3,top+3,1,11,'#c3bfae');q(4,top+5,1,1,'#333e40');q(4,top+9,1,1,'#333e40')}
      if(person.bag==='backpack'){
        q(-8,top+5,4,11,'#8a8067');q(-8,top+5,3,8,'#b5a483');q(-8,top+6,3,1,'#d2c09d');
      }else if(person.bag==='crossbody'||person.bag==='shoulder'){
        q(-2,top+1,1,12,'#b8a17a');q(-4,top+11,6,7,'#62523e');q(-4,top+11,6,2,'#b39a73');
      }
      if(uniform==='host'){
        q(4,top+6,2,11,'#dbd0b7');q(3,top+6,3,1,'#f2e7d0');q(4,top+1,1,5,'#ddd0b6');
      }
      if(uniform)q(3,top+4,2,2,'#ebd6a1');
      if(person.scarf){q(-3,top-1,7,3,person.scarf);q(3,top+2,2,6,shade(person.scarf,-.13))}
    }else{
      p(-shoulder+1,top-1,shoulder*2-2,2,light);
      p(-shoulder,top+1,shoulder*2,14-rise,clothing);
      p(-shoulder,top+2,2,12-rise,light);p(shoulder-2,top+2,2,12-rise,dark);
      p(-shoulder+1,5,shoulder*2-2,2,dark);
      p(-shoulder-2,top+3,3,9-stride,clothing);p(shoulder-1,top+3+stride,3,9-stride,dark);
      p(-shoulder-2,top+11-stride,3,4,skin);p(shoulder-1,top+11,3,4,skinShade);
      if(person.longCoat){p(-7,2,14,4,clothing);p(-8,6,16,3,clothing);p(-8,8,16,1,dark)}
      if(person.skirt){p(-6,1,12,3,dark);p(-7,4,14,4,dark);p(-8,8,16,2,shade(clothing,-.16))}
      p(-2,top-3,4,3,skinShade);
      if(back){
        p(-4,top+1,8,1,dark);
        if(person.bag==='backpack'){
          p(-5,top+5,10,10,'#8d8066');p(-4,top+5,8,8,'#b8a783');p(-3,top+5,6,1,'#d1c19c');p(-3,top+12,6,1,'#85785f');
          p(-6,top+1,1,12,'#c9b58f');p(5,top+1,1,12,'#c9b58f');
        }else if(person.bag==='crossbody'){
          for(let n=0;n<5;n++)p(-4+n,top+2+n*2,2,3,'#b8a17a');p(3,top+10,5,6,'#62523e');
        }else if(person.bag==='shoulder'){
          p(5,top+1,1,12,'#a68e66');p(5,top+11,5,6,'#675941');
        }
        if(uniform==='host'){p(-6,top+8,12,1,'#ddd0b6');p(-1,top+8,2,1,'#f2e7d0');p(0,top+9,1,5,'#ddd0b6')}
      }else{
        p(-4,top,3,2,light);p(1,top,3,2,light);
        p(0,top+3,1,11-rise,dark);
        if(person.cardigan){p(-1,top+2,2,12,'#c3bfae');p(0,top+5,1,1,'#343b3b');p(0,top+9,1,1,'#343b3b')}
        if(person.bag==='backpack'){p(-6,top+2,1,10,'#b7a482');p(5,top+2,1,10,'#b7a482')}
        if(person.bag==='crossbody'){
          for(let n=0;n<5;n++)p(-4+n,top+2+n*2,2,3,'#b8a17a');p(3,top+11,5,6,'#62523e');p(3,top+11,5,1,'#b39a73');
        }
        if(person.bag==='shoulder'){p(5,top+1,1,12,'#a68e66');p(5,top+11,5,6,'#675941');p(6,top+12,3,1,'#aa9472')}
        if(uniform==='host'){
          p(-4,top+7,8,10,'#d9cfb7');p(-3,top+7,6,1,'#eee3cd');p(-1,top+1,2,7,'#d9cfb7');p(-2,top+11,4,3,'#c3b9a2');
        }
        if(uniform==='staff'){p(-2,top+2,1,5,'#c5b991');p(1,top+2,1,5,'#c5b991')}
        if(uniform)p(3,top+4,2,2,'#ecd6a0');
      }
      if(person.scarf){p(-5,top-1,10,3,person.scarf);if(!back)p(3,top+2,2,7,shade(person.scarf,-.13))}
    }

    const faceWidth=person.face,half=Math.floor(faceWidth/2),style=person.hairStyle;
    const bun=style==='低盘发',long=style==='齐肩发',bob=style.includes('波波头'),pony=style==='马尾',curly=style==='卷发';
    // Hair behind the face contributes to the silhouette, not just its colour.
    if(side){
      if(long){q(-6,head+2,5,15,hair);q(-7,head+8,3,10,hairDark)}
      if(bob){q(-6,head+2,4,11,hair);q(-6,head+10,4,4,hairDark)}
      if(bun){q(-8,head+5,4,4,hair);q(-9,head+6,2,2,hairLight)}
      if(pony){q(-8,head+5,4,3,hair);q(-9,head+8,3,7,hair);q(-10,head+13,3,3,hairDark);q(-7,head+6,1,2,'#ad8a68')}
      q(-4,head+2,9,11,skin);q(3,head+4,2,8,skinLight);q(5,head+7,2,2,skin);
      q(-5,head+1,10,3,hair);q(-5,head+3,3,7,hair);q(-4,head+2,1,5,hairLight);
      if(curly){q(-5,head-1,3,3,hair);q(-1,head-2,4,3,hair);q(3,head,3,4,hair);q(-7,head+2,3,4,hair);q(1,head-1,2,1,hairLight)}
      else{q(-4,head,7,2,hair);q(-3,head,5,1,hairLight)}
      if(bob){q(-5,head+3,3,10,hair);q(-4,head+12,3,2,hairDark);q(3,head+3,2,3,hair)}
      if(long){q(-5,head+3,3,14,hair);q(-4,head+5,1,10,hairLight);q(3,head+3,2,4,hair)}
      q(3,head+6,1,2,'#30342f');q(-2,head+7,2,3,skinShade);q(-1,head+7,1,2,skinLight);
      q(3,head+11,2,1,skinShade);
      if(person.glasses){q(1,head+5,4,1,'#555b52');q(1,head+6,1,3,'#555b52');q(1,head+8,4,1,'#555b52');q(4,head+6,1,2,'#555b52');q(-1,head+6,2,1,'#555b52')}
      if(person.beard){q(1,head+10,4,3,person.beard);q(0,head+12,4,2,person.beard);q(2,head+10,3,1,shade(person.beard,.18))}
    }else{
      if(long){p(-half-1,head+2,faceWidth+2,15,hair);p(-half-2,head+8,2,10,hairDark);p(half,head+7,2,10,hair)}
      if(bob){p(-half-1,head+2,faceWidth+2,12,hair);p(-half-1,head+10,faceWidth+2,3,hairDark)}
      p(-half,head+2,faceWidth,11,skin);p(half-2,head+4,2,8,skinShade);
      p(-half-1,head+6,1,4,skin);p(half,head+6,1,4,skinShade);
      p(-half-1,head+1,faceWidth+2,3,hair);p(-half+1,head,faceWidth-2,2,hair);p(-half+1,head,Math.max(3,faceWidth-5),1,hairLight);
      if(curly){for(const [dx,dy,w,h] of [[-7,2,3,4],[-5,-1,4,3],[-1,-2,4,3],[3,-1,3,4],[5,2,3,3]])p(dx,head+dy,w,h,hair);p(-3,head-1,2,1,hairLight)}
      if(back){
        p(-half,head+3,faceWidth,9,hair);p(-half+1,head+3,2,7,hairLight);p(half-2,head+5,2,7,hairDark);
        if(long){p(-half,head+10,faceWidth,7,hair);p(-half+1,head+9,2,7,hairLight);p(half-2,head+10,2,7,hairDark)}
        if(bob){p(-half,head+10,faceWidth,4,hair);p(-half+1,head+13,faceWidth-2,1,hairDark)}
        if(bun){p(-3,head+8,6,5,hairDark);p(-2,head+8,4,1,hairLight);p(-1,head+9,3,3,hair)}
        if(pony){p(0,head+7,4,3,hairDark);p(1,head+10,4,7,hair);p(2,head+16,3,2,hairDark);p(0,head+9,4,1,'#ad8a68')}
      }else{
        p(-half,head+3,2,4,hair);p(half-2,head+3,2,3,hairDark);
        if(bun){p(-half-1,head+4,2,5,hair);p(half-1,head+4,2,5,hair)}
        if(bob||long){p(-half-1,head+3,2,bob?10:14,hair);p(half-1,head+3,2,bob?10:14,hairDark);p(-half+1,head+3,3,2,hair)}
        if(pony){p(-half,head+3,faceWidth,2,hair);p(half,head+6,2,8,hairDark)}
        p(-3,head+6,1,2,'#30342f');p(2,head+6,1,2,'#30342f');p(0,head+8,1,2,skinShade);p(-1,head+11,3,1,skinShade);
        if(person.glasses){
          for(const left of [-5,1]){p(left,head+5,4,1,'#555b52');p(left,head+8,4,1,'#555b52');p(left,head+6,1,2,'#555b52');p(left+3,head+6,1,2,'#555b52')}
          p(-1,head+6,2,1,'#555b52');
        }
        if(person.beard){p(-4,head+10,8,2,person.beard);p(-3,head+12,6,2,person.beard);p(-1,head+11,3,1,shade(person.beard,-.22))}
      }
    }
  }
  window.ORSAY_PEOPLE=Object.freeze({profiles,draw});
})();
