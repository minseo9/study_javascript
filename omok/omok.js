const canvas = document.getElementById("omokCanvas");
const ctx = canvas.getContext("2d");
const line = 12;
const size = canvas.width / line;

let player = "black";
const playBlock = Array.from(Array(line - 1), () =>
    Array(line - 1).fill(false)
);

const playerInfo = document.getElementsByClassName("player-info")[0];
canvas.addEventListener("click", drawOmok);

// 게임 판 그리기
function gameSetting() {
    ctx.beginPath();

    for (let i = 1; i < line; i++) {
        ctx.moveTo(size * i, 0);
        ctx.lineTo(size * i, canvas.height);
    }

    for (let i = 1; i < line; i++) {
        ctx.moveTo(0, size * i);
        ctx.lineTo(canvas.width, size * i);
    }

    ctx.stroke();
    ctx.closePath();
}

// 오목 두기
function drawOmok(e) {
    // 마우스 클릭 좌표
    const clickX = e.offsetX;
    const clickY = e.offsetY;

    // 가까운 격자 줄
    const drawCol = Math.round((clickX - size) / size);
    const drawRow = Math.round((clickY - size) / size);

    if (-1 < drawCol && drawCol < 11 && -1 < drawRow && drawRow < 11) {
        if (!playBlock[drawRow][drawCol]) {
            // 가까운 격자 좌표
            const drawX = (drawCol + 1) * size;
            const drawY = (drawRow + 1) * size;

            // 마우스 클릭 좌표 - 가까운 격자 좌표
            const distanceX = clickX - drawX;
            const distanceY = clickY - drawY;
            if (
                -10 < distanceX &&
                distanceX < 10 &&
                -10 < distanceY &&
                distanceY < 10
            ) {
                ctx.fillStyle = `${player}`;
                ctx.strokeStyle = `${player}`;

                ctx.beginPath();
                ctx.arc(drawX, drawY, 20, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.stroke();

                playBlock[drawRow][drawCol] = `${player}`;

                winCheck(drawRow, drawCol);
            }
        }
    }
}

// 플레이어 변경
function changePlayer() {
    if (player === "black") {
        player = "white";
    } else {
        player = "black";
    }

    playerInfo.style.backgroundColor = player;
}

// 승리 조건 체크
// 가로, 세로, 대각선 (5칸씩)
function winCheck(drawRow, drawCol) {
    const checkType = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
    ];

    checkType.forEach(([x, y]) => {
        let count = 1;

        for (let i = 1; i <= 4; i++) {
            const moveX = drawRow - x * i;
            const moveY = drawCol - y * i;

            if (
                moveX < 0 ||
                moveX >= playBlock.length ||
                moveY < 0 ||
                moveY >= playBlock[drawRow].length
            )
                break;

            if (playBlock[moveX][moveY] === player) {
                count++;
                console.log(`${player}`, count);
            } else {
                break;
            }
        }

        for (let i = 1; i <= 4; i++) {
            const moveX = drawRow + x * i;
            const moveY = drawCol + y * i;

            if (
                moveX < 0 ||
                moveX >= playBlock.length ||
                moveY < 0 ||
                moveY >= playBlock[drawRow].length
            )
                break;

            if (playBlock[moveX][moveY] === player) {
                count++;
                console.log(`${player}`, count);
            } else {
                break;
            }
        }

        if (count === 5) {
            console.log(`${player} 승리`);
            canvas.removeEventListener("click", drawOmok);
            return;
        }
    });

    changePlayer();
}

gameSetting();
