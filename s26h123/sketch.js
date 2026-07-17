function setup() {
  createCanvas(746, 480);
  noLoop();

  redCol = color(150, 30, 35);
  blueCol = color(20, 80, 150);
}

let redCol;
let blueCol;

function draw() {
  background(255);

  // ===== 左上の丸 =====
  noStroke();

  fill(redCol);
  circle(105, 95, 60);

  fill(blueCol);
  circle(190, 130, 58);

  fill(blueCol);
  circle(105, 185, 40);

  fill(redCol);
  circle(165, 210, 28);

  // ===== キューブ風マーク =====

  strokeWeight(5);

  // 上面
  stroke(redCol);
  fill(255);
  quad(
    45,210,
    145,175,
    245,210,
    145,245
  );

  // 左面
  stroke(blueCol);
  noFill();
  beginShape();
  vertex(45,210);
  vertex(145,245);
  vertex(145,340);
  vertex(45,305);
  endShape(CLOSE);

  // 右面
  beginShape();
  vertex(245,210);
  vertex(245,305);
  vertex(145,340);
  vertex(145,245);
  endShape(CLOSE);

  line(45,210,145,305);
  line(45,305,110,325);
  line(245,210,245,305);

  // ===== キャッチコピー =====

  noStroke();
  fill(30,60,110);

  textAlign(LEFT);
  textStyle(NORMAL);
  textSize(20);
  text("Create the Future",330,75);

  // ===== 100 =====

  fill(redCol);

  textStyle(BOLD);
  textSize(115);
  text("100",315,215);

  textSize(42);
  text("th",545,190);

  // ===== Anniversary =====

  textSize(48);
  text("Anniversary",315,290);

  // ===== Since =====

  textStyle(NORMAL);
  textSize(24);
  text("SINCE 2026",405,335);

  // ===== 学校名 =====

  textStyle(BOLD);
  textSize(28);
  text("Sample University",315,405);
}
