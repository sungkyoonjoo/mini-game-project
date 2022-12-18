export default class Game3IntroCanvas{
    constructor(){
        this.canvas = document.getElementById("game3-intro");

        this.ctx = this.canvas.getContext("2d");

        this.img = document.getElementById("goal");
        this.memoaImage = document.getElementById("game3-notice2")
        this.memobImage = document.getElementById("game3-notice3")

        this.audioClick = new Audio("/mini_prj/audio/audioClick.mp3")

        this.canvas.onkeydown = this.keydownHandler.bind(this);

        this.memo=0;

        this.timerId = 0;
        this.flagEnd = false;
        this.audio = null;
    }
    display(a){
        this.canvas.style.display = "inline-block";
        this.canvas.focus();
        this.canvas.style.opacity = 1
        console.log(a);
        this.audio = a;
    }
    keydownHandler(e){
        if(e.code == "Space"){
            this.flagEnd = true;
            if(this.flagEnd){
                this.audioClick.play();
                this.onEnd(this.audio);
                clearTimeout(this.timerID)
                this.canvas.style.display = "none";
                return;
            }
        }
    }
    
    drawGoal1(ctx){
        ctx.drawImage(this.img,
                    3,3,258,195,
                    0,0,532,300);
    }
    drawLuck(ctx){
        ctx.drawImage(this.luckImage,
            1,3,258,195,
            0,0,532,300);
    }

    drawMemoa(){
        this.ctx.drawImage(this.memoaImage,
            0,0,499,499,
            0,0,532,300
        )
    }
    drawMemob(){
        this.ctx.drawImage(this.memobImage,
            0,0,499,499,
            0,0,532,300
        )
    }
    memoRun(){
        if(this.memo==1){
           this.drawMemoa();
           this.memo--;
        }
        else if(this.memo==0){
           this.drawMemob();
           this.memo++;
        }
    }
    run(){
        this.timerId = setTimeout(() => {
            this.drawGoal1(this.ctx);
            this.memoRun();
            this.ctx.font = "25px bold";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("'Space'를 누르면 SKIP", 150,200)

            this.run();
        }, 500)
    }
}
