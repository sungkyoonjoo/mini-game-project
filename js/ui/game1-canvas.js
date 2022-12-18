import BackGround from "../stage1-item/background.js";
import Blocker from "../stage1-item/blocker.js";
import Player from "../stage1-item/player.js";
import Score from "../stage1-item/score.js";
import GameOver from "../stage1-item/gameover.js";
import context from "../stage1-item/item-context.js";
import SoccerBall from "../stage1-item/soccerball.js";
import Life from "../stage1-item/life.js";
//import Sound from "../stage1-item/sound.js";

export default class Game1Canvas {

    constructor() {
        this.background = new BackGround();
        this.player = new Player();
        
        this.score = new Score();
        this.life = new Life();

        this.gameover = new GameOver();

        context.items.push(this.player);
       
        this.obj = document.getElementById("game1-canvas");
        // this.obj.width = 900;
        // this.obj.height = 900;
        this.enemyInterval = 0;
        this.itemInterval = 0;
        this.itemDelay = 0;
        
        this.imgDelayIndex = 0;
        this.imgIndex = 0;

        this.timerId = 0;

        this.clearCount = 0;

        this.onEnd = null;
        
        this.obj.onclick = this.clickHandler.bind(this);
        this.obj.onkeydown = this.keyDownHandler.bind(this);
        this.obj.onkeyup = this.keyUpHandler.bind(this);

        this.audio = new Audio("/mini_prj/audio/URL Melt - Unicorn Heads.mp3");
        this.audioClear = new Audio("/mini_prj/audio/audioClear.mp3");
        this.audioStart = new Audio("/mini_prj/audio/audioStart.mp3");

        this.audioClear.volume = 0.3;
        this.audioStart.volume = 0.3;

    }
    reset(){
        context.items = [];

        this.player = new Player();
        this.score = new Score();
        this.life = new Life();
        this.gameover = new GameOver();

        context.items.push(this.player);
        this.clearCount = 0;
        
    }
    clickHandler(e){
        if(this.gameover.flag){
            clearTimeout(this.timerId);
            this.replay(this.audio);
            this.obj.style.display = "none";
            this.reset();
        }
    }
    keyDownHandler(e) {
        switch (e.code){
            case "Space" :
                this.player.jump("Space");
                break;
            case "ArrowDown" :
                this.player.down("ArrowDown");
                break;
        }   
    }
    keyUpHandler(e) {
        if (e.code == "ArrowDown")
            this.player.up("ArrowDown");
    }
    display(a){
        this.obj.style.display = "inline-block";
        this.obj.style.opacity = 1
        this.obj.focus();
        a.pause();
        a = null;
        this.audio.loop = true;
        this.audio.volume = 0.3;
        this.audio.play();
        this.audioStart.play();
        
    }
    run() {
        this.timerId = setTimeout(() => {
            if (!this.gameover.flag){
                var ctx = this.obj.getContext("2d");
                ctx.clearRect(0,0,this.obj.width,this.obj.height);
                
    
                // 장애물 랜덤생성
                if (this.enemyInterval == 0){
                    let blocker = new Blocker();
                    context.items.push(blocker);
                    // 장애물에 부딪히면 체력이 깎임
                    blocker.minusLife = function(){
                        this.life.num++;
                    }.bind(this);
    
                    this.randAppearGap = Math.floor(Math.random()*20);
                };
                this.enemyInterval++;
                this.enemyInterval %= this.randAppearGap+80;
    
                // 축구공 랜덤생성
                if (this.itemInterval == 0){
                    this.itemDelay++;
                    if(this.itemDelay%Math.floor(Math.random()*10) == 0)
                        var itemY = 500;
                    let soccerball = new SoccerBall(900, itemY);
                    context.items.push(soccerball);
                    
                    // 축구공을 먹을때 점수가 올라감.
                    soccerball.addScore = function(){
                        this.score.countNum--;
                    }.bind(this);
    
                    this.randAppearGap2 = Math.floor(Math.random()*20);
                };
                this.itemInterval++;
                this.itemInterval %= this.randAppearGap2+30;
                
                // 객체삭제를 삭제한다.
                context.items.forEach((element, i, arr) => {
                    element.deleteItem = function(){
                        arr.splice(i,1);
                    }});
    
                this.background.update();
                for (var item of context.items)
                    item.update();
    
                this.background.draw(ctx);
                for (var item of context.items)
                    item.draw(ctx);

                // 하트/점수 그리기
                this.life.draw(ctx);
                this.score.draw(ctx);
    
    
                // 축구공 10개를 모으면 다음 스테이지 (숫자가 줄어든다.)
                if(this.score.countNum <= 0){
                    // stageClear 효과음 1번 재생을 위한 코드
                    ++this.clearCount;
                    if(this.clearCount==1){
                        this.audioClear.play();
                    }

                    this.background.drawClear(ctx);

                    // 캐릭터가 앞으로 움직인다.
                    this.player.onMove();

                    // 장애물/축구공 삭제
                    for(var item of context.items){
                        if(item.type == "ball" || item.type == "blocker")
                            item.deleteItem();
                    }
                    
                    if(this.player.nextstage){
                        this.onEnd(this.audio);
                        this.player.nextstage = false;
                        clearTimeout(this.timerId);
                        this.obj.style.display = "none";
                        return;
                    }            
                }
                // 목숨 3개를 소모하면 게임 종료
                if(this.life.num == 3){
                    this.gameover.flag = true;
                    console.log("game over");
                }         
            }
            // 게임 오버
            else {
                var ctx = this.obj.getContext('2d');
                
                this.background.update();
                this.background.draw(ctx);
                
                this.gameover.draw(ctx);
            }
            this.run();

        }, 1000/60)

    }
    
}