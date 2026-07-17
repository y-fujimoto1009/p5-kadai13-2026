let stars = [];
let timer = 0;
let textAlpha = 0;
let logoScale = 0.6;
let starNum = 120;

// =========================
// 星
// =========================
class Star {

  constructor() {

    this.x = random(width);
    this.y = random(height);

    this.tx = random(150, 330);
    this.ty = random(100, 320);

    this.size = random(2,6);
    this.speed = random(0.015,0.04);
    this.light = random(120,255);

  }

  update(){

    this.light += random(-6,6);
    this.light = constrain(this.light,120,255);

    this.x = lerp(this.x,this.tx,this.speed);
    this.y = lerp(this.y,this.ty,this.speed);

  }

  display(){

    noStroke();
    fill(this.light);
    circle(this.x,this.y,this.size);

  }

}

function setup(){

  createCanvas(746,480);

  textFont("Arial");

  rectMode(CORNER);

  for(let i=0;i<starNum;i++){

    stars.push(new Star());

  }

}
// ============================================
// Logo
// ============================================

function drawLogo(){

  push();

  translate(95,115);

  scale(logoScale);

  noStroke();

  // -------------------------
  // 上面的三个圆
  // -------------------------

  fill(145,35,40);
  circle(48,-5,42);

  fill(20,95,210);
  circle(25,42,24);

  fill(45,55,110);
  circle(98,28,38);

  fill(165,35,40);
  circle(77,70,18);

  // -------------------------
  // 上面菱形
  // -------------------------

  stroke(145,35,40);
  strokeWeight(8);
  fill(255);

  beginShape();
  vertex(20,85);
  vertex(75,62);
  vertex(132,85);
  vertex(75,108);
  endShape(CLOSE);

  noStroke();

  // -------------------------
  // 左侧蓝面
  // -------------------------

  fill(53,63,118);

  beginShape();

  vertex(20,88);
  vertex(75,112);
  vertex(75,160);
  vertex(20,138);

  endShape(CLOSE);

  // -------------------------
  // 中间白色
  // -------------------------

  fill(250);

  beginShape();

  vertex(75,112);
  vertex(132,88);
  vertex(132,140);
  vertex(75,160);

  endShape(CLOSE);

  // -------------------------
  // 左下深蓝
  // -------------------------

  fill(58,58,105);

  beginShape();

  vertex(20,138);
  vertex(75,160);
  vertex(42,160);

  endShape(CLOSE);

  // -------------------------
  // 底部蓝
  // -------------------------

  fill(36,78,180);

  beginShape();

  vertex(75,160);
  vertex(132,140);
  vertex(132,175);
  vertex(75,190);

  endShape(CLOSE);

  pop();

}
// ============================================
// draw
// ============================================

function draw(){

  background(255);

  timer++;

  // -------------------------
  // 星星
  // -------------------------

  for(let s of stars){

    if(timer>90){
      s.update();
    }

    s.display();

  }

  // -------------------------
  // Logo
  // -------------------------

  if(timer>150){

    if(logoScale<1){
      logoScale+=0.003;
    }

    drawLogo();

  }

  // -------------------------
  // 文字
  // -------------------------

  if(timer>240){

    drawText();

  }

}



// ============================================
// 文字
// ============================================

function drawText(){

  if(textAlpha<255){

    textAlpha+=3;

  }

  textAlign(LEFT,CENTER);

  // 偉大なる平凡人たれ
  fill(60,textAlpha);

  textStyle(NORMAL);
  textSize(17);

  text("偉大なる平凡人たれ",315,110);

  // 100
  fill(150,35,40,textAlpha);

  textStyle(BOLD);
  textSize(66);

  text("100",310,195);

  // th
  fill(45,60,120,textAlpha);

  textSize(24);

  text("th",420,170);

  // Anniversary
  fill(45,textAlpha);

  textStyle(NORMAL);
  textSize(28);

  text("Anniversary",310,245);

  // Since
  textSize(16);

  text("SINCE 1928",320,275);

  // 学校名
  textSize(18);

  text("学校法人大阪産業大学",310,312);

}
