export default class Background{
    constructor(x, y){
        this.x = x || 0;
        this.y = y || 0; 
        this.speed = 2;
        
        // this.img = new Image();
        // this.img.src = '../../image/stage2/soccerground.png';

        this.img = document.getElementById("soccerground");
        this.img2Clear = document.getElementById("stage2-clear");
    }
    draw(ctx){
        ctx.drawImage(this.img, 
            0, this.y, 309, 453,
            150, 0, 309*2, 453*2);
        ctx.drawImage(this.img, 
            0, this.y+453, 309, 453,
            150, 0, 309*2, 453*2);
    }
    drawClear(ctx){
        ctx.drawImage(this.img2Clear,0,0,272,161,250,200,272*1.5,161*1.5)
    }
    update(){
        this.y = this.y - this.speed;
        if(this.y <= -453){
            this.y = 0;
        }
    }
    setSpeed(speed){
        this.speed = speed;
    }
}