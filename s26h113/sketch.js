let t = 0;
let logoY = 50;
let alpha = 0;

// 丸の開始位置
let r1y = 320;
let r2y = 320;
let r3y = 320;
let r4y = 320;

const target = [
  {x:120, y:90},   // 左上 赤
  {x:185, y:145},  // 右 青
  {x:120, y:165},  // 左 青
  {x:175, y:215}   // 中央 赤
];

let textY = 30;
let textAlpha = 0;

function setup() {
  createCanvas(746,480);
  textFont("sans-serif");
}

function draw() {

  background(255);

  t++;

  //------------------------
  // 上の丸
  //------------------------

  if(t > 80){
    r1y += (target[0].y - r1y) * 0.04;
  }

  if(t > 60){
    r2y += (target[1].y - r2y) * 0.03;
  }

  if(t > 40){
    r3y += (target[2].y - r3y) * 0.025;
  }

  if(t > 40){
    r4y += (target[3].y - r4y) * 0.02;
  }

  stroke(130,28,33,alpha);
  strokeWeight(12);

  // 上2辺
  line(80,230+logoY,160,190+logoY);
  line(160,190+logoY,240,230+logoY);

  strokeWeight(3);
  stroke(255);

  fill(130,28,33);
  circle(120,r1y,60);

  fill(18,51,89);
  circle(185,r2y,60);

  fill(0,84,145);
  circle(120,r3y,35);

  fill(130,28,33);
  circle(175,r4y,30);

  //------------------------
  // 穴より下を隠す
  //------------------------

  noStroke();
  fill(255);

  // 箱の中を隠す
  quad(
    80,230+logoY,
    160,270,
    160,400,
    80,400
  );

  quad(
    160,270,
    240,230+logoY,
    240,400,
    160,400
  );


  //------------------------
  // ロゴ本体
  //------------------------

  // 少しずつ上へ移動
  logoY *= 0.97;

  // 少しずつ濃くする
  alpha += 5;

  if (alpha > 255) {
    alpha = 255;
  }
  
  strokeWeight(12);

  stroke(130,28,33,alpha);

  line(240,230+logoY,160,270+logoY);   
  line(160,270+logoY,80,230+logoY);


  //------------------------
  // 青い部分
  //------------------------

    //"S"
    stroke(18,51,89,alpha);
    strokeWeight(12);

    line(80,250+logoY,155,287+logoY);
    line(80,250+logoY,155,350+logoY);
    line(155,350+logoY,80,313+logoY);

    //"U"
    stroke(0,84,145,alpha);
    strokeWeight(12);

    line(170,350+logoY,170,287+logoY);
    line(170,350+logoY,240,313+logoY);
    line(240,313+logoY,240,250+logoY);

  //------------------------
  // キャッチコピー
  //------------------------

  if (t > 210) {
    
    // 下から上へ移動
    textY *= 0.92;

    // フェードイン
    textAlpha += 5;

    if (textAlpha > 255) {
      textAlpha = 255;
    }
  }

  if(t>210){
    strokeWeight(8); 
　　noStroke();
    fill(20,50,90,textAlpha);
    textSize(32);
    text("偉大なる平凡人たれ",310,90 + textY);
  }


  //------------------------
  // 100th
  //------------------------

  if (t > 210) {
    fill(130,28,33,textAlpha);
    textSize(120);
    text("100",330,220 + textY);
    textSize(60);
    text("th",540,220 + textY);
  }

  //------------------------
  // Anniversary
  //------------------------

  if (t > 210) {
    fill(20,50,90,textAlpha);
    textSize(42);
    text("Anniversary",330,300 + textY);
  }


  //------------------------
  // Since
  //------------------------

  if (t > 210) {
    fill(20,50,90,textAlpha);
    textSize(28);
    text("SINCE 1928",390,340 + textY);
  }

  //------------------------
  // 学校名
  //------------------------

  if (t > 210) {
    fill(20,50,90,textAlpha);
    textSize(32);
    text("学校法人大阪産業大学",300,400 + textY);
  }
}
