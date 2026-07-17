let t = 0;

const RED  = [130, 28, 33];
const NAVY = [18, 51, 89];
const BLUE = [0, 84, 145];

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);
  t++;

  drawCircles();
  drawDiamond();
  drawS();
  drawU();
  drawAccentDot();
  drawCatchcopy();
  draw100th();
  drawAnniversary();
  drawSince();
  drawSchoolName();
}

// ---------- easing helpers ----------

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

function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;
  if (x === 0) return 0;
  if (x === 1) return 1;
  return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function progress(startFrame, duration) {
  return constrain((t - startFrame) / duration, 0, 1);
}

function bounceIn(startFrame, duration, fromVal, toVal) {
  const p = progress(startFrame, duration);
  return lerp(fromVal, toVal, easeOutBounce(p));
}

// point that "whips" from a fixed start to its target with an elastic overshoot
function edgeIn(startFrame, duration, startPt, endPt) {
  const e = easeOutElastic(progress(startFrame, duration));
  return { x: lerp(startPt.x, endPt.x, e), y: lerp(startPt.y, endPt.y, e) };
}

// ---------- the three base circles ----------
// Original: circles moved straight down at constant speed, staggered start.
// New: same start/end positions, but they drop in and bounce to rest.

function drawCircles() {
  noStroke();

  fill(...RED);
  circle(120, bounceIn(0, 55, -60, 90), 60);

  fill(...NAVY);
  circle(185, bounceIn(18, 55, -60, 145), 60);

  fill(...BLUE);
  circle(120, bounceIn(36, 55, -60, 165), 35);
}

// ---------- diamond mark ----------
// Original: 4 lines grew linearly from each fixed corner to the next.
// New: same 4 corners/edges, but each edge whips out elastically, staggered
// so the diamond seems to "snap" into shape corner by corner.

function drawDiamond() {
  if (t <= 60) return;

  stroke(...RED);
  strokeWeight(12);

  const A = { x: 80, y: 230 };
  const B = { x: 160, y: 190 };
  const C = { x: 240, y: 230 };
  const D = { x: 160, y: 270 };

  const e1 = edgeIn(60, 40, A, B);
  const e2 = edgeIn(75, 40, B, C);
  const e3 = edgeIn(90, 40, C, D);
  const e4 = edgeIn(105, 40, D, A);

  line(A.x, A.y, e1.x, e1.y);
  line(B.x, B.y, e2.x, e2.y);
  line(C.x, C.y, e3.x, e3.y);
  line(D.x, D.y, e4.x, e4.y);
}

// ---------- "S" ----------
// Original: appeared instantly once t>120, straight-line strokes, fixed coords.
// New: same coordinates, but the whole glyph pops in with an elastic scale
// from its bounding-box center, so it lands exactly where it always did.

function drawS() {
  if (t <= 120) return;

  const s = easeOutElastic(progress(120, 30));
  const pivot = { x: 117, y: 300 }; // bounding-box center of the original S

  stroke(...NAVY);
  strokeWeight(12);

  push();
  translate(pivot.x, pivot.y);
  scale(s);
  line(80 - pivot.x, 250 - pivot.y, 155 - pivot.x, 287 - pivot.y);
  line(80 - pivot.x, 250 - pivot.y, 155 - pivot.x, 350 - pivot.y);
  line(155 - pivot.x, 350 - pivot.y, 80 - pivot.x, 313 - pivot.y);
  pop();
}

// ---------- "U" ----------
// Same treatment as S: identical coordinates, elastic pop-in from center.

function drawU() {
  if (t <= 150) return;

  const s = easeOutElastic(progress(150, 30));
  const pivot = { x: 205, y: 300 }; // bounding-box center of the original U

  stroke(...BLUE);
  strokeWeight(12);

  push();
  translate(pivot.x, pivot.y);
  scale(s);
  line(170 - pivot.x, 350 - pivot.y, 170 - pivot.x, 287 - pivot.y);
  line(170 - pivot.x, 350 - pivot.y, 240 - pivot.x, 313 - pivot.y);
  line(240 - pivot.x, 313 - pivot.y, 240 - pivot.x, 250 - pivot.y);
  pop();
}

// ---------- small accent dot in the diamond ----------
// Original: grew linearly from 0 to 30px once t>150.
// New: same final size/position, but "pops" in with a slight overshoot.

function drawAccentDot() {
  if (t <= 150) return;

  const size = 30 * easeOutBack(progress(150, 25));

  strokeWeight(3);
  stroke(255, 255, 255);
  fill(...RED);
  circle(175, 215, max(size, 0));
}

// ---------- text ----------
// All original strings, positions, sizes, colors kept identical.
// Only change: each block scale-pops in from its own anchor point
// instead of appearing instantly.

function popText(startFrame, duration, x, y, size, col, str) {
  const s = easeOutElastic(progress(startFrame, duration));
  if (s <= 0) return;
  push();
  translate(x, y);
  scale(s);
  noStroke();
  fill(...col);
  textSize(size);
  text(str, 0, 0);
  pop();
}

function drawCatchcopy() {
  if (t <= 210) return;
    popText(210, 25, 310, 90, 32, NAVY, "偉大なる平凡人たれ");
}

function draw100th() {
  if (t <= 230) return;
  popText(230, 30, 330, 220, 120, RED, "100");
  popText(245, 30, 540, 220, 60, RED, "th");
}

function drawAnniversary() {
  if (t <= 250) return;
  popText(250, 25, 330, 300, 42, [0, 0, 0], "Anniversary");
}

function drawSince() {
  if (t <= 270) return;
  popText(270, 25, 390, 340, 28, [0, 0, 0], "SINCE 1928");
}

function drawSchoolName() {
  if (t <= 290) return;
  popText(290, 25, 300, 400, 32, [0, 0, 0], "学校法人大阪産業大学");
}
