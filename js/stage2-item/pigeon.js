import Item from "./item.js";
export default class Pigeon extends Item{
    constructor(x, y){
        super();
        this.#type ='pigeon';
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
        this.img.src = './image/stage2/pigeon1.png';
        this.#life = 1;
    }
    get life(){
        return this.#life;
    }
    set life(life){
        this.#life = life;
    }
    draw(ctx){
        let x = this.x - 50;
        let y = this.y - 50;
        ctx.drawImage(
            this.img, 
            48*this.#imgIndex, 0, 144/3, 192/4,
            x, y, 100, 100);
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
        if(this.x < 200 || this.x > 710 || this.y > 900)
            this.deleteItem();
        super.update();
        this.y += this.#vy;
        this.x += this.#vx;

        if(++this.#imgIndexDelay%5 == 0 ){ 
            this.#imgIndex++;
            if(this.#imgIndex > 2)
                this.#imgIndex = 0;
        }
    }
    get type (){
        return this.#type;
    }
    get width(){
        return 50;
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

