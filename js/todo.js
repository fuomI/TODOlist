
// function taskInfo gives user useful information about tasks.
function taskInfo() {
    var allTasks = document.querySelectorAll('.listItems').length;
    var completedTasks = document.querySelectorAll('.completed').length;
    var activeTasks = allTasks - completedTasks;
    
    document.getElementById("activeInfo").innerHTML = "Active tasks: " + activeTasks;
    document.getElementById("completedInfo").innerHTML = "Completed tasks: " + completedTasks;
    document.getElementById("tasksInfo").innerHTML = "All tasks: " + allTasks;
}

// Adding event parameters to the functions that are called by eventlisteners, because then we can target the right element.

// Element, from which the function was called from, gets a class "completed".
function completeTask(event) {
    if(event.target.classList.contains("listItems") && !event.target.classList.contains("completed")) {
        event.target.classList.add("completed");
    } else {
        event.target.classList.remove("completed");
    }    
    
    // Update task statistics.
    taskInfo()    
}

// deleteTask(event) deletes the parentNode of an element which from the function was called.
function deleteTask(event) {
    if (event.target.classList.contains("deleteBox")) {
        event.target.parentNode.remove();

        // Delete from localStorage
        removeLocalTask(event.target.parentNode);
        // Update task statistics.
        taskInfo()
    }   
}

// createTask() function creates the task. 
function createTask() {

    // Declaring useful variables.
    var taskInput = document.getElementById("taskInput");
    var todoList = document.getElementById("todoList");

    // Creating li element.
    var newTask = document.createElement("li");
    var taskText = document.createTextNode(taskInput.value);

    // Save task to localStorage
    saveLocalTask(taskInput.value);
    
    // Adding the listItems class for the task and eventlistener for completing task and showing/hiding deleteBox.
    newTask.classList.add("listItems");
    newTask.addEventListener("click", function() {completeTask(event);});

    // Adding the input to the li-element and then adding the li-element to the TODO-list.
    newTask.appendChild(taskText);
    todoList.appendChild(newTask);

    // Adding deletebox to the added li item.
    var deleteBox = document.createElement("button");
    deleteBox.classList.add("deleteBox");
    deleteBox.setAttribute("type", "button");
    deleteBox.innerHTML = "Delete";
    deleteBox.addEventListener("click", function() {deleteTask(event);});
    newTask.appendChild(deleteBox);

    // Reset the inputfield.
    document.getElementById("taskInput").innerHTML = "";
    
    // Update task statistics.
    taskInfo()
}

// validateAndCreate function checks if the user input is valid, and if so, adds the task to the TODO-list.
function validateAndCreate() {

    var taskInput = document.getElementById("taskInput");
    var todoList = document.getElementById("todoList");

    if (taskInput.value == null || taskInput.value.length < 3) {
        taskInput.classList.add("error");
        alert("You must enter atleast three characters for a task to be valid.");
        return false;
    } else {
        taskInput.classList.remove("error");
        createTask();
        taskInput.value = "";
        return true;
    } 
}

// Save task to the localStorage.
function saveLocalTask(task) {
    let tasks;

    // If localStorage is empty, make new array.
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// function getTasks() creates tasks from localStorage.
function getTasks() {
    let tasks;

    // If localStorage is empty, make new array.
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {

    // Creating li element.
    var newTask = document.createElement("li");
    var taskText = document.createTextNode(task);

    // Adding the listItems class for the task and eventlistener for completing task and showing/hiding deleteBox.
    newTask.classList.add("listItems");
    newTask.addEventListener("click", function() {completeTask(event);});

    // Adding the input to the li-element and then adding the li-element to the TODO-list.
    newTask.appendChild(taskText);
    todoList.appendChild(newTask);

    // Adding deletebox to the added li item.
    var deleteBox = document.createElement("input");
    deleteBox.classList.add("deleteBox");
    deleteBox.setAttribute("type", "button");
    deleteBox.setAttribute("value", "Delete");
    deleteBox.addEventListener("click", function() {deleteTask(event);});
    newTask.appendChild(deleteBox);

    });
}

function removeLocalTask(task) {

    let tasks;

     // If localStorage is empty, make new array.
     if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    const taskIndex = task.innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// On page load function pageStart()
function pageStart() {
    getTasks();
    taskInfo();
}