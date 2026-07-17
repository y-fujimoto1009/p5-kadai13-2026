let t = 0;

function setup() {
  createCanvas(746, 480);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);

  t++;

  // 丸
  noStroke();

  if (t > 20) {
    fill(170, 20, 40);
    circle(120, 70, 60);
  }

  if (t > 40) {
    fill(30, 70, 170);
    circle(180, 120, 60);
  }

  if (t > 60) {
    fill(60, 150, 255);
    circle(120, 150, 35);
  }

  if (t > 80) {
    fill(170, 20, 40);
    circle(170, 180, 25);
  }

  // ロゴ風図形
  strokeWeight(6);
  noFill();

  if (t > 100) {
    stroke(170, 20, 40);
    quad(90, 220, 170, 190, 250, 220, 170, 250);
  }

  if (t > 120) {
    stroke(30, 70, 170);
    line(90, 220, 170, 290);
  }

  if (t > 140) {
    line(250, 220, 250, 290);
  }

  if (t > 160) {
    line(170, 290, 250, 290);
  }

  if (t > 180) {
    line(170, 250, 170, 290);
  }

  // 文字
  noStroke();

  if (t > 200) {
    fill(40);
    textSize(20);
    text("偉大なる平凡人たれ", 520, 70);
  }

  if (t > 220) {
    fill(170, 20, 40);
    textSize(90);
    text("100", 520, 160);
  }

  if (t > 240) {
    textSize(40);
    text("th", 650, 170);
  }

  if (t > 260) {
    textSize(40);
    text("Anniversary", 520, 240);
  }

  if (t > 280) {
    fill(50);
    textSize(24);
    text("SINCE 1928", 520, 290);
  }

  if (t > 300) {
    textSize(18);
    text("学校法人大阪産業大学", 520, 340);
  }

  // アニメーション終了
  if (t > 320) {
    noLoop();
  }
}
