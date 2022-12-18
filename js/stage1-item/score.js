export default class Score{

    constructor(){
        this.num = 0;
        this.countNum = 10;

        this.img = document.getElementById("ball")
    }
    draw(ctx){
        ctx.font = "25px bold";
        ctx.fillStyle = "black";
        ctx.fillText("목표", 10, 40);
        ctx.drawImage(this.img, 0, 0, 800, 800,70, 15,30,30);
        ctx.fillText(this.countNum +" 개",110,40);
    }
    // get countNum(){
    //     return this.countNum;
    // }
    // update(){
    //     this.num

    // }
    
}