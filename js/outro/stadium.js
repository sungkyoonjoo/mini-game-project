export default class Stadium{

    constructor(){

        this.img=document.getElementById("stadium")

        this.x=0;
        this.y=0;
        this.w=532;
        this.h=300;

        this.imgSize = 259;
        this.imgDelayIndex = 0;
        this.imgDelayIndex2 = 0;
        this.imgIndex =0;

    }

    draw(ctx){
        ctx.drawImage(this.img,
                    3+this.imgIndex*this.imgSize,3,258,195,
                    0,0,532,300);
    }
    draw2(ctx){
        ctx.drawImage(this.img,
                    262,3,258,195,
                    0,0,532,300);
    }
    update(){
        if(++this.imgDelayIndex%10==0){
            this.imgIndex++;
        }
        else if(this.imgIndex == 1){
            if(++this.imgDelayIndex%10==0){
                this.imgIndex--;
            }
        }
    }
}