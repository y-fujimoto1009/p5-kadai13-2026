let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);

  t++;

  noStroke();

  if (t > 10) {
    fill(130, 28, 33);
    let s1 = min(60, (t - 10) * 3);
    circle(120, 90, s1);
  }

  if (t > 25) {
    fill(18, 51, 89);
    let s2 = min(60, (t - 25) * 3);
    circle(185, 145, s2);
  }

  if (t > 40) {
    fill(0, 84, 145);
    let s3 = min(35, (t - 40) * 2);
    circle(120, 165, s3);
  }

  strokeWeight(12);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  if (t > 60) {
    stroke(18, 51, 89);
    let offsetY1 = max(0, 100 - (t - 60) * 5);
    line(80, 250 + offsetY1, 155, 287 + offsetY1);
    line(80, 250 + offsetY1, 155, 350 + offsetY1);
    line(155, 350 + offsetY1, 80, 313 + offsetY1);
  }

  if (t > 75) {
    stroke(0, 84, 145);
    let offsetY2 = max(0, 100 - (t - 75) * 5);
    
    line(170, 350 + offsetY2, 170, 287 + offsetY2);
    line(170, 350 + offsetY2, 240, 313 + offsetY2);
    line(240, 313 + offsetY2, 240, 250 + offsetY2);
  }

  if (t > 90) {
    stroke(130, 28, 33);
    let frameY = min(230, -100 + (t - 90) * 10);
    
    line(80, frameY, 160, frameY - 40);
    line(160, frameY - 40, 240, frameY);
    line(240, frameY, 160, frameY + 40);
    line(160, frameY + 40, 80, frameY);
  }

  if (t > 110) {
    noStroke();
    fill(130, 28, 33);
    let rSize = min(24, (t - 110) * 1.5);
    circle(175, 215, rSize);
  }

  noStroke();

  if (t > 130) {
    fill(18, 51, 89);
    textSize(32);
    textStyle(BOLD);
    let textY1 = max(90, 120 - (t - 130) * 2);
    text("偉大なる平凡人たれ", 310, textY1);
  }

  if (t > 150) {
    fill(130, 28, 33);
    textStyle(BOLD);
    let textY2 = max(220, 250 - (t - 150) * 2);

    textSize(120);
    text("100", 330, textY2);

    textSize(60);
    text("th", 540, textY2);
  }

  if (t > 170) {
    fill(130, 28, 33);
    textSize(42);
    textStyle(BOLD);
    let textY3 = max(300, 330 - (t - 170) * 2);
    text("Anniversary", 330, textY3);
  }

  if (t > 185) {
    fill(130, 28, 33);
    textSize(28);
    textStyle(BOLD);
    let textY4 = max(340, 370 - (t - 185) * 2);
    text("SINCE 1928", 390, textY4);
  }

  if (t > 200) {
    fill(130, 28, 33);
    textSize(32);
    textStyle(BOLD);
    let textY5 = max(400, 430 - (t - 200) * 2);
    text("学校法人大阪産業大学", 300, textY5);
  }
}
