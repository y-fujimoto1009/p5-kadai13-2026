let t = 0;

// Хөдөлгөөнийг зөөлөн болгох функц (эхэндээ хурдан, төгсгөлд удаан)
function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}

// Эх цэг - ХАМГИЙН ЭХНИЙ (улаан) тойргийн байрлал
// Бусад бүх дүрс энэ цэгээс эхэлж тархана
let originX = 120;
let originY = 90;

function setup() {
  createCanvas(746, 480);
  textFont("Clash Display");
}

function draw() {
  background(255);
  t++;
  
  if (t > 10) {
    let progress = constrain((t - 10) / 30, 0, 1);
    let a = easeOutCubic(progress) * 255;

    noStroke();
    fill(20, 50, 90, a);
    textSize(32);
    text("偉大なる平凡人たれ", 310, 90);
  }
  if(t>100){

    fill(130,28,33);
    textSize(120);
    text("100",min(330,150+t),220);
    textSize(60);
    text("th",min(540,360+t),220);

  }
  if (t > 100) {
    let progress = constrain((t - 100) / 25, 0, 1);
    let a = easeOutCubic(progress) * 255;

    noStroke();
    fill(20, 50, 90, a);
    textSize(42);
    text("Anniversary", 330, 300);
  }

  if (t > 120) {
    let progress = constrain((t - 120) / 25, 0, 1);
    let a = easeOutCubic(progress) * 255;

    noStroke();
    fill(20, 50, 90, a);
    textSize(28);
    text("SINCE 1928", 390, 340);
  }

  

  // 1. ЭХНИЙ УЛААН ТОЙРОГ (t=0-25) - өөрийн байранд шууд гарна
  if (t > 0) {
    let progress = constrain(t / 25, 0, 1);
    let d = easeOutCubic(progress) * 60; 
    // 0-ээс жинхэнэ хэмжээ (60) хүртэл

    noStroke();
    fill(130, 28, 33);
    circle(originX, originY, d);
  }

  // 2. ҮЛДСЭН 2 ТОЙРОГ - эхний тойргоос тархана (t>25)
  let circleStart = 25;
  if (t > circleStart) {
    let progress = constrain((t - circleStart) / 45, 0, 1);
    let e = easeOutCubic(progress);
    let a = e * 255;

    noStroke();

    // Хар цэнхэр тойрог
    let x2 = lerp(originX, 185, e);
    let y2 = lerp(originY, 145, e);
    fill(18, 51, 89, a);
    circle(x2, y2, 60 * e);

    // Цэнхэр жижиг тойрог
    let x3 = lerp(originX, 120, e);
    let y3 = lerp(originY, 165, e);
    fill(0, 84, 145, a);
    circle(x3, y3, 35 * e);
  }

  // 2. РОМБ (куб-ийн дээд тал) - хар цэгээс тэлнэ (t>50)
  let diamondStart = 25;
  if (t > diamondStart) {
    let progress = constrain((t - diamondStart) / 40, 0, 1);
    let e = easeOutCubic(progress);
    let a = e * 255;

    noFill();
    strokeWeight(12);
    stroke(130, 28, 33, a);

    let topX = lerp(originX, 160, e), topY = lerp(originY, 190, e);
    let rightX = lerp(originX, 240, e), rightY = lerp(originY, 230, e);
    let botX = lerp(originX, 160, e), botY = lerp(originY, 270, e);
    let leftX = lerp(originX, 80, e), leftY = lerp(originY, 230, e);

    line(leftX, leftY, topX, topY);
    line(topX, topY, rightX, rightY);
    line(rightX, rightY, botX, botY);
    line(botX, botY, leftX, leftY);
  }

  // 3. "S" ХЭЛБЭР - хар цэгээс үүснэ (t>90)
  let sStart = 25;
  if (t > sStart) {
    let progress = constrain((t - sStart) / 30, 0, 1);
    let e = easeOutCubic(progress);
    let a = e * 255;

    strokeWeight(12);
    stroke(18, 51, 89, a);

    let p1x = lerp(originX, 80, e), p1y = lerp(originY, 250, e);
    let p2x = lerp(originX, 155, e), p2y = lerp(originY, 287, e);
    let p3x = lerp(originX, 155, e), p3y = lerp(originY, 350, e);
    let p4x = lerp(originX, 80, e), p4y = lerp(originY, 313, e);

    line(p1x, p1y, p2x, p2y);
    line(p1x, p1y, p3x, p3y);
    line(p3x, p3y, p4x, p4y);
  }

  // 4. "U" ХЭЛБЭР - хар цэгээс үүснэ (t>110)
  let uStart = 25;
  if (t > uStart) {
    let progress = constrain((t - uStart) / 30, 0, 1);
    let e = easeOutCubic(progress);
    let a = e * 255;

    strokeWeight(12);
    stroke(0, 84, 145, a);

    let p1x = lerp(originX, 170, e), p1y = lerp(originY, 350, e);
    let p2x = lerp(originX, 170, e), p2y = lerp(originY, 287, e);
    let p3x = lerp(originX, 240, e), p3y = lerp(originY, 313, e);
    let p4x = lerp(originX, 240, e), p4y = lerp(originY, 250, e);

    line(p1x, p1y, p2x, p2y);
    line(p1x, p1y, p3x, p3y);
    line(p3x, p3y, p4x, p4y);
  }

  // 5. ТӨВ ДЭХ ЖИЖИГ УЛААН ТОЙРОГ (t>140, сүүлд гарна)
  if (t > 140) {
    let progress = constrain((t - 140) / 20, 0, 1);
    let d = easeOutCubic(progress) * 30;

    strokeWeight(3);
    stroke(255);
    fill(130, 28, 33);
    circle(175, 215, d);
  }
}
