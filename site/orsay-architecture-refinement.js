// Architectural finishes for the existing fixed-view Orsay scenes.
// Materials follow ORSAY_PALETTE.md; pixel joints, fittings and mouldings remain
// graphic interpretations. No floor plans, doors, collision bounds or work data change.
(() => {
  const shade=pigmentShade;
  function softVertical(x,y,w,h,top,bottom){
    const gradient=ctx.createLinearGradient?.(0,y,0,y+h);
    if(gradient?.addColorStop){gradient.addColorStop(0,top);gradient.addColorStop(1,bottom);ctx.fillStyle=gradient;ctx.fillRect(x,y,w,h)}
    else rect(x,y,w,h,top);
  }
  function stoneFace(x,y,w,h,tone){
    rect(x,y,w,h,tone);rect(x,y,w,2,shade(tone,.16));
    rect(x,y,2,h,shade(tone,.09));rect(x+w-2,y,2,h,shade(tone,-.15));
    rect(x,y+h-2,w,2,shade(tone,-.16));
  }
  quietWoodFloor=function(x,width,dark=true){
    const tones=dark?['#6c5d50','#706154','#756658','#6e6054']:['#a08d73','#a49176','#9e8b72','#a6947a'];
    ctx.save();ctx.beginPath();ctx.rect(x,415,width,205);ctx.clip();
    rect(x,415,width,205,tones[0]);
    let row=0,y=416;
    while(y<620){
      const height=15+Math.floor((y-415)/26),length=168+row*8,offset=[0,.36,.69,.18][row%4]*length;
      for(let col=-1,left=Math.floor(x/length)*length-offset;left<x+width;left+=length,col++){
        const color=tones[((row*3+col*7)%4+4)%4];
        rect(left,y,length-1,height-1,color);
        rect(left,y,length,1,dark?'#39352f50':'#796b563d');
        rect(left+length-1,y,1,height,dark?'#37352f50':'#74685240');
        rect(left+3,y+1,length-7,1,dark?'#b9a68c24':'#e7d5b329');
        // Two long, discontinuous fibres keep wood readable without adding noise.
        rect(left+11,y+Math.round(height*.38),length*.43,1,dark?'#c0ad9220':'#d9c7a71e');
        rect(left+length*.39,y+Math.round(height*.72),length*.49-12,1,dark?'#332c241b':'#5d51421a');
        if((row+col)%4===0){rect(left+length*.64,y+height*.4,17,1,'#302c251b');rect(left+length*.67,y+height*.4+2,8,1,'#d3bfa01c')}
      }
      y+=height;row++;
    }
    // Contact at the wall and a broad, quiet foreground falloff; no colour wash over art.
    softVertical(x,415,width,16,'#1e242456','#1e242400');
    softVertical(x,566,width,54,'#22272200','#22272218');ctx.restore();
  };
  groundStoneFloor=function(span){
    rect(0,415,span,205,'#b0aca3');
    let row=0,y=416;
    while(y<620){
      const h=28+row*3,w=176+row*7,offset=row%2?w*.5:0;
      for(let x=-w+offset,col=0;x<span;x+=w,col++){
        const tone=['#b7b2a8','#b3afa5','#b9b4aa'][(row+col)%3];
        rect(x+1,y+1,w-2,h-2,tone);rect(x+2,y+2,w-4,1,'#dfd9cb61');
        rect(x+w-1,y,1,h,'#8a89813b');rect(x,y+h-1,w,1,'#82837a32');
        rect(x+18,y+Math.floor(h*.7),w*.4,1,'#e6dfd115');
      }
      y+=h;row++;
    }
    softVertical(0,415,span,15,'#3f433a48','#3f433a00');
    softVertical(0,573,span,47,'#3e433e00','#3e433e12');
  };
  const originalFloor=floor;
  floor=function(){
    if(['61','62','63','64','65','66'].some(number=>player.zone==='room'+number)){
      rect(0,281,W,135,galleryPigments.neutral);groundStoneFloor(W);return;
    }
    return originalFloor();
  };
  wall=function(x1,x2,color=galleryPigments.neutral){
    const width=x2-x1,left=Math.max(0,x1-35),right=x2+35;
    ceiling(x1,x2);rect(left,100,right-left,315,color);
    if(paintedUpperGallery(x1)){
      softVertical(left,100,right-left,36,'#0c151d32','#0c151d00');
      softVertical(left,350,right-left,57,'#15212900','#15212922');
      // A few matte plaster flecks instead of an all-over decorative grid.
      for(let y=146;y<368;y+=59)for(let x=x1+31+(y%3)*23;x<x2;x+=193){rect(x,y,25,1,'#eceee807');rect(x+43,y+18,11,1,'#18232b06')}
      rect(left,393,right-left,2,shade(color,.1));rect(left,395,right-left,12,shade(color,-.16));
      rect(left,405,right-left,2,shade(color,-.25));rect(left,408,right-left,7,'#303639');return;
    }
    // Preserve the existing wall divisions and pilaster coordinates. Paired
    // hairline joints and bevels give depth without replacing the room geometry.
    for(let row=0,y=119;y<365;y+=53,row++){
      rect(x1,y,width,1,shade(color,-.055));rect(x1,y+1,width,1,shade(color,.05));
      for(let x=Math.floor(x1/212)*212+(row%2)*106;x<x2;x+=212)if(x>=x1)rect(x,y+2,1,50,shade(color,-.035));
    }
    softVertical(left,100,right-left,28,'#272d3220','#272d3200');
    const l=x1/studyScale,r=x2/studyScale;
    for(let segment=l;segment<r;segment+=480)for(const offset of [52,171,306,428]){
      const x=(segment+offset)*studyScale;if(x>=x2)continue;
      rect(x-21,102,45,289,shade(color,-.09));
      rect(x-18,103,36,286,shade(color,.12));rect(x-18,103,4,286,shade(color,.21));
      rect(x+12,107,6,282,shade(color,-.055));rect(x+18,107,5,282,shade(color,-.19));
      rect(x-25,97,51,6,shade(color,.2));rect(x-21,103,43,5,shade(color,.08));
      rect(x-18,108,36,2,shade(color,-.06));
      stoneFace(x-23,366,47,12,shade(color,-.03));stoneFace(x-27,378,55,11,shade(color,.07));
      rect(x-27,389,55,4,shade(color,-.17));
    }
    rect(x1,391,width,3,shade(color,.14));rect(x1,394,width,13,shade(color,-.14));
    rect(x1,407,width,3,shade(color,.04));rect(x1,410,width,5,shade(color,-.32));
  };
  artworkLight=function(centerX,top){
    const upper=paintedUpperGallery(centerX),y=top-(upper?47:38),metal=upper?'#424a4e':'#9f8964';
    rect(centerX-6,y-19,12,12,upper?'#3d4549':'#777970');rect(centerX-5,y-19,9,2,upper?'#768084':'#a6a28e');
    rect(centerX-2,y-8,4,13,upper?'#5b6468':'#b29a72');rect(centerX-2,y-8,1,13,upper?'#a8afae':'#d1bc94');
    polygon([[centerX-21,y+4],[centerX+21,y+4],[centerX+25,y+10],[centerX-25,y+10]],shade(metal,.12));
    rect(centerX-25,y+10,50,7,metal);rect(centerX-25,y+10,50,2,shade(metal,.35));
    rect(centerX-25,y+15,50,3,shade(metal,-.35));rect(centerX-18,y+16,36,2,'#e5d6b0');
    rect(centerX-23,y+11,2,4,shade(metal,.2));rect(centerX+21,y+11,2,4,shade(metal,-.18));
    // Restrained spread, with no hard rectangle over the original painting.
    for(let n=0;n<3;n++)polygon([[centerX-17,y+19],[centerX+17,y+19],[centerX+44+n*10,top+96],[centerX-44-n*10,top+96]],'#f3dfad04');
  };
  function reveal(x,width,top,frameTone='#c3bfae'){
    const half=width/2,base=415,inner=width-24;
    rect(x-half-7,top-7,width+14,base-top+13,shade(frameTone,-.27));
    rect(x-half-4,top-5,width+8,base-top+10,frameTone);
    rect(x-half,top,width,base-top,'#30383b');
    // Offset inner planes communicate an open volume rather than a flat closed panel.
    rect(x-half+12,top+13,inner,base-top-13,'#676f6c');
    rect(x-half+12,top+13,inner,Math.max(0,338-top-13),'#858c86');
    softVertical(x-half+12,top+13,inner,Math.min(165,Math.max(1,338-top-13)),'#26363838','#26363800');
    rect(x-half+12,338,inner,5,'#656c61');
    polygon([[x-half+12,343],[x+half-12,343],[x+half,base],[x-half,base]],'#a39379');
    polygon([[x-half,top],[x-half+12,top+13],[x-half+12,343],[x-half,base]],'#646c68');
    polygon([[x+half-12,top+13],[x+half,top],[x+half,base],[x+half-12,343]],'#444f4f');
    polygon([[x-half,top],[x+half,top],[x+half-12,top+13],[x-half+12,top+13]],'#454f51');
    rect(x-half-4,top-5,width+8,3,shade(frameTone,.22));rect(x-half-4,top-2,3,base-top+7,shade(frameTone,.14));
    rect(x+half+1,top-2,3,base-top+7,shade(frameTone,-.15));
    rect(x-half-4,411,width+8,4,'#d0c4ac');rect(x-half-4,415,width+8,3,'#655f50');
    polygon([[x-half,418],[x+half,418],[x+half+20,449],[x-half-20,449]],'#b1a084');
    rect(x-half,418,width,2,'#dacbae');
    polygon([[x-half-1,448],[x+half+20,448],[x+half+23,452],[x-half-20,452]],'#5f5a4b12');
  }
  galleryDoor=function(x){
    const exits=sideExitDirections(),span=navigationSceneWidth();
    if((x===90&&exits.left)||(x===span-90&&exits.right))return;
    doorwayWash(x);reveal(x,100,130);
  };
  galleryOpening=function(x){
    const exits=sideExitDirections(),span=navigationSceneWidth();
    if((x<=90&&exits.left)||(x>=span-90&&exits.right))return;
    doorwayWash(x);reveal(x,100,130,'#c7c5b7');
  };
  landmarkDoor=function(x,width=86,top=226){
    reveal(x,width,top,'#cabb9c');
  };
  trafficLift=function(center,width=126,top=173,kind='f-core'){
    const x=center-width/2,height=415-top,opening=liftRide?.kind===kind?Math.min(width*.32,liftRide.elapsed*width*.32):0;
    // Same shaft and door leaf extents; brushed metal is modelled by a handful
    // of stable vertical bands, never a full-screen shader or moving texture.
    rect(x-12,top-12,width+24,height+20,'#626b69');rect(x-8,top-9,width+16,height+13,'#d0d2ca');
    rect(x-5,top-5,width+10,height+7,'#828b88');rect(x,top,width,height,'#273437');
    rect(x+10,top+12,width-20,height-23,'#626e6d');rect(x+18,top+18,width-36,height-41,'#7d8781');
    rect(x+18,top+height*.58,width-36,3,'#c0c6b9');rect(x+18,top+height*.58+3,width-36,2,'#4f5e5b');
    polygon([[x+12,395],[x+width-12,395],[x+width-2,415],[x+2,415]],'#a8aa9c');
    const leafWidth=width/2-10-opening;
    for(const [left,tone] of [[x+8,'#9aa3a2'],[center+2+opening,'#889694']]){
      rect(left,top+11,leafWidth,height-18,tone);
      rect(left,top+11,2,height-18,shade(tone,.22));rect(left+leafWidth-3,top+11,3,height-18,shade(tone,-.28));
      const bands=[[.08,.18,.09],[.3,.08,.18],[.55,.23,-.08],[.84,.08,.12]];
      for(const [at,w,amount] of bands)rect(left+2+(leafWidth-6)*at,top+15,Math.max(1,(leafWidth-6)*w),height-28,shade(tone,amount));
      for(let y=top+32;y<392;y+=43)rect(left+5,y,Math.max(1,leafWidth-11),1,'#e1e6dc0c');
      rect(left+4,397,Math.max(1,leafWidth-8),5,shade(tone,-.18));
    }
    polygon([[x,top],[x+width,top],[x+width-9,top+11],[x+9,top+11]],'#465452');
    rect(x-8,top-9,width+16,4,'#e1e2da');rect(x-8,top-5,3,height+9,'#bdc5bd');rect(x+width+5,top-5,3,height+9,'#727e78');
    rect(x-5,410,width+10,7,'#bcc3b7');for(let y=412;y<417;y+=2)rect(x+2,y,width-4,1,'#78857b');
    rect(x-8,417,width+16,4,'#747d70');rect(x-8,421,width+16,2,'#414e48');
    rect(center-18,top-34,36,23,'#879083');rect(center-15,top-31,30,17,'#273b37');
    rect(center-14,top-30,28,1,'#57685d');ctx.fillStyle='#ece8cb';ctx.font='12px Georgia,serif';ctx.fillText(floorNumber(player.zone),center-4,top-18);
    const by=top+Math.round(height*.58),bx=x+width+13;
    stoneFace(bx,by,15,30,'#adb6a6');rect(bx+3,by+5,9,9,'#586f64');
    polygon([[bx+7,by+7],[bx+4,by+11],[bx+10,by+11]],liftRide?.kind===kind?'#efd19a':'#dae0ca');
    rect(bx+5,by+19,5,4,'#677a6b');rect(bx+6,by+20,3,1,'#cbd2bb');
    polygon([[x-8,424],[x+width+8,424],[x+width+18,432],[x+2,432]],'#26352c19');
  };
  function stairPortal(x,y,w,h,direction){
    const base=y+h,down=direction==='down';
    rect(x-9,y-11,w+18,h+18,'#7e807d');rect(x-6,y-8,w+12,h+12,'#cfceca');
    rect(x,y,w,h,'#3a3f3e');rect(x+12,y+12,w-26,h-34,'#747773');
    polygon([[x+12,y+12],[x+w-14,y+12],[x+w-26,y+27],[x+26,y+27]],'#515553');
    rect(x+26,y+27,w-52,down?h-107:62,'#5f635f');
    rect(x+w-26,y+25,12,down?h-64:70,'#424744');
    if(down){
      polygon([[x+14,base-22],[x+w-15,base-22],[x+w-29,base-83],[x+29,base-83]],'#2a312e');
      for(let n=4;n>=0;n--){const l=x+16+n*3,r=x+w-17-n*3,b=base-25-n*10;
        polygon([[l,b],[r,b],[r-3,b-8],[l+3,b-8]],['#b1b1ab','#a1a49e','#8e938c','#7d847c','#6e756e'][n]);
        rect(l,b,r-l,2,'#cacac16b');rect(l+3,b-9,r-l-6,2,'#3a423b');
      }
      for(let n=0;n<3;n++){const px=x+w-18-n*6,foot=base-22-n*19;rect(px,foot-31,3,31,'#4f5651');rect(px,foot-31,1,29,'#bec1b8')}
      polygon([[x+w-19,base-54],[x+w-32,base-92],[x+w-28,base-94],[x+w-15,base-55]],'#9ea49a');
      polygon([[x+w-19,base-54],[x+w-32,base-92],[x+w-30,base-93],[x+w-17,base-54]],'#cccdc5');
    }else{
      polygon([[x+29,y+76],[x+w-15,y+76],[x+w-15,y+62],[x+39,y+62]],'#9c9e98');
      rect(x+29,y+76,w-44,3,'#4c534c');rect(x+w-24,y+28,9,39,'#494e4a');
      polygon([[x+15,base-28],[x+w-15,base-28],[x+w-26,y+78],[x+30,y+78]],'#555a54');
      for(let n=4;n>=0;n--){const l=x+17+n*3,r=x+w-16-n*2,b=base-35-n*17;
        polygon([[l,b],[r,b],[r-2,b-9],[l+3,b-9]],n%2?'#b2b4ad':'#bfc0b9');
        rect(l,b,r-l,8,'#81857d');rect(l,b,r-l,2,'#dbdad3');rect(l,b+6,r-l,2,'#535a53');
        rect(l+6,b-7,Math.max(1,r-l-14),1,'#d6d5cd2c');
      }
      for(let n=0;n<3;n++){const px=x+w-17-n*4,foot=base-28-n*34;rect(px,foot-34,3,34,'#525952');rect(px,foot-34,1,32,'#bcc0b7')}
      polygon([[x+w-18,base-61],[x+w-26,base-128],[x+w-22,base-130],[x+w-14,base-62]],'#a4a99f');
      polygon([[x+w-18,base-61],[x+w-26,base-128],[x+w-24,base-129],[x+w-16,base-61]],'#d0d0c7');
    }
    const landing=down?22:28;
    polygon([[x+12,base-landing],[x+w-14,base-landing],[x+w,base],[x,base]],'#abada6');
    polygon([[x,y],[x+12,y+12],[x+12,base-landing],[x,base]],'#b4b5b0');
    polygon([[x+w,y],[x+w-14,y+12],[x+w-14,base-landing],[x+w,base]],'#767b74');
    rect(x+10,y+14,2,h-landing-14,'#d3d4cc');rect(x+w-14,y+14,2,h-landing-14,'#4b534c');
    rect(x-6,y-8,w+12,4,'#dfded8');rect(x-6,y-4,3,h+8,'#c6c8c1');
    rect(x-5,base,w+10,4,'#cfcec6');rect(x-5,base+4,w+10,3,'#6b7169');
    polygon([[x-5,base+7],[x+w+5,base+7],[x+w+15,base+14],[x+5,base+14]],'#373c3523');
  }
  stairEntrance=function(x,y,w,h){stairPortal(x,y,w,h,'up')};
  schematicStairEntrance=function(x,y,w,h,direction){stairPortal(x,y,w,h,direction)};
  fCoreStairEntrance=function(x,y,w,h){stairPortal(x,y,w,h,player.zone==='core5'?'down':'up')};
  groundStudyDesk=function(x,title){
    // Same digital lectern footprint, with a recognisable book and framed legs.
    polygon([[x-57,475],[x+63,475],[x+73,482],[x-46,482]],'#35372d28');
    for(const left of [x-46,x+37]){rect(left,428,9,47,'#5b5242');rect(left,429,2,43,'#9c8662');rect(left+7,432,2,42,'#3b4033')}
    rect(x-39,462,78,5,'#6c604a');rect(x-39,462,78,1,'#b29b72');
    polygon([[x-55,413],[x+55,413],[x+65,432],[x-65,432]],'#b1966c');
    polygon([[x-53,415],[x+53,415],[x+61,430],[x-61,430]],'#9b815c');
    rect(x-65,432,130,6,'#60513b');rect(x-65,432,130,2,'#c1a67a');rect(x-65,436,130,2,'#3c4132');
    polygon([[x-42,409],[x-2,413],[x,428],[x-48,422]],'#b3a17b');polygon([[x+2,413],[x+42,409],[x+48,422],[x,428]],'#9a8865');
    polygon([[x-41,406],[x-2,411],[x,425],[x-47,419]],'#f1e7c9');polygon([[x+2,411],[x+41,406],[x+47,419],[x,425]],'#ddd1af');
    rect(x-1,412,2,14,'#99876a');rect(x+7,410,2,10,'#ad5643');
    for(const [dx,len] of [[-33,22],[13,21]])for(let y=412;y<419;y+=3)rect(x+dx,y,len,1,'#8f86603b');
    captionPlate(title,x-68,445,136,'数字阅读点 · 位置示意');
  };
  drawArtNouveauDisplayStudy=function(){
    rect(35,100,830,307,galleryPigments.artNouveau);
    softVertical(35,100,830,28,'#86887c22','#86887c00');
    for(const x of [242,406,604,776]){rect(x,120,1,272,'#878c7b40');rect(x+1,120,2,272,'#f6f4e854')}
    rect(35,388,830,3,'#e0ddd1');rect(35,391,830,14,'#b1b1a2');
    rect(35,405,830,3,'#dedbcc');rect(35,408,830,7,'#717b69');
  };
  drawRoom61Woodwork=function(){
    // Existing right-side wood fragment; no invented ornamental motif or new bay.
    rect(613,119,113,288,'#6a4c35');rect(619,125,101,276,'#a47e58');
    rect(623,129,93,266,'#b38e62');rect(624,133,91,261,'#c09b6f');
    for(const x of [635,663,691]){
      rect(x-2,142,18,241,'#78563a');rect(x,144,14,236,'#a07851');rect(x+2,146,2,231,'#d4af7d');rect(x+12,148,2,230,'#6e4d34');
      rect(x+4,149,7,227,'#b68d60');
      polygon([[x-2,164],[x+1,151],[x+9,141],[x+15,140],[x+15,145],[x+10,147],[x+6,155],[x+3,166]],'#705035');
      polygon([[x,163],[x+3,152],[x+10,144],[x+14,143],[x+10,148],[x+6,157],[x+4,166]],'#c5a070');
      for(let y=184;y<365;y+=41){rect(x+5,y,1,23,'#e3bb831c');rect(x+8,y+9,1,27,'#68482b20')}
      rect(x-2,380,18,3,'#d1ab77');
    }
    rect(613,119,113,5,'#e0bc88');rect(613,124,113,3,'#8d6745');
    rect(613,127,3,266,'#c7a270');rect(723,127,3,266,'#4b3f2f');
    rect(611,393,117,4,'#c7a16e');rect(611,397,117,7,'#745138');rect(608,404,123,7,'#ae895e');rect(608,411,123,4,'#584833');
  };
  drawRoom65Fireplace=function(){
    // The documented fireplace remains a decorative object, never an exit.
    // Refine existing stone planes and an unlit grate, without fabricated relief.
    stoneFace(632,201,87,204,'#b29a7e');stoneFace(638,208,75,191,'#d0b99a');
    rect(642,214,67,85,'#846f57');rect(645,217,61,79,'#b69a7b');
    rect(649,222,53,70,'#c8ad8c');rect(649,222,53,2,'#e4cfac');
    rect(652,228,47,2,'#d7bc97');rect(652,282,47,2,'#8d765a');
    for(const x of [638,707]){rect(x,218,3,76,'#ad9272');rect(x,222,1,68,'#ecdbb9')}
    rect(626,295,99,4,'#f0d9b3');rect(626,299,99,7,'#cbb08a');rect(630,306,91,6,'#816b51');
    rect(641,315,69,83,'#675641');rect(646,320,59,74,'#373d32');
    rect(649,323,53,66,'#242e27');rect(649,323,53,3,'#171f1c');
    rect(650,383,50,10,'#5b5a43');rect(652,383,46,2,'#8f8060');
    for(const x of [655,668,681,694]){rect(x,362,3,30,'#6d7158');rect(x,362,1,28,'#c1ae82');rect(x-1,361,5,3,'#8b8d68')}
    rect(651,372,48,3,'#b7a57a');rect(651,375,48,2,'#434d36');
    rect(625,397,101,4,'#e8d3ae');rect(625,401,101,6,'#c4a781');
    rect(622,407,107,8,'#9e8465');rect(620,415,111,4,'#d2b995');
  };
  const originalRoom66=drawRoom66Woodwork;
  drawRoom66Woodwork=function(){
    originalRoom66();
    for(const x of [163,345,527,736]){rect(x+2,125,1,249,'#ddbb862d');rect(x+8,126,2,249,'#2f2d2333')}
    for(const x of [183,365,547])for(let y=153;y<350;y+=51){rect(x+13,y,1,30,'#d7af7b14');rect(x+107,y+13,1,37,'#352a2116')}
    rect(145,393,610,2,'#e1b984');rect(145,400,610,2,'#503b2d');
  };
  window.ORSAY_ARCHITECTURE_REFINEMENT=Object.freeze({version:'2026-11-17',functions:['quietWoodFloor','groundStoneFloor','floor','wall','artworkLight','galleryDoor','galleryOpening','landmarkDoor','trafficLift','stairEntrance','schematicStairEntrance','fCoreStairEntrance','groundStudyDesk','drawArtNouveauDisplayStudy','drawRoom61Woodwork','drawRoom65Fireplace','drawRoom66Woodwork']});
})();
