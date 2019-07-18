//------------------------------------------------------
//                board map
//------------------------------------------------------

const board = [
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X"],
    ["X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X"],
    ["X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X"],
    ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
    ["X", "0", "0", "0", "0", "0", "0", "0", "0", "Y", "Y", "X"],
    ["X", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "X"],
    ["X", "0", "0", "X", "X", "X", "0", "0", "0", "Y", "0", "X"],
    ["X", "0", "0", "0", "X", "0", "0", "0", "0", "Y", "Y", "X"],
    ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
    ["X", "0", "0", "Y", "0", "0", "0", "0", "0", "0", "0", "X"],
    ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
];

//------------------------------------------------------
//                ball class
//------------------------------------------------------

function Ball(x, y) {
    this.position = {
        x: x,
        y: y
    }

    this.direction = {
        x: 1,
        y: 1
    }

    this.getDirection = function () {
        return this.direction;
    };

    this.getPosition = function () {
        return this.position;
    };

    this.getNewPosition = function () {
        let newPosition = {
            x: this.position.x + this.direction.x,
            y: this.position.y + this.direction.y
        }
        return newPosition;
    };

    this.setPosition = function (x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    this.setDirection = function (x, y) {
        this.direction.x = x;
        this.direction.y = y;
    }

    this.changeDirection = function () {
        let newDirectionX;
        let newDirectionY;

        do {
            newDirectionX = Math.floor((Math.random() * 3) - 1);
            newDirectionY = Math.floor((Math.random() * 3) - 1);
        } while ((newDirectionX === this.direction.x && newDirectionY === this.direction.y) || (newDirectionY === 0 && newDirectionX === 0));

        this.direction.x = newDirectionX;
        this.direction.y = newDirectionY;
    }

}

//------------------------------------------------------
//                setup animation
//------------------------------------------------------

let canvas = document.getElementById('playing-field').getContext('2d');
let i = 1;
const frameLimit = 120;

//------------------------------------------------------
//                setup ball attributes 
//------------------------------------------------------

const POSITION_X = 1;
const POSITION_Y = 1;
const DIRECTION_X = -1;
const DIRECTION_Y = -1;

const ball = new Ball(POSITION_X, POSITION_Y);
ball.setDirection(DIRECTION_X, DIRECTION_Y);
board[POSITION_Y][POSITION_X] = '1';

//------------------------------------------------------
//                start animiation
//    first frame is drawn with initiating parameters
//------------------------------------------------------

const animiation = setInterval(() => {

    if (i >= frameLimit) {
        clearInterval(animiation);
    };

    drawFrame();
    calculateNextFrame();

    i++;

}, 300);

//------------------------------------------------------
//                Frame calculation
//------------------------------------------------------

function calculateNextFrame() {
    const position = ball.getPosition();
    let newPosition = ball.getNewPosition();
    let obstacle = board[newPosition.y][newPosition.x] === 'Y' ? true : false;

    if (board[newPosition.y][newPosition.x] === 'X') {
        do {
            ball.changeDirection();
            newPosition = ball.getNewPosition();
        }
        while (board[newPosition.y][newPosition.x] !== '0' && board[newPosition.y][newPosition.x] !== 'Y');

        obstacle = board[newPosition.y][newPosition.x] === 'Y' ? true : false;
    };

    board[position.y][position.x] = '0';
    ball.setPosition(newPosition.x, newPosition.y);
    board[newPosition.y][newPosition.x] = '1';

    if (obstacle) {
        ball.changeDirection();
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
        })
    });
}

//------------------------------------------------------
//                Fill cell
//------------------------------------------------------

function fillCell(cellValue) {
    canvas.strokeStyle = '#e1e1e1';
    canvas.fillStyle = 'cadetblue';

    if (cellValue === 'X') {
        canvas.fill();
    } else if (cellValue === '0') {
        canvas.stroke();
    } else if (cellValue === 'Y') {
        canvas.fillStyle = 'red';
        canvas.fill();
        canvas.fillStyle = 'cadetblue';
    } else if (cellValue === '1') {
        canvas.fillStyle = 'yellow';
        canvas.fill();
        canvas.fillStyle = 'cadetblue';
    }
}