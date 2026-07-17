let t = 0; // アニメーションの経過フレーム数(1フレームごとに1増える)
 
// ---- タイミング設定(フレーム数) --------------------------------
const WAKE_START    = 30;   // S・Uが起き上がり始めるフレーム
const WAKE_DUR       = 60;   // 起き上がる動作にかかるフレーム数
 
const O_START        = 110;  // Oが降ってくる開始フレーム
const O_STAGGER       = 20;   // 3つの円が降ってくるタイミングのずれ
const O_DUR           = 70;   // 1つの円が降りて着地するまでのフレーム数
 
const FRAME_START     = 200;  // 菱形フレームが現れ始めるフレーム
const FRAME_DUR       = 30;
 
const DOT_START       = 300;  // アクセントの丸が現れ始めるフレーム
const DOT_DUR         = 30;
 
const HUNDRED_START   = 290;  // "100th" がOから飛び出すフレーム
const HUNDRED_DUR     = 40;
 
const TEXT_START      = 300;  // 残りの文字がOから飛び出し始めるフレーム
const TEXT_STAGGER    = 30;   // 文字が出てくる間隔
const TEXT_DUR        = 45;
 
const HOLD_END        = 520;  // 完成形を静止させておく終わりのフレーム
const FADE_DUR         = 30;   // フェードアウトにかけるフレーム数
const LOOP_RESET       = HOLD_END + FADE_DUR; // ここでt=0に戻ってループする
 
// ---- OSUマークで使う色 -------------------------------------------
const COL_RED  = [130, 28, 33];
const COL_NAVY = [18, 51, 89];
const COL_BLUE = [0, 84, 145];
 
// ---- Oを構成する3つの円(最終位置・色・落下開始タイミング) ----------
const oCircles = [
  { x: 120, y: 90,  d: 60, col: COL_RED,  start: O_START },
  { x: 185, y: 145, d: 60, col: COL_NAVY, start: O_START + O_STAGGER },
  { x: 120, y: 165, d: 35, col: COL_BLUE, start: O_START + O_STAGGER * 2 }
];
const O_CENTER = { x: 150, y: 135 }; // 文字が飛び出してくる起点(Oの中心付近)
 
// ---- 菱形フレームの4頂点(左→上→右→下の順) ------------------------
const diamondPts = [
  [80, 230], [160, 190], [240, 230], [160, 270]
];
 
// ---- Oの中から出てくる文字(catchcopy / Anniversary / Since / 大学名) --
const texts = [
  { str: "偉大なる平凡人たれ",     size: 32, col: COL_NAVY,
    x: 310, y: 90,  start: TEXT_START },
  { str: "Anniversary",           size: 42, col: COL_RED,
    x: 330, y: 300, start: TEXT_START + TEXT_STAGGER },
  { str: "SINCE 1928",            size: 28, col: COL_RED,
    x: 390, y: 340, start: TEXT_START + TEXT_STAGGER * 2 },
  { str: "学校法人大阪産業大学",   size: 32, col: COL_RED,
    x: 300, y: 400, start: TEXT_START + TEXT_STAGGER * 3 }
];
 
// p5.jsが最初に一度だけ実行する初期設定
function setup() {
  createCanvas(746, 480);     // 元のサンプルと同じ大きさのキャンバスを作成
  textFont("sans-serif");     // フォントを指定
}
 
// 毎フレーム実行される描画処理
function draw() {
  background(255);            // 背景を白でリセット(前フレームの絵を消す)
  t++;                        // 経過フレーム数を1つ進める
 
  drawDiamondFrame();          // 菱形フレーム(背景の土台)
  drawSU();                    // 寝ている→起き上がるSとU
  drawOBubbles();               // 上からバブル状に降ってくるO
  drawAccentDot();               // アクセントの小さい丸
  drawHundredTh();                // "100th" がOから飛び出す
  drawEmergingTexts();              // 残りの文字がOから飛び出す
  drawFadeOutOverlay();              // 最後に白くフェードアウトさせる
 
  if (t >= LOOP_RESET) {              // ループの終端に達したら
    t = 0;                            // 最初からやり直す
  }
}
 
// ============ イージング関数(動きに緩急をつける) =====================
 
// 終端を少し飛び越えてから戻る、バネ・バブルのような伸びを作る
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
 
// ボールが着地して数回小さく弾むような動きを作る
function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    x -= 1.5 / d1;
    return n1 * x * x + 0.75;
  } else if (x < 2.5 / d1) {
    x -= 2.25 / d1;
    return n1 * x * x + 0.9375;
  } else {
    x -= 2.625 / d1;
    return n1 * x * x + 0.984375;
  }
}
 
// なめらかに減速しながら目的地に着く動き(文字の移動に使用)
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}
 
// 現在のフレームtが、start〜start+durの間でどれだけ進んだか(0〜1)を返す
function progress(start, dur) {
  return constrain((t - start) / dur, 0, 1);
}
 
// ============ 各パーツの描画 =========================================
 
// ---- 菱形フレーム(OSUマークの土台になる背景の枠) ----------------------
function drawDiamondFrame() {
  if (t < FRAME_START) return;              // 出てくる時間前なら何もしない
  let p = progress(FRAME_START, FRAME_DUR);
  let a = 255 * easeOutCubic(p);             // だんだん不透明になる
 
  push();                                     // ここでの設定を外に影響させない
  noFill();
  stroke(COL_RED[0], COL_RED[1], COL_RED[2], a);
  strokeWeight(12);
  beginShape();                               // 4頂点をつないだ図形として描く
  for (let i = 0; i < diamondPts.length; i++) {
    vertex(diamondPts[i][0], diamondPts[i][1]);
  }
  endShape(CLOSE);                            // 最初の頂点に戻して閉じる
  pop();
}
 
