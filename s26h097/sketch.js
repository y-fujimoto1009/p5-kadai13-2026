let cMaroon, cNavy, cBlue;

function setup() {

  createCanvas(746, 480);
  
  cMaroon = color(141, 33, 37);  
  cNavy = color(13, 50, 91);     
  cBlue = color(0, 102, 168);    
}

function draw() {

  background(255);
  let t = frameCount;
  
  let baseAlpha = map(t, 0, 60, 0, 255, true);
  
  push();
  translate(190, 310); 
  strokeWeight(7);
  strokeJoin(ROUND);
  noFill();
  
  stroke(141, 33, 37, baseAlpha);
  quad(0, -30, 65, 0, 0, 30, -65, 0);
  
  stroke(13, 50, 91, baseAlpha);
  beginShape();
  vertex(-65, 0);
  vertex(-65, 45);
  vertex(0, 75);
  vertex(0, 35);
  vertex(-35, 18);
  endShape();
  
  stroke(0, 102, 168, baseAlpha);
  beginShape();
  vertex(65, 0);
  vertex(65, 45);
  vertex(0, 75);
  vertex(0, 35);
  endShape();
  
  noStroke();
  fill(141, 33, 37, baseAlpha);
  ellipse(0, 0, 16, 16);
  pop();
  
  let b1_target = { x: 140, y: 160 };
  let b2_target = { x: 230, y: 210 };
  let b3_target = { x: 130, y: 245 };
  
  let progress = map(t, 15, 80, 0, 1, true);
  let easeProgress = 1 - pow(1 - progress, 3); 
  
  let float1 = (t > 80) ? sin((t - 80) * 0.05) * 6 : 0;
  let float2 = (t > 80) ? sin((t - 80) * 0.07) * -5 : 0;
  let float3 = (t > 80) ? sin((t - 80) * 0.06) * 4 : 0;
  
  noStroke();
  
  let b1y = lerp(-50, b1_target.y, easeProgress) + float1;
  fill(cMaroon);
  ellipse(b1_target.x, b1y, 56, 56);
  
  let b2y = lerp(-50, b2_target.y, easeProgress) + float2;
  fill(cNavy);
  ellipse(b2_target.x, b2y, 42, 42);
  
  let b3y = lerp(-50, b3_target.y, easeProgress) + float3;
  fill(cBlue);
  ellipse(b3_target.x, b3y, 24, 24);
  
  let textAlpha = map(t, 40, 110, 0, 255, true);
  
  push();
  textAlign(LEFT, BASELINE);
  
  fill(13, 50, 91, textAlpha);
  textFont('sans-serif', 23);
  text('偉大なる平凡人たれ', 340, 135);
  
  fill(141, 33, 37, textAlpha);
  textFont('Arial', 105);
  textStyle(BOLD);
  text('100', 335, 245);
  
  let thX = 335 + textWidth('100') - 5;
  textFont('Arial', 45);
  text('th', thX, 205);
  
  textFont('Arial', 38);
  textStyle(BOLD);
  text('Anniversary', 340, 292);
  
  textFont('Arial', 21);
  textStyle(BOLD);
  text('S I N C E   1 9 2 8', 430, 332);
  
  textFont('Arial', 25);
  textStyle(BOLD);
  text('学校法人大阪産業大学', 340, 375);
  
  pop();
}
