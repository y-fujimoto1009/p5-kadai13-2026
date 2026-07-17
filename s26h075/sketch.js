function setup() {
  createCanvas(746,480);
  textFont("sans-serif");
}

let t = 0;

function draw() {

  background(255);

  t++;
  //上の丸3つ

  noStroke();

  fill(130,28,33);

  circle(120,max(90,250-t),60);

  fill(18,51,89);

  circle(185,max(145,255-t),60);

  fill(0,84,145);

  circle(120,max(165,260-t),35);

  fill(130,28,33);

  quad(
  80, 230,
  160, min(230,190+(t+10)),
  240, 230,
  160, max(230,270-(t+10)));

  //O

  strokeWeight(12);
  {

    stroke(130,28,33);

    line(80,230,160,190);

    line(160,190,240,230);

    line(240,230,160,270);

    line(160,270,80,230);
  }

  {

    //"S"
    stroke(18,51,89);
    strokeWeight(12);

    line(80,250,155,287);
    line(80,250,155,350);
    line(155,350,80,(350-37));
  }

  {

    //"U"
    stroke(0,84,145);
    strokeWeight(12);

    line(170,350,170,287);
    line(170,350,240,(350-37));
    line(240,(350-37),240,250);
  }

  {

    strokeWeight(3);
    stroke(255,255,255);

    fill(130,28,33);

    circle(175,215,30);

    strokeWeight(8);
    noStroke();
  }




  //キャッチコピー
  {

    fill(20,50,90);

    textSize(32);

    text("偉大なる平凡人たれ",310,90);

  }

  {

    fill(130,28,33);

    textSize(120);

    text("100",330,220);

    textSize(60);

    text("th",540,220);

  }

  {

    textSize(42);

    text("Anniversary",330,300);

  }

  {

    textSize(28);

    text("SINCE 1928",390,340);

  }

  {

    textSize(32);

    text("学校法人大阪産業大学",300,400);

  }
  
}
