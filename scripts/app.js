// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const modalTrigger = document.querySelector('.modal-trigger');
const checked = $('#priCheck').is(':checked');
//const sortNameBtn = document.getElementById('sortBtn');
// const draggable_list = document.getElementById('draggable-list')



// Get date

let d = new Date();
let y = d.toLocaleDateString('en-US');
var today = document.getElementById('tDate').innerText = y;


//Get time
myTimer();
var timeVar = setInterval(myTimer, 1000);

function myTimer() {
let d = new Date();
let t = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
var tTime = document.getElementById('tTime').innerText = t;
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

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
        
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));        
    }
    tasks.sort(function(a,b) {
        var taskA = a.toUpperCase();
        var taskB = b.toUpperCase();
        if( taskA < taskB) 
            return 1;
        if( taskA > taskB) 
            return -1;
    });
    tasks.forEach(function(task){
        
        // create li element
        const div = document.createElement('div');
        // add class to it
        if(task.includes("!")){ 
            div.className = 'collection-item slideIn hoverable taskItem isChecked';
            task = task.replace('!', ''); 
        } else {
            div.className = 'collection-item slideIn hoverable taskItem isNotChecked';
        }

        if(!task.includes('https://')){
            var taskItemText = document.createElement('span');
            taskItemText.className = 'taskContext context';
            taskItemText.innerText = task;
        } else {
            var taskItemText = document.createElement('a');
            taskItemText.className = 'taskContext context task-link';
            taskItemText.setAttribute('href', task);
            taskItemText.setAttribute('target', '_blank');
            taskItemText.setAttribute('rel', 'noopener');
            taskItemText.innerText = task;
        }
 
      
        div.appendChild(taskItemText);
  
        //create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="material-icons">check_circle</i>';
        // append the link to li
        div.appendChild(link);
        // append li to ul
        // let checkedList = document.querySelectorAll('li.isChecked');
        let notCheckedList = document.querySelectorAll('div.isNotChecked');
        if (div.classList.contains('isChecked')){
            taskList.insertBefore(div, taskList.childNodes[0]);
        } else {
                taskList.insertBefore(div, notCheckedList[0]);
        }  
    })        
}


// Add task function

function addTask(e){
    if(taskInput.value !== ''){
        // create li element
        const div = document.createElement('div');
        
        // add class to it
        var checked = $('#priCheck').is(':checked');
        if(checked){ 
            div.className = 'collection-item slideIn hoverable taskItem isChecked'; 
        } else {
            div.className = 'collection-item slideIn hoverable taskItem isNotChecked';
        }

        //create span or link for task
      
        if(!taskInput.value.includes('https://')){
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

        div.appendChild(taskItemText);
        //create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="material-icons">check_circle</i>';
        // append the link to li
        div.appendChild(link);

        // append li to ul
        
        let checkedList = document.querySelectorAll('div.isChecked');
        let notCheckedList = document.querySelectorAll('div.isNotChecked');
        
        if (div.classList.contains('isChecked')){
            taskList.insertBefore(div, taskList.childNodes[0]);
        } else {	
            taskList.insertBefore(div, notCheckedList[0]);	
        }
     
            
        // store in local storage
        
        if (checked == true){
            var f = taskInput.value +"!";    
        } else {
            f = taskInput.value;
        }

    
        var x = storeTaskInLocalStorage(f);
        
        // clear input
        taskInput.value = '';
    }

    e.preventDefault();

    
    $('#priCheck').prop('checked', false);
      
}


// Store in local storage

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];    
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}
// Remove task function

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
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

function removeTaskFromLocalStorage(taskItem){
    
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];    
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
 
    var taskPriCheck = taskItem.firstChild.textContent + "!";
    tasks.forEach(function(task, index){
        if(taskItem.firstChild.textContent === task) {
            tasks.splice(index, 1);
        } 
        else if (taskPriCheck === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}

// Init modal

document.addEventListener('DOMContentLoaded', function() {
    $(document).ready(function(){
        $('.modal').modal();
    });
})

//Open clear task modal

function openModal(e){
    //var instance = M.Modal.getInstance(elem);
    //this.open();   
    e.preventDefault();  
}

// Clear tasks function

function clearTasks(e){
 
    // Method A
    // taskList.innerHTML = '';

    // Method B - faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // while there is still a first child (there is still something in the list) then remove it
    // } else {
    //     return false;
    // }

    localStorage.clear();
}
// Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item .context').forEach(function(task){
        const item = task.textContent.trim();
        //if no match, it equals -1
        if(item.toLowerCase().indexOf(text) != -1){
            task.parentElement.style.display = 'block';
        } else {
            task.parentElement.style.display = 'none';
        }      
    });

        function markFunction(){
            $(".context").mark(text);
                 
        // unmark
            $(".context").unmark({
                done: function(){
                    $(".context").mark(text);
                }
            })
        }
        markFunction();
}
        
// Init pushpin

$(document).ready(function(){
    $('.pushpin').pushpin();
  });
        
