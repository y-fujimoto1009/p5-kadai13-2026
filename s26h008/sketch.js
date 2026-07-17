let t = 0;

function setup() {
  createCanvas(746, 480);
}

function draw() {
  background(255);
  t++;

  noStroke();

  
  fill(130, 28, 33);
  circle(135, min(100, t * 1.5), 56);

 
  fill(18, 51, 89);
  circle(195, min(155, max(-60, (t - 25) * 1.8)), 46);

 
  fill(0, 84, 145);
  circle(120, min(180, max(-40, (t - 45) * 1.8)), 32);


 
  strokeCap(ROUND);
  strokeJoin(ROUND);

  if (t > 60) {
    stroke(130, 28, 33);
    strokeWeight(11);
    noFill();

    let p = t - 60;
    
    line(155,310, 
         min(220, 155+ p * 2), 
         max(280, 210 - p));
         
    if (p > 32.5) {
      let p2 = p - 32.5;
      line(220, 280, 
           max(155, 220 - p2 * 2), 
           min(238, 208 + p2));
    }
    if (p > 65) {
      let p3 = p - 65;
      line(160, 300, 
           max(90, 155 - p3 * 2), 
           min(268, 238 + p3));
    }
    if (p > 97.5) {
      let p4 = p - 97.5;
      line(90, 268, 
           min(155, 90 + p4 * 2), 
           max(238, 268 - p4));
    }
  }

  if (t > 150) {
    push();
    stroke(255);
    strokeWeight(2.5);
    fill(130, 28, 33);
    let r = min(22, (t - 150) * 0.8);
    circle(172, 235, r);
    pop();
  }

  if (t > 110) {
    stroke(18, 51, 89);
    strokeWeight(12);
    noFill();

    line(90, 280, 140, 350); 
    line(90, 280, 155, 310); 
    line(90, 318, 155, 360); 
  }

  if (t > 140) {
    stroke(0, 84, 145);
    strokeWeight(12);
    noFill();

    line(155, 310, 155, 360); 
    line(155, 360, 220, 330); 
    line(220, 330, 220, 280);
  }


  
  noStroke();

  if (t > 200) {
    fill(18, 51, 89);
    textFont("Georgia, 'Noto Serif JP', serif");
    textStyle(NORMAL);
    textSize(34);
    text("偉大なる平凡人たれ", 310, 95);
  }

  if (t > 215) {
    fill(130, 28, 33);
    textFont("sans-serif");
    textStyle(BOLD);

    textSize(115);
    let x100 = max(310, 480 - (t - 215) * 4);
    text("100", x100, 230);
    
    textSize(54);
    let xth = max(510, 600  - (t - 200) * 4.5);
    text("th", xth, 240);
  }

  if (t > 235) {
    fill(130, 28, 33);
    textStyle(BOLD);
    textSize(46);
    text("Anniversary", 312, 285);
  }

  if (t > 250) {
    fill(130, 28, 33);
    textStyle(BOLD);
    textSize(24);
    text("S I N C E   1 9 2 8", 350, 325);
  }
  
  if (t > 265) {
    fill(130, 28, 33);
    textStyle(BOLD);
    textSize(31);
    text("学校法人大阪産業大学", 300, 375);
  }
}
