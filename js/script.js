"use strict";

const rollDice = document.querySelector(".btn--roll");
const dice = document.querySelector(".dice");
const hold = document.querySelector(".hold");
let activePlayer = () => document.querySelector(".active__player");
//global scores
let scorePlayerOne = 0;
let scorePlayerTwo = 0;
//current scores
let currentScorePlayerOne = 0;
let currentScorePlayertwo = 0;
let diceNumber;
// set active player x //
const setActivePlayer = function (playerClass) {
  if (playerClass === "player__one") {
    document.querySelector(`.${playerClass}`).classList.add("active__player");
    document.querySelector(".player__two").classList.remove("active__player");
  } else {
    document.querySelector(`.${playerClass}`).classList.add("active__player");
    document.querySelector(".player__one").classList.remove("active__player");
  }
};
//get actived player
const getActivePlayer = () =>
  document.querySelector(".active__player").classList[0];

//ajout de global score à un player x
const addGlobalScoreToPlayer = function (numPlayer, score) {
  if (numPlayer === 1) {
    scorePlayerOne = scorePlayerOne + score;
    document.querySelector(`.score__${numPlayer}`).textContent = scorePlayerOne;
  } else {
    scorePlayerTwo = scorePlayerTwo + score;
    document.querySelector(`.score__${numPlayer}`).textContent = scorePlayerTwo;
  }
};
//ajout de current score à un player x
const addCurrentScoreToPlayer = function (numPlayer, score) {
  if (numPlayer === 1) {
    currentScorePlayerOne = currentScorePlayerOne + score;
    document.querySelector(`.current__${numPlayer}`).textContent =
      currentScorePlayerOne;
  } else {
    currentScorePlayertwo = currentScorePlayertwo + score;
    document.querySelector(`.current__${numPlayer}`).textContent =
      currentScorePlayertwo;
  }
};

// reset currentScore to zero
const resetCurrentScorePlayer = function (numPlayer) {
  document.querySelector(`.current__${numPlayer}`).textContent = 0;
};

// reset globalScore to zero
const resetGlobalScorePlayer = function (numPlayer) {
  document.querySelector(`.score__${numPlayer}`).textContent = 0;
};

//initialising game
setActivePlayer("player__one");
resetCurrentScorePlayer("player__one");
resetCurrentScorePlayer("player__two");
resetGlobalScorePlayer("player__one");
resetGlobalScorePlayer("player__two");

///Roll the dice
rollDice.addEventListener("click", function () {
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.src = `images/dice-${diceNumber}.png`;
});

//Game rule's player can rolls the dice and win score (and add it to the current score) that the dice show, if dice show 1  the current score is set to zero. if player holds, add the current score to the global score
