const colorDeepMaroon = '#7B2228'; 
const colorDarkNavy = '#103058';   
const colorMediumBlue = '#185AA0'; 
const colorWhite = '#FFFFFF';

let animTime = 0;

function setup() {
  createCanvas(680, 420);
  frameRate(60); 
}

function draw() {
  background(colorWhite); 

  animTime = millis() / 1000;

  const centerX = width / 2;
  const centerY = height / 2;
  const scaleVal = height / 400; 

  // ==========================================
  // 1. グラフィック部分（球体とBOXの組み立て演出）
  // ==========================================
  push();
  translate(centerX - 195 * scaleVal, centerY + 30 * scaleVal); 
  scale(scaleVal * 1.5); 

  noStroke();

  // --- 1a. 浮遊する球体 ---
  // ② 左上の大きな丸（赤色）
  let ball1Scale = constrain((animTime - 0.2) * 4, 0, 1);
  if (ball1Scale > 0) {
    push();
    translate(-55, -100);
    scale(ball1Scale);
    fill(colorDeepMaroon);
    circle(0, 0, 54);
    pop();
  }

  // ④ 左中間に浮かぶ青い丸
  let ball2Scale = constrain((animTime - 0.5) * 4, 0, 1);
  if (ball2Scale > 0) {
    push();
    translate(-55, -45);
    scale(ball2Scale);
    fill(colorMediumBlue);
    circle(0, 0, 24);
    pop();
  }

  // ③ 右上に浮かぶ中くらいの丸（紺）
  let ball3Scale = constrain((animTime - 0.8) * 4, 0, 1);
  if (ball3Scale > 0) {
    push();
    translate(30, -60);
    scale(ball3Scale);
    fill(colorDarkNavy);
    circle(0, 0, 36);
    pop();
  }

  // ① 器の真ん中にある小さな丸
  let ball4Scale = constrain((animTime - 1.2) * 4, 0, 1);
  if (ball4Scale > 0) {
    push();
    translate(-10, -2);
    scale(ball4Scale);
    fill(colorDeepMaroon);
    circle(0, 0, 16);
    pop();
  }


  // --- 1b. 立体BOX（下から競り上がる） ---
  let boxProgress = constrain((animTime - 1.2) / 1.3, 0, 1);
  boxProgress = 1 - pow(1 - boxProgress, 3); 

  if (boxProgress > 0) {
    push();
    translate(0, (1 - boxProgress) * 50);
    scale(1, boxProgress);

    // --- S (左パネル) ---
    fill(colorMediumBlue);
    beginShape();
    vertex(-70, -10); 
    vertex(-15, 15);
    vertex(-15, 25);
    vertex(-70, 0);
    endShape(CLOSE);
    
    beginShape();
    vertex(-70, 0);
    vertex(-15, 25);
    vertex(-15, 85);  
    vertex(-70, 65);
    endShape(CLOSE);

    // Sのカッティング（切り込みの間隔を広げ、Sの真ん中の青い横線を細くしました）
    fill(colorWhite);
    beginShape();
    vertex(-15, 27); // 下に少し広げる (25 -> 27)
    vertex(-55, 12); // 下に少し広げる (10 -> 12)
    vertex(-55, 18); 
    vertex(-15, 33);
    endShape(CLOSE);
    
    beginShape();
    vertex(-70, 52); 
    vertex(-30, 68); 
    vertex(-30, 58); // 上に少し広げる (60 -> 58)
    vertex(-70, 42); // 上に少し広げる (44 -> 42)
    endShape(CLOSE);

    // --- U (右パネル) ---
    fill(colorDarkNavy);
    beginShape();
    vertex(-15, 15); vertex(40, -10); vertex(40, 65); vertex(-15, 85);
    endShape(CLOSE);

    fill(colorWhite);
    beginShape();
    vertex(-15, 15); vertex(40, -10); vertex(40, 48); vertex(-15, 68);
    endShape(CLOSE);

    fill(colorDarkNavy);
    beginShape();
    vertex(-15, 15); vertex(-3, 10); vertex(-3, 63); vertex(-15, 68);
    endShape(CLOSE);
    beginShape();
    vertex(28, -5); vertex(40, -10); vertex(40, 65); vertex(28, 60);
    endShape(CLOSE);
    
    // Uの底の横棒（vertexの座標を調整し、一番下の線の厚みをスマートに細くしました）
    beginShape();
    vertex(-15, 74); // 上に引き上げる (55 -> 74)
    vertex(40, 49);  // 上に引き上げる (30 -> 49)
    vertex(40, 65); 
    vertex(-15, 85);
    endShape(CLOSE);

    // --- O (上面のフレーム) ---
    noFill();
    stroke(colorDeepMaroon);
    strokeWeight(7); 
    strokeJoin(MITER);
    beginShape();
    vertex(-70, -10); vertex(-15, -30); vertex(40, -10); vertex(-15, 15);
    endShape(CLOSE);

    pop();
  }
  pop(); 


  // ==========================================
  // 2. 文字部分（左からスライドイン＋フェードイン）
  // ==========================================
  let textProgress = constrain((animTime - 2.2) / 1.5, 0, 1);
  textProgress = 1 - pow(1 - textProgress, 3); 

  if (textProgress > 0) {
    let slideX = (1 - textProgress) * 40 * scaleVal;
    const textStartX = (centerX - 10 * scaleVal) + slideX;
    let textAlpha = textProgress * 255;

    // 2a. 「偉大なる平凡人たれ」
    textAlign(LEFT, CENTER);
    fill(16, 48, 88, textAlpha); 
    textSize(24 * scaleVal);
    text("偉大なる平凡人たれ", textStartX, centerY - 110 * scaleVal);

    // 2b. 「100th」
    fill(123, 34, 40, textAlpha); 
    textSize(120 * scaleVal);
    text("100", textStartX, centerY - 20 * scaleVal);
    
    let largeTextWidth = textWidth("100 "); 
    textSize(40 * scaleVal);
    text("th", textStartX + largeTextWidth, centerY - 30 * scaleVal);

    // 2c. 下部テキストセクション
    const textCenterX = textStartX + (largeTextWidth * 0.65);
    textAlign(CENTER, TOP);

    // Anniversary
    fill(123, 34, 40, textAlpha);
    textSize(48 * scaleVal);
    text("Anniversary", textCenterX, centerY + 30 * scaleVal);

    // SINCE 1928
    fill(123, 34, 40, textAlpha);
    textSize(26 * scaleVal);
    text("SINCE 1928", textCenterX, centerY + 90 * scaleVal);

    // 学校法人大阪産業大学
    fill(123, 34, 40, textAlpha);
    textSize(24 * scaleVal);
    text("学校法人大阪産業大学", textCenterX, centerY + 130 * scaleVal);
  }
}
