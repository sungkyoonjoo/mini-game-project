export default class background{
    constructor(){
        this.img=document.getElementById("map");


        this.x=0;
        this.y=0;
        this.w=900;
        this.h=900;
    }

    draw(ctx){
       ctx.drawImage(this.img,
        0,0,250,250, 
        this.x,this.y,this.w,this.h);
    }

}