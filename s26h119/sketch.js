let t = 0;

// イージング関数(バウンド)
function easeOutBounce(x) {
  const n1 = 7.5625, d1 = 2.75;
  if (x < 1 / d1) return n1 * x * x;
  else if (x < 2 / d1) { x -= 1.5 / d1; return n1 * x * x + 0.75; }
  else if (x < 2.5 / d1) { x -= 2.25 / d1; return n1 * x * x + 0.9375; }
  else { x -= 2.625 / d1; return n1 * x * x + 0.984375; }
}

// イージング関数(弾性・オーバーシュート)
function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;
  if (x === 0) return 0;
  if (x === 1) return 1;
  return pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
}

// 落下してくる丸のデータ
let circles = [
  { fx: 120, fy: 90,  size: 60, col: [130, 28, 33],  start: 20,  dur: 45 },
  { fx: 185, fy: 145, size: 60, col: [18, 51, 89],   start: 45,  dur: 45 },
  { fx: 120, fy: 165, size: 35, col: [0, 84, 145],   start: 70,  dur: 45 }
];

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);
  t++;

  // ------------------------
  // 丸パーツ:上から落下してバウンド
  // ------------------------
  noStroke();
  for (let c of circles) {
    if (t > c.start) {
      let p = constrain((t - c.start) / c.dur, 0, 1);
      let y = lerp(-80, c.fy, easeOutBounce(p));
      fill(c.col[0], c.col[1], c.col[2]);
      circle(c.fx, y, c.size);
    }
  }

  // ------------------------
  // ロゴ本体(ひし形の枠):中心から弾性拡大
  // ------------------------
  let boxStart = 90, boxDur = 70;
  if (t > boxStart) {
    let p = constrain((t - boxStart) / boxDur, 0, 1);
    let s = easeOutElastic(p);
    push();
    translate(160, 230);
    scale(s);
    strokeWeight(12 / max(s, 0.3));
    stroke(130, 28, 33);
    noFill();
    line(-80, 0, 0, -40);
    line(0, -40, 80, 0);
    line(80, 0, 0, 40);
    line(0, 40, -80, 0);
    pop();
  }

  // ------------------------
  // 青い部分(S・U):枠が出た後に弾性拡大
  // ------------------------
  let letterStart = 150, letterDur = 60;
  if (t > letterStart) {
    let p = constrain((t - letterStart) / letterDur, 0, 1);
    let s = easeOutElastic(p);
    push();
    translate(160, 300);
    scale(s);
    strokeWeight(12 / max(s, 0.3));
    noFill();
    // S
    stroke(18, 51, 89);
    beginShape();
    vertex(-80, -50);
    vertex(-5, -13);
    vertex(-80, 50);
    endShape();
    // U
    stroke(0, 84, 145);
    beginShape();
    vertex(10, -50);
    vertex(10, 13);
    vertex(80, 50);
    vertex(80, -50);
    endShape();
    pop();
  }

  // ------------------------
  // 中央の赤丸:ポンと弾ける
  // ------------------------
  let dotStart = 190, dotDur = 30;
  if (t > dotStart) {
    let p = constrain((t - dotStart) / dotDur, 0, 1);
    let s = easeOutElastic(p);
    noStroke();
    fill(130, 28, 33);
    circle(175, 245, 26 * s);
  }

  // ------------------------
  // キャッチコピー:タイプライター風
  // ------------------------
  let copy = "偉大なる平凡人たれ";
  let copyStart = 220, copySpeed = 4;
  if (t > copyStart) {
    let n = min(copy.length, floor((t - copyStart) / copySpeed));
    fill(20, 50, 90);
    textSize(32);
    text(copy.substring(0, n), 310, 90);
  }

  // ------------------------
  // 100th:弾性スケールで登場
  // ------------------------
  let numStart = 260, numDur = 45;
  if (t > numStart) {
    let p = constrain((t - numStart) / numDur, 0, 1);
    let s = easeOutElastic(p);
    push();
    translate(420, 195);
    scale(s);
    fill(130, 28, 33);
    textSize(120);
    text("100", -100, 25);
    textSize(60);
    text("th", 105, 25);
    pop();
  }

  // ------------------------
  // Anniversary:フェードイン
  // ------------------------
  let annStart = 310, annDur = 40;
  if (t > annStart) {
    let a = constrain((t - annStart) / annDur, 0, 1) * 255;
    fill(130, 28, 33, a);
    textSize(42);
    text("Anniversary", 330, 300);
  }

  // ------------------------
  // SINCE 1928:右からスライドイン
  // ------------------------
  let sinceStart = 340, sinceDur = 30;
  if (t > sinceStart) {
    let p = constrain((t - sinceStart) / sinceDur, 0, 1);
    let x = lerp(746, 390, easeOutElastic(p));
    fill(130, 28, 33);
    textSize(28);
    text("SINCE 1928", x, 340);
  }

  // ------------------------
  // 学校名:下からフェードイン
  // ------------------------
  let nameStart = 370, nameDur = 40;
  if (t > nameStart) {
    let p = constrain((t - nameStart) / nameDur, 0, 1);
    let y = lerp(430, 400, p);
    fill(130, 28, 33, p * 255);
    textSize(32);
    text("学校法人大阪産業大学", 300, y);
  }
}
