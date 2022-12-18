import context from "./itemContext.js";
import Player from "./player.js";
import Card from "./card.js";
export default class Item{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.#img = new Image();
        this.#isHitBtwRaP = false;
        this.#isHitBtwRaB = false;
        this.#isHitBtwDaB = false;
        this.#isHitBtwBombaP = false;

        this.drawDelay = 0;
        this.playerDie = false;

        this.audioGetItem = new Audio('/mini_prj/audio/audioGetItem.mp3');
        this.audioGetItem.volume = 1.0;

        this.audioGetGB = new Audio('/mini_prj/audio/audioClear.mp3');
        this.audioGetGB.volume = 0.3;
        this.audioHit = new Audio('/mini_prj/audio/audioHit.mp3')
    }
    update(){
        for(let item of context.items){
            if(item === this)
            continue;
            //나와 items 내 있는 다른 item 과의 거리 
            let w = item.x-this.x;
            let h = item.y-this.y;
            let d = Math.sqrt(w*w+h*h);
            let sumR = this.width/2 + item.width/2;
            // if(this.playerDie){ 
            //     this.drawDelay++;
            //     if(this.drawDelay > 5)
            //     console.log("true")
            //     let player = new Player(900/2,900-60);
            //     context.items.push(player);
            //     this.playerDie = false;
            // }
            if(d < sumR) {
                if(this.type == 'P'&& item.type !='B'){
                    if(item.type == 'GB'){
                        if(item.appear){
                            this.audioGetGB.play();
                            this.gameClear =true;
                        }
                    }
                    else{
                        item.deleteItem();
                        if(item.type != 'C')
                            this.audioHit.play();
                        this.imgHPIndex += item.attack;
                        this.myHP -= item.attack;
                    }
                    if(this.myHP < 1){
                        this.onDead();
                    }
                }

                if(this.type == 'D'&& item.type =='B'){
                    item.deleteItem();
                    this.deleteItem();
                }
                
                if(this.type == 'R'&& item.type =='B'){
                    this.life -= 1;
                    item.deleteItem();
                    if(this.life == 0){
                        this.#isHitBtwRaB = true;
                    }
                }

                if(this.type == 'pigeon'&& item.type =='B'){
                    this.life -= 1;
                    item.deleteItem();
                    this.deleteItem();
                }

                if(this.type == 'P'&& item.type == 'C'){
                    this.myScore += item.card.score;
                    this.imgHPIndex -= item.attack;
                    this.myHP += item.attack;
                    this.audioGetItem.play();
                }


            }
        }
    }    
    draw(){

    }
    // get x(){
    //     return this.#x;
    // }
    // set x(x){
    //     this.#x= x;
    // }   
    // get y(){
    //     return this.#y;
    // }
    // set y(y){
    //     this.#y= y;
    // }
    get img(){
        return this.#img;
    }
    get width(){
        return this.#img.width;
    }
    get height(){
        return this.#img.height;
    }
    get isHitBtwRaB(){
        return this.#isHitBtwRaB;
    }
    get isHitBtwBombaP(){
        return this.#isHitBtwBombaP;
    }
    
    // #x;
    // #y;
    #width;
    #height;
    #img;
    #isHitBtwRaP;
    #isHitBtwRaB;
    #isHitBtwDaB;
    #isHitBtwDaP;
    #isHitBtwBombaP;
    
}
