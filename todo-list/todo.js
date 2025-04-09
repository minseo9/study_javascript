const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addTodoList);

const addContainer = document.getElementById("todoList");

function createButton(text, buttonName, functionName) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.classList.add(buttonName);
    btn.addEventListener("click", functionName);

    return btn;
}

function addTodoList() {
    const todo = document.getElementById("todo");

    if (todo.value) {
        const addList = document.createElement("p");

        const listCheck = document.createElement("input");
        listCheck.type = "checkbox";
        listCheck.classList.add("listCheck");

        const todoText = document.createElement("span");
        todoText.innerText = todo.value;

        const editBtn = createButton("수정", "editBtn", editTodoList);
        const deleteBtn = createButton("삭제", "deleteBtn", deleteTodoList);

        addList.appendChild(listCheck);
        addList.appendChild(todoText);
        addList.appendChild(editBtn);
        addList.appendChild(deleteBtn);
        addContainer.appendChild(addList);

        todo.value = "";
    }
}

function editTodoList(event) {
    const clickList = event.target.parentElement;
    const currentText = clickList.querySelector("span").innerText;
    const editList = document.createElement("p");

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

function deleteTodoList(event) {
    event.target.parentElement.remove();
}
