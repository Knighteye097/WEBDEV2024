/*
This is the main JS code for the simon game. Basically in this game, we are randomly
generating a sequence of four colors and the user has to press the UI buttons(of the same four
colors) in the same pattern/sequence, if the user is succeesful then he/she will be advanced 
to next level and if the pattern fails at any given time, then it's game over.

There are a few bugs(1 for sure) in this, look over them when you have some free time.
*/
var buttonColors = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = 0;
var level;

/*
This function will check the last user pressed button with the corresponding
index in the game patter. For each level, each of the user pattern will be 
matched with the game pattern and if the pattern does not matched, startOver()
function will be called.
*/
function checkAnswer(lastUserIndex)  {
    if(userClickedPattern[lastUserIndex] === gamePattern[lastUserIndex]){
        console.log("Success");
        return true;
    }
    else{
        console.log("Fail");
        $("body").addClass("game-over");
        var gameOverAudio = new Audio("./sounds/wrong.mp3");
        gameOverAudio.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        startOver();
        return false;
    }
}

/*
This function will generate the game pattern from level 1 and play the
corresponding button audio.
*/
function nextSequence() {
    level += 1;
    $("h1").text("Level " + level);

    userClickedPattern = [];

    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    var nextButtonId = "#" + randomChosenColor;

    $(nextButtonId).delay(50).fadeOut().fadeIn();

    var gamePatternAudio = new Audio("./sounds/"+randomChosenColor+".mp3");
    gamePatternAudio.play();
}

/*
This function will be called in the case of game over scenario, used to rollback all the
values, like gamePattern, level, userPattern to start a new game again.
*/
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = 0;
    userClickedPattern = [];
    $("h1").text("Press A Key to Start");
}

/*
The event handler is for user, as soon as the user presses any button in UI and the game has
started this method will start working. Basically, we are playing the audio and playing the
animation for the button which user has clicked in the UI.

Also we are checking the last pressed button by user against the game pattern and if the user
has given the correct game pattern then we are moving on the next level by calling the nextSequence()
method by the delay of 1.25secs.
*/
$(".btn").click(function(event){
    if(gameStarted === 1){
        var userChosenColor = event.target.getAttribute("id");
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);

        $("#" + userChosenColor).delay(50).fadeOut().fadeIn();

        var userPatternAudio = new Audio("./sounds/"+userChosenColor+".mp3");
        userPatternAudio.play();
        
        if(checkAnswer(userClickedPattern.length-1)){
            if(userClickedPattern.length == gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                }, 1250);  
            }
        }
    }
    else{
        console.log("Please start the game!")
    } 
})

/*
This event is for starting the game, and will be triggered only once
in the beginning. The variable 'gameStarted' is used to make sure that
this functionality will be triggerd only once.
*/
$(document).keydown(function(event){
    if(gameStarted === 0){
        gameStarted = 1;
        level = 0;
        nextSequence();
    }
})





