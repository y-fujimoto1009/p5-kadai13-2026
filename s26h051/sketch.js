let t = 0;

// ------------------------
// タイミング設計
// 各パーツは「前のパーツが完了した後」に開始する
// ------------------------
const GAP = 10; // パーツ間の間（フレーム）

// 1. ボックス（ロゴ本体）
const boxSlideStart = 60;
const boxSlideDuration = 60;
const boxSlideDistance = 200;
const boxFormEnd = boxSlideStart + boxSlideDuration; // = 120

// 2. "S"（ネイビー）
const sSlideStart = boxFormEnd + GAP;      // = 130
const sSlideDuration = 60;
const sSlideDistance = 200;
const sFormEnd = sSlideStart + sSlideDuration; // = 190

// 3. "U"（ブルー）
const uSlideStart = sFormEnd + GAP;        // = 200
const uSlideDuration = 60;
const uSlideDistance = 200;
const uFormEnd = uSlideStart + uSlideDuration; // = 260

// 4. 丸（S・Uが完了してから、順番に湧き出る）
const circleStart = uFormEnd + GAP;        // = 270
const circleStagger = 20;
const circleDuration = 55;

// ------------------------
// 各パーツの座標データ
// ------------------------
const boxV0 = { x: 80,  y: 230 };
const boxV1 = { x: 160, y: 190 };
const boxV2 = { x: 240, y: 230 };
const boxV3 = { x: 160, y: 270 };

const sLines = [
  { x1: 80,  y1: 250, x2: 155, y2: 287 },
  { x1: 80,  y1: 250, x2: 155, y2: 350 },
  { x1: 155, y1: 350, x2: 80,  y2: 313 } // 350 - 37
];

const uLines = [
  { x1: 170, y1: 350, x2: 170, y2: 287 },
  { x1: 170, y1: 350, x2: 240, y2: 313 }, // 350 - 37
  { x1: 240, y1: 313, x2: 240, y2: 250 }
];

// 丸（4つ）：元の3つ + ボックスと重なっていた中央の赤丸で合計4つ
const circles = [
  { x: 120, y: 90,  r: 60, col: [130, 28, 33] },                        // マルーン
  { x: 185, y: 145, r: 60, col: [18, 51, 89] },                         // ネイビー
  { x: 120, y: 165, r: 35, col: [0, 84, 145] },                         // ブルー
  { x: 175, y: 215, r: 30, col: [130, 28, 33], stroke: [255, 255, 255] } // 中央の赤丸（白縁つき）
];

// 各丸が湧き出し始めるタイミングを自動生成
const circleDelays = circles.map((_, i) => circleStart + circleStagger * i);
const circlesFormEnd = circleDelays[circleDelays.length - 1] + circleDuration;

// ------------------------
// タイピング風テキスト（共通関数）
// ------------------------
function typeText(str, x, y, startT, speed = 15) {
  if (t <= startT) return;
  const len = floor((t - startT) / speed);
  const s = str.substring(0, len);
  text(s, x, y);
}

// 文字列がタイピングし終わるまでにかかるフレーム数
function strDuration(str, speed) {
  return str.length * speed;
}

// ------------------------
// 100のバウンド着地
// ------------------------
function bounce100th(x100, y100, xTh, yTh, startT) {
  const p = constrain((t - startT) / 60, 0, 1);

  // バウンド量（p=0〜1で1回だけポヨン。100とthで共通）
  const bounce = sin(p * PI) * 25; // 25pxバウンド

  fill(130, 28, 33);
  textSize(120);
  text("100", x100, y100 - bounce);

  fill(130, 28, 33);
  textSize(60);
  text("th", xTh, yTh - bounce);
}


// 丸が湧き出る発生源（ボックスの頂点＝v1）
const sourceX = boxV1.x, sourceY = boxV1.y;

// ------------------------
// 文字パーツのタイミング（順番に出終わってから次が始まる）
// Anniversary → SINCE 1928 → 学校名 → （最後に）100th がバウンドで登場
// ------------------------
const typeSpeed = 5;   // タイピング速度（1文字あたりのフレーム数。小さいほど速い）
const TEXT_GAP = 15;    // 各テキストが出終わってから次が始まるまでの間

const catchStart = circlesFormEnd + 15;

const anniversaryStart = circlesFormEnd + 55;
const sinceStart   = anniversaryStart + strDuration("Anniversary", typeSpeed) + TEXT_GAP;
const schoolStart  = sinceStart + strDuration("SINCE 1928", typeSpeed) + TEXT_GAP;
const num100Start  = schoolStart + strDuration("学校法人大阪産業大学", typeSpeed) + TEXT_GAP;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function easeOutCubic(x) {
  const c = constrain(x, 0, 1);
  return 1 - pow(1 - c, 3);
}

