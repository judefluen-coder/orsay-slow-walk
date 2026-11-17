// Furniture studies use the existing footprints and source-backed material families.
// They refine the pixel silhouette; they do not assert measured or current placement.
(() => {
  const timber={edge:'#514839',dark:'#6c5a43',body:'#967c58',light:'#c0a477',top:'#d0b58a'};
  const sage={edge:'#384b44',dark:'#52665b',body:'#829483',light:'#acb8a2',top:'#c0c7ae'};
  function leg(x,y,h,color='#46514b',width=5){
    polygon([[x,y],[x+width,y],[x+width+2,y+h],[x-1,y+h]],color);
    rect(x+1,y+1,1,Math.max(1,h-2),'#b8b49a70');rect(x-2,y+h,width+5,2,'#26332b4d');
  }
  function footShadow(x,y,w){
    polygon([[x+7,y],[x+w-8,y],[x+w+3,y+5],[x+w-2,y+8],[x-3,y+8],[x-7,y+4]],'#30342d1d');
    rect(x+8,y+1,w-16,3,'#242c2520');
  }
  function bench(x,y,w=150,back=false,palette=timber){
    const seatY=y+(back?32:7),floorY=seatY+(back?29:40);
    footShadow(x,floorY-3,w);
    if(back){
      for(const px of [x+13,x+w-19])leg(px,y+4,53,palette.edge,5);
      polygon([[x+4,y+3],[x+w-5,y+3],[x+w-1,y+8],[x+w-3,y+31],[x+2,y+31],[x,y+7]],palette.dark);
      for(let row=0;row<3;row++){
        rect(x+4,y+6+row*8,w-10,6,palette.body);
        rect(x+5,y+6+row*8,w-13,1,palette.light);
      }
      rect(x+7,y+4,w-17,2,palette.top);rect(x+w-6,y+9,3,21,palette.edge);
    }
    for(const px of [x+17,x+w-24])leg(px,seatY+9,back?21:31,palette.edge,7);
    rect(x+21,seatY+25,w-45,4,palette.dark);rect(x+22,seatY+25,w-47,1,palette.light);
    polygon([[x+7,seatY-3],[x+w-9,seatY-3],[x+w-1,seatY+4],[x+1,seatY+4]],palette.top);
    polygon([[x+1,seatY+4],[x+w-1,seatY+4],[x+w-3,seatY+12],[x+3,seatY+12]],palette.dark);
    rect(x+4,seatY+5,w-9,3,palette.body);rect(x+7,seatY-2,w-17,1,palette.light);
    for(let n=1;n<3;n++)rect(x+8,seatY-3+n*2,w-19,1,'#59482f26');
    rect(x+4,seatY+10,w-9,2,palette.edge);
    for(const px of [x+19,x+w-22]){rect(px,seatY+7,2,2,palette.top);rect(px+1,seatY+8,1,1,palette.dark);}
  }
  function loungeChair(x,y){
    footShadow(x-3,y+54,59);
    for(const px of [x+4,x+42])leg(px,y+37,18,'#3d3d35',5);
    polygon([[x+5,y+1],[x+45,y+1],[x+51,y+7],[x+48,y+32],[x+2,y+32],[x,y+7]],'#743c36');
    polygon([[x+7,y+2],[x+43,y+2],[x+47,y+7],[x+45,y+27],[x+4,y+27],[x+3,y+8]],'#b45d4b');
    rect(x+7,y+3,35,2,'#d48568');rect(x+5,y+7,2,17,'#c8765b');rect(x+43,y+9,3,19,'#8b443c');
    polygon([[x+4,y+28],[x+47,y+28],[x+52,y+35],[x+48,y+44],[x+1,y+44],[x-2,y+35]],'#833c35');
    polygon([[x+5,y+29],[x+45,y+29],[x+49,y+34],[x+46,y+38],[x+3,y+38],[x+1,y+34]],'#ce775d');
    rect(x+3,y+38,43,3,'#a54e41');rect(x+7,y+30,34,1,'#e19b74');
  }
  function saucerCup(x,y){
    rect(x-3,y+6,19,2,'#4e47352e');
    polygon([[x-4,y+5],[x+13,y+5],[x+16,y+7],[x+11,y+9],[x-2,y+9],[x-5,y+7]],'#d8d4bd');
    rect(x-1,y,11,7,'#e8e7d7');rect(x,y,8,1,'#fff9e7');rect(x+1,y+1,6,2,'#66513b');
    rect(x+10,y+1,4,5,'#c8cebf');rect(x+11,y+2,2,2,'#8e7c61');rect(x,y+6,9,1,'#b5bcad');
  }
  function petalChair(x,y,blue){
    const c=blue?['#416e70','#78a5a3','#a4c4bb','#568887']:['#786d48','#aea578','#d1c598','#938b60'];
    footShadow(x-2,y+69,34);
    // Fine metal legs and separate upholstered seat distinguish it from a bar stool.
    for(const [dx,back] of [[5,true],[23,true],[2,false],[27,false]])leg(x+dx,y+(back?28:43),back?42:27,'#9d8b5e',3);
    rect(x+5,y+51,22,2,'#83754f');rect(x+6,y+51,20,1,'#c9b986');
    for(const [dx,dy,flip] of [[0,0,false],[14,0,true],[0,15,true],[14,15,false]]){
      polygon([[x+dx+4,y+dy],[x+dx+10,y+dy],[x+dx+14,y+dy+4],[x+dx+14,y+dy+12],[x+dx+10,y+dy+17],[x+dx+4,y+dy+18],[x+dx,y+dy+13],[x+dx,y+dy+5]],c[0]);
      polygon([[x+dx+4,y+dy+2],[x+dx+10,y+dy+2],[x+dx+12,y+dy+5],[x+dx+12,y+dy+11],[x+dx+9,y+dy+15],[x+dx+5,y+dy+16],[x+dx+2,y+dy+12],[x+dx+2,y+dy+5]],flip?c[3]:c[1]);
      rect(x+dx+4,y+dy+2,6,2,c[2]);
    }
    rect(x+13,y+12,2,23,c[0]);
    polygon([[x+2,y+34],[x+25,y+34],[x+31,y+40],[x+28,y+46],[x-1,y+46],[x-3,y+40]],c[0]);
    polygon([[x+3,y+34],[x+24,y+34],[x+28,y+39],[x+25,y+42],[x+1,y+42],[x,y+38]],c[1]);
    rect(x+4,y+35,20,2,c[2]);rect(x+1,y+43,26,2,c[3]);
  }
  function woodCafeTable(x,y){
    footShadow(x-38,y+48,83);
    leg(x-4,y+9,37,'#625c45',7);
    polygon([[x-5,y+42],[x+5,y+42],[x+23,y+48],[x+23,y+51],[x-21,y+51],[x-21,y+48]],'#4b5147');
    rect(x-18,y+47,37,2,'#8b8c70');
    polygon([[x-32,y-7],[x+32,y-7],[x+41,y],[x+41,y+7],[x-41,y+7],[x-41,y]],'#4a382d');
    polygon([[x-31,y-7],[x+31,y-7],[x+40,y],[x+33,y+3],[x-34,y+3],[x-40,y]],'#92704b');
    rect(x-30,y-6,60,2,'#b39567');rect(x-38,y+4,76,2,'#694c36');rect(x-31,y+8,63,3,'#4c4133');
    for(const [dx,dy,w] of [[-26,-2,22],[-11,0,33],[15,-2,13]])rect(x+dx,y+dy,w,1,'#d0af7a38');
    saucerCup(x-6,y-13);
  }
  casework=function(){bench(1130,391,140,true,sage);loungeChair(1455,402);};
  cafeSeat=function(x,back=false){
    const y=back?450:532;
    petalChair(x-57,y-22,false);petalChair(x+36,y-22,true);
    woodCafeTable(x,y);
  };
  function terraceChair(x,y){
    footShadow(x-3,y+55,34);
    for(const [dx,b] of [[4,true],[23,true],[1,false],[27,false]])leg(x+dx,y+(b?8:35),b?47:20,'#4e6659',3);
    polygon([[x+3,y+1],[x+23,y+1],[x+29,y+6],[x+27,y+32],[x+1,y+32],[x-1,y+6]],'#37594f');
    rect(x+3,y+6,21,20,'#8da58d');rect(x+3,y+5,21,2,'#bdc4a3');
    for(let i=0;i<4;i++)rect(x+6+i*5,y+8,2,17,i%2?'#647f6e':'#d0c9a1');
    polygon([[x+1,y+30],[x+27,y+30],[x+31,y+36],[x+27,y+41],[x-2,y+41],[x-3,y+36]],'#375b4f');
    polygon([[x+3,y+31],[x+26,y+31],[x+28,y+35],[x+25,y+37],[x,y+37],[x,y+34]],'#92aa90');
    rect(x+2,y+32,23,2,'#b2bea0');rect(x+2,y+39,25,2,'#658371');
  }
  terraceTable=function(x,y){
    terraceChair(x-22,y+5);terraceChair(x+65,y+5);
    footShadow(x-11,y+55,84);
    leg(x+27,y+18,35,'#435d50',7);
    polygon([[x+25,y+49],[x+34,y+49],[x+52,y+54],[x+49,y+58],[x+12,y+58],[x+9,y+54]],'#4b6354');
    rect(x+13,y+53,35,2,'#a0aa8c');
    polygon([[x,y+3],[x+62,y+3],[x+73,y+13],[x+73,y+18],[x-11,y+18],[x-11,y+13]],'#706f5a');
    polygon([[x,y+3],[x+62,y+3],[x+72,y+12],[x+64,y+14],[x-2,y+14],[x-10,y+12]],'#e2d6bb');
    rect(x+2,y+4,58,2,'#f6e7c5');rect(x-8,y+15,77,2,'#acaa8b');
    rect(x+17,y+9,35,1,'#c2b69755');saucerCup(x+16,y-1);
  };
  function gareChair(x,y){
    footShadow(x-4,y+59,36);
    for(const [dx,back] of [[3,true],[25,true],[0,false],[28,false]])leg(x+dx,y+(back?3:38),back?56:21,'#3e5548',3);
    polygon([[x+2,y],[x+25,y],[x+29,y+4],[x+29,y+31],[x-1,y+31],[x-1,y+5]],'#2f5247');
    rect(x+3,y+4,22,22,'#597d67');rect(x+4,y+4,20,2,'#8ba18a');
    for(let i=0;i<3;i++){rect(x+5+i*7,y+8,4,13,'#6f8b72');rect(x+6+i*7,y+8,1,13,'#829d80');}
    polygon([[x+1,y+29],[x+26,y+29],[x+31,y+35],[x+28,y+40],[x-3,y+40],[x-4,y+35]],'#3a5b49');
    rect(x,y+31,27,5,'#7c9276');rect(x+3,y+31,22,1,'#a4b197');rect(x-1,y+38,29,2,'#52735b');
  }
  function gareFurniture(){
    // Keep the existing upholstered banquette and counter footprints.
    footShadow(276,438,297);
    rect(278,348,291,77,'#927c5c');rect(280,346,287,4,'#b6a07a');
    for(let n=0;n<7;n++){
      const x=284+n*40;
      polygon([[x+2,350],[x+35,350],[x+38,354],[x+38,410],[x,410],[x,355]],'#c6b18b');
      rect(x+3,352,31,3,'#e1cda5');rect(x+3,356,2,50,'#d7c199');rect(x+35,357,2,51,'#a58d68');
      rect(x+18,370,2,3,'#ab936f');
    }
    polygon([[278,412],[568,412],[574,421],[568,432],[277,432],[274,421]],'#405e4b');
    rect(280,414,284,8,'#8c9e7c');rect(281,414,282,2,'#b2ba93');rect(280,425,284,5,'#5c795c');
    for(let x=321;x<563;x+=40)rect(x,415,1,14,'#4a684f');
    for(const x of [288,548])leg(x,431,15,'#61533f',7);
    footShadow(603,440,224);
    rect(608,378,214,64,'#3f5c4f');rect(613,385,204,48,'#6c8570');
    for(let i=0;i<5;i++){
      const x=618+i*39;rect(x,389,33,39,'#526e5a');rect(x+2,391,29,2,'#8a9d7d');rect(x+31,391,2,34,'#344f42');
    }
    rect(612,434,207,6,'#314c3f');rect(616,440,7,7,'#484f3f');rect(807,440,7,7,'#484f3f');
    polygon([[608,366],[817,366],[827,373],[827,379],[603,379],[603,373]],'#7d7560');
    polygon([[608,366],[817,366],[825,372],[816,374],[610,374],[604,371]],'#e2d4b3');rect(609,367,207,2,'#f5e5bf');rect(604,376,221,3,'#a79a79');
    rect(623,325,184,40,'#40564c');rect(628,330,174,29,'#8ca89a');
    polygon([[630,331],[799,331],[790,337],[639,337]],'#d4e0ce55');
    rect(632,332,3,25,'#e3e9d5');rect(710,329,3,31,'#4c6c5d');rect(625,359,180,6,'#536958');
    for(const x of [646,673,738,765]){rect(x,349,18,7,'#b39455');rect(x+3,346,12,4,'#dcc18b');rect(x+5,346,7,1,'#eee0b0');}
    for(const x of [346,503]){
      footShadow(x-43,505,87);leg(x-4,461,42,'#455548',7);
      polygon([[x-5,500],[x+5,500],[x+24,506],[x+21,510],[x-21,510],[x-24,506]],'#465448');
      rect(x-19,504,39,2,'#83917b');
      polygon([[x-32,447],[x+32,447],[x+41,454],[x+41,462],[x-41,462],[x-41,454]],'#8d8166');
      polygon([[x-31,447],[x+31,447],[x+40,454],[x+32,457],[x-32,457],[x-40,454]],'#e0d2b2');
      rect(x-31,448,61,2,'#f6e7c5');rect(x-38,458,76,2,'#b8aa87');saucerCup(x-7,439);
      gareChair(x+29,470);
    }
  }
  function restaurantFurniture(){
    for(const x of [176,362,548,734]){
      footShadow(x-68,473,138);
      for(const dx of [-53,36]){
        const cx=x+dx;
        // The museum identifies translucent contemporary Foggini chairs.
        polygon([[cx+3,394],[cx+8,387],[cx+22,385],[cx+30,393],[cx+29,435],[cx+2,435],[cx,405]],'#a57e4c85');
        polygon([[cx+5,396],[cx+10,390],[cx+21,389],[cx+27,395],[cx+25,429],[cx+6,429]],'#e3bd7b83');
        for(const [px,py,w,h] of [[7,397,2,25],[12,392,2,30],[18,396,2,25],[23,399,2,22]])rect(cx+px,py,w,h,'#fff0b36b');
        polygon([[cx+3,431],[cx+27,431],[cx+31,438],[cx+27,444],[cx,444],[cx-2,438]],'#b08a51c9');
        rect(cx+3,433,23,4,'#e0bf82b3');rect(cx+5,433,18,1,'#fff1bcaa');
        for(const [px,b] of [[4,true],[24,true],[1,false],[27,false]])leg(cx+px,b?424:441,b?50:33,'#b49b68b3',3);
      }
      leg(x-36,437,36,'#827254',5);leg(x+30,437,36,'#827254',5);
      polygon([[x-52,413],[x+52,413],[x+62,424],[x+57,449],[x-57,449],[x-62,424]],'#c8b99a');
      polygon([[x-52,413],[x+52,413],[x+61,423],[x+54,426],[x-54,426],[x-61,423]],'#fcf1d6');
      polygon([[x-60,425],[x+60,425],[x+55,448],[x-55,448]],'#e6d8b9');
      for(const [dx,w] of [[-49,3],[-22,2],[17,3],[47,3]]){
        polygon([[x+dx,426],[x+dx+w,426],[x+dx+w+2,447],[x+dx-1,447]],dx<0?'#fff2d4':'#c6b690');
      }
      rect(x-51,414,102,1,'#fff9e6');rect(x-54,447,108,2,'#bcad8c');
      for(const px of [-26,26]){
        polygon([[x+px-9,417],[x+px+7,417],[x+px+11,420],[x+px+7,423],[x+px-9,423],[x+px-12,420]],'#e0dbc4');
        rect(x+px-7,418,14,3,'#fff9e7');rect(x+px-4,419,8,1,'#c5c8b6');
        rect(x+px-16,417,1,8,'#889486');rect(x+px+14,417,2,8,'#9fa392');
      }
      rect(x-4,406,7,9,'#819a87');rect(x-3,406,2,8,'#d7e1cc');rect(x-7,403,14,3,'#a5b19b');rect(x-4,399,8,4,'#d6c99f');
    }
  }
  function serviceLedge(){
    footShadow(93,426,99);rect(98,392,88,33,'#405d4e');
    for(let i=0;i<4;i++){const x=103+i*20;rect(x,397,16,23,'#78906f');rect(x+1,398,13,2,'#a7b18b');rect(x+14,399,2,20,'#314c40');}
    rect(95,422,94,5,'#304a3e');
    polygon([[95,380],[189,380],[194,386],[192,391],[91,391],[90,386]],'#9b967a');
    rect(95,381,94,3,'#efe1bd');rect(92,387,100,2,'#c5bd98');
  }
  function clockRoomCabinet(){
    footShadow(374,440,73);
    for(const x of [378,435])leg(x,432,13,'#3f4d40',6);
    polygon([[374,372],[446,372],[448,435],[373,435]],'#354c40');
    rect(377,376,66,54,'#657b60');rect(377,376,66,3,'#8da180');
    for(const x of [382,411]){
      rect(x,384,26,43,'#3f5c47');rect(x+2,386,22,38,'#72886a');
      rect(x+3,387,19,2,'#95a080');rect(x+22,390,2,32,'#536b50');
    }
    rect(403,398,2,8,'#c4b388');rect(414,398,2,8,'#c4b388');
    rect(376,430,68,6,'#3c5745');rect(375,432,71,2,'#293f34');
    polygon([[374,364],[445,364],[451,369],[450,375],[369,375],[368,369]],'#8c7756');
    polygon([[374,364],[445,364],[450,369],[444,371],[374,371],[369,369]],'#c5b086');
    rect(375,365,68,2,'#e6d4ac');rect(370,372,79,2,'#a08b65');
    for(const x of [382,404,426]){
      rect(x+1,345,12,20,'#827454');rect(x,344,11,20,'#d5c39a');
      rect(x+2,346,7,13,'#eee4c5');rect(x+2,346,7,2,'#fff0d1');
      rect(x+2,360,7,2,'#8a8669');rect(x-1,364,15,2,'#ad9871');
    }
  }
  function terraceBarCounter(x){
    rect(x-12,377,211,50,'#365442');rect(x-8,382,202,40,'#758b67');
    for(let px=x-5;px<x+190;px+=26){
      rect(px,384,21,35,'#3c604b');rect(px+2,386,17,29,'#617d5d');
      rect(px+3,387,14,2,'#9ca97e');rect(px+17,388,2,26,'#476748');
    }
    rect(x-13,422,213,6,'#334d3b');rect(x-12,423,210,2,'#587454');
    rect(x-17,429,221,4,'#263e32');rect(x-17,426,221,3,'#536b50');
    polygon([[x-11,367],[x+198,367],[x+205,373],[x+204,380],[x-17,380],[x-18,373]],'#847b5f');
    polygon([[x-11,367],[x+198,367],[x+204,372],[x+196,375],[x-10,375],[x-17,372]],'#d2c39d');
    rect(x-10,368,206,2,'#efe0b7');rect(x-15,376,217,2,'#ae9d78');
    for(const [dx,dy,w,h] of [[17,359,16,10],[143,354,24,15]]){
      rect(x+dx,dy,w,h,'#958b6b');rect(x+dx+2,dy,w-4,2,'#d9ceaa');
      rect(x+dx+3,dy+4,w-6,2,'#b8ad88');rect(x+dx+3,dy+8,w-6,2,'#c6bb94');
      if(h>10)rect(x+dx+3,dy+12,w-6,2,'#aaa07d');
    }
  }

  drawCafeDeLaGare=function(t){
  ctx.clearRect(0,0,W,H);rect(0,0,SIDE_W,415,'#ded4bf');floor();
  rect(0,415,SIDE_W,205,'#c0b39b');rect(0,415,SIDE_W,5,'#8b826d');
  for(let y=425;y<620;y+=43){
    rect(0,y,SIDE_W,2,'#d9cdb5');
    for(let x=(Math.floor(y/43)%2)*70-140;x<SIDE_W;x+=140){rect(x,y+2,2,40,'#9c927c');rect(x+5,y+5,130,2,'#d1c5ad55')}
  }
  rect(0,590,SIDE_W,30,'#6f65512b');
  rect(0,0,SIDE_W,86,'#ece5d4');
  for(const x of [80,315,550,785]){
    rect(x-7,0,53,93,'#bdb5a1');rect(x,0,39,89,'#e2dccb');rect(x+5,0,28,89,'#f3ebd9');
    rect(x-10,85,59,10,'#aaa18d');rect(x-6,83,51,5,'#f3ebd9');
    for(const y of [22,61])for(const dx of [7,27]){rect(x+dx,y,4,4,'#b7ae98');rect(x+dx,y,3,2,'#d2c8b3')}
  }
  rect(0,95,SIDE_W,17,'#bdb49e');rect(0,95,SIDE_W,5,'#f3e9d3');rect(0,112,SIDE_W,6,'#9a947e');
  rect(0,118,SIDE_W,270,'#dfd4bd');
  for(let y=159;y<372;y+=40)rect(32,y,SIDE_W-64,2,'#eee4ce88');
  for(const x of [44,846]){rect(x,118,13,276,'#bdb49b');rect(x+3,118,7,276,'#e9dfc8');rect(x-5,389,23,16,'#b4a78a')}
  rect(0,390,SIDE_W,10,'#b7a98d');rect(0,400,SIDE_W,7,'#e9ddc2');rect(0,407,SIDE_W,8,'#8d826a');
  for(const x of [340,504]){
    rect(x-2,205,4,48,'#827357');rect(x-22,252,44,5,'#b5955d');rect(x-18,257,36,5,'#e9d5a3');
    polygon([[x-15,264],[x+15,264],[x+46,332],[x-46,332]],'#f6e5b41a');
  }
  gareFurniture();
  label('CAFÉ DE LA GARE',85,116,21,'#344a4b');label(scene.clientWidth<620?'运营方室内照：梁、卡座、柜台':'运营方室内照参考：浅色钢梁、米色卡座、深绿椅与柜台',scene.clientWidth<620?425:245,260,11,'#304347','sans-serif');
  stairEntrance(130,219,100,184);label('↑ 经示意楼梯返回 0 层中央通道',76,324,12,'#f7e8d0','sans-serif');label(scene.clientWidth<620?'照片未定年 · 布局与入口待核':'照片拍摄日未知；家具数量、布局、入口和楼梯位置均未核',scene.clientWidth<620?540:420,278,11,'#304347','sans-serif');
  visitor(725,305,'#4c5e56','down','host','cafeHostWoman');
  visitor(260,370,'#475b51','down','host','cafeHostMan');
  visitor(237,468,'#9a7264','up','guest','cafeGuestWoman');visitor(198,520,'#697887','up','guest','cafeGuestOlder');
  waitingRope(185,526,96);
  sprite(t);
};

  drawMuseumRestaurant=function(t){
  ctx.clearRect(0,0,W,H);floor();rect(0,0,SIDE_W,415,'#e5d8bd');
  // Quiet ceiling colour fields indicate historic decoration without inventing a mural.
  rect(0,0,SIDE_W,115,'#b29b79');rect(12,7,SIDE_W-24,95,'#e8d3ad');rect(30,13,SIDE_W-60,80,'#f2e3c6');
  polygon([[129,19],[771,19],[726,84],[174,84]],'#ae8c64');polygon([[138,23],[762,23],[722,79],[178,79]],'#d7bc95');
  polygon([[166,31],[734,31],[709,70],[191,70]],'#b89880');polygon([[170,34],[730,34],[707,66],[193,66]],'#cbb19a');
  for(const x of [48,794]){rect(x,25,58,48,'#c0a478');rect(x+4,29,50,40,'#ecdbb8');rect(x+16,39,26,20,'#d6bf98')}
  rect(0,102,SIDE_W,6,'#a58b62');rect(0,108,SIDE_W,8,'#f0dfbc');rect(0,116,SIDE_W,5,'#c9b08a');
  for(let x=20;x<SIDE_W;x+=24)rect(x,110,9,4,'#b39b71');
  for(const x of [122,308,494,680]){
    rect(x-7,147,132,226,'#bfa782');rect(x-4,150,126,220,'#f4e7c9');
    rect(x+4,159,110,202,'#a18e70');rect(x+9,164,100,192,'#708c84');
    rect(x+15,170,88,179,'#c0d1c3');rect(x+15,170,42,179,'#dce4d2');
    rect(x+15,294,88,55,'#afc3b4');rect(x+55,164,7,192,'#ece5ca');rect(x+9,228,100,6,'#d7d9bf');
    rect(x+19,174,4,111,'#f1f0d8');rect(x+66,174,3,111,'#e1e9d2');
    rect(x-12,139,142,6,'#a78c62');rect(x-16,145,150,6,'#ebdab6');rect(x-10,371,138,8,'#aa9470');rect(x-14,368,146,5,'#f3e4c4');
    rect(x+17,382,84,15,'#d4c29e');rect(x+20,385,78,2,'#b5a17b');
  }
  for(const x of [88,274,460,646,832]){
    rect(x,128,19,270,'#c8b590');rect(x+4,134,11,256,'#eee0c0');rect(x+6,143,3,242,'#f7ebd0');
    rect(x-5,128,29,7,'#d3b989');rect(x-8,135,35,5,'#efdfba');rect(x-5,394,29,9,'#b8a17a');
  }
  rect(0,401,SIDE_W,8,'#efe1c3');rect(0,409,SIDE_W,6,'#7c705b');
  restaurantFurniture();
  polygon([[144,484],[219,484],[267,594],[160,594]],'#f4e9c91a');polygon([[516,484],[591,484],[639,594],[532,594]],'#f4e9c916');
  label(scene.clientWidth<620?'奥赛餐厅':'RESTAURANT DU MUSÉE D’ORSAY',scene.clientWidth<620?400:181,151,19,scene.clientWidth<620?'#263b40':'#fff2d9');label(scene.clientWidth<620?'旧酒店餐厅 · 壁画与座椅据馆方介绍':'旧酒店餐厅 · 天顶壁画与当代座椅据馆方介绍',scene.clientWidth<620?390:165,182,12,scene.clientWidth<620?'#263b40':'#fff2d9','sans-serif');
  galleryDoor(90);label('← D 交通区方向 · 真实公众入口待核',64,324,12,'#fff2d9','sans-serif');
  label('↑ 抬头读建筑',441,324,12,'#fff2d9','sans-serif');
  label('壁画图案、桌椅数目及具体方位为示意',491,276,11,'#fff2d9','sans-serif');sprite(t);
};

  drawWestCafe=function(t){
  ctx.clearRect(0,0,W,H);terraceSkyline();terracePaving();terraceRailing();
  // Refine the existing distant stone silhouette without inventing a named sculpture.
  rect(697,319,112,95,'#b8b099');rect(704,322,98,84,'#d7ccb2');rect(794,325,8,81,'#aea58d');
  rect(688,309,130,12,'#e6d9bc');rect(707,282,93,27,'#d9ceb5');rect(717,268,73,14,'#e9dfc4');
  rect(731,258,44,10,'#c6bea6');rect(690,412,128,11,'#a99d82');rect(685,423,139,5,'#ebe0c2');
  polygon([[688,428],[815,428],[847,457],[720,457]],'#6d705936');
  terraceTable(399,431);terraceTable(710,477);
  serviceLedge();terraceCupSign(140,345);
  rect(192,609,136,5,'#f0e0bb');rect(192,615,136,5,'#8f866e');
  label('↓ 返回露台 · 分段示意',118,301,12,'#263b40','sans-serif');
  label('CAFÉ · 馆方图示；柜台位置未知',99,248,13,'#263b40','sans-serif');label('露台西端 · 家具与石雕的具体站位未核',289,455,14,'#263b40');sprite(t);
};
  // Used by the small, explicit inline replacements in the base scene functions.
  window.ORSAY_FURNITURE=Object.freeze({bench,casework:()=>casework(),gareFurniture,restaurantFurniture,serviceLedge,clockRoomCabinet,terraceBarCounter});
})();
