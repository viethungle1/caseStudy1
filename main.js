const  canvas = document.getElementById("canvas");
const  ctx = canvas.getContext("2d");

const ROW = 18;
// số hàng = 18
const COL = 10;
// số cột = 10
const SQ = 30;
// kích thước 1 ô =40
const COLOR = "WHITE";
//màu của ô là màu trắng

function drawSquare (x,y,color) {
    // vẽ hình vuông màu trắng
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ ,y * SQ, SQ , SQ);

    // vẽ đường viền cho ô vuông
    ctx.strokeStyle = "#ccc";
    ctx.strokeRect(x * SQ , y * SQ, SQ , SQ);
}
let main = [];
for (let r = 0; r < ROW; r++) {
    main[r]=[];
    for (let c = 0; c < COL ; c++) {
        main[r][c] = COLOR;
    }
}

function drawBoard () {
    for (r=0; r<ROW; r++) {
        for (c=0; c<COL; c++) {
            drawSquare(c,r,main[r][c]);
        }
    }
}
drawBoard();

class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color=color;

        this.tetrominoN=0;
        // Chỉ số góc quay đầu tiên
        this.activeTetromino = this.tetromino[this.tetrominoN]

        this.x =3;
        this.y=-2;
    }
    fill(color) {
        for (let r=0; r<this.activeTetromino.length; r++) {
            for (let c=0;c<this.activeTetromino.length; c++) {
                if (this.activeTetromino [r][c]) {
                    // trường hợp Tetromini có giá trị thì sẽ vẽ hình vuông cho nó
                    drawSquare(this.x+c, this.y+r, color)
                }
            }
        }
    }
    draw () {
        this.fill(this.color)
    }
    unDraw () {
        this.fill(COLOR)
    }
    moveDown () {
        this.unDraw();
        this.y++;
        this.draw();
    }
}
const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"],
];

function randomPiece() {
    let r= Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES [r][1]);
}

let p=randomPiece();
console.log(p);

let gameOver = false;
let interval;
function drop () {
    interval = setInterval(function () {
        if (!gameOver) {
            p.moveDown();
        } else {
            clearInterval(interval)
        }
    },500)
}
drop();