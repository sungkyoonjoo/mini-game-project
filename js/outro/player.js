export default class Player{
    constructor(x=0,y=200,imgIndexY=12,w=100,h=100,speed=40){ // 초기값 설정

        this.img = document.getElementById("player");

        this.imgIndexX=0;
        this.imgIndexY=imgIndexY;

        this.imgSize=144;
        this.imgDelayIndex = 0;
        this.imgDelayIndex2 = 0;
        this.imgDelayIndex3 = 0;
        this.imgDelayIndex4 = 0;

        this.speed = speed; // 스피드 설정

        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }

    draw(ctx){
       ctx.drawImage(this.img,
        0+this.imgSize*this.imgIndexX,0+this.imgSize*this.imgIndexY+2,144,144, 
        this.x,this.y,this.w,this.h);
    }
    update1(){
        this.imgDelayIndex++;
        if(this.imgDelayIndex%10 == 0){
            this.imgIndexX++;
            this.x+=this.speed;
        }
        if(this.imgIndexX==8)
            this.imgIndexX=0;
    }

    update2(){
        this.imgDelayIndex2++;
        if(this.imgDelayIndex2%10 == 0){
            this.imgIndexX++;
            this.x-=this.speed;
        }
        if(this.imgIndexX==8)
            this.imgIndexX=0;
    }

    update3(){
        this.imgDelayIndex3++;
        if(this.imgDelayIndex3%8 == 0){
            this.imgIndexX++;
            this.w+=this.speed;
            this.h+=this.speed;
        }
        if(this.imgIndexX==8)
        this.imgIndexX=0;
    }

}