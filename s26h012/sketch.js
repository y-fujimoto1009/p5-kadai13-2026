let t = 0;

// 保存完整Logo的图层
let mainLayer;

// 保存纯白Logo的图层，用于制作红蓝残影
let whiteLayer;

// 保存学校名称的图层
let schoolLayer;

// 保存纯白学校名称的图层
let schoolWhiteLayer;


function setup() {

  // 设置画布大小
  createCanvas(746, 480);

  // 设置动画速度
  frameRate(60);

  // 设置字体
  textFont("sans-serif");


  // 创建透明图层
  mainLayer = createGraphics(746, 480);

  whiteLayer = createGraphics(746, 480);

  schoolLayer = createGraphics(746, 480);

  schoolWhiteLayer = createGraphics(746, 480);


  // 设置各个图层的字体
  mainLayer.textFont("sans-serif");

  whiteLayer.textFont("sans-serif");

  schoolLayer.textFont("sans-serif");

  schoolWhiteLayer.textFont("sans-serif");


  // 提前把完整Logo画到图层里
  makeMainLogo(mainLayer, false);

  // 画一份纯白Logo，用于红蓝残影
  makeMainLogo(whiteLayer, true);

  // 画学校名称
  makeSchoolName(schoolLayer, false);

  // 画纯白学校名称
  makeSchoolName(schoolWhiteLayer, true);
}


function draw() {

  // 浅灰白色背景
  background(247, 247, 245);

  // 时间增加
  t++;


  //------------------------
  // 第一阶段：开场信号线
  //------------------------

  if (t < 28) {

    drawOpeningSignals();
  }


  //------------------------
  // 第二阶段：少量Logo碎片出现
  //------------------------

  if (t >= 20 && t < 72) {

    drawSearchingFragments();
  }


  //------------------------
  // 第三阶段：水平切片开始拼合
  //------------------------

  if (t >= 55 && t < 122) {

    // p从0增加到1
    let p = (t - 55) / 67;

    drawAssembledSlices(p);
  }


  //------------------------
  // 第四阶段：Logo完成并短暂故障
  //------------------------

  if (t >= 122 && t < 158) {

    // 先画完整Logo
    image(mainLayer, 0, 0);

    // 再画短暂故障
    drawLockGlitch();
  }


  //------------------------
  // 第五阶段：Logo完全稳定
  //------------------------

  if (t >= 158) {

    image(mainLayer, 0, 0);
  }


  //------------------------
  // 学校名称出现
  //------------------------

  if (t >= 145) {

    drawSchoolReveal();
  }


  //------------------------
  // 前半段显示扫描线
  //------------------------

  if (t < 158) {

    drawScanLines();
  }


  //------------------------
  // 动画结束后重新播放
  //------------------------

  if (t > 300) {

    t = 0;
  }
}



//==================================================
// 生成主Logo图层
//==================================================

