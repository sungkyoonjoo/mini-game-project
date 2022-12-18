export default class Life {

    constructor(){
        this.num = 0;
        this.img = new Image();
        this.img.src = "image/heart2.png";

    }
    draw(ctx){
        ctx.drawImage(this.img,
            800+33*this.num,10,300/3,100/3)

    }
}

