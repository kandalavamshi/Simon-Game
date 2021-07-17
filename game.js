var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// $(document).one('keydown', function() { // here we use ".one" to select just one keypress for the 1st time so that the game can start
$(document).keydown (function() { 
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started =true;
  }

});

// button selection
var buttonClick = $(".btn").click(function() {
  var buttonClickPush = this.id;
  userClickedPattern.push(buttonClickPush);
  console.log(userClickedPattern);

  playSound(buttonClickPush);
  animatePress(buttonClickPush);

  checkAnswer(userClickedPattern.length -1);

});

function startOver(){
  level = 0;
  gamePattern = [];

  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence, 800);
    }

  }else{
    console.log("false");
    animateGameOver();
    startOver();

  }
}

//   if(gamePattern.length === userClickedPattern.length){
//     for(i=0; i<level; i++){
//       console.log("i is " + i);
//       console.log(gamePattern[i]);
//       console.log(userClickedPattern[i]);
//       if(gamePattern[i] === userClickedPattern[i]){
//         console.log("success 1");
//         // buttonClickNull();
//         // setTimeout(nextSequence, 800);
//
//       }
//       else{
//         console.log("fail 1");
//         startOver();
//         animateGameOver();
//
//
//
//
//       }}
//       buttonClickNull();
//       setTimeout(nextSequence, 800);
//
//   }else if(userClickedPattern.length<gamePattern.length){
//   console.log("length is " + userClickedPattern.length);
//
//   for(j=userClickedPattern.length - 1; j<level; j++){ //if i declare j as 0 its not working and idk why
//     console.log("j is "+j);
//     if(gamePattern[j] != userClickedPattern[j]){
//
//       console.log("fail 2 ");
//       animateGameOver();
//       startOver();
//
//
//     }
//     else{
//
//       console.log("success 2");
//       break;
//
//     }
//   }
// }else{
//   startOver();
//   animateGameOver();
//
//
// }
//
// }



function nextSequence() {
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);


}




// sounds  for the button presses
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();

}

//fn for animations while button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

//function for animating while game-over
function animateGameOver() {
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  var audio2 = new Audio('sounds/wrong.mp3');
  audio2.play();

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 300);


}
