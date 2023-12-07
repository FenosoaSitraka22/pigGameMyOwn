"use strict";
const rollDice = document.querySelector(".btn--roll");
const dice = document.querySelector(".dice");
const hold = document.querySelector(".btn--hold");
const restartAfterVictory = document.querySelector(".btn--restart--modal");
const restart = document.querySelector(".btn--restart");
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
//get current score Player
const getCurrentScorePlayer = (nomPlayer) =>
  nomPlayer === "player__one" ? currentScorePlayerOne : currentScorePlayertwo;
const getScorePlayer = (nomPlayer) =>
  nomPlayer === "player__one" ? scorePlayerOne : scorePlayerTwo;
//change player
const changeCurrentPlayer = function (currentPlayer) {
  currentPlayer === "player__one"
    ? setActivePlayer("player__two")
    : setActivePlayer("player__one");
};
let currentPlayer = getActivePlayer();

//ajout de global score à un player x
const addGlobalScoreToPlayer = function (numPlayer, score) {
  if (numPlayer === 1) {
    scorePlayerOne = scorePlayerOne + score;
    document.querySelector(`#score__${numPlayer}`).textContent = scorePlayerOne;
  } else {
    scorePlayerTwo = scorePlayerTwo + score;
    document.querySelector(`#score__${numPlayer}`).textContent = scorePlayerTwo;
  }
};
//ajout de current score à un player x
const addCurrentScoreToPlayer = function (player, score) {
  if (player === "player__one") {
    currentScorePlayerOne = currentScorePlayerOne + score;
    document.querySelector(`#current__1`).textContent = currentScorePlayerOne;
  } else {
    currentScorePlayertwo = currentScorePlayertwo + score;
    document.querySelector(`#current__2`).textContent = currentScorePlayertwo;
  }
};

// reset currentScore to zero
const resetCurrentScorePlayer = function (numPlayer) {
  document.querySelector(`#current__${numPlayer}`).textContent = 0;
  numPlayer === 1 ? (currentScorePlayerOne = 0) : (currentScorePlayertwo = 0);
};

// reset globalScore to zero
const resetGlobalScorePlayer = function (numPlayer) {
  document.querySelector(`#score__${numPlayer}`).textContent = 0;
  numPlayer === 1 ? (scorePlayerOne = 0) : (scorePlayerTwo = 0);
};
// numero player

const getNumeroPlayer = (nomPlayer) => (nomPlayer === "player__one" ? 1 : 2);

// affichage victoire
function showVictory(numPlayer, score) {
  document.querySelector(".overlay").classList.remove("hidden");
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(
    ".modal__title"
  ).textContent = `Player ${numPlayer}'s victory`;
  document.querySelector(
    ".modal__content"
  ).textContent = `Player ${numPlayer} wins with score ${score}`;
}
//initialising game
function restartGame() {
  setActivePlayer("player__one");
  resetCurrentScorePlayer(1);
  resetCurrentScorePlayer(2);
  resetGlobalScorePlayer(1);
  resetGlobalScorePlayer(2);
  dice.src = `images/dice-1.png`;
}

///Roll the dice
rollDice.addEventListener("click", function () {
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.src = `images/dice-${diceNumber}.png`;
  currentPlayer = getActivePlayer();
  if (diceNumber > 1) {
    addCurrentScoreToPlayer(currentPlayer, diceNumber);
  } else if (diceNumber === 1) {
    resetCurrentScorePlayer(getNumeroPlayer(currentPlayer));
    changeCurrentPlayer(currentPlayer);
  }
});

//holding score

hold.addEventListener("click", function () {
  let numPlayer = getNumeroPlayer(currentPlayer);

  addGlobalScoreToPlayer(numPlayer, getCurrentScorePlayer(currentPlayer));
  let scorePlayer = getScorePlayer(currentPlayer);
  resetCurrentScorePlayer(numPlayer);
  if (scorePlayer >= 100) {
    showVictory(numPlayer, scorePlayer);
  }
  changeCurrentPlayer(currentPlayer);
});

//restarting the game after player x victory
restartAfterVictory.addEventListener("click", function () {
  document.querySelector(".overlay").classList.add("hidden");
  document.querySelector(".modal").classList.add("hidden");
  restartGame();
});

//restart the current game
restart.addEventListener("click", restartGame);
//Game rule's player can rolls the dice and win score (and add it to the current score) that the dice show, if dice show 1  the current score is set to zero. if player holds, add the current score to the global score
