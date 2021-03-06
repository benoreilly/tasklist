// "use strict";

// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// const taskInput = document.querySelector('#textarea');
const modalTrigger = document.querySelector('.modal-trigger');
const wisdomChecked = $('#wisdomCheck').is(':checked');

const userName = "Benjamin";


// Greeting

let insertuserName = document.querySelector('.user-name').innerText = userName;
let dashGreeting = document.querySelector('.time-greeting');
// Get date

let d = new Date();
let currentHour = d.getHours();
let y = d.toLocaleDateString('en-US');
var today = document.getElementById('tDate').innerText = y;



if (currentHour < 12) {
    dashGreeting.innerText = "Good Morning, "
} else if (currentHour < 18) {
    dashGreeting.innerText = "Good Afternoon, "
} else {
    dashGreeting.innerText = "Good Evening, "
}


//Get time
myTimer();
var timeVar = setInterval(myTimer, 1000);

function myTimer() {
    let d = new Date();
    let t = d.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    var tTime = document.getElementById('tTime');
    tTime.innerText = t;
}


// Load event listeners

loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //open modal
    modalTrigger.addEventListener('click', openModal);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter
    filter.addEventListener('keyup', filterTasks);

}

// Get Tasks from LS

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.sort(function (a, b) {
        var taskA = a.toUpperCase();
        var taskB = b.toUpperCase();
        if (taskA < taskB)
            return 1;
        if (taskA > taskB)
            return -1;
    });
    tasks.forEach(function (task) {

        // create li element
        const li = document.createElement('li');
        var wisdomChecked = $('#wisdomCheck').is(':checked');
        // add class to it
        if (task.includes("key=!!")) {
            li.className = 'collection-item slideIn hoverable taskItem isChecked';
            task = task.replace('key=!!', '');
        } else if (task.includes("key=!$")) {
            li.className = 'collection-item slideIn hoverable taskItem isChecked wisdom_check';
            task = task.replace('key=!$', '');
        } else {
            li.className = 'collection-item slideIn hoverable taskItem isNotChecked';
        }

        let splitDate = task.split('taskSubmitDate=');


        if (!task.includes('https://')) {
            var taskItemText = document.createElement('span');
            taskItemText.className = 'taskContext context';
            taskItemText.innerText = splitDate[0];
        } else {
            var taskItemText = document.createElement('a');
            taskItemText.className = 'taskContext context task-link';
            taskItemText.setAttribute('target', '_blank');
            taskItemText.setAttribute('rel', 'noopener');
            taskItemText.innerText = splitDate[0];
            taskItemText.setAttribute('href', splitDate[0]);
        }

        li.appendChild(taskItemText);

        //create task timestamp
        const taskTimeTag = document.createElement('span');
        taskTimeTag.id = "task-timestamp";
        taskTimeTag.innerText = splitDate[1];
        li.appendChild(taskTimeTag);

        //create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons">check_circle</i>';
        li.appendChild(link);

        // let notCheckedList = document.querySelectorAll('li.isNotChecked');
        // // if (wisdomChecked){
        // //     listTwo.appendChild(li);
        // // }
        // if (li.classList.contains('isChecked')) {
        //     taskList.insertBefore(li, taskList.childNodes[0]);
        // } 
        // else if (li.classList.contains('isNotChecked')) {
        //     taskList.insertBefore(li, notCheckedList[0]);
        // }

        taskList.insertBefore(li, taskList.childNodes[0]);
    })

    var taskLink = document.getElementsByClassName('task-link');
    if (taskLink) {
        tasks.forEach(function (task){
            var taskURL = task.innerText;
            $('a.task-link').click(function() {
                window.open(taskURL);
                return false;
            })
        });
    }
}


