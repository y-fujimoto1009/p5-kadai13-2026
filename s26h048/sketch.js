const CANVAS_W = 746;
const CANVAS_H = 480;
// カラー定義
const COLOR_RED = '#851C1D';
const COLOR_BLUE_DARK = '#0E2F54';
const COLOR_BLUE_LIGHT = '#005293';
const COLOR_BG = '#FFFFFF';
let countVal = 99.0;    // カウントの現在値（99からスタート）
let thOpacity = 0;      // 「th」の透明度（最初は隠しておく）
// --- アニメーション用の位置管理オブジェクト ---
// (現在位置 : pos,  目指す目標位置 : target)
let topRed   = { pos: { x: 0, y: 0 }, target: { x: 0, y: -32 } };  // 上面赤フチ（上から）
let leftS1   = { pos: { x: 0, y: 0 }, target: { x: -150, y: -15 } };// 左側Sアーム上（左上から）
let leftS2   = { pos: { x: 0, y: 0 }, target: { x: -106, y: 25 } }; // 左側Sアーム下（左下から）
let rightU   = { pos: { x: 0, y: 0 }, target: { x: 0, y: 4 } };     // 右側Uパーツ（下から）
let sphere1  = { pos: { x: 0, y: 0 }, target: { x: -60, y: -180 } };// 浮遊球体1（左上遠くから）
let sphere2  = { pos: { x: 0, y: 0 }, target: { x: 40, y: -120 } }; // 浮遊球体2（右上から）
let sphere3  = { pos: { x: 0, y: 0 }, target: { x: -60, y: -95 } }; // 浮遊球体3（左から）
let sphere4  = { pos: { x: 0, y: 0 }, target: { x: 45, y: -40 } };  // 浮遊球体4（上から）
let textGroup= { pos: { x: 0, y: 0 }, target: { x: 310, y: 60 } };  // テキスト全体（右外から）
function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  // --- スタート位置をそれぞれ画面外のバラバラな方向に設定 ---
  topRed.pos   = createVector(0, -300);       // 上の外
  leftS1.pos   = createVector(-400, -200);   // 左上の外
  leftS2.pos   = createVector(-400, 200);    // 左下の外
  rightU.pos   = createVector(300, 400);     // 右下の外
  sphere1.pos  = createVector(-300, -400);   // 左上遠くの外
  sphere2.pos  = createVector(400, -300);    // 右上遠くの外
  sphere3.pos  = createVector(-300, 0);      // 左の外
  sphere4.pos  = createVector(0, -300);      // 上の外
  textGroup.pos= createVector(800, 60);      // 右の外
}
function draw() {
  background(COLOR_BG);
  
  // 各パーツを目標座標に向かってスムーズに移動 (イージング: 0.05)
  movePart(topRed, 0.05);
  movePart(leftS1, 0.05);
  movePart(leftS2, 0.05);
  movePart(rightU, 0.05);
  movePart(sphere1, 0.05);
  movePart(sphere2, 0.05);
  movePart(sphere3, 0.05);
  movePart(sphere4, 0.05);
  movePart(textGroup, 0.04);
  // 1. 左側のシンボルマーク（全体位置: x=170, y=270）
  push();
  translate(170, 270);
  drawSymbolLogo();
  pop();
  // 2. 右側のテキストグループ
  push();
  translate(textGroup.pos.x, textGroup.pos.y);
  drawTextLogo();
  pop();
}
// ターゲット座標に向かって lerp で動かすヘルパー関数
function movePart(item, speed) {
  item.pos.x = lerp(item.pos.x, item.target.x, speed);
  item.pos.y = lerp(item.pos.y, item.target.y, speed);
}
// --- 左側のシンボルマーク（元のデザインそのまま） ---
function drawSymbolLogo() {
  noStroke();
  // ----- B. 立方体・ロゴ部分 -----
  
  // 1. 赤い上面フチ
  push();
  translate(topRed.pos.x, topRed.pos.y);
  scale(1, 0.5);
  rotate(QUARTER_PI);
  fill(COLOR_RED);
  rectMode(CENTER);
  rect(0, 0, 150, 150);
  fill(COLOR_BG);
  rect(0, 0, 90, 90);
  pop();
  // 2. 左側面（Sパーツ）
  fill(COLOR_BLUE_DARK);
  
  // Sの上アーム
  push();
  translate(leftS1.pos.x, leftS1.pos.y);
  shearY(radians(30));
  rotate(-26);
  rect(37, 25, 26, 130);
  pop();
  // Sの下アーム
  push();
  translate(leftS2.pos.x, leftS2.pos.y);
  shearY(radians(26));
  rect(0, -53, 106, 25);
  rect(0, 47, 106, 26);
  pop();
  // 3. 右側面（Uパーツ）
  fill(COLOR_BLUE_LIGHT);
  
  push();
  translate(rightU.pos.x, rightU.pos.y);
  shearY(radians(-26));
  rect(0, 20, 26, 100);
  rect(0, 120, 106, 26);
  rect(80, 20, 26, 100);
  pop();
  // ----- A. 浮遊する球体 -----
  fill(COLOR_RED);
  ellipse(sphere1.pos.x, sphere1.pos.y, 72, 72);
  
  fill(COLOR_BLUE_DARK);
  ellipse(sphere2.pos.x, sphere2.pos.y, 64, 64);
  
  fill(COLOR_BLUE_LIGHT);
  ellipse(sphere3.pos.x, sphere3.pos.y, 42, 42);
  fill(COLOR_RED);
  stroke(255);
  strokeWeight(2);
  ellipse(sphere4.pos.x, sphere4.pos.y, 32, 32);
}
// --- 右側のテキストグループ（元のデザインそのまま） ---
function drawTextLogo() {
  noStroke();
  textAlign(LEFT, TOP);
  
  fill(COLOR_BLUE_DARK);
  textFont('Georgia', 33);
  textStyle(BOLD);
  text("偉大なる平凡人たれ", 10, -10);
  
// 1. カウントアップ処理（99 から 100 へゆっくり増加）
  if (countVal < 100) {
    countVal += 0.01; // ここでスピード調整（小さくするとゆっくり）
  } else {
    countVal = 100;   // 100でストップ
    // 100になったら「th」をフェードインさせる
    thOpacity = min(thOpacity + 10, 255);
  }
  
  fill(COLOR_RED);
  textFont('Arial', 54);
  textStyle(BOLD);
  text("Anniversary", 5, 165);
  fill(COLOR_RED);
  textFont('Arial', 145);
  textStyle(BOLD);
  let displayNum = floor(countVal); // 小数点を切り捨てて整数に
  text(displayNum, 0, 25);
  
  // 「th」は100に近づいたらふわっと表示
  fill(133, 28, 29, thOpacity); // COLOR_RED (#851C1D) に透明度を追加
  textFont('Arial', 75);
  text("th", 270, 85);
  
  fill(COLOR_RED);
  textFont('Arial', 28);
  textStyle(BOLD);
  text("S I N C E   1 9 2 8", 80, 230);
  
  fill(COLOR_RED);
  textFont('Hiragino Kaku Gothic ProN', 32);
  textStyle(BOLD);
  text("学校法人大阪産業大学", 0, 275);
}
