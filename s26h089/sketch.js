let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);

  t++;

  let i1 = max(0, 200 - t * 3); 


  // "O"
  strokeWeight(12);
  stroke(130, 28, 33);
  strokeCap(ROUND);

  line(80,  230 + i1, 160, 190 + i1);
  line(160, 190 + i1, 240, 230 + i1);
  line(240, 230 + i1, 160, 270 + i1);
  line(160, 270 + i1, 80,  230 + i1);

  // "S"
  stroke(18, 51, 89);
  line(80,  250 + i1, 155, 287 + i1);
  line(80,  250 + i1, 155, 350 + i1);
  line(155, 350 + i1, 80,  313 + i1);

  // "U"
  stroke(0, 84, 145);
  line(170, 350 + i1, 170, 287 + i1);
  line(170, 350 + i1, 240, 313 + i1);
  line(240, 313 + i1, 240, 250 + i1);


  let i2 = 0;
  
  if (t > 75) {
    i2 = t - 75;
  }

  noStroke();

  if (t > 75) {
    let circle1_Y = max(90, 190 - i2 * 4);
    fill(130, 28, 33);
    circle(120, circle1_Y, 60);

    let circle2_Y = max(145, 190 - max(0, i2 - 15) * 4);
    fill(18, 51, 89);
    circle(185, circle2_Y, 60);

    let circle3_Y = max(165, 190 - max(0, i2 - 30) * 4);
    fill(0, 84, 145);
    circle(120, circle3_Y, 35);
  }


  if (t > 120) {
    strokeWeight(3);
    stroke(255, 255, 255);
    fill(130, 28, 33);
    
    let circleCenter_Size = min(30, (t - 120) * 2);
    circle(175, 215, circleCenter_Size);
    
    noStroke();
  }

  if (t > 150) {
    let textAlpha = min(255, (t - 150) * 5);

    // 偉大なる平凡人たれ
    fill(20, 50, 90, textAlpha);
    textSize(32);
    text("偉大なる平凡人たれ", 310, 90);

    // 100th
    fill(130, 28, 33, textAlpha);
    textSize(120);
    text("100", 330, 220);
    textSize(60);
    text("th", 540, 220);

    // Anniversary
    fill(130, 28, 33, textAlpha);
    textSize(42);
    text("Anniversary", 330, 300);

    // Since
    fill(130, 28, 33, textAlpha);
    textSize(28);
    text("SINCE 1928", 390, 340);

    // 学校名
    fill(20, 50, 90, textAlpha);
    textSize(32);
    text("学校法人大阪産業大学", 300, 400);
  }
}
