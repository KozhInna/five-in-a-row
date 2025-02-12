const dimensions = 5; // The initial board size is dimensions x dimensions
const winLength = 5; // How many stones needed to win
const board = []; // The game board
let turn = "X"; // Starting player. The other player is 'O'.

function initializeGame() {
  // TODO: Task 1
  // Initialize the game board to be an array of five arrays.
  // Each of the inner arrays should contain five empty strings.
  // Use the variable dimensions instead of hard coding the number five.
  for (let i = 0; i < dimensions; i++) {
    board.push([]);
    for (let y = 0; y < dimensions; y++) {
      board[i].push("");
    }
  }
  console.log(board);
}

function nextTurn() {
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
  let turnLabel = document.getElementById("turn");
  turnLabel.textContent = turn;
}

function checkWin(x, y) {
  // TODO: Task 3
  // Hint: be careful to keep yourself inside of the game board!
  // Check the neighbouring squares of the square x,y.
  // If any of them contain same character as the current turn,
  // keep on checking to that direction -- and to the opposite!
  // Number of the stones needed is in variable winLength.
}

function expandBoard(direction) {
  // TODO: Task 2 B
  // This function adds a column or a row to the board
  // depending on the direction it gets as an argument.
  if (direction === "LEFT") {
    for (let i = 0; i < board.length; i++) {
      board[i].unshift("");
    }
  } else if (direction === "RIGHT") {
    for (let i = 0; i < board.length; i++) {
      board[i].push("");
    }
  } else if (direction === "UP") {
    board.unshift([]);
    for (let i = 0; i < board.length; i++) {
      board[0].push("");
    }
  } else if (direction === "DOWN") {
    board.push([]);
    for (let i = 0; i < board.length; i++) {
      board[board.length - 1].push("");
    }
  }

  drawBoard();
}

function handleClick(event) {
  let square = event.target;
  let x = square.dataset.x;
  let y = square.dataset.y;

  board[y][x] = turn;
  square.textContent = turn;
  square.removeEventListener("click", handleClick);

  checkWin(x, y);

  // TODO: Task 2 A
  // Implement the conditions when the board should be expanded.
  // Ie when the player clicks the extreme rows or columns.

  for (let i = 0; i < board.length; i++) {
    if (board[i][0] !== "") {
      expandBoard("LEFT");
    } else if (board[i][board.length - 1] !== "") {
      expandBoard("RIGHT");
    } else if (board[0][i] !== "") {
      expandBoard("UP");
    } else if (board[board.length - 1][i] !== "") {
      expandBoard("DOWN");
    }
  }

  nextTurn();
}

function createSquare(boardDiv, x, y) {
  let element = document.createElement("div");
  element.setAttribute("class", "square");
  element.setAttribute("data-x", x);
  element.setAttribute("data-y", y);
  element.textContent = board[y][x];

  if (board[y][x] === "") {
    element.addEventListener("click", handleClick);
  }

  boardDiv.appendChild(element);
}

function drawBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = ""; // Clear the board first!

  for (let y = 0; y < dimensions; y++) {
    for (let x = 0; x < dimensions; x++) {
      createSquare(boardDiv, x, y);
    }
  }
  console.log(board);
}

initializeGame();
drawBoard();
