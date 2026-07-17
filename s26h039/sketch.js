let shells = [];
let fireworks = [];
let rings = [];

let startTime;
let duration = 60000;

let score = 0;
let combo = 0;
let maxCombo = 0;
let miss = 0;

let remain = 0;

function setup(){

  createCanvas(640,480);

  startTime = millis();

  textFont("sans-serif");
}

function draw(){

  background(0,40);

  //==================================
  // 残り時間
  //==================================

  remain = duration - (millis()-startTime);

  if(remain>0){

    if(random()<0.04){

      shells.push(
        new Shell(
          random(80,width-80)
        )
      );

    }

  }

  //----------------------------------
  // 花火玉更新
  //----------------------------------

  let i=shells.length-1;

  while(i>=0){

    shells[i].update();

    shells[i].display();

    if(shells[i].finished){

      fireworks.push(
        new Firework(
          shells[i].x,
          shells[i].y,
          shells[i].col
        )
      );

      shells.splice(i,1);

    }

    i--;

  }

  //----------------------------------
  // 爆発更新
  //----------------------------------

  i=fireworks.length-1;

  while(i>=0){

    fireworks[i].update();

    fireworks[i].display();

    if(fireworks[i].dead()){

      fireworks.splice(i,1);

    }

    i--;

  }

  //----------------------------------
  // リング更新
  //----------------------------------

  i=rings.length-1;

  while(i>=0){

    rings[i].update();

    rings[i].display();

    if(rings[i].life<=0){

      rings.splice(i,1);

    }

    i--;

  }

  //----------------------------------
  // HUD
  //----------------------------------

  fill(255);

  noStroke();

  textSize(24);

  text(
    "Score : "+score,
    20,
    35
  );

  text(
    "Combo : "+combo,
    20,
    70
  );

  text(
    "Remain : "+
    max(0,ceil(remain/1000)),
    20,
    105
  );

//============================================
// draw() の GAME OVER 部分を下記へ置き換え
//============================================

if(remain<=0){

  textAlign(CENTER);

  fill(255);

  textSize(42);

  text(
    "GAME OVER",
    width/2,
    height/2-90
  );

  textSize(30);

  text(
    "Score : "+score,
    width/2,
    height/2-35
  );

  text(
    "Max Combo : "+maxCombo,
    width/2,
    height/2+5
  );

  let total=score+miss;

  let r_rate=0;

  if(total>0){

    r_rate=score/total;

  }

  textSize(26);

  text(
    "Hit Rate : "+
    nf(r_rate*100,2,1)+" %",
    width/2,
    height/2+45
  );

  let rank="";

  if(r_rate>=0.95){

    rank="Excellent!";

  }
  else if(r_rate>=0.85){

    rank="Great!";

  }
  else if(r_rate>=0.70){

    rank="Good!";

  }
  else if(r_rate>=0.50){

    rank="Nice Try!";

  }
  else{

    rank="Keep Practice!";

  }

  fill(
    random(180,255),
    random(180,255),
    random(180,255)
  );

  textSize(40);

  text(
    rank,
    width/2,
    height/2+105
  );

  fill(220);

  textSize(20);

  text(
    "Press R to Restart",
    width/2,
    height/2+145
  );
  textAlign(LEFT);

  noLoop();

}

}

function mousePressed(){

  let hit=false;

  let i=shells.length-1;

  while(i>=0){

    let d=dist(
      mouseX,
      mouseY,
      shells[i].x,
      shells[i].y
    );

    if(d<100){

      fireworks.push(
        new Firework(
          shells[i].x,
          shells[i].y,
          shells[i].col
        )
      );

      rings.push(
        new Ring(
          shells[i].x,
          shells[i].y
        )
      );

      shells.splice(i,1);

      score++;

      combo++;

      if(combo>maxCombo){

        maxCombo=combo;

      }

      hit=true;

      break;

    }

    i--;

  }

  if(!hit){

    combo=0;

    miss++;

  }

}
//============================================
// 打ち上げ花火クラス
//============================================
class Shell{

  constructor(x){

    this.x=x;

    this.y=height+20;

    this.vx=random(-0.3,0.3);

    this.vy=random(-10,-13);

    this.g=0.2;

    this.finished=false;

    this.col=color(
      random(120,255),
      random(120,255),
      random(120,255)
    );

  }

  update(){

    this.x+=this.vx;

    this.y+=this.vy;

    this.vy+=this.g;

    // 頂点で自動爆発
    if(this.vy>=0){

      this.finished=true;

    }

  }

  display(){

    // 尾
    stroke(255,180);

    strokeWeight(2);

    line(
      this.x,
      this.y+18,
      this.x,
      this.y
    );

    // 花火玉
    noStroke();

    fill(this.col);

    circle(
      this.x,
      this.y,
      10
    );

  }

}

//============================================
// 命中リング
//============================================
class Ring{

  constructor(x,y){

    this.x=x;

    this.y=y;

    this.r=10;

    this.life=255;

  }

  update(){

    this.r+=3;

    this.life-=8;

  }

  display(){

    noFill();

    stroke(
      255,
      this.life
    );

    strokeWeight(2);

    circle(
      this.x,
      this.y,
      this.r
    );

  }

}
//============================================
// 花火クラス
//============================================
class Firework{

  constructor(x,y,col){

    this.particles=[];

    let i=0;

    while(i<100){

      let angle=random(TWO_PI);

      let speed=random(2,8);

      this.particles.push({

        x:x,

        y:y,

        vx:cos(angle)*speed,

        vy:sin(angle)*speed,

        life:255,

        r:red(col),

        g:green(col),

        b:blue(col),

        size:random(2,5)

      });

      i++;

    }

  }

  update(){

    let i=0;

    while(i<this.particles.length){

      let p=this.particles[i];

      // 移動
      p.x+=p.vx;
      p.y+=p.vy;

      // 重力
      p.vy+=0.05;

      // 空気抵抗
      p.vx*=0.992;
      p.vy*=0.992;

      // 徐々に小さく
      p.size*=0.995;

      // 寿命
      p.life-=3;

      i++;

    }

  }

  display(){

    noStroke();

    let i=0;

    while(i<this.particles.length){

      let p=this.particles[i];

      fill(
        p.r,
        p.g,
        p.b,
        p.life
      );

      circle(
        p.x,
        p.y,
        p.size
      );

      i++;

    }

  }

  dead(){

    let i=0;

    while(i<this.particles.length){

      if(this.particles[i].life>0){

        return false;

      }

      i++;

    }

    return true;

  }

}
//============================================
// Part 4
// エンディング・リスタート
//============================================

//--------------------------------------------
// キー入力
//--------------------------------------------
function keyPressed(){

  // Rキーでリスタート
  if(key=="r" || key=="R"){

    shells=[];
    fireworks=[];
    rings=[];

    score=0;
    combo=0;
    maxCombo=0;
    miss=0;

    startTime=millis();

    loop();

  }

}
