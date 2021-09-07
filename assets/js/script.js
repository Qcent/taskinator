let buttonEl = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let formEl = document.querySelector("#task-form");

const createTaskHandler = function(event) {
    event.preventDefault();
    let taskItemEl = document.createElement("li");
    taskItemEl.className = "task-item";
    taskItemEl.textContent = "newTask";
    tasksToDoEl.appendChild(taskItemEl);

}

// buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", createTaskHandler);