let t = 0;
let i = 0;

function setup() {
  createCanvas(746,480);
  textFont("sans-serif");
}

function draw() {

  background(255);

  t++;

  i++;

  // 上の丸

  noStroke();

if (i>150){
  
  fill(130,28,33);

  circle(120,max(90,350 - t),min(60,t));

  fill(18,51,89);

  circle(185,max(145,375 - t),min(60,30+t));

  fill(0,84,145);

  circle(120,max(165,400 - t),min(35,t));

}

  // ロゴ本体

  strokeWeight(12);

  
    stroke(130,28,33);

    line(max(80,300-t),230,160,190);

    line(max(160,375-t),190,240,230);
         

    line(min(240,50+t),230,160,270);
         

    line(min(160,50+t),270,80,230);
         
  


  // 青い部分

  

    //"S"
    stroke(18,51,89);
    strokeWeight(12);

    line(80,max(250,425-t),155,287);
    line(80,max(250,475-t),155,350);
    line(155,min(350,120+t),80,(350-37));
  

  

    //"U"
    stroke(0,84,145);
    strokeWeight(12);

    line(170,350,max(170,400-t),max(287,450-t));
    line(170,350,min(240,50+t),min(350-37,150+t));
    line(240,(350-37),max(240,400-t),min(250,150+t));
  

  // 中央の赤丸

  if(t>50){

    strokeWeight(3);
    stroke(255,255,255);

    fill(130,28,33);

    circle(175,215,min(30,t-150));

    strokeWeight(8);
    noStroke();
  }


  // キャッチコピー

  if(t>210){

    fill(20,50,90);

    textSize(32);

    text("偉大なる平凡人たれ",310,90);

  }


  // 100th

  if(t>230){

    fill(130,28,33);

    textSize(120);

    text("100",min(330,150+t),220);

    textSize(60);

    text("th",min(540,360+t),220);

  }


  // Anniversary

  if(t>250){

    textSize(42);

    text("Anniversary",330,300);

  }


  // Since

  if(t>270){

    textSize(28);

    text("SINCE 1928",390,340);

  }


   // 学校名
 

  if(t>290){

    textSize(32);

    text("学校法人大阪産業大学",300,400);

  }

}
