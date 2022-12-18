export default class Closing{ // 엔딩 크레딧 클래스 입니다

    constructor(){
        this.img = document.getElementById("credit");

        this.x=0;
        this.y=300;
        this.w=532;
        this.h=300;

    }

    draw(ctx){
        ctx.drawImage(this.img,
                    0,0,351,725,
                    0,this.y,532,1200);
    }
 
    update(){
        this.y--;
    }

}