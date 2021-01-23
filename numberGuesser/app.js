/* 
GAME FUNCTION:
- Player must guess a number between min and max
- Player gets only a certain amount of guesses to try
- Notify player of guesses remaining
- Notify the player of the correct answer if they loose
- Let player choose to play again
*/

// Game Values
let min         = 1,
    max         = 10;
var guessesLeft = 3;

let winningNum  = randomNumber();
console.log(winningNum);

//UI Elements
const game       = document.querySelector('#game'),
      minNum     = document.querySelector('.min-num'),
      maxNum     = document.querySelector('.max-num'),
      guessBtn   = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message    = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

function randomNumber(){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

//Listen for guess
guessBtn.addEventListener('click', listen);

function listen(){
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(('Please enter a number between ' + min + ' and ' + max), 'red');
    }

    // Check if the guess is correct
    if(guess == winningNum){
        // Disable input
        guessInput.disabled = true;
        // Change border color to green
        guessInput.style.borderColor = 'green';
        // set Message
        setMessage(winningNum + ' is correct!', 'green');
        playAgainBtn();
    } else if(isFinite(guess)) {
        guessesLeft--;
        console.log(guessesLeft);
        guessInput.style.borderColor = 'red';
        if(guessesLeft === 0){
            guessInput.disabled = true;
            guessesLeft = 3;
            setMessage('Wrong Guess! You\' run out of guesses', 'red');
            playAgainBtn();
        } else {
            setMessage('Wrong Guess! Try again', 'red');
            guessInput.value = '';
        }
    }
}

// Create the Error Message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

// Play Again Button
function playAgainBtn(){
    guessBtn.setAttribute('value', 'Play Again');
    guessBtn.addEventListener('click', refresh);
}

function refresh(){
    window.location.reload();
}

// //reset the game
// function playAgain(){
//     guessInput.disabled = false;
//     guessBtn.setAttribute('value', 'submit');
//     listen();

// }
