let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);
  t++;

  const easeOutQuad = (x) => 1 - (1 - x) * (1 - x);
  const easeOutBack = (x) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };

  noStroke();

  let progressCircle1 = constrain(t / 40, 0, 1);
  let yCircle1 = lerp(-60, 90, easeOutBack(progressCircle1));
  fill(130, 28, 33);
  circle(120, yCircle1, 60);

  let progressCircle2 = constrain((t - 20) / 40, 0, 1);
  let yCircle2 = lerp(-60, 145, easeOutBack(progressCircle2));
  fill(18, 51, 89);
  circle(185, yCircle2, 60);

  let progressCircle3 = constrain((t - 40) / 40, 0, 1);
  let yCircle3 = lerp(-60, 165, easeOutBack(progressCircle3));
  fill(0, 84, 145);
  circle(120, yCircle3, 35);

  strokeWeight(12);

  if (t > 60) {
    stroke(130, 28, 33);
    let amt = easeOutQuad(constrain((t - 60) / 40, 0, 1));

    line(80, 230, lerp(80, 160, amt), lerp(230, 190, amt));
    line(160, 190, lerp(160, 240, amt), lerp(190, 230, amt));
    line(240, 230, lerp(240, 160, amt), lerp(230, 270, amt));
    line(160, 270, lerp(160, 80, amt), lerp(270, 230, amt));
  }

  if (t > 110) {
    stroke(18, 51, 89);
    strokeWeight(12);
    let amtS = easeOutQuad(constrain((t - 110) / 30, 0, 1));
    
    line(80, 250, lerp(80, 155, amtS), lerp(250, 287, amtS));
    line(80, 250, lerp(80, 155, amtS), lerp(250, 350, amtS));
    line(155, 350, lerp(155, 80, amtS), lerp(350, 313, amtS));
  }

  if (t > 140) {
    stroke(0, 84, 145);
    strokeWeight(12);
    let amtU = easeOutQuad(constrain((t - 140) / 30, 0, 1));

    line(170, 350, 170, lerp(350, 287, amtU));
    line(170, 350, lerp(170, 240, amtU), lerp(350, 313, amtU));
    line(240, 313, 240, lerp(313, 250, amtU));
  }

  if (t > 160) {
    strokeWeight(3);
    stroke(255, 255, 255);
    fill(130, 28, 33);

    let progressCenter = constrain((t - 160) / 25, 0, 1);
    let dCenter = lerp(0, 30, easeOutBack(progressCenter));
    
    circle(175, 215, dCenter);
    strokeWeight(8);
    noStroke();
  }

  if (t > 200) {
    let amt = easeOutQuad(constrain((t - 200) / 40, 0, 1));
    fill(20, 50, 90, amt * 255);
    textSize(32);
    text("偉大なる平凡人たれ", 310, lerp(95, 90, amt));
  }

  if (t > 220) {
    fill(130, 28, 33);
    let amt = easeOutQuad(constrain((t - 220) / 40, 0, 1));

    textSize(120);
    text("100", lerp(200, 330, amt), 220);

    textSize(60);
    text("th", lerp(410, 540, amt), 220);
  }

  if (t > 250) {
    let amt = easeOutQuad(constrain((t - 250) / 40, 0, 1));
    fill(130, 28, 33, amt * 255);
    textSize(42);
    text("Anniversary", 330, lerp(305, 300, amt));
  }

  if (t > 270) {
    let amt = easeOutQuad(constrain((t - 270) / 40, 0, 1));
    fill(130, 28, 33, amt * 255);
    textSize(28);
    text("SINCE 1928", 390, lerp(345, 340, amt));
  }

  if (t > 290) {
    let amt = easeOutQuad(constrain((t - 290) / 40, 0, 1));
    fill(20, 50, 90, amt * 255);
    textSize(32);
    text("学校法人大阪産業大学", 300, lerp(405, 400, amt));
  }
}
