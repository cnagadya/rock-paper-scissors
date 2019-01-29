const visibleGameElement = document.getElementById("visibleGame");
const startGameElement = document.getElementById("startGame");
const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");
const resultElement = document.getElementById("result");
const endResultElement = document.getElementById("endResult");
const roundElement = document.getElementById("round");
// declare score variables
let playerScore = 0,
  computerScore = 0,
  round = 1;
// returns a random computer choice
function computerPlay() {
  const Choices = ["Rock", "Paper", "Scissors"];
  return Choices[Math.floor(Math.random() * 3)];
}

// returns the winning result of a round
function play(playerSelection, computerSelection) {
  let playerCaps = playerSelection.toUpperCase();
  let computerCaps = computerSelection.toUpperCase();
  if (
    (playerCaps === "ROCK" && computerCaps === "SCISSORS") ||
    (playerCaps === "PAPER" && computerCaps === "ROCK") ||
    (playerCaps === "SCISSORS" && computerCaps === "PAPER")
  ) {
    return `You Win! ${playerSelection} beats ${computerSelection}`;
  } else if (playerCaps === computerCaps) {
    return "Nobody Wins";
  } else {
    return `You Lose! ${computerSelection} beats ${playerSelection}`;
  }
}
// runs the game logic
function game() {
  startGameElement.classList.add("hidden");
  visibleGameElement.classList.remove("hidden");
  // Array with player buttons
  const Buttons = Array.from(document.querySelectorAll(".playerChoices"));

  Buttons.forEach(button => {
    button.addEventListener("click", playRound);
  });
  function playRound(e) {
    let choice = event.target.dataset.key;
    let result = play(choice, computerPlay());
    if (result.includes("Win!")) {
      playerScore++;
      playerScoreElement.innerHTML = playerScore;
    } else if (result.includes("Lose")) {
      computerScore++;
      computerScoreElement.innerHTML = computerScore;
    }
    resultElement.innerHTML = result;
    round++;
    roundElement.innerHTML = round;

    if (computerScore === 5 || playerScore === 5) {
      endGame(computerScore, playerScore);
    }
  }
}
// return the winner
function endGame(score1, score2) {
  startGameElement.classList.remove("hidden");
  visibleGameElement.classList.add("hidden");
  startButton = document.getElementById("start").innerHTML = "PLAY AGAIN!";
  if (score1 > score2) {
    endResultElement.innerHTML = "The computer Won the Game!";
    endResultElement.style.color = "red";
  } else {
    endResultElement.innerHTML = "You Won the Game!";
    endResultElement.style.color = "black";
  }
  resetGame();
}
function resetGame() {
  resultElement.innerHTML = "";
  round = 1;
  playerScore = 0;
  computerScore = 0;
  computerScoreElement.innerHTML = computerScore;
  playerScoreElement.innerHTML = computerScore;
  roundElement.innerHTML = round;
}
