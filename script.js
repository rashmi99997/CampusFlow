// 1. WHAT: Load tasks from localStorage, or use default tasks if nothing is saved yet
let tasks = JSON.parse(localStorage.getItem('tasks')) || [
    { id: 1, title: "Revise JavaScript arrays", priority: "High · Today", completed: false },
    { id: 2, title: "Complete DSA practice", priority: "Completed", completed: true }
];

// 2. WHAT: Select our HTML elements so JavaScript can interact with them
const taskContainer = document.querySelector('.task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingCountEl = document.getElementById('pending-count');
const completedCountEl = document.getElementById('completed-count');
const upcomingCountEl = document.getElementById('upcoming-count');

// 3. WHAT: The function that draws (renders) our tasks onto the webpage
function renderTasks() {
    // Save to localStorage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Clear out the container first so we don't get duplicates
    taskContainer.innerHTML = '';

    //2.Calculate stats
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const upcomingTasks = tasks.filter(task => !task.completed && task.priority.includes('Today')).length;

    pendingCountEl.textContent = pendingTasks;
    completedCountEl.textContent = completedTasks;
    upcomingCountEl.textContent = upcomingTasks;



    // Loop through every task in our array and build its HTML
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="task-checkbox">
            <div class="task-info">
                <h4>${task.title}</h4>
                <span class="task-priority">${task.priority}</span>
            </div>
            <button class="delete-btn">Delete</button>
        `;

        // --- Wire up the completion logic here ---
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', function() {
            task.completed = !task.completed;
            renderTasks(); // Wipe and redraw!
        });

        // --- Wire up the delete logic here ---
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            // 1. Filter out the task whose ID matches this specific task's ID
            // (Keep everything WHERE task.id DOES NOT EQUAL this task's id)
            tasks = tasks.filter(t => t.id !== task.id);
            
            // 2. Wipe and redraw!
            renderTasks();
        });

        taskContainer.appendChild(taskItem);
    });
} // <--- THIS WAS MISSING! It closes the renderTasks function.

// 4. WHAT: Listen for the user clicking the "Add Task" button
addTaskBtn.addEventListener('click', function() {
    // Grab what the user typed and trim whitespace
    const taskTitle = taskInput.value.trim();

    // Guard clause: If the input box is empty, stop here and alert the user
    if (taskTitle === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new task object using the typed text
    const newTask = {
        id: tasks.length + 1,
        title: taskTitle,
        priority: "Normal · Today",
        completed: false
    };

    // Push the new object into our global tasks array
    tasks.push(newTask);

    // Clear the input field so it's ready for the next task
    taskInput.value = '';

    // Re-run renderTasks() so the screen updates instantly with the new task!
    renderTasks();
});



// 5. Initial call: Draw the starting tasks when the page first loads
renderTasks();

// --- 1. STUDY HOURS DATA & LOCALSTORAGE ---
// Load study hours from localStorage, or default to 2.5 if nothing is saved yet
let studiedHours = parseFloat(localStorage.getItem('studiedHours')) || 2.5;

// Select elements for study hours
const studiedCountEl = document.getElementById('studied-count');
const addStudyBtn = document.getElementById('add-study-btn');

// --- 2. RENDER & SAVE FUNCTIONS ---
function renderStudyHours() {
    if (studiedCountEl) {
        studiedCountEl.textContent = studiedHours + 'h';
    }
}

function saveStudyHours() {
    localStorage.setItem('studiedHours', studiedHours);
    renderStudyHours();
}

// --- 3. EVENT LISTENER FOR LOGGING STUDY TIME ---
if (addStudyBtn) {
    addStudyBtn.addEventListener('click', function() {
        // Add 0.5 hours (30 minutes) every time the button is clicked
        studiedHours += 0.5;
        
        // Save to localStorage and update the dashboard UI instantly
        saveStudyHours();
    });
}

// Initial call to display study hours when page loads
renderStudyHours();