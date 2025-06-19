const size = 25;
let snakeLocation = [];
let direction;
let feedX, feedY;
let timeLoop;

const startButton = document.getElementsByClassName("start-button")[0];
startButton.addEventListener("click", startGame);

let score = 0;
const scoreView = document.getElementsByClassName("score-view")[0];

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "pink";
ctx.fillRect(0, 0, size, size);
ctx.fillRect(size, 0, size, size);

// 게임 시작
function startGame() {
    if (timeLoop) clearInterval(timeLoop);

    snakeLocation = [
        { x: size * 1, y: 0 },
        { x: size * 0, y: 0 },
    ];
    direction = "ArrowRight";

    window.addEventListener("keydown", checkMove);
    setFeedLocation();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "pink";
    snakeLocation.forEach((location, index) => {
        ctx.fillRect(location.x, location.y, size, size);
    });
    drawFeed();

    timeLoop = setInterval(moveSnake, 250);
}

// 먹이 위치 설정
function setFeedLocation() {
    const xLine = Math.floor(canvas.width / size);
    const yLine = Math.floor(canvas.height / size);

    feedX = (Math.floor(Math.random() * (xLine - 2)) + 2) * size;
    feedY = (Math.floor(Math.random() * (yLine - 1)) + 1) * size;
}

// 먹이 그리기
function drawFeed() {
    ctx.fillStyle = "red";
    ctx.fillRect(feedX, feedY, size, size);
}

// 충돌 확인
function isWallCollision(x, y) {
    return (
        x < 0 || x + size > canvas.width || y < 0 || y + size > canvas.height
    );
}

function isTailCollision(x, y) {
    return snakeLocation.some((location) => {
        return x === location.x && y === location.y;
    });
}

// 먹이랑 뱀 겹침 확인
function isOverlap() {
    if (feedX === snakeLocation[0].x && feedY === snakeLocation[0].y) {
        console.log("먹음");

        setFeedLocation();
        drawFeed();

        let addSnake = {
            x: snakeLocation[snakeLocation.length - 1].x,
            y: snakeLocation[snakeLocation.length - 1].y,
        };
        switch (direction) {
            case "ArrowUp": // y -= 1
                addSnake.y += size;
                break;
            case "ArrowDown": // y += 1
                addSnake.y -= size;
                break;
            case "ArrowLeft": // x -= 1
                addSnake.x += size;
                break;
            case "ArrowRight": // x += 1
                addSnake.x -= size;
                break;
        }

        snakeLocation.push(addSnake);

        score += 10;
        scoreView.innerText = score;
    }
}

// 키보드 이벤트 확인
function checkMove(e) {
    const next = e.key;
    if (
        (direction === "ArrowRight" && next === "ArrowLeft") ||
        (direction === "ArrowLeft" && next === "ArrowRight") ||
        (direction === "ArrowUp" && next === "ArrowDown") ||
        (direction === "ArrowDown" && next === "ArrowUp")
    ) {
        return;
    } else {
        direction = e.key;
        moveSnake();
    }
}

function moveSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFeed();
    ctx.fillStyle = "pink";

    const head = snakeLocation[0];
    let newHead = { x: head.x, y: head.y };

    switch (direction) {
        case "ArrowUp": // y -= 1
            newHead.y -= size;
            break;
        case "ArrowDown": // y += 1
            newHead.y += size;
            break;
        case "ArrowLeft": // x -= 1
            newHead.x -= size;
            break;
        case "ArrowRight": // x += 1
            newHead.x += size;
            break;
    }
    if (
        isWallCollision(newHead.x, newHead.y) ||
        isTailCollision(newHead.x, newHead.y)
    ) {
        gameOver();
        return;
    }

    snakeLocation.unshift(newHead);
    snakeLocation.pop();

    snakeLocation.forEach((location) => {
        ctx.fillRect(location.x, location.y, size, size);
    });

    isOverlap();
}

function gameOver() {
    snakeLocation.forEach((location) => {
        ctx.fillRect(location.x, location.y, size, size);
    });

    window.removeEventListener("keydown", checkMove);
    clearInterval(timeLoop);
}
