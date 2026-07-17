let t = 0;

const blue = "#00479D";

const bigR = 90;
const smallR = 40;

const targetX = 95;

function setup() {
  createCanvas(600, 400);

  stroke(blue);
  strokeWeight(12);
  strokeCap(ROUND);
  noFill();

  textAlign(CENTER, CENTER);
  textSize(22);
  textFont("Arial");
}

function draw() {

  background(255);

  translate(width / 2, height / 2);

  //----------------------------------
  // 左右の円の移動
  //----------------------------------

  let leftX, rightX;

  if (t < 120) {

    let p = easeOutCubic(t / 120);

    leftX = lerp(-300, -targetX, p);
    rightX = lerp(300, targetX, p);

  } else {

    leftX = -targetX;
    rightX = targetX;

  }

  //----------------------------------
  // 左右の円
  //----------------------------------

  stroke(blue);
  strokeWeight(12);
  noFill();

  ellipse(leftX, 0, smallR * 2);
  ellipse(rightX, 0, smallR * 2);

  //----------------------------------
  // 真ん中の円
  //----------------------------------

  if (t > 120) {

    let p = constrain((t - 120) / 60, 0, 1);

    push();

    scale(p);

    fill(255);
    stroke(blue);
    strokeWeight(15);

    ellipse(0, 0, bigR * 2);

    pop();

  }

  //----------------------------------
  // 斜め線
  //----------------------------------

  if (t > 180) {

    let p = constrain((t - 180) / 40, 0, 1);

    let angle = radians(25);

    let x1 = -bigR * cos(angle);
    let y1 = bigR * sin(angle);

    let x2 = bigR * cos(angle);
    let y2 = -bigR * sin(angle);

    stroke(blue);
    strokeWeight(12);

    line(
      x1,
      y1,
      lerp(x1, x2, p),
      lerp(y1, y2, p)
    );

  }

  //----------------------------------
  // ロゴ文字
  //----------------------------------

  if (t > 220) {

    let p = constrain((t - 220) / 40, 0, 1);

    push();

    // 少し下から上へスライド
    let yOffset = lerp(15, 0, p);

    fill(0, 255 * p);
    noStroke();

    textSize(22);

    drawSpacedText("OSAKA SANGYO", 0, 145 + yOffset, 17);
    drawSpacedText("UNIVERSITY", 0, 180 + yOffset, 17);

    pop();

  }

  t++;

}

function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}

//----------------------------------
// 文字間隔を広げて描く
//----------------------------------
function drawSpacedText(str, x, y, spacing) {

  let chars = str.split("");

  let totalWidth = (chars.length - 1) * spacing;
  let startX = x - totalWidth / 2;

  for (let i = 0; i < chars.length; i++) {
    text(chars[i], startX + i * spacing, y);
  }

}
