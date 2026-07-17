let time = 0;
let OWeight1 = 0;
let OWeight2 = 0;
let Oweight3 = 0;
let x = 0;

function setup(){
  createCanvas(746,480);
}

function draw(){
  background(255);
  //ロゴ O
  stroke(102, 0, 0);
  //時差で現れる
  if(time<=10){
    strokeWeight(time*1.5);
    line(273-x,280,373-x,240);//左上
    line(473-x,280,373-x,240);//右上
    line(273-x,280,373-x,320);//左下
    line(473-x,280,373-x,320);//右下
  }else{
    //表示
    strokeWeight(15);
    line(273-x,280,373-x,240);//左上
    line(473-x,280,373-x,240);//右上
    line(273-x,280,373-x,320);//左下
    line(473-x,280,373-x,320);//右下
  }
  //ロゴ S
  stroke(8,28,109);
  if(time>=10){
    //上下
    if(time<=20){
      strokeWeight((time-10)*1.5);
      line(273-x,305,358-x,340);//上
      line(273-x,375,358-x,410);//下
    }else{
      strokeWeight(15);
      line(273-x,305,358-x,340);//上
      line(273-x,375,358-x,410);//下
    }
  }if(time>=20){
    //斜め
    if(time<=30){
      strokeWeight((time-20)*1.5);
      line(273-x,305,358-x,410);
    }else{
      strokeWeight(15);
      line(273-x,305,358-x,410);
    }
  }
  //ロゴ　U
  stroke(0,84,204);
  if(time>=30){
    //縦
    if(time<=40){
      strokeWeight((time-30)*1.5);
      line(388-x,340,388-x,410);//左
      line(473-x,305,473-x,375);//右
    }else{
      strokeWeight(15);
      line(388-x,340,388-x,410);//左
      line(473-x,305,473-x,375);//右
    }
    if(time>=40){
      //下
      if(time<=50){
        strokeWeight((time-40)*1.5);
        line(388-x,410,473-x,375);
      }else{
        strokeWeight(15);
        line(388-x,410,473-x,375);
      }
    }
  }
  //丸
  //Oの上
  stroke(255);
  strokeWeight(3);
  if(time>=50){
    if(time<=60){
      fill(116,0,36);
      strokeWeight(5);
      circle(400-x,268,(time-50)*3.5);
    }else{
      fill(116,0,36);
      strokeWeight(5);
      circle(400-x,268,35);
    }
  }
  //小
  if(time>=55){
    if(time<=65){
      fill(0,84,204);
      noStroke();
      circle(320-x,200,(time-55)*5.5);
    }else{
      fill(0,84,204);
      noStroke();
      circle(320-x,200,55);
    }
  }
  //中
  if(time>=60){
    if(time<=70){
      fill(8,28,109);
      noStroke();
      circle(430-x,170,(time-60)*8);
    }else{
      fill(8,28,109);
      noStroke();
      circle(430-x,170,80);
    }
  }
  //大
  if(time>=65){
    if(time<=75){
      fill(102, 0, 0);
      noStroke();
      circle(320-x,100,(time-65)*10);
    }else{
      fill(102, 0, 0);
      noStroke();
      circle(320-x,100,100);
    }
  }
  //移動
  if(time>=75){
    if(time<=105){
      x += 5;
    }
  }
  //文字
  //偉大なる平凡人たれ
  if(time>=105){
    fill(8,28,109);
    if(time<=115){
      textSize(35);
      text("偉大なる平凡人たれ",360+(368-(time-105)*36.8),80);
    }else{
      textSize(35);
      text("偉大なる平凡人たれ",360,80);
    }
  }
  //100th
  if(time>=110){
    fill(102, 0, 0);
    if(time<=120){
      textSize(175);
      text("100",360+(368-(time-110)*36.8),230);
      textSize(75);
      text("th",650+(96-(time-115)*9.6),230);
    }else{
      textSize(175);
      text("100",360,230);
      textSize(75);
      text("th",650,230);
    }
  }
  //Anniversary
  if(time>=115){
    fill(102, 0, 0);
    if(time<=125){
      textSize(65);
      text("Anniversary",360+(368-(time-115)*36.8),300);
    }else{
      textSize(65);
      text("Anniversary",360,300);
    }
  }
  //SINCE 1928
  if(time>=120){
    fill(102, 0, 0);
    if(time<=130){
      textSize(30);
      text("SINCE 1928",450+(296-(time-120)*29.6),340)
    }else{
      textSize(30);
      text("SINCE 1928",450,340)
    }
  }
  //学校法人大阪産業大学
  if(time>=125){
    fill(102, 0, 0);
    if(time<=135){
      textSize(35);
      text("学校法人大阪産業大学",360+(368-(time-125)*36.8),400);
    }else{
      textSize(35);
      text("学校法人大阪産業大学",360,400);
    }
  }
  time += 1;
}
