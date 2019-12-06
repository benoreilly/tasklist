// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load event listeners

loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
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
        li.className = 'collection-item slideIn taskItem';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-check-circle"></i>';
        // append the link to li
        li.appendChild(link);

        // append li to ul

        taskList.appendChild(li);
        
        });
}

// Add task function

function addTask(e){
    if(taskInput.value !== ''){
        // create li element
        const li = document.createElement('li');
        // add class to it
        li.className = 'collection-item slideIn taskItem';
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-check-circle"></i>';
        // append the link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
        // store in local storage
        storeTaskInLocalStorage(taskInput.value);
        // clear input
        taskInput.value = '';
    }
    e.preventDefault();
      
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
    e.target.parentElement.parentElement.classList.remove('slideIn');
    e.target.parentElement.parentElement.classList.add('slideOut');
    setTimeout(() => {
        if(e.target.parentElement.classList.contains('delete-item')){
            e.target.parentElement.parentElement.remove();
        }
    }, 1000);  
    
    // remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    console.log(e.target);

    e.preventDefault();
}


// Remove from local storage function

function removeTaskFromLocalStorage(foofoo){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];    
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(foofoo.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    

}


// Clear tasks function

function clearTasks(e){
    var confirmClear = confirm('Are you sure you want to clear out all of your tasks?');
    if (confirmClear == true){
    // Method A
    // taskList.innerHTML = '';

    // Method B - faster
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    // while there is still a first child (there is still something in the list) then remove it
    } else {
        return false;
    }
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

// function listSorter() {
//     var sortList = document.querySelectorAll('li.collection-item');
//     console.log(sortList);
//     var arrayList = Array.from(sortList);
//    // console.log(arrayList);

    
//     for(i = 0; i < sortList.length; i++){
//         //sortList.item(i).style.backgroundColor = "#26a69a";
//         sortList.item(i).style.opacity = "0.9";
//     }
// };
