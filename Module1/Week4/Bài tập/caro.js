const VALUE_EMPTY = undefined;
const VALUE_X = 2;
const VALUE_O = 3;
const DEFAULT_COLS = 10;
const DEFAULT_ROWS = 10;
const DEFAULT_CELL_SIZE = 40;


class Cell{
    x
    y
    constructor(x,y) {
        this.x=x
        this.y=y
    }
    getHtml(){
        let top =DEFAULT_CELL_SIZE*this.x
        let left=DEFAULT_CELL_SIZE*this.y
        let cellHtml = '<div id="cell-'+this.x+'-'+this.y+'" onclick="gameBoard.play('+this.x+','+this.y+')" class="cell" ' +
            'style="position: absolute;' +
            'width: '+ DEFAULT_CELL_SIZE+'px; ' +
            'height:'+ DEFAULT_CELL_SIZE+'px;' +
            'left:'+ left+'px; ' +
            'top:'+ top+'px; ' +

            'line-height: '+ DEFAULT_CELL_SIZE+'px;">'
            +

            '</div>';
        return cellHtml;
    }
    drawXY(x,y){
        let cellDiv=document.getElementById('cell-'+x+'-'+y)
        let a=gameBoard.cells[x][y]

        switch (a.value){
            case VALUE_X:
                cellDiv.innerHTML = "X";
                break;
            case VALUE_O:
                cellDiv.innerHTML = "O";
                break;
            default:
                cellDiv.innerHTML = "";
                break;
        }
    }

}

class GameBoard{
    rows
    cols
    eId
    cells=[]
    turn=VALUE_O
    isOver=false
    constructor(r,c,eId) {
        this.rows=r
        this.cols=c
        this.eId=eId
    }

    drawBoard(){
        let gameBroadDiv=document.getElementById(this.eId)
        gameBroadDiv.innerHTML=''
        for(let i=0;i<this.rows;i++){
            let row=[]
            this.cells.push(row)
            for (let j=0;j<this.cols;j++){
                let cell= new Cell(i,j)
                row.push(cell)
                gameBroadDiv.innerHTML+=cell.getHtml()
            }

        }
    }
    play(x,y){
        if(!this.isOver){
            let cell=this.cells[x][y]
            if(cell.value==VALUE_EMPTY){
                cell.value=this.turn
                cell.drawXY(x,y)
                this.check(x,y)
                if(this.turn === VALUE_O){
                    this.turn = VALUE_X;
                } else {
                    this.turn = VALUE_O;
                }
            }else {
                alert("Cell is not empty");
            }

        }
        }
    check(x,y){
        let cell= this.cells[x][y]
        let c=1
        let i=1

        // check ngang

        while ((y + i < this.cols) && this.cells[x][y + i].value ===  cell.value){
            c++
            i++
        }
        i=1
        while((y - i >= 0) && this.cells[x][y - i].value ===  cell.value){
            c++;
            i++;
        }
        console.log(c)
        this.endGame(c);

        c=1
        i=1
        //check doc

        while ((x + i < this.rows) && this.cells[x+i][y].value ===  cell.value){

            c++
            i++
        }
        i=1
        while((x -i >=0) && this.cells[x-i][y].value ===  cell.value){
            c++;
            i++;
        }
        this.endGame(c);

        c=1
        i=1
        let j=1
        //check cheo  1 3 5

        while ((x + i < this.rows&&y+j<this.cols) && this.cells[x+i][y+j].value ===  cell.value){

            c++
            j++
            i++
        }
        i=1
        j=1
        while((x-i>=0&&y-j>=0) && this.cells[x-i][y-j].value ===  cell.value){
            c++;
            i++;
            j++
        }
        this.endGame(c);

        //check cheo 3 5 7
        c=1
        i=1
        j=1


        while ((x + i < this.rows&&y-j>=0) && this.cells[x+i][y-j].value ===  cell.value){

            c++
            j++
            i++
        }
        i=1
        j=1
        while((x-i>=0&&y+j<this.cols) && this.cells[x-i][y+j].value ===  cell.value){
            c++;
            i++;
            j++
        }
        this.endGame(c);

    }

    endGame(count){
        if(count>=5){
            this.isOver=true
            alert('WIN')
        }

    }
    chonQuan(){
        let x=prompt('Nhap quan ban muon 1 laf x 0 la 0')
        if(x==1){
            this.turn=VALUE_X
        }

    }


}

let gameBoard = new GameBoard(DEFAULT_ROWS, DEFAULT_COLS, "game-board");
    gameBoard.drawBoard()
    gameBoard.chonQuan()
 //   gameBoard.getCells()
function restart() {
    gameBoard.cells=[]
    gameBoard.isOver=false
    gameBoard.chonQuan()
    gameBoard.drawBoard()


}

