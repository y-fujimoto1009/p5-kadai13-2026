const RED  = "#821C21";
const NAVY = "#123359";
const BLUE = "#005491";

let frame = 0;


//-------------------------------------
// setup
//-------------------------------------

function setup(){

  createCanvas(883,573);

  textAlign(CENTER,CENTER);
  rectMode(CENTER);

  frameRate(60);

}



//-------------------------------------
// draw
//-------------------------------------

function draw(){

  background(255);

  frame++;


  //=============================
  // 左側の3つの円
  //=============================

  drawCircle(
    112,
    128,
    96,
    RED,
    0
  );


  drawCircle(
    116,
    276,
    64,
    BLUE,
    18
  );


  drawCircle(
    231,
    244,
    86,
    NAVY,
    35
  );



  //=============================
  // 立方体ロゴ
  //=============================

  drawCube();



  //=============================
  // 文字
  //=============================

  drawTexts();



  //=============================
  // 最終演出
  //=============================

  if(frame > 260){

    let zoom =
      1 +
      sin((frame-260)*0.04)*0.015;


    push();

    translate(
      width/2,
      height/2
    );

    scale(zoom);


    translate(
      -width/2,
      -height/2
    );


    pop();

  }

}



//-------------------------------------
// 円アニメーション
//-------------------------------------

function drawCircle(x,y,size,col,start){


  let p =
    constrain(
      map(
        frame,
        start,
        start+40,
        0,
        1
      ),
      0,
      1
    );


  // ease out
  p =
    1 -
    pow(
      1-p,
      3
    );


  let yy =
    lerp(
      -100,
      y,
      p
    );


  noStroke();

  fill(col);

  ellipse(
    x,
    yy,
    size
  );

}

function drawCube(){

  let alpha =
    constrain(map(frame, 50, 120, 0, 255), 0, 255);

  let col = color(red(NAVY), green(NAVY), blue(NAVY), alpha);

  // 円の真下に来る位置
  let cx = 175;
  let cy = 400;

  // アイソメ図の立方体の辺の長さ
  let L = 90;

  // アイソメ方向ベクトル
  let vx = L * cos(radians(30));
  let vy = L * sin(radians(30));

  let ux = L * cos(radians(150));
  let uy = L * sin(radians(150));

  let wx = 0;
  let wy = -L;

  // 8頂点（アイソメ図）
  let A = {x: cx, y: cy};                 // 手前左下
  let B = {x: cx + vx, y: cy + vy};       // 手前右下
  let C = {x: cx + vx + wx, y: cy + vy + wy}; // 手前右上
  let D = {x: cx + wx, y: cy + wy};       // 手前左上

  let E = {x: cx + ux, y: cy + uy};       // 奥左下
  let F = {x: cx + ux + vx, y: cy + uy + vy}; // 奥右下
  let G = {x: cx + ux + vx + wx, y: cy + uy + vy + wy}; // 奥右上
  let H = {x: cx + ux + wx, y: cy + uy + wy}; // 奥左上

  //=============================
  // 手前面（S）
  //=============================
  fill(col);
  noStroke();
  beginShape();
  vertex(A.x, A.y);
  vertex(B.x, B.y);
  vertex(C.x, C.y);
  vertex(D.x, D.y);
  endShape(CLOSE);

  fill(255, alpha);
  textSize(40);
  text("S", (A.x + B.x + C.x + D.x)/4, (A.y + B.y + C.y + D.y)/4);

  //=============================
  // 上面（O）
  //=============================
  fill(col);
  beginShape();
  vertex(D.x, D.y);
  vertex(C.x, C.y);
  vertex(G.x, G.y);
  vertex(H.x, H.y);
  endShape(CLOSE);

  fill(255, alpha);
  text("O", (D.x + C.x + G.x + H.x)/4, (D.y + C.y + G.y + H.y)/4);

  //=============================
  // 右面（U）
  //=============================
  fill(col);
  beginShape();
  vertex(B.x, B.y);
  vertex(F.x, F.y);
  vertex(G.x, G.y);
  vertex(C.x, C.y);
  endShape(CLOSE);

  fill(255, alpha);
  text("U", (B.x + F.x + G.x + C.x)/4, (B.y + F.y + G.y + C.y)/4);

  //=============================
  // 正六角形の輪郭（見た目）
  //=============================
  stroke(col);
  strokeWeight(3);
  noFill();
  beginShape();
  vertex(A.x, A.y);
  vertex(B.x, B.y);
  vertex(F.x, F.y);
  vertex(G.x, G.y);
  vertex(H.x, H.y);
  vertex(E.x, E.y);
  endShape(CLOSE);
}


//=====================================
// 文字描画
//=====================================


function drawTexts(){



  //=================================
  // 上部スローガン
  //=================================

  drawFadeText(
    "偉大なる平凡人たれ",
    565,
    95,
    30,
    NAVY,
    70
  );



  //=================================
  // 100th
  //=================================

  let a100 =
    constrain(
      map(
        frame,
        90,
        140,
        0,
        255
      ),
      0,
      255
    );


  push();


  fill(
    red(RED),
    green(RED),
    blue(RED),
    a100
  );


  noStroke();


  textStyle(BOLD);



  // 100

  textSize(175);


  let y100 =
    lerp(
      370,
      225,
      constrain(
        map(
          frame,
          90,
          140,
          0,
          1
        ),
        0,
        1
      )
    );


  text(
    "100",
    525,
    y100
  );



  // th

  textSize(70);


  text(
    "th",
    735,
    245
  );


  pop();




  //=================================
  // Anniversary
  //=================================


  drawFadeText(
    "Anniversary",
    570,
    345,
    68,
    RED,
    125
  );





  //=================================
  // SINCE 1928
  //=================================


  drawFadeText(
    "SINCE 1928",
    560,
    415,
    35,
    RED,
    150
  );






  //=================================
  // 学校法人文字
  //=================================


  drawFadeText(
    "学校法人大阪産業大学",
    560,
    495,
    38,
    RED,
    170
  );



}



//=====================================
// フェード文字
//=====================================


function drawFadeText(
  str,
  x,
  y,
  size,
  col,
  start
){


  let a =
    constrain(
      map(
        frame,
        start,
        start+30,
        0,
        255
      ),
      0,
      255
    );


  fill(
    red(col),
    green(col),
    blue(col),
    a
  );


  noStroke();


  textStyle(BOLD);


  textSize(size);


  text(
    str,
    x,
    y
  );

}
//=====================================
// 仕上げ・補助関数
//=====================================



//-------------------------------------
// smooth easing
//-------------------------------------

function easeOut(t){

  return 1 - pow(1-t,3);

}




//-------------------------------------
// HEXカラー分解補助
//-------------------------------------

function hexToRGB(hex){

  hex = hex.replace("#","");


  return {

    r:parseInt(
      hex.substring(0,2),
      16
    ),

    g:parseInt(
      hex.substring(2,4),
      16
    ),

    b:parseInt(
      hex.substring(4,6),
      16
    )

  };

}




//-------------------------------------
// RGB取得用
//-------------------------------------

function red(c){

  return hexToRGB(c).r;

}


function green(c){

  return hexToRGB(c).g;

}


function blue(c){

  return hexToRGB(c).b;

}



//-------------------------------------
// 完成後の微細な動き
//-------------------------------------

function finalMotion(){


  if(frame < 250){
    return;
  }


  let move =
    sin(
      frame*0.03
    )*2;



  translate(
    0,
    move
  );

}
