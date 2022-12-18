import Item from "./item.js";
export default class GoldenBall extends Item{
    constructor(x, y){
        super();
        this.#type = 'GB';
        this.x = x || 0;
        this.y = y || 0;
        this.speed = 1;

        this.img.src = './image/stage2/goldenball.png';
        this.#appear = false;
    }
    draw(ctx){
        var x = this.x - 30;
        var y = this.y - 30;
        
        if(this.#appear)
            ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height,
                x, y, this.img.width/30, this.img.height/30);
    }
    update(){
        super.update();
        this.x += this.speed;
        if(this.x > 750)
            this.speed = -this.speed;
        else if(this.x < 200)
            this.speed = -this.speed;
    }
    get type (){
        return this.#type;
    }
    set type (type){
        this.#type = type;
    }
    get width(){
        return 30;
    }
    get appear(){
        return this.#appear;
    }
    set appear(a){
        this.#appear = a;
    }
    #type;
    #appear;
};
