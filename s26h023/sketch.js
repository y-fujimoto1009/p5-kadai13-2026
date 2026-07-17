let t = 0;

// circle position
let c1Y = -150;
let c2Y = -150;
let c3Y = -150;

// OSU position
let oX = -200;
let sX = -200;
let uX = -200;


function setup(){
  createCanvas(746,480);
  textFont("sans-serif");
}


function draw(){

  background(250);

  t++;


  //------------------------
  // Circle animation
  //------------------------

  if(t > 20){
    c1Y = min(0,c1Y+6);
  }

  if(t > 50){
    c2Y = min(0,c2Y+6);
  }

  if(t > 80){
    c3Y = min(0,c3Y+6);
  }



  //------------------------
  // OSU animation
  //------------------------

  if(t > 110){
    oX = min(0,oX+6);
  }

  if(t > 150){
    sX = min(0,sX+6);
  }

  if(t > 190){
    uX = min(0,uX+6);
  }



  //------------------------
  // 3 circles
  //------------------------

  noStroke();

  fill(130,28,33);
  circle(120,90+c1Y,60);

  fill(18,51,89);
  circle(185,145+c2Y,60);

  fill(0,84,145);
  circle(120,165+c3Y,35);



  //------------------------
  // O
  //------------------------

  if(t > 110){

    stroke(130,28,33);
    strokeWeight(12);
    noFill();

    line(80+oX,230,
         160+oX,190);

    line(160+oX,190,
         240+oX,230);

    line(240+oX,230,
         160+oX,270);

    line(160+oX,270,
         80+oX,230);
  }



  //------------------------
  // S
  //------------------------

  if(t > 150){

    stroke(18,51,89);
    strokeWeight(12);

    line(80+sX,250,
         155+sX,287);

    line(80+sX,250,
         155+sX,350);

    line(155+sX,350,
         80+sX,313);

  }



  //------------------------
  // U
  //------------------------

  if(t > 190){

    stroke(0,84,145);
    strokeWeight(12);

    line(170+uX,350,
         170+uX,250);

    line(170+uX,350,
         240+uX,313);

    line(240+uX,313,
         240+uX,250);

  }



  //------------------------
  // Center red circle
  //------------------------

  if(t > 230){

    noStroke();

    fill(130,28,33);

    circle(175,215,
           min(30,t-230));

  }



  //------------------------
  // Text
  //------------------------

  if(t > 260){

    fill(20,50,90);

    textSize(32);
    text("偉大なる平凡人たれ",310,90);

  }


  if(t > 280){

    fill(130,28,33);

    textSize(120);
    text("100",330,220);

    textSize(60);
    text("th",520,220);

  }


  if(t > 300){

    textSize(42);
    text("Anniversary",330,300);

  }


  if(t > 320){

    textSize(28);
    text("SINCE 1928",390,340);

  }


  if(t > 340){

    textSize(32);
    text("学校法人大阪産業大学",300,400);

  }

}
