let t = 0; // アニメーション用の時間変数

function setup() {
  // キャンバスサイズは指定の746×480、画像比率1.56:1
  createCanvas(746, 480);
  textAlign(CENTER, CENTER);
}

function draw() {
  // 背景色は白[cite: 1]
  background(255);

  // 色の設定（資料記載のRGB値を使用）[cite: 1]
  let darkRed = color(130, 28, 33);
  let navy = color(22, 56, 89);
  let blue = color(0, 64, 152);

  // アニメーションの進行度（0から1へ）
  t += 0.005;
  let progress = min(t, 1);

  // --- 左側のロゴマーク描画（簡易的な図形描画による再現） ---
  push();
  translate(220, 240); // 左ロゴの中心位置

  // 上部の円が上から落ちてくるアニメーション
  let dropY = map(easeOutBounce(progress), 0, 1, -150, 0);
  
  noStroke();
  // 赤い円
  fill(darkRed);
  circle(-40, -100 + dropY, 50); 
  // 紺色の円
  fill(navy);
  circle(40, -60 + dropY, 45);
  // 青い円
  fill(blue);
  circle(-35, -40 + dropY, 30);

  // 箱型のロゴ部分（透明度でフェードイン）
  let boxAlpha = map(progress, 0.3, 0.8, 0, 255);
  if (boxAlpha < 0) boxAlpha = 0;

  strokeWeight(12);
  strokeJoin(ROUND);
  
  // 紺色のライン
  stroke(22, 56, 89, boxAlpha);
  noFill();
  beginShape();
  vertex(-70, 0);
  vertex(-20, 40);
  vertex(60, 40);
  vertex(60, -20);
  endShape();
  line(-70, 0, 20, 0);

  // 赤色のひし形部分
  stroke(130, 28, 33, boxAlpha);
  beginShape();
  vertex(-50, -30);
  vertex(0, -60);
  vertex(60, -20);
  vertex(10, 10);
  endShape(CLOSE);

  // 中央の小さな赤い円
  noStroke();
  fill(130, 28, 33, boxAlpha);
  circle(15, -25, 20);
  pop();

  // --- 右側のテキスト描画 ---
  push();
  translate(520, 240); // 右テキストの中心位置

  // テキストはロゴマークより少し遅れてフェードイン
  let textAlpha = map(progress, 0.5, 1, 0, 255);
  if (textAlpha < 0) textAlpha = 0;

  // 「偉大なる平凡人たれ」[cite: 1]
  fill(22, 56, 89, textAlpha);
  textSize(16);
  textStyle(NORMAL);
  text("偉大なる平凡人たれ", 0, -100);

  // 「100th」[cite: 1]
  fill(130, 28, 33, textAlpha);
  textSize(90);
  textStyle(BOLD);
  text("100th", 0, -30);

  // 「Anniversary」[cite: 1]
  textSize(35);
  text("Anniversary", 0, 35);

  // 「SINCE 1928」[cite: 1]
  textSize(18);
  text("SINCE 1928", 0, 75);

  // 「学校法人大阪産業大学」[cite: 1]
  fill(130, 28, 33, textAlpha);
  textSize(18);
  text("学校法人大阪産業大学", 0, 105);
  pop();
}

// アニメーションに動きをつけるためのイージング関数（バウンド効果）
function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}
