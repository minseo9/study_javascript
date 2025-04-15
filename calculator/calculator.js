let record = [];
let result = null;

const inputView = document.getElementsByClassName("input")[0];

const buttonView = document.getElementsByClassName("buttonView")[0];
buttonView.addEventListener("click", (event) => {
    let clickButton = event.target;

    if (clickButton.classList.contains("operation")) {
        clickOperation(clickButton);
    } else if (clickButton.classList.contains("number")) {
        clickNumber(clickButton);
    } else if (clickButton.classList.contains("del")) {
        clickDelete(clickButton);
    } else if (clickButton.classList.contains("result")) {
        if (record.length >= 3) {
            clickResult(clickButton);
        }
    }

    if (record.length !== 0 || result === null) {
        inputView.innerText = record.join(" ");
    }
});

// 연산자 버튼 클릭
const clickOperation = (operation) => {
    operation = operation.textContent;

    if (typeof record[record.length - 1] === "number") {
        record.push(operation);
    } else if (record.length >= 1) {
        record[record.length - 1] = operation;
    } else if (result !== null) {
        record.push(result);
        record.push(operation);
    }
};

// 숫자 버튼 클릭
const clickNumber = (number) => {
    number = number.textContent;

    if (typeof record[record.length - 1] === "string") {
        record.push(Number(number));
    } else {
        if (record.length === 0) {
            if (result !== null) {
                result = null;
            }
            record.push(Number(number));
        } else {
            record[record.length - 1] = Number(
                record[record.length - 1].toString() + number
            );
        }
    }
};

// 삭제 버튼 클릭
const clickDelete = (del) => {
    del = del.textContent;

    if (del === "del") {
        if (typeof record[record.length - 1] === "number") {
            deleteNumber = record[record.length - 1].toString();
            deleteNumber = deleteNumber.slice(0, -1);

            if (deleteNumber === "") {
                record.pop();
            } else {
                record[record.length - 1] = Number(deleteNumber);
            }
        } else {
            record.splice(record.length - 1, 1);
        }
    } else if (del === "C") {
        record = [];
    }

    result = null;
};

// 계산 버튼 클릭
const clickResult = () => {
    let operation = null;

    record.forEach((r) => {
        if (typeof r === "number") {
            if (result === null) {
                result = r;
            } else if (operation !== null) {
                switch (operation) {
                    case "+":
                        result += r;
                        break;
                    case "-":
                        result -= r;
                        break;
                    case "x":
                        result *= r;
                        break;
                    case "÷":
                        result /= r;
                        break;
                }
                operation = null;
            }
        } else if (typeof r === "string") {
            operation = r;
        }
    });

    record = [];
    inputView.innerText = result;
};
