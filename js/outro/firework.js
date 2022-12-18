export default class Firework{ // 불꽃놀이 클래스 입니다
    
    constructor(x=0,y=0,w=200,h=200,speed=10){
        this.img=document.getElementById("outro-fire");


        this.ix = 0; // 이미지 간격 조절
        this.iy = 0;
        this.imgSize = 111.7;
        this.imgDelayIndex = 0;

        this.speed = speed;

        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }

    draw(ctx){
       ctx.drawImage(this.img,
        0+this.imgSize*this.ix,0+this.imgSize*this.iy,111.7,111.7, 
        this.x,this.y,this.w,this.h);
    }

    update1(){
        
        this.imgDelayIndex++;
        if(this.imgDelayIndex%10 == 0){
            this.ix++;
            //this.y-=this.speed;
            if(this.iy>3)
                this.iy=0;

            if(this.ix>3){
                this.iy++;
                this.ix=0;
            }

        }
    }

}