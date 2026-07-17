let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);

  t++;

  noStroke();

  fill(130, 28, 33);
  circle(120, min(90, t), 60);

  fill(18, 51, 89);
  circle(185, min(145, max(0, t - 30)), 60);

  fill(0, 84, 145);
  circle(120, min(165, max(0, t - 50)), 35);

  strokeWeight(12);

  if (t > 60) {
    stroke(130, 28, 33);
    line(80, 230, min(160, 80 + (t - 60) * 2), max(190, 230 - (t - 60)));
    line(160, 190, min(240, 160 + (t - 60) * 2), min(230, 190 + (t - 60)));
    line(240, 230, max(160, 240 - (t - 60) * 2), min(270, 230 + (t - 60)));
    line(160, 270, max(80, 160 - (t - 60) * 2), max(230, 270 - (t - 60)));
  }

  if (t > 120) {
    stroke(18, 51, 89);
    strokeWeight(12);
    line(80, 250, 155, 287);
    line(80, 250, 155, 350);
    line(155, 350, 80, (350 - 37));
  }

  if (t > 150) {
    stroke(0, 84, 145);
    strokeWeight(12);
    line(170, 350, 170, 287);
    line(170, 350, 240, (350 - 37));
    line(240, (350 - 37), 240, 250);
  }

  if (t > 50) {
    strokeWeight(3);
    stroke(255, 255, 255);
    fill(130, 28, 33);
    circle(175, 215, min(30, max(0, t - 150)));
    strokeWeight(8);
    noStroke();
  }

  if (t > 210) {
    fill(20, 50, 90);
    textSize(32);
    text("偉大なる平凡人たれ", max(310, 600 - (t - 210) * 4), 90);
  }

  if (t > 230) {
    fill(130, 28, 33);
    textSize(min(120, (t - 230) * 3));
    text("100", 330, 220);
  }

  if (t > 250) {
    fill(130, 28, 33);
    textSize(min(60, (t - 250) * 3));
    text("th", 540, 220);
  }

  if (t > 270) {
    fill(18, 51, 89);
    textSize(42);
    text("Anniversary", 330, max(300, 400 - (t - 270) * 2));
  }

  if (t > 290) {
    fill(0, 84, 145);
    textSize(28);
    text("SINCE 1928", 390, max(340, 440 - (t - 290) * 2));
  }

  if (t > 310) {
    fill(20, 50, 90);
    textSize(32);
    text("学校法人大阪産業大学", max(300, 600 - (t - 310) * 4), 400);
  }
}
