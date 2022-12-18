import context from "./item-context.js";

export default class Item{
    #x;
    #y;
    #width;
    #height;
    #img;
    #isHit;
    #plusScore;
    #getScore;

    constructor(x=0, y=0, w=0, h=0) {
        this.#x = x;
        this.#y = y;
        this.#width = w;
        this.#height = h;

        this.#img = new Image();

    }

    update() {
        for(let item of context.items){
            if(item === this)
                continue;
            let w = this.#x - item.x;
            let h = this.#y - item.y;
            
            let d = Math.sqrt(w*w + h*h);
            let sumR = this.width/2 + item.width/2; // this.width 는 getter
            
            if(d <= sumR) {//충돌
                if(this.type == "ball" && item.type == "player"){
                    this.kick();
                    item.kick();
                    this.deleteItem();
                }
                else if (this.type == "blocker" && item.type == "player"){
                    this.deleteItem();                   
                    this.hit();
                    item.hit();
                }

            }
        }

    }

    draw(ctx) {


    }

    get x(){
        return this.#x;
    }
    set x(x){
        this.#x = x;
    }
    get y(){
        return this.#y;
    }
    set y(y){
        this.#y = y;
    }
    get img(){
        return this.#img;
    }
    set img(img){
        this.#img = img;
    }
    get width(){
        return this.#img.width;
    }
    get height(){
        return this.#img.height;
    }

}