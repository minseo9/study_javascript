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
let count = 0;
function winCheck(drawRow, drawCol) {
    // 가로
    for (let i = drawCol - 4; i <= drawCol + 4; i++) {
        if (i < 0 || i >= playBlock[drawRow].length) continue;

        if (playBlock[drawRow][i] === player) {
            count++;

            if (count === 5) {
                console.log(`${player} 승리`);
                canvas.removeEventListener("click", drawOmok);
                break;
            }
        } else {
            count = 0;
        }
    }

    // 세로
    for (let i = drawRow - 4; i <= drawRow + 4; i++) {
        if (i < 0 || i >= playBlock[drawRow].length) continue;
        if (playBlock[i][drawCol] === player) {
            count++;

            if (count === 5) {
                console.log(`${player} 승리`);
                canvas.removeEventListener("click", drawOmok);
                break;
            }
        } else {
            count = 0;
        }
    }

    // 대각선
    let leftCheck = drawCol - 4;
    for (let i = drawRow - 4; i <= drawRow + 4; i++) {
        if (i < 0 || i >= playBlock[drawRow].length) continue;
        if (playBlock[i][leftCheck] === player) {
            count++;
            leftCheck++;

            if (count === 5) {
                console.log(`${player} 승리`);
                canvas.removeEventListener("click", drawOmok);
                break;
            }
        } else {
            count = 0;
        }
    }

    let rightCheck = drawCol + 4;
    for (let i = drawRow - 4; i <= drawRow + 4; i++) {
        if (i < 0 || i >= playBlock[drawRow].length) continue;
        if (playBlock[i][rightCheck] === player) {
            count++;
            rightCheck--;

            if (count === 5) {
                console.log(`${player} 승리`);
                canvas.removeEventListener("click", drawOmok);
                break;
            }
        } else {
            count = 0;
        }
    }

    changePlayer();
}

gameSetting();
