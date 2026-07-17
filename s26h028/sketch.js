let t = 0;

function setup() {
  createCanvas(746,480);
  textFont("sans-serif");
}

function draw() {

  background(255);
　t++;
  noStroke();

  fill(130,28,33);

  circle(min(120,t),90,60);

 fill(18,51,89);

 circle(
  min(300, max(185, 300 - (t - 30) * 3)),
  145,
  60
 );

  fill(0,84,145);

  circle(120,min(165,max(0,t-50)),35);

  strokeWeight(12);

  if (t > 60) {

   push();

   translate(160, 230);               // ひし形の中心
   rotate(radians(min(180, t - 60))); // 360°回転して止まる

   stroke(130, 28, 33);
   strokeWeight(12);
   noFill();

   line(-80,   0,   0, -40);
   line(  0, -40,  80,   0);
   line( 80,   0,   0,  40);
   line(  0,  40, -80,   0);

  


   pop();
  }

    
  if(t>50){

    strokeWeight(3);
    stroke(255,255,255);

    fill(130,28,33);

    circle(175,215,min(30,t-150));

    strokeWeight(8);
    noStroke();

 }
  if (t > 250) {

  let x = min(80, -100 + (t - 250) * 4);
  let alpha = min(255, (t - 250) * 5);

  stroke(18,51,89, alpha);
  strokeWeight(12);

  line(x,      250, x + 75, 287);
  line(x,      250, x + 75, 350);
  line(x + 75, 350, x,      313);
  }
  
　if (t > 280) {

  push();

  translate(205, 300);   // Uの中心

  // 最初1.5倍で始まり、約1秒（60フレーム）で1倍に戻る
  let s = max(1, 1.5 - (t - 280) * (0.5 / 60));

  scale(s);

  stroke(0,84,145);
  strokeWeight(12);
  noFill();

  line(-35,  50, -35, -13);
  line(-35,  50,  35,  13);
  line( 35,  13,  35, -50);

  pop();

　}
if (t > 210) {

  push();

  translate(310, 90);

  // 最初1.5倍 → 約1秒で1倍
  let s = max(1, 1.5 - (t - 210) * (0.5 / 60));

  scale(s);

  fill(20, 50, 90);
  stroke(200, 200, 255,);
  textSize(32);

  text("偉大なる平凡人たれ", 0, 0);

  pop();

}
if (t > 230) {

  fill(130,28,33);
  stroke(200, 200, 255,);
  // 横移動（右→左）
  let x100 = max(330, 700 - (t - 230) * 4);

  // 跳ねる高さ（だんだん小さくなる）
  let bounce = abs(sin((t - 230) * 0.4)) * max(0, 100 - (t - 230));

  textSize(120);
  text("100", x100, 220 - bounce);

  textSize(60);
  text("th", x100 + 210, 220 - bounce);

}

  //------------------------
  // Anniversary
  //------------------------
  stroke(200, 200, 255,);
  if(t>250){

    textSize(42);

    text("Anniversary",330,300);

  }


  //------------------------
  // Since
  //------------------------
  stroke(200, 200, 255,);
  if(t>270){

    textSize(28);

    text("SINCE 1928",390,340);

  }


  //------------------------
  // �w�Z��
  //------------------------

  if(t>290){

    textSize(32);

    text("学校法人大阪産業大学",300,400);

  }
}