// 丸の半径を計算：移動しながら成長し、最後に一回り大きくはじけて元のサイズに戻る
// p: 0〜1（湧き出し全体の進行度）
// targetR: 最終的な半径
function popRadius(p, targetR) {
  const growEnd = 0.55;  // ここまでで目標サイズまで成長
  const popEnd = 0.78;   // ここまでで大きくはじける
  const overshoot = 1.3; // はじけたときの拡大率

  if (p < growEnd) {
    const g = easeOutCubic(p / growEnd);
    return lerp(0, targetR, g);
  } else if (p < popEnd) {
    const g = easeOutCubic((p - growEnd) / (popEnd - growEnd));
    return lerp(targetR, targetR * overshoot, g);
  } else {
    const g = easeOutCubic((p - popEnd) / (1 - popEnd));
    return lerp(targetR * overshoot, targetR, g);
  }
}

// 指定した複数のラインを、下からスライドインさせて描画する共通関数
function drawSlideInLines(lines, slideStart, slideDuration, slideDistance, col) {
  if (t <= slideStart) return;
  const p = easeOutCubic((t - slideStart) / slideDuration);
  const offsetY = lerp(slideDistance, 0, p);

  push();
  translate(0, offsetY);
  stroke(col[0], col[1], col[2]);
  strokeWeight(12);
  for (const l of lines) {
    line(l.x1, l.y1, l.x2, l.y2);
  }
  pop();
}

function draw() {
  background(255);
  t++;

  //------------------------
  // 1. ロゴ本体（ボックス）が下からスライドイン
  //------------------------
  drawSlideInLines(
    [
      { x1: boxV0.x, y1: boxV0.y, x2: boxV1.x, y2: boxV1.y },
      { x1: boxV1.x, y1: boxV1.y, x2: boxV2.x, y2: boxV2.y },
      { x1: boxV2.x, y1: boxV2.y, x2: boxV3.x, y2: boxV3.y },
      { x1: boxV3.x, y1: boxV3.y, x2: boxV0.x, y2: boxV0.y }
    ],
    boxSlideStart, boxSlideDuration, boxSlideDistance,
    [130, 28, 33]
  );

  //------------------------
  // 2. "S"（ネイビー）がボックスの後にスライドイン
  //------------------------
  drawSlideInLines(sLines, sSlideStart, sSlideDuration, sSlideDistance, [18, 51, 89]);

  //------------------------
  // 3. "U"（ブルー）がSの後にスライドイン
  //------------------------
  drawSlideInLines(uLines, uSlideStart, uSlideDuration, uSlideDistance, [0, 84, 145]);

  //------------------------
  // 4. 丸（4つ、中央の赤丸も含む）がU完了後、ボックス頂点から順に湧き出て、最後にはじける
  //------------------------
  for (let i = 0; i < circles.length; i++) {
    const delay = circleDelays[i];
    const localT = constrain(t - delay, 0, circleDuration);
    const p = localT / circleDuration;

    const c = circles[i];
    // 位置は早めに目標へ到着させる（p=0.55で到着）
    const posEase = easeOutCubic(min(p / 0.55, 1));
    const x = lerp(sourceX, c.x, posEase);
    const y = lerp(sourceY, c.y, posEase);
    // サイズは目標到達後、一回り大きくはじけて元に戻る
    const r = popRadius(p, c.r);

    if (t > delay) {
      if (c.stroke) {
        stroke(c.stroke[0], c.stroke[1], c.stroke[2]);
        strokeWeight(3);
      } else {
        noStroke();
      }
      fill(c.col[0], c.col[1], c.col[2]);
      circle(x, y, r);
    }
  }
  noStroke();

  // キャッチコピー（タイピング風）
  if (t > catchStart) {
    fill(20, 50, 90);
    textSize(32);
    typeText("偉大なる平凡人たれ", 310, 90, catchStart, typeSpeed);
  }

  // Anniversary（タイピング風）
  if (t > anniversaryStart) {
    fill(20, 50, 90);
    textSize(42);
    typeText("Anniversary", 330, 300, anniversaryStart, typeSpeed);
  }

  // SINCE 1928（タイピング風。Anniversaryが出終わってから開始）
  if (t > sinceStart) {
    fill(0);
    textSize(28);
    typeText("SINCE 1928", 390, 340, sinceStart, typeSpeed);
  }

  // 学校名（タイピング風。SINCE 1928が出終わってから開始）
  if (t > schoolStart) {
    fill(0);
    textSize(32);
    typeText("学校法人大阪産業大学", 300, 400, schoolStart, typeSpeed);
  }

  // 100th（学校名が出終わった最後に、100とthが一緒にバウンドで登場）
  if (t > num100Start) {
    bounce100th(330, 220, 540, 220, num100Start);
  }
}
