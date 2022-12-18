export default class Stadium {

    constructor(){
        this.x = 100;
        this.y = 740;
        this.speedX = 5;
        this.speedY = 2;

        this.w = 144;
        this.h = 144;

        this.flagClick = true;
        this.flagNext = false;
        this.isClicked = false;

        this.imgIndex = 0;
        this.imgY = 1;
        this.imgDelayIndex = 0;
        this.imgDelayIndex2 = 0;
     
        this.img = document.getElementById("background");
        this.imgStadium = document.getElementById("stadium-background");
        this.imgPlayer = document.getElementById("player");
        this.imgClick = document.getElementById("click-to-continue")

        this.startX = 130;
        this.startY = 640;
        this.endX = 200;
        this.endY = 100;

        this.startPointX = 290;
        this.startPointY = 770;
        this.endPointX =700;
        this.endPointY = 100;

        this.audioClick = new Audio("/mini_prj/audio/audioClick.mp3");
        this.audioEnter = new Audio("/mini_prj/audio/audioStadiumEnter.mp3");

        this.audioEnter.volume = 1.0;
    }
    checkPressed(e){
        
        // 마우스가 클릭되면 물어본다.
        // 클릭되면 true 나 false 를 알려주고 일을 진행하면 된다.
        let x = e.x;
        let y = e.y;
        if(this.startPointX < x && x < this.startPointX+this.endPointX 
            && this.startPointY < y && y < this.startPointY+this.endPointY){
                this.isClicked = true;
                this.audioClick.play();
            }
    }

    draw(ctx){
        // ctx.drawImage(this.img,
        //     0, 0, 357*2, 612*2,
        //     0, 180, 357*3, 612*3);
        // ctx.drawImage(this.img,
        //     0, 0, 357*2, 612*2,
        //     this.x+900, this.y, 357*3, 612*3);
        
        ctx.drawImage(this.imgStadium, 0, 0, 562*2, 257*1.2, 0,0,1920,1080);

        ctx.drawImage(this.imgPlayer,
            0+(this.w*this.imgIndex),this.h*1, this.w, this.h, 
            this.x, this.y, 75, 75)
        
        if(this.flagClick)
            ctx.drawImage(this.imgClick,0,0,522,180, this.startX,this.startY,this.endX,this.endY)
        

    }
    
    drawPlayer(ctx){
        ctx.drawImage(this.imgPlayer,
            0+(this.w*this.imgIndex),this.h*this.imgY, this.w, this.h, 
            this.x, this.y, 75, 75)


    }
    update() {
        // player 앞으로 걸어갈때 스프라이트
        this.imgDelayIndex++;
        if(this.imgDelayIndex%10 == 0){
            this.imgIndex++;
            if(this.imgIndex == 4){
                this.imgIndex = 1;
            }
            // player 뒤돌때 스프라이트
            if(this.x >= 565){
                this.imgY = 3;
                this.imgIndex = 0;
                if(++this.imgDelayIndex2%3==0){
                    if(this.imgIndex == 2){
                        this.imgIndex = 0;
                    }
                    this.imgIndex++;
                }
            }
        }

        // player 이동
        this.x+=this.speedX;
        if(this.x >= 565){
            this.x = 566;
            this.y-=this.speedY;
            if(this.y <= 590){
                this.x = 566;
                this.y = 590;
                this.w = 0;
                this.h = 0;
                this.audioEnter.play();
                this.flagNext = true;
            }
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



}