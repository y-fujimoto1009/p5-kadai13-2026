let t = 0;
let confetti = []; //小さい丸を入れる配列

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");

//紙吹雪を作る
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: random(width),
      y: random(-500, 0),
      r: random(4, 10),
      dx: random(-1, 1),
      dy: random(2, 5),
      color: random([color(130,28,33), color(18,51,89), color(0,84,145), color(255, 215, 0)])
    });
  }
}

function draw() {
  // 背景を白に設定
  background(255);

  t++;

  //------------------------
  // 紙吹雪のアニメーション
  //------------------------
  if (t > 350) {
    noStroke();
    for (let c of confetti) {
      fill(c.color);
      circle(c.x, c.y, c.r * 2);
      c.x += c.dx;
      c.y += c.dy;
      if (c.y > height + 10) c.y = random(-50, 0);
    }
  }

  //------------------------
  // 上の3つの丸
  //------------------------
  noStroke();
  let float1 = (t > 90) ? sin((t - 90) * 0.05) * 8 : 0;
  let float2 = (t > 145) ? sin((t - 145) * 0.04) * 6 : 0;
  let float3 = (t > 165) ? sin((t - 165) * 0.06) * 10 : 0;

  fill(130, 28, 33);
  circle(120, min(90, t) + float1, 60);

  fill(18, 51, 89);
  circle(185, min(145, max(0, t - 30)) + float2, 60);

  fill(0, 84, 145);
  circle(120, min(165, max(0, t - 50)) + float3, 35);

  //------------------------
  // ロゴ本体
  //------------------------
  strokeWeight(12);
  if (t > 60) {
    stroke(130, 28, 33);
    line(80, 230, min(160, 80 + (t - 60) * 2), max(190, 230 - (t - 60)));
    line(160, 190, min(240, 160 + (t - 60) * 2), min(230, 190 + (t - 60)));
    line(240, 230, max(160, 240 - (t - 60) * 2), min(270, 230 + (t - 60)));
    line(160, 270, max(80, 160 - (t - 60) * 2), max(230, 270 - (t - 60)));
  }

  //------------------------
  // 青い部分
  //------------------------
  if (t > 120) {
    stroke(18, 51, 89);
    strokeWeight(12);
    line(80, 250, 155, 287);
    line(80, 250, 155, 350);
    line(155, 350, 80, (350 - 37));
  }

  if (t > 150) {
    stroke(0, 84, 145);
    strokeWeight(12);
    line(170, 350, 170, 287);
    line(170, 350, 240, (350 - 37));
    line(240, (350 - 37), 240, 250);
  }

  //------------------------
  // 中央の赤丸
  //------------------------
  if (t > 50) {
    strokeWeight(3);
    stroke(255); // 白背景に合わせ、縁取りを白に
    fill(130, 28, 33);
    let r = min(30, t - 50);
    let floatX4 = (t > 80) ? sin((t - 80) * 0.03) * 4 : 0;
    let floatY4 = (t > 80) ? cos((t - 80) * 0.05) * 5 : 0;
    
    circle(175 + floatX4, 215 + floatY4, r);
    strokeWeight(8);
    noStroke();
  }

  //------------------------
  // テキスト類
  //------------------------
  if (t > 210) {
    fill(20, 50, 90);
    textSize(32);
    let textX = max(310, 800 - (t - 210) * 15);
    text("偉大なる平凡人たれ", textX, 90);
  }

  if (t > 230) {
    fill(130, 28, 33);
    let x100 = min(330, 150 + t - 230); 
    textSize(120);
    text("100", x100, 220);
    textSize(60);
    text("th", x100 + 230, 220);
  }

  if (t > 250) {
    fill(130, 28, 33);
    textSize(42);
    text("Anniversary", 330, max(300, 320 - (t - 250)));
  }

  if (t > 270) {
    fill(0);
    textSize(28);
    text("SINCE 1928", 390, 340);
  }

  if (t > 290) {
    fill(130, 28, 33);
    textSize(32);
    text("学校法人大阪産業大学", 300, 400);
  }
}
