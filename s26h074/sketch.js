let startTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  startTime = millis();
}

function draw() {
  background(255);

  const s = min(width / 513, height / 768) * 0.84;
  const ox = width / 2 - 256.5 * s;
  const oy = height / 2 - 384 * s;
  const t = (millis() - startTime) / 1000;

  push();
  translate(ox, oy);
  scale(s);

  drawSide(t);
  drawTop(t);
  drawBalls(t);

  pop();
}

function drawSide(t) {
  const a = appear(t, 0.15, 0.75);
  const p = popScale(t, 0.15, 0.75);

  push();
  translate(284, 580);
  scale(p);
  translate(-284, -580);

  fill(24, 57, 96, a * 255);
  beginShape();
  vertex(116, 487);
  vertex(278, 554);
  vertex(278, 584);
  vertex(168, 536);
  vertex(278, 649);
  vertex(278, 689);
  vertex(116, 621);
  vertex(116, 590);
  vertex(222, 635);
  vertex(116, 525);
  endShape(CLOSE);

  fill(0, 91, 151, a * 255);
  beginShape();
  vertex(284, 551);
  vertex(451, 475);
  vertex(451, 619);
  vertex(284, 689);
  endShape(CLOSE);

  fill(255, a * 255);
  beginShape();
  vertex(320, 568);
  vertex(420, 522);
  vertex(420, 601);
  vertex(320, 645);
  endShape(CLOSE);

  pop();
}

function drawTop(t) {
  const a = appear(t, 0.55, 0.7);
  const p = popScale(t, 0.55, 0.7);

  push();
  translate(284, 463);
  scale(p);
  translate(-284, -463);

  fill(145, 28, 34, a * 255);
  beginShape();
  vertex(116, 447);
  vertex(284, 375);
  vertex(451, 446);
  vertex(451, 475);
  vertex(284, 551);
  vertex(116, 475);
  endShape(CLOSE);

  fill(255, a * 255);
  beginShape();
  vertex(154, 460);
  vertex(284, 405);
  vertex(414, 460);
  vertex(284, 516);
  endShape(CLOSE);

  pop();
}

function drawBalls(t) {
  ball(206, 186, 138, 145, 28, 34, t, 0.95);
  ball(204, 340, 86, 0, 91, 151, t, 1.2);
  ball(368, 298, 121, 24, 57, 96, t, 1.45);
  ball(321, 437, 63, 145, 28, 34, t, 1.7);
}

function ball(x, y, d, r, g, b, t, delay) {
  const a = appear(t, delay, 0.55);
  const p = popScale(t, delay, 0.55);

  push();
  translate(x, y);
  scale(p);
  fill(r, g, b, a * 255);
  circle(0, 0, d);
  pop();
}

function appear(t, delay, duration) {
  return constrain((t - delay) / duration, 0, 1);
}

function popScale(t, delay, duration) {
  const x = appear(t, delay, duration);
  return 1 + 0.14 * sin(x * PI) * (1 - x);
}

function mousePressed() {
  startTime = millis();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
