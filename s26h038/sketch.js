let moveY = 0;      // 動かす量
let maruSpeed = 0.2;  // 動くスピード（大きくすると速くなります）

function setup() {
  createCanvas(746, 480);
}

function draw() {
  
  background(600);
   stroke(190,0,0);
strokeWeight(30);
line(50,300,150,230);//せんみぎ
 stroke(190,0,0);
strokeWeight(30);
line(250,300,150,230);//せんひだり


  
 stroke(190,0,0);
strokeWeight(30);
  line(250,300,155,370);


  
 stroke(190,0,0);
strokeWeight(30);
  line(150,370,50,300);

  stroke(190,0,0);
  strokeWeight(30);
textSize(32);
  stroke(10,50,80);
  strokeWeight(80);
 stroke(190,0,0);
strokeWeight(100);
line(110,120+moveY,110,120+moveY);//aka

// 上下に動かす計算（drawの最後に配置）
moveY += maruSpeed;
if (moveY > 30 || moveY < -30) { 
  maruSpeed *= -1; // 40ピクセル分上下に動いたら跳ね返る
}
  
textSize(30);
  stroke(10,50,80);
  strokeWeight(70);
line(230,200+moveY,230,200+moveY);//konn

strokeWeight(25); 
  line(100, 400,40, 340);  // ① 上の横線（左上に移動）
  line(40, 340,100, 470);  // ② 中央の斜め線
  line(90, 470, 40, 420);  // ③ 下の横線


strokeWeight(30);
stroke(10, 50, 80); 

// 左側の縦の壁
line(200, 390, 200, 460);
// 底の壁
line(200, 470, 260, 430);
// 右側の縦の壁
line(260, 420, 260, 350);
  
textSize(32);
  strokeWeight(80);
   stroke(10,90,150);
  strokeWeight(60);
line(100,230+moveY,100,230+moveY);//ao
  
textSize(32);
  strokeWeight(80);
   strokeWeight(80);
   stroke(200,70,0);
  strokeWeight(40);
line(200,290+moveY,200,290+moveY);//orennge

  // 上下に動かす計算（drawの最後に配置）
moveY += maruSpeed;
if (moveY > 40 || moveY < -40) { 
  maruSpeed *= -1; // 40ピクセル分上下に動いたら跳ね返る
}
  
textSize(32);
  strokeWeight(80);
  noStroke();
fill(0)
text("偉大なる平凡人たれ",300,100)
  textSize(140);
  fill(440,50,50)
  text("100th",300+random(-50,50),220+random(-50,50))
   textSize(50);
  fill(440,50,50)
  text("Anniversary",330,270)
  textSize(30);
  fill(440,50,50)
  text("since1928",400,300)
  textSize(30);
  fill(440,50,50)
  text("学校法人大阪産業大学",320,340)
 
}
