let pageContentEl = document.querySelector("#page-content");
let formEl = document.querySelector("#task-form");
let taskFormName = document.querySelector("input[name='task-name']");
let taskFormType = document.querySelector("select[name='task-type']");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");

let taskIdCounter = 0;
let taskMasterList = [];

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
    taskItemEl.appendChild(createTaskActions(taskIdCounter)); // append the Actions

    tasksToDoEl.appendChild(taskItemEl); // append the item to the task list
    addNewClass(taskItemEl);


    //add ID property to the task
    task.ID = taskIdCounter;
    //add task to Master list
    taskMasterList.push(task);

    //update localStorage
    saveTasks();

    taskIdCounter++; // increase for next id
}
const createTaskActions = function(taskId) {

    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create the dropdown
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    let statusChoices = ["To Do", "In Progress", "Completed"];

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

const deleteTask = function(taskId) {
    if (formEl.getAttribute("data-task-id") === taskId) {
        if (!confirm("You know you are editing this, right")) { return; } // double confirmation when deleting the task you are editing
        // reset all the editing form changes
        formEl.reset();
        formEl.removeAttribute("data-task-id");
        document.querySelector("#save-task").textContent = "Add Task";
    }

    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    // loop through tasks array and task object with new content
    for (let i = 0; i < taskMasterList.length; i++) {
        if (taskMasterList[i].ID === parseInt(taskId)) { // find the task that matches taskId
            taskMasterList.splice(i, 1); //remove that task index from the master list
        }
    };

    //update localStorage
    saveTasks();
};
const editTask = function(taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //change tasks css class to .edited-task
    taskSelected.classList.add('edited-task');

    // get content from task name and type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    let taskType = taskSelected.querySelector("span.task-type").textContent;
    // Update the form with the task name and type
    taskFormName.value = taskName;
    taskFormType.value = taskType;
    //set the id of the task to be edited
    formEl.setAttribute("data-task-id", taskId);
    //change button to say save task
    document.querySelector("#save-task").textContent = "Save Task";

};
const completeEditTask = function(name, type, taskId) {
    // find the matching task list item
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = name;
    taskSelected.querySelector("span.task-type").textContent = type;

    // loop through tasks array and finds task object with taskId / updates content
    for (let i = 0; i < taskMasterList.length; i++) {
        if (taskMasterList[i].ID === parseInt(taskId)) {
            taskMasterList[i].name = name;
            taskMasterList[i].type = type;
        }
    };

    //alert("Task Updated!");
    //change tasks css classes 
    taskSelected.classList.remove('edited-task');
    addNewClass(taskSelected); //function sets class and auto removes

    //reset the form task id and submit button
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    //update localStorage
    saveTasks();
}

const addNewClass = function(task) {
    task.classList.add('new-task');
    setTimeout(function() {
        task.classList.remove('new-task');
    }, 1000); //auto remove after 1s
}

const taskFormHandler = function(event) {
    event.preventDefault(); // stop page refresh on submit

    // get the name and type of task to bbe added from the user submitted form
    let taskNameInput = taskFormName.value;
    let taskTypeInput = taskFormType.value;

    /** Validate inputs  */
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false; // kill the rest of code exicution if invalid input detected
    }
    /** if valid continue */
    let isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        // package as an object with properties {name, type} to be sent to createTaskEl()
        var taskDataObj = {
            ID: '',
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        }
        createTaskEl(taskDataObj);
    }
    formEl.reset(); //reset the form values
}
const taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
        addNewClass(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
        addNewClass(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
        addNewClass(taskSelected);
    }
    // loop through tasks array and find task object with taskId
    for (let i = 0; i < taskMasterList.length; i++) {
        if (taskMasterList[i].ID === parseInt(taskId)) {
            taskMasterList[i].status = statusValue
        }
    };

    //update localStorage
    saveTasks();
};
const taskButtonHandler = function(event) {

    if (event.target.matches(".edit-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
    if (event.target.matches(".delete-btn")) {
        // get the element's task id
        if (!confirm("Are you sure you want to Delete?")) { return; }
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

const saveTasks = function() {
    localStorage.setItem("TaskList", JSON.stringify(taskMasterList));
}
const retreiveTasks = function() {
    taskMasterList = JSON.parse(localStorage.getItem('TaskList'));
}

pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);