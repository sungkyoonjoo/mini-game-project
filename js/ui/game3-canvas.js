export default class Game3Canvas{

    //빨강색일때 타이밍 맞추기!
    //랜덤함수로 타이밍 트루일때!

    constructor(){
        this.obj = document.getElementById("game3-canvas");
        this.ctx = this.obj.getContext("2d");

        this.delayImage =0;
        this.imageDelay = -1;
        this.moveWk = 1;
        this.moveIm = 100;
        this.randomTiming = 10;
        this.success = false;
        this.fail = false;
        this.successGauge =0;
        this.dx=0;
        this.dy=0;
        this.successPer = 0;
        this.bi=0;
        this.di=0;
        this.moveGk=1;
        this.timerID=0;
        this.gkI = 30;
        this.chance = 0;

        this.test = false;
        this.test1 = false;

        this.flagSpace = false;
        this.space = false;

        this.flagg = false;

        this.obj.onkeydown = this.keyDownHandler.bind(this);
        this.obj.onkeyup = this.keyUpHandler.bind(this);
        this.obj.onclick = this.clickHandler.bind(this);
        //마지막 시험
        this.endTest= false;
        this.failTest = false;

        this.numRand;
        this.successArray = [null, null, null, null];

        this.img = document.getElementById("goal");
        this.winImage = document.getElementById("player");
        this.luckImage = document.getElementById("luck");
        this.gaugeImage = document.getElementById("gauge");
        this.successImage = document.getElementById("success")
        this.failImage = document.getElementById("fail")
        this.backImage = document.getElementById("back1")
        this.ballImage = document.getElementById("ball")
        this.gameoverImage = document.getElementById("gameover")
        this.goalKeeperImage = document.getElementById("goal-keeper")
        this.goalSKeeperImage = document.getElementById("goal-S-keeper")
        this.legTestImage = document.getElementById("leg")
        this.finalImage = document.getElementById("luck")

        this.audio = null;
        this.audioClear = new Audio("/mini_prj/audio/stage3Clear.mp3");
        this.audioSuccess = new Audio("/mini_prj/audio/spaceSuccess.mp3");
        this.audioFail = new Audio("/mini_prj/audio/spaceFail.mp3");
        
    }
    display(a){
        this.obj.style.display = "inline-block";
        this.obj.focus();
        this.obj.style.opacity = 1
        console.log(a);
        this.audio = a;
    }
    reset(){
        this.delayImage =0;
        this.imageDelay = -1;
        this.moveWk = 1;
        this.moveIm = 100;
        this.randomTiming = 10;
        this.success = false;
        this.fail = false;
        this.successGauge =0;
        this.dx=0;
        this.dy=0;
        this.successPer = 0;
        this.bi=0;
        this.di=0;
        this.moveGk=1;
        this.timerID=0;
        this.gkI = 30;
        this.chance = 0;

        this.successArray = [null, null, null, null];
        this.test = false;
        this.test1 = false;
        this.flagSpace = false;
        this.space = false;
        this.flagg = false;
        this.endTest= false;
        this.failTest = false;
        this.ctx.clearRect(0,0,900,900);
    }
    clickHandler(){
        if(this.failTest){
            this.replay(this.audio);
            this.obj.style.display = "none";
            this.reset();
        }
    }
    drawGoal1(ctx){
        ctx.drawImage(this.img,
                    3,3,258,195,
                    0,0,532,300);
    }
    drawGoal2(ctx){
        ctx.drawImage(this.img,
                    263,3,258,195,
                    0,0,532,300);
    }
    drawLuck(ctx){
        ctx.drawImage(this.luckImage,
            1,3,258,195,
            0,0,532,300);
    }

    drawFail(ctx){
        ctx.drawImage(this.winImage,
                    144,1728,144,144,
                    0,0,144,144);
    }

    keyDownHandler(e){
        if(e.code=='Space'){
            this.success = true;
        }
    }
    keyUpHandler(e){
        if(e.code=='Space'){
            this.fail = true;
        }
    }    

    drawFinal(){
        this.ctx.drawImage(this.finalImage,
            1,3,258,195,
            0,0,532,300);
    }
    drawGoalkeeper(){
        this.ctx.drawImage(this.goalKeeperImage,
            0,0,30,53,
            200,80,90,90);
    }

    gameover(){
        this.ctx.drawImage(this.gameoverImage,
                        0,0,300,300,
                        155,70,326,266);
    }

    trueFalse(){
        if(this.chance <6){
            if(this.fail==true && this.flagSpace==false){
                this.test1 = true;

                console.log("실패!");
                this.audioFail.play();
                this.flagSpace == false;
            }
            else if(this.flagSpace ==true){
                this.test = true;
                
                //test
                this.successPer++;
                for(let i =0; i <this.successPer; i++){
                    this.successArray[i] = this.success;
                }
                console.log("성공!");
                this.audioSuccess.play();
                if(this.successGauge<1212)
                    this.successGauge += 303;
                }
            
            }
            
        this.chance++;
    }
    //test
    endingScene(){
        this.ctx.drawImage(this.img,
                        100,100,50,50,
                        0,0,532,300);
    }
    //test
    final(){
        this.ctx.drawImage(this.backImage,
                        1,3,687,314,
                        0,0,532,300);
    }

    ball(){
        this.ctx.drawImage(this.ballImage,
                    0,0,800,800,
                    240+this.bi/20,240-this.bi,50+this.bi,50+this.bi*1.5);
    }

    ball1(){
        this.ctx.drawImage(this.ballImage,
                    0,0,800,800,
                    240,150,130,120);
    }

    ball2(){
        this.ctx.drawImage(this.ballImage,
            0,0,800,800,
            240+this.bi/3-this.di,240+this.bi/2+this.di/2,45+this.bi/40,45+this.bi/40);
    }

    leg(){
        this.ctx.drawImage(this.legTestImage,
                0,0,130,145,
                50,-40,300,300);
    }

    keeper1(){
        this.ctx.drawImage(this.goalKeeperImage,
                    0,0,30,50,
                    225,90,100,80);
    }
    keeper2(){
        this.ctx.drawImage(this.goalKeeperImage,
                    0,0,30,50,
                    225,90,100,80);
    }
    keeperS(){
        this.ctx.drawImage(this.goalSKeeperImage,
            0,0,50,50,
            275,75,100,100);
    }
    keeperX(){
        this.ctx.drawImage(this.goalSKeeperImage,
            50,0,50,50,
            275,55,100,100);
    }
    keeperF(){
        this.ctx.drawImage(this.goalSKeeperImage,
            100,0,50,50,
            285,75,100,100);
    }
    //test
    playerFail(){
        this.ctx.drawImage(this.winImage,
            144*5,144*1,144,144,
            this.dx-this.moveIm,150,144,144
            )
    }

    playerSc(){
        this.ctx.drawImage(this.winImage,
            144*4,144*4,144,144,
            this.dx-this.moveIm,150,144,144
            )
    }

    //test

    ending(){
        clearTimeout(this.timerID);
        return;
    }

    backGround(){
        if(this.delayImage%5==0){
            this.drawLuck(this.ctx);
            
            this.drawGoalkeeper();
            this.delayImage++;
            this.flagSpace = true;
            this.success = false;
            // console.log(this.flagSpace);
        }
        else if(this.delayImage%2==0){
            this.drawGoal1(this.ctx);

            this.drawGoalkeeper();
            this.delayImage++;
            this.flagSpace = false;
            this.success = false;
            // console.log(this.flagSpace);
        }
        else if(this.delayImage%2==1){
            this.drawGoal2(this.ctx);
            
            this.drawGoalkeeper();
            this.delayImage++;
            this.flagSpace = false;
            this.success = false;
            // console.log(this.flagSpace);
        }
    }

    standing(){
        if(this.test1){
            this.ctx.drawImage(this.winImage,
                144*5,144*1,144,144,
                this.dx-this.moveIm,150,144,144);

            this.ctx.drawImage(this.failImage,
                0,0,336,98,
                this.dx-this.moveIm+30,70,168,98);
                this.test1 = false;


        }   
        else if(this.test){
            this.ctx.drawImage(this.winImage,
                144*3,144*2,144,144,
                this.dx-this.moveIm,110,144,144);
                this.ctx.drawImage(this.successImage,
                    0,0,336,98,
                    this.dx-this.moveIm-10,50,168,98);
                this.test = false;
        }

        else{
        this.ctx.drawImage(this.winImage,
                    144*this.moveWk,1152,144,144,
                    this.dx-this.moveIm,150,144,144);
            if(this.moveWk<9){
                this.moveWk++;
                this.moveIm--;
                if(this.moveWk==9){
                    return this.moveWk=1;
                }
            }
        }
    }
    
    update(){
    
        if(this.dx >= 200){
            this.numRand = Math.random()*4;
            var a = Math.floor(this.numRand);

            if(this.successArray[a] == true){   
                this.endTest = true;
                this.endingScene();
                this.leg();
                this.ball1();
                this.final();
                this.audioClear.play();
                this.timerID1 = setTimeout(()=>{ 
                    this.drawLuck(this.ctx);

                    this.run2();
                    clearTimeout(this.timerID1);
                     
                    return;
                },1000);
            }
            else{
                this.endingScene();
                this.leg();
                this.ball1();
                this.final();
                this.failTest = true;
                
                this.timerID1 = setTimeout(()=>{ 
                    this.drawLuck(this.ctx);

                    this.run1();
                    clearTimeout(this.timerID1);
                    return;
                },1000);
            }
        }
    }
    
    run1(){
        this.drawFinal();
        this.ball2();
        if(this.di > -250){
            for(let i=0; i<30; i++){
                this.di-=2;
                this.playerFail();
            }
            this.keeperS();
        }
        else if(this.di >=-300){
            this.keeperX();
            this.playerFail();
            this.di--;
        }
        else if(this.di>=-320){
            this.keeperF();
            this.playerFail();
            this.di--;
        }
        else{
            this.keeperF();
            this.flagg = true;
            if(this.flagg == true){
                this.playerFail();
                this.gameover();
            }
            return;
        }
        setTimeout(this.run1.bind(this),100);
    }

    run2(){
        this.drawFinal();
        this.ball2();
        if(this.bi>=-300){
            for(let i=0; i<10; i++){
                this.bi-=3;  
            }
            this.playerSc();
            this.keeperS();
            
        }
        else if(this.bi>=-320){
            this.keeperX();
            this.playerSc();
            this.bi--;
        }
        else if(this.bi>=-340){
            this.keeperF();
            this.playerSc();
            this.bi--;
        }
        else{
            this.keeperF();
            this.playerSc();
            this.onEnd(this.audio);
            clearTimeout(this.timerID)
            this.obj.style.display = "none";
        return;

        }
        setTimeout(this.run2.bind(this),100);
    }

    percent(){
        this.ctx.drawImage(this.gaugeImage,
            this.successGauge-303,0,300,197.25,
            340,210,200,130);
    }
        
    run(){
        this.timerID = setTimeout(()=>{
            if(!this.endTest&&!this.failTest){
            if(this.success){
            this.trueFalse();
             }
        
            this.backGround(); //배경그림 !조건달성시 백그라운드 교체
            
            this.standing();  //캐릭움직임

            this.percent();  //게이지그림

            this.dx += 9; //x값 위치

            this.ball();  //공그림

            this.update();
    
            this.run();
            }
        },300);
    }
}