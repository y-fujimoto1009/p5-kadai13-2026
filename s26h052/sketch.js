let t = 0;
let alpha = 0;

function setup() {
  createCanvas(746, 480);
  textAlign(CENTER, CENTER);
  textFont("sans-serif");
}

function draw() {
  background(255);
  t++;

  // --- 丸 ---
  noStroke();

  if (t > 20) {
    fill(120, 35, 45);
    ellipse(120, min(100, t * 3), 55);
  }

  if (t > 40) {
    fill(40, 70, 180);
    ellipse(110, min(180, (t - 20) * 3), 35);
  }

  if (t > 60) {
    fill(50, 70, 150);
    ellipse(190, min(150, (t - 40) * 3), 50);
  }

  // --- ロゴ ---
  if (t > 80) {
    strokeWeight(7);
    noFill();

    // 赤
    stroke(120,35,45);
    quad(90,240,190,200,290,240,190,280);

    // 青
    stroke(30,90,210);
    line(90,240,90,340);
    line(290,240,290,340);
    line(90,340,190,380);
    line(290,340,190,380);

    // 中央
    stroke(30,70,170);
    line(90,280,190,340);
    line(190,340,190,380);
  }

  // --- 文字 ---
  if (t > 130) {
    alpha = min(alpha + 4,255);

    noStroke();
    fill(120,35,45,alpha);

    textSize(26);
    text("偉大なる平凡人たれ",520,70);

    textSize(95);
    text("100",500,180);

    textSize(55);
    text("th",620,190);

    textSize(42);
    text("Anniversary",520,260);

    textSize(24);
    text("SINCE 1928",520,305);

    textSize(28);
    text("学校法人大阪産業大学",520,360);
  }

  if (t > 300){
    noLoop();
  }
}