function makeMainLogo(g, whiteMode) {

  // 清除图层
  g.clear();

  // 设置圆润的线条末端
  g.strokeCap(ROUND);

  // 设置圆润的线条连接处
  g.strokeJoin(ROUND);


  //------------------------
  // 上方三个圆
  //------------------------

  g.noStroke();


  // 红色圆
  setFill(g, whiteMode, 130, 28, 33);

  g.circle(120, 90, 60);


  // 深蓝色圆
  setFill(g, whiteMode, 18, 51, 89);

  g.circle(185, 145, 60);


  // 浅蓝色圆
  setFill(g, whiteMode, 0, 84, 145);

  g.circle(120, 165, 35);


  //------------------------
  // 红色Logo主体
  //------------------------

  // 不填充内部
  g.noFill();

  // 设置线条宽度
  g.strokeWeight(12);

  // 设置圆润连接
  g.strokeJoin(ROUND);

  // 设置圆润末端
  g.strokeCap(ROUND);

  // 设置红色或白色
  setStroke(g, whiteMode, 130, 28, 33);


  // 将四条边作为一个连续图形绘制
  g.beginShape();

  g.vertex(80, 230);

  g.vertex(160, 190);

  g.vertex(240, 230);

  g.vertex(160, 270);

  g.endShape(CLOSE);


  //------------------------
  // 深蓝色S
  //------------------------

  // 设置深蓝色或白色
  setStroke(g, whiteMode, 18, 51, 89);

  // 设置圆润线条
  g.strokeCap(ROUND);

  g.strokeJoin(ROUND);

  // 第一条线
  g.line(80, 250, 155, 287);

  // 第二条线
  g.line(80, 250, 155, 350);

  // 第三条线
  g.line(155, 350, 80, 313);


  //------------------------
  // 浅蓝色U
  //------------------------

  // 设置浅蓝色或白色
  setStroke(g, whiteMode, 0, 84, 145);

  // 设置圆润线条
  g.strokeCap(ROUND);

  g.strokeJoin(ROUND);

  // 左边
  g.line(170, 350, 170, 287);

  // 下方斜线
  g.line(170, 350, 240, 313);

  // 右边
  g.line(240, 313, 240, 250);


  //------------------------
  // 中央红点
  //------------------------

  g.noStroke();

  setFill(g, whiteMode, 130, 28, 33);

  g.circle(175, 215, 30);


  //------------------------
  // 右上角口号
  //------------------------

  setFill(g, whiteMode, 20, 50, 90);

  g.textSize(32);

  g.text("偉大なる平凡人たれ", 310, 90);


  //------------------------
  // 100th
  //------------------------

  setFill(g, whiteMode, 130, 28, 33);

  g.textSize(120);

  g.text("100", 330, 220);


  g.textSize(60);

  g.text("th", 540, 220);


  //------------------------
  // Anniversary
  //------------------------

  g.textSize(42);

  g.text("Anniversary", 330, 300);


  //------------------------
  // SINCE 1928
  //------------------------

  g.textSize(28);

  g.text("SINCE 1928", 390, 340);
}



//==================================================
// 生成学校名称图层
//==================================================

function makeSchoolName(g, whiteMode) {

  // 清除图层
  g.clear();

  g.noStroke();

  setFill(g, whiteMode, 20, 50, 90);

  g.textSize(32);

  g.text("学校法人大阪産業大学", 300, 400);
}



//==================================================
// 开场信号线
//==================================================

function drawOpeningSignals() {

  noStroke();


  //------------------------
  // 第一条红色信号线
  //------------------------

  let w1 = min(310, t * 18);

  fill(130, 28, 33, 190);

  rect(
    width / 2 - w1 / 2,
    228,
    w1,
    4
  );


  //------------------------
  // 第二条蓝色信号线
  //------------------------

  if (t > 7) {

    let w2 = min(210, (t - 7) * 18);

    fill(0, 84, 145, 170);

    rect(
      width / 2 - w2 / 2,
      238,
      w2,
      3
    );
  }


  //------------------------
  // 第三条深蓝色信号线
  //------------------------

  if (t > 14) {

    let w3 = min(120, (t - 14) * 18);

    fill(18, 51, 89, 160);

    rect(
      width / 2 - w3 / 2,
      218,
      w3,
      2
    );
  }
}



//==================================================
// 少量碎片搜索阶段
//==================================================

