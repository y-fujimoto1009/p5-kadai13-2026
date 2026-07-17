let t = 0;

function setup() {
  createCanvas(746, 480);
}

function draw() {
  background(255);
  t++;

  noStroke();

  // Red Circle
  let redY = lerp(0, 90, constrain(t / 40, 0, 1));
  fill(130, 28, 33);
  circle(120, redY, 60);

  // Dark Blue Circle
  if (t > 20) {
    let dBlueY = lerp(0, 145, constrain((t - 20) / 40, 0, 1));
    fill(18, 51, 89);
    circle(185, dBlueY, 60);
  }

  // Light Blue Circle
  if (t > 40) {
    let lBlueY = lerp(0, 165, constrain((t - 40) / 40, 0, 1));
    fill(0, 84, 145);
    circle(120, lBlueY, 35);
  }

  strokeWeight(12);
  let duration = 15; // Number of frames it takes to drag each line

  if (t > 60) {
    stroke(130, 28, 33);

    // Line 1: Drags from (80, 230) to (160, 190)
    let amt1 = constrain((t - 60) / duration, 0, 1);
    line(80, 230, lerp(80, 160, amt1), lerp(230, 190, amt1));
    
    // Line 2: Starts after Line 1 finishes
    if (t > 60 + duration) {
      let amt2 = constrain((t - (60 + duration)) / duration, 0, 1);
      line(160, 190, lerp(160, 240, amt2), lerp(190, 230, amt2));
    }
    
    // Line 3: Starts after Line 2 finishes
    if (t > 60 + (duration * 2)) {
      let amt3 = constrain((t - (60 + (duration * 2))) / duration, 0, 1);
      line(240, 230, lerp(240, 160, amt3), lerp(230, 270, amt3));
    }
    
    // Line 4: Starts after Line 3 finishes
    if (t > 60 + (duration * 3)) {
      let amt4 = constrain((t - (60 + (duration * 3))) / duration, 0, 1);
      line(160, 270, lerp(160, 80, amt4), lerp(270, 230, amt4));
    }
  }

  let segmentDur = 12; // Speed of the text line drags

  // "S" Logo
  if (t > 130) {
    stroke(18, 51, 89);
    strokeWeight(12);

    // S - Seg 1
    let sAmt1 = constrain((t - 130) / segmentDur, 0, 1);
    line(80, 250, lerp(80, 155, sAmt1), lerp(250, 287, sAmt1));

    // S - Seg 2
    if (t > 130 + segmentDur) {
      let sAmt2 = constrain((t - (130 + segmentDur)) / segmentDur, 0, 1);
      line(80, 250, lerp(80, 155, sAmt2), lerp(250, 350, sAmt2));
    }

    // S - Seg 3
    if (t > 130 + (segmentDur * 2)) {
      let sAmt3 = constrain((t - (130 + (segmentDur * 2))) / segmentDur, 0, 1);
      line(155, 350, lerp(155, 80, sAmt3), lerp(350, 313, sAmt3));
    }
  }

  // "U" Logo
  if (t > 170) {
    stroke(0, 84, 145);
    strokeWeight(12);

    // U - Seg 1
    let uAmt1 = constrain((t - 170) / segmentDur, 0, 1);
    line(170, 350, 170, lerp(350, 287, uAmt1));

    // U - Seg 2
    if (t > 170 + segmentDur) {
      let uAmt2 = constrain((t - (170 + segmentDur)) / segmentDur, 0, 1);
      line(170, 350, lerp(170, 240, uAmt2), lerp(350, 313, uAmt2));
    }

    // U - Seg 3
    if (t > 170 + (segmentDur * 2)) {
      let uAmt3 = constrain((t - (170 + (segmentDur * 2))) / segmentDur, 0, 1);
      line(240, 313, 240, lerp(313, 250, uAmt3));
    }
  }

  if (t > 120) {
    strokeWeight(3);
    stroke(255, 255, 255);
    fill(130, 28, 33);
    
    let sizeAmt = constrain((t - 120) / 20, 0, 1);
    let smoothSize = lerp(0, 30, sizeAmt);
    
    circle(175, 215, smoothSize);
    noStroke();
  }

  // Catchphrase
 if (t > 210) {
    textFont("sans-serif"); // Standard clean look for Japanese
    fill(20, 50, 90);
    textSize(32);
    
    // We calculate a dropping Y position that overshoots and bounces
    let dropAmt = constrain((t - 210) / 20, 0, 1);
    // Dynamic sine wave creates the bouncing ripple effect at the end
    let bounce = sin(dropAmt * HALF_PI * 3) * (1 - dropAmt) * 20; 
    let yPos = lerp(-50, 90, dropAmt) + bounce;
    
    text("偉大なる平凡人たれ", 310, yPos);
  }


  // -------------------------------------------------------------
  // 2. "100th": Zoom Pop-In (Scale) Animation
  // -------------------------------------------------------------
  if (t > 230) {
    // If you got Google Fonts working, switch this to "Lobster"!
    textFont("sans-serif"); 
    fill(130, 28, 33);

    // Calculate scaling factor from 0% to 100% size
    let scaleAmt = constrain((t - 230) / 15, 0, 1);
    
    push(); // Isolate the scaling matrix so it doesn't affect other texts
    translate(330, 220); // Move origin point to the text start location
    scale(scaleAmt);
    
    textSize(120);
    text("100", 0, 0); // Draw at local coordinates (0,0)
    
    textSize(60);
    text("th", 210, 0); 
    pop();
  }


  // -------------------------------------------------------------
  // 3. "Anniversary": Letter Spacing / Reveal Animation
  // -------------------------------------------------------------
  if (t > 250) {
    textFont("sans-serif");
    fill(130, 28, 33);
    textSize(42);

    let str = "Anniversary";
    // Increase how many letters are shown based on time
    let lettersToShow = floor(constrain((t - 250) / 3, 0, str.length));
    let partialStr = str.substring(0, lettersToShow);
    
    // Also add a dynamic tracking/spacing look by offsetting X slightly
    let spacingAmt = lerp(20, 0, constrain((t - 250) / 30, 0, 1));
    
    text(partialStr, 330 + spacingAmt, 300);
  }


  // -------------------------------------------------------------
  // 4. "SINCE 1928": Neon Sign Blink-In Animation
  // -------------------------------------------------------------
  if (t > 280) {
    textFont("sans-serif");
    textSize(28);
    
    // Create a rhythmic blinking effect that eventually stays solid
    let shouldShow = true;
    if (t < 310) {
      // Alternates true/false rapidly using modulo
      shouldShow = (floor(t / 3) % 2 === 0); 
    }

    if (shouldShow) {
      fill(20, 50, 90);
      text("SINCE 1928", 390, 340);
    }
  }

  if (t > 300) {
    textFont("sans-serif");
    fill(20, 50, 90);
    textSize(32);
    
    // Slide from offscreen right (750) to final position (300)
    let slideAmt = constrain((t - 300) / 25, 0, 1);
    // Using a smooth ease-out curve (3 * x^2 - 2 * x^3 structure roughly via lerp)
    let smoothSlide = lerp(750, 300, 1 - Math.pow(1 - slideAmt, 3)); 
    
    text("学校法人大阪産業大学", smoothSlide, 400);
  }
}
