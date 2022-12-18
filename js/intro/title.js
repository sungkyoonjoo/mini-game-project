export default class Title{
    constructor(){

        this.img = document.getElementById("gameTitle");

        this.imgSize=144;
        this.imgDelayIndex = 0;

        this.speed = 30;

        this.x = -600;
        this.y = 350;
        this.w = 600;
        this.h = 250;

    }

    draw(ctx){
       ctx.drawImage(this.img,
        0,0,441,187, 
        this.x,this.y,this.w,this.h);
    }
    
    update(){
        
        this.imgDelayIndex++;
        if(this.imgDelayIndex%10 == 0){
            this.x+=this.speed;
        }

    }
}