
const canv=document.getElementById('myC')
const GAMEBOARD_WIDTH =canv.width;
const GAMEBOARD_HEIGHT =canv.height;

const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "down";

const XE_WIDTH = 70;
const XE_HEIGHT = 86;

const DEFAULT_X_POSITION = 0;
const DEFAULT_Y_POSITION = 0;
const DEFAULT_ORIENTATION = ORIENTATION_DOWN;
const DEFAULT_SPEED = 20;

class Xe{
    xPosition = DEFAULT_X_POSITION;
    yPosition = DEFAULT_Y_POSITION;
    orientation = DEFAULT_ORIENTATION;
    speed = DEFAULT_SPEED;



    move(){
        switch (this.orientation) {
            case ORIENTATION_DOWN:
                this.image = './img/xe3.jpg';
                this.yPosition += this.speed;
                break;
            case ORIENTATION_UP:
                this.image = './img/xe1.jpg';
                this.yPosition -= this.speed;
                break;
            case ORIENTATION_LEFT:
                this.image = './img/xe2.jpg';

                this.xPosition -= this.speed;
                break;
            case ORIENTATION_RIGHT:
                this.image = './img/xe4.jpg';
                this.xPosition += this.speed;
                break;
        }


    };


    show(ctx){
        let image = new Image();
        let xPosition = this.xPosition;
        let yPosition = this.yPosition
        image.onload = function(){
            ctx.drawImage(image, xPosition, yPosition);
        };
        image.src = this.image
    }
}


class  GameBoard {
     xe1= new Xe();
     ctx = undefined;
    start (){
        this.ctx = canv.getContext('2d');
        this.xe1.show(this.ctx);
    };

    render (){
        this.ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
        this.xe1.show(this.ctx);
    };

    moveXe(event){
        let orientation = 0;
        switch (event.which){
            case 37:
                orientation = ORIENTATION_LEFT;
                break;
            case 38:
                orientation = ORIENTATION_UP;
                break;
            case 39:
                orientation = ORIENTATION_RIGHT;
                break;
            case 40:
                orientation = ORIENTATION_DOWN;
                break;
        }

        if(orientation){
            if(this.xe1.orientation !== orientation){
                this.xe1.orientation = orientation;
            } else {
                this.xe1.move();
            }
            this.render();
        }
    }
}

let gameBoard = new GameBoard();
gameBoard.start();