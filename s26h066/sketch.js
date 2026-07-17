let xRed = -60;
let xBlue = 800;
let yLight = 480;
let x100 = 800;
let xText = 800;
function setup() {
  createCanvas(746, 480);
  textAlign(CENTER, CENTER);
}
function draw() {
  background(255);
  //====================
  // 赤い丸
  //====================
  fill(180,30,30);
  noStroke();
  circle(xRed,90,60);
  if(xRed < 120){
    xRed = xRed + 3;
  }
  //====================
  // 青い丸
  //====================
  fill(20,60,140);
  circle(xBlue,145,60);
  if(xRed >= 120 && xBlue > 185){
    xBlue = xBlue - 3;
  }
  //====================
  // 水色の丸
  //====================
  fill(0,140,220);
  circle(120,yLight,35);
  if(xBlue <= 185 && yLight > 165){
    yLight = yLight - 3;
  }
  //====================
  // ロゴ
  //====================
  if(yLight <= 165){
    strokeWeight(10);
    stroke(180,30,30);
    line(80,230,160,190);
    line(160,190,240,230);
    line(240,230,160,270);
    line(160,270,80,230);
    stroke(20,60,140);
    line(80,280,160,340);
    line(160,340,160,280);
    stroke(0,140,220);
    line(240,280,240,340);
    line(240,340,160,380);
  }
  //====================
  // 100th
  //====================
  if(yLight <= 165){
    fill(180,30,30);
    noStroke();
    if(x100 > 470){
      x100 = x100 - 4;
    }
    textSize(120);
    text("100",x100,220);
    textSize(60);
    text("th",x100+170,220);
  }
  //====================
  // Anniversary
  //====================
  if(x100 <= 470){
    if(xText > 470){
      xText = xText - 4;
    }
    fill(180,30,30);
    textSize(40);
    text("Anniversary",xText,300);
    textSize(28);
    text("SINCE 1928",470,345);
    textSize(32);
    text("学校法人大阪産業大学",470,405);
    fill(20,60,140);
    textSize(30);
    text("偉大なる平凡人たれ",470,80);
  }
}
