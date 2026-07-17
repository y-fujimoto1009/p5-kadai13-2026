let t = 0;

function setup() {
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  background(255);
  t++;

  // 進行度合いを計算する変数（0〜1の範囲に制限）
  let p1 = constrain(t / 40, 0, 1);
  let p2 = constrain((t - 15) / 40, 0, 1);
  let p3 = constrain((t - 30) / 40, 0, 1);
  
  //------------------------
  // 上の丸 (ポンッと弾けて現れる)
  //------------------------
  noStroke();
  fill(130,28,33);
  circle(120, 90, 60 * easeOutBack(p1)); // 赤
  fill(18,51,89);
  circle(185, 145, 60 * easeOutBack(p2)); // 濃紺
  fill(0,84,145);
  circle(120, 165, 35 * easeOutBack(p3)); // 青

  //------------------------
  // ロゴ本体 (線が滑らかに伸びる)
  //------------------------
  let p4 = constrain((t - 40) / 60, 0, 1);
  let e4 = easeOutQuart(p4);
  
  if (p4 > 0) {
    strokeWeight(12);
    stroke(130,28,33);
    line(80, 230, lerp(80, 160, e4), lerp(230, 190, e4));
    line(160, 190, lerp(160, 240, e4), lerp(190, 230, e4));
    line(240, 230, lerp(240, 160, e4), lerp(230, 270, e4));
    line(160, 270, lerp(160, 80, e4), lerp(270, 230, e4));
  }

  //------------------------
  // 青い部分 (SとUが一筆書きのように滑らかに引かれる)
  //------------------------
  let p5 = constrain((t - 90) / 50, 0, 1);
  let e5 = easeOutQuart(p5);
  if (p5 > 0) {
    //"S"
    stroke(18,51,89);
    strokeWeight(12);
    line(80, 250, lerp(80, 155, e5), lerp(250, 287, e5));
    line(80, 250, lerp(80, 155, e5), lerp(250, 350, e5));
    line(155, 350, lerp(155, 80, e5), lerp(350, 313, e5));
  }
  
  let p6 = constrain((t - 130) / 50, 0, 1);
  let e6 = easeOutQuart(p6);
  if (p6 > 0) {
    //"U"
    stroke(0,84,145);
    strokeWeight(12);
    line(170, 350, lerp(170, 170, e6), lerp(350, 287, e6));
    line(170, 350, lerp(170, 240, e6), lerp(350, 313, e6));
    line(240, 313, lerp(240, 240, e6), lerp(313, 250, e6));
  }

  //------------------------
  // 中央の赤丸 (最後にポンッと現れる)
  //------------------------
  let p7 = constrain((t - 160) / 40, 0, 1);
  if(p7 > 0){
    strokeWeight(3);
    stroke(255,255,255);
    fill(130,28,33);
    circle(175, 215, 30 * easeOutBack(p7));
  }

  noStroke();
  //------------------------
  // キャッチコピー
  //------------------------
  if(t>210){
    fill(20,50,90);
    textSize(32);
    text("偉大なる平凡人たれ",310,90);
  }

  //------------------------
  // 100th
  //------------------------
  if(t>230){
    fill(130,28,33);
    textSize(120);
    text("100",min(330,150+t),220);
    textSize(60);
    text("th",min(540,360+t),220);
  }

  //------------------------
  // Anniversary
  //------------------------
  if(t>250){
    textSize(42);
    text("Anniversary",330,300);
  }

  //------------------------
  // Since
  //------------------------
  if(t>270){
    textSize(28);
    text("SINCE 1928",390,340);
  }

  //------------------------
  // 学校名
  //------------------------
  if(t>290){
    textSize(32);
    text("学校法人大阪産業大学",300,400);
  }
}

// ＝＝＝ アニメーションを滑らかにするための計算関数群 ＝＝＝

// ポンッと少しオーバーして戻る動き（バウンス）
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
}

// 最初は速く、最後にスッと遅くなる動き
function easeOutQuart(x) {
  return 1 - pow(1 - x, 4);
}
