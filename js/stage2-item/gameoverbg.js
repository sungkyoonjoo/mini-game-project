export default class GameOverBG{
    constructor(x, y){
        super();
        this.x = x || 0;
        this.y = y || 0;

        this.img.src = './image/stage2/gameover.png';
    }
    draw(ctx){
        ctx.drawImage(this.img, 
            0, 0, 835, 430,
            200, 0, 500, 100);
    }
    update(){
    }
}
