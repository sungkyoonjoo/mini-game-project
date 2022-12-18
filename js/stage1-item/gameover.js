export default class GameOver {

    constructor(){

        this.flag = false;
     
        this.img = new Image();
        this.img.src = "image/gameover.png";
    }
    draw(ctx){
        ctx.drawImage(this.img, 230, 290, 450, 250)

    }


}