let t = 0;
let fireworks = []; // 花火の配列

function setup() {
  createCanvas(746, 480);
}

function draw() {
  // 背景（少し透明度を残して、花火の光の余韻を作ります）
  background(255, 255, 255, 40);
  textFont("Yu Mincho");
  
  drawOsu();
  drawFirework();
}

function drawOsu(){
  t++;

  //------------------------
  // 上の丸
  //------------------------

  noStroke();

  fill(130,28,33);
  circle(120,min(90,t),60);

  fill(18,51,89);
  circle(185,min(145,max(0,t-30)),60);

  fill(0,84,145);
  circle(120,min(165,max(0,t-50)),35);


  //------------------------
  // ロゴ本体
  //------------------------

  strokeWeight(12);

  if(t > 60){

    stroke(130,28,33);

    line(80,230,
         min(160,80+(t-60)*2),
         max(190,230-(t-60)));

    line(160,190,
         min(240,160+(t-60)*2),
         min(230,190+(t-60)));

    line(240,230,
         max(160,240-(t-60)*2),
         min(270,230+(t-60)));

    line(160,270,
         max(80,160-(t-60)*2),
         max(230,270-(t-60)));
  }


  //------------------------
  // 青い部分
  //------------------------

  if(t > 120){

    //"S"
    stroke(18,51,89);
    strokeWeight(12);

    line(80,250,155,287);
    line(80,250,155,350);
    line(155,350,80,(350-37));
  }

  if(t > 150){

    //"U"
    stroke(0,84,145);
    strokeWeight(12);

    line(170,350,170,287);
    line(170,350,240,(350-37));
    line(240,(350-37),240,250);
  }

  //------------------------
  // 中央の赤丸
  //------------------------

  if(t > 50){

    strokeWeight(3);
    stroke(255,255,255);

    fill(130,28,33);

    circle(175,215,min(30,t-150));

    strokeWeight(8);
    noStroke();
  }


  //------------------------
  // キャッチコピー
  //------------------------

  if(t > 210){

    fill(20,50,90);

    textSize(32);

    text("偉大なる平凡人たれ",310,90);

  }


  //------------------------
  // 100th
  //------------------------

  if(t > 230){

    fill(130,28,33);

    textSize(120);

    text("100",min(330,150+t),220);

    textSize(60);

    text("th",min(540,360+t),220);

  }


  //------------------------
  // Anniversary
  //------------------------

  if(t > 250){
    textSize(42);
    text("Anniversary",330,300);
  }


  //------------------------
  // Since
  //------------------------

  if(t > 270){
    textSize(28);
    text("SINCE 1928",390,340);
  }


  //------------------------
  // 学校名
  //------------------------

  if(t > 290){
    textSize(32);
    text("学校法人大阪産業大学",300,400);

  }

}

function drawFirework(){
  // 定期的に新しい花火を打ち上げる
  if (random(1) < 0.03) {
    fireworks.push(new Firework());
  }

  // 花火の更新と描画
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    // 消えた花火を配列から削除
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

  t++;
}

// 花火を管理するクラス
class Firework {
  constructor() {
    // 打ち上げ開始位置（画面下のランダムな位置）
    this.x = random(width);
    this.y = height;
    // 爆発する高さ（画面上部〜中部のランダムな位置）
    this.targetY = random(50, height * 0.6);
    this.speedY = random(4, 8); // 打ち上げ速度
    this.exploded = false;
    this.particles = [];
    
    // 色（カラフルなランダムカラー）
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
  }

  update() {
    if (!this.exploded) {
      // 打ち上げ中
      this.y -= this.speedY;
      if (this.y <= this.targetY) {
        this.exploded = true;
        this.explode();
      }
    } else {
      // 爆発後（火花の更新）
      for (let p of this.particles) {
        p.update();
      }
    }
  }

  explode() {
    // 火花を四方八方に散らす
    for (let i = 0; i < 60; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  show() {
    if (!this.exploded) {
      // 打ち上げ中の光の玉
      fill(this.color);
      noStroke();
      ellipse(this.x, this.y, 6, 6);
    } else {
      // 爆発後の火花
      for (let p of this.particles) {
        p.show();
      }
    }
  }

  done() {
    // 爆発していて、かつ火花がすべて消えたら終了
    if (this.exploded && this.particles.length === 0) {
      return true;
    }
    return false;
  }
}

// 火花一粒一粒を管理するクラス
class Particle {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.color = col;
    
    // 飛び散る角度と速度
    let angle = random(TWO_PI);
    let speed = random(1, 5);
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
    
    this.alpha = 255; // 透明度（だんだん消える）
    this.gravity = 0.08; // 重力
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity; // 重力で少しずつ落とす
    this.alpha -= 4; // 徐々に消える
  }

  show() {
    if (this.alpha > 0) {
      stroke(red(this.color), green(this.color), blue(this.color), this.alpha);
      strokeWeight(random(2, 4)); // 火花のサイズ
      point(this.x, this.y);
    }
  }
}
