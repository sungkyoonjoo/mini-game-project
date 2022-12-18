import Item from "./item.js";
import context from "./item-context.js";
export default class player extends Item{


    constructor(x=100, y=700){
        super();

        this.blockers = [];
        this.x = x;
        this.y = y;

        this.basicY = 700

        this.type = 'player';

        this.vx = 0;
        this.vy = 0;
        this.dx = this.x;
        this.dy = this.y;

        this.speed = 5;

        this.dir;
        this.flagJ = false;
        this.flagD = false;

        this.flagGot = false;
        this.flagOuch = false;
        
        this.isJumping = true;
        this.isDoubleJumping = null;
        this.jumpTimer = 0;

        this.countJump = 0;
        
        this.imgDelayIndex = 0;
        this.imgDelayIndex2 = 0;
        this.imgDelayIndex3 = 0;
        this.imgIndex = 0;

        this.img = document.getElementById("player");
        this.IMG_WIDTH = 144;
        this.IMG_HEGHT = 144;
        this.imgY = 1;

        this.imgFire = document.getElementById("fire");
        this.imgGot = document.getElementById("igotit");
        this.imgOuch = document.getElementById("ouch");

        this.audioJump = new Audio('/mini_prj/audio/audioJump.mp3');
        this.audioJump.volume = 1.0;
        this.audioHit = new Audio('/mini_prj/audio/audioHit.mp3');
        this.audioGetItem = new Audio('/mini_prj/audio/audioGetItem.mp3');

        this.audioHit.volume = 1.0;

    }
    draw(ctx){
        let x = this.x;
        let y = this.y;
        var w = this.width;
        var h = this.height;

        // 2단점프 불꽃 그리기
        if(this.flagUp){
            ctx.drawImage(this.imgFire,x, y-10, 75, 85);
        }

        // 캐릭터랑 장애물이랑 부딪혔을때
        if(this.flagOuch){
            ctx.drawImage(this.imgOuch,x+40, y-40, 60, 40);
            ctx.drawImage(this.img,
                w*4,this.IMG_HEGHT*1, w, h, 
                x, y, 75, 75)
                this.audioHit.play();
                if(++this.imgDelayIndex2%30== 0){
                    this.flagOuch = false;
                    
                }
        }

        else if(this.flagGot){
            ctx.drawImage(this.imgGot,x+40, y-40, 90, 45);
            ctx.drawImage(this.img,
                w*4,this.IMG_HEGHT*8, w, h, 
                x, y, 75, 75)
                if(++this.imgDelayIndex3%30== 0){
                    this.flagGot = false;
                }
        }
        // 캐릭터 그리기
        else{
            ctx.drawImage(this.img,
                0+(w*this.imgIndex),this.IMG_HEGHT*this.imgY, w, h, 
                x, y, 75, 75)
                
        }
    }

    update() {
        super.update();
        
        // 점프
        if (this.flagJ){
            // 1단 점프
            if (this.countJump == 1){
                this.audioJump.play();
                let dy = this.basicY-150;
                
                let h = dy - this.y;
                
                let vy = Math.floor((dy-this.y)/h*this.speed);
                
                if (this.y >= dy && this.y <= this.basicY && this.isJumping){
                    this.y -= vy;
                }
                if (this.y == dy) {
                    this.isJumping = false;
                }
                if (!this.isJumping && this.y < this.basicY){
                    this.y += vy;
                }
                if (this.y == this.basicY && !this.isJumping){
                    vy = 0
                    this.isJumping = true;
                    this.flagJ = false;
                    this.countJump = 0;
                }
            }
            // 2단 점프(3단~ 점프 X)
            else{
                this.audioJump.play();
                
                let dy = this.basicY-200;
                let h = dy - this.y;
                
                
                let vy = Math.floor((dy-this.y)/h*this.speed);
                if (this.y >= dy && this.y <= this.basicY && this.isDoubleJumping){
                    this.y -= vy;
                    this.flagUp = true;

                }
                if (this.y == dy) {
                    this.isDoubleJumping = false;
                }
                if ( !this.isDoubleJumping && this.y < this.basicY){
                    this.y += vy;
                }
                if (this.y == this.basicY && !this.isDoubleJumping){
                    vy = 0;
                    this.isDoubleJumping = true;
                    this.flagJ = false;
                    this.countJump = 0;
                    this.flagUp = false;
                }
                
            }
        } 
        // 방향키 아래일 경우, 숙임
        else if (this.flagD){
            this.imgY = 3;
            this.imgIndex = 8;
        }
        // 일반 걷기
        else {
            this.imgY = 1;
            
            // this.x = 100;
            this.y = this.basicY;
            
            this.imgDelayIndex++;
            if(this.imgDelayIndex%10 == 0){
                this.imgIndex++;
                if(this.imgIndex == 4){
                    this.imgIndex = 1;
                }
                
            }
        }
        // 장애물과 부딪히면 flagAh 가 true가 됨.
        this.hit = function(){
            this.flagOuch = true;
        }

        this.kick = function(){
            this.flagGot = true;
            this.audioGetItem.play();
        }

        this.onMove= function(){
            this.x+=this.speed;
            if(this.x > 900){
                this.x = 900;
                this.nextstage=true;
            }
        }


        
    }
    jump(dir) {
        if (dir == "Space"){
            this.countJump ++;
            this.flagJ = true;

            this.imgY = 8;
            this.imgIndex = 0;
        }
    }
    down(dir){
        if (dir == "ArrowDown"){
            this.flagD = true;

            this.imgY = 3;
            this.imgIndex = 8;
        }
    }
    up(dir){
        if (dir == "ArrowDown"){
            this.flagD = false;

            this.imgY = 1;
            this.imgIndex = 0;
        }
    }
    get width(){
        return this.IMG_WIDTH;
    }
    get height(){
        return this.IMG_HEGHT;
    }

}