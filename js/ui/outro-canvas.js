import Player from "../outro/player.js";
import Trophy from "../outro/trophy.js";
import Stadium from "../outro/stadium.js"
import Firework from "../outro/firework.js";
import CompleteLogo from "../outro/complete-logo.js";
import Closing from "../outro/closing.js";
import Thief from "../outro/thief.js";
import ButtonCanvas from "./button-canvas.js";

export default class OutroCanvas{
    constructor(){

        this.obj = document.getElementById("outro-canvas"); // this.obj 는 Canvas 선언

        this.obj.width = 532;
        this.obj.height = 300;

        //메인 게임 캐릭터의 객체 생성
        this.player1 = new Player();
        this.player2 = new Player(532,150,13,90,90,40);
        this.player3 = new Player(100,100,2,50,50,10);
       
        //트로피의 객체 생성
        this.trophy1 = new Trophy();
        this.trophy2 = new Trophy(505,150,80,80,40);
        this.trophy3 = new Trophy(140,100,50,50,10);

        this.stadium = new Stadium(); // 경기장 객체 생성 

        //불꽃놀이 객체 생성
        this.firework1 = new Firework();
        this.firework2 = new Firework(350,0,180,180,10);

        this.completeLogo = new CompleteLogo(); // 미션 성공 로고
        this.closing = new Closing(); // 엔딩크레딧
        this.thief = new Thief(); // 도둑
        
        this.wow = document.getElementById("wow"); // 느낌표 말풍선 객체
        this.imageBackHome = document.getElementById("back-home"); 
        this.delayImage = 0;
        
        this.wowW = 60; // 느낌표 말풍선 객체의 width
        this.wowH = 60; // 느낌표 말풍선 객체의 height

        this.onClosing = false; // 엔딩 크레딧이 끝났을 때의 boolean
        this.onChase = false; // 도둑을 쫓아가기의 boolean
        this.onChange = false; // 미션 성공 로고를 게임 다시하기 로고로 변경하기 위한 boolean

        this.isClicked = false;
        this.obj.onclick = this.clickHandler.bind(this); 
        this.timerId = 0;
        
        this.audio = new Audio("/mini_prj/audio/outro-sound.mp3");
    }
    
    clickHandler(e){
        
        // if(e)
        //     this.isClicked = true;
      
    }
    reset(){
        //메인 게임 캐릭터의 객체 생성
        this.player1 = new Player();
        this.player2 = new Player(532,150,13,90,90,40);
        this.player3 = new Player(100,100,2,50,50,10);
       
        //트로피의 객체 생성
        this.trophy1 = new Trophy();
        this.trophy2 = new Trophy(505,150,80,80,40);
        this.trophy3 = new Trophy(140,100,50,50,10);

        this.stadium = new Stadium(); // 경기장 객체 생성 

        //불꽃놀이 객체 생성
        this.firework1 = new Firework();
        this.firework2 = new Firework(350,0,180,180,10);

        this.completeLogo = new CompleteLogo(); // 미션 성공 로고
        this.closing = new Closing(); // 엔딩크레딧
        this.thief = new Thief(); // 도둑

        this.onClosing = false; // 엔딩 크레딧이 끝났을 때의 boolean
        this.onChase = false; // 도둑을 쫓아가기의 boolean
        this.onChange = false; // 미션 성공 로고를 게임 다시하기 로고로 변경하기 위한 boolean

        this.isClicked = false;

    }
    display(a){
        console.log("나는 아웃트로");
        this.obj.style.display = "inline-block";
        this.obj.style.opacity = 1
        this.obj.focus();
        a.pause();
        a = null;
        this.audio.loop = true;
        this.audio.volume = 0.3;
        this.audio.play();
        this.reset();
    }

    run(){
        this.timerId = setTimeout(() => {
    
            // 캔버스 생성
            var ctx = this.obj.getContext("2d");  
            ctx.clearRect(0,0,900,800);
    
            this.stadium.draw(ctx);
            this.stadium.update();
            
            this.player1.draw(ctx);
            this.player1.update1();
    
            this.trophy1.draw(ctx);
            this.trophy1.update1();
    
            if(this.player1.x>534){
                this.player2.draw(ctx);
                this.player2.update2();
                this.trophy2.draw(ctx);
                this.trophy2.update2();
            }
    
            if(this.player2.x<0){
                this.player3.draw(ctx);
                this.player3.update3();
                this.trophy3.draw(ctx);
                this.trophy3.update3();
            }
    
            if(this.player3.w>250){ // 세번째 플레이어와 트로피 없어지는 효과
    
                this.player3.w=0;
                this.player3.h=0;
                this.player3.speed = 0; 
    
                this.trophy3.w=0;
                this.trophy3.h=0;
                this.trophy3.speed = 0; 
    
                this.player1.x=200;
                this.player1.y=150;
                this.player1.speed=0;
                this.player1.imgIndexY=12;
    
                this.trophy1.x=290;
                this.trophy1.y=175;
                this.trophy1.speed=0;
    
            }
    
            if(this.trophy1.speed==0){
                this.firework1.draw(ctx);
                this.firework1.update1();
        
                this.firework2.draw(ctx);
                this.firework2.update1();
    
                this.completeLogo.draw(ctx);
                this.completeLogo.update();   
            }
    
            setTimeout(()=>{ // 여기를 클릭으로 크레딧을 볼 수 있도록 하기
                this.onClosing = true;
            },11000)
    
            // if(this.isClicked) // 화면을 클릭 하면 엔딩 크레딧을 생성
            //     this.onClosing = true;
            
            
            if(this.onClosing){
                this.closing.draw(ctx);
                this.closing.update();
            }
    
            if(this.closing.y<=-1300){
                this.thief.draw(ctx);
                this.thief.update();
            }
    
            if(this.thief.x<290){
                this.trophy1.x-=4;
            }
    
            if(this.thief.x<0){
                this.player1.imgIndexX=4;
                this.player1.imgIndexY=0;
                ctx.drawImage(this.wow,0,0,180,180,220,100,this.wowW,this.wowH);
                
                setTimeout(()=>{
                    this.onChase = true;
                },2000)
             
            }
            
            if(this.onChase){
                this.player1.x -= 6;
                this.player1.imgIndexY = 11;
                this.wowH = 0;
                this.wowW = 0;
    
                setTimeout(()=>{
                    this.onChange = true;
                },1000)
            }
    
            if(this.onChange){
                this.onEnd(this.audio);
                clearTimeout(this.timerId);
                this.obj.style.display = "none";
                return;
            }    
            this.run();
        }, 1000/60)
    }
}
