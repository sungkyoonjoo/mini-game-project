import Item from "./item.js";
export default class Defender extends Item{
    constructor(x, y){
        super();
        this.#type ='D';
        this.x = x || 0; 
        this.y = y || 0;
        this.#vx = 0;
        this.#vy = 0;
        this.#dx = this.x; 
        this.#dy = this.y;
        this.#speed = 1.5;
        this.#attack = 1;

        this.#imgIndex = 3;
        this.#imgIndexDelay = 0;
        this.img.src = './image/stage2/defender.png';
        this.#life = 1;
    }
    draw(ctx){
        let x = this.x - 20;
        let y = this.y - 40;
        ctx.drawImage(
            this.img, 
            0, 0, 164, 313,
            x, y, 60, 80);
    }
    move(x, y){
        this.#dx = x;
        this.#dy = y;

        let w = this.#dx - this.x;
        let h = this.#dy - this.y;
        let d = Math.sqrt(w*w + h*h);
        this.#vx = (this.#dx-this.x) / d*this.#speed;
        this.#vy = (this.#dy-this.y) / d*this.#speed;
    }
    update(){
        if(this.y>900)
            this.deleteItem();
        super.update();
        this.y += this.#speed;
    }
    get life(){
        return this.#life;
    }
    set life(life){
        this.#life = life;
    }
    get type (){
        return this.#type;
    }
    get width(){
        return 80;
    }
    get attack(){
        return this.#attack;
    }
    #vx;
    #vy;
    #dx;
    #dy;
    #speed;
    #imgIndex;
    #imgIndexDelay;
    #life;
    #type;
    #attack;
}

