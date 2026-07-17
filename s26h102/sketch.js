let a = 0,a2 = 0,a3 = 0,a4 = 0;
let x = 160,y = 190; 
let x2 = -100,y2 = -100;
let x3 = -100,y3 = -100; 
let x4 = -100,y4 = -100; 
let count = 0,count2= 0;
let x10 =80,y10=250; 
let x12 ,y12,x13,y13,x14,y14; 
let t = 0,t2=0,t3=0,t4=0,p= 0,p2=0,p3=0,p4=0; 
let x20=-100,y20=-100,x22,y22,x23,y23; 
let u=0,u2=0; 
let zoom = 2; 
let returnAnimation = false; 
let offsetX = 0; 
let offsetY = 0;
let moveX = 208; 
let moveY = -30;
let t5=0,t6=0,p5=0;
let x15=750,x16=750,x17=750,x18=750,x19=750,x24=750;
let  p6=0,t7=0,y15,y16,y17,y18,e=0;
function setup() { createCanvas(736, 480); }
function draw() {

  background(255);



  if(u2 >= 63){
    returnAnimation = true;
  }


  if(returnAnimation){

    zoom = lerp(zoom,1,0.03);

    moveX = lerp(moveX,0,0.03);
    moveY = lerp(moveY,0,0.03);

  }


  push();
  translate(width/2,height/2);
  scale(zoom);
  translate(-width/2,-height/2);
  translate(moveX,moveY);


  drawO();
  drawS();
  deawU();


  pop();

  Character();
  drawLogo();

}
function drawO(){  
  strokeWeight(12);
  stroke(130,28,33);
  line(x, y, x - a*2, y + a); 
                   if (count >= 1) { line(x2, y2, x2 + a2*2, y2 + a2); }  
                   if (count >= 2) { line(x3, y3, x3 + a3*2, y3 - a3); }
                   if (count >= 3) { line(x4, y4, x4 - a4*2, y4 - a4); } 
                   if (count == 0) { if (a < 40) { a++; } 
                   else { x2 = x - a*2; y2 = y + a; count = 1; } }  
                   else if (count == 1) {
                     if (a2 < 40) { a2++; } 
                     else {  x3 = x2 + a2*2; y3 = y2 + a2; count = 2; } }  
                   else if (count == 2) { 
                     if (a3 < 40) { a3++; } 
                   else {  x4 = x3 + a3*2; y4 = y3 - a3; count = 3; } }
                   else if (count == 3) { if (a4 < 40) { a4++; }
                   else{ count =4; } } }
function drawS(){ 
   stroke(18,51,89);
  
  line(155,287,x12,y12); 
  line(x10,y10,x13,y13); 
                  line(x13,y13,x14,y14);
                  if (count == 4) {
                    if (t <= 60) { p = min(t / 60, 1); 
                                   x12 = lerp(155,80, p);
                                   y12 = lerp(287, 250, p); t++; }
                    else if(t2 <= 60){ p2 = min(t2 / 60, 1);
                                       x13 = lerp(x12, 155, p2);
                                       y13 = lerp(y12, 350, p2);
                                       t2++; }
                    else if(t3<=60){ p3 = min(t3/60,1);
                                     x14 =lerp(x13,80,p3); 
                                     y14 = lerp(y13,313,p3);
                                     t3++; 
                                   } 
                    else{ count=5 
                          e = 1 
                        } } } 
function deawU(){ 
      stroke(0,84,145);
  if(e == 1){
                   x20=170
                 y20=287
                   e = 2
                 }
                 
                  line(x20,y20,x20,y20+u);
                  line(x20,y20+u,x22,y22); 
                  line(x22,y22,x22,y22-u2);
                  if(count == 5){ if(u<63){ u++; } 
                  else if(t4 <= 60){ p4 = min(t4/60,1);
                                     x22= lerp(170,240,p4) 
                                       y22= lerp(350,313,p4);
                                     t4++ }
                  else{ x22= 240; y22 =313; 
                        if(u2<63){ u2++; } 
                        else{
                          count = 6;
                        }
                      } 
                                } 
                }
function Character(){
  if(count == 6){
    if(t5<=90){
      t5++;
      }
else if (t6 <= 60) {
  p5 = min(t6 / 60, 1);
  x15 = lerp(750, 310, p5);
  x16 = lerp(750, 330, p5);
  x17 = lerp(750, 540, p5);
  x18 = lerp(750, 330, p5);
  x19 = lerp(750, 390, p5);
  x24 = lerp(750, 300, p5);
  t6++;
}

    textSize(32);
    fill(18,51,89);
    text("偉大なる平凡人たれ",x15,90);
    textSize(120);
    fill(130,28,33);
    text("100",x16,220);
    textSize(60);
    text("th",x17,220);
    textSize(42);
    text("Anniversary",x18,300)
    textSize(28);
    text("SINCE 1928",x19,340);
    textSize(32);
    text("学校法人大阪産業大学",x24,400);
   

  }  
    if(t6>=61){
  count2 = 7;
} 
}
function drawLogo(){
  if(count2 == 7){
　　　  p6 = min(t7 / 60, 1);
  y15 = lerp(230, 90, p6);
  y16 = lerp(230, 145, p6);
  y17 = lerp(230, 160, p6);
  y18 = lerp(230, 215, p6);
 
  t7++;
}
    
    
    
    noStroke();
　　fill(130,28,33);
    circle(120,y15,60);

    fill(18,51,89);
    circle(185,y16,60);

    fill(0,84,145);
    circle(120,y17,35);
   
    stroke(255);
    fill(130,28,33);
    circle(175,y18,30);
  strokeWeight(3);  
  noStroke();
 
  }
