const quiz = [
    {
        question: "문제1",
        no01: "정답1-1",
        no02: "정답1-2",
        no03: "정답1-3",
        no04: "정답1-4",
        answer: "no01",
    },
    {
        question: "문제2",
        no01: "정답2-1",
        no02: "정답2-2",
        no03: "정답2-3",
        no04: "정답2-4",
        answer: "no02",
    },
    {
        question: "문제3",
        no01: "정답3-1",
        no02: "정답3-2",
        no03: "정답3-3",
        no04: "정답3-4",
        answer: "no03",
    },
    {
        question: "문제4",
        no01: "정답4-1",
        no02: "정답4-2",
        no03: "정답4-3",
        no04: "정답4-4",
        answer: "no04",
    },
];

const timeBar = document.getElementById("time");
const question = document.getElementsByClassName("question")[0];
const answerNo01 = document.querySelector(`label[for="no01"]`);
const answerNo02 = document.querySelector(`label[for="no02"]`);
const answerNo03 = document.querySelector(`label[for="no03"]`);
const answerNo04 = document.querySelector(`label[for="no04"]`);
const nextButton = document.getElementById("nextButton");

let stage = 0;
let answerCount = 0;
let quizCount = quiz.length;
let timer;

const renderQuiz = () => {
    question.innerText = quiz[stage].question;
    answerNo01.innerText = quiz[stage].no01;
    answerNo02.innerText = quiz[stage].no02;
    answerNo03.innerText = quiz[stage].no03;
    answerNo04.innerText = quiz[stage].no04;
};

const quizTime = () => {
    let time = 10;
    let timeBarWidth = 420;
    timeBar.style.transition = "none";
    timeBar.style.width = timeBarWidth + "px";

    timer = setInterval(() => {
        time--;
        timeBar.style.transition = "width 1s linear";
        timeBarWidth -= timeBarWidth / time;
        timeBar.style.width = timeBarWidth + "px";

        if (time <= 0) {
            nextQuiz();
        }
    }, 1000);
};

const nextQuiz = () => {
    clearInterval(timer);

    const checkButton = document.querySelector(`input[name=answer]:checked`);
    if (checkButton && quiz[stage].answer === checkButton.id) {
        answerCount++;
    }

    if (stage === quiz.length - 1) {
        sessionStorage.setItem("answerCount", answerCount);
        sessionStorage.setItem("quizCount", quizCount);
        location.replace("result.html");
    } else {
        stage++;
        if (checkButton) {
            checkButton.checked = false;
        }
        renderQuiz();
        quizTime();
    }
};

renderQuiz();
quizTime();

nextButton.addEventListener("click", nextQuiz);
