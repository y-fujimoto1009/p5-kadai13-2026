let frameCountTimer = 0;

// タイプライター風演出用の変数
let textIndex = 0;
let fullText = "偉大なる平凡人たれ";

function setup() {
  // ルール: キャンバスサイズは 746×480
  createCanvas(746, 480);
  textFont("sans-serif");
}

function draw() {
  // ルール: 背景色は白
  background(255);
  
  // 毎フレームタイマーを進める
  frameCountTimer++;
  
  // 全体の基準座標
  let logoX = 160;     // 左側ロゴのX中心
  let centerY = 240;   // 全体のY中心
  let textX = 310;     // 右側テキストの開始X座標

  // ==========================================
  // 1. 3つの円のアニメーション（時間差でスムーズに拡大）
  // ==========================================
  noStroke();
  
  // ① 左上のエンジ丸（サイズ: 60）
  if (frameCountTimer > 10) {
    let t1 = constrain((frameCountTimer - 10) / 25, 0, 1);
    let size1 = 60 * easeOutBack(t1);
    fill(130, 28, 33);
    circle(logoX - 40, centerY - 150, size1);
  }
  
  // ② 右の紺丸（サイズ: 60）
  if (frameCountTimer > 25) {
    let t2 = constrain((frameCountTimer - 25) / 25, 0, 1);
    let size2 = 60 * easeOutBack(t2);
    fill(18, 51, 89);
    circle(logoX + 25, centerY - 95, size2);
  }
  
  // ③ 左下の青丸（サイズ: 35）
  if (frameCountTimer > 40) {
    let t3 = constrain((frameCountTimer - 40) / 25, 0, 1);
    let size3 = 35 * easeOutBack(t3);
    fill(0, 84, 145);
    circle(logoX - 40, centerY - 75, size3);
  }

  // ==========================================
  // 2. ボックス・立体ロゴ（一筆書きのように線が伸びる演出）
  // ==========================================
  strokeWeight(12);
  noFill();
  strokeCap(ROUND);
  strokeJoin(ROUND);
  
  // ひし形外枠の描画（フレーム）
  if (frameCountTimer > 60) {
    stroke(130, 28, 33); // エンジ色
    let tBox = constrain((frameCountTimer - 60) / 45, 0, 1);
    
    let p = [
      {x: 80,  y: 230}, // 左
      {x: 160, y: 190}, // 上
      {x: 240, y: 230}, // 右
      {x: 160, y: 270}  // 下
    ];
    drawContinuousLines(p, tBox, true); 
  }
  
  // 内側の "S" マークの描画
  if (frameCountTimer > 110) {
    stroke(18, 51, 89); // 紺色
    let tS = constrain((frameCountTimer - 110) / 35, 0, 1);
    
    let pS = [
      {x: 155, y: 287},
      {x: 80,  y: 250},
      {x: 155, y: 350},
      {x: 80,  y: 313}
    ];
    drawContinuousLines(pS, tS, false);
  }
  
  // 内側の "U" マークの描画
  if (frameCountTimer > 140) {
    stroke(0, 84, 145); // 青色
    let tU = constrain((frameCountTimer - 140) / 35, 0, 1);
    
    let pU = [
      {x: 170, y: 287},
      {x: 170, y: 350},
      {x: 240, y: 313},
      {x: 240, y: 250}
    ];
    drawContinuousLines(pU, tU, false);
  }

  // 中央の赤丸（立体ボックス内の小さなドット）
  if (frameCountTimer > 175) {
    let tDot = constrain((frameCountTimer - 175) / 20, 0, 1);
    let dotSize = 22 * easeOutBack(tDot);
    
    // 【修正部分】さらに細く、より馴染む細さ（2）に再調整
    stroke(255);         // 白色
    strokeWeight(3);     // 主張しすぎない極細枠に設定
    
    fill(130, 28, 33);   // エンジ色
    circle(175, 215, dotSize + 7);
    
    noStroke();          // 後続の描画に影響が出ないようにリセット
  }

  // ==========================================
  // 3. 右側テキストのアニメーション描画
  // ==========================================
  noStroke();
  
  // ① 偉大なる平凡人たれ（タイプライター風演出）
  if (frameCountTimer > 200) {
    fill(20, 50, 90);
    textSize(32);
    textStyle(NORMAL);
    
    // 8フレームごとに1文字ずつ増やす
    if (frameCountTimer % 8 === 0 && textIndex < fullText.length) {
      textIndex++;
    }
    let currentText = fullText.substring(0, textIndex);
    text(currentText, textX, 90);
  }
  
  // ② 100th（綺麗にフェードイン）
  if (frameCountTimer > 220) {
    let alpha100 = map(frameCountTimer, 220, 250, 0, 255, true);
    fill(130, 28, 33, alpha100);
    textStyle(BOLD);
    
    textSize(120);
    text("100", textX + 5, 220);
    textSize(60);
    text("th", textX + 220, 220);
  }
  
  // ③ Anniversary（フェードイン）
  if (frameCountTimer > 240) {
    let alphaAnniv = map(frameCountTimer, 240, 270, 0, 255, true);
    fill(130, 28, 33, alphaAnniv);
    textSize(42);
    textStyle(BOLD);
    text("Anniversary", textX + 20, 300);
  }
  
  // ④ SINCE 1928（フェードイン）
  if (frameCountTimer > 260) {
    let alphaSince = map(frameCountTimer, 260, 290, 0, 255, true);
    fill(130, 28, 33, alphaSince);
    textSize(28);
    textStyle(BOLD);
    text("SINCE 1928", textX + 60, 340);
  }
  
  // ⑤ 学校法人大阪産業大学（フェードイン）
  if (frameCountTimer > 280) {
    let alphaUniv = map(frameCountTimer, 280, 310, 0, 255, true);
    fill(130, 28, 33, alphaUniv);
    textSize(32);
    textStyle(NORMAL);
    text("学校法人大阪産業大学", textX - 20, 380);
  }
}

// --- 補助用のアニメーション関数 ---

// 一筆書きのように線を引き延ばしてドローイングする関数
function drawContinuousLines(points, progress, closeLoop) {
  let segments = points.length - (closeLoop ? 0 : 1);
  let currentProgress = progress * segments;
  
  for (let i = 0; i < segments; i++) {
    let p1 = points[i];
    let p2 = points[(i + 1) % points.length];
    
    if (currentProgress > i) {
      let segmentProgress = min(currentProgress - i, 1.0);
      let xEnd = lerp(p1.x, p2.x, segmentProgress);
      let yEnd = lerp(p1.y, p2.y, segmentProgress);
      line(p1.x, p1.y, xEnd, yEnd);
    }
  }
}

// ポップアップで弾むイージング（Back Out）
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
}
