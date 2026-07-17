let frame = 0;

let redColor;
let darkBlue;
let lightBlue;

function setup() {
  createCanvas(746, 480);

  redColor = color(132, 39, 43);
  darkBlue = color(31, 56, 96);
  lightBlue = color(62, 99, 154);

  textAlign(CENTER, CENTER);
  strokeJoin(MITER);
  angleMode(RADIANS);
}

function draw() {
  background(255);

  frame++;

  let time = frame % 720;

  let boxProgress =
    constrain(map(time, 0, 150, 0, 1), 0, 1);

  let circle1Progress =
    constrain(map(time, 160, 225, 0, 1), 0, 1);

  let circle2Progress =
    constrain(map(time, 195, 260, 0, 1), 0, 1);

  let circle3Progress =
    constrain(map(time, 230, 295, 0, 1), 0, 1);

  let messageProgress =
    constrain(map(time, 300, 380, 0, 1), 0, 1);

  let numberProgress =
    constrain(map(time, 350, 450, 0, 1), 0, 1);

  let anniversaryProgress =
    constrain(map(time, 390, 490, 0, 1), 0, 1);

  let sinceProgress =
    constrain(map(time, 470, 540, 0, 1), 0, 1);

  let schoolProgress =
    constrain(map(time, 515, 590, 0, 1), 0, 1);

  boxProgress = easeOut(boxProgress);

  circle1Progress = easeOutBack(circle1Progress);
  circle2Progress = easeOutBack(circle2Progress);
  circle3Progress = easeOutBack(circle3Progress);

  messageProgress = easeOut(messageProgress);
  numberProgress = easeOut(numberProgress);
  anniversaryProgress = easeOut(anniversaryProgress);
  sinceProgress = easeOut(sinceProgress);
  schoolProgress = easeOut(schoolProgress);

  drawRollingOSUBox(boxProgress);

  if (time >= 150) {
    drawThreeCircles(
      circle1Progress,
      circle2Progress,
      circle3Progress
    );
  }

  drawTopMessage(messageProgress);
  draw100Text(numberProgress);
  drawAnniversaryText(anniversaryProgress);
  drawSinceText(sinceProgress);
  drawSchoolText(schoolProgress);
}

function drawRollingOSUBox(progress) {
  push();

  let x = lerp(-220, 225, progress);
  let y = 305;

  let jumpY =
    -sin(progress * PI) * 18;

  translate(x, y + jumpY);

  let rotationAngle =
    lerp(-TWO_PI * 2, 0, progress);

  rotate(rotationAngle);

  let logoScale =
    lerp(0.72, 1, progress);

  scale(logoScale);

  drawOSUBox();

  pop();
}

function drawOSUBox() {
  noStroke();

  // O
  fill(redColor);

  beginShape();
  vertex(-110, -65);
  vertex(-5, -120);
  vertex(105, -68);
  vertex(-5, -10);
  endShape(CLOSE);

  fill(255);

  beginShape();
  vertex(-73, -65);
  vertex(-5, -99);
  vertex(69, -67);
  vertex(-5, -29);
  endShape(CLOSE);

  fill(redColor);
  ellipse(7, -68, 37, 37);


  // S
  fill(darkBlue);

  beginShape();
  vertex(-110, -48);
  vertex(-31, -5);
  vertex(-31, 18);
  vertex(-82, -10);
  vertex(-22, 65);
  vertex(-7, 82);
  vertex(-7, 112);
  vertex(-110, 58);
  vertex(-110, 36);
  vertex(-45, 70);
  vertex(-94, 9);
  vertex(-110, 0);
  endShape(CLOSE);


  // U 左側
  fill(lightBlue);

  beginShape();
  vertex(7, 16);
  vertex(30, 4);
  vertex(30, 78);
  vertex(7, 90);
  endShape(CLOSE);


  // U 右側
  beginShape();
  vertex(82, -35);
  vertex(105, -47);
  vertex(105, 58);
  vertex(82, 70);
  endShape(CLOSE);


  // U 下側
  beginShape();
  vertex(30, 78);
  vertex(82, 51);
  vertex(82, 70);
  vertex(30, 98);
  endShape(CLOSE);
}

