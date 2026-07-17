function setup() {

  // 横600、縦480の画面を作る
  createCanvas(600, 480);

  // 1秒間に2回画面を書き換える
  frameRate(2);
}

// アニメーションを繰り返す
function draw() {

  // 夜空の背景を黒にする
  background(0);

  // 星を200個描く
  for (let i = 0; i < 200; i++) {

    // 星の横の位置をランダムに決める
    let x = random(width);

    // 星の縦の位置をランダムに決める
    let y = random(height);

    // 星の大きさを1～2ピクセルにする
    let s = random(1, 2);

    // 星の色を白にする
    fill(255);

    // 星の枠線を消す
    noStroke();

    // 星を描く
    ellipse(x, y, s, s);
  }
}
