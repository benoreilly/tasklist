// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const modalTrigger = document.querySelector('.modal-trigger');
const checked = $('#priCheck').is(':checked');



// Get date

const d = new Date();
let y = d.toLocaleDateString('en-US');
var today = document.getElementById('tDate').innerText = y;




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

    tasks.forEach(function(task){
        // create li element
        const li = document.createElement('li');
        // add class to it
        if(task.includes("!")){ 
            li.className = 'collection-item slideIn taskItem isChecked';
            const hpIcon = document.createElement('span');
            hpIcon.className = 'hp-Icon';
            hpIcon.innerHTML = '<i class="tiny material-icons">priority_high</i>';
            li.appendChild(hpIcon);
            task = task.replace('!', ''); 
        } else {
            li.className = 'collection-item slideIn taskItem';
        }
        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        //create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="material-icons">check_circle</i>';
        // append the link to li
        li.appendChild(link);

        // append li to ul
        
        taskList.insertBefore(li, taskList.childNodes[0]);

        });
        
}

// Add task function

function addTask(e){
    if(taskInput.value !== ''){
        // create li element
        const li = document.createElement('li');
        // add class to it
        var checked = $('#priCheck').is(':checked');
        if(checked){ 
            li.className = 'collection-item slideIn taskItem isChecked';
            li.style.fontWeight = '500';  
        } else {
            li.className = 'collection-item slideIn taskItem';
        }
        if (checked){
            const hpIcon = document.createElement('span');
            hpIcon.className = 'hp-Icon';
            hpIcon.innerHTML = '<i class="tiny material-icons">priority_high</i>';
            li.appendChild(hpIcon);
        }
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="material-icons">check_circle</i>';
        // append the link to li
        li.appendChild(link);
        // append li to ul
        taskList.insertBefore(li, taskList.childNodes[0]);
        // store in local storage
        
        if (checked == true){
            var f = taskInput.value + " " + "!";    
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
 
    var taskPriCheck = taskItem.firstChild.nextSibling.textContent + "!";
    tasks.forEach(function(task, index){
        if(taskItem.firstChild.textContent === task) {
            tasks.splice(index, 1);
        } else if (taskPriCheck === task){
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
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}