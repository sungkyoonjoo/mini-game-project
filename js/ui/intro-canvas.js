import Player from "../intro/player.js"
import Ball from "../intro/ball.js";
import Title from "../intro/title.js";
import Background from "../intro/background.js";

export default class IntroCanvas{

    constructor(){
        this.obj = document.getElementById("intro-canvas");
        this.img = document.getElementById("map");
        this.imgSkip = document.getElementById("skip");
        // this.img = document.getElementById("boy");
        this.timerId = 0;

        //메인 게임 캐릭터의 객체 생성
        this.player1 = new Player();
        this.player2 = new Player(900,400,5,500,500,60);
        this.player3 = new Player(150,350,2,50,50,40);
        this.player4 = new Player(0,400,7,300,300,30);

        //축구공의 객체 생성
        this.ball1 = new Ball();
        this.ball2 = new Ball(700,450,400,400,50);
        this.ball3 = new Ball(100,350,50,50,30);

        this.title = new Title(); // 게임 타이틀의 객체
        this.background = new Background(); // 배경화면 객체
        this.imgClick = document.getElementById("click");

        this.clickFlag = false;
        this.isClicked = false;

        this.startX = 750;
        this.startY = 0;
        this.endX =150;
        this.endY = 70;

        this.startPointX = 1630;
        this.startPointY = 18;
        this.endPointX =225;
        this.endPointY = 34;

        // 내가 정의하는 이벤트
        this.onEnd = null;
        // <canvas> 이벤트를 사용하는 코드
        this.obj.onclick = this.clickHandler.bind(this);
        this.obj.onmousemove = this.MouseMoveHandler.bind(this);
        this.audio = new Audio("/mini_prj/audio/intro-sound1.mp3");
    }
    display(a){
        this.obj.style.display = "inline-block";
        this.obj.style.opacity = 1
        this.audio.volume = 0.3;
        this.audio.loop = true;
        this.audio.play();
    }
    clickHandler(e){
        console.log("click");
        // 인트로가 끝나면 내 상관에게 다시전화(callback)를 해야지
        this.checkPressed(e);
        if(this.isClicked){
            this.onEnd(this.audio);
            clearTimeout(this.timerId);
            this.obj.style.display="none";
           
        }
        else if (this.clickFlag){
            this.onEnd(this.audio);
            clearTimeout(this. timerId);
            this.obj.style.display="none";
        }
    }
    MouseMoveHandler(e){
        // console.log(e.x + "  "+e.y)
        if(e!=undefined)
            this.changePointer(e.x,e.y);
    }
    draw(){
        var ctx = this.obj.getContext("2d");
        ctx.drawImage(this.img,0,this.backgroundY)
    }

    update(){
        this.backgroundY--;
        
        
    }
    run(){
        this.timerId = setTimeout(()=>{

            // 캔버스 생성
            var ctx = this.obj.getContext("2d");  
            ctx.clearRect(0,0,900,900);

            this.background.draw(ctx);
            this.player1.draw(ctx);
            this.player1.update1();

            if(this.player1.x >= 300){
                this.ball1.draw(ctx);
                this.ball1.update1();
            }

            if(this.player1.x >= 700){
                this.player2.draw(ctx);
                this.player2.update2();
            }

            if(this.player2.x<200){
                this.ball2.draw(ctx);
                this.ball2.update2();
            }

            if(this.player2.x<-200){
                this.player3.draw(ctx);
                this.player3.update3();
            }

            if(this.player3.w>350){
                this.ball3.draw(ctx);
                this.ball3.update3();
            }

            if(this.player3.w>520){
                this.player3.imgIndexX=3;
                this.player3.imgIndexY=3;
            }

            if(this.player3.w>700){
                this.player4.draw(ctx);
                this.player4.update4();
            }

            if(this.player4.x>350){
                this.title.draw(ctx);
                this.title.update();
            }

            if(this.ball3.w>300){
                this.ball3.w=0;
                this.ball3.h=0;
                this.ball3.speed=0;
            }
            
            if(this.player4.x>600){
                this.player4.x=600;
            }

            if(this.title.x>30){
                this.clickFlag = true;
                this.title.x = 30;
                this.player4.imgIndexY = 14;
            }
            
            if(this.clickFlag)
                ctx.drawImage(this.imgClick,0,0,207,180,720,300,100,80);

            
            ctx.drawImage(this.imgSkip,this.startX,this.startY,this.endX,this.endY);

            this.run();
        },1000/60)

        // window.setTimeout(this.run.bind(this), 1000/60); // 1000/60 = 17

    }
    checkPressed(e){
        let x = e.x;
        let y = e.y;
        if(this.startPointX < x && x < this.startPointX+this.endPointX 
            && this.startPointY < y && y < this.startPointY+this.endPointY){
                this.isClicked = true;
            }
    }

    changePointer(x,y){
        if(this.startPointX < x && x < this.startPointX+this.endPointX 
            && this.startPointY < y && y < this.startPointY+this.endPointY){
                document.body.style.cursor = 'pointer';
        }
        else
            document.body.style.cursor = 'default';
    }
    killAudio(a){
        a.pause();
        a = null;
    }

}