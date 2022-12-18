export default class Ball{
    constructor(x=0,y=450,w=200,h=200,speed=100){
        
        this.img = document.getElementById("ball");

        this.imgSize=144;
        this.imgDelayIndex = 0;
        this.imgDelayIndex2 = 0;
        this.imgDelayIndex3 = 0;

        this.speed = speed;

        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;

    }

    draw(ctx){
       ctx.drawImage(this.img,
        0,0,800,800, 
        this.x,this.y,this.w,this.h);
    }

    update1(){
        
        this.imgDelayIndex++;
        if(this.imgDelayIndex%10 == 0){
            this.x+=this.speed;
        }
    
    }

    update2(){
        
        this.imgDelayIndex2++;
        if(this.imgDelayIndex2%8 == 0){
            this.x-=this.speed;
        }

    }

    update3(){
        this.imgDelayIndex3++;
        if(this.imgDelayIndex3%8 == 0){
            this.imgIndexX++;
            this.w+=this.speed;
            this.h+=this.speed;
        }
        if(this.imgIndexX==3)
            this.imgIndexX=0;
    }
}