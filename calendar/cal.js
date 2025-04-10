drawCalender();

// 달력 출력
function drawCalender() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    let prevLastDate = new Date(year, month, 0); // 이전달 마지막 날짜
    let currLastDate = new Date(year, month + 1, 0); // 지금달 마지막 날짜

    const monthTitle = document.getElementById("monthTitle");
    monthTitle.innerText = `${year}년 ${month + 1}월`; // 제목 출력

    const viewDate = document.getElementsByClassName("date")[0];
    viewDate.innerHTML = "";

    // 지난달 날짜 출력
    prevStartDate = prevLastDate.getDate() - prevLastDate.getDay();
    for (let i = prevStartDate; i <= prevLastDate.getDate(); i++) {
        viewDate.innerHTML += `<div class="prevDate">${i}</div>`;
    }

    // 이번달 날짜 출력
    for (let i = 1; i <= currLastDate.getDate(); i++) {
        if (i === date.getDate()) {
            viewDate.innerHTML += `<div class="currDate"><span id="today">${i}<span></div>`;
        } else {
            viewDate.innerHTML += `<div class="currDate">${i}</div>`;
        }
    }

    // 다음달 날짜 출력
    let currLastDay = currLastDate.getDay();
    for (let i = 1; currLastDay !== 6; i++) {
        viewDate.innerHTML += `<div class="nextDate">${i}</div>`;
        currLastDay++;
    }
}
