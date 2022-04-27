// const XE_WIDTH = 59;
// const XE_HEIGHT = 86;
//
// const DEFAULT_XE_X_POSITION = 100;
// const DEFAULT_XE_Y_POSITION = 100;
// const DEFAULT_XE_ORIENTATION = ORIENTATION_UP;
// const DEFAULT_XE_SPEED = 20;
//
// class Xe{
//     huong=DEFAULT_XE_ORIENTATION
//     img
//     speed=DEFAULT_XE_SPEED
//     x=DEFAULT_XE_X_POSITION
//     y=DEFAULT_XE_Y_POSITION
//     constructor(huong,img,spd) {
//         this.huong=huong
//         this.img=img
//         this.speed=spd
//     }
//
//
//     move(){
//         switch (this.huong) {
//             case DOWN:
//                 this.y += this.speed;
//                 break;
//             case UP:
//                 this.y -= this.speed;
//                 break;
//             case LEFT:
//                 this.x -= this.speed;
//                 break;
//             case RIGHT:
//                 this.x += this.speed;
//                 break;
//     }
//     }
//     turn(){
//         }
//     speedup(){
//     }
//     show (ctx){
//         let image = new Image();
//         let xPosition = this.x;
//         let yPosition = this.y;
//         image.src = './img/xe1.jpg' ;
//         image.onload = function(){
//             ctx.drawImage(image, xPosition, yPosition);
//         };
//     }
//
// }
// class GameBoard{
//     xe = new Xe();
//     ctx = undefined;
//     start = function(){
//         this.ctx = document.getElementById('myC').getContext('2d');
//         this.xe.show(this.ctx);
//     };
//
//     render(){
//         this.ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
//         this.xe.show(this.ctx);
//     };
//
//     moveNinja(event){
//         let orientation = 0;
//         switch (event.which){
//             case 37:
//                 orientation = LEFT;
//                 break;
//             case 38:
//                 orientation =UP;
//                 break;
//             case 39:
//                 orientation = RIGHT;
//                 break;
//             case 40:
//                 orientation = DOWN;
//                 break;
//         }
//
//         if(orientation){
//             if(this.xe.huong!== orientation){
//                 this.xe.huong = orientation;
//                 this.xe.move()
//             } else {
//                 this.xe.move();
//             }
//             this.render();
//         }
//     }
// }
// let gameBoard = new GameBoard();
// gameBoard.start();

/**
 * Created by nhatnk on 6/27/17.
 */
const GAMEBOARD_WIDTH = 500;
const GAMEBOARD_HEIGHT = 500;

const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "down";

const NINJA_WIDTH = 70;
const NINJA_HEIGHT = 86;

const DEFAULT_NINJA_X_POSITION = 0;
const DEFAULT_NINJA_Y_POSITION = 0;
const DEFAULT_NINJA_ORIENTATION = ORIENTATION_DOWN;
const DEFAULT_NINJA_SPEED = 20;

function Ninja(){
    this.xPosition = DEFAULT_NINJA_X_POSITION;
    this.yPosition = DEFAULT_NINJA_Y_POSITION;
    this.orientation = ORIENTATION_DOWN;
    this.speed = DEFAULT_NINJA_SPEED;






    this.move = function(){
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

    this.turn = function(orientation){
        this.orientation = orientation;

    };

    this.show = function(ctx){
        var image = new Image();
        var xPosition = this.xPosition;
        var yPosition = this.yPosition

        image.onload = function(){
            ctx.drawImage(image, xPosition, yPosition);
        };
        image.src = this.image
    }
}

function GameBoard() {
    this.ninja = new Ninja();
    this.ctx = undefined;
    this.start = function(){
        this.ctx = document.getElementById('myC').getContext('2d');
        this.ninja.show(this.ctx);
    };

    this.render = function(){
        this.ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
        this.ninja.show(this.ctx);
    };

    this.moveNinja = function(event){
        var orientation = 0;
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
            if(this.ninja.orientation !== orientation){
                this.ninja.orientation = orientation;
            } else {
                this.ninja.move();
            }
            this.render();
        }
    }
}

var gameBoard = new GameBoard();
gameBoard.start();