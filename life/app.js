// Conway's Game of Life.
// A simple Javascript implementation by thaifan1980.

//------------------------------------------------------
//                board map
//------------------------------------------------------

// let board = [
//     ["0", "0", "0", "0", "0", "0", "0", "0"],
//     ["0", "1", "1", "0", "0", "0", "0", "0"],
//     ["0", "1", "1", "1", "0", "0", "0", "0"],
//     ["0", "0", "0", "1", "1", "0", "0", "0"],
//     ["0", "0", "0", "0", "0", "0", "0", "0"],
//     ["0", "1", "0", "1", "0", "0", "1", "0"],
//     ["0", "1", "0", "0", "0", "1", "0", "1"],
//     ["0", "1", "0", "0", "0", "0", "1", "0"],
//     ["0", "0", "0", "0", "0", "0", "0", "0"]
// ];
//
let board = [
  ["1", "1", "1", "1"],
  ["1", "1", "1", "1"],
  ["1", "1", "1", "1"],
  ["1", "1", "1", "1"]
];

// let board = [
//   ["1", "1", "0", "0", "0", "0", "0", "0"],
//   ["1", "1", "0", "0", "0", "0", "0", "0"],
//   ["0", "0", "1", "1", "0", "0", "0", "0"],
//   ["0", "0", "1", "1", "0", "0", "0", "0"],
//   ["0", "0", "0", "0", "0", "0", "0", "0"],
//   ["0", "0", "0", "0", "0", "0", "1", "0"],
//   ["0", "0", "0", "0", "0", "0", "1", "0"],
//   ["0", "1", "1", "1", "0", "0", "1", "0"],
//   ["0", "0", "0", "0", "0", "0", "0", "0"]
// ];

//------------------------------------------------------
//                animation setup
//------------------------------------------------------

let canvas = document.getElementById("life-game-field").getContext("2d");
let i = 1;
const frameLimit = 30;

//------------------------------------------------------
//                initialize ball attributes
//------------------------------------------------------

const animiation = setInterval(() => {
  if (i >= frameLimit) {
    clearInterval(animiation);
  }

  drawFrame();

  calculateNextFrame();

  i++;
}, 800);

//------------------------------------------------------
//                Frame calculation
//------------------------------------------------------

function calculateNextFrame() {
  let copyTable = [];

  board.forEach((row, y) => {
    copyTable[y] = [];
    row.forEach((cell, x) => {
      copyTable[y][x] = analizeCell(x, y);
    });
  });

  board = [...copyTable];
}

//------------------------------------------------------
//                Analize given cell
//------------------------------------------------------

function analizeCell(x, y) {
  let livingNeighbor = 0;

  for (let j = y - 1; j <= y + 1; j++) {
    for (let i = x - 1; i <= x + 1; i++) {
      if (board[j] && board[j][i] && (j !== y || i !== x)) {
        if (board[j][i] === "1") {
          livingNeighbor++;
        }
      }
    }
  }

  if (board[y][x] === "0" && livingNeighbor === 3) {
    return "1";
  } else if (
    board[y][x] === "1" &&
    (livingNeighbor === 2 || livingNeighbor === 3)
  ) {
    return "1";
  } else {
    return "0";
  }
}

//------------------------------------------------------
//               Draw frame
//------------------------------------------------------

function drawFrame() {
  const yDim = board.length;
  const xDim = board[0].length;
  const cellSize = 32;

  canvas.clearRect(0, 0, xDim * cellSize, yDim * cellSize);

  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      canvas.beginPath();
      canvas.rect(x * cellSize, y * cellSize, cellSize, cellSize);
      fillCell(cell);
    });
  });
}

//------------------------------------------------------
//                Fill cell
//------------------------------------------------------

function fillCell(cellValue) {
  canvas.strokeStyle = "#e1e1e1";
  canvas.fillStyle = "cadetblue";

  if (cellValue === "1") {
    canvas.fill();
  } else if (cellValue === "0") {
    canvas.stroke();
  }
}
