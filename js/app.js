import Game1Canvas from "./ui/game1-canvas.js";
import IntroCanvas from "./ui/intro-canvas.js";
import ButtonCanvas from "./ui/button-canvas.js";
import StadiumCanvas from "./ui/stadium-canvas.js";
import Game2Canvas from "./ui/game2-canvas.js";
import Game3Canvas from "./ui/game3-canvas.js";
import OutroCanvas from "./ui/outro-canvas.js";
import Game3Intro from "./ui/game3-intro.js";



window.onload = function() {

    
    const introCanvas = new IntroCanvas();
    const buttonCanvas = new ButtonCanvas();
    const game1Canvas = new Game1Canvas();
    const stadiumCanvas = new StadiumCanvas();
    const game2Canvas = new Game2Canvas();
    const game3Intro = new Game3Intro();
    const game3Canvas = new Game3Canvas();
    const outroCanvas = new OutroCanvas();


    
    introCanvas.display();
    introCanvas.run();
    introCanvas.onEnd= function (a){ //a는 오디오객체
        buttonCanvas.display(a);
        buttonCanvas.run();
        buttonCanvas.onEnd = function(a){
            game1Canvas.display(a);
            game1Canvas.run();
            game1Canvas.onEnd = function(a){
                stadiumCanvas.display(a);
                stadiumCanvas.run();
                stadiumCanvas.onEnd = function(a){
                    game2Canvas.display(a);
                    game2Canvas.run(); 
                    game2Canvas.onEnd = function(a){
                        game3Intro.display(a);
                        game3Intro.run();
                        game3Intro.onEnd = function(a){
                            game3Canvas.display(a);
                            game3Canvas.run();
                            game3Canvas.onEnd = function(a){
                                outroCanvas.display(a);
                                outroCanvas.run();
                                outroCanvas.onEnd = function(a){
                                    game1Canvas.reset();
                                    game2Canvas.reset();
                                    game3Canvas.reset();
                                    introCanvas.killAudio(a);
                                    introCanvas.onEnd();
                                }
                            }
                        }
                    }
                }
            }
       }
   }
    


game3Canvas.replay = function(a){
    game1Canvas.reset();
    game2Canvas.reset();
    introCanvas.killAudio(a);
    introCanvas.onEnd();
}
game2Canvas.replay = function(a){
    game1Canvas.reset();
    introCanvas.killAudio(a);
    introCanvas.onEnd();
}
game1Canvas.replay = function(a){
    introCanvas.killAudio(a);
    introCanvas.onEnd();
}
   
    // setInterval(gameCanvas.run.bind(gameCanvas), 1000/60)
    //함수 , 시간(m/s)
}