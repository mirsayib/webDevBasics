// Define uI Vars
const form      = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-tasks');
const filter    = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear List
    clearBtn.addEventListener('click', clearTasks);

    //Filter Task Events
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        // Append the link to the li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

    });
}

// Add Task
function addTask(e){

    if(taskInput.value === ''){
        alert('Add a Task');
    } else {
        // Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));
        //Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        // Append the link to the li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

        // Store in LS
        storeTaskInLocalStorage(taskInput.value);

        // Clear input
        taskInput.value = '';
    }



    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskfromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//remove from LS
function removeTaskfromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Clear List
function clearTasks(e){
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear LS
    clearTasksFromLocalStorage();
}

// clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
    
}