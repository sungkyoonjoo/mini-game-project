export default class Trophy{

    constructor(x=45,y=200,w=80,h=80,speed=40){

        this.img=document.getElementById("trophy")

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
        0,0,500,500, 
        this.x,this.y,this.w,this.h);
    }

    update1(){
        this.imgDelayIndex++;
        if(this.imgDelayIndex%10 == 0)
            this.x+=this.speed;
    }

    update2(){
        
        this.imgDelayIndex2++;
        if(this.imgDelayIndex2%10 == 0)
            this.x-=this.speed;

    }

    update3(){
        this.imgDelayIndex3++;
        if(this.imgDelayIndex3%8 == 0){
            this.w+=this.speed;
            this.h+=this.speed;
        }
    }
}