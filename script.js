// 1. WHAT: An array containing our initial task objects
const tasks = [
    { id: 1, title: "Revise JavaScript arrays", priority: "High · Today", completed: false },
    { id: 2, title: "Complete DSA practice", priority: "Completed", completed: true }
];

// 2. WHAT: Select our HTML elements so JavaScript can interact with them
const taskContainer = document.querySelector('.task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');

// 3. WHAT: The function that draws (renders) our tasks onto the webpage
function renderTasks() {
    // Clear out the container first so we don't get duplicates
    taskContainer.innerHTML = '';

    // Loop through every task in our array and build its HTML
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <div class="task-info">
                <h4>${task.title}</h4>
                <span class="task-priority">${task.priority}</span>
            </div>
        `;

        // Append the newly built task card into the HTML container
        taskContainer.appendChild(taskItem);
    });
}

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

