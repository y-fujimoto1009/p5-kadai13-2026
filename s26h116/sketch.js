let particles = [];
let animState = 0; // 0: 登場アニメ中, 1: 待機中
let startTime;
const ANIM_DURATION = 1500; // アニメーション全体の時間 (ミリ秒)

// ロゴの各要素のターゲット座標（画面サイズ 850x560 を基準に配置）
const TARGETS = {
  textSlogan: { x: 610, y: 140 }, // "偉大なる平凡人たれ"
  text100th: { x: 550, y: 280 },  // "100" と "th"
  textAnniv: { x: 610, y: 380 },  // "Anniversary"
  textSince: { x: 610, y: 440 },  // "SINCE 1928"
  textUniv: { x: 610, y: 490 },   // "学校法人大阪産業大学"
  
  // 3つの大きな球体（エンジ、紺、水色）
  circles: [
    { x: 190, y: 190, r: 42, c: [139, 39, 44] }, // エンジ
    { x: 275, y: 265, r: 31, c: [25, 47, 89] },  // 紺
    { x: 175, y: 295, r: 19, c: [41, 102, 172] } // 水色
  ],
  // 立体ボックスの基準位置（上部ひし形の中心を基準）
  box: { x: 215, y: 395 },
  // ボックスの中にある小さな赤い球体（ひし形の中の右寄りに配置）
  smallCircle: { x: 255, y: 390, r: 14, c: [139, 39, 44] }
};

function setup() {
  createCanvas(850, 560);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  initAnimation();
}

function draw() {
  background(255);

  let elapsed = millis() - startTime;
  let progress = min(1, elapsed / ANIM_DURATION);

  // 1. マウスから出るキラキラ（背景エフェクト）
  drawBackgroundSparkles();

  // 2. 登場アニメーション
  if (elapsed > 100) {
    // --- テキストの描画 ---
    drawBouncingTextGroup(progress);
    
    // --- 3つの球体の描画 ---
    drawBouncingCircles(progress);

    // --- OSU立体ボックスの描画（完璧に組み合わせた修正版） ---
    drawBouncingBox(progress);
  }

  // 3. インタラクティブな仕掛け
  if (progress === 1) {
    animState = 1;
    drawHoverEffect();
  }
}

// --- アニメーション制御関数 ---

function initAnimation() {
  startTime = millis();
  animState = 0;
  particles = [];
}

// ロゴのテキスト全体
function drawBouncingTextGroup(progress) {
  drawBouncingText(progress, "偉大なる平凡人たれ", TARGETS.textSlogan, 28, color(25, 47, 89), 50, false, "Georgia, serif");
  drawBouncingText(progress, "100", TARGETS.text100th, 140, color(139, 39, 44), 150, true, "sans-serif");
  drawBouncingText(progress, "th", {x: TARGETS.text100th.x + 145, y: TARGETS.text100th.y + 15}, 65, color(139, 39, 44), 300, true, "sans-serif");
  drawBouncingText(progress, "Anniversary", TARGETS.textAnniv, 45, color(80, 30, 30), 400, true, "sans-serif");
  drawBouncingText(progress, "SINCE 1928", TARGETS.textSince, 24, color(80, 30, 30), 500, true, "sans-serif");
  drawBouncingText(progress, "学校法人大阪産業大学", TARGETS.textUniv, 22, color(139, 39, 44), 600, true, "sans-serif");
}

function drawBouncingText(progress, txt, pos, size, col, delay, isBold, font) {
  let itemProgress = max(0, (millis() - startTime - delay) / 1000);
  let yOffset = (1 - easeOutBounce(min(1, itemProgress))) * -150;
  
  push();
  fill(col);
  noStroke();
  textSize(size);
  textFont(font);
  if (isBold) {
    textStyle(BOLD);
  } else {
    textStyle(NORMAL);
  }
  text(txt, pos.x, pos.y + yOffset);
  pop();
}

// 3つの球体
function drawBouncingCircles(progress) {
  for (let i = 0; i < TARGETS.circles.length; i++) {
    let circle = TARGETS.circles[i];
    let delay = i * 150;
    let circleProgress = max(0, (millis() - startTime - delay) / 1000);
    let yOffset = (1 - easeOutBounce(min(1, circleProgress))) * -200;

    let scaleFactor = 1.0;
    if (animState === 1) {
        let d = dist(mouseX, mouseY, circle.x, circle.y);
        if (d < 80) {
          scaleFactor = map(d, 0, 80, 1.3, 1.0);
        }
    }

    push();
    fill(circle.c);
    noStroke();
    let hoverWobble = (animState === 1) ? sin(frameCount * 5 + i * 30) * 2 : 0;
    ellipse(circle.x, circle.y + yOffset, (circle.r * 2 * scaleFactor) + hoverWobble, (circle.r * 2 * scaleFactor) - hoverWobble);
    pop();
  }
}

