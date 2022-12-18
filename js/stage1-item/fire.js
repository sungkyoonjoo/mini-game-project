export default class Fire {

    constructor(x=900, y=300){
        this.x = x;
        this.y = y;
        
        this.vx = 0; // 이동할 단위 위치
        this.vy = 0;
        this.dx = this.x; // 목적지 위치
        this.dy = this.y;
        this.speed = 5;

        this.imgDelayIndex = 0;
        this.imgIndex = 3;
        
        this.img = document.getElementById("fire");
    }

    draw(ctx) {
        ctx.drawImage(this.img, 
            this.x, this.y, this.img.width/3, this.img.height/3);

    }
    update() {
        this.x-=this.speed;
    }

}

