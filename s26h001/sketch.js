let t = 0;

// Global Variables for Elements Geometry
let logoX = 160;
let logoY = 240;
let circleSize1 = 60, circleSize2 = 60, circleSize3 = 35, circleSize4 = 30;

// Global Variables for Advanced Dynamic Physics (Animations)
let laserCut = 0;
let cubeScale = 0;
let sLineGrow = 0;
let uLineGrow = 0;
let cGrow1 = 0, cGrow2 = 0, cGrow3 = 0, cGrow4 = 0;

// Global Variables for Advanced Typography Morphing
let alphaT1 = 0, alphaT2 = 0, alphaT3 = 0, alphaT4 = 0, alphaT5 = 0;
let yOffsetT1 = 50, yOffsetT2 = 50, yOffsetT3 = 50, yOffsetT4 = 50, yOffsetT5 = 50;

function setup() {
  createCanvas(746, 480);
  textFont("Helvetica, sans-serif"); // Clean, high-end professional font
}

function draw() {
  background(10, 15, 30); // Premium Deep Cyber Space Background
  t += 1;

  // Global Organic Fluid Floating Effect
  let waveEffect = sin(t * 0.04) * 6;
  let waveRotate = cos(t * 0.02) * 0.02;

  // ====================================================
  // 1. ADVANCED LOGO REVEAL (Laser Cutting & Elastic Physics)
  // ====================================================
  push();
  translate(logoX, logoY + waveEffect);
  rotate(waveRotate);

  // --- LASER EFFECTS: Top Diamond Box Cover ---
  if (t > 20 && laserCut < 1.0) { laserCut += 0.03; }
  if (t > 20) {
    strokeWeight(8);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    noFill();
    
    // Cyberpunk Neon Red Outline with Glow
    stroke(255, 75, 75, 50); strokeWeight(16);
    quad(0, -50, 80, -15, 0, 20, -80, -15); // Outer Glow
    
    stroke(255, 50, 50); strokeWeight(8);
    let l = laserCut;
    beginShape();
    if (l > 0) vertex(0, -50);
    if (l > 0.25) vertex(lerp(0, 80, map(l, 0.25, 0.5, 0, 1, true)), lerp(-50, -15, map(l, 0.25, 0.5, 0, 1, true)));
    if (l > 0.5)  vertex(lerp(80, 0, map(l, 0.5, 0.75, 0, 1, true)), lerp(-15, 20, map(l, 0.5, 0.75, 0, 1, true)));
    if (l > 0.75) vertex(lerp(0, -80, map(l, 0.75, 1.0, 0, 1, true)), lerp(20, -15, map(l, 0.75, 1.0, 0, 1, true)));
    if (l >= 1.0) vertex(0, -50);
    endShape(CLOSE);
  }

  // --- CYAN NEON LINES: "S" Shape Growth ---
  if (t > 60 && sLineGrow < 1.0) { sLineGrow += 0.04; }
  if (t > 60) {
    stroke(0, 240, 255); // Cyber Cyan Neon
    strokeWeight(10);
    let sg = sLineGrow;
    
    if (sg > 0) line(-80, 0, lerp(-80, -5, min(sg * 3, 1)), lerp(0, 37, min(sg * 3, 1)));
    if (sg > 0.33) line(-80, 0, lerp(-80, -5, map(sg, 0.33, 0.66, 0, 1, true)), lerp(0, 100, map(sg, 0.33, 0.66, 0, 1, true)));
    if (sg > 0.66) line(-5, 100, lerp(-5, -80, map(sg, 0.66, 1.0, 0, 1, true)), lerp(100, 63, map(sg, 0.66, 1.0, 0, 1, true)));
  }

  // --- BLUE NEON LINES: "U" Shape Growth ---
  if (t > 90 && uLineGrow < 1.0) { uLineGrow += 0.04; }
  if (t > 90) {
    stroke(30, 100, 255); // Electric Royal Blue
    strokeWeight(10);
    let ug = uLineGrow;
    
    if (ug > 0) line(10, 100, lerp(10, 10, min(ug * 3, 1)), lerp(10, 37, min(ug * 3, 1)));
    if (ug > 0.33) line(10, 100, lerp(10, 80, map(ug, 0.33, 0.66, 0, 1, true)), lerp(100, 63, map(ug, 0.33, 0.66, 0, 1, true)));
    if (ug > 0.66) line(80, 63, lerp(80, 80, map(ug, 0.66, 1.0, 0, 1, true)), lerp(63, 0, map(ug, 0.66, 1.0, 0, 1, true)));
  }

  // --- ORB POPPING: Circles Expansion ---
  noStroke();
  
  // Top Large Red Circle
  if (t > 130 && cGrow1 < 1.0) { cGrow1 += (1.0 - cGrow1) * 0.1; }
  if (cGrow1 > 0.01) {
    push(); translate(-40, -150); scale(cGrow1);
    fill(255, 50, 50, 50); circle(0, 0, circleSize1 + 20); // Aura
    fill(230, 40, 45); circle(0, 0, circleSize1);
    pop();
  }

  // Right Blue Circle
  if (t > 150 && cGrow2 < 1.0) { cGrow2 += (1.0 - cGrow2) * 0.1; }
  if (cGrow2 > 0.01) {
    push(); translate(25, -95); scale(cGrow2);
    fill(30, 100, 255, 60); circle(0, 0, circleSize2 + 15);
    fill(25, 60, 120); circle(0, 0, circleSize2);
    pop();
  }

  // Left Small Blue Circle
  if (t > 170 && cGrow3 < 1.0) { cGrow3 += (1.0 - cGrow3) * 0.1; }
  if (cGrow3 > 0.01) {
    push(); translate(-40, -75); scale(cGrow3);
    fill(0, 200, 255, 70); circle(0, 0, circleSize3 + 10);
    fill(0, 130, 200); circle(0, 0, circleSize3);
    pop();
  }

  // Inside Box Red Circle
  if (t > 190 && cGrow4 < 1.0) { cGrow4 += (1.0 - cGrow4) * 0.12; }
  if (cGrow4 > 0.01) {
    push(); translate(15, -25); scale(cGrow4);
    stroke(255, 255, 255, 200); strokeWeight(2);
    fill(255, 50, 50); circle(0, 0, circleSize4);
    pop();
  }
  pop();

  // ====================================================
  // 2. MORPHING TYPOGRAPHY (Rise & Spatial Expansion)
  // ====================================================
  noStroke();
  textAlign(LEFT, TOP);

  // F - Top Japanese Phrase (Elegant Slate White)
  if (t > 220) {
    alphaT1 = min(200, alphaT1 + 8);
    yOffsetT1 = max(0, yOffsetT1 + (0 - yOffsetT1) * 0.1);
    fill(226, 232, 240, alphaT1);
    textSize(30);
    text("偉大なる平凡人たれ", 370, 95 + yOffsetT1 + waveEffect * 0.5);
  }

  // G - "100th" Cinematic Statement
  if (t > 250) {
    alphaT2 = min(255, alphaT2 + 10);
    yOffsetT2 = max(0, yOffsetT2 + (0 - yOffsetT2) * 0.1);
    fill(255, 75, 75, alphaT2); // Liquid Red Neon text
    
    textSize(115);
    textStyle(BOLD);
    text("100", 370, 140 + yOffsetT2 + waveEffect * 0.6);
    
    textSize(55);
    text("th", 580, 145 + yOffsetT2 + waveEffect * 0.6);
    textStyle(NORMAL);
  }

  // H - "Anniversary" Modern Subtitle
  if (t > 280) {
    alphaT3 = min(200, alphaT3 + 8);
    yOffsetT3 = max(0, yOffsetT3 + (0 - yOffsetT3) * 0.1);
    fill(226, 232, 240, alphaT3);
    textSize(40);
    textStyle(BOLD);
    text("Anniversary", 370, 275 + yOffsetT3 + waveEffect * 0.5);
    textStyle(NORMAL);
  }

  // I - "SINCE 1928" Tech Data Label
  if (t > 300) {
    alphaT4 = min(120, alphaT4 + 8);
    yOffsetT4 = max(0, yOffsetT4 + (0 - yOffsetT4) * 0.1);
    fill(148, 163, 184, alphaT4); // Soft Tech Gray
    textSize(24);
    text("S I N C E   1 9 2 8", 375, 335 + yOffsetT4 + waveEffect * 0.4);
  }

  // J - Bottom School Name Branding
  if (t > 320) {
    alphaT5 = min(255, alphaT5 + 10);
    yOffsetT5 = max(0, yOffsetT5 + (0 - yOffsetT5) * 0.1);
    fill(255, 90, 90, alphaT5);
    textSize(30);
    textStyle(BOLD);
    text("学校法人大阪産業大学", 370, 385 + yOffsetT5 + waveEffect * 0.3);
    textStyle(NORMAL);
  }
}
