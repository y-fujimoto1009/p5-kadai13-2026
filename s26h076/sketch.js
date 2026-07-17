const COL_RED   = '#8B1E2C';   // マルーン(赤系)
const COL_NAVY  = '#1B3A5C';   // ネイビー
const COL_BLUE  = '#1E6FA8';   // 明るめの青

// ===== キャンバスサイズ =====
const W = 746, H = 480;

// ===== 丸(球)のアニメーション定義 =====
// 大きい順に出現させる。各要素: 目標位置cx,cy / 半径r / 出現開始フレーム / 継続フレーム
let circles = [
  { cx: 123, cy: 110, r: 51, color: COL_RED,  start: 20,  dur: 45 }, // 一番大きい赤丸(左上)
  { cx: 220, cy: 175, r: 39, color: COL_NAVY, start: 75,  dur: 45 }, // ネイビー丸
  { cx: 123, cy: 202, r: 27, color: COL_BLUE, start: 130, dur: 45 }, // 青丸
  { cx: 193, cy: 261, r: 18, color: COL_RED,  start: 185, dur: 40 }, // 天面の上の小さい赤丸
];

// ===== テキストブロックのアニメーション定義 =====
// 出現順:偉大なる平凡人たれ→100→th→Anniversary→SINCE→1928→学校法人大阪産業大学
let textBlocks = [
  { start: 230, dur: 35, draw: drawCatch },
  { start: 275, dur: 35, draw: draw100 },
  { start: 315, dur: 30, draw: drawTh },
  { start: 355, dur: 35, draw: drawAnniversary },
  { start: 400, dur: 30, draw: drawSince },
  { start: 435, dur: 30, draw: draw1928 },
  { start: 475, dur: 35, draw: drawSchoolName },
];

function setup() {
  let cnv = createCanvas(W, H);
  cnv.parent(document.body);
  textFont('sans-serif');
  frameRate(60);
}

function draw() {
  background(255);

  // 左下:OSUボックスロゴ(静的、細かい余白は気にせず概形を再現)
  drawOSUBox();

  // 丸を大きい順に0(半径0)から出現させて所定位置へ
  for (let c of circles) {
    drawAnimatedCircle(c);
  }

  // テキストブロックを順番にフェード+スライドイン
  for (let t of textBlocks) {
    let p = progress(t.start, t.dur);
    if (p > 0) {
      push();
      let alpha = easeOutCubic(p) * 255;
      let yOff = (1 - easeOutCubic(p)) * 18;
      t.draw(alpha, yOff);
      pop();
    }
  }
}

// ================= ユーティリティ =================
function progress(startFrame, dur) {
  return constrain((frameCount - startFrame) / dur, 0, 1);
}
function easeOutCubic(t) {
  return 1 - pow(1 - t, 3);
}
function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * pow(t - 1, 3) + c1 * pow(t - 1, 2);
}

// ================= 丸のアニメーション =================
function drawAnimatedCircle(c) {
  let p = progress(c.start, c.dur);
  if (p <= 0) return;
  let e = constrain(easeOutBack(p), 0, 1.15);
  let r = c.r * e;
  let y = c.cy - (1 - easeOutCubic(p)) * 50; // 上から少し降りてくる
  noStroke();
  fill(c.color);
  circle(c.cx, y, r * 2);
}

// ================= OSU 箱型ロゴ(静的・簡略再現) =================
function drawOSUBox() {
  push();
  noFill();
  strokeJoin(ROUND);
  strokeCap(ROUND);

  // --- 天面(ひし形) ---
  let dTop    = { x: 165, y: 245 };
  let dRight  = { x: 260, y: 275 };
  let dBottom = { x: 165, y: 305 };
  let dLeft   = { x: 70,  y: 275 };

  stroke(COL_RED);
  strokeWeight(7);
  beginShape();
  vertex(dTop.x, dTop.y);
  vertex(dRight.x, dRight.y);
  vertex(dBottom.x, dBottom.y);
  vertex(dLeft.x, dLeft.y);
  endShape(CLOSE);

  // --- 手前の縦の赤い辺(奥行き) ---
  let frontBottom = { x: 165, y: 405 };
  stroke(COL_RED);
  strokeWeight(7);
  line(dBottom.x, dBottom.y, frontBottom.x, frontBottom.y);

  // --- 左面(青)の外形 ---
  let leftBottom = { x: 66, y: 395 };
  stroke(COL_NAVY);
  strokeWeight(6);
  beginShape();
  vertex(dLeft.x, dLeft.y);
  vertex(leftBottom.x, leftBottom.y);
  vertex(frontBottom.x, frontBottom.y);
  endShape();

  // --- 右面(青)の外形 ---
  let rightBottom = { x: 260, y: 405 };
  stroke(COL_BLUE);
  strokeWeight(6);
  beginShape();
  vertex(dRight.x, dRight.y);
  vertex(rightBottom.x, rightBottom.y);
  vertex(frontBottom.x, frontBottom.y);
  endShape();

  // --- 左面内側の「S」風ジグザグ ---
  stroke(COL_NAVY);
  strokeWeight(6);
  beginShape();
  vertex(88, 300);
  vertex(128, 335);
  vertex(88, 365);
  vertex(128, 398);
  endShape();

  // --- 右面内側の「U」風カーブ ---
  stroke(COL_BLUE);
  strokeWeight(6);
  noFill();
  beginShape();
  vertex(200, 320);
  vertex(200, 375);
  bezierVertex(200, 392, 232, 392, 232, 375);
  vertex(232, 320);
  endShape();

  pop();
}

// ================= テキストブロック描画 =================
// 「偉大なる平凡人たれ」
function drawCatch(alpha, yOff) {
  fill(red(color(COL_NAVY)), green(color(COL_NAVY)), blue(color(COL_NAVY)), alpha);
  noStroke();
  textSize(30);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('偉大なる平凡人たれ', 313, 60 + yOff);
}

// 「100」
function draw100(alpha, yOff) {
  fill(red(color(COL_RED)), green(color(COL_RED)), blue(color(COL_RED)), alpha);
  noStroke();
  textSize(120);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('100', 305, 95 + yOff);
}

// 「th」
function drawTh(alpha, yOff) {
  fill(red(color(COL_RED)), green(color(COL_RED)), blue(color(COL_RED)), alpha);
  noStroke();
  textSize(64);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('th', 560, 175 + yOff);
}

// 「Anniversary」
function drawAnniversary(alpha, yOff) {
  fill(red(color(COL_RED)), green(color(COL_RED)), blue(color(COL_RED)), alpha);
  noStroke();
  textSize(46);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Anniversary', 313, 245 + yOff);
}

// 「SINCE」
function drawSince(alpha, yOff) {
  fill(red(color(COL_RED)), green(color(COL_RED)), blue(color(COL_RED)), alpha);
  noStroke();
  textSize(26);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('SINCE', 370, 300 + yOff);
}

// 「1928」
function draw1928(alpha, yOff) {
  fill(red(color(COL_RED)), green(color(COL_RED)), blue(color(COL_RED)), alpha);
  noStroke();
  textSize(26);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('1928', 455, 300 + yOff);
}

// 「学校法人大阪産業大学」
function drawSchoolName(alpha, yOff) {
  fill(red(color(COL_RED)), green(color(COL_RED)), blue(color(COL_RED)), alpha);
  noStroke();
  textSize(28);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('学校法人大阪産業大学', 313, 340 + yOff);
}
