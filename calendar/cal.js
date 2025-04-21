const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

drawCalender();

// 이전 버튼 선택
const prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", () => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    drawCalender();
});

// 다음 버튼 선택
const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", () => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    drawCalender();
});

// 달력 출력
function drawCalender() {
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;

    let prevLastDate = new Date(year, month, 0); // 이전달 마지막 날짜
    let currLastDate = new Date(year, month + 1, 0); // 지금달 마지막 날짜

    const monthTitle = document.getElementById("monthTitle");
    monthTitle.innerText = `${year}년 ${month + 1}월`; // 제목 출력

    const viewDate = document.getElementsByClassName("date")[0];
    viewDate.innerHTML = "";

    // 지난달 날짜 출력
    let prevStartDate = prevLastDate.getDate() - prevLastDate.getDay();
    for (let i = prevStartDate; i <= prevLastDate.getDate(); i++) {
        viewDate.innerHTML += `<div class="prevDate"><span>${i}</span></div>`;
    }

    // 이번달 날짜 출력
    for (let i = 1; i <= currLastDate.getDate(); i++) {
        if (
            year === currentYear &&
            month + 1 === currentMonth &&
            i === date.getDate()
        ) {
            viewDate.innerHTML += `<div class="currDate"><span id="today">${i}</span></div>`;
        } else {
            viewDate.innerHTML += `<div class="currDate"><span>${i}</span></div>`;
        }
    }

    // 다음달 날짜 출력
    let currLastDay = currLastDate.getDay();
    for (let i = 1; currLastDay !== 6; i++) {
        viewDate.innerHTML += `<div class="nextDate"><span>${i}</span></div>`;
        currLastDay++;
    }

    const allDates = viewDate.querySelectorAll("div");
    allDates.forEach((div) => {
        div.addEventListener("click", () => {
            const selected = viewDate.querySelector(".selectDate");
            if (selected) {
                selected.classList.remove("selectDate");

                if (selected.id === "today") {
                    selected.style.backgroundColor = "#e98989";
                }
            }
            div.querySelector("span").classList.add("selectDate");

            const span = div.querySelector("span");
            if (span.id === "today") {
                span.style.backgroundColor = "#e9d789";
            }
        });
    });
}
