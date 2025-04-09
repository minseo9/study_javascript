const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addTodoList);

const todoList = document.getElementById("todoList");
const finishTodoList = document.getElementById("finishTodoList");

// 버튼 만들기
function createButton(text, buttonName, functionName) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.classList.add(buttonName);
    btn.addEventListener("click", functionName);

    return btn;
}

function CheckTodoListNode() {
    if (!todoList.hasChildNodes()) {
        finishTodoList.style.cssText = "margin-top: 0px";
    } else {
        finishTodoList.style.cssText = "margin-top:-15px";
    }
}

// 할일 추가
function addTodoList() {
    const todo = document.getElementById("todo");

    if (todo.value) {
        const addList = document.createElement("p");

        const listCheck = document.createElement("input");
        listCheck.type = "checkbox";
        listCheck.classList.add("listCheck");
        listCheck.addEventListener("click", checkTodoList);

        const todoText = document.createElement("span");
        todoText.innerText = todo.value;

        const editBtn = createButton("수정", "editBtn", editTodoList);
        const deleteBtn = createButton("삭제", "deleteBtn", deleteTodoList);

        addList.appendChild(listCheck);
        addList.appendChild(todoText);
        addList.appendChild(editBtn);
        addList.appendChild(deleteBtn);
        todoList.appendChild(addList);

        CheckTodoListNode();

        todo.value = "";
    }
}

// 할일 완료
function checkTodoList(event) {
    const checkList = event.target.parentElement;
    const checkedBox = checkList.getElementsByClassName("listCheck")[0];

    if (checkedBox.checked) {
        checkList.style.cssText = "text-decoration: line-through";
        finishTodoList.appendChild(checkList);
    } else {
        checkList.style.cssText = "text-decoration: none";
        todoList.appendChild(checkList);
    }

    CheckTodoListNode();
}

// 할일 수정
function editTodoList(event) {
    const clickList = event.target.parentElement;
    const currentText = clickList.querySelector("span").innerText;
    const editList = document.createElement("p");
    let checkboxState =
        clickList.getElementsByClassName("listCheck")[0].checked; // 체크박스 체크 여부

    clickList.innerHTML = "";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;
    editInput.classList.add("editInput");

    const okBtn = document.createElement("button");
    okBtn.innerText = "확인";
    okBtn.classList.add("okBtn");
    okBtn.addEventListener("click", () => {
        clickList.innerHTML = "";

        const listCheck = document.createElement("input");
        listCheck.type = "checkbox";
        listCheck.classList.add("listCheck");
        listCheck.addEventListener("click", checkTodoList);
        if (checkboxState) {
            listCheck.checked = true;
        }

        const updateInput = editInput.value;
        const updateText = document.createElement("span");
        updateText.innerText = updateInput;

        const editBtn = createButton("수정", "editBtn", editTodoList);
        const deleteBtn = createButton("삭제", "deleteBtn", deleteTodoList);

        clickList.appendChild(listCheck);
        clickList.appendChild(updateText);
        clickList.appendChild(editBtn);
        clickList.appendChild(deleteBtn);
    });

    clickList.appendChild(editInput);
    clickList.appendChild(okBtn);
}

// 할일 삭제
function deleteTodoList(event) {
    event.target.parentElement.remove();
}