// Add task function
function addTask(e) {
    if (taskInput.value !== '') {
        // create li element
        const li = document.createElement('li');
        // add class to it
        var checked = $('#priCheck').is(':checked');
        var wisdomChecked = $('#wisdomCheck').is(':checked');
        if (checked) {
            li.className = 'collection-item slideIn hoverable taskItem isChecked';
        } else if (wisdomChecked) {
            li.className = 'collection-item slideIn hoverable taskItem isChecked wisdom_check';
        } else {
            li.className = 'collection-item slideIn hoverable taskItem isNotChecked';
        }

        //create span or link for task
        if (!taskInput.value.includes('https://')) {
            var taskItemText = document.createElement('span');
            taskItemText.className = 'taskContext context';
            taskItemText.innerText = taskInput.value;
        } else {
            var taskItemText = document.createElement('a');
            taskItemText.className = 'taskContext context task-link';
            taskItemText.setAttribute('href', taskInput.value);
            taskItemText.setAttribute('target', '_blank');
            taskItemText.setAttribute('rel', 'noopener');
            taskItemText.innerText = taskInput.value;
        }

        li.appendChild(taskItemText);

        //create task timestamp
        const taskTimeTag = document.createElement('span');
        //add id
        taskTimeTag.id = "task-timestamp";
        //append timestamp span 
        li.appendChild(taskTimeTag);

    
        //create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="material-icons" id="delete-target">check_circle</i>';
        // append the link to li
        li.appendChild(link);

        // append li to ul
        // var notCheckedList = document.querySelectorAll('li.isNotChecked');

        // if (li.classList.contains('isChecked')) {
            
        //     taskList.insertBefore(li, taskList.childNodes[0]);
        // } 
        // else if (li.classList.contains('isNotChecked')) {
            
        //     taskList.insertBefore(li, notCheckedList[0]);
        // }

        taskList.insertBefore(li, taskList.childNodes[0]);
        

        let taskDate = new Date();
        let taskDateStamp = taskDate.toLocaleDateString('en-US');
        let taskTimeStamp = document.getElementById('task-timestamp');
        taskTimeStamp.innerText = taskDateStamp;


        if (checked == true) {
            var taskValue = taskInput.value + "key=!!" + " " + "taskSubmitDate=" + taskDateStamp;
        } else if (wisdomChecked == true) {
            taskValue = taskInput.value + "key=!$" + " " + "taskSubmitDate=" + taskDateStamp;
        } else {
            taskValue = taskInput.value + " " + "taskSubmitDate=" + taskDateStamp;
        }
        var taskValueStorage;
        taskValueStorage = storeTaskInLocalStorage(taskValue);

        // clear input
        taskInput.value = '';
    }

    e.preventDefault();

    $('#priCheck').prop('checked', false);
    $('#wisdomCheck').prop('checked', false);

}


// Store in local storage

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}
// Remove task function

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.classList.toggle('slideOut');
        setTimeout(() => {
            e.target.parentElement.parentElement.remove();
        }, 500);
    }

    // remove from local storage

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    e.preventDefault();
}

// Remove from local storage function

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        
        var dateSplitter = task.split('taskSubmitDate=');
        var taskAddDate;
        taskAddDate = taskItem.firstChild.innerText == undefined ? '' : taskItem.firstChild.innerText.trim() + " " + 'taskSubmitDate=' + dateSplitter[1];
        
        var taskPriCheck = taskItem.firstChild.innerText == undefined ? '' : taskItem.firstChild.innerText.trim() + "key=!!" + " " +  'taskSubmitDate=' + dateSplitter[1];
       
        var taskWisCheck = taskItem.firstChild.innerText == undefined ? '' : taskItem.firstChild.innerText.trim() + "key=!$" + " " + 'taskSubmitDate=' + dateSplitter[1];
      
        if (taskAddDate === task) {
            tasks.splice(index, 1);
        } else if (taskPriCheck === task) {
            tasks.splice(index, 1);
        } else if (taskWisCheck === task) {
            tasks.splice(index, 1);
        } 
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Init modal

document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        $('.modal').modal();
    });
})

//Open clear task modal

function openModal(e) {
    e.preventDefault();
}

// Clear tasks function

function clearTasks(e) {

    // Method A
    // taskList.innerHTML = '';

    // Method B - faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // while there is still a first child (there is still something in the list) then remove it
    // } else {
    //     return false;
    // }

    localStorage.clear();
}
// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item .context').forEach(function (task) {
        const item = task.textContent.trim();
        //if no match, it equals -1
        if (item.toLowerCase().indexOf(text) != -1) {
            task.parentElement.style.display = 'block';
        } else {
            task.parentElement.style.display = 'none';
        }
    });

    function markFunction() {
        $(".context").mark(text);

        // unmark
        $(".context").unmark({
            done: function () {
                $(".context").mark(text);
            }
        })
    }
    markFunction();
}




$(document).ready(function () {
    $('.barlow-chev').click(function() {
        $('.barlow').slideToggle(300, "linear");
        $('img.barlow-chev').toggleClass('chev-up');
        $('#output-card').toggleClass('l12');
         event.stopPropagation;
    });
});


//CORS

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});