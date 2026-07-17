let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("Arial");
}
function draw() {

  background(255);

  t++;
  
//O//
if(t > 0){

  let oy = min(-120 + t * 5, 215);

  stroke(130,28,33);
  strokeWeight(12);
  noFill();

  line(60,oy,155,oy-45);
  line(155,oy-45,250,oy);
  line(250,oy,155,oy+45);
  line(155,oy+45,60,oy);

}
//S//
if(t > 40){

  let sx = min(-180 + (t-40)*5,0);

  stroke(18,51,89);
  strokeWeight(12);

  line(70+sx,245,165+sx,285);
  line(70+sx,245,160+sx,355);
  line(160+sx,355,80+sx,320);
}
//U//
if(t > 80){

  let ux = max(200-(t-80)*5,0);

  stroke(0,84,145);
  strokeWeight(12);

  line(170+ux,280,170+ux,360);
  line(170+ux,360,255+ux,315);
  line(255+ux,315,255+ux,235);

}
//CIRCLES//
noStroke();

if(t>120){
  fill(130,28,33);
  circle(120,90,60);
}

if(t>130){
  fill(18,51,89);
  circle(185,145,60);
}

if(t>140){
  fill(0,84,145);
  circle(120,165,35);
}

if(t>150){
  fill(130,28,33);
  circle(175,215,30);
}
//TEXT//
let a = min((t-160)*5,255);

fill(18,51,89,a);

textSize(18);
text("偉大なる平凡人たれ",360,60);

fill(130,28,33,a);

textSize(90);
text("100",340,180);

textSize(30);
text("th",485,155);

textSize(40);
text("Anniversary",340,250);

fill(18,51,89,a);

textSize(20);
text("SINCE 1928",405,295);

textSize(28);
text("学校法人大阪産業大学",290,390);
}
