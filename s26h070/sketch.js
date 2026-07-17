let t = 0;

function setup() {
  createCanvas(746, 480);
}

function draw() {
  background(255);
  t += 0.03;

  let colorMaroon = color(130, 28, 33);
  let colorBlue = color(0, 64, 152);
  let colorNavy = color(22, 56, 89);

  noStroke();
  textAlign(LEFT, BASELINE);
  
  fill(colorNavy);
  textSize(22);
  textStyle(BOLD);
  text("偉大なる平凡人たれ", 370, 150);
  
  fill(colorMaroon);
  textSize(110);
  text("100", 360, 260);
  textSize(45);
  text("th", 560, 210);
  
  textSize(42);
  text("Anniversary", 370, 315);
  
  textSize(22);
  text("SINCE 1928", 430, 350);
  
  fill(colorMaroon);
  textSize(24);
  text("学校法人大阪産業大学", 370, 395);

  let x = 180;
  let y = 190;
  let xP= 180;
  let yP= 300;
  let s = 85;
  let dy1 = 45;
  let dy2 = 90;
  let h = 95;
  
  push();
  translate(xP,yP);
  fill(colorMaroon);
  beginShape();
  vertex(0, -125);      
  vertex(100, -75);     
  vertex(100, -65);     
  vertex(0, -15);       
  vertex(-100, -65);    
  vertex(-100, -75);    
  beginContour();
  vertex(0, -100);      
  vertex(-60, -70);     
  vertex(0, -40);       
  vertex(60, -70);      
  endContour();
  endShape(CLOSE);  
  fill(255);
  ellipse(18, -90, 30, 30); 
  pop();

  // "S" 
  push();
  translate(xP,yP);
  fill(colorNavy);
  beginShape(); vertex(-10, -10); vertex(-100, -55); vertex(-100, -30); vertex(-10, 15); endShape(CLOSE);
  beginShape(); vertex(-100, -55); vertex(-10, 62.5); vertex(-10, 87.5); vertex(-100, -30); endShape(CLOSE);
  beginShape(); vertex(-10, 62.5); vertex(-100, 17.5); vertex(-100, 42.5); vertex(-10, 87.5); endShape(CLOSE);
pop();

  push();
  translate(xP,yP);
  fill(colorBlue);
  beginShape(); vertex(10, -10); vertex(36, -23); vertex(36, 49.5); vertex(10, 62.5); endShape(CLOSE);
  beginShape(); vertex(10, 62.5); vertex(100, 17.5); vertex(100, 42.5); vertex(10, 87.5); endShape(CLOSE);
  beginShape(); vertex(74, -42); vertex(100, -55); vertex(100, 17.5); vertex(74, 30.5); endShape(CLOSE);

  pop();
  noStroke();
  
  let float1 = sin(t) * 10;
  let float2 = cos(t * 0.8) * 15;
  let float3 = sin(t * 1.2) * 12;
  let float4 = cos(t * 1.5) * 8;
  
  fill(colorMaroon);
  circle(x + 20, y + 10 + float1, 24);
  
  fill(colorBlue);
  circle(x - 45, y - 45 + float2, 40);
  
  fill(colorNavy);
  circle(x + 55, y - 65 + float3, 58);
  
  fill(colorMaroon);
  circle(x - 25, y - 110 + float4, 75);
  fill(colorMaroon);
  circle(x - 25, y - 110 + float4, 75);

}
