let phase=0;
let scaleValue=1;
let particles=[];
let circles=[];
let burst=false;

let logoX=0;
let logoY=0;
let movePhase=false;

let moveDelay = 0;
let delayStart = false;

let textX = 280;
let textAlpha = 0;

let text2X = 280;
let text2Alpha = 0;
let text2Start = false;
let text2Timer = 0;

let text3X = 343;
let text3Alpha = 0;
let text3Start = false;
let text3Timer = 0;

let text4X = 280;
let text4Alpha = 0;
let text4Start = false;
let text4Timer = 0;

let text5X = 420;
let text5Alpha = 0;
let text5Start = false;
let text5Timer = 0;

let offsetY = 18;

function setup(){
  createCanvas(746,480);
  logoX = width/2-154;
  logoY = height/2-205;

  circles.push(
    new CircleParticle(154,226,120,90,60,color(130,28,33)),
    new CircleParticle(154,226,190,145,55,color(18,51,89)),
    new CircleParticle(154,226,118,165,40,color(0,84,145)),
    new CircleParticle(154,226,175,215,30,color(130,28,33),true)
  );
}

function draw(){
  background(255);
  
    if(movePhase){
      logoX=lerp(logoX,0,0.03);
      logoY=lerp(logoY,0,0.03);

      textX = lerp(textX, 320, 0.03);
      textAlpha = lerp(textAlpha, 255, 0.05);

      text2Timer++;
        if(text2Timer > 30){
          text2Start = true;
        }if(text2Start){
          text2X = lerp(text2X,325,0.03);
          text2Alpha = lerp(text2Alpha,255,0.05);
        }
      
        if(text2Timer > 30){
          text3Start = true;
        }if(text3Start){
          text3X = lerp(text3X,388,0.03);
          text3Alpha = lerp(text3Alpha,255,0.05);
        }

        if(text2Timer > 45){
          text4Start = true;
        }if(text4Start){
          text4X = lerp(text4X,330,0.03);
          text4Alpha = lerp(text4Alpha,255,0.05);
        }

        if(text2Timer > 90){
          text5Start = true;
        }if(text5Start){
          text5X = lerp(text5X,305,0.03);
          text5Alpha = lerp(text5Alpha,255,0.05);
        }
    }
  
    if(phase===0){
      scaleValue=lerp(scaleValue,0.7,0.1);
      if(abs(scaleValue-0.7)<0.01)phase=1;
  
    }else if(phase===1){
      scaleValue=lerp(scaleValue,1.4,0.1);
  
      if(scaleValue>1&&!burst){
        for(let i=0;i<60;i++)particles.push(new Particle());
        for(let c of circles)c.start();
        burst=true;
      }
  
      if(abs(scaleValue-1.4)<0.15)phase=2;
  
    }else if(phase===2){
      scaleValue=lerp(scaleValue,1,0.1);
    if(abs(scaleValue-1)<0.01 && !delayStart){
  
      delayStart=true;
        }
    if(delayStart){
      moveDelay++;
      if(moveDelay>45){
        movePhase=true;
        
      }
    }
  }

  push();
  translate(logoX,logoY+offsetY);
  translate(154,205);
  scale(scaleValue);
  translate(-154,-205);
  drawLogo();
  pop();

  push();
  translate(logoX,logoY+offsetY);

  for(let i=particles.length-1;i>=0;i--){
    particles[i].update();
    particles[i].display();

    if(particles[i].dead())particles.splice(i,1);
  }

  for(let c of circles){
    c.update();
    c.display();
  }

  pop();

  if(movePhase){
  textAlpha = lerp(textAlpha, 255, 0.05);
  }
  
  push();
//100th 
  textFont("Noto Sans JP");
  fill(130, 28, 33, textAlpha);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(140);
  text("100", textX, 220);
  textSize(80);
  text("th", textX+240, 240);

//anniversary
  fill(130,28,33,text2Alpha);
  textSize(60);
  text("Anniversary",text2X,300);

  fill(130,28,33,text3Alpha);
  textSize(30);
  text("SINCE 1928",text3X,345);

  fill(130,28,33,text4Alpha);
  textSize(30);
  text("学校法人大阪産業大学",text4X,380);

  textFont("Yu Mincho"); 
  fill(18,51,89,text5Alpha);
  textSize(38);
  text("偉大なる平凡人たれ",text5X,130);
  
  pop();
  
}

//OSUロゴ
function drawLogo(){
  
  noStroke();
  fill(130,28,33);
  quad(80,220, 154,190, 154,202, 80,232);
  quad(154,190, 228,220, 228,232, 154,202);
  quad(228,232, 154,262, 154,250, 228,220);
  quad(154,262, 80,232, 80,220, 154,250);

  fill(18,51,89);
  quad(152,278, 80,248, 80,236, 152,266);
  quad(80,236, 152,309, 152,321, 80,248);
  quad(152,321, 80,291, 80,279, 152,309);

  fill(0,84,145);
  quad(156,265, 167,261, 167,316, 156,321);
  quad(156,309, 228,279, 228,291, 156,321);
  quad(217,291, 217,240, 228,236, 228,291);
  
}

//パーティクル
class Particle{
  constructor(){
    this.x=154;
    this.y=230;
    let angle=random(-5*PI/6,-PI/6);
    let speed=random(4,8);
    this.vx=cos(angle)*speed;
    this.vy=sin(angle)*speed;
    this.size=random(25,55);
    this.alpha=255;
    this.col=random([
      color(130,28,33),
      color(18,51,89),
      color(0,84,145)
    ]);
  }

  update(){
    this.x+=this.vx;
    this.y+=this.vy;
    this.vx*=0.98;
    this.vy*=0.98;
    this.alpha-=3;
  }

  display(){
    
    noStroke();
    fill(
      red(this.col),
      green(this.col),
      blue(this.col),
      this.alpha
    );
    circle(this.x,this.y,this.size);
  }

  dead(){
    return this.alpha<=0;
  }
}

//4つの円
class CircleParticle{
  constructor(x,y,targetX,targetY,size,col,outline=false){
    this.x=x;
    this.y=y;
    this.startX=x;
    this.startY=y;
    this.targetX=targetX;
    this.targetY=targetY;
    this.size=size;
    this.col=col;
    this.outline=outline;
    this.t=0;
    this.active=false;
    this.alpha=0;
    this.arrived=false;
  }

  start(){
    this.active=true;
    this.t=0;
  }

  update(){
    if(this.active){
      this.t+=0.025;

      if(this.t>=1){
        this.t=1;
        this.arrived=true;
      }

      let ease=this.t*this.t*(3-2*this.t);

      this.x=lerp(
        this.startX,
        this.targetX,
        ease
      );

      this.y=lerp(
        this.startY,
        this.targetY,
        ease
      );

      this.alpha=lerp(
        this.alpha,
        255,
        0.08
      );
    }
  }

  display(){
    if(this.outline&&this.arrived){
      strokeWeight(3);
      stroke(255,this.alpha);
    }else{
      noStroke();
    }

    fill(
      red(this.col),
      green(this.col),
      blue(this.col),
      this.alpha
    );

    circle(
      this.x,
      this.y,
      this.size
    );
  }
}
