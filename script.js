'use strict';
// SELECTING ELEMENTS
// SWITCHING PLAYERS CONSTS
var isMobile =
  Math.min(window.screen.width, window.screen.height) < 768 ||
  navigator.userAgent.indexOf('Mobi') > -1;

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const score0Element = document.querySelector(`#score--0`);
const score1Element = document.querySelector(`#score--1`);
// CURRENT SCORE ELEMENTS
const current0Element = document.getElementById(`current--0`);
const current1Element = document.getElementById(`current--1`);

const diceElement = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;

// INITALIZATION FUNCTION
const init = function () {
  // HIDE DICE ELEMENT
  diceElement.classList.add(`hidden`);
  // CURRENT SCORE JE 0 SHRANIMO GA IZVEN SPODNJE FUNKCIJE, KER BI POTEM VSAKIČ KO BI KLIKNILI NEW DICE SCORE BIL 0
  // ARRAY OF SCORES OF PLAYER 0 AND PLAYER 1
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // STARTING CONDITIONS rezultate da na 0
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};
init();

// SWITCH PLAYER FUNCTION
const switchPlayer = function () {
  // switch to next player if active player is 0 then we want new active player to be 1... else it will be 0. As we switch player we have to
  // reset current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // before u switch players it resets current score to 0
  currentScore = 0;
  // on player 0 it will REMOVE class player--active from HTML if its there and if its not it will ADD it....the same for the other player
  // we start player--active class only on 1 element thats player 0 in index.html so we are sure its only on one of the elements at once
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1.GENERATE A RANDOM DICER ROLL
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2.DISPLAY DICE
    diceElement.classList.remove(`hidden`);
    //it will replace ${diceNumber} with the new random number (between 1 and 6) and it will show us a new image.
    //   We are changing the source address of the image using template literal using this code
    diceElement.src = `dice-${diceNumber}.png`;
    //3.CHECK FOR ROLLED 1: IF TRUE, SWITCH TO NEXT PLAYER
    if (diceNumber !== 1) {
      // add dice number to current score. Da lahko score nekam dodamo ga moramo shraniti v variable
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLD BUTTON

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1.ADD CURRENT SCORE TO ACTIVE PLAYERS SCORE
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.CHECK IF SCORE IS >=100
    if (scores[activePlayer] >= 100) {
      // FINISH GAME
      playing = false;
      diceElement.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      // SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});
// NEW GAME
btnNew.addEventListener(`click`, init);
