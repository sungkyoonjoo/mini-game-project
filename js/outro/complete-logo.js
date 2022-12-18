export default class CompleteLogo{ // 미션 성공 로고 입니다

    constructor(){
        this.img = document.getElementById("mission-complete");

        this.x = 170;
        this.y = 35;
        this.w = 200;
        this.h = 100;

        this.imgDelayIndex = 0;
    }

    draw(ctx){
        ctx.drawImage(this.img,
         0,0,352,159, 
         this.x,this.y,this.w,this.h);
     }

     update(){
         
         if(++this.imgDelayIndex%15 == 0){
            this.w+=10;
            this.h+=10;
            if(this.w>210){
                this.w=200;
                this.h=100;
            }
        }

    }
}