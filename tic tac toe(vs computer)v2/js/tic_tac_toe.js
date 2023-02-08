"use strict";

let flag = "dog-flag";
let counter = 9;

const squares = document.getElementsByClassName("square");
const squaresArray = Array.from(squares);

const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

const line1 = JudgLine(squaresArray, ["a_1","a_2","a_3"]);
const line2 = JudgLine(squaresArray, ["b_1","b_2","b_3"]);
const line3 = JudgLine(squaresArray, ["c_1","c_2","c_3"]);
const line4 = JudgLine(squaresArray, ["a_1","b_1","c_1"]);
const line5 = JudgLine(squaresArray, ["a_2","b_2","c_2"]);
const line6 = JudgLine(squaresArray, ["a_3","b_3","c_3"]);
const line7 = JudgLine(squaresArray, ["a_1","b_2","c_3"]);
const line8 = JudgLine(squaresArray, ["a_3","b_2","c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

const msgtxt1 = '<p class="image"><img src ="img/dog.png" width=61px height=61px></p><p class ="text">Dog Attack!(your turn)</p>';
const msgtxt2 = '<p class="image"><img src ="img/cat.png" width=61px height=61px></p><p class ="text">Cat Attack!(computer turn)</p>';
const msgtxt3 = '<p class="image"><img src ="img/dog.png" width=61px height=61px></p><p class ="test animate__animated animate__fadeInTopRight ">Dog Win!!</p>';
const msgtxt4 = '<p class="image"><img src ="img/cat.png" width=61px height=61px></p><p class ="test animate__animated animate__fadeInTopLeft">Cat Win!!</p>';
const msgtxt5 = '<p class="image"><img src ="img/dog.png" width=61px height=61px></p><p class ="test animate__fadeInUp">Draw!!</p>';

let gameSound= ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/catwin.mp3","sound/dogwin.mp3","sound/draw_sound.mp3"];

function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

window.addEventListener("DOMContentLoaded",
 function(){
    setMessage("dog-turn");

    squaresArray.forEach(function(square){
        square.classList.add("js-clickable");
    });
  },false
);
squaresArray.forEach(function(square){
    square.addEventListener('click', ()=>{
        let gameOverFlg = isSelect(square);
        if(gameOverFlg === "0"){
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function() {
                    catTurn();
                },
                "2000"
            );
        }
    });
});

function isSelect(selectSquare) {
    let gameOverFlg = "0";
    if(flag === "dog-flag"){

        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-dog-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
        if(isWinner("dog")){
            setMessage("dog-win");
            gameOver("dog");
            return gameOverFlg = "1";
        }
        setMessage("cat-turn");
        flag = "cat-flag";
    }else{
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-cat-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
        if(isWinner("cat")){
            setMessage("cat-win");
            gameOver("cat");
            return gameOverFlg = "1";
        }
        setMessage("dog-turn");
        flag = "dog-flag";
    }

    counter--;

    if(counter === 0){
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg= "0"

    }
function isWinner(symbol){
    const result = lineArray.some(function(line){
        const subResult = line.every(function(square){
            if(symbol === "dog"){
                return square.classList.contains("js-dog-checked");
            }
            if(symbol === "cat"){
                return square.classList.contains("js-cat-checked");
            }
        });
        if(subResult){winningLine = line}

        return subResult;
    });
    return result;
}

function setMessage(id){
    switch(id){
        case "dog-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "cat-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;               
            break;
        case "dog-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            break;
        case "cat-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            break;                  
        default:
            document.getElementById("msgtext").innerHTML=msgtxt1;
            
    }
}
function gameOver(status){

    let w_sound
    switch(status){
        case "cat":
            w_sound = gameSound[2];
            break;
        case "dog":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;    
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    squaresArray.forEach(function(square){
        square.classList.add("js-unclickable");
    });
    squaresBox.classList.remove("js-unclickable");
    
    squaresArray.forEach(function(square){
        square.classList.add("js-unclickable");
    });

newgamebtn_display.classList.remove("js-hidden");

    if(status==="dog"){
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-dog_highLight");
            });
        }
        $(document).snowfall({
            flakeColor : "rgb(255,240,245)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });
    } else if(status==="cat"){
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-cat_highLight");
            });
        }
        $(document).snowfall({
            flakeColor : "rgb(175,238,238)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true
        });
    }
}
newgamebtn.addEventListener("click", function(){
    flag = "dog-flag";
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function(square){
        square.classList.remove("js-dog-checked");
        square.classList.remove("js-cat-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-cat_highLight");
        square.classList.remove("js-dog_highLight");
        square.classList.remove("js-clickable")
    });
    squaresBox.classList.add("js-unclickable");
    setMessage("cat-turn");
    newgamebtn_display.classList.add("js-hidden");

    $(document).snowfall("clear");
});

function catTurn(){
    let catTurnEnd = "0";
    let gameOverFlg = "0";

    while(catTurnEnd === "0"){
        catTurnEnd = isReach("cat");
        if(catTurnEnd === "1"){
            gameOverFlg = "1";
            break;
        }

        catTurnEnd = isReach("dog");
        if(catTurnEnd === "1"){
            break;
        }
    const catSquare = squaresArray.filter(function(square){
        return square.classList.contains("js-clickable");
    });
    let n = Math.floor(Math.random() * catSquare.length);
    gameOverFlg = isSelect(catSquare[n]);
    break;
}

    if(gameOverFlg === "0"){
        squaresBox.classList.remove("js-unclickable");
    }
}
function isReach(status){
    let catTurnEnd = "0";

    lineArray.some(function(line){
        let catCheckCnt = 0;
        let DogCheckCnt = 0;

        line.forEach(function(square){
            if(square.classList.contains("js-cat-checked")){
                catCheckCnt++;
            }
            if(square.classList.contains("js-dog-checked")){
                DogCheckCnt++;
            }

        });
        if(status === "cat" && catCheckCnt === 2 && DogCheckCnt === 0){
            catTurnEnd = "1";
        }

        if(status === "dog" && catCheckCnt === 0 && DogCheckCnt === 2){
            catTurnEnd = "1";
        }
        if(catTurnEnd === "1"){
            line.some(function(square){
                if(square.classList.contains("js-clickable")){
                    isSelect(square);
                    return true;
                }
            })
            return true;
        }
    });
    return catTurnEnd;
}