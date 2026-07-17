let t = 0;

function setup() {
  createCanvas(746,480);
  textFont("sans-serif");
  colorMode(RGB,255,255,255,255);
}

function draw() {

  background(255);

  t++;

  //------------------------
  // 上の丸
  //------------------------

 bounceCircle(120,90,60,color(130,28,33),0);

bounceCircle(185,145,60,color(18,51,89),12);

bounceCircle(120,165,35,color(0,84,145),24);


  //------------------------
  // ロゴ本体
  //------------------------

  strokeWeight(12);

  if(t>60){

    stroke(130,28,33);

drawGrowLine(80,230,160,190,60,15);

drawGrowLine(160,190,240,230,75,15);

drawGrowLine(240,230,160,270,90,15);

drawGrowLine(160,270,80,230,105,15);
  }


  //------------------------
  // 青い部分
  //------------------------

  if(t>120){

    //"S"
    stroke(18,51,89);
    strokeWeight(12);

    drawGrowLine(80,250,155,287,120,12);

drawGrowLine(80,250,155,350,132,12);

drawGrowLine(155,350,80,313,144,12);
  }

  if(t>150){

    //"U"
    stroke(0,84,145);
    strokeWeight(12);

    drawGrowLine(170,350,170,287,150,12);

drawGrowLine(170,350,240,313,162,12);

drawGrowLine(240,313,240,250,174,12);
  }

  //------------------------
  // 中央の赤丸
  //------------------------

if(t > 190){

  // 1本目
  let p1 = constrain((t - 190) / 30, 0, 1);
  noFill();
  stroke(130,28,33,180 * (1 - p1));
  strokeWeight(3);
  circle(175,215,lerp(30,90,p1));

  // 2本目（少し遅れて）
  let p2 = constrain((t - 198) / 30, 0, 1);
  stroke(130,28,33,180 * (1 - p2));
  circle(175,215,lerp(30,90,p2));

  // 赤丸
  noStroke();
  fill(130,28,33);
  circle(175,215,30);
}

  //------------------------
  // キャッチコピー
  //------------------------

 if(t > 210){

  // アニメーションの進行度（0～1）
  let p = constrain((t - 210) / 30, 0, 1);

  // イージング（滑らかに止まる）
  p = 1 - pow(1 - p, 3);

  // 少し下から上へ移動
  let y = lerp(105, 90, p);

  // 透明→不透明
  fill(20, 50, 90, 255 * p);

  textSize(32);
  text("偉大なる平凡人たれ", 310, y);
}


  //------------------------
  // 100th
  //------------------------

  if(t > 230){

  // アニメーション進行（0～1）
  let p = constrain((t - 230) / 35, 0, 1);

  // イージング
  p = 1 - pow(1 - p, 3);

  // 拡大率
  let scaleValue = lerp(1.15, 1.0, p);

  // フェードイン
  fill(130,28,33,255 * p);

  push();

  translate(330,220);

  // 拡大縮小
  scale(scaleValue);

  textAlign(LEFT,BASELINE);

  textSize(120);
  text("100",0,0);

  textSize(60);
  text("th",210,0);

  pop();
}


  //------------------------
  // Anniversary
  //------------------------

  if(t > 250){

  // アニメーションの進行度（0～1）
  let p = constrain((t - 250) / 30, 0, 1);

  // イージング
  p = 1 - pow(1 - p, 3);

  // 左から20px移動
  let x = lerp(310, 330, p);

  // 透明→不透明
  fill(130,28,33,255 * p);

  textSize(42);
  text("Anniversary", x, 300);

}


  //------------------------
  // Since
  //------------------------

  if(t > 270){

  // アニメーションの進行度（0～1）
  let p = constrain((t - 270) / 25, 0, 1);

  // イージング
  p = 1 - pow(1 - p, 3);

  // 少し上から下へ
  let y = lerp(325, 340, p);

  // 透明→不透明
  fill(130,28,33,255 * p);

  textSize(28);
  text("SINCE 1928",390,y);

}

  


  //------------------------
  // 学校名
  //------------------------

 if(t > 290){

  // アニメーション進行（0～1）
  let p = constrain((t - 290) / 40, 0, 1);

  // イージング
  p = 1 - pow(1 - p, 3);

  // 少し下から上へ
  let y = lerp(415, 400, p);

  // フェードイン
  fill(20,50,90,255 * p);

  textSize(32);
  text("学校法人大阪産業大学",300,y);

}

}
//------------------------
// バウンドしながら現れる丸
//------------------------
function bounceCircle(finalX, finalY, d, c, startT) {

  if (t < startT) return;

  let tt = (t - startT) / 60.0;
  tt = constrain(tt, 0, 1);

  // 左から飛んでくる
  let x = lerp(-80, finalX, tt);

  // バウンド
  let y = finalY - abs(sin(tt * PI * 3)) * (1 - tt) * 80;

  fill(c);
  noStroke();
  circle(x, y, d);
}


//------------------------
// 線が下から伸びるように描く
//------------------------
function drawGrowLine(x1, y1, x2, y2, startT, duration) {

  if (t < startT) return;

  let p = constrain((t - startT) / duration, 0, 1);

  let xx = lerp(x1, x2, p);
  let yy = lerp(y1, y2, p);

  line(x1, y1, xx, yy);
}
