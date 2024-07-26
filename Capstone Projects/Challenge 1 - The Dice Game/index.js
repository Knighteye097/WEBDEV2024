var dice1Position = (Math.floor(Math.random() * 6) + 1);
var dice1Image = "dice" + dice1Position + ".png";
document.querySelector(".img1").setAttribute("src", ("./images/" + dice1Image));

var dice2Position = (Math.floor(Math.random() * 6) + 1);
var dice2Image = "dice" + dice2Position + ".png";
document.querySelector(".img2").setAttribute("src", ("./images/" + dice2Image));


function whoWins(){
    if(dice1Position === dice2Position){
        document.querySelector("h1").textContent = "Draw!";
    }
    else if(dice1Position>dice2Position){
        document.querySelector("h1").textContent = "🚩Player 1 wins!";
    }
    else if(dice2Position>dice1Position){
        document.querySelector("h1").textContent = "Player 2 wins! 🚩"
    }
}

whoWins();