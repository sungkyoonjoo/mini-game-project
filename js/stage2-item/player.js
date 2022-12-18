import Ball from "./ball.js";
import Item from "./item.js";
import referee from "./referee.js"
import context from "./itemContext.js";
export default class Player extends Item{
    constructor(x, y){ 
        super();
        this.type = 'P';
        this.x = x || 0; 
        this.y = y || 0;
        this.#vx = 0; 
        this.#vy = 0;
        this.#dx = this.x; 
        this.#dy = this.y;
        this.#speed = 3;
        
        this.#flagE = false;
        this.#flagW = false;
        this.#flagS = false;
        this.#flagN = false;

        this.imgDelayIndex = 0;
        this.#imgIndex = 0;
        this.imgY = 3;
        this.#imgIndexDelay = 0;
        this.img.src = './image/stage2/player.png';
        // this.img = document.getElementById("player");

        this.#myScore = 0;

        this.#imgLife = new Image();
        this.#imgLife.src = './image/stage2/heart.png';
        this.#imgLifeIndex = 0
        this.#myLife = 3;

        this.#imgHP = new Image();
        this.#imgHP.src = './image/stage2/health.png';
        this.#imgHPIndex = 0;
        this.#myHP = 4;
        this.#gameClear = false;

    }
    
    draw(ctx){ 
        var imgW = this.img.width/35;
        var imgH = this.img.height/50;
        var x = this.x - imgW;
        var y = this.y - imgH;
        if(!this.playerDie){
            ctx.drawImage(
                this.#imgLife, 
                866/3*this.#imgLifeIndex, 0, 866, 288,
                650, 0, 100, 40);
            ctx.drawImage(
                this.#imgHP, 
                0, 130*this.#imgHPIndex, 475, 130,
                x, y+70, 60, 30);
            ctx.drawImage(
                this.img, 
                0+(145*this.#imgIndex), 145*this.imgY, 145, 145,
                x, y, 70, 70);

        }
    }
    move(x){ 
        var dir = x;

        switch(dir) {
            case "Left":
                this.#flagW = true;
            break;
            case "Right":
                this.#flagE = true;
            break;
            case "Up":
                this.#flagN = true;
            break;
            case "Down":
                this.#flagS = true;
            break;
        }
        
    }
    stop(x){
        switch(x) {
            case "Left":
                this.#flagW = false;
                this.#vx = 0;
                break;
            case "Right":
                this.#flagE = false;
                this.#vx = 0;
                break;
            case "Up":
                this.#flagN = false;
                this.#vx = 0;
                break;
            case "Down":
                this.#flagS = false;
                this.#vx = 0;
                break;
        }
    }
    fire(){
        return new Ball(this.x, this.y);
    }
    reset(){
        this.playerDie = false;
        this.type = 'P';
        this.x = 450;
        this.y = 840;
    }
    onDead(){
        this.#myLife -= 1;
        this.#imgLifeIndex += 1;
        this.#myHP = 4;
        this.#imgHPIndex = 0;
        this.playerDie = true;
        this.type = 'PD';
        //this.reset();
        setTimeout(this.reset.bind(this),1000);
    }
    update(){
        super.update();

        //if(this.#flagW == true && this.x > 200)
        if(this.#flagW && this.x > 200){
            this.x -= this.#speed;
            this.#vx = -2;
        }

        // if(this.#flagE == true && this.x < 740)
        if(this.#flagE && this.x < 740){
            this.x += this.#speed;     
            this.#vx = 2;
        }

        // if(this.#flagN == true && this.y > 0)
        if(this.#flagN && this.y > 0){
            this.y -= this.#speed;
            this.#vx = 1;
        }

        // if(this.#flagS == true && this.y < 840)
        if(this.#flagS && this.y < 840){
            this.y += this.#speed;
            this.#vx = -1;
        }

        // this.onDead = function(){
        //     this.#myLife -= 1;
        //     this.#imgLifeIndex += 1;
        //     this.#myHP = 4;
        //     this.playerDie = true;
        //     this.type = 'PD';
            //let index = context.items.indexOf(this);
            //context.items.splice(this, 1);
            // setTimeout(this.reset,1000);
        
        //캐릭터 걸어다니기, 이동할 때 바뀜.
        this.imgDelayIndex++ ;
        if (this.imgDelayIndex % 6 == 0 ) {
            // 직진할때
            if (this.#vx == 1 && this.#imgIndex < 3){
                this.imgY = 3;
                this.#imgIndex++;
                if(this.#imgIndex > 2)
                    this.#imgIndex = 0;
            }
            // 후진할때 (앞보기)
            if (this.#vx == -1 && this.#imgIndex < 3){
                this.imgY = 3;
                this.#imgIndex++;
                if(this.#imgIndex > 2)
                    this.#imgIndex = 0;
            }
            // // 후진할때 (뒤보기)
            // if (this.#vx == -1 && this.#imgIndex < 3){
            //     this.imgY = 2;
            //     this.#imgIndex++;
            //     if(this.#imgIndex > 2)
            //         this.#imgIndex = 0;
            // }
            // 왼쪽방향
            if (this.#vx == -2 && this.#imgIndex < 4){
                this.imgY = 0;
                this.#imgIndex++;
                if(this.#imgIndex > 3)
                    this.#imgIndex = 0;
            }
            // 오른쪽 방향
            if (this.#vx == 2 && this.#imgIndex < 4){
                this.imgY = 1;
                this.#imgIndex++;
                if(this.#imgIndex > 3)
                    this.#imgIndex = 0;
            }
            // 도착했을 때 돌아옴(앞에 보게됨.)
            if (this.#vx == 0 && this.#imgIndex > 0){
                this.imgY=3;
                this.#imgIndex=0;
            }
            if (this.#vx == 0 && this.#imgIndex < 0){
                this.imgy=3;
                this.#imgIndex=0;
            }
            

        }
        

    }
    // get type (){
    //     return this.#type;
    // }
    // set type(type){
    //     this.#type = type;
    // }
    get width(){
        return 50;
    }
    get myLife(){
        return this.#myLife;
    }
    set myLife(l){
        this.#myLife = l;
    }
    get myHP(){
        return this.#myHP;
    }
    set myHP(h){
        this.#myHP = h;
    }
    get myScore(){
        return this.#myScore;
    }
    set myScore(s){
        this.#myScore = s;
    }
    set imgHPIndex(hi){
        this.#imgHPIndex = hi;
    }
    get imgHPIndex(){
        return this.#imgHPIndex;
    }
    get gameClear(){
        return this.#gameClear;
    }
    set gameClear(g){
        this.#gameClear = g;
    }



    #vx;
    #vy;
    #dx;
    #dy;
    #speed;
    #flagE;
    #flagW;
    #flagS;
    #flagN;
    #imgIndex;
    #imgIndexDelay;
    // #type;
    #myLife;
    #myScore;
    #myHP;
    #imgLife;
    #imgHP;
    #imgLifeIndex;
    #imgHPIndex;
    #gameClear;

}