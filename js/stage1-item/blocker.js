import Item from "./item.js";

export default class Blocker extends Item{

    constructor(x=1000, y=715){
        super();

        this.x = x;
        this.y = y;
        this.speed = 5;
        this.type = 'blocker';

        this.imgDelayIndex = 0;
        this.imgIndex = 0;
        this.img = document.getElementById("blocker2");

        this.IMG_WIDTH = 10;
        this.IMG_HEIGHT = 55;

    }
    draw(ctx){
        let x = this.x;
        let y = this.y;
        var w = this.width;
        var h = this.height;
        ctx.drawImage(this.img,this.x,this.y,this.IMG_WIDTH,this.IMG_HEIGHT)
    }
    update() {
        super.update();

        this.x-=this.speed;

        if(this.x < 0)
            this.deleteItem();

        this.hit = function(){
            this.minusLife();
        }
    }
    get width(){
       // return super.width/7;
        return this.IMG_WIDTH;
    }
    get height(){
        //return super.height/7;
        return this.IMG_HEIGHT;
    }



}