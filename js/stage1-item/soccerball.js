import Item from "./item.js";
import context from "./item-context.js";

export default class SoccerBall extends Item{

    constructor(x=1100, y=600){
        super();
        
        this.type = 'ball';
        this.x = x;
        this.y = y;
        
        this.vx = 0; // 이동할 단위 위치
        this.vy = 0;
        this.dx = this.x; // 목적지 위치
        this.dy = this.y;
        this.speed = 5;

        this.IMG_WIDTH = 33;
        this.IMG_HEIGHT = 33;

        this.imgDelayIndex = 0;
        this.imgIndex = 3;
        // this.img = new Image();
        // this.img.src = "image/SoccerBall.png";
        this.img = document.getElementById("ball")
    }
    
    draw(ctx) {
        var w = this.width;
        var h = this.height;
        ctx.drawImage(this.img,
            0,0,800,800,
            this.x, this.y, w, h);
        
    }
    update() {
        super.update();
        
        this.x-=this.speed;
        if(this.x < 0)
            this.deleteItem();

        this.kick = function(){
            this.addScore();
        }
        
    }
    get width(){
        return this.IMG_WIDTH;
    }
    get height(){
        return this.IMG_HEIGHT;
    }

}

