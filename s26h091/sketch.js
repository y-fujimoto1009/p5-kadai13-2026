let phase = 0; // 0: 円の登場, 1: キューブの組み立て, 2: テキストの表示
let frameCountPhase0 = 120;
let frameCountPhase1 = 180;
let frameCountPhase2 = 120;

let circles = [];
let numFinalCircles = 4;

// テキスト描画用の2Dグラフィックス（テクスチャ用）
let textGfx; 

function setup() {
  createCanvas(1200, 800, WEBGL);
  
  // WEBGL内のテキストエラーを避けるため、別バッファ（2Dキャンバス）を作成
  textGfx = createGraphics(600, 400);
  
  // 完成形にある4つの円の初期設定
  let colors = [
    color(165, 42, 42), // 赤（一番上）
    color(25, 25, 112), // 紺（中央上）
    color(0, 102, 204), // 青（左下）
    color(165, 42, 42), // 赤（キューブ内）
  ];
  let initialPositions = [
    { x: -250, y: -160, z: 0 }, 
    { x: -140, y: -100, z: 0 }, 
    { x: -270, y: -50, z: 0 }, 
    { x: -212, y: 35, z: 1 }, 
  ];
  let sizes = [110, 80, 50, 45];

  for (let i = 0; i < numFinalCircles; i++) {
    circles.push({
      currentX: random(-600, 600),
      currentY: random(-400, 400),
      currentZ: random(-500, -200),
      targetX: initialPositions[i].x,
      targetY: initialPositions[i].y,
      targetZ: initialPositions[i].z,
      size: sizes[i],
      color: colors[i],
    });
  }
}

function draw() {
  background(255);

  // 時間経過でフェーズを切り替え
  if (phase === 0 && frameCount > frameCountPhase0) {
    phase = 1;
  } else if (phase === 1 && frameCount > frameCountPhase0 + frameCountPhase1) {
    phase = 2;
  } else if (phase === 2 && frameCount > frameCountPhase0 + frameCountPhase1 + frameCountPhase2) {
    phase = 3;
  }

  // 1. 円の登場アニメーション
  if (phase >= 0) {
    push();
    noStroke();
    for (let i = 0; i < circles.length; i++) {
      let c = circles[i];
      let ease = 0.05;
      c.currentX = lerp(c.currentX, c.targetX, ease);
      c.currentY = lerp(c.currentY, c.targetY, ease);
      c.currentZ = lerp(c.currentZ, c.targetZ, ease);
      
      fill(c.color);
      push();
      translate(c.currentX, c.currentY, c.currentZ);
      ellipse(0, 0, c.size, c.size);
      pop();
    }
    pop();
  }

  // 2. 「NU」の立体ロゴ組み立て
  if (phase >= 1) {
    push();
    translate(-250, 50, 0); 
    
    let progress = map(frameCount, frameCountPhase0, frameCountPhase0 + frameCountPhase1, 0, 1, true);
    let cubeSize = 120 * progress;
    
    // 回転しながら組み上がる
    let targetRotX = PI/6;
    let targetRotY = -PI/4;
    let currentRotX = lerp(PI*2, targetRotX, progress);
    let currentRotY = lerp(-PI*2, targetRotY, progress);
    rotateX(currentRotX);
    rotateY(currentRotY);
    
    // 枠線（赤）
    noFill();
    stroke(165, 42, 42);
    strokeWeight(8 * progress);
    box(cubeSize);
    
    // 青い半透明のコア
    noStroke();
    fill(0, 102, 204, 150 * progress);
    box(cubeSize * 0.8);
    
    pop();
  }

  // 3. 右側テキスト（テクスチャ方式で安全に描画）
  if (phase >= 2) {
    let progress = map(frameCount, frameCountPhase0 + frameCountPhase1, frameCountPhase0 + frameCountPhase1 + frameCountPhase2, 0, 1, true);
    
    // 2Dキャンバスをクリアしてテキストを描画
    textGfx.clear();
    
    // スライドイン＆不透明度の計算
    let opacity = 255 * progress;
    
    // 標語「偉大なる平凡人たれ」
    textGfx.fill(25, 25, 112, opacity);
    textGfx.textSize(32);
    textGfx.textAlign(CENTER, TOP);
    textGfx.textStyle(BOLD);
    textGfx.text('偉大なる平凡人たれ', 300, 30);
    
    // 「100th Anniversary」
    textGfx.fill(165, 42, 42, opacity);
    textGfx.textSize(80);
    textGfx.text('100', 250, 90);
    textGfx.textSize(30);
    textGfx.text('th', 360, 100);
    
    textGfx.textSize(48);
    textGfx.text('Anniversary', 300, 190);
    
    textGfx.textSize(24);
    textGfx.text('SINCE 1928', 300, 250);
    
    // 学校名
    textGfx.textSize(28);
    textGfx.text('学校法人大阪産業大学', 300, 300);
    
    // 2Dで描いたテキストを3D空間に板ポリゴンとして貼り付ける
    push();
    translate(250, -50 + (1.0 - progress) * -100, 1); // スライドイン効果
    texture(textGfx);
    noStroke();
    plane(600, 400); // テクスチャを貼る板
    pop();
  }
}
