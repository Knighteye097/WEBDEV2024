let gameStarted = false;

// Mapping choices to their respective images
const choices = ["rock", "paper", "scissor"];
const imagesPath = "./public/images/";

function getPlayerChoice(playerNum) {
    return choices[playerNum - 1];
}

function setPlayerImage(player, choice) {
    let imageName = `${player}_side_${choice}.png`;
    document.getElementById(`${player}Img`).setAttribute("src", `${imagesPath}${imageName}`);
}

function whoWins() {
    // Left Player Selection
    let leftPlayerNum = Math.floor(Math.random() * 3) + 1;
    let leftPlayerChoice = getPlayerChoice(leftPlayerNum);
    setPlayerImage("left", leftPlayerChoice);

    // Right Player Selection
    let rightPlayerNum = Math.floor(Math.random() * 3) + 1;
    let rightPlayerChoice = getPlayerChoice(rightPlayerNum);
    setPlayerImage("right", rightPlayerChoice);

    // Logic for deciding the winner
    const resultMessages = {
        draw: "Draw!!",
        leftWins: "🚩Player 1 wins!",
        rightWins: "Player 2 wins! 🚩"
    };

    const result = getResult(leftPlayerNum, rightPlayerNum);
    document.getElementById("headingLine").textContent = resultMessages[result];

    // Hide some elements and show the heading message
    document.getElementById("headingMessage").textContent = "Press R to return or Press F to play another one!";
    document.getElementById("headingMessage").classList.add("headingMessaageAnimation");
    document.getElementById("headingPara").setAttribute("hidden", "true");
}

function getResult(left, right) {
    if (left === right) return "draw";
    if ((left === 1 && right !== 2) || (left === 2 && right !== 3) || (left === 3 && right !== 1)) {
        return "leftWins";
    }
    return "rightWins";
}

function rollback() {
    gameStarted = false;
    document.getElementById("headingMessage").classList.remove("headingMessaageAnimation");
    document.getElementById("headingLine").textContent = "Rock, Paper, Scissors!!";
    document.getElementById("headingPara").removeAttribute("hidden");
    document.getElementById("headingMessage").textContent = "Press F to play!";
    setPlayerImage("left", "Player");
    setPlayerImage("right", "Player");
}

$(document).keydown(function(event) {
    if (event.originalEvent.code === 'KeyF') {
        let gameStartAudio = new Audio("./public/audio/GameStart.wav");
        gameStartAudio.play();
        setTimeout(function() {
            gameStarted = true;
            whoWins();
        }, 1000);
    }
    if (event.originalEvent.code === 'KeyR' && gameStarted) {
        let gameRollbackAudio = new Audio("./public/audio/GameRollback.mp3");
        gameRollbackAudio.play();
        setTimeout(rollback, 1000);
    }
});
