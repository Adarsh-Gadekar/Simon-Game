var buttonColors = ['red', 'blue', 'green', 'yellow']

var gamePattern = []

var userClickedPattern = []

var startGame = false

var level = 0

// Next Sequence Function
function nextSequence() {
  userClickedPattern = []
  level++
  $('#level-title').text('Level ' + level)

  //Generate random number between 0 to 3 inclusive
  var randomNumber = Math.floor(Math.random() * 4)

  // Select the color from buttonColors according to randomNumber
  var randomChosenColor = buttonColors[randomNumber]

  //Push the randomColor in gamePattern
  gamePattern.push(randomChosenColor)

  //Select the button according to randomChosenColor
  let buttonSelected = $('#' + randomChosenColor)

  // Animate the button selected
  buttonSelected.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

  animatePress(randomChosenColor)

  // Play sound according to the color choosen at random
  playSound(randomChosenColor)
}

// Play Sound Function
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}

// Animate Function

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed')
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed')
  }, 100)
}

// Check Function
function checkAnswer(currentLevel) {
  // for(var i =0 ; i<= currentLevel ; i++){
  //     if (userClickedPattern[i] !== gamePattern[i]){
  //         console.log('Faliure')
  //     }
  // }
  // console.log('Success')
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('Success')
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound('wrong')
    $('body').addClass('game-over')
    setTimeout(function () {
      $('body').removeClass('game-over')
    }, 200)
    $('#level-title').text('Game Over, Press Any Key to Restart')
    startOver()
  }
}

// function Start Over
function startOver(){
    level = 0
    gamePattern = []
    startGame = false
}

//check which button the user clicks on
$('.btn').on('click', function () {
  // In this Handler function we get the id of the clicked button by using "this" keyword and "attr" function
  var userChosenColor = $(this).attr('id')
  userClickedPattern.push(userChosenColor)
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern.length - 1)
  playSound(userChosenColor)
})

$(document).keypress(function () {
  if (!startGame) {
    $('#level-title').text('Level ' + level)
    nextSequence()
    startGame = true
  }
})


