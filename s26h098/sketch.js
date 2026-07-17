let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);
  t++;

  // 上の丸
  noStroke();
  if (t > 0) {
    fill(130, 28, 33);
    circle(120, 90, 60);
  }
  if (t > 20) {
    fill(18, 51, 89);
    circle(185, 145, 60);
  }
  if (t > 40) {
    fill(0, 84, 145);
    circle(120, 165, 35);
  }

  // ロゴ本体
  if (t > 60) {
    stroke(130, 28, 33);
    strokeWeight(12);
    line(80, 230, 160, 190);
    line(160, 190, 240, 230);
    line(240, 230, 160, 270);
    line(160, 270, 80, 230);
  }

  // S
  if (t > 90) {
    stroke(18, 51, 89);
    line(80, 250, 155, 287);
    line(80, 250, 155, 350);
    line(155, 350, 80, 313);
  }

  // U
  if (t > 120) {
    stroke(0, 84, 145);
    line(170, 287, 170, 350);
    line(170, 350, 240, 313);
    line(240, 313, 240, 250);
  }

  // 中央の赤丸
  if (t > 140) {
    noStroke();
    fill(130, 28, 33);
    circle(175, 215, 30);
  }

  // 文字
  fill(20, 50, 90);
  noStroke();

  if (t > 170) {
    textSize(32);
    text("偉大なる平凡人たれ", 310, 90);
  }

  if (t > 190) {
    fill(130, 28, 33);
    textSize(120);
    text("100", 330, 220);
    textSize(60);
    text("th", 540, 220);
  }

  if (t > 210) {
    fill(20, 50, 90);
    textSize(42);
    text("Anniversary", 330, 300);
  }

  if (t > 230) {
    textSize(28);
    text("SINCE 1928", 390, 340);
  }

  if (t > 250) {
    textSize(32);
    text("学校法人大阪産業大学", 300, 400);
  }

  // ループ
  if (t > 320) {
    t = 0;
  }
}
