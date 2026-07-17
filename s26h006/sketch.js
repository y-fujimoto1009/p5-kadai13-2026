let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);
  t += 0.5; // Fast time progression for high-velocity reveals

  // Helper function for smooth opacity and rotational interpolation
  function getFadeProgress(startTime, duration = 15) {
    let elapsed = t - startTime;
    if (elapsed <= 0) return 0;
    if (elapsed >= duration) return 1;
    let p = elapsed / duration;
    // Quintic ease-out for ultra-smooth decelerating lock-in
    return 1 - Math.pow(1 - p, 5);
  }

  //--------------------------------------------------------
  // 1. Top Graphic Floating Circles (Fade & Spin Orbit)
  //--------------------------------------------------------
  noStroke();

  // Red Circle
  let p1 = getFadeProgress(0);
  if (p1 > 0) {
    push();
    translate(120, 90);
    rotate(lerp(-HALF_PI, 0, p1));
    fill(130, 28, 33, p1 * 255);
    circle(0, 0, 60);
    pop();
  }

  // Dark Blue Circle
  let p2 = getFadeProgress(6);
  if (p2 > 0) {
    push();
    translate(185, 145);
    rotate(lerp(HALF_PI, 0, p2));
    fill(18, 51, 89, p2 * 255);
    circle(0, 0, 60);
    pop();
  }

  // Light Blue Circle
  let p3 = getFadeProgress(12);
  if (p3 > 0) {
    push();
    translate(120, 165);
    rotate(lerp(-PI, 0, p3));
    fill(0, 84, 145, p3 * 255);
    circle(0, 0, 35);
    pop();
  }

  //--------------------------------------------------------
  // 2. Main Logo Box Structure (Unfolding Rotations)
  //--------------------------------------------------------
  strokeWeight(12);

  // Red Top Diamond Rim
  let pBox = getFadeProgress(18);
  if (pBox > 0) {
    push();
    translate(160, 230);
    rotate(lerp(QUARTER_PI, 0, pBox));
    stroke(130, 28, 33, pBox * 255);
    line(-80, 0, 0, -40);
    line(0, -40, 80, 0);
    line(80, 0, 0, 40);
    line(0, 40, -80, 0);
    pop();
  }

  // Blue Side "S"
  let pSideS = getFadeProgress(24);
  if (pSideS > 0) {
    push();
    translate(117, 298);
    rotate(lerp(-QUARTER_PI, 0, pSideS));
    stroke(18, 51, 89, pSideS * 255);
    line(-37, -48, 38, -11);
    line(-37, -48, 38, 52);
    line(38, 52, -37, 15);
    pop();
  }

  // Dark Blue Side "U"
  let pSideU = getFadeProgress(30);
  if (pSideU > 0) {
    push();
    translate(205, 298);
    rotate(lerp(QUARTER_PI, 0, pSideU));
    stroke(0, 84, 145, pSideU * 255);
    line(-35, 52, -35, -11);
    line(-35, 52, 35, 15);
    line(35, 15, 35, -48);
    pop();
  }

  // Central Red Seed Circle
  let pCenterCircle = getFadeProgress(36);
  if (pCenterCircle > 0) {
    push();
    translate(175, 215);
    scale(pCenterCircle);
    strokeWeight(3);
    stroke(255, pCenterCircle * 255);
    fill(130, 28, 33, pCenterCircle * 255);
    circle(0, 0, 30);
    pop();
  }

  //--------------------------------------------------------
  // 3. Typography Sections (Upward Tilt & Gentle Fade Sweep)
  //--------------------------------------------------------
  noStroke();

  // Catchphrase: "偉大なる平凡人たれ"
  let pText1 = getFadeProgress(42);
  if (pText1 > 0) {
    push();
    let yOff = lerp(15, 0, pText1);
    translate(310, 90 + yOff);
    fill(20, 50, 90, pText1 * 255);
    textSize(32);
    text("偉大なる平凡人たれ", 0, 0);
    pop();
  }

  // Main "100th" Heading
  let pText2 = getFadeProgress(48);
  if (pText2 > 0) {
    push();
    let yOff = lerp(20, 0, pText2);
    translate(330, 220 + yOff);
    fill(130, 28, 33, pText2 * 255);
    textSize(120);
    text("100", 0, 0);
    textSize(60);
    text("th", 210, 0);
    pop();
  }

  // "Anniversary" Text
  let pText3 = getFadeProgress(54);
  if (pText3 > 0) {
    push();
    let yOff = lerp(15, 0, pText3);
    translate(330, 300 + yOff);
    fill(130, 28, 33, pText3 * 255);
    textSize(42);
    text("Anniversary", 0, 0);
    pop();
  }

  // "SINCE 1928" Text
  let pText4 = getFadeProgress(60);
  if (pText4 > 0) {
    push();
    let yOff = lerp(15, 0, pText4);
    translate(390, 340 + yOff);
    fill(130, 28, 33, pText4 * 255);
    textSize(28);
    text("SINCE 1928", 0, 0);
    pop();
  }

  // University Name: "学校法人大阪産業大学"
  let pText5 = getFadeProgress(66);
  if (pText5 > 0) {
    push();
    let yOff = lerp(15, 0, pText5);
    translate(300, 400 + yOff);
    fill(130, 28, 33, pText5 * 255);
    textSize(32);
    text("学校法人大阪産業大学", 0, 0);
    pop();
  }
}
