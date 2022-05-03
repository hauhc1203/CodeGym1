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
const NORMAL=1

let status=NORMAL

let xv=0
let yv=0
let ax=10
let ay=10
let px=100
let py=100
let trail=[]
let tail=1
let sc=0
let highScore=0
let speed=20
let huong=UP

window.onload=function (){
    document.addEventListener("keydown",keyPush)
    setInterval(game, 100)
}




function game(){
    if(status===NORMAL){
        check(trail)
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
        let ctx=canv.getContext('2d')
        ctx.fillStyle='black'
        ctx.fillRect(0,0,WIDTH,HEIGHT)

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

        while (trail.length>tail){
            trail.shift()
        }

        if(ax*SNAKE_WIDTH==px&&py==ay*SNAKE_HEIGHT){
            tail++
            sc++
            ax=parseInt(Math.random()*(WIDTH/SNAKE_WIDTH))
            ay=parseInt(Math.random()*(HEIGHT/SNAKE_HEIGHT))
            console.log(ax,ay)
        }
        ctx.fillStyle="red"
        ctx.fillRect(ax*SNAKE_WIDTH,ay*SNAKE_HEIGHT,SNAKE_WIDTH-2,SNAKE_HEIGHT-2)
        let score=document.getElementById('score')
        score.innerHTML="Điểm của bạn: "+ sc
    }


}


function check(arr){
    for(let i=1;i<arr.length;i++){
        if(arr[0].x==arr[i].x&&arr[0].y==arr[i].y){
            alert("ban da thua")
            status=LOSS
        }
    }
}
function pause(){
    if(status===PAUSE){
        status=NORMAL
    }else {

        status=PAUSE
    }


}
function keyPush(evt){

    switch (evt.keyCode){
        case 37:
            if(huong!=RIGHT){
                huong=LEFT
                xv=-speed
                yv=0
            }
            break
        case 38:
            if(huong!=DOWN){
                huong=UP
                xv=0
                yv=-speed
            }

            break
        case 39:
            if(huong!=LEFT){
                huong=RIGHT
                xv=speed
                yv=0
            }
            break
        case 40:
            if(huong!=UP){
                huong=DOWN
                xv=0
                yv=speed
            }
    }
}