// ---- 寝ている→起き上がるSとU ------------------------------------------
function drawSU() {
  let wakeP = progress(WAKE_START, WAKE_DUR);
  let eased = easeOutBack(wakeP);              // 起き上がりにバネの動きを加える
  drawLetterS(eased);
  drawLetterU(eased);
}
 
// Sの形を、寝た角度(-90°)から立った角度(0°)へ回転させながら描く
function drawLetterS(wakeAmount) {
  let angle = lerp(-HALF_PI, 0, wakeAmount);   // 寝る→立つの角度を補間
 
  push();
  translate(155, 350);                          // Sの足元(支点)に原点を移動
  rotate(angle);                                 // 寝転び→起き上がりの回転
  noFill();
  stroke(COL_NAVY[0], COL_NAVY[1], COL_NAVY[2]);
  strokeWeight(12);
  // 支点(0,0)からの相対座標でSの形を作る3本の線
  line(-75, -100, 0, -63);
  line(-75, -100, 0, 0);
  line(0, 0, -75, -37);
  pop();
}
 
// Uの形を、寝た角度(+90°)から立った角度(0°)へ回転させながら描く
function drawLetterU(wakeAmount) {
  let angle = lerp(HALF_PI, 0, wakeAmount);
 
  push();
  translate(170, 350);                          // Uの足元(支点)に原点を移動
  rotate(angle);
  noFill();
  stroke(COL_BLUE[0], COL_BLUE[1], COL_BLUE[2]);
  strokeWeight(12);
  line(0, 0, 0, -63);
  line(0, 0, 70, -37);
  line(70, -37, 70, -100);
  pop();
}
 
// ---- 上からバブル状に弾みながら降ってくるO ------------------------------
function drawOBubbles() {
  push();
  noStroke();
  for (let i = 0; i < oCircles.length; i++) {
    let c = oCircles[i];
    if (t < c.start) continue;                  // まだ落下開始前なら描かない
 
    let p = progress(c.start, O_DUR);
    let fallY = lerp(-80, c.y, easeOutBounce(p)); // 弾みながら落ちてくる高さ
    let grow  = c.d * easeOutBack(p);              // 膨らみながら現れる大きさ
 
    fill(c.col[0], c.col[1], c.col[2]);
    circle(c.x, fallY, max(0, grow));
  }
  pop();
}
 
// ---- アクセントの小さい丸(白い縁取り) ----------------------------------
function drawAccentDot() {
  if (t < DOT_START) return;
  let p = progress(DOT_START, DOT_DUR);
  let d = 30 * easeOutBack(p);                   // 弾みながら大きくなる
 
  push();
  strokeWeight(3);
  stroke(255);
  fill(COL_RED[0], COL_RED[1], COL_RED[2]);
  circle(175, 215, max(0, d));
  pop();
}
 
// ---- "100th" がOの中心から飛び出す ------------------------------------
function drawHundredTh() {
  if (t < HUNDRED_START) return;
  let p = progress(HUNDRED_START, HUNDRED_DUR);
  let e = easeOutBack(p);                        // 少し大げさに弾んで登場
 
  let x = lerp(O_CENTER.x, 330, e);               // O中心 → "100"の最終位置
  let y = lerp(O_CENTER.y, 220, e);
  let sizeMain = 120 * e;                          // 0から120へ弾みながら拡大
  let sizeSub  = 60  * e;
  let a = 255 * constrain(p * 1.5, 0, 1);          // 少し早めに不透明化
 
  push();
  noStroke();                                       // 文字が線で縁取られないようにする
  fill(COL_RED[0], COL_RED[1], COL_RED[2], a);
  textSize(max(1, sizeMain));
  text("100", x, y);
  textSize(max(1, sizeSub));
  text("th", x + 210, y);                            // "100"の右側に少し離して配置
  pop();
}
 
// ---- 残りの文字がOの中心から生まれるように移動・拡大しながら出現 --------
function drawEmergingTexts() {
  push();
  noStroke();                                        // 文字が線で縁取られないようにする
  for (let i = 0; i < texts.length; i++) {
    let item = texts[i];
    if (t < item.start) continue;
 
    let p = progress(item.start, TEXT_DUR);
    let e = easeOutCubic(p);                          // なめらかに減速しながら移動
 
    let x = lerp(O_CENTER.x, item.x, e);
    let y = lerp(O_CENTER.y, item.y, e);
    let size = item.size * (0.4 + 0.6 * e);            // 小さい状態から本来の大きさへ
    let a = 255 * e;                                    // 透明から不透明へ
 
    fill(item.col[0], item.col[1], item.col[2], a);
    textSize(size);
    text(item.str, x, y);
  }
  pop();
}
 
// ---- 最後に白くフェードアウトさせる幕 -----------------------------------
function drawFadeOutOverlay() {
  if (t < HOLD_END) return;                          // 静止している間は何もしない
  let p = progress(HOLD_END, FADE_DUR);
  let a = 255 * p;                                     // だんだん白く覆っていく
 
  push();
  noStroke();
  fill(255, a);
  rect(0, 0, width, height);
  pop();
}
