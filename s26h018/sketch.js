let t = 0;
let particles = []; // パーティクルを格納する配列

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
  // パーティクルの描画モードを調整
  colorMode(RGB, 255);
}

function draw() {
  background(255);
  t++;

  //------------------------
  // 上の丸
  //------------------------
  noStroke();
  fill(130, 28, 33);
  circle(120, constrain(t * 5, 0, 90), 60);
  
  fill(18, 51, 89);
  circle(185, constrain((t - 30) * 5, 0, 145), 60);
  
  fill(0, 84, 145);
  circle(120, constrain((t - 50) * 5, 0, 165), 35);

  //------------------------
  // ロゴ本体の箱
  //------------------------
  strokeWeight(12);
  if (t > 60) {
    stroke(130, 28, 33);
    let progress = constrain((t - 60) * 0.1, 0, 1);
    line(80, 230, lerp(80, 160, progress), lerp(230, 190, progress));
    line(160, 190, lerp(160, 240, progress), lerp(190, 230, progress));
    line(240, 230, lerp(240, 160, progress), lerp(230, 270, progress));
    line(160, 270, lerp(160, 80, progress), lerp(270, 230, progress));
  }

  //------------------------
  // 青いSとU
  //------------------------
  strokeWeight(12);
  if (t > 120) {
    stroke(18, 51, 89);
    line(80, 250, 155, 287);
    line(80, 250, 155, 350);
    line(155, 350, 80, 313);
  }
  if (t > 150) {
    stroke(0, 84, 145);
    line(170, 350, 170, 287);
    line(170, 350, 240, 313);
    line(240, 313, 240, 250);
  }

  //------------------------
  // 中央の赤丸
  //------------------------
  if (t > 180) {
    stroke(255);
    strokeWeight(3);
    fill(130, 28, 33);
    circle(175, 215, 30);
  }

  //------------------------
  // テキスト群
  //------------------------
  fill(20, 50, 90);
  if (t > 210) {
    textSize(32);
    text("偉大なる平凡人たれ", 310, 90);
  }

  if (t > 230) {
    fill(130, 28, 33);
    textSize(120);
    text("100", 330, 220);
    textSize(60);
    text("th", 540, 220);
  }

  if (t > 250) {
    fill(130, 28, 33);
    textSize(42);
    text("Anniversary", 330, 300);
  }

  if (t > 270) {
    textSize(28);
    text("SINCE 1928", 390, 340);
  }

  if (t > 290) {
    textSize(32);
    text("学校法人大阪産業大学", 300, 400);
  }

  //------------------------
  // 【追加要素】パーティクルアニメーション
  //------------------------
  if (t > 350) { // すべての要素が出現し終わった後に開始
    // 毎フレーム、新しいパーティクルをロゴ周辺に追加
    if (frameCount % 5 === 0) { // 5フレームに1回生成
        // ロゴの箱の中心付近からランダムな方向に生成
        let startX = 160;
        let startY = 230;
        particles.push(new Particle(startX, startY));
    }
  }

  // パーティクルの更新と描画
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    // 寿命が尽きたパーティクルを配列から削除
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

// --- パーティクルクラスの定義 ---
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // ランダムな速度と角度で広がる
    this.vx = random(-2, 2);
    this.vy = random(-3, 0); // 上方向に少し浮遊
    this.alpha = 255; // 不透明度
    // ロゴの色からランダムに選択
    this.color = random([color(130, 28, 33), color(0, 84, 145), color(18, 51, 89)]);
    this.size = random(5, 15); // ランダムなサイズ
  }

  finished() {
    // 不透明度が0になったら終了
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    // 重力の影響を少し受ける
    this.vy += 0.05;
    // 徐々に透明にする
    this.alpha -= 5;
  }

  show() {
    noStroke();
    // 色と現在の透明度を設定
    let c = this.color;
    fill(red(c), green(c), blue(c), this.alpha);
    circle(this.x, this.y, this.size);
  }
}
