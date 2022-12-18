export default class GoalPost{
    constructor(x, y){
        this.x = x || 0;
        this.y = y || 0;

        this.img = new Image();
        this.img.src = './image/stage2/goalpost1.png';
    }
    draw(ctx){
        var x = this.x;
        var y = this.y;
        ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height,
            200, 50, 500, 150);
    }
    update(){
    }
}
