let currentFrame = 0; // アニメーション管理用のフレームカウンター

function setup() {
  // ★ ここを変えるだけで好きなサイズに自動調整されます！
  let canvasW = 400;
  let canvasH = 250;
  
  createCanvas(canvasW, canvasH);
  // noLoop(); // アニメーションさせるためnoLoopは削除
}

function draw() {
  background(255); 
  
  // 基準サイズ（746x480）からの縮小率を自動計算
  let scaleX = width / 746;
  let scaleY = height / 480;
  let s = min(scaleX, scaleY); // アスペクト比を維持するためのスケール値
  
  // カラー定義
  let brandRed = color('#801A1E');   
  let brandBlue = color('#0F4C81');  
  let brandNavy = color('#10315B');  
  
  // --- アニメーションの進行度（0.0 〜 1.0）を計算 ---
  // 各パーツの動き出すタイミングをずらす（イージング用）
  let tCube = constrain(map(currentFrame, 0, 60, 0, 1), 0, 1);       // 0〜2秒: 立方体
  let tCircles = constrain(map(currentFrame, 30, 90, 0, 1), 0, 1);   // 1〜3秒: 球体ポップ
  let tText = constrain(map(currentFrame, 50, 110, 0, 1), 0, 1);     // 1.6〜3.6秒: 文字フェード
  
  // イージング関数（動きを滑らかにする：Smoothstep）
  let easeCube = tCube * tCube * (3 - 2 * tCube);
  let easeCircles = tCircles * tCircles * (3 - 2 * tCircles);
  let easeText = tText * tText * (3 - 2 * tText);

  // ==========================================
  // 1. 左側のシンボルマーク描画（自動スケール）
  // ==========================================
  push();
  // 画面サイズに応じて配置を自動計算
  translate(180 * scaleX, 260 * scaleY); 
  scale(s); // 全体を縮小
  
  // --- 立方体の描画（下から上にフワッと現れる） ---
  push();
  translate(0, (1.0 - easeCube) * 50); // イージングで位置をコントロール
  
  noFill();
  strokeWeight(10); 
  
  // 上部の菱形面（赤） - 透明度をアニメーション
  brandRed.setAlpha(easeCube * 255);
  stroke(brandRed);
  beginShape();
  vertex(0, -45);
  vertex(100, -10);
  vertex(0, 25);
  vertex(-100, -10);
  endShape(CLOSE);
  
  // 左側の側面（紺）
  brandNavy.setAlpha(easeCube * 255);
  stroke(brandNavy);
  beginShape();
  vertex(-100, -10);
  vertex(-100, 45);
  vertex(0, 85);
  vertex(0, 125);
  vertex(-100, 85);
  endShape();
  
  beginShape();
  vertex(1,35);
  vertex(-100, -10);
  endShape();
  
  // 右側の側面（青）
  brandBlue.setAlpha(easeCube * 255);
  stroke(brandBlue);
  beginShape();
  vertex(100, -10);
  vertex(100, 75);
  vertex(0, 125);
  vertex(0,25);
  endShape();
  pop(); // 立方体のアニメーション終わり
  
  // --- 飛び出す球体（円）の描画 ---
  // 中心から外側へポンッと飛び出してくる演出（スケール変化）
  noStroke();
  
  // 中央小赤
  brandRed.setAlpha(easeCircles * 255);
  fill(brandRed);
  push();
  translate(15, -20);
  scale(easeCircles);
  circle(0, 0, 20);
  pop();
  
  // 左小青
  brandBlue.setAlpha(easeCircles * 255);
  fill(brandBlue);
  push();
  translate(-90, -100);
  scale(easeCircles);
  circle(0, 0, 38);
  pop();
  
  // 上大赤
  brandRed.setAlpha(easeCircles * 255);
  fill(brandRed);
  push();
  translate(-55, -190);
  scale(easeCircles);
  circle(0, 0, 78);
  pop();
  
  // 右中紺
  brandNavy.setAlpha(easeCircles * 255);
  fill(brandNavy);
  push();
  translate(25, -125);
  scale(easeCircles);
  circle(0, 0, 62);
  pop();
  
  pop();
  
  // ==========================================
  // 2. 右側のテキスト描画（自動スケール）
  // ==========================================
  push();
  // テキストの開始位置を自動計算＋左から右へスライドイン
  translate((315 - (1.0 - easeText) * 20) * scaleX, 0); 
  scale(s); // 全体を縮小
  
  // 各色にフェードインのアルファ値を適用
  brandNavy.setAlpha(easeText * 255);
  brandRed.setAlpha(easeText * 255);
  
  // 「偉大なる平凡人たれ」
  fill(brandNavy);
  textFont('serif'); 
  textStyle(BOLD);
  textSize(29);
  text('偉大なる平凡人たれ', 5, 95 * (scaleY/s));
  
  // 「100th」
  fill(brandRed);
  textFont('sans-serif'); 
  textSize(145);
  textStyle(BOLD);
  text('100', 0, 245 * (scaleY/s));
  
  // 「th」
  textSize(72);
  text('th', 265, 190 * (scaleY/s));
  
  // 「Anniversary」
  textSize(55);
  text('Anniversary', 5, 300 * (scaleY/s));
  
  // 「SINCE 1928」
  textSize(26);
  text('SINCE 1928', 80, 345 * (scaleY/s));
  
  // 「学校法人大阪産業大学」
  textSize(31);
  text('学校法人大阪産業大学', 2, 400 * (scaleY/s));
  
  pop();
  
  // フレームカウンターを進める
  currentFrame++;
}
