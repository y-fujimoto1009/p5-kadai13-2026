let step = 1;
let stepTimer = 0;

let textX1 = -300, textX2 = -300, textX3 = -400; 
let boxProgress = 0;
let b1x = 0, b1y = 0, b2x = 0, b2y = 0, b3x = 0, b3y = 0, b4x = 0, b4y = 0; 


let num1 = { x: 130, y: 230, tX: 220, tY: 80, scale: 0, alpha: 0, active: false };
let num2 = { x: 130, y: 230, tX: 300, tY: 80, scale: 0, alpha: 0, active: false };
let num3 = { x: 130, y: 230, tX: 380, tY: 80, scale: 0, alpha: 0, active: false };

function setup() {
  createCanvas(600, 380);

  b1x = 130; b1y = 230;
  b2x = 130; b2y = 230;
  b3x = 130; b3y = 230;
  b4x = 130; b4y = 230;
}

function draw() {
  background(255);
  
  
  let colWine = color(130, 28, 33);
  let colNavy = color(18, 51, 89);
  let colBlue = color(0, 84, 145);

  stepTimer++;
  
  if (step === 1) {
    textX1 = lerp(textX1, 242, 0.1);
    textX2 = lerp(textX2, 310, 0.1);
    textX3 = lerp(textX3, 240, 0.1);
    if (stepTimer > 40) { step = 2; stepTimer = 0; }
    
  } else if (step === 2) {
    
    boxProgress = lerp(boxProgress, 1.0, 0.08);
    if (stepTimer > 50) { step = 3; stepTimer = 0; }
    
  } else if (step === 3) {
    
    boxProgress = 1.0;
    

    if (stepTimer > 0) {
      num3.active = true;
      num3.x = lerp(num3.x, num3.tX, 0.12);
      num3.y = lerp(num3.y, num3.tY, 0.12);
      num3.scale = lerp(num3.scale, 1.0, 0.12);
      num3.alpha = lerp(num3.alpha, 255, 0.12);
    }
    if (stepTimer > 15) {
      num2.active = true;
      num2.x = lerp(num2.x, num2.tX, 0.12);
      num2.y = lerp(num2.y, num2.tY, 0.12);
      num2.scale = lerp(num2.scale, 1.0, 0.12);
      num2.alpha = lerp(num2.alpha, 255, 0.12);
    }
    if (stepTimer > 30) {
      num1.active = true;
      num1.x = lerp(num1.x, num1.tX, 0.12);
      num1.y = lerp(num1.y, num1.tY, 0.12);
      num1.scale = lerp(num1.scale, 1.0, 0.12);
      num1.alpha = lerp(num1.alpha, 255, 0.12);
    }
    if (stepTimer > 70) { step = 4; stepTimer = 0; }
    
  } else if (step === 4) {
    boxProgress = 1.0;
    num3.x = num3.tX; num3.y = num3.tY; num3.scale = 1.0; num3.alpha = 255;
    num2.x = num2.tX; num2.y = num2.tY; num2.scale = 1.0; num2.alpha = 255;
    num1.x = num1.tX; num1.y = num1.tY; num1.scale = 1.0; num1.alpha = 255;
    

    b1x = lerp(b1x, 95, 0.1);  b1y = lerp(b1y, 90, 0.1);
    b2x = lerp(b2x, 170, 0.1); b2y = lerp(b2y, 140, 0.1);
    b3x = lerp(b3x, 90, 0.1);  b3y = lerp(b3y, 160, 0.1);
    b4x = lerp(b4x, 150, 0.12); b4y = lerp(b4y, 212, 0.12);
  }




  
  textAlign(LEFT, TOP);
  fill(colNavy);
  textFont('Georgia', 22);
  textStyle(BOLD);
  text("偉大なる平凡人たれ", 240, 50);
  
  
  textFont('Arial', 40);
  text("th", 480, 130); 


  textFont('Arial', 38);
  textStyle(BOLD);
  text("Anniversary", textX1, 190);
  
  fill(colWine);
  textFont('Arial', 22);
  textStyle(BOLD);
  text("SINCE 1928", textX2, 240);
  
  textFont('Hiragino Kaku Gothic ProN', 'Meiryo', 24);
  textStyle(BOLD);
  text("学校法人大阪産業大学", textX3, 285);

  
  if (step >= 2) {
    push();
    translate(130, 230);
    strokeWeight(12);
    noFill();
    strokeCap(SQUARE);
    strokeJoin(MITER);
    

    let offsetO = (1.0 - boxProgress) * -50;
    let offsetS = (1.0 - boxProgress) * 40;
    let offsetU = (1.0 - boxProgress) * -30;
    
    stroke(colWine);
    push();
    translate(0, offsetO); 
    beginShape();
    vertex(0, -55);
    vertex(65, -30);
    vertex(0, -5);
    vertex(-65, -30);
    endShape(CLOSE);
    pop();
    
  
    stroke(colNavy);
    push();
    translate(offsetS, 0); 
    beginShape();
    vertex(-5, 10);
    vertex(-75, -15);
    vertex(-75, -5);
    vertex(-10, 60);
    vertex(-10, 70);
    vertex(-80, 35);
    endShape();
    pop();
    
    stroke(colBlue);
    push();
    translate(0, offsetU); 
    beginShape();
    vertex(75, -25);
    vertex(75, 35);
    vertex(10, 70);
    vertex(10, 5);
    endShape();
    pop();
    pop();
  }


  textFont('Arial', 120);
  textStyle(BOLD);
  
  if (num1.active) {
    fill(130, 28, 33, num1.alpha);
    push();
    translate(num1.x, num1.y);
    scale(num1.scale);
    text("1", 0, 0);
    pop();
  }
  
  if (num2.active) {
    fill(130, 28, 33, num2.alpha);
    push();
    translate(num2.x, num2.y);
    scale(num2.scale);
    text("0", 0, 0);
    pop();
  }
  

  if (num3.active) {
    fill(130, 28, 33, num3.alpha);
    push();
    translate(num3.x, num3.y);
    scale(num3.scale);
    text("0", 0, 0);
    pop();
  }
  
  if (step === 4) {
    noStroke();
    
  
    fill(colWine);
    ellipse(b1x, b1y, 55, 55);
    

    fill(colNavy);
    ellipse(b2x, b2y, 45, 45);
    
    
    fill(colBlue);
    ellipse(b3x, b3y, 30, 30);
    
  
    fill(colWine);
    ellipse(b4x, b4y, 20, 20);
  }
}
