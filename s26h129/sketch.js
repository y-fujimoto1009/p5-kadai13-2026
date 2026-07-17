let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
  textAlign(LEFT, TOP);
  noStroke();
}

function draw() {
  background(255);
  t++;

  let leftX = 120, leftY = 90, leftR = 60, leftDelay = 10;
  let midX = 185, midY = 60, midR = 60, midDelay = 30;
  let rightX = 260, rightY = 80, rightR = 35, rightDelay = 50;

  drawAppearCircle(leftX, leftY, leftR, leftDelay, color(130, 28, 33));
  drawAppearCircle(midX, midY, midR, midDelay, color(18, 51, 89));
  drawAppearCircle(rightX, rightY, rightR, rightDelay, color(0, 84, 145));

  strokeWeight(12);
  if (t > 60) {
    stroke(130, 28, 33);
    drawElasticLine(80, 230, 160, 190, 60, 140);
    drawElasticLine(160, 190, 240, 230, 80, 180);
    drawElasticLine(240, 230, 160, 270, 100, 200);
    drawElasticLine(160, 270, 80, 230, 120, 220);
  }
  noStroke();

  if (t > 120) {
    let alphaS = easeIn(min(1, (t - 120) / 30)) * 255;
    push();
    stroke(18, 51, 89, alphaS);
    strokeWeight(12);
    line(80, 250, 155, 287);
    line(80, 250, 155, 350);
    line(155, 350, 80, 313);
    pop();
  }

  if (t > 150) {
    let alphaU = easeIn(min(1, (t - 150) / 30)) * 255;
    push();
    stroke(0, 84, 145, alphaU);
    strokeWeight(12);
    line(170, 350, 170, 287);
    line(170, 350, 240, 313);
    line(240, 313, 240, 250);
    pop();
  }

  if (t > 80) {
    let s = constrain((t - 80) / 40, 0, 1);
    fill(255);
    push();
    translate(175, 215);
    let size = lerp(0, 30, easeOut(s));
    noStroke();
    fill(130, 28, 33);
    circle(0, 0, size);
    pop();
  }

  if (t > 210) {
    let p = constrain((t - 210) / 40, 0, 1);
    let easeP = easeOut(p);
    fill(20, 50, 90, 255 * easeP);
    textSize(20);
    text("偉大なる平凡人たれ", 310, 90);

    let baseX = 330;
    let slide = lerp(80, 0, easeP); 
    fill(130, 28, 33, 255 * easeP);
    textSize(72); 
    text("100", baseX + slide, 220);

    fill(0, 0, 0, 255 * easeP);
    textSize(28); 
    text("th", baseX + 220 + slide, 240); 
  }

  if (t > 260) {
    fill(0, 0, 0);
    textSize(28);
    text("Anniversary", 330, 300);
  }

  if (t > 280) {
    fill(0, 0, 0);
    textSize(18);
    text("SINCE 1928", 390, 340);
  }

  if (t > 300) {
    fill(0, 0, 0);
    textSize(20);
    text("学校法人大阪産業大学", 300, 400);
  }
}

function drawAppearCircle(x, y, r, delay, col) {
  let elapsed = t - delay;
  let progress = constrain(elapsed / 40, 0, 1); // 40 帧完成缩放
  let s = easeOut(progress);
  let alpha = s * 255;
  push();
  translate(x, y);
  noStroke();
  fill(red(col), green(col), blue(col), alpha);
  circle(0, 0, r * s);
  pop();
}

function drawElasticLine(x1, y1, x2, y2, startT, endT) {
  let dur = endT - startT;
  let elapsed = constrain(t - startT, 0, dur);
  let p = elapsed / dur;
  let eased = easeOutBack(p);
  let cx = lerp(x1, x2, eased);
  let cy = lerp(y1, y2, eased);
  line(x1, y1, cx, cy);
}

function easeOut(t) {
  // quadratic ease out
  return 1 - (1 - t) * (1 - t);
}
function easeIn(t) {
  return t * t;
}
function easeOutBack(t) {
  // overshoot
  let c1 = 1.70158;
  let c3 = c1 + 1;
  return 1 + c3 * pow(t - 1, 3) + c1 * pow(t - 1, 2);
}