function drawSearchingFragments() {

  // 每条碎片的纵向位置
  let ys = [
    84,
    112,
    148,
    190,
    216,
    252,
    292,
    334
  ];


  // 每条碎片的高度
  let hs = [
    7,
    4,
    9,
    5,
    8,
    6,
    8,
    5
  ];


  // 每条碎片最初的横向距离
  let moves = [
    -140,
    110,
    -85,
    150,
    -120,
    95,
    -155,
    130
  ];


  // 依次处理每一条碎片
  for (let i = 0; i < ys.length; i++) {

    // 每条碎片稍微晚一点出现
    let start = 20 + i * 4;


    if (t > start) {

      // p从0变化到1
      let p = min(
        1,
        (t - start) / 24
      );


      // 碎片逐渐回到正确位置
      let dx = moves[i] * (1 - p);


      // 左侧红色残影
      drawTintSlice(
        whiteLayer,
        ys[i],
        hs[i],
        dx - 8,
        130,
        28,
        33,
        95
      );


      // 右侧蓝色残影
      drawTintSlice(
        whiteLayer,
        ys[i],
        hs[i],
        dx + 8,
        0,
        84,
        145,
        95
      );


      // 中央正常Logo碎片
      drawNormalSlice(
        mainLayer,
        ys[i],
        hs[i],
        dx
      );
    }
  }
}



//==================================================
// 大量水平切片组装阶段
//==================================================

function drawAssembledSlices(p) {

  // 每条切片的高度
  let sliceH = 8;

  // 切片开始的位置
  let topY = 55;

  // 切片结束的位置
  let bottomY = 355;

  // 计算切片总数
  let total = floor(
    (bottomY - topY) / sliceH
  );


  // 不同切片使用不同移动距离
  let moves = [
    -120,
    90,
    -55,
    145,
    -85,
    65,
    -150,
    105
  ];


  for (let i = 0; i <= total; i++) {

    // 当前切片的纵向位置
    let y = topY + i * sliceH;


    // 让每条切片按照不同顺序出现
    let order =
      ((i * 11) % (total + 1)) /
      (total + 1);


    if (p > order * 0.72) {

      // 当前切片自己的动画进度
      let localP =
        (p - order * 0.72) /
        0.28;


      localP = constrain(
        localP,
        0,
        1
      );


      // 切片逐渐回到原来的位置
      let dx =
        moves[i % moves.length] *
        (1 - localP);


      //------------------------
      // 尚未对齐时显示红蓝残影
      //------------------------

      if (localP < 0.82) {

        drawTintSlice(
          whiteLayer,
          y,
          sliceH,
          dx - 6,
          130,
          28,
          33,
          75
        );


        drawTintSlice(
          whiteLayer,
          y,
          sliceH,
          dx + 6,
          0,
          84,
          145,
          75
        );
      }


      //------------------------
      // 正常颜色切片
      //------------------------

      drawNormalSlice(
        mainLayer,
        y,
        sliceH,
        dx
      );
    }
  }
}



//==================================================
// Logo完成后的两次短促故障
//==================================================

function drawLockGlitch() {

  //------------------------
  // 第一次故障
  //------------------------

  if (t >= 126 && t <= 132) {

    drawPulseSet(1);
  }


  //------------------------
  // 第二次故障
  //------------------------

  if (t >= 143 && t <= 147) {

    drawPulseSet(2);
  }


  //------------------------
  // 短暂的白色闪线
  //------------------------

  if (t == 134 || t == 149) {

    noStroke();

    fill(255, 220);

    rect(
      0,
      227,
      width,
      5
    );
  }
}



//==================================================
// 固定位置的横向错位
// 没有使用random，所以不会持续抖动
//==================================================

function drawPulseSet(kind) {

  //------------------------
  // 第一组故障位置
  //------------------------

  let ys1 = [
    82,
    154,
    213,
    276,
    326
  ];


  let hs1 = [
    5,
    8,
    6,
    9,
    5
  ];


  let dx1 = [
    26,
    -34,
    42,
    -24,
    31
  ];


  //------------------------
  // 第二组故障位置
  //------------------------

  let ys2 = [
    108,
    198,
    245,
    306
  ];


  let hs2 = [
    4,
    7,
    5,
    6
  ];


  let dx2 = [
    -18,
    25,
    -30,
    20
  ];


  let ys;

  let hs;

  let dx;


  // 判断使用哪一组
  if (kind == 1) {

    ys = ys1;

    hs = hs1;

    dx = dx1;

  } else {

    ys = ys2;

    hs = hs2;

    dx = dx2;
  }


  //------------------------
  // 依次移动每条故障切片
  //------------------------

  for (let i = 0; i < ys.length; i++) {

    // 用背景颜色遮住原来的切片
    noStroke();

    fill(247, 247, 245);

    rect(
      0,
      ys[i],
      width,
      hs[i]
    );


    // 红色残影
    drawTintSlice(
      whiteLayer,
      ys[i],
      hs[i],
      dx[i] - 5,
      130,
      28,
      33,
      80
    );


    // 蓝色残影
    drawTintSlice(
      whiteLayer,
      ys[i],
      hs[i],
      dx[i] + 5,
      0,
      84,
      145,
      80
    );


    // 正常颜色切片
    drawNormalSlice(
      mainLayer,
      ys[i],
      hs[i],
      dx[i]
    );
  }
}



