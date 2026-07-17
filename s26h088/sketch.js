const COLOR_RED = '#7E1F23';       // メインのエンジ（OSUレッド）
const COLOR_NAVY = '#102E52';      // 濃いブルー（OSUネイビー：S字側）
const COLOR_BLUE = '#00508F';      // 明るいブルー（OSUブルー：U字側）
const COLOR_TEXT_BLUE = '#1D3B5C'; // テキスト用ネイビー（偉大なる〜）

// アニメーション制御用変数
let progress = 0;       // アニメーションの進行状況 (0.0 から 1.0)
const duration = 150;   // アニメーション全体のフレーム数 (約2.5秒)

function setup() {
  // キャンバスサイズ (746x480)
  createCanvas(746, 480);
  frameRate(60);
}

function draw() {
  background(255); // 背景は純白

  // アニメーション進行状況の計算
  if (progress < 1) {
    progress += 1 / duration;
    if (progress > 1) progress = 1;
  }

  // イージング関数 (滑らかに減速してピタッと停止する効果)
  let eased = easeOutQuad(progress);

  // アニメーション用パラメータの算出 (0 -> FinalValue)
  let alphaVal = eased * 255;                // 不透明度 (0 -> 255)
  let angleVal = (1 - eased) * (-PI / 4);    // 回転 (-45度 -> 0度)
  let scaleVal = 0.8 + (0.2 * eased);        // 拡大 (0.8 -> 1.0)

  push();
  // キャンバスの中心を基準に全体の演出（回転・拡大）を適用
  translate(width / 2, height / 2);
  rotate(angleVal);
  scale(scaleVal);

  // ロゴ全体が画面中央に綺麗に配置されるよう、基準をシフト
  translate(-373, -240);

  // カラーオブジェクトの作成（フェード対応）
  let c_red = color(COLOR_RED); c_red.setAlpha(alphaVal);
  let c_navy = color(COLOR_NAVY); c_navy.setAlpha(alphaVal);
  let c_blue = color(COLOR_BLUE); c_blue.setAlpha(alphaVal);
  let c_text_blue = color(COLOR_TEXT_BLUE); c_text_blue.setAlpha(alphaVal);

  // ==========================================
  // 左側：OSU立体シンボルマークの精密幾何学描画
  // ==========================================
  push();
  translate(225, 275); // シンボルマークの基準位置

  // --- 1. ボックス上面（エンジの傾いたひし形フレーム） ---
  stroke(c_red);
  strokeWeight(13); // しっかりとした太さの枠線
  strokeJoin(MITER);
  noFill();
  beginShape();
  vertex(0, -56);   // 上
  vertex(96, -18);  // 右
  vertex(0, 20);    // 下
  vertex(-96, -18); // 左
  endShape(CLOSE);

  // --- 2. ボックス左側面（濃紺：S字を描くストライプ表現） ---
  stroke(c_navy);
  strokeWeight(14);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  noFill();
  
  // Sの底部と左垂直部分（繋げて角をMITERで美しく接合）
  beginShape();
  vertex(0, 80);
  vertex(-96, 42);
  vertex(-96, 12);
  endShape();
  
  // Sの中央の並行斜めライン
  line(-96, 12, -34, 37);
  
  // Sの上部並行斜めライン
  line(-62, 7, 0, 32);

  // --- 3. ボックス右側面（明るい青：U字を描くフレーム） ---
  stroke(c_blue);
  strokeWeight(14);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  noFill();
  
  // U字のパス（一筆書きでシャープな角を実現）
  beginShape();
  vertex(96, -6);
  vertex(96, 42);
  vertex(0, 80);
  vertex(0, 32);
  endShape();

  // --- 4. 上部と内側に配置された4つの丸（完全な円） ---
  noStroke();
  // 左上の大きな赤丸
  fill(c_red);
  ellipse(-62, -125, 52, 52);

  // 中右の濃いブルー丸
  fill(c_navy);
  ellipse(42, -73, 44, 44);

  // 左中の明るいブルー丸
  fill(c_blue);
  ellipse(-66, -45, 30, 30);

  // ボックス上面フレーム内にある、小さな赤丸
  fill(c_red);
  ellipse(18, -11, 22, 22);

  pop();

  // ==========================================
  // 右側：テキスト情報（ロゴタイプ）の正確な描画
  // ==========================================
  noStroke();
  textAlign(LEFT, BASELINE);

  // 1. 「偉大なる平凡人たれ」
  fill(c_text_blue);
  textFont('Georgia', 26); // 明朝体風フォント
  textStyle(BOLD);
  text('偉大なる平凡人たれ', 415, 95);

  // 2. 「100」
  fill(c_red);
  textFont('Arial', 135);
  textStyle(BOLD);
  text('100', 405, 230);

  // 3. 「th」
  textFont('Arial', 50);
  textStyle(BOLD);
  text('th', 625, 175);

  // 4. 「Anniversary」
  fill(c_red);
  textFont('Arial', 44);
  textStyle(BOLD);
  text('Anniversary', 410, 280);

  // 5. 「SINCE 1928」
  textFont('Arial', 24);
  textStyle(BOLD);
  text('SINCE 1928', 485, 315);

  // 6. 「学校法人大阪産業大学」
  fill(c_red);
  textFont('sans-serif', 26);
  textStyle(BOLD);
  text('学校法人大阪産業大学', 410, 355);

  pop();
}

// 滑らかに減速してピタッと停止するイージング関数
function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
