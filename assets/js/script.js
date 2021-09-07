let buttonEl = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let formEl = document.querySelector("#task-form");


const createTaskHandler = function(event) {
    event.preventDefault(); // stop page refresh on submit

    // ge the name and type of task to bbe added from the user submitted form
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    let taskItemEl = document.createElement("li"); //create a new task item
    taskItemEl.className = "task-item"; //give it a class name

    let taskInfoEl = document.createElement("div"); //create a taks info container
    taskInfoEl.className = "task-info"; // set its class property

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + // task name
        "</h3><span class='task-type'>" + taskTypeInput + "</span>"; // & type

    taskItemEl.appendChild(taskInfoEl); // append the info to the item

    tasksToDoEl.appendChild(taskItemEl); // append the item to the task list
}

// buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", createTaskHandler);