let t = 0;
 
const MAROON = [130, 28, 33];
const NAVY   = [18, 51, 89];
const BLUE   = [0, 84, 145];
 
function setup() {
  createCanvas(746, 480);
  textFont('sans-serif');
  frameRate(60);
}
 
function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    t = 0;
  }
}
 
function easeOutCubic(x) {
  x = constrain(x, 0, 1);
  return 1 - pow(1 - x, 3);
}
function easeOutBack(x) {
  x = constrain(x, 0, 1);
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
}
function fadeAlpha(start, dur) {
  return constrain(map(t, start, start + dur, 0, 255), 0, 255);
}
function fallY(delay, dur, targetY, d) {
  const lt = t - delay;
  if (lt <= 0) return -d;
  if (lt >= dur) return targetY;
  return lerp(-d, targetY, easeOutCubic(lt / dur));
}
function drawSeg(a, b, localProg, col) {
  if (localProg <= 0) return;
  const e = easeOutCubic(localProg);
  stroke(...col);
  strokeWeight(12);
  strokeCap(ROUND);
  line(a[0], a[1], lerp(a[0], b[0], e), lerp(a[1], b[1], e));
}
 
function draw() {
  background(255);
  t++;
 
  //------------------------
  // 上の丸 (falling circles)
  //------------------------
  noStroke();
  fill(...MAROON);
  circle(120, fallY(0, 45, 90, 60), 60);
  fill(...NAVY);
  circle(185, fallY(30, 45, 145, 60), 60);
  fill(...BLUE);
  circle(120, fallY(50, 45, 165, 35), 35);
 
  //------------------------
  // ロゴ本体 (diamond)
  //------------------------
  if (t > 60) {
    const e = easeOutCubic((t - 60) / 50);
    stroke(...MAROON);
    strokeWeight(12);
    strokeCap(ROUND);
    const p1 = [80, 230], p2 = [160, 190], p3 = [240, 230], p4 = [160, 270];
    line(p1[0], p1[1], lerp(p1[0], p2[0], e), lerp(p1[1], p2[1], e));
    line(p2[0], p2[1], lerp(p2[0], p3[0], e), lerp(p2[1], p3[1], e));
    line(p3[0], p3[1], lerp(p3[0], p4[0], e), lerp(p3[1], p4[1], e));
    line(p4[0], p4[1], lerp(p4[0], p1[0], e), lerp(p4[1], p1[1], e));
  }
 
  //------------------------
  // 青い部分 "S"
  //------------------------
  if (t > 120) {
    const sProg = (t - 120) / 40;
    const chain = constrain(sProg, 0, 1) * 3;
    drawSeg([80, 250], [155, 287], constrain(chain - 0, 0, 1), NAVY);
    drawSeg([80, 250], [155, 350], constrain(chain - 1, 0, 1), NAVY);
    drawSeg([155, 350], [80, 313], constrain(chain - 2, 0, 1), NAVY);
  }
 
  //------------------------
  // "U"
  //------------------------
  if (t > 150) {
    const uProg = (t - 150) / 40;
    const chain = constrain(uProg, 0, 1) * 3;
    drawSeg([170, 350], [170, 287], constrain(chain - 0, 0, 1), BLUE);
    drawSeg([170, 350], [240, 313], constrain(chain - 1, 0, 1), BLUE);
    drawSeg([240, 313], [240, 250], constrain(chain - 2, 0, 1), BLUE);
  }
 
  //------------------------
  // 中央の赤丸
  //------------------------
  if (t > 150) {
    const rProg = (t - 150) / 30;
    const d = 30 * Math.max(easeOutBack(rProg), 0);
    noStroke();
    fill(...MAROON);
    circle(175, 215, d);
    noFill();
    stroke(255);
    strokeWeight(3);
    circle(175, 215, d);
  }
 
  //------------------------
  // キャッチコピー
  //------------------------
  noStroke();
  textAlign(LEFT, BASELINE);
  const a1 = fadeAlpha(210, 30);
  if (a1 > 0) {
    fill(20, 50, 90, a1);
    textSize(32);
    text("偉大なる平凡人たれ", 310, 90 + (1 - a1 / 255) * 10);
  }
 
  //------------------------
  // 100th
  //------------------------
  const a2 = fadeAlpha(230, 25);
  if (a2 > 0) {
    fill(...MAROON, a2);
    textSize(120);
    const x100 = lerp(260, 330, easeOutCubic((t - 230) / 30));
    text("100", x100, 220);
    textSize(60);
    const xth = lerp(470, 540, easeOutCubic((t - 230) / 30));
    text("th", xth, 220);
  }
 
  //------------------------
  // Anniversary
  //------------------------
  const a3 = fadeAlpha(250, 30);
  if (a3 > 0) {
    fill(...MAROON, a3);
    textSize(42);
    text("Anniversary", 330, 300 + (1 - a3 / 255) * 10);
  }
 
  //------------------------
  // Since
  //------------------------
  const a4 = fadeAlpha(270, 30);
  if (a4 > 0) {
    fill(...MAROON, a4);
    textSize(28);
    text("SINCE 1928", 390, 340 + (1 - a4 / 255) * 8);
  }
 
  //------------------------
  // 学校名
  //------------------------
  const a5 = fadeAlpha(290, 30);
  if (a5 > 0) {
    fill(20, 50, 90, a5);
    textSize(32);
    text("学校法人大阪産業大学", 300, 400 + (1 - a5 / 255) * 8);
  }
 
  //------------------------
  // idle: gentle pulse on the center dot once everything has landed
  //------------------------
  if (t > 330) {
    const pulse = 1 + 0.06 * Math.sin((t - 330) * 0.05);
    noStroke();
    fill(...MAROON, 40);
    circle(175, 215, 30 * pulse * 1.6);
  }
 
  // replay hint
  if (t > 340) {
    fill(120, 120, 120, fadeAlpha(340, 40));
    textSize(13);
    textAlign(RIGHT, BASELINE);
    text("クリックでリプレイ", width - 14, height - 14);
  }
}
