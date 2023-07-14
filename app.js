let container=document.querySelector('.container')
const bWidth=100
const bHeight=20
let timerId
let userStartPosition=[230,20]
let userCurrentPostion=userStartPosition;
let cWidth=560
let cHeight=300
let bDiameter=20
let ballStartPosition=[270,40]
let ballCurrentPosition=ballStartPosition;
let result=document.querySelector('.result')
let score=0
let xDirection=-2
let yDirection=2
//create Block Individual
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft=[xAxis,yAxis]
        this.bottomRight=[xAxis+bWidth,yAxis]
        this.topLeft=[xAxis,yAxis+bHeight]
        this.topright=[xAxis+bWidth,yAxis+bHeight];
    }
}

const Blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

function createBlock(){
    for(var i=0;i<Blocks.length;i++){
        let block=document.createElement('div')
        block.classList.add('block')
        block.style.left=Blocks[i].bottomLeft[0]+'px';
        block.style.bottom=Blocks[i].bottomLeft[1]+'px'
        container.appendChild(block)
    }
}

createBlock();


//Create User
const user=document.createElement('div')
user.classList.add('user')
container.appendChild(user)
user.style.left=userCurrentPostion[0]+'px';
user.style.bottom=userCurrentPostion[1]+'px';

//moveUser
function moveUser(e){
    switch(e.key){
        case'ArrowLeft':
        if(userCurrentPostion[0]>0){
            userCurrentPostion[0]-=10
            user.style.left=userCurrentPostion[0]+'px';
            user.style.bottom=userCurrentPostion[1]+'px';
        }
        break;
        case'ArrowRight':
        if(userCurrentPostion[0]<460){
            userCurrentPostion[0]+=10
            user.style.left=userCurrentPostion[0]+'px';
            user.style.bottom=userCurrentPostion[1]+'px';
        }
        break;
    }
}

document.addEventListener('keydown',moveUser)

//add ball

let ball=document.createElement('div')
ball.classList.add('ball')
container.appendChild(ball);
drawBall();
function drawBall(){
    ball.style.left=ballCurrentPosition[0]+'px'
    ball.style.bottom=ballCurrentPosition[1]+'px'
}


function moveBall(){
    ballCurrentPosition[0]+=xDirection;
    ballCurrentPosition[1]+=yDirection;
    drawBall();
    checkForCollision();
}

timerId=setInterval(moveBall,20)

function checkForCollision(){
    //User Collision
    if((ballCurrentPosition[0]>userCurrentPostion[0]&&ballCurrentPosition[0]<userCurrentPostion[0]+bWidth)&&
      (ballCurrentPosition[1]>userCurrentPostion[1]&&ballCurrentPosition[1]<userCurrentPostion[1]+bHeight)){
        changeDirection();
    }
    //Check for Win
    if(Blocks.length==0){
        result.innerHTML="You Won!!!"
        result.style.color="green"
        clearInterval(timerId)
        document.removeEventListener('keydown',moveUser)
        alert("Congratulatoins!!! You Won!")
    }
     //Any block collision
     for(var i=0;i<Blocks.length;i++){
        if((ballCurrentPosition[0]>Blocks[i].bottomLeft[0] && ballCurrentPosition[0]<Blocks[i].bottomRight[0])&&
        (ballCurrentPosition[1]>Blocks[i].bottomLeft[1]&&ballCurrentPosition[1]<Blocks[i].topLeft[1])){
            const allBlock=Array.from(document.querySelectorAll('.block'))
            allBlock[i].classList.remove('block')
            // ith position se 1 element hta do
            Blocks.splice(i,1)  
            changeDirection();
            score++;
            result.textContent=score
        }
     }
    //Wall collision
    if(ballCurrentPosition[0]>=540||
        ballCurrentPosition[1]>=280||
        ballCurrentPosition[0]<=0){
       changeDirection();
    }
    //Check for Loose
    if(ballCurrentPosition[1]<=0){
        clearInterval(timerId)
        document.removeEventListener('keydown',moveUser)
        result.innerHTML="You Loose!!"
        result.style.color="red"
        alert("You Loose!!! Your Score:"+score)
    }
}

function changeDirection(){
     if(xDirection===2 && yDirection===2){
        // yDirection=-2
        yDirection=-2
        return
     }
     if(xDirection===2 && yDirection===-2){
        xDirection=-2
        return
     }
     if(xDirection===-2 && yDirection===2){
        xDirection=2
        return
     }
     if(xDirection===-2 && yDirection===-2){
        yDirection=2
        return
     }
}












































// Quick Overview of splice method--It adds and removes elements from array

// const fruits = ["Banana", "Orange", "Apple", "Mango"];

// // At position 2, add 2 elements: 
// fruits.splice(2, 0, "Lemon", "Kiwi");

// console.log(fruits)

// const fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi"];

// // At position 2, remove 2 items: 
// fruits.splice(2, 2);