let tasksToDoEl = document.querySelector("#tasks-to-do");
let formEl = document.querySelector("#task-form");


const taskFormHandler = function(event) {
    event.preventDefault(); // stop page refresh on submit

    // get the name and type of task to bbe added from the user submitted form
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    /** Validate inputs  */
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false; // kill the rest of code exicution if invalid input detected
    }
    /** if valid continue */

    formEl.reset(); //reset the form values
    // package as an object with properties {name, type} to be sent to createTaskEl()
    createTaskEl({
        name: taskNameInput,
        type: taskTypeInput
    });
}

const createTaskEl = function(task) {
    let taskItemEl = document.createElement("li"); //create a new task item
    taskItemEl.className = "task-item"; //give it a class name

    let taskInfoEl = document.createElement("div"); //create a taks info container
    taskInfoEl.className = "task-info"; // set its class property
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + task.name + // task name
        "</h3><span class='task-type'>" + task.type + "</span>"; // & type

    taskItemEl.appendChild(taskInfoEl); // append the info to the item

    tasksToDoEl.appendChild(taskItemEl); // append the item to the task list
}

// buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", taskFormHandler);