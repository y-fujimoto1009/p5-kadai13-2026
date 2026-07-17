let x = -300;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);

  if (x < 60) {
    x = x + 2;
  }

  noStroke();

  // 上の丸
  fill(145, 25, 35);
  ellipse(x + 80, 90, 45, 45);

  fill(0, 95, 170);
  ellipse(x + 55, 150, 28, 28);

  fill(30, 70, 130);
  ellipse(x + 120, 140, 38, 38);

  // 赤い上面
  fill(145, 25, 35);
  quad(x + 30, 190,
       x + 90, 165,
       x + 165, 190,
       x + 105, 215);
 // S (blue)
fill(0,70,150);

quad(x+35,210, x+95,210, 
     x+85,225, x+25,225); // အပေါ်
quad(x+25,225, x+40,225, 
     x+40,255, x+25,255); // ဘယ်
quad(x+25,255, x+85,255,
     x+75,270, x+15,270); // အလယ်
quad(x+75,270, x+90,270, 
     x+90,300, x+75,300); // ညာ
quad(x+15,300, x+75,300, 
     x+65,315, x+5,315); // အောက်

// U (blue)
quad(x+105,210, x+120,210,
     x+120,300, x+105,300); // ဘယ်တိုင်
quad(x+150,210, x+165,210,
     x+165,300, x+150,300); // ညာတိုင်
quad(x+105,285, x+165,285,
     x+155,315, x+115,315); // အောက်


  // 白
  fill(255);
  quad(x + 48, 190,
       x + 92, 173,
       x + 148, 190,
       x + 103, 206);

  // 真ん中の丸
  fill(145,25,35);
  ellipse(x + 118,188,18,18);

  

  // 白線
  stroke(255);
  strokeWeight(4);
  line(x+90,245,x+90,280);
  noStroke();

  // ----------文字----------

  fill(40);

  textSize(24);
  text("偉大なる平凡人たれ",x+220,95);

  fill(145,25,35);

  textSize(95);
  text("100",x+220,205);

  textSize(45);
  text("th",x+405,195);

  textSize(38);
  text("Anniversary",x+220,255);

  textSize(24);
  text("SINCE 1928",x+270,290);

  textSize(24);
  text("学校法人大阪産業大学",x+205,330);
}