//==================================================
// 学校名称的出现动画
//==================================================

function drawSchoolReveal() {

  //------------------------
  // 前期切片组装
  //------------------------

  if (t < 178) {

    let p = (t - 145) / 33;


    let ys = [
      377,
      385,
      393,
      401
    ];


    let moves = [
      -95,
      70,
      -55,
      85
    ];


    for (let i = 0; i < ys.length; i++) {

      // 每条切片稍微错开时间
      let localP = constrain(
        p - i * 0.08,
        0,
        1
      );


      // 逐渐回到正确位置
      let dx =
        moves[i] *
        (1 - localP);


      // 红色残影
      drawTintSlice(
        schoolWhiteLayer,
        ys[i],
        8,
        dx - 4,
        130,
        28,
        33,
        65
      );


      // 蓝色残影
      drawTintSlice(
        schoolWhiteLayer,
        ys[i],
        8,
        dx + 4,
        0,
        84,
        145,
        65
      );


      // 正常文字
      drawNormalSlice(
        schoolLayer,
        ys[i],
        8,
        dx
      );
    }

  } else {

    //------------------------
    // 后期显示完整学校名称
    //------------------------

    image(
      schoolLayer,
      0,
      0
    );
  }
}



//==================================================
// 显示正常颜色的水平切片
//==================================================

function drawNormalSlice(
  imgLayer,
  sourceY,
  sliceH,
  moveX
) {

  image(
    imgLayer,

    // 切片显示的位置
    moveX,
    sourceY,

    // 切片显示大小
    width,
    sliceH,

    // 从图层中截取的位置
    0,
    sourceY,

    // 从图层中截取的大小
    width,
    sliceH
  );
}



//==================================================
// 显示带颜色的水平残影
//==================================================

function drawTintSlice(
  imgLayer,
  sourceY,
  sliceH,
  moveX,
  r,
  g,
  b,
  a
) {

  push();


  // 给纯白图层染色
  tint(r, g, b, a);


  image(
    imgLayer,

    moveX,
    sourceY,

    width,
    sliceH,

    0,
    sourceY,

    width,
    sliceH
  );


  pop();
}



//==================================================
// 绘制淡扫描线
//==================================================

function drawScanLines() {

  stroke(
    20,
    50,
    90,
    13
  );

  strokeWeight(1);


  // 每隔6像素画一条横线
  for (let y = 0; y < height; y = y + 6) {

    line(
      0,
      y,
      width,
      y
    );
  }
}



//==================================================
// 设置图形填充颜色
//==================================================

function setFill(
  g,
  whiteMode,
  r,
  gg,
  b
) {

  // 纯白残影图层
  if (whiteMode) {

    g.fill(255);

  } else {

    // 正常颜色图层
    g.fill(r, gg, b);
  }
}



//==================================================
// 设置图形线条颜色
//==================================================

function setStroke(
  g,
  whiteMode,
  r,
  gg,
  b
) {

  // 纯白残影图层
  if (whiteMode) {

    g.stroke(255);

  } else {

    // 正常颜色图层
    g.stroke(r, gg, b);
  }
}
