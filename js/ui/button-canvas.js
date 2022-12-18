import Button from "../intro/button.js";
import IntroCanvas from "./intro-canvas.js";

export default class ButtonCanvas{

    constructor(){
        this.button = new Button();
        this.imgBackground = document.getElementById("map");
        this.imgTitle = document.getElementById("gameTitle")
        this.obj = document.getElementById("button-canvas");
        
        // 내가 정의하는 이벤트
        this.onEnd = null;

        // <canvas> 이벤트를 사용하는 코드
        this.obj.onclick = this.clickHandler.bind(this);
         this.obj.onmousemove = this.MouseMoveHandler.bind(this);
        this.audio = null;

        this.audioClick = new Audio("/mini_prj/audio/audioClick.mp3")
    }
    display(a){
        this.obj.onclick = this.clickHandler.bind(this);
        this.obj.style.display = "inline-block";
        this.MouseMoveHandler();
        this.obj.style.opacity = 1
        if(a!=null)
            this.audio = a;
        else{
            this.audio = new Audio("/mini_prj/audio/intro-sound1.mp3"); 
            this.audio.loop = true;
            this.audio.volume = 0.3;
            this.audio.play();
        }
    }
    MouseMoveHandler(e){

        if(e!=undefined)
            this.button.changePointer(e.x,e.y);
    }
    clickHandler(e){
        this.button.checkPressed(e)
        if(this.button.isClicked){
            this.audioClick.play();
            this.obj.onclick = null; //2번클릭 방지
            document.body.style.cursor = 'default';//마우스포인터를 정상으로 복원
            this.fadeOut();
            this.onEnd(this.audio);
        }
    }
    draw(){
        var ctx = this.obj.getContext("2d");
        ctx.drawImage(this.imgBackground,0,0,250,250,0,0,900,900);
        ctx.drawImage(this.imgTitle,0,0,441,187,110,150,700,300);
        this.button.draw(ctx);    
    }
    update(){}
  
    run(){
            
        this.draw();

    }
    fadeOut(){
        var fadeEffect = setInterval(function () {
            if (!this.obj.style.opacity) {
                this.obj.style.opacity = 1;
            }
            if (this.obj.style.opacity > 0) {
                this.obj.style.opacity -= 0.02;
            } 
            else if (this.obj.style.opacity == 0){
                clearInterval(fadeEffect);
                this.obj.style.display = "none";
            }
        }.bind(this), 30);
    }

}