function drawThreeCircles(p1, p2, p3) {
  let startX = 225;
  let startY = 245;

  drawBubble(
    startX,
    startY,
    205,
    88,
    55,
    redColor,
    p1
  );

  drawBubble(
    startX,
    startY,
    203,
    150,
    31,
    lightBlue,
    p2
  );

  drawBubble(
    startX,
    startY,
    270,
    124,
    50,
    darkBlue,
    p3
  );
}

function drawBubble(
  startX,
  startY,
  endX,
  endY,
  finalSize,
  bubbleColor,
  progress
) {
  if (progress <= 0) {
    return;
  }

  let x =
    lerp(startX, endX, progress);

  let y =
    lerp(startY, endY, progress);

  x +=
    sin(progress * PI) * 16;

  let currentSize =
    finalSize * progress;

  push();

  translate(x, y);

  let stretch =
    1 +
    sin(progress * TWO_PI) * 0.1;

  scale(
    1 / stretch,
    stretch
  );

  noStroke();
  fill(bubbleColor);

  ellipse(
    0,
    0,
    currentSize,
    currentSize
  );

  pop();
}

function drawTopMessage(progress) {
  if (progress <= 0) {
    return;
  }

  push();

  let y =
    lerp(70, 105, progress);

  let shakeX =
    sin(progress * PI * 3) *
    8 *
    (1 - progress);

  noStroke();

  fill(
    red(darkBlue),
    green(darkBlue),
    blue(darkBlue),
    255 * progress
  );

  textStyle(NORMAL);
  textSize(21);

  text(
    "偉大なる平凡人たれ",
    515 + shakeX,
    y
  );

  pop();
}

function draw100Text(progress) {
  if (progress <= 0) {
    return;
  }

  push();

  let x =
    lerp(
      width + 220,
      505,
      progress
    );

  let y = 195;

  translate(x, y);

  let rotationAngle =
    lerp(
      TWO_PI * 2,
      0,
      progress
    );

  rotate(rotationAngle);

  noStroke();

  fill(
    red(redColor),
    green(redColor),
    blue(redColor),
    255 * progress
  );

  textStyle(BOLD);

  textSize(95);
  text("100", 0, 0);

  textSize(31);
  text("th", 110, 20);

  pop();
}

function drawAnniversaryText(progress) {
  if (progress <= 0) {
    return;
  }

  push();

  let x =
    lerp(
      width + 260,
      515,
      progress
    );

  let y = 275;

  translate(x, y);

  let rotationAngle =
    lerp(
      -TWO_PI * 1.5,
      0,
      progress
    );

  rotate(rotationAngle);

  noStroke();

  fill(
    red(redColor),
    green(redColor),
    blue(redColor),
    255 * progress
  );

  textStyle(BOLD);
  textSize(35);

  text(
    "Anniversary",
    0,
    0
  );

  pop();
}

function drawSinceText(progress) {
  if (progress <= 0) {
    return;
  }

  push();

  let y =
    lerp(
      355,
      320,
      progress
    );

  let x =
    515 +
    sin(progress * PI * 3) *
    12 *
    (1 - progress);

  noStroke();

  fill(
    red(redColor),
    green(redColor),
    blue(redColor),
    255 * progress
  );

  textStyle(BOLD);
  textSize(20);

  text(
    "SINCE 1928",
    x,
    y
  );

  pop();
}

function drawSchoolText(progress) {
  if (progress <= 0) {
    return;
  }

  push();

  let y =
    lerp(
      410,
      370,
      progress
    );

  noStroke();

  fill(
    red(redColor),
    green(redColor),
    blue(redColor),
    255 * progress
  );

  textStyle(NORMAL);
  textSize(18);

  text(
    "学校法人大阪産業大学",
    515,
    y
  );

  pop();
}

function easeOut(x) {
  return 1 - pow(1 - x, 3);
}

function easeOutBack(x) {
  let c1 = 1.70158;
  let c3 = c1 + 1;

  return 1 +
    c3 * pow(x - 1, 3) +
    c1 * pow(x - 1, 2);
}
