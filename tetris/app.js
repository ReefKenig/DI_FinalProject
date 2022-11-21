document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startButton = document.querySelector("#start_button");
  const width = 10;

  const tetrominoes = {
    lTetromino: [
      [1, 2, width + 1, width * 2 + 1],
      [width, width + 1, width + 2, width * 2 + 2],
      [1, width + 1, width * 2, width * 2 + 1],
      [width, width * 2, width * 2 + 1, width * 2 + 2],
    ],
    zTetromino: [
      [width + 1, width + 2, width * 2, width * 2 + 1],
      [0, width, width + 1, width * 2 + 1],
      [width + 1, width + 2, width * 2, width * 2 + 1],
      [0, width, width + 1, width * 2 + 1]
    ],
    tTetromino: [
      [1, width, width + 1, width + 2],
      [1, width + 1, width + 2, width * 2 + 1],
      [width, width + 1, width + 2, width * 2 + 1],
      [1, width, width + 1, width * 2 + 1]
    ],
    oTetromino: [
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1]
    ],
    iTetromino: [
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3],
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3]
    ]
  };

  let current_position = 4;
  let current_rotation = 0;

  let current_tetromino = tetrominoes[Object.keys(tetrominoes)[Math.floor(Math.random() * Object.keys(tetrominoes).length)]];
  let current = current_tetromino[current_rotation];
  // let current = current_tetromino[Math.floor(Math.random() * current_tetromino.length)];

  const draw = () => {
    current.forEach(index => {
      squares[current_position + index].classList.add("tetromino");
    })
  }

  const erase = () => {
    current.forEach(index => {
      squares[current_position + index].classList.remove("tetromino");
    })
  }

  draw();
  timerId = setInterval(moveDown, 1000);

  function moveDown() {
    erase();
    current_position += width;
    draw();
  }
});
