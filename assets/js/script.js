let tasksToDoEl = document.querySelector("#tasks-to-do");
let formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");

let taskIdCounter = 0;

const createTaskActions = function(taskId) {

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create the dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (let i = 0; i < statusChoices.length; i++) {
        //create option element
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //apend to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var taskButtonHandler = function(event) {

    if (event.target.matches(".edit-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
    if (event.target.matches(".delete-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

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

    // add task id as a custom attribute
    taskItemEl.setAttribute("data-task-id", taskIdCounter);

    let taskInfoEl = document.createElement("div"); //create a taks info container
    taskInfoEl.className = "task-info"; // set its class property
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + task.name + // task name
        "</h3><span class='task-type'>" + task.type + "</span>"; // & type


    taskItemEl.appendChild(taskInfoEl); // append the info to the item

    tasksToDoEl.appendChild(taskItemEl); // append the item to the task list

    taskItemEl.appendChild(createTaskActions(taskIdCounter)); // append the Actions

    taskIdCounter++; // increase for next id
}

pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);