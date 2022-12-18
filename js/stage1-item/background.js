export default class BackGround {
    #y;
    #x;
    #speed;
    #img;
    #imgDelayIndex;

    constructor(){
        this.#x = 0;
        this.#y = 0;
        this.#speed = 10;
        this.StadiumX = 0;
        
        this.#imgDelayIndex = 0;
        this.#img = document.getElementById("background");
        this.img1Clear = document.getElementById("stage1-clear");

    }
    draw(ctx) {
        ctx.drawImage(this.#img,
            0, 0, 612*1.2, 357*1.2,
            this.#x, this.#y, 1920, 1080);
        ctx.drawImage(this.#img,
            0, 0, 612*1.2, 357*1.2,
            this.#x+1600, this.#y, 1920, 1080);            
    }
    drawClear(ctx){
        ctx.drawImage(this.img1Clear,0,0,272,161,250,200,272*1.5,161*1.5)
    }
    

    update() {
        this.#x -=this.#speed;
        if (this.#x == -1600){
            this.#x = 0;
        }
    }


    setSpeed(speed){
        this.#speed = speed;
    }
    get x(){
        return this.#x;
    }

}