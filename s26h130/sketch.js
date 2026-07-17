let stars = [];


// ------------------------------
// ロゴパーツを保存する配列
// ------------------------------
let parts = [];


// ------------------------------
// 星の数
// ------------------------------
let starNum = 100;


// ------------------------------
// フレーム
// ------------------------------
let timer = 0;


// ------------------------------
// 文字
// ------------------------------
let textAlpha = 0;


// ------------------------------
// 拡大率
// ------------------------------
let logoScale = 0.8;


// ============================================
// 星クラス
// ============================================

class Star{

  constructor(){

    this.x = random(width);
    this.y = random(height);

    this.tx = random(width);
    this.ty = random(height);

    this.size = random(3,7);

    this.speed = random(0.02,0.05);

    this.light = random(120,255);

  }


  update(){

    // 少し光る

    this.light += random(-8,8);

    this.light = constrain(this.light,120,255);


    // 目標へ移動

    this.x = lerp(this.x,this.tx,this.speed);

    this.y = lerp(this.y,this.ty,this.speed);

  }


  display(){

    noStroke();

    fill(this.light);

    circle(this.x,this.y,this.size);

  }

}



// ============================================
// ロゴパーツクラス
// ============================================

class LogoPart{

  constructor(x,y,w,h,c){

    this.tx = x;
    this.ty = y;

    this.x = random(-300,1000);
    this.y = random(-300,700);

    this.w = w;
    this.h = h;

    this.c = c;

    this.speed = random(0.03,0.06);

  }


  update(){

    this.x = lerp(this.x,this.tx,this.speed);

    this.y = lerp(this.y,this.ty,this.speed);

  }


  display(){

    fill(this.c);

    noStroke();

    rect(this.x,this.y,this.w,this.h);

  }

}
// ============================================
// setup
// ============================================

function setup(){

  createCanvas(746,480);

  rectMode(CORNER);

  textAlign(LEFT,CENTER);

  textFont("sans-serif");


  // -------------------------
  // 星を作る
  // -------------------------

  let i = 0;

  while(i < starNum){

    stars.push(new Star());

    i++;

  }


  // -------------------------
  // ロゴパーツを作る
  // （完成位置）
  // -------------------------

  // 青

  parts.push(new LogoPart(120,140,35,140,color(0,70,180)));

  parts.push(new LogoPart(235,140,35,140,color(0,70,180)));



  // 赤

  parts.push(new LogoPart(155,140,80,35,color(220,0,0)));

  parts.push(new LogoPart(155,175,80,105,color(220,0,0)));



  // 白

  parts.push(new LogoPart(182,160,26,92,color(255)));



  // -------------------------
  // 星の目的地
  // -------------------------

  let j = 0;

  while(j < stars.length){

    stars[j].tx = random(110,280);

    stars[j].ty = random(120,290);

    j++;

  }

}
// ============================================
// draw
// ============================================

function draw(){
  // ============================================
// 左上の丸を描く関数
// ============================================

function drawCircleMark(){

  noStroke();

  // 左の青
  fill(0,70,180);
  circle(105,120,18);

  // 真ん中の赤
  fill(220,0,0);
  circle(128,98,18);

  // 右の青
  fill(0,70,180);
  circle(151,120,18);

}

  // -------------------------
  // 白い背景
  // -------------------------
  background(255);

  timer++;

  // -------------------------
  // 星
  // -------------------------

  let i = 0;

  while(i < stars.length){

    // 2秒后开始飞向Logo
    if(timer > 120){
      stars[i].update();
    }

    stars[i].display();

    i++;

  }


  // -------------------------
  // ロゴ
  // -------------------------

  push();

  translate(width/2,height/2);

  scale(logoScale);

  translate(-width/2,-height/2);

  // 3秒后开始出现
  if(timer > 180){

    let j = 0;

    while(j < parts.length){

      parts[j].update();

      parts[j].display();

      j++;

    }

    drawCircleMark();

  }

  pop();


  // -------------------------
  // 少し拡大
  // -------------------------

  if(timer > 360){

    if(logoScale < 1.0){

      logoScale += 0.002;

    }

  }


  // -------------------------
  // 文字
  // -------------------------

  if(timer > 420){

    drawText();

  }
  // -------------------------
// 星がキラキラ
// -------------------------

if(timer > 520){

  let k = 0;

  while(k < stars.length){

    stars[k].size = random(2,6);

    k++;

  }

}
}
// ============================================
// 文字
// ============================================

function drawText(){

  // 透明度
  if(textAlpha < 255){
    textAlpha += 2;
  }

  // -------------------------
  // キャッチコピー
  // -------------------------

  fill(0, textAlpha);

  textSize(18);

  textAlign(LEFT,CENTER);

  text("偉大なる平凡人たれ",330,120);


  // -------------------------
  // 100
  // -------------------------

  fill(220,0,0,textAlpha);

  textSize(64);

  text("100",320,205);


  // th
  fill(0,70,180,textAlpha);

  textSize(24);

  text("th",425,180);


  // Anniversary
  fill(0,textAlpha);

  textSize(28);

  text("Anniversary",320,250);


  // SINCE 1928
  textSize(16);

  text("SINCE 1928",323,280);


  // 学校名
  textSize(18);

  text("学校法人大阪産業大学",320,315);

}
