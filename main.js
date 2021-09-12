const inputText = document.querySelector('.text-input');
const addButton = document.querySelector('.add-input');
const allContainer = document.querySelector('.all-container');
const removeCompleted = document.querySelector('.remove-completed');

addButton.addEventListener('click', addTodo);

allContainer.addEventListener('click', (e) => {
    switch (e.target.classList[0]) {
        case "completed-button":
            completeTodo(e.target.parentElement);
            break;

        case "delete-button":
            deleteTodo(e.target.parentElement);
            break;

    }
});

removeCompleted.addEventListener('click', e => {
    e.preventDefault();
    // console.log(allContainer.children);
    [...allContainer.children].forEach(element => {
        if (element.classList.contains('completed')) {
            deleteTodo(element);
        }
    })
});

window.addEventListener('load', loadTodos());

function addTodo(e) {
    e.preventDefault();
    let todo = generateTodo(inputText.value);
    allContainer.appendChild(todo);
    updateLocalTodos();
    inputText.value = "";
}

function generateTodo(input) {
    if (input.trim() === "") return null;
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo-item');
    const text = document.createElement("div");
    text.classList.add('todo-text');
    text.innerText = input;
    todoDiv.appendChild(text);
    const completedButton = document.createElement("div");
    completedButton.classList.add('completed-button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);
    const deleteButton = document.createElement("div");
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);
    return todoDiv;
}

function completeTodo(todo) {
    if (todo.classList.contains('completed')) {
        todo.classList.remove('completed');
    } else {
        todo.classList.add('completed');
    }
    updateLocalTodos();
}

function deleteTodo(todo) {
    todo.classList.add('deleted');
    todo.addEventListener('transitionend', () => {
        todo.remove();
        updateLocalTodos();
    });

}

function updateLocalTodos() {
    localStorage.setItem('todos(2)', allContainer.innerHTML);
}


function loadTodos() {
    var localTodos = localStorage.getItem('todos(2)');
    allContainer.innerHTML = localTodos;
}