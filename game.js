buttonColors = ["red", "blue", "green", "yellow"];
gamePattern=[];
userClickedPattern=[];
var level=0;
$("body").keypress(function(){
  if(level===0) nextSequence();
});

function nextSequence()
{
  userClickedPattern=[];
  randomNumber=Math.floor(Math.random()*4);
  randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("GamePattern "+gamePattern);
  $("#"+randomChosenColour).fadeOut().fadeIn();
  playSound(randomChosenColour);
  level=level+1;
  $("h1").text("Level " + level);
}

$(".btn").click(handleClick);
function handleClick(pp)
{
  userChosenColour=pp.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  console.log("UserPattern "+userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){$("#" + currentColour).removeClass("pressed");},100);
}

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]!==userClickedPattern[currentLevel])
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("h1").text("Game Over, Restarting...");
    startOver();
  }
  if(gamePattern.length===userClickedPattern.length) setTimeout(nextSequence,1000);
}
function startOver()
{
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}
