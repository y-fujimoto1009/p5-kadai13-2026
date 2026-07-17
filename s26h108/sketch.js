let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {

  background(255);

  t++;

  //------------------------
  // 上の丸
  //------------------------

  noStroke();

  fill(130, 28, 33);

  let p1 = constrain(t / 60, 0, 1);
  circle(lerp(0, 120, p1), lerp(480, 90, p1), 60);

  fill(18, 51, 89);

  let p2 = constrain((t - 30) / 60, 0, 1);
  circle(lerp(0, 185, p2), lerp(480, 145, p2), 60);

  fill(0, 84, 145);

  let p3 = constrain((t - 50) / 60, 0, 1);
  circle(lerp(0, 120, p3), lerp(480, 165, p3), 35);


  //------------------------
  // ロゴ本体
  //------------------------

  if (t > 60) {

    let p = constrain((t - 60) / 60, 0, 1);

    stroke(130, 28, 33);
    strokeWeight(12);

    line(
      lerp(0, 80, p), lerp(480, 230, p),
      lerp(0, 160, p), lerp(480, 190, p)
    );

    line(
      lerp(0, 160, p), lerp(480, 190, p),
      lerp(0, 240, p), lerp(480, 230, p)
    );

    line(
      lerp(0, 240, p), lerp(480, 230, p),
      lerp(0, 160, p), lerp(480, 270, p)
    );

    line(
      lerp(0, 160, p), lerp(480, 270, p),
      lerp(0, 80, p), lerp(480, 230, p)
    );
  }


  //------------------------
  // 青い部分 S
  //------------------------

  if (t > 120) {

    let p = constrain((t - 120) / 60, 0, 1);

    stroke(18, 51, 89);
    strokeWeight(12);

    line(
      lerp(0, 80, p), lerp(480, 250, p),
      lerp(0, 155, p), lerp(480, 287, p)
    );

    line(
      lerp(0, 80, p), lerp(480, 250, p),
      lerp(0, 155, p), lerp(480, 350, p)
    );

    line(
      lerp(0, 155, p), lerp(480, 350, p),
      lerp(0, 80, p), lerp(480, 313, p)
    );
  }


  //------------------------
  // 青い部分 U
  //------------------------

  if (t > 150) {

    let p = constrain((t - 150) / 60, 0, 1);

    stroke(0, 84, 145);
    strokeWeight(12);

    line(
      lerp(0, 170, p), lerp(480, 350, p),
      lerp(0, 170, p), lerp(480, 287, p)
    );

    line(
      lerp(0, 170, p), lerp(480, 350, p),
      lerp(0, 240, p), lerp(480, 313, p)
    );

    line(
      lerp(0, 240, p), lerp(480, 313, p),
      lerp(0, 240, p), lerp(480, 250, p)
    );
  }


  //------------------------
  // 中央の赤丸
  //------------------------

  if (t > 180) {

    let p = constrain((t - 180) / 60, 0, 1);

    noStroke();

    fill(130, 28, 33);

    circle(
      lerp(0, 175, p),
      lerp(480, 215, p),
      30
    );
  }


  //------------------------
  // キャッチコピー
  //------------------------

  if (t > 210) {

    let p = constrain((t - 210) / 60, 0, 1);

    fill(20, 50, 90);
    textSize(32);

    text(
      "偉大なる平凡人たれ",
      lerp(0, 310, p),
      lerp(480, 90, p)
    );
  }


  //------------------------
  // 100th
  //------------------------

  if (t > 230) {

    let p = constrain((t - 230) / 60, 0, 1);

    fill(130, 28, 33);

    textSize(120);

    text(
      "100",
      lerp(0, 330, p),
      lerp(480, 220, p)
    );

    textSize(60);

    text(
      "th",
      lerp(0, 540, p),
      lerp(480, 220, p)
    );
  }


  //------------------------
  // Anniversary
  //------------------------

  if (t > 250) {

    let p = constrain((t - 250) / 60, 0, 1);

    textSize(42);

    text(
      "Anniversary",
      lerp(0, 330, p),
      lerp(480, 300, p)
    );
  }


  //------------------------
  // Since
  //------------------------

  if (t > 270) {

    let p = constrain((t - 270) / 60, 0, 1);

    textSize(28);

    text(
      "SINCE 1928",
      lerp(0, 390, p),
      lerp(480, 340, p)
    );
  }


  //------------------------
  // 学校名
  //------------------------

  if (t > 290) {

    let p = constrain((t - 290) / 60, 0, 1);

    textSize(32);

    text(
      "学校法人大阪産業大学",
      lerp(0, 300, p),
      lerp(480, 400, p)
    );
  }

}
