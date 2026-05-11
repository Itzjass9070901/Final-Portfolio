// Step 1
// Dom Elements
const taskInput= document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList= document.getElementById('task-list');
const noTaskMessage = document.getElementById('no-tasks');
const clearAllButton = document.getElementById('clear-all');
const tasksCountElement= document.getElementById('tasks-count');
const completedCountElement= document.getElementById('completed-count');

// Step 2 Task data Array - tasks

let tasks=[]; // initital blank array with name tasks

// step 3 : add a new task 
function addTask(){
    const taskText = taskInput.value.trim();
// check if task is not empty
    if(taskText){
        // Create a new task object
        const newTask = {
            id: Date.now(),// generatews a unique id using timestamp
            text: taskText,
            completed:false,
            createdAt: new Date().toISOString()
    
        };
        // Add text to array

// tasks.push(taskText);
tasks.push(newTask);
console.log(tasks);    
    
    }
    saveTasks();

    // Clear input
    taskInput.value='';

    //Update ui
    renderTasks();
}

//step 4 save task in local storage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// step 5
function loadTasks(){
    // Try to get tasks from local Storage
    const savedTasks = localStorage.getItem('tasks');
    // if tasks exist in local storage, parse them into tasks array
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }

}

// Toggle Tasks completion
// find the task in array and apply for completion class
function toggleTaskCompletion(taskId){
    // find the task in the array
    for(let i =0; i<tasks.length ; i++){
        if (tasks[i].id === taskId){
            //Toggle the completed status
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }

    // Save updated task to local storage
    saveTasks();

    //update UI
    renderTasks();
}

// update tasks counts

function updateTaskCounts(){
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(function(task){
        return task.completed;
    }).length;
    tasksCountElement.textContent = `Total : ${totalTasks} tasks`;
    completedCountElement.textContent = `Completed : ${completedTasks}`;    
}

// Step 6: render task in UI
function renderTasks(){
    // Clear Current list
    taskList.innerHTML = '';

    // show/hide the "no tasks" message
    if(tasks.length === 0)
    {
        noTaskMessage.style.display = 'block';
    }else{
        noTaskMessage.style.display = 'none';

    }

    // Create task elements
    tasks.forEach(function(task){
        
        const li = document.createElement('li');
        li.className = 'task-item';
        taskList.appendChild(li);
        // create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function(){
            toggleTaskCompletion(task.id);
        });

        //Create task text span
        const span = document.createElement('span')
        span.className = task.completed ? 'task-text completed': 'task-text';
        span.textContent = task.text;
        // create delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent =  'Delete';
        deleteButton.addEventListener('click', function(){
            deleteTask(task.id);
        });

        // Add Elements to list items
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
    updateTaskCounts();

}
// delete a task
function deleteTask(taskId)
{
    // filter out the task for givenid
    tasks= tasks.filter(function(task){
        return task.id !== taskId;
    });

    // Save updated task to localStorage
    saveTasks();
    //Update Ui
    renderTasks();
}
//Clear all task
function clearAllTask(){
    //comfirm before clearing
    if(tasks.length >0)
    
    {
        const confirmed= confirm("Are you sure you want to delete all tasks?!");
        if(confirmed){
            tasks=[];
            saveTasks();
            renderTasks();
        }
    }
}

//Event listeners
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e){
// Add task when enter key is pressed 
if(e.key == 'Enter')
{
    addTask();
}
});

clearAllButton.addEventListener('click', clearAllTask)

//Initialize app
loadTasks();


