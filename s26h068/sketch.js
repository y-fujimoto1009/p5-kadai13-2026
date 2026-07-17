const W = 746;
const H = 480;

let lightX = -120;
let scene = 0;
let ringAngle = 0;
let logoScale = 0;
let footerAlpha = 0;

const slogan = "偉大なる平凡人たれ";
let textCount = 0;

let particles = [];

function setup(){

  createCanvas(W,H);

  textAlign(CENTER,CENTER);

  angleMode(DEGREES);

  frameRate(60);

  for(let i=0;i<150;i++){

    particles.push({

      x:random(width),
      y:random(height),

      dx:random(-0.4,0.4),
      dy:random(-0.4,0.4),

      a:random(80,180),
      s:random(1,3)

    });

  }

}

function draw(){

  background(255);

  drawParticles();

  if(scene==0){

    stroke(0,120,255);
    strokeWeight(8);

    line(lightX,height/2,
         lightX+120,height/2);

    lightX+=8;

    if(lightX>width){

      scene=1;

    }

  }

  if(scene>=1){

    if(frameCount%10==0 &&
       textCount<slogan.length){

      textCount++;

    }

    noStroke();

    fill(0,90,220);

    textSize(38);

    text(slogan.substring(0,textCount), width/2, 85);

    if(textCount==slogan.length){

      scene=2;

    }

  }

  if(scene>=2){

    push();

translate(width/2,300);

rotate(ringAngle);

noFill();

stroke(130,28,33);
strokeWeight(8);

ellipse(0,0,280);

rotate(-ringAngle*1.5);

strokeWeight(5);
ellipse(0,0,210);

pop();

    ringAngle+=1.5;

    if(logoScale<120){

      logoScale+=2;

    }

    drawLogo(

      width/2,

      280,

      logoScale+sin(frameCount*4)*3

    );

    if(logoScale>=120){

      footerAlpha=min(

        footerAlpha+3,

        255

      );

    }

  }

  fill(50,footerAlpha);

  noStroke();

  textSize(20);

  text("OSAKA SANGYO UNIVERSITY", width/2, 450);

text("Since 1929", width/2, 472);

}

function drawParticles(){

  noStroke();

  for(let p of particles){

    fill(80,150,255,p.a);

    circle(

      p.x,

      p.y,

      p.s

    );

    p.x+=p.dx;

    p.y+=p.dy;

    if(p.x<0)p.x=width;

    if(p.x>width)p.x=0;

    if(p.y<0)p.y=height;

    if(p.y>height)p.y=0;

  }

}

//===============================
// 自分でロゴを描く
//===============================
function drawLogo(x, y, s){

  push();

  translate(x, y);

  // 拡大・縮小
  scale(s / 300.0);

  //------------------------
  // 上の丸
  //------------------------

  noStroke();

  fill(130,28,33);
  circle(-55,-125,60);

  fill(18,51,89);
  circle(10,-70,60);

  fill(0,84,145);
  circle(-55,-50,35);

  //------------------------
  // 赤い線
  //------------------------

  strokeWeight(12);
  stroke(130,28,33);

  line(-95,35,-15,-5);
  line(-15,-5,65,35);
  line(65,35,-15,75);
  line(-15,75,-95,35);

  //------------------------
  // 青い部分
  //------------------------

  stroke(18,51,89);

  line(-95,55,-20,92);
  line(-95,55,-20,155);
  line(-20,155,-95,118);

  stroke(0,84,145);

  line(-5,155,-5,92);
  line(-5,155,65,118);
  line(65,118,65,55);

  //------------------------
  // 中央の赤丸
  //------------------------

  noStroke();

  fill(130,28,33);

  circle(0,20,30);

  pop();

}
