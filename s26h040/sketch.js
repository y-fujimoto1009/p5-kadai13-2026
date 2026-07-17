function setup() {
  // キャンバスのサイズを少し小さく変更 (850x500 -> 640x380)
  createCanvas(640, 380);
}

function draw() {
  background(255); // 背景は白
  noStroke();

  // ================================================================
  // 【1】ロゴ左側：シンボルマークの描画（全体的に縮小）
  // ================================================================
  push();
  translate(30, 15); // 左側の位置も少し微調整

  // --- 上空の球体（円） ---
  fill(128, 24, 24); // 大きな赤色の円（左上）
  circle(98, 68, 64);

  fill(12, 44, 86);  // 大きな紺色の円（中央右）
  circle(180, 116, 53);

  fill(0, 90, 160);  // 小さな青色の円（左下）
  circle(94, 139, 34);

  // --- 下部の立体フレーム ---
  // 赤色の上の枠
  stroke(128, 24, 24);
  strokeWeight(7.5);
  noFill();
  strokeJoin(ROUND);
  beginShape();
  vertex(124, 173);
  vertex(195, 195);
  vertex(124, 251);
  vertex(53, 195);
  endShape(CLOSE);

  // 枠の上の小さな赤色の円
  noStroke();
  fill(128, 24, 24);
  circle(150, 191, 23);

  // 青・紺色の下のフレーム
  stroke(12, 44, 86);
  strokeWeight(9);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  noFill();

  // 左側の折れ線
  beginShape();
  vertex(53, 206);
  vertex(53, 255);
  vertex(124, 311);
  vertex(124, 263);
  endShape();

  // 右側の折れ線
  beginShape();
  vertex(124, 263);
  vertex(195, 206);
  vertex(195, 255);
  vertex(150, 289);
  endShape();
  pop();


  // ================================================================
  // 【2】ロゴ右側：指定された順番で上からテキストを描画（サイズ縮小）
  // ================================================================
  push();
  translate(280, 0); // 右側のテキストエリアを左寄りにシフト

  // 1. 偉大なる平凡人たれ
  fill(12, 44, 86);
  textFont('serif'); // 明朝体
  textStyle(BOLD);
  textSize(26);
  letterSpacing(3); 
  text("偉大なる平凡人たれ", 0, 65);

  // 2. １００th
  fill(128, 24, 24);
  textFont('sans-serif'); // ゴシック体
  textStyle(BOLD);
  textSize(120);
  letterSpacing(-4); 
  text("100", 0, 175);

  // 100のすぐ右上に配置する「th」
  textSize(48);
  letterSpacing(0);
  text("th", 215, 168);

  // 3. Anniversary
  textSize(40);
  letterSpacing(1);
  text("Anniversary", 2, 222);

  // (Anniversaryに付随する SINCE 1928)
  textSize(24);
  letterSpacing(2.5);
  text("SINCE 1928", 64, 256);

  // 4. 学校法人大阪産業大学
  textSize(26);
  letterSpacing(1);
  text("学校法人大阪産業大学", 2, 310);
  pop();
  
  noLoop(); // 1回だけ描画
}

// 文字の間隔（カーニング）を制御する補助関数
function letterSpacing(space) {
  drawingContext.letterSpacing = space + 'px';
}
