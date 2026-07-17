let t = 0;

// ---- タイミング定義（フレーム数, 60fps想定）----
const T = {
  circle:      [0, 60],
  diamond:     [70, 130],
  sSeg:        { start: 140, dur: 20 },   // 140-160, 160-180, 180-200
  uSeg:        { start: 210, dur: 20 },   // 210-230, 230-250, 250-270
  centerCircle:[270, 300],
  catchCopy:   [300, 360],
  hundred:     [360, 400],
  th:          [370, 410],
  anniversary: [410, 440],
  since:       [440, 465],
  school:      [465, 490],
  scale:       [500, 560],
  holdEnd:     620
};

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

// ---- イージング関数 ----
function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}
function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}
function progressOf(start, end) {
  return constrain(map(t, start, end, 0, 1), 0, 1);
}

// ---- 1本ずつなぞって描く関数 ----
function drawTracedSegments(segments, startT, segDur, col, weight) {
  stroke(col);
  strokeWeight(weight);
  for (let i = 0; i < segments.length; i++) {
    const segStart = startT + i * segDur;
    const segEnd = segStart + segDur;
    if (t <= segStart) break; // まだこの線の番が来ていない
    const p = easeOutCubic(constrain(map(t, segStart, segEnd, 0, 1), 0, 1));
    const [x1, y1, x2, y2] = segments[i];
    line(x1, y1, lerp(x1, x2, p), lerp(y1, y2, p));
  }
}

// ---- ひし形（ロゴ本体）が四方向から中央へ収束 ----
function drawConvergingDiamond(startT, endT, col, weight) {
  const p = easeOutCubic(progressOf(startT, endT));
  const center = createVector(160, 230);
  const finalVerts = [
    createVector(160, 190), // 上
    createVector(240, 230), // 右
    createVector(160, 270), // 下
    createVector(80, 230)   // 左
  ];
  const verts = finalVerts.map(v => {
    const dir = p5.Vector.sub(v, center);
    const startPos = p5.Vector.add(center, dir.copy().mult(3)); // 外側3倍からスタート
    return p5.Vector.lerp(startPos, v, p);
  });
  noFill();
  stroke(col);
  strokeWeight(weight);
  beginShape();
  for (const v of verts) vertex(v.x, v.y);
  endShape(CLOSE);
}

function draw() {
  background(255);
  if (t <= T.holdEnd) t++;

  // ---- 全体スケール（完成後に1.0→1.05） ----
  const scaleP = easeInOutCubic(progressOf(T.scale[0], T.scale[1]));
  const s = t < T.scale[0] ? 1 : lerp(1, 1.05, scaleP);

  push();
  translate(width / 2, height / 2);
  scale(s);
  translate(-width / 2, -height / 2);

  //------------------------
  // 上の3つの丸：中央から放射状に広がる
  //------------------------
  {
    const p = easeOutCubic(progressOf(T.circle[0], T.circle[1]));
    const startCenter = createVector(142, 133); // 3つの丸の重心を出発点にする
    const circles = [
      { pos: createVector(120, 90), size: 60, col: [130, 28, 33] },
      { pos: createVector(185, 145), size: 60, col: [18, 51, 89] },
      { pos: createVector(120, 165), size: 35, col: [0, 84, 145] }
    ];
    noStroke();
    for (const c of circles) {
      const pos = p5.Vector.lerp(startCenter, c.pos, p);
      const size = lerp(0, c.size, p);
      fill(...c.col);
      circle(pos.x, pos.y, size);
    }
  }

  //------------------------
  // ロゴ本体：四方向から中央へ収束
  //------------------------
  if (t > T.diamond[0]) {
    drawConvergingDiamond(T.diamond[0], T.diamond[1], [130, 28, 33], 12);
  }

  //------------------------
  // "S"：1本ずつなぞる
  //------------------------
  if (t > T.sSeg.start) {
    drawTracedSegments(
      [
        [80, 250, 155, 287],
        [80, 250, 155, 350],
        [155, 350, 80, 313]
      ],
      T.sSeg.start, T.sSeg.dur,
      [18, 51, 89], 12
    );
  }

  //------------------------
  // "U"：1本ずつなぞる
  //------------------------
  if (t > T.uSeg.start) {
    drawTracedSegments(
      [
        [170, 350, 170, 287],
        [170, 350, 240, 313],
        [240, 313, 240, 250]
      ],
      T.uSeg.start, T.uSeg.dur,
      [0, 84, 145], 12
    );
  }

  //------------------------
  // 中央の赤丸
  //------------------------
  if (t > T.centerCircle[0]) {
    const p = easeOutCubic(progressOf(T.centerCircle[0], T.centerCircle[1]));
    stroke(255);
    strokeWeight(3);
    fill(130, 28, 33);
    circle(175, 215, lerp(0, 30, p));
    noStroke();
  }

  //------------------------
  // キャッチコピー：フェードイン
  //------------------------
  if (t > T.catchCopy[0]) {
    const p = progressOf(T.catchCopy[0], T.catchCopy[1]);
    const alpha = lerp(0, 255, easeOutCubic(p));
    noStroke();
    fill(20, 50, 90, alpha);
    textSize(32);
    text("偉大なる平凡人たれ", 310, 90);
  }


  //------------------------
  // 100th
  //------------------------
  if (t > T.hundred[0]) {
    const p100 = easeOutCubic(progressOf(T.hundred[0], T.hundred[1]));
    fill(130, 28, 33);
    textSize(120);
    text("100", lerp(width + 50, 330, p100), 220);
  }
  if (t > T.th[0]) {
    const pTh = easeOutCubic(progressOf(T.th[0], T.th[1]));
    fill(130, 28, 33);
    textSize(60);
    text("th", lerp(width + 100, 540, pTh), 220);
  }
  //------------------------
  // Anniversary
  //------------------------
  if (t > T.anniversary[0]) {
    const p = progressOf(T.anniversary[0], T.anniversary[1]);
    fill(20, 50, 90, lerp(0, 255, easeOutCubic(p)));
    textSize(42);
    text("Anniversary", 330, 300);
  }

  //------------------------
  // SINCE 1928
  //------------------------
  if (t > T.since[0]) {
    const p = progressOf(T.since[0], T.since[1]);
    fill(20, 50, 90, lerp(0, 255, easeOutCubic(p)));
    textSize(28);
    text("SINCE 1928", 390, 340);
  }

  //------------------------
  // 学校名
  //------------------------
  if (t > T.school[0]) {
    const p = progressOf(T.school[0], T.school[1]);
    fill(20, 50, 90, lerp(0, 255, easeOutCubic(p)));
    textSize(32);
    text("学校法人大阪産業大学", 300, 400);
  }

  pop();

  //------------------------
  // 最後は静止して終了
  //------------------------
  if (t >= T.holdEnd) {
    noLoop();
  }
}
