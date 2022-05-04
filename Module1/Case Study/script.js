const canv=document.getElementById("myC")
const WIDTH=canv.width
const HEIGHT=canv.height
const UP=1
const DOWN=2
const LEFT=3
const RIGHT=4
const SNAKE_WIDTH=20
const SNAKE_HEIGHT=20
const LOSS=-1
const PAUSE=0
const BEGIN=1
const NORMAL=2
let speed=0.1
let status=BEGIN
let xv=0
let yv=0
let ax=10
let ay=10
let px=100
let py=100
let trail=[]
let tail=1
let quangduong=20
let huong=UP
let mess
let myInterval= setInterval(game, quangduong/speed)
let audio=new Audio()
audio.src="./audio/an2.wav"
let player=[]


class Player{
    name
    img
    diem=0
    highestScore=0
    rank=999
    constructor(name,img) {
        this.name=name
        this.img=img
    }
    getName(){
        return this.name
    }

}



player.push(new Player('Hoang Cong Hau','./img/1.jpg'))
//console.log(player)
function game(){
    if(status===NORMAL||status===BEGIN){


        px+=xv
        py+=yv
        if(px>=WIDTH){
            px=0
        }
        if(px<0){
            px=WIDTH-SNAKE_WIDTH
        }
        if(py<0){
            py=HEIGHT-SNAKE_HEIGHT
        }
        if(py>=HEIGHT){
            py=0
        }

        if(status===NORMAL){
            mess=''
        }else if(status===BEGIN){
            mess="Press A , W or D to start"
        }



        let ctx=canv.getContext('2d')
        ctx.fillStyle='black'
        ctx.fillRect(0,0,WIDTH,HEIGHT)

        ctx.fillStyle='red'
        ctx.font = "30px Arial";
        ctx.fillText(mess,90,250);
       // console.log(trail.length)

        for(let i=0;i<trail.length;i++){
            if(i===trail.length-1){
                ctx.fillStyle='blue'
            }else if(i%2==0){
                ctx.fillStyle='lime'
            }else {
                ctx.fillStyle='yellow'
            }
            ctx.fillRect(trail[i].x,trail[i].y,SNAKE_WIDTH-2,SNAKE_HEIGHT-2)
        }

        trail.push({x:px,y:py})
        //console.log(trail.length)

        while (trail.length>tail){
            trail.shift()
        }

        if(ax*SNAKE_WIDTH==px&&py==ay*SNAKE_HEIGHT){

            audio.play()
            tail++
            player[player.length-1].diem+=speed*10
            ax=parseInt(Math.random()*(WIDTH/SNAKE_WIDTH))
            ay=parseInt(Math.random()*(HEIGHT/SNAKE_HEIGHT))


        }
        ctx.fillStyle="red"
        ctx.fillRect(ax*SNAKE_WIDTH,ay*SNAKE_HEIGHT,SNAKE_WIDTH-2,SNAKE_HEIGHT-2)

        display()
        if(player[player.length-1].diem>player[player.length-1].highestScore){
            player[player.length-1].highestScore=player[player.length-1].diem
        }

        check(trail)


    }


}
function restart(){
    status=BEGIN
    xv=0
    yv=0
    ax=10
    ay=10
    px=100
    py=100
    trail=[]
    tail=1
    player[player.length-1].diem=0
    speed=getSpeed()
    huong=UP


}
function check(arr){
    for(let i=0;i<arr.length-1;i--){
        if(arr[arr.length-1].x===arr[i].x&&arr[arr.length-1].y===arr[i].y){
            display()
            status=LOSS
            let ctx=canv.getContext('2d')
            ctx.fillStyle='red'
            ctx.font = "30px Arial";
            ctx.fillText('YOU LOSE',185,250);
        }
    }
}
function pause(){
    if(status===PAUSE){
        status=NORMAL
    }else if(status===NORMAL) {
        let ctx=canv.getContext('2d')

        ctx.fillStyle='red'
        ctx.font = "30px Arial";
        ctx.fillText('PAUSE',210,250);
        status=PAUSE

    }


}
function keyPush(evt){
    if(status===NORMAL||status===BEGIN){
        switch (evt.keyCode){
            case 65:
                if(huong!==RIGHT){
                    status=NORMAL
                    huong=LEFT
                    xv=-quangduong
                    yv=0
                }
                break
            case 87:
                if(huong!==DOWN){
                    status=NORMAL
                    huong=UP
                    xv=0
                    yv=-quangduong
                }

                break
            case 68:
                if(huong!==LEFT){
                    status=NORMAL
                    huong=RIGHT
                    xv=quangduong
                    yv=0
                }
                break
            case 83:
                if(huong!==UP){
                    huong=DOWN
                    xv=0
                    yv=quangduong
                }
        }
    }

}
function getSpeed(){
    let a=document.getElementById('sp').value
    return Number(a)
}
function changeS(){
    speed=getSpeed()
    clearInterval(myInterval);
    myInterval=setInterval(game,quangduong/speed)
}



function createP(){
    let a=document.getElementById('name')
    let b=document.getElementById('img')

    player.push(new Player(a.value,b.value))
    display()


}
function display(){
    let s=''
    s+=`<image src="${player[player.length-1].img}" style="text-align: center">`
    s+="<h3>"+player[player.length-1].getName()+"</h3>"
    s+=`<p>Highest Score: ${player[player.length-1].highestScore}</p>`
    s+=`<p>Your Score: ${player[player.length-1].diem}</p>`
    s+=`<p>Your Rank: ${player[player.length-1].rank}</p>`
    s+=' <td><button type="submit" onclick="restart()"> ReStart</button>'
    document.getElementById('input').innerHTML=s
}

window.onload=function (){
    document.addEventListener("keydown",keyPush)

}