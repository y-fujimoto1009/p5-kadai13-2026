let y;
let x;
let a;
let b;

let x2 =125;
let y2 =280;
let x3 =50;
let y3 =250;
let x4 =125;
let y4 =220;
let x5 =50;
let y5 =250;
  
  

function setup() {
  createCanvas(746, 480);
  y=235;
  x=235;
  a=195;
  b=235;
  frameRate(45);
}

function draw() {
  background(255);
  noStroke();
  fill(22,50,89) //文字の色を変更する
  textSize(30);　//文字のサイズを変える
  text("偉大なる平凡人たれ",267,140); //文字をを出力する
  
  fill(128,28,33) //文字の色を変更する
  textSize(140);　//文字のサイズを変える
  text("100",267,260); //文字をを出力する

  textSize(90);　//文字のサイズを変える
  fill(128,28,33) //文字の色を変更する
  text("th",510,260); //文字をを出力する

  textSize(50);　//文字のサイズを変える
  fill(128,28,33) //文字の色を変更する
  text("Anniversary",295,300); //文字をを出力する

  textSize(25);　//文字のサイズを変える
  fill(128,28,33) //文字の色を変更する
  text("SINCE 1928",335,320); //文字をを出力する

  textSize(25);　//文字のサイズを変える
  fill(128,28,33) //文字の色を変更する
  text("学校法人大阪産業大学",285,360); //文字をを出力する

  //O
 stroke(130,28,33);
strokeWeight(10);
line(125,280,x2,y2)

       if (x2 < 200){
      x2 += 2;
    }
  if (y2 > 250){
    y2 -= 0.8;
  }  

   stroke(130,28,33);
strokeWeight(10);
line(50,250,x3,y3);

  if (x3 < 125){
      x3 += 2;
    }
  if (y3 > 220){
    y3 -= 0.8;
  }

strokeWeight(10);
line(125,220,x4,y4);

    if (x4 < 200){
      x4 += 2;
    }
  if (y4 < 250){
    y4 += 0.8;
  }


strokeWeight(10);
line(50,250,x5,y5);

    if (x5 < 125){
      x5 += 2;
    }
  if (y5 < 280){
    y5 += 0.8;
  }

     //S
     stroke(18,51,89);
strokeWeight(10);
line(50,270,115,300); 

 
strokeWeight(10);
line(50,270,115,355);


strokeWeight(10);
line(115,355,50,325);
  
  //U
   stroke(0,84,145);
strokeWeight(10);
line(135,300,135,355);

  
strokeWeight(10);
line(135,355,200,325);

 
strokeWeight(10);
line(200,325,200,270);

  //〇


stroke(255);
  strokeWeight(3);
  fill(130,28,33)
  circle(145,y,30)

  y -= 3;
  if (y < -15) y = 235;

  noStroke(0);
  fill(130,28,33);
  circle(85,x,60);

  x -= 4;
  if (x < -30) x = 125;

   noStroke(0);
  fill(0,84,145);
  circle(85,a,35);

  a -= 3;
  if (a < -18) a = 195;

  noStroke(0);
  fill(18,51,89);
  circle(165,b,60);

  b -= 2;
  if (b < -30) b = 165;

}
