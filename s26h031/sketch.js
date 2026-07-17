let circles = [];
let t = 0; // アニメーションの進行度を管理するカウンタ

function setup() {
  // 指定されたサイズでキャンバスを作成
  createCanvas(746, 480);
  strokeCap(ROUND); // 線の端を丸くする
  strokeJoin(ROUND); // 線の結合部を丸くする

  // カラー定義
  let brandRed = color(139, 27, 36);   // 深い赤
  let brandBlue = color(10, 71, 131);  // 深い青
  let lightBlue = color(20, 110, 180); // 明るい青

  // 4つの円の初期設定
  let startX = 199;
  let startY = 250;

  // 1. ボックスの上の小さな赤丸 (目標 X:199, Y:230, size:29) ※枠線あり
  circles.push(new TargetCircle(startX, startY, 199, 230, 29, brandRed, true));
  
  // 2. 左上の大きな赤丸 (目標 X:129, Y:100, size:85)
  circles.push(new TargetCircle(startX, startY, 129, 100, 85, brandRed, false));
  
  // 3. 中央左の明るい青丸 (目標 X:126, Y:190, size:54)
  circles.push(new TargetCircle(startX, startY, 126, 190, 54, lightBlue, false));
  
  // 4. 中央右の濃い青丸 (目標 X:226, Y:152, size:73)
  circles.push(new TargetCircle(startX, startY, 226, 152, 73, brandBlue, false));
}

function draw() {
  background(255); // 背景は白

  // カラー定義
  let brandRed = color(139, 27, 36);   // 深い赤
  let brandBlue = color(10, 71, 131);  // 深い青
  let lightBlue = color(20, 110, 180); // 明るい青

  // 【変更点】文字フェードインの余韻を持たせるため、カウントの上限を150まで伸ばします
  if (t < 150) {
    t += 0.8; // スピード調整用
  }
  
  // 文字の進捗（tが0〜100の間で0.0から1.0まで変化）
  let progress = constrain(t / 100, 0, 1);

  // ==========================================
  // 1. 左側：立体ロゴマークの描画（アニメーション化）
  // ==========================================
  push();
  translate(180, 290); 

  // ① O の描画 (上部のひし形：赤の枠線)
  stroke(brandRed);
  strokeWeight(15);
  noFill();
  let pO = [
    {x: 0, y: -85},   
    {x: 93, y: -42},  
    {x: 0, y: 0},      
    {x: -93, y: -42}
  ];
  drawAnimatedPath(pO, progress, true); 

  // ② S の描画 (左側のクランクしたライン：濃い青)
  stroke(brandBlue);
  strokeWeight(15);
  noFill();
  let pS = [
    {x: -10, y: 20},
    {x: -93, y: -20},
    {x: -10, y: 100},
    {x: -93, y: 60}
  ];
  drawAnimatedPath(pS, progress, false);

  // ③ U の描画 (右側のコの字ライン：明るい青、内側から逆向き)
  stroke(lightBlue);
  strokeWeight(15);
  noFill();
  let pU = [
    {x: 10, y: 20},   
    {x: 10, y: 100},
    {x: 93, y: 60},
    {x: 93, y: -20}  
  ];
  drawAnimatedPath(pU, progress, false);
  pop();

  // ==========================================
  // 2. 左上：浮遊する円（ドット）の描画
  // ==========================================
  // 文字が完成（t >= 100）した時だけドットの処理を行う
  if (t >= 120) {
    for (let c of circles) {
      c.update();  
      c.display(); 
    }
  }

  // ==========================================
  // 3. 右側：文字（テキスト）の描画（【変更】グラデーションフェード表示）
  // ==========================================
  if (t >= 100) {
    // 【変更点】tが100から140に増えるにつれて不透明度（0〜255）を滑らかに計算
    let textAlpha = map(t, 100, 140, 0, 255);
    textAlpha = constrain(textAlpha, 0, 255);

    push(); 
    textAlign(LEFT, CENTER);
    textFont('serif'); 
    textStyle(BOLD);

    // 各色のアルファ値を設定
    let cBlue = color(10, 71, 131, textAlpha);
    let cRed = color(139, 27, 36, textAlpha);

    fill(cBlue);
    textSize(27);
    text("偉 大 な る 平 凡 人 た れ", 325, 92);

    textFont('sans-serif');
    fill(cRed);
    textSize(130);
    text("100", 315, 170);

    textSize(54);
    text("th", 555, 193);

    textSize(50);
    text("Anniversary", 325, 278);

    textSize(22);
    text("SINCE 1928", 410, 330);

    fill(cRed);
    textSize(28);
    text("学校法人大阪産業大学", 325, 378);
    pop();
  }
}

// 複数の点を結ぶ経路を、進捗度に応じて滑らかに一本の線で伸ばす関数
function drawAnimatedPath(points, progress, isClosed) {
  if (points.length < 2) return;
  
  let totalSegments = isClosed ? points.length : points.length - 1;
  let currentProgress = progress * totalSegments;
  
  for (let i = 0; i < totalSegments; i++) {
    let pStart = points[i];
    let pEnd = points[(i + 1) % points.length]; 
    
    if (currentProgress >= i + 1) {
      line(pStart.x, pStart.y, pEnd.x, pEnd.y);
    } else if (currentProgress > i) {
      let segProgress = currentProgress - i;
      let targetX = lerp(pStart.x, pEnd.x, segProgress);
      let targetY = lerp(pStart.y, pEnd.y, segProgress);
      line(pStart.x, pStart.y, targetX, targetY);
      break; 
    }
  }
}

// 目標位置に向かって滑らかに移動して止まる円のクラス
class TargetCircle {
  constructor(startX, startY, targetX, targetY, r, c, hasStroke) {
    this.x = startX;
    this.y = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.r = r;
    this.c = c;
    this.hasStroke = hasStroke; 
    this.easing = 0.05;         
  }

  update() {
    let dx = this.targetX - this.x;
    let dy = this.targetY - this.y;
    this.x += dx * this.easing;
    this.y += dy * this.easing;
  }

  display() {
    if (this.hasStroke) {
      stroke(255);
      strokeWeight(3);
    } else {
      noStroke();
    }
    fill(this.c);
    ellipse(this.x, this.y, this.r);
  }
}
