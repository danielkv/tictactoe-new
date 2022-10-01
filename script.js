const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const messageContainer = document.querySelector(".messageContainer");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restartButton");
const scoreBoardX = document.querySelector(".scoreboard .x");
const scoreBoardO = document.querySelector(".scoreboard .o");

let currentPlayer = "x"; // x \ o

const scoreBoard = {
  x: 0,
  o: 0,
};

const winnerPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function newGame(initialPlayer = currentPlayer) {
  clearCells();
  setPlayer(initialPlayer);
  hideMessage();
  setupEventListeners();
}

function clearCells() {
  cells.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("o");
  });
}

function setPlayer(player) {
  if (player !== "x" && player !== "o") return;

  currentPlayer = player;

  if (player === "x") {
    board.classList.remove("o");
    board.classList.add("x");
  } else {
    board.classList.remove("x");
    board.classList.add("o");
  }
}

function hideMessage() {
  messageContainer.classList.remove("show");
  message.innerHTML = "";
}

function setupEventListeners() {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick, { once: true });
  });
}

function handleCellClick(e) {
  e.target.classList.add(currentPlayer);

  if (checkWin()) {
    return showMessage(currentPlayer);
  }

  if (checkDraw()) {
    return showMessage();
  }

  swapPlayer();
}

function checkWin() {
  return winnerPositions.some((positions) => {
    const cellInPositions = positions.map((pos) => cells.item(pos));

    return cellInPositions.every((cell) =>
      cell.classList.contains(currentPlayer)
    );
  });
}

function checkDraw() {
  return [...cells].every(
    (cell) => cell.classList.contains("o") || cell.classList.contains("x")
  );
}

function showMessage(winner) {
  if (!winner) {
    messageContainer.classList.add("show");
    message.innerHTML = "Draw";

    restartButton.addEventListener("click", () => newGame(currentPlayer));

    return;
  }

  scoreBoard[winner] += 1;
  updateScoreBoard(winner);

  restartButton.addEventListener("click", () => newGame(winner));

  message.innerHTML = `${winner} wins`;
  messageContainer.classList.add("show");
}

function swapPlayer() {
  if (currentPlayer === "x") setPlayer("o");
  else setPlayer("x");
}

function updateScoreBoard() {
  scoreBoardO.innerHTML = scoreBoard.o;
  scoreBoardX.innerHTML = scoreBoard.x;
}

function resetScoreboard() {
  scoreBoard.x = 0;
  scoreBoard.y = 0;

  updateScoreBoard();
}

resetScoreboard();
newGame();