// OSU立体ボックス（正確に組み合わさった立体構造）
function drawBouncingBox(progress) {
  let boxProgress = max(0, (millis() - startTime - 300) / 1000);
  let yOffset = (1 - easeOutBounce(min(1, boxProgress))) * -250;
  
  let bx = TARGETS.box.x;
  let by = TARGETS.box.y + yOffset;

  // 1. ボックスの中の赤い球体（最背面に配置、Oの内部右寄りにきれいに収まります）
  let sc = TARGETS.smallCircle;
  let scProgress = max(0, (millis() - startTime - 450) / 1000);
  let scYOffset = (1 - easeOutBounce(min(1, scProgress))) * -200;
  push();
  fill(sc.c);
  noStroke();
  ellipse(sc.x, sc.y + scYOffset, sc.r * 2, sc.r * 2);
  pop();

  // 2. OSU立体フレーム（隙間をなくし、平行度を完璧に調整）
  push();
  strokeWeight(9); // 線の太さを統一
  noFill();
  strokeCap(ROUND);
  strokeJoin(ROUND);

  // 【O】上部のエンジ色のひし形
  stroke(139, 39, 44); 
  beginShape();
  vertex(bx, by - 33);       // 上頂点
  vertex(bx + 80, by + 8);   // 右頂点
  vertex(bx, by + 48);       // 下頂点
  vertex(bx - 80, by + 8);   // 左頂点
  endShape(CLOSE);

  // 【S】左下側の紺色ライン（立体ボックスの左側を綺麗に構築）
  stroke(25, 47, 89);  
  
  // Sの上のフック（ひし形の左下辺に並行に沿う）
  beginShape();
  vertex(bx - 40, by + 48);   // 内側開始点
  vertex(bx - 80, by + 28);   // 左上へ
  vertex(bx - 80, by + 68);   // 垂直に下りる（左エッジ）
  vertex(bx - 40, by + 88);   // 手前へ
  vertex(bx, by + 68);        // 中央縦ラインへ接続
  endShape();

  // Sの下のフック
  beginShape();
  vertex(bx - 80, by + 68);   // 左エッジ中間から
  vertex(bx - 80, by + 108);  // 一番左下の角へ
  vertex(bx, by + 148);       // 一番手前の下角へ
  vertex(bx, by + 108);       // 中央縦ライン下部
  endShape();

  // 【U】右下側の水色ライン（立体ボックスの右側を綺麗に構築）
  stroke(41, 102, 172); 
  
  // Uの右エッジと底辺・手前
  beginShape();
  vertex(bx + 80, by + 28);   // 右エッジ上部（ひし形右端から少し下）
  vertex(bx + 80, by + 108);  // 一番右下の角へ
  vertex(bx, by + 148);       // 一番手前の下角へ（Sの終点と綺麗に交わる）
  endShape();

  // Uの内側スリット（立体的な二重ラインを表現）
  beginShape();
  vertex(bx + 40, by + 48);   // 内側開始点（ひし形右下辺と並行）
  vertex(bx + 40, by + 128);  // 内側垂直下
  endShape();

  pop();
}

// 背景のキラキラ演出
function drawBackgroundSparkles() {
  for (let p of particles) {
    p.update();
    p.draw();
  }
  particles = particles.filter(p => p.alpha > 0);

  if (mouseX !== pmouseX || mouseY !== pmouseY) {
    if (random(1) < 0.3) {
      particles.push(new Sparkle(mouseX, mouseY));
    }
  }
}

// マウスホバー効果
function drawHoverEffect() {
  let d = dist(mouseX, mouseY, TARGETS.text100th.x, TARGETS.text100th.y);
  if (d < 150) {
    if (random(1) < 0.15) {
      particles.push(new Sparkle(TARGETS.text100th.x + random(-100, 100), TARGETS.text100th.y + random(-50, 50)));
    }
  }
}

// 画面クリックでリプレイ
function mousePressed() {
  initAnimation();
}

// --- キラキラ星のクラス ---
class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-4, -1);
    this.size = random(6, 12);
    this.alpha = 255;
    this.color = color(random([
      [255, 204, 0],   // ゴールド
      [255, 102, 153], // ピンク
      [102, 255, 153], // ミント
      [102, 204, 255]  // ライトブルー
    ]));
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.alpha -= 4;
  }

  draw() {
    if (this.alpha <= 0) return;
    push();
    translate(this.x, this.y);
    rotate(frameCount * 2);
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    noStroke();
    
    beginShape();
    for (let i = 0; i < 8; i++) {
      let r = (i % 2 === 0) ? this.size : this.size / 2.5;
      let angle = i * 45;
      vertex(cos(angle) * r, sin(angle) * r);
    }
    endShape(CLOSE);
    pop();
  }
}

// --- イージング関数（バウンド） ---
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
