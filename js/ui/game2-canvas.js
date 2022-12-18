import Player from "../stage2-item/player.js";
import Background from "../stage2-item/background.js";
import Ball from "../stage2-item/ball.js";
import Defender from "../stage2-item/defender.js";
import Referee from "../stage2-item/referee.js";
import Pigeon from "../stage2-item/pigeon.js";
import Card from "../stage2-item/card.js";
import context from "../stage2-item/itemContext.js";
import GoldenBall from "../stage2-item/goldenBall.js";
import GoalPost from "../stage2-item/goalpost.js";

export default class Game2Canvas{
    constructor(){
        this.obj = document.getElementById('game2-canvas');
        this.obj.width = 900;
        this.obj.height = 900;

        
        this.player = new Player(this.obj.width/2,this.obj.height-60);
        context.items.push(this.player);

        this.background = new Background();
        this.gameOverImg = new Image();
        this.gameOverImg.src = './image/gameover.png'
        
        this.goalPost = new GoalPost();
        this.goldenBall = new GoldenBall(300, 300);
        context.items.push(this.goldenBall);
        this.time = 100;
        this.timeDelay = 0;
        this.gameClear = false;
        this.gameOver = false;
        this.timerId = 0;

        this.maxDelay = 20;
        this.spaceDelay = 0;
        this.enemyInterval = 0;
        this.randAppearGap = 0;

        var ctx = this.obj.getContext("2d");
        this.player.draw(ctx);

        this.obj.onclick = this.clickHandler.bind(this);
        this.obj.onkeydown = this.keyDownHandler.bind(this);
        this.obj.onkeyup = this.keyUpHandler.bind(this);
        this.audio = null;
        this.audioKick = new Audio("/mini_prj/audio/stage2-kick-ball.mp3");
    } 

    display(a){
        this.obj.style.display = "inline-block";
        this.obj.style.opacity = 1
        this.obj.focus();
        this.audio = a;
    }
    clickHandler(){
        if(this.gameOver){
            clearTimeout(this.timerId);
            this.replay(this.audio);
            this.obj.style.display = "none";
            this.reset();
        }
    }
    reset(){
        context.items = [];

        this.player = new Player(this.obj.width/2,this.obj.height-60);
        this.goldenBall = new GoldenBall(300, 300);

        context.items.push(this.player);
        context.items.push(this.goldenBall);

        this.gameOver = false;
        this.time = 100;
    }
    keyDownHandler(e){
        switch(e.code){
            case "ArrowLeft" :
                this.player.move("Left");
                break;
                
            case "ArrowRight" :
                this.player.move("Right");
                break;
                
            case "ArrowUp" :
                this.player.move("Up");
                break;
                
            case "ArrowDown" :
                this.player.move("Down");
                break;
                
            case "Space" :
                if(this.spaceDelay > 20){
                    if(!this.player.playerDie && !this.gameOver){
                        var ball = this.player.fire();
                        context.items.push(ball);
                        this.spaceDelay = 0;
                        this.audioKick.play();
                    }
                }
                break;
            }
    }
    keyUpHandler(e){
        switch(e.code){
            case "ArrowLeft" :
                this.player.stop("Left");
                break;
                
            case "ArrowRight" :
                this.player.stop("Right");
                break;
            
            case "ArrowUp" :
                this.player.stop("Up");
                break;
                
            case "ArrowDown" :
                this.player.stop("Down");
                break;
        }
    }

    run(){ 
        this.timerId = setTimeout(() => {
            //적 랜덤으로 생성
            if(!this.gameOver){
                if(this.enemyInterval == 0){         
                    var dx = Math.floor(Math.random()*(this.obj.width-400)+200);  
                    var defender = new Defender(dx);
                    context.items.push(defender);
                    this.randAppearGap = Math.floor(Math.random()*30);
                } 
                if(this.enemyInterval == 30)  {
                    var rx = Math.floor(Math.random()*(this.obj.width-400)+200);  
                    var referee = new Referee(rx,0,'Y');
                    context.items.push(referee);
                }
                if(this.enemyInterval == 60){
                    var rx = Math.floor(Math.random()*(this.obj.width-400)+200);
                    var referee = new Referee(rx,0,'R');
                    context.items.push(referee);
                }    
                if(this.enemyInterval == 90){
                    var rx = Math.floor(Math.random()*(this.obj.width-400)+200);
                    var pigeon = new Pigeon(rx,0);
                    pigeon.move(this.player.x, this.player.y);
                    context.items.push(pigeon);
                }  

                //배경 그림 생성
                this.background.update();

                //시간 타이머
                this.timeDelay++;
                if(this.timeDelay == 60){
                    this.time--;
                    this.timeDelay = 0;
                }
            }
            
            this.enemyInterval++;
            this.enemyInterval %= this.randAppearGap+120;

            /************** 객체 삭제 로직 ****************/
            context.items.forEach((element,i,arr) => {
                element.deleteItem = function(){
                    arr.splice(i,1);
                }
            });

        

            this.spaceDelay++;
           

            for(var item of context.items){
                item.update();
            }

            //그림 그리기
            var ctx = this.obj.getContext("2d");
            ctx.clearRect(0, 0, this.obj.width, this.obj.height);
            this.background.draw(ctx);
            
            //공을 먼저 그리고나서
            for(var item of context.items){
                if(item.type=="B")
                    item.draw(ctx);
            }
            //선수를 그려야 공이 선수 몸 아래에서 발사됨.
            for(var item of context.items){
                if(item.type!="B")
                    item.draw(ctx);
            }
            this.drawScore(ctx);
            this.drawTime(ctx);
        
        
            if(this.player.myLife == 0 || this.time == -1){
                this.gameOver = true;
                ctx.drawImage(this.gameOverImg, 0, 0, 226, 166, 150, 100, 600, 400);
                context.items = [];

            }
        
            if(this.player.myScore >= 10 && !this.gameOver){
                this.goldenBall.appear = true;
                this.goalPost.draw(ctx);
            }

            //최종 승리
            if(this.player.gameClear == true){
                this.background.drawClear(ctx);
                clearTimeout(this.timerId);
                this.fadeOut();
                this.onEnd(this.audio);
                return;
            }
            this.run();
        }, 1000/60)

    }
    drawScore(ctx){
        ctx.font = "30px bold";
        ctx.fillStyle = "white";
        ctx.fillText("Score : "+this.player.myScore, 160, 30);
    }
    drawTime(ctx){
        ctx.font = "30px bold";
        ctx.fillStyle = "white";
        ctx.fillText("Time : "+this.time, this.obj.width/2-50, 30);
    }
    fadeOut(){
        var fadeEffect = setInterval(function () {
            if (!this.obj.style.opacity) {
                this.obj.style.opacity = 1;
            }
            if (this.obj.style.opacity > 0) {
                this.obj.style.opacity -= 0.02;
            } else {
                clearInterval(fadeEffect);
                this.obj.style.display = "none";
            }
        }.bind(this), 30);
    }
}

