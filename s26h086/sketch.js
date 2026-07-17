let t = 0;

function setup() {
  createCanvas(1200, 700);
  textAlign(CENTER, CENTER);
  textFont('Noto Sans JP', 'sans-serif');
}

function draw() {
  background(255);
  t++;

  // progression (0 to 1)
  let p1 = constrain((t - 0) / 60, 0, 1);
  let p2 = constrain((t - 40) / 60, 0, 1);
  let p3 = constrain((t - 80) / 60, 0, 1);
  let p4 = constrain((t - 120) / 40, 0, 1);
  let p5 = constrain((t - 160) / 50, 0, 1);
  let p6 = constrain((t - 210) / 50, 0, 1);
  let p7 = constrain((t - 270) / 60, 0, 1);

  // Draw elements
  drawCircles(p1, p2);
  drawTopDiamond(p3, p4);
  drawCubeSU(p5, p6);
  drawTexts(p7);

  // Restart animation after 10 seconds
  if (t > 600) {
    t = 0;
  }
}

// 1. Circles
function drawCircles(p1, p2) {
  push();
  noStroke();

  // Red circle drops
  let redY = lerp(-100, 110, p1);
  fill(160, 10, 10);
  ellipse(210, redY, 150, 150);

  // Blue circles slide in
  let blue1X = lerp(-100, 170, p2);
  fill(10, 70, 160);
  ellipse(blue1X, 210, 75, 75);

  let blue2X = lerp(1300, 290, p2);
  fill(10, 25, 60);
  ellipse(blue2X, 175, 110, 110);

  pop();
}

// 2. Diamond and Center Dot
function drawTopDiamond(p3, p4) {
  if (p3 <= 0) return;

  push();
  rectMode(CENTER);
  strokeWeight(20);
  stroke(180, 20, 20);
  noFill();

  translate(230, 310);
  rotate(radians(45));
  let dSize = lerp(0, 140, p3);
  if (dSize > 0) {
    rect(0, 0, dSize, dSize);
  }
  pop();

  if (p4 > 0) {
    push();
    noStroke();
    fill(180, 20, 20, p4 * 255);
    ellipse(230, 310, 45, 45);
    pop();
  }
}

// 3. Exact Isometric S and U Shapes
function drawCubeSU(p5, p6) {
  if (p5 <= 0 && p6 <= 0) return;

  push();
  noStroke();

  // Left Face (S)
  if (p5 > 0) {
    let sYOffset = lerp(300, 0, p5);
    fill(10, 25, 60); // Dark Navy Blue

    // 12-point vector array for perfect solid block 'S'
    let sCoords = [
      [1.0, 0.0],
      [0.0, 0.0],
      [0.0, 0.625],
      [0.75, 0.625],
      [0.75, 0.75],
      [0.0, 0.75],
      [0.0, 1.0],
      [1.0, 1.0],
      [1.0, 0.375],
      [0.25, 0.375],
      [0.25, 0.25],
      [1.0, 0.25]
    ];

    beginShape();
    for (let pt of sCoords) {
      let u = pt[0];
      let v = pt[1];
      let x = 135 + 95 * u;
      let y = (360 + 50 * u) + 150 * v + sYOffset;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  // Right Face (U)
  if (p6 > 0) {
    let uYOffset = lerp(300, 0, p6);
    fill(5, 75, 180); // Royal Blue

    // 8-point vector array for perfect solid block 'U'
    let uCoords = [
      [0.0, 0.0],
      [0.25, 0.0],
      [0.25, 0.75],
      [0.75, 0.75],
      [0.75, 0.0],
      [1.0, 0.0],
      [1.0, 1.0],
      [0.0, 1.0]
    ];

    beginShape();
    for (let pt of uCoords) {
      let u = pt[0];
      let v = pt[1];
      let x = 230 + 95 * u;
      let y = (410 - 50 * u) + 150 * v + uYOffset;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  pop();
}

// 4. Anniversary Typography
function drawTexts(p7) {
  if (p7 <= 0) return;

  push();
  let alpha = p7 * 255;

  fill(10, 25, 60, alpha); 
  textSize(42);
  textStyle(BOLD);
  text("偉大なる平凡人たれ", 730, 70);

  fill(160, 10, 10, alpha); 
  textSize(190);
  textStyle(BOLD);
  text("100", 610, 200);
  
  textSize(95);
  text("th", 815, 235);

  textSize(75);
  text("Anniversary", 730, 345);

  fill(10, 25, 60, alpha);
  textSize(35);
  text("SINCE 1928", 730, 415);

  fill(160, 10, 10, alpha);
  textSize(38);
  text("学校法人大阪産業大学", 730, 475);

  pop();
}
