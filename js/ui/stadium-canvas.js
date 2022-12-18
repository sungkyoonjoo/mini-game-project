import Stadium from "../stage1-item/stadium.js"

export default class stadiumCanvas{

    constructor(x=0, y=0){
        this.stadium = new Stadium();
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.obj = document.getElementById("stadium-canvas");
        this.timerId = 0;
        this.backgroundX = 0;
        // 내가 정의하는 이벤트
        // <canvas> 이벤트를 사용하는 코드
        this.obj.onclick = this.clickHandler.bind(this);
        this.obj.onmousemove = this.MouseMoveHandler.bind(this);

        this.audio = null;


    }
    reset(){
        this.stadium = new Stadium();
        this.obj.onclick = this.clickHandler.bind(this);
    }
    display(a){
        this.obj.style.display = "inline-block";
        this.obj.style.opacity = 1
        this.obj.focus();
        this.audio = a;
    }
    //지정된 위치에서 클릭됐는지 체크
    clickHandler(e){
        this.stadium.checkPressed(e)
        
    }
    //마우스포인터 모양변경
    MouseMoveHandler(e){
        if(e!=undefined)
            this.stadium.changePointer(e.x,e.y);
    }
    draw(){}
    update(){}
    
    run(){
         this.timerId = setTimeout(() => {
            var ctx = this.obj.getContext("2d");
            this.stadium.draw(ctx);
            if(this.stadium.isClicked){
                this.stadium.drawPlayer(ctx);
                this.stadium.update();
                this.stadium.flagClick = false;
                this.obj.onclick = null;
                document.body.style.cursor = 'default';
            }
            if(this.stadium.flagNext){                
                clearTimeout(this.timerId);
                this.fadeOut();
                this.onEnd(this.audio);
                return;
            }
            this.run();
         },1000/60);
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
                this.reset();
            }
        }.bind(this), 30);
    }

}