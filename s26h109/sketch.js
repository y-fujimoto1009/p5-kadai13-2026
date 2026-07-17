let textAlpha = 0;
let logoX = 0;
let ball4Y = -300;
let ball3Y = -300;
let ball2Y = -300;
let ballY = -300;
let alpha = 0;
function setup() {
  createCanvas(746, 480);
}

function draw() {
  background(255);

  // 全体を100px下へ
  translate(width / 2 + logoX, height / 2 + 100);

  strokeWeight(8);
  noFill();

  // ===== S=====
  stroke(22, 50, 89);

  line(-120, -40, 20, -40);
  line(20, -40, -120, 60);
  line(-120, 60, 20, 60);

  // ===== U =====
  stroke(0, 64, 152);

  line(20, -50, 20, 80);
  line(20, 80, 100, 80);
  line(100, 80, 100, -50);

 // ===== 赤いひし形（枠線）=====
stroke(220, 50, 50 ,alpha);
strokeWeight(8);
noFill();

beginShape();
vertex(-10, -110);   // 上
vertex(90, -80);     // 右
vertex(-10, -50);    // 下
vertex(-110, -80);   // 左
endShape(CLOSE);
if (alpha < 255) {
  alpha += 3;
}if (alpha >= 255) {
  noStroke();
  fill(220, 50, 50);
  circle(20, ballY, 30);

  if (ballY < -100) {
    ballY += 6;
  }
}if (ballY >= -100) {
  noStroke();
  fill(0, 64, 152);   // Uと同じ色

  circle(-50, ball2Y, 40);

  if (ball2Y < -140) {
    ball2Y += 6;
  }
}if (ball2Y >= -140) {
  noStroke();
  fill(22, 50, 89);   // Sと同じ色

  circle(60, ball3Y, 60);

  if (ball3Y < -180) {
    ball3Y += 6;
  }
}if (ball3Y >= -180) {
  noStroke();
  fill(220, 50, 50);

  circle(-70, ball4Y, 80);

  if (ball4Y < -250) {
    ball4Y += 6;
  }
}if (ball4Y >= -250) {
  if (logoX > -180) {
    logoX -= 4;
  }
}if (logoX <= -180)if (logoX <= -180 && textAlpha < 255) {
  textAlpha += 4;
} {
  fill(0, textAlpha);
  noStroke();

  textAlign(LEFT, CENTER);

  textSize(100);
  textStyle(BOLD);
  text("100th ", 160, -100);

  textSize(50);
  textStyle(NORMAL);
  text("Anniversary", 160, -20);

  textSize(20);
  textStyle(NORMAL);
  text("SINCE 1928", 250, 20);
  
textSize(20);
  textStyle(NORMAL);
  text("学校法人大阪産業大学", 200, 50);
  
  textSize(30);
  textStyle(NORMAL);
  text("偉大なる平凡人たれ", 170, -170);
  }}
