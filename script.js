'use strict';

// IDs are dif to class, use # to select ID/ elements 

//Selecting HTML elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');

const score0El = document.querySelector('#score--0'); 
const score1El = document.querySelector('#score--1'); 
const score2El = document.querySelector('#score--2');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const current2El = document.getElementById('current--2');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new'); 
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


/* if you don't assign a value to a variable when you declare it, it will have an initial value of undefined.

By declaring the variables without assigning initial values, you are reserving space in memory for these variables and making them available for assignment later in the code. This can be useful when you want to declare variables that will be assigned values later on or when you want to use variables that are declared in a different scope. */
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = () => {
    // Initialise scores, current score, active player, and game state
    [scores, currentScore, activePlayer, playing] = [[0, 0, 0], 0, 0, true];

    // Reset displayed scores and current scores
    score0El.textContent = score1El.textContent = score2El.textContent = 0;
    current0El.textContent = current1El.textContent = current2El.textContent = 0;

    // Hide the dice by adding CSS class
    diceEl.classList.add('hidden');

    // Reset the active player
    player0El.classList.add('player--active'); // This sets player 0 as the active player.
    player1El.classList.remove('player--active'); // This removes the active player status from player 1.
    player2El.classList.remove('player--active'); // This removes the active player status from player 2.

    // Remove winner class from both players
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player2El.classList.remove('player--winner');

};
init();

// Switch player function
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    
    // If the active player is 0, then we want the new active player to be 1 and else it should be 0
    // activePlayer = activePlayer === 0 ? 1 : 0; 

    // Rotate active player
    activePlayer = (activePlayer + 1) % 3;
    // Toggle active classes
    player0El.classList.toggle('player--active', activePlayer === 0);
    player1El.classList.toggle('player--active', activePlayer === 1);
    player2El.classList.toggle('player--active', activePlayer === 2);
};

// Rolling dice functionality 
btnRoll.addEventListener('click', function() {  
    if (playing) {
    // 1. generate a random dice roll 
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice by removing hidden
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; 

    // 3. Check for rolled 1: if true 
    if (dice !== 1) {
        // add to the current score 
        currentScore += dice;
        // The score is selected dynamically based on which is the active player right now. 
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch to next player
        switchPlayer();
    }
}
}); 

// Hold score functionality
btnHold.addEventListener('click', function() {
    if (playing) {
    // 1. Add current score to active player's score 
    scores[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];  

        // 2. Check if the player's score >= 20 
        if (scores[activePlayer] >= 20) {
            // Finish the game 
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        } 
    }
}); 

// Reset game functionality
btnNew.addEventListener('click', init);