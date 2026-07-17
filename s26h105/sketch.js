let animTime = 0; 
let gravity = 0.6; // 落下の加速感
let bounceFactor = -0.5; // 着地時に跳ね返る
let bounceCount = 0; // 弾んだ回数を記録

let yOffset = -400; // 初期位置
let vy = 0; // 落下速度
let targetOffset = 0; 

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255); // 毎フレーム画面を白でクリア

  animTime++; // アニメーションの時間を進める

  
  if (bounceCount < 2) {
    vy += gravity; // 重力で下方向に加速
    yOffset += vy; // 位置に速度を加算

    // 本来の定位置に達した瞬間のバウンド処理
    if (yOffset >= targetOffset) {
      yOffset = targetOffset;  // 地面にピタッと合わせる
      vy = vy * bounceFactor;  // 速度を反転して減速（バウンド）
      bounceCount++;           // バウンド回数をカウント
    }
  } else {
    yOffset = targetOffset; // 2回弾み終えたら、元の位置に完全固定
  }

  
  
  // 上の丸（3つ）
  noStroke();
  fill(130, 28, 33);
  circle(120, 90 + yOffset, 60);

  fill(18, 51, 89);
  circle(185, 145 + yOffset, 60);

  fill(0, 84, 145);
  circle(120, 165 + yOffset, 35);

  // ロゴ本体（ひし形の輪郭）
  strokeWeight(12);
  stroke(130, 28, 33);
  line(80, 230 + yOffset, 160, 190 + yOffset);
  line(160, 190 + yOffset, 240, 230 + yOffset);
  line(240, 230 + yOffset, 160, 270 + yOffset);
  line(160, 270 + yOffset, 80, 230 + yOffset);

  // 青い文字部分（"S"）
  stroke(18, 51, 89);
  strokeWeight(12);
  line(80, 250 + yOffset, 155, 287 + yOffset);
  line(80, 250 + yOffset, 155, 350 + yOffset);
  line(155, 350 + yOffset, 80, (350 - 37) + yOffset);

  // 青い文字部分（"U"）
  stroke(0, 84, 145);
  strokeWeight(12);
  line(170, 350 + yOffset, 170, 287 + yOffset);
  line(170, 350 + yOffset, 240, (350 - 37) + yOffset);
  line(240, (350 - 37) + yOffset, 240, 250 + yOffset);

  // 中央の赤丸
  strokeWeight(3);
  stroke(255, 255, 255);
  fill(130, 28, 33);
  circle(175, 215 + yOffset, 30);

  strokeWeight(8);
  noStroke()

  
  if (bounceCount >= 2) {

    // キャッチコピー
    fill(20, 50, 90);
    textSize(32);
    text("偉大なる平凡人たれ", 310, 90);

    // 100th
    fill(130, 28, 33);
    textSize(120);
    text("100", 330, 220);

    textSize(60);
    text("th", 540, 220);

    // Anniversary
    textSize(42);
    text("Anniversary", 330, 300);

    // Since
    textSize(28);
    text("SINCE 1928", 390, 340);

    // 学校名
    textSize(32);
    text("学校法人大阪産業大学", 300, 400);
    
  }
}
