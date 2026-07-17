let startTime;
const duration = 2500; // 2.5秒

function setup() {
  createCanvas(1024, 632);
  textAlign(LEFT, BASELINE);
  startTime = millis();
}

function draw() {
  background(255);

  const red = color(128, 26, 36);   // #801A24
  const navy = color(17, 50, 93);   // #11325D
  const blue = color(0, 80, 139);   // #00508B

  // ----------------------------
  // 進行率
  // ----------------------------
  let elapsed = millis() - startTime;
  let t = constrain(elapsed / duration, 0, 1);

  // イージング
  let eased = easeOutCubic(t);

  // 0 → 100
  let currentNumber = floor(100 * eased);

  // ----------------------------
  // 左側の丸
  // ----------------------------
  noStroke();
  fill(red);
  circle(130, 120, 110);

  fill(navy);
  circle(285, 190, 110);

  fill(blue);
  circle(165, 225, 72);

  // ----------------------------
  // 左側ロゴ本体
  // ----------------------------
  push();
  translate(95, 300);

  strokeJoin(ROUND);
  strokeCap(ROUND);

  // 上面の赤フレーム
  stroke(red);
  strokeWeight(18);
  noFill();
  beginShape();
  vertex(0, 40);
  vertex(135, -10);
  vertex(245, 30);
  vertex(110, 80);
  endShape(CLOSE);

  // 上面内側の白い抜き
  noStroke();
  fill(255);
  beginShape();
  vertex(35, 40);
  vertex(136, 3);
  vertex(212, 30);
  vertex(110, 67);
  endShape(CLOSE);

  // 中央の赤い小円
  fill(red);
  circle(170, 32, 46);

  // 左面の青い構造
  stroke(blue);
  strokeWeight(18);
  noFill();

  beginShape();
  vertex(0, 82);
  vertex(110, 120);
  vertex(110, 215);
  vertex(0, 175);
  endShape(CLOSE);

  line(0, 82, 110, 215);
  line(12, 118, 80, 142);
  line(25, 150, 92, 174);

  // 右面
  beginShape();
  vertex(245, 30);
  vertex(245, 165);
  vertex(170, 193);
  vertex(110, 172);
  vertex(110, 80);
  endShape();

  line(245, 165, 245, 205);
  line(245, 205, 150, 240);
  line(150, 240, 110, 226);

  pop();

  // ----------------------------
  // 右側テキスト
  // ----------------------------
  fill(navy);
  noStroke();
  textStyle(NORMAL);
  textSize(38);
  text("偉大なる平凡人たれ", 430, 105);

  // 100 のカウントアップ
  fill(red);
  textStyle(BOLD);
  textSize(210);

  let numStr = str(currentNumber);
  let numX = 410;
  let numY = 356;
  text(numStr, numX, numY);

  // "th" を数字の右に追従
  let numW = textWidth(numStr);
  textSize(95);
  text("th", numX + numW + 10, numY);

  // 下の文字は少し遅れてフェードイン
  let alpha = map(constrain(t, 0.4, 1), 0.4, 1, 0, 255);

  fill(red, alpha);
  textSize(88);
  text("Anniversary", 430, 430);

  textSize(60);
  text("SINCE 1928", 560, 500);

  textSize(58);
  text("学校法人大阪産業大学", 430, 585);
}

function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}
