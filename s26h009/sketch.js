let t = 0;
let lightX = -100;

function setup() {
  createCanvas(746,480);
  textFont("sans-serif");
}

function draw() {

  background(255);

  t = min(t + 1, 420);


  //------------------------
  // 上の丸（バウンド登場）
  //------------------------

  noStroke();

  let bounce1 = 90;

  if(t < 60){
    bounce1 = 90 - abs(sin(t*0.15))*120;
  }

  fill(130,28,33);
  circle(120,bounce1,60);


  let bounce2 = 145;

  if(t > 20 && t < 80){
    bounce2 = 145 - abs(sin((t-20)*0.15))*120;
  }

  fill(18,51,89);
  circle(185,bounce2,60);


  let bounce3 = 165;

  if(t > 40 && t < 100){
    bounce3 = 165 - abs(sin((t-40)*0.15))*90;
  }

  fill(0,84,145);
  circle(120,bounce3,35);



 //------------------------
// 赤いロゴ（箱型に描く）
//------------------------

if(t > 70){

  stroke(130,28,33);
  strokeWeight(12);
  noFill();

  let p = constrain((t-70)/60,0,1);


  // 左上 → 右上
  line(
    80,
    230,
    lerp(80,160,p),
    lerp(230,190,p)
  );


  // 右上 → 右下
  if(p > 0.25){

    line(
      160,
      190,
      lerp(160,240,p),
      lerp(190,230,p)
    );

  }


  // 右下 → 左下
  if(p > 0.5){

    line(
      240,
      230,
      lerp(240,160,p),
      lerp(230,270,p)
    );

  }


  // 左下 → 左上
  if(p > 0.75){

    line(
      160,
      270,
      lerp(160,80,p),
      lerp(270,230,p)
    );

  }

}



  //------------------------
  // 青いS
  //------------------------

  if(t > 140){

    stroke(18,51,89);
    strokeWeight(12);

    let p = constrain((t-140)/40,0,1);


    line(
      80,
      250,
      lerp(80,155,p),
      lerp(287,287,p)
    );


    line(
      80,
      250,
      lerp(80,155,p),
      lerp(250,350,p)
    );


    line(
      155,
      350,
      lerp(155,80,p),
      lerp(350,313,p)
    );

  }



  //------------------------
  // 青いU
  //------------------------

  if(t > 180){

    stroke(0,84,145);
    strokeWeight(12);

    let p = constrain((t-180)/40,0,1);


    line(
      170,
      350,
      170,
      lerp(350,287,p)
    );


    line(
      170,
      350,
      lerp(170,240,p),
      lerp(350,313,p)
    );


    line(
      240,
      313,
      240,
      lerp(313,250,p)
    );

  }



  //------------------------
  // 中央赤丸（ポンと出現）
  //------------------------

  if(t > 220){

    noStroke();

    let d = map(
      constrain(t-220,0,20),
      0,
      20,
      0,
      30
    );

    fill(255);
    circle(175,215,d + 3);
    
    fill(130,28,33);
    circle(175,215,d - 3);

  }
    //------------------------
  // キャッチコピー
  //------------------------

  if(t > 240){

    let a = map(
      constrain(t-240,0,40),
      0,
      40,
      0,
      255
    );

    fill(20,50,90,a);

    textSize(32);

    text(
      "偉大なる平凡人たれ",
      310,
      90
    );

  }



  //------------------------
  // 100th 登場
  //------------------------

  if(t > 270){

    let p = constrain((t-270)/40,0,1);

    let angle = lerp(
      radians(-30),
      0,
      p
    );

    push();

    translate(420,220);

    rotate(angle);

    scale(p);

    fill(130,28,33);

    textSize(120);

    textAlign(CENTER);

    text(
      "100",
      10,
      0
    );


    textSize(60);

    text(
      "th",
      150,
      0
    );

    pop();

  }



  //------------------------
  // Anniversary
  //------------------------

  if(t > 310){

    let a = map(
      constrain(t-310,0,30),
      0,
      30,
      0,
      255
    );

    fill(130,28,33,a);

    textSize(42);

    textAlign(LEFT);

    text(
      "Anniversary",
      330,
      300
    );

  }



  //------------------------
  // SINCE 1928
  //------------------------

  if(t > 330){

    let a = map(
      constrain(t-330,0,30),
      0,
      30,
      0,
      255
    );

    fill(130,28,33,a);

    textSize(28);

    text(
      "SINCE 1928",
      390,
      340
    );

  }



  //------------------------
  // 学校名
  //------------------------

  if(t > 350){

    let a = map(
      constrain(t-350,0,30),
      0,
      30,
      0,
      255
    );

    fill(130,28,33,a);

    textSize(32);

    text(
      "学校法人大阪産業大学",
      300,
      400
    );

  }



  //------------------------
  // 最後の光エフェクト
  //------------------------

  if(t > 380){

    lightX += 8;


    if(lightX > width+100){
      lightX = -100;
    }


    noStroke();

    fill(255,255,255,120);

    rect(
      lightX,
      0,
      40,
      height
    );

  }



  //------------------------
  // 完成後停止
  //------------------------

  if(t >= 420){

    t = 420;

  }

}
