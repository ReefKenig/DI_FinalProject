document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  const colors = ["orange", "red", "purple", "green", "blue"];

  const lTetromino = [
    [1, 2, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2, width * 2 + 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];
  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let current_position = 4;
  let current_rotation = 0;

  // Randomly select a tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][0];

  // Draw the tetromino
  function draw() {
    current.forEach((index) => {
      squares[current_position + index].classList.add("tetromino");
      squares[current_position + index].style.backgroundColor = colors[random];
    });
  }

  function undraw() {
    current.forEach((index) => {
      squares[current_position + index].classList.remove("tetromino");
      squares[current_position + index].style.backgroundColor = "";
    });
  }

  // Make the tetromino move down every second
  // timerId = setInterval(moveDown, 1000);

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
    undraw();
    current_position += width;
    draw();
    freeze();
  }

  // Freeze tetromino when it reaches the bottom
  function freeze() {
    if (
      current.some((index) =>
        squares[current_position + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[current_position + index].classList.add("taken")
      );

      // Make a new tetromino fall
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][current_rotation];
      current_position = 4;
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
      (index) => (current_position + index) % width === 0
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
      (index) => (current_position + index) % width === width - 1
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
    if (current_rotation === current.length) current_rotation = 0;

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
        colors[nextRandom];
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
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      displayShape();
    }
  });

  function addScore() {
    for (let i = 0; i < 199; i += width) {
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
        const squaresRemoved = squares.splice(i, width);
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
      clearInterval(timerId);
      timerId = null;
    }
  }
});
