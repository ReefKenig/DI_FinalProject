const WIDTH = 10;
const COLORS = ["orange", "red", "purple", "green", "blue"];
const STARTING_POSITION = 4;
const DEFAULT_ROTATION = 0;

let nextRandom = 0;
let timerId;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  const restartBtn = document.querySelector("#restart-button");

  const lTetromino = [
    [1, 2, WIDTH + 1, WIDTH * 2 + 1],
    [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 2],
    [1, WIDTH + 1, WIDTH * 2, WIDTH * 2 + 1],
    [WIDTH, WIDTH * 2, WIDTH * 2 + 1, WIDTH * 2 + 2],
  ];
  const iTetromino = [
    [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1],
    [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3],
    [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1],
    [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3],
  ];
  const zTetromino = [
    [0, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
    [WIDTH + 1, WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1],
    [0, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
    [WIDTH + 1, WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1],
  ];
  const tTetromino = [
    [1, WIDTH, WIDTH + 1, WIDTH + 2],
    [1, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
    [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
    [1, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
  ];
  const oTetromino = [
    [0, 1, WIDTH, WIDTH + 1],
    [0, 1, WIDTH, WIDTH + 1],
    [0, 1, WIDTH, WIDTH + 1],
    [0, 1, WIDTH, WIDTH + 1],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let current_position = STARTING_POSITION;
  let current_rotation = DEFAULT_ROTATION;

  // Randomly select a tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][DEFAULT_ROTATION];

  // Draw the tetromino
  function draw() {
    current.forEach((index) => {
      squares[current_position + index].classList.add("tetromino");
      squares[current_position + index].style.backgroundColor = COLORS[random];
    });
  }

  function undraw() {
    current.forEach((index) => {
      squares[current_position + index].classList.remove("tetromino");
      squares[current_position + index].style.backgroundColor = "";
    });
  }

  function control(e) {
    if (!timerId) return;
    switch (e.keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        rotate();
        break;
      case 39:
        moveRight();
        break;
      case 40:
        moveDown();
        break;
    }
  }

  document.addEventListener("keydown", control);

  // Move tetromino down
  function moveDown() {
    // Prevent shapes from going inside one another when fast decending
    const isBelowTaken = current.some((index) =>
      squares[current_position + index + WIDTH].classList.contains("taken")
    );
    if (isBelowTaken) return;
    undraw();
    current_position += WIDTH;
    draw();
    setTimeout(freeze, 600);
  }

  // Freeze tetromino when it reaches the bottom
  function freeze() {
    if (
      current.some((index) =>
        squares[current_position + index + WIDTH].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[current_position + index].classList.add("taken")
      );

      // Make a new tetromino fall
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current_rotation = DEFAULT_ROTATION;
      current = theTetrominoes[random][current_rotation];
      current_position = STARTING_POSITION;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  // Move tetromino left, unless at edge or blocked
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (current_position + index) % WIDTH === 0
    );
    if (!isAtLeftEdge) current_position -= 1;
    if (
      current.some((index) =>
        squares[current_position + index].classList.contains("taken")
      )
    ) {
      current_position += 1;
    }

    draw();
  }

  // Move tetromino right, unless at edge or blocked
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (current_position + index) % WIDTH === WIDTH - 1
    );
    if (!isAtRightEdge) current_position += 1;
    if (
      current.some((index) =>
        squares[current_position + index].classList.contains("taken")
      )
    ) {
      current_position -= 1;
    }

    draw();
  }

  // Rotate tetromino
  function rotate() {
    undraw();
    current_rotation++;

    // If rotation gets to 4 reset it back to 0
    if (current_rotation === current.length)
      current_rotation = DEFAULT_ROTATION;

    current = theTetrominoes[random][current_rotation];
    draw();
  }

  // Display next tetromino in mini-grid
  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  const displayIndex = 0;

  // Tetrominoes without rotations
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  ];

  // Display next shape in the mini-grid
  function displayShape() {
    // Remove traces of previous shape
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });

    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor =
        COLORS[nextRandom];
    });
  }

  // Add functionality to button
  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      displayShape();
    }
  });

  function addScore() {
    for (let i = 0; i < 199; i += WIDTH) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken", "tetromino");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, WIDTH);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  // Game over
  function gameOver() {
    if (
      current.some((index) =>
        squares[current_position + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML += " Game Over";
      startBtn.style.display = "none";
      restartBtn.style.display = "block";
      clearInterval(timerId);
      timerId = null;
    }
  }

  restartBtn.addEventListener("click", () => {
    score = 0;
    scoreDisplay.innerHTML = score;
    startBtn.style.display = "block";
    restartBtn.style.display = "none";
    for (let i = 0; i < 200; i++) {
      squares[i].classList.remove("taken", "tetromino");
      squares[i].style.backgroundColor = "";
    }
    displaySquares.forEach((square) => square.classList.remove("tetromino"));
  });
});
