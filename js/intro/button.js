export default class Button{

    constructor(){
        this.img1 = document.getElementById("playNormal");
        this.img2 = document.getElementById("playPressed");

        this.startX = 330;
        this.startY = 500;
        this.endX = 250;
        this.endY = 90;

        this.startPointX = 720;
        this.startPointY = 615;
        this.endPointX = 460;
        this.endPointY = 65;

        this.isClicked = false;

    }
    checkPressed(e){
        let x = e.x;
        let y = e.y;
        if(this.startPointX < x && x < this.startPointX+this.endPointX 
            && this.startPointY < y && y < this.startPointY+this.endPointY){
                this.isClicked = true;
            }
    }
    draw(ctx){
        ctx.drawImage(this.img1,this.startX,this.startY,this.endX,this.endY);

    }
    update(){  }

    changePointer(x,y){
        if(this.startPointX < x && x < this.startPointX+this.endPointX 
            && this.startPointY < y && y < this.startPointY+this.endPointY){
                document.body.style.cursor = 'pointer';
        }
        else
            document.body.style.cursor = 'default';
    }

}