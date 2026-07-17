let colMaroon, colNavy, colBlue;

const startOsuPos = { x: 373, y: 240 };
const boxPivot = { x: 170, y: 277 };
const innerDot = { x: 192.22, y: 265.50, r: 16.69 };

const balls = [
  { fx: 123.84, fy: 116.17, r: 40.76, name: "maroon" },
  { fx: 220.47, fy: 181.40, r: 35.63, name: "navy" },
  { fx: 122.65, fy: 205.98, r: 25.43, name: "blue" }
];

const POP_END = 14;
const HOLD_END = 35;
const MOVE_END = 95;
const BOX_END = 135;
const BALLS_END = 170;
const TEXT_START = 165;
const TEXT_END = 215;

const NUM_PAUSE = 10;
const NUM_POP_START = TEXT_END + NUM_PAUSE;
const NUM_POP_END = NUM_POP_START + 16;
const NUM_COUNT_END = NUM_POP_END + 34;
const NUM_LAND_END = NUM_COUNT_END + 12;

function setup() {
  const cnv = createCanvas(746, 480);
  // HTML版ではcanvas-holder内へ配置し、p5.js Web Editorでは通常配置する。
  const canvasHolder = document.getElementById("canvas-holder");
  if (canvasHolder) {
    cnv.parent(canvasHolder);
  }
  frameRate(60);

  colMaroon = color(124, 35, 38);
  colNavy = color(36, 55, 90);
  colBlue = color(1, 93, 149);
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    frameCount = 0;
  }
}

function easeOutExpo(t) {
  return t >= 1 ? 1 : 1 - pow(2, -10 * t);
}

function easeOutSoftBack(t) {
  const c1 = 1.15;
  const c3 = c1 + 1;
  return 1 + c3 * pow(t - 1, 3) + c1 * pow(t - 1, 2);
}

function getHundredState() {
  const f = frameCount;

  if (f < NUM_POP_END) {
    const t = easeOutSoftBack(map(f, NUM_POP_START, NUM_POP_END, 0, 1, true));
    return { txt: nf(0, 3), scale: t };
  }

  if (f < NUM_COUNT_END) {
    const t = easeOutExpo(map(f, NUM_POP_END, NUM_COUNT_END, 0, 1, true));
    const val = floor(lerp(0, 100, t));
    return { txt: nf(val, 3), scale: 1 };
  }

  if (f < NUM_LAND_END) {
    const t = easeOutSoftBack(map(f, NUM_COUNT_END, NUM_LAND_END, 0, 1, true));
    return { txt: "100th", scale: t };
  }

  return { txt: "100th", scale: 1 };
}

function draw() {
  background(255);
  const f = frameCount;

  if (f < MOVE_END) {
    let osuX, osuY, osuSize;

    if (f < POP_END) {
      const t = easeOutSoftBack(map(f, 0, POP_END, 0, 1, true));
      osuX = startOsuPos.x;
      osuY = startOsuPos.y;
      osuSize = 90 * t;
    } else if (f < HOLD_END) {
      osuX = startOsuPos.x;
      osuY = startOsuPos.y;
      osuSize = 90;
    } else {
      const t = easeOutExpo(map(f, HOLD_END, MOVE_END, 0, 1, true));
      osuX = lerp(startOsuPos.x, boxPivot.x, t);
      osuY = lerp(startOsuPos.y, boxPivot.y, t);
      osuSize = lerp(90, 40, t);
    }

    push();
    noStroke();
    fill(colNavy);
    textAlign(CENTER, CENTER);
    textSize(osuSize);
    textStyle(BOLD);
    text("OSU", osuX, osuY);
    pop();
  }

  if (f >= MOVE_END) {
    const t = easeOutSoftBack(map(f, MOVE_END, BOX_END, 0, 1, true));
    drawBoxLogo(t);
  }

  if (f >= MOVE_END) {
    const t = easeOutSoftBack(map(f, MOVE_END, BALLS_END, 0, 1, true));
    const bob = f > BALLS_END ? sin(f * 0.05) * 3 : 0;

    for (const b of balls) {
      const bx = lerp(boxPivot.x, b.fx, t);
      const by = lerp(boxPivot.y, b.fy, t) + bob;
      const alpha = map(f, MOVE_END, MOVE_END + 14, 0, 255, true);
      drawBall(bx, by, b.r, b.name, alpha);
    }
  }

  if (f >= TEXT_START) {
    const t = easeOutExpo(map(f, TEXT_START, TEXT_END, 0, 1, true));
    const slideX = lerp(150, 0, t);
    const alpha = map(f, TEXT_START, TEXT_START + 14, 0, 255, true);
    drawSideText(slideX, alpha);
  }
}

function drawBall(x, y, r, name, alpha) {
  noStroke();
  const c = name === "maroon" ? colMaroon : name === "navy" ? colNavy : colBlue;
  fill(red(c), green(c), blue(c), alpha);
  ellipse(x, y, r * 2, r * 2);
}

function drawBoxLogo(scaleT) {
  push();
  translate(boxPivot.x, boxPivot.y);
  scale(scaleT);
  translate(-boxPivot.x, -boxPivot.y);
  noStroke();

  // 左側面（S）
  fill(colNavy);
  beginShape();
  vertex(166.08, 332.65);
  vertex(70.93, 292.17);
  vertex(70.93, 315.15);
  vertex(136.00, 380.55);
  vertex(70.93, 352.87);
  vertex(70.93, 370.13);
  vertex(166.08, 410.58);
  vertex(166.08, 387.97);
  vertex(99.92, 321.77);
  vertex(166.08, 349.91);
  endShape(CLOSE);

  // 右側面（U）
  fill(colBlue);
  beginShape();
  vertex(268.98, 293.60);
  vertex(251.07, 301.20);
  vertex(251.07, 360.85);
  vertex(191.73, 385.52);
  vertex(191.73, 324.63);
  vertex(173.17, 332.38);
  vertex(173.17, 410.48);
  vertex(269.02, 370.68);
  endShape(CLOSE);

  // 天面の外形
  fill(colMaroon);
  beginShape();
  vertex(170.00, 227.00);
  vertex(71.00, 268.21);
  vertex(71.00, 285.79);
  vertex(170.00, 327.00);
  vertex(269.00, 285.79);
  vertex(269.00, 268.21);
  endShape(CLOSE);

  // 天面の白抜き
  // p5.js 2.xでは、vertexとbezierVertexを混在させた形を
  // endShape(CLOSE)で閉じるとエラーになるため、Canvas APIで描画する。
  drawingContext.save();
  drawingContext.fillStyle = "rgb(255, 255, 255)";
  drawingContext.beginPath();
  drawingContext.moveTo(170.00, 309.42);
  drawingContext.lineTo(92.12, 277.00);
  drawingContext.lineTo(170.00, 244.58);
  drawingContext.lineTo(178.75, 248.22);
  drawingContext.bezierCurveTo(182.48, 245.36, 187.14, 243.64, 192.22, 243.64);
  drawingContext.bezierCurveTo(203.52, 243.64, 212.84, 252.10, 214.13, 262.95);
  drawingContext.lineTo(247.88, 277.00);
  drawingContext.closePath();
  drawingContext.fill();
  drawingContext.restore();

  // 天面の種
  fill(colMaroon);
  ellipse(innerDot.x, innerDot.y, innerDot.r * 2, innerDot.r * 2);

  pop();
}

function drawSideText(offsetX, alpha) {
  push();
  translate(offsetX, 0);
  textAlign(LEFT, CENTER);
  noStroke();

  fill(red(colNavy), green(colNavy), blue(colNavy), alpha);
  textSize(28);
  textStyle(NORMAL);
  text("偉大なる平凡人たれ", 290, 95);

  fill(red(colMaroon), green(colMaroon), blue(colMaroon), alpha);

  textSize(100);
  textStyle(BOLD);
  const hundred = getHundredState();
  push();
  translate(290, 210);
  scale(hundred.scale);
  text(hundred.txt, 0, 0);
  pop();

  textSize(46);
  textStyle(BOLD);
  text("Anniversary", 290, 300);

  textSize(22);
  textStyle(NORMAL);
  text("SINCE 1928", 290, 335);

  textSize(26);
  textStyle(BOLD);
  text("学校法人大阪産業大学", 290, 385);

  pop();
}
