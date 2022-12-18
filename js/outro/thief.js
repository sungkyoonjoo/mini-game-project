export default class Thief{
    constructor(){

        this.img = document.getElementById("thief");

        this.x=500;
        this.y=200;
        this.w=80;
        this.h=80;

        this.imgSize = 134.8;
        this.ix = 0;
        this.iy = 0;
        this.imgDelayIndex = 0;

        this.speed = 20;

    }

    draw(ctx){
        ctx.drawImage(this.img,
                    0+this.ix*this.imgSize,0+this.iy*185,134.8,185,
                    this.x,this.y,80,100)
    }
 
    update(){

        if(++this.imgDelayIndex%5==0){
            this.ix++;
            this.x-=this.speed;
        }
        if(this.ix>4){
            this.ix=0;
            this.iy=1;
            if(this.iy>2)
                this.iy=0;
        }
    }
}