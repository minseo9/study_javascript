const fillBlock = Array.from(Array(20), () => Array(10).fill(false));
const blockSize = 35;

const tetrisContainer = document.getElementsByClassName("tetris-container")[0];
const tetrisCanvas = document.getElementById("tetrisCanvas");
const ctx = tetrisCanvas.getContext("2d");

const block = [
    {
        shape: [
            [
                [-1, 0],
                [0, 0],
                [1, 0],
                [2, 0],
            ],
            [
                [0, -1],
                [0, 0],
                [0, 1],
                [0, 2],
            ],
            [
                [-1, 0],
                [0, 0],
                [1, 0],
                [2, 0],
            ],
            [
                [0, -1],
                [0, 0],
                [0, 1],
                [0, 2],
            ],
        ],
        color: "#00D8FF", // 하늘
    },
    {
        shape: [
            [
                [-1, -1],
                [-1, 0],
                [0, 0],
                [1, 0],
            ],
            [
                [0, -1],
                [1, -1],
                [0, 0],
                [0, 1],
            ],
            [
                [-1, 0],
                [0, 0],
                [1, 0],
                [1, 1],
            ],
            [
                [0, -1],
                [0, 0],
                [-1, 1],
                [0, 1],
            ],
        ],
        color: "#0054FF", // 파랑
    },
    {
        shape: [
            [
                [1, -1],
                [-1, 0],
                [0, 0],
                [1, 0],
            ],
            [
                [0, -1],
                [0, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [-1, 0],
                [0, 0],
                [1, 0],
                [-1, 1],
            ],
            [
                [-1, -1],
                [0, -1],
                [0, 0],
                [0, 1],
            ],
        ],
        color: "#FFBB00", // 주황
    },
    {
        shape: [
            [
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1],
            ],
        ],
        color: "#FFE400", // 노랑
    },
    {
        shape: [
            [
                [0, 0],
                [1, 0],
                [-1, 1],
                [0, 1],
            ],
            [
                [-1, -1],
                [-1, 0],
                [0, 0],
                [0, 1],
            ],
            [
                [0, 0],
                [1, 0],
                [-1, 1],
                [0, 1],
            ],
            [
                [-1, -1],
                [-1, 0],
                [0, 0],
                [0, 1],
            ],
        ],
        color: "#1DDB16", // 초록
    },
    {
        shape: [
            [
                [0, -1],
                [-1, 0],
                [0, 0],
                [1, 0],
            ],
            [
                [0, -1],
                [0, 0],
                [1, 0],
                [0, 1],
            ],
            [
                [-1, 0],
                [0, 0],
                [1, 0],
                [0, 1],
            ],
            [
                [0, -1],
                [-1, 0],
                [0, 0],
                [0, 1],
            ],
        ],
        color: "#5F00FF", // 보라
    },
    {
        shape: [
            [
                [-1, 0],
                [0, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, -1],
                [-1, 0],
                [0, 0],
                [-1, 1],
            ],
            [
                [-1, 0],
                [0, 0],
                [0, 1],
                [1, 1],
            ],
            [
                [0, -1],
                [-1, 0],
                [0, 0],
                [-1, 1],
            ],
        ],
        color: "#FF0000", // 빨강
    },
];

window.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 37:
            moveLeftBlock();
            break;
        case 39:
            moveRightBlock();
            break;
        case 38:
            type += 1;
            if (!(isCollision() || isLeftCollision() || isRightCollision())) {
                turnBlock();
            } else {
                type -= 1;
            }
            break;
        case 40:
            if (!isCollision()) {
                downBlock();
            }
            break;
    }
});

function drawGrid() {
    for (let i = 0; i <= 10; i++) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(i * blockSize, 0);
        ctx.lineTo(i * blockSize, tetrisCanvas.height);
        ctx.stroke();
    }

    for (let i = 0; i <= 20; i++) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(0, i * blockSize);
        ctx.lineTo(tetrisCanvas.width, i * blockSize);
        ctx.stroke();
    }

    for (let row = 0; row < fillBlock.length; row++) {
        for (let col = 0; col < fillBlock[row].length; col++) {
            if (fillBlock[row][col]) {
                ctx.fillStyle = fillBlock[row][col];
                ctx.fillRect(
                    col * blockSize,
                    row * blockSize,
                    blockSize,
                    blockSize
                );
            }
        }
    }
}

function createBlock() {
    y = 0;
    x = 4;
    type = 0;

    const randomBlock = Math.floor(Math.random() * 7);
    selectBlock = block[randomBlock];
    color = selectBlock.color;
}

function drawBlock() {
    selectBlock.shape[type].forEach(([bx, by]) => {
        const blockX = (x + bx) * blockSize;
        const blockY = (y + by) * blockSize;

        for (let row = 0; row < fillBlock.length; row++) {
            for (let col = 0; col < fillBlock[row].length; col++) {
                if (!fillBlock[row][col]) {
                    ctx.fillStyle = color;
                    ctx.fillRect(blockX, blockY, blockSize, blockSize);
                }
            }
        }
    });
}

function clearBlock() {
    ctx.clearRect(0, 0, tetrisCanvas.width, tetrisCanvas.height);
    drawGrid();
    drawBlock();
}

// 충돌 확인
function isCollision() {
    const Result = selectBlock.shape[type].some(([bx, by]) => {
        const currentX = x + bx;
        const currentY = y + by + 1;

        return currentY >= fillBlock.length || fillBlock[currentY][currentX];
    });

    return Result;
}

function isLeftCollision() {
    const LeftResult = selectBlock.shape[type].some(([bx, by]) => {
        const currentX = x + bx - 1;

        return currentX < 0;
    });

    return LeftResult;
}

function isRightCollision() {
    const rightResult = selectBlock.shape[type].some(([bx, by]) => {
        const currentX = x + bx + 1;

        return currentX >= fillBlock[0].length;
    });

    return rightResult;
}

function fixBlock() {
    clearInterval(move);

    selectBlock.shape[type].forEach(([bx, by]) => {
        fillBlock[y + by][x + bx] = color;
    });

    for (let i = fillBlock.length - 1; i >= 0; i--) {
        const isFull = fillBlock[i].every((value) => value !== false);

        if (isFull) {
            for (let j = i; j > 0; j--) {
                fillBlock[j] = [...fillBlock[j - 1]];
            }

            fillBlock[0] = new Array(fillBlock[0].length).fill(false);
        }
    }

    clearBlock();
}

// 자동으로 내려감
function autoDownBlock() {
    move = setInterval(() => {
        if (isCollision()) {
            fixBlock();
            gameLoop();
        } else {
            y += 1;
            clearBlock();
        }
    }, 1000);
}

// 왼쪽으로 이동
function moveLeftBlock() {
    if (!(isLeftCollision() || isCollision())) {
        x -= 1;
        clearBlock();
    }
}

// 오른쪽으로 이동
function moveRightBlock() {
    if (!(isRightCollision() || isCollision())) {
        x += 1;
        clearBlock();
    }
}

// 회전
function turnBlock() {
    if (type >= 3) {
        type = 0;
    } else {
        clearBlock();
    }
}

// 아래로 내림
function downBlock() {
    if (isCollision()) {
        fixBlock();
        gameLoop();
    } else {
        y += 1;
        clearBlock();
    }
}

// 게임 반복
function gameLoop() {
    createBlock();
    drawBlock();
    autoDownBlock();
}

drawGrid();
gameLoop();
