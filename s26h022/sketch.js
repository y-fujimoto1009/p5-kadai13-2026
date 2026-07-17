let t = 0;

function setup() {
  createCanvas(746, 480);
}

function draw() {
  background(255);
  
  let p = constrain(t / 100, 0, 1);
  let ease = p * p * (3 - 2 * p);

  push();
  translate(180, 240);
  scale(ease);

  noStroke();
  fill(130, 28, 33);
  circle(-35, -35, 60);
  circle(35, -35, 60);
  fill(0, 50, 100);
  circle(0, 35, 60);
  
  rectMode(CENTER);
  fill(0, 50, 100);
  rect(0, 0, 80, 80, 15);
  
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  textStyle(BOLD);
  text("SU", 0, 0);
  pop();

  push();
  translate(300, 240);
  fill(130, 28, 33, map(ease, 0, 1, 0, 255));
  textAlign(LEFT, CENTER);
  
  textSize(60);
  textStyle(BOLD);
  text("100", 0, -20);
  
  textSize(30);
  text("th Anniversary", 110, -15);
  
  textSize(24);
  textStyle(NORMAL);
  text("学校法人大阪産業大学", 0, 30);
  pop();
  
  if (t < 100) t++;
}
