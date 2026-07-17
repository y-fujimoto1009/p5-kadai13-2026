let t = 0;
const LOOP_TOTAL = 400; // ここまで来たら最初からループ
const TRAIL_ALPHA = 35; // 数字が小さいほど軌跡が長く残る

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;
  if (x === 0) return 0;
  if (x === 1) return 1;
  return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}
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

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
  background(255); // 最初の1回だけ不透明な背景で塗っておく
}

// クリックすればいつでも最初からやり直せる
function mousePressed() {
  t = 0;
}

function draw() {

  // 完全にクリアせず、薄い白を重ねることで軌跡(トレイル)を作る
  background(255, TRAIL_ALPHA);

  t++;
  if (t > LOOP_TOTAL) t = 0;

  //------------------------
  // 丸(玉):バウンドしながら落ちてくる
  //------------------------

  noStroke();

  fill(130, 28, 33);
  circle(120, lerp(0, 90, easeOutBounce(constrain(t / 90, 0, 1))), 60);

  fill(18, 51, 89);
  circle(185, lerp(0, 145, easeOutBounce(constrain((t - 30) / 145, 0, 1))), 60);

  fill(0, 84, 145);
  circle(120, lerp(0, 165, easeOutBounce(constrain((t - 50) / 165, 0, 1))), 35);


  //------------------------
  // 立方体の枠:イージングをつけて滑らかに描かれる
  //------------------------

  strokeWeight(12);

  if (t > 60) {

    stroke(130, 28, 33);

    const fp = easeOutCubic(constrain((t - 60) / 40, 0, 1));

    line(80, 230, lerp(80, 160, fp), lerp(230, 190, fp));
    line(160, 190, lerp(160, 240, fp), lerp(190, 230, fp));
    line(240, 230, lerp(240, 160, fp), lerp(230, 270, fp));
    line(160, 270, lerp(160, 80, fp), lerp(270, 230, fp));
  }


  //------------------------
  // 文字(S・U):バウンドしながら左右からスライドインする
  //------------------------

  if (t > 120) {

    //"S"
    stroke(18, 51, 89);
    strokeWeight(12);

    const sp = easeOutBack(constrain((t - 120) / 30, 0, 1));
    push();
    translate(lerp(-200, 0, sp), 0);
    line(80, 250, 155, 287);
    line(80, 250, 155, 350);
    line(155, 350, 80, (350 - 37));
    pop();
  }

  if (t > 150) {

    //"U"
    stroke(0, 84, 145);
    strokeWeight(12);

    const up = easeOutBack(constrain((t - 150) / 30, 0, 1));
    push();
    translate(lerp(200, 0, up), 0);
    line(170, 350, 170, 287);
    line(170, 350, 240, (350 - 37));
    line(240, (350 - 37), 240, 250);
    pop();
  }

  //------------------------
  // 中心の赤丸:弾むように大きくなる
  //------------------------

  if (t > 50) {

    strokeWeight(3);
    stroke(255, 255, 255);

    fill(130, 28, 33);

    const dp = easeOutElastic(constrain((t - 150) / 30, 0, 1));
    circle(175, 215, max(30 * dp, 0));

    strokeWeight(8);
    noStroke();
  }


  //------------------------
  // キャッチコピー:フェード+下からスライドインする
  //------------------------

  if (t > 210) {

    const cp = easeOutCubic(constrain((t - 210) / 30, 0, 1));
    push();
    translate(0, lerp(20, 0, cp));
    fill(20, 50, 90, 255 * cp);
    textSize(32);
    text("偉大なる平凡人たれ", 310, 90);
    pop();

  }


  //------------------------
  // 100th:バウンドしながらスライドインする
  //------------------------

  if (t > 230) {

    fill(130, 28, 33);

    const np = easeOutBack(constrain((t - 230) / 40, 0, 1));

    textSize(120);
    text("100", lerp(150, 330, np), 220);

    textSize(60);
    text("th", lerp(360, 540, np), 220);

  }


  //------------------------
  // Anniversary:フェード+下からスライドインする
  //------------------------

  if (t > 250) {

    const ap = easeOutCubic(constrain((t - 250) / 30, 0, 1));
    push();
    translate(0, lerp(20, 0, ap));
    fill(130, 28, 33, 255 * ap);
    textSize(42);
    text("Anniversary", 330, 300);
    pop();

  }


  //------------------------
  // Since:フェード+下からスライドインする
  //------------------------

  if (t > 270) {

    const sip = easeOutCubic(constrain((t - 270) / 30, 0, 1));
    push();
    translate(0, lerp(20, 0, sip));
    fill(130, 28, 33, 255 * sip);
    textSize(28);
    text("SINCE 1928", 390, 340);
    pop();

  }


  //------------------------
  // 学校名:フェード+下からスライドインする
  //------------------------

  if (t > 290) {

    const scp = easeOutCubic(constrain((t - 290) / 30, 0, 1));
    push();
    translate(0, lerp(20, 0, scp));
    fill(20, 50, 90, 255 * scp);
    textSize(32);
    text("学校法人大阪産業大学", 300, 400);
    pop();

  }

}
