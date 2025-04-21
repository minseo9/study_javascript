const startButton = document.getElementById("startButton");
if (startButton) {
    startButton.addEventListener("click", () => {
        location.replace("quiz.html");
    });
}

const restartButton = document.getElementById("restartButton");
if (restartButton) {
    const resultView = document.getElementsByClassName("result")[0];
    const answerCount = sessionStorage.getItem("answerCount");
    const quizCount = sessionStorage.getItem("quizCount");
    resultView.innerText = `${answerCount} / ${quizCount}`;

    restartButton.addEventListener("click", () => {
        location.replace("index.html");
    });
}
