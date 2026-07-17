let ripple;
let showLogo = false;

function setup() {
  createCanvas(746, 480);
  noFill();

  ripple = {
    x: 175,
    y: 215,
    r: 0,
    alpha: 255
  };

  textFont("sans-serif");
}

function draw() {
  background(255);

  //------------------------
  // 波紋
  //------------------------
  if (!showLogo) {

    for (let i = 0; i < 10; i++) {
      let size = ripple.r - i * 45;

      if (size > 0) {
        stroke(0, 150, 220, ripple.alpha - i * 25);
        strokeWeight(2);
        ellipse(ripple.x, ripple.y, size, size);
      }
    }

    ripple.r += 8;

    if (ripple.r > width * 1.5) {
      showLogo = true;
    }
  }

  //------------------------
  // 波紋終了後
  //------------------------
  if (showLogo) {

    //======================
    // ロゴ
    //======================
    textAlign(CENTER, CENTER);

    let x = 120;
    let y = 240;

    // O
    noFill();
    stroke(30);
    strokeWeight(12);
    ellipse(x, y, 220, 220);

    // U
    stroke(40, 80, 180);
    strokeWeight(10);

    let w = 100;
    let h = 120;

    line(x - w / 2, y - h / 2, x - w / 2, y + h / 4);
    arc(x, y + h / 4, w, w, 0, PI);
    line(x + w / 2, y - h / 2, x + w / 2, y + h / 4);

    // S
    noStroke();
    fill(180, 40, 40);
    textStyle(BOLD);
    textSize(90);
    text("S", x, y);

    //======================
    // テキスト
    //======================
    textAlign(LEFT, BASELINE);

    fill(20, 50, 90);
    textSize(28);
    text("偉大なる平凡人たれ", 280, 80);

    fill(130, 28, 33);
    textSize(100);
    text("100", 280, 200);

    textSize(50);
    text("th", 455, 190);

    textSize(38);
    text("Anniversary", 280, 270);

    textSize(24);
    text("SINCE 1928", 340, 315);

    textSize(28);
    text("学校法人大阪産業大学", 280, 390);
  }
}
