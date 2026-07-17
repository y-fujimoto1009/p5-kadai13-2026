let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);

  t++;

  noStroke();

  let p1 = constrain((t - 5) / 35, 0, 1);
  let y1 = lerp(-40, 90, p1);

  if (t > 40 && t < 55) {
    y1 = 90 - sin(map(t, 40, 55, 0, PI)) * 8;
  }

  fill(130, 28, 33);
  circle(120, y1, 60);

  let p2 = constrain((t - 25) / 35, 0, 1);
  let y2 = lerp(-40, 145, p2);

  if (t > 60 && t < 75) {
    y2 = 145 - sin(map(t, 60, 75, 0, PI)) * 8;
  }

  fill(18, 51, 89);
  circle(185, y2, 60);

  let p3 = constrain((t - 45) / 30, 0, 1);
  let y3 = lerp(-30, 165, p3);

  if (t > 75 && t < 90) {
    y3 = 165 - sin(map(t, 75, 90, 0, PI)) * 6;
  }

  fill(0, 84, 145);
  circle(120, y3, 35);

  strokeWeight(12);

  drawMovingLine(80, 230, 160, 190, 70, 20, 130, 28, 33);
  drawMovingLine(160, 190, 240, 230, 90, 20, 130, 28, 33);
  drawMovingLine(240, 230, 160, 270, 110, 20, 130, 28, 33);
  drawMovingLine(160, 270, 80, 230, 130, 20, 130, 28, 33);

  drawMovingLine(80, 250, 155, 287, 155, 18, 18, 51, 89);
  drawMovingLine(80, 250, 155, 350, 173, 22, 18, 51, 89);
  drawMovingLine(155, 350, 80, 313, 195, 18, 18, 51, 89);

  drawMovingLine(170, 350, 170, 287, 210, 18, 0, 84, 145);
  drawMovingLine(170, 350, 240, 313, 228, 20, 0, 84, 145);
  drawMovingLine(240, 313, 240, 250, 248, 18, 0, 84, 145);

  if (t > 145) {
    let p = constrain((t - 145) / 20, 0, 1);
    let circleSize = 30 * p + sin(p * PI) * 6;

    noStroke();
    fill(130, 28, 33);
    circle(175, 215, circleSize);
  }

  if (t > 270) {
    let alphaP = constrain((t - 270) / 20, 0, 1);
    let x = bounceTextX(270, 760, 310);

    noStroke();
    fill(20, 50, 90, 255 * alphaP);
    textSize(32);
    text("偉大なる平凡人たれ", x, 90);
  }

  if (t > 290) {
    let alphaP = constrain((t - 290) / 20, 0, 1);
    let x = bounceTextX(290, 760, 330);

    noStroke();
    fill(130, 28, 33, 255 * alphaP);
    textSize(120);
    text("100", x, 220);
  }

  if (t > 310) {
    let alphaP = constrain((t - 310) / 20, 0, 1);
    let x = bounceTextX(310, 760, 540);

    noStroke();
    fill(130, 28, 33, 255 * alphaP);
    textSize(60);
    text("th", x, 220);
  }

  if (t > 330) {
    let alphaP = constrain((t - 330) / 20, 0, 1);
    let x = bounceTextX(330, 760, 330);

    noStroke();
    fill(130, 28, 33, 255 * alphaP);
    textSize(42);
    text("Anniversary", x, 300);
  }

  if (t > 350) {
    let alphaP = constrain((t - 350) / 20, 0, 1);
    let x = bounceTextX(350, 760, 390);

    noStroke();
    fill(18, 51, 89, 255 * alphaP);
    textSize(28);
    text("SINCE 1928", x, 340);
  }

  if (t > 370) {
    let alphaP = constrain((t - 370) / 20, 0, 1);
    let x = bounceTextX(370, 760, 300);

    noStroke();
    fill(18, 51, 89, 255 * alphaP);
    textSize(32);
    text("学校法人大阪産業大学", x, 400);
  }
}

function drawMovingLine(
  x1, y1,
  x2, y2,
  startTime,
  duration,
  r, g, b
) {
  if (t > startTime) {
    let p = constrain(
      (t - startTime) / duration,
      0,
      1
    );

    let nowX = lerp(x1, x2, p);
    let nowY = lerp(y1, y2, p);

    stroke(r, g, b);
    strokeWeight(12);

    line(
      x1,
      y1,
      nowX,
      nowY
    );
  }
}

function bounceTextX(
  startTime,
  startX,
  endX
) {
  let moveTime = 30;
  let firstBounceTime = 8;
  let secondBounceTime = 7;
  let finalTime = 6;

  let leftSize = 50;
  let rightSize = 22;
  let secondLeftSize = 8;

  if (t < startTime) {
    return startX;
  }

  if (t < startTime + moveTime) {
    let p = (t - startTime) / moveTime;

    return lerp(
      startX,
      endX - leftSize,
      p
    );
  }

  if (
    t <
    startTime +
    moveTime +
    firstBounceTime
  ) {
    let p =
      (
        t -
        startTime -
        moveTime
      ) /
      firstBounceTime;

    return lerp(
      endX - leftSize,
      endX + rightSize,
      p
    );
  }

  if (
    t <
    startTime +
    moveTime +
    firstBounceTime +
    secondBounceTime
  ) {
    let p =
      (
        t -
        startTime -
        moveTime -
        firstBounceTime
      ) /
      secondBounceTime;

    return lerp(
      endX + rightSize,
      endX - secondLeftSize,
      p
    );
  }

  if (
    t <
    startTime +
    moveTime +
    firstBounceTime +
    secondBounceTime +
    finalTime
  ) {
    let p =
      (
        t -
        startTime -
        moveTime -
        firstBounceTime -
        secondBounceTime
      ) /
      finalTime;

    return lerp(
      endX - secondLeftSize,
      endX,
      p
    );
  }

  return endX;
}

function mousePressed() {
  t = 0;
}
