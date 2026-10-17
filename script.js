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

    // Calculate stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const upcomingTasks = tasks.filter(task => !task.completed && task.priority.includes('Today')).length;
    // Inside renderTasks(), calculate and update progress dynamically:
    const progressStatEl = document.getElementById('progress-stat');
    if (progressStatEl) {
        const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        progressStatEl.textContent = completionPercentage + '% Completed';
    }

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
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        taskContainer.appendChild(taskItem);
    });
}

// 4. WHAT: Listen for the user clicking the "Add Task" button
addTaskBtn.addEventListener('click', function() {
    const taskTitle = taskInput.value.trim();

    if (taskTitle === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: tasks.length + 1,
        title: taskTitle,
        priority: "Normal · Today",
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
});

// Initial call: Draw starting tasks
renderTasks();

// --- STUDY HOURS DATA & LOCALSTORAGE ---
let studiedHours = parseFloat(localStorage.getItem('studiedHours')) || 2.5;

const studiedCountEl = document.getElementById('studied-count');
const addStudyBtn = document.getElementById('add-study-btn');

function renderStudyHours() {
    if (studiedCountEl) {
        studiedCountEl.textContent = studiedHours + 'h';
    }
}

function saveStudyHours() {
    localStorage.setItem('studiedHours', studiedHours);
    renderStudyHours();
}

if (addStudyBtn) {
    addStudyBtn.addEventListener('click', function() {
        studiedHours += 0.5;
        saveStudyHours();
    });
}

renderStudyHours();

// --- VIEW SWITCHER & NAVIGATION ELEMENTS ---

// 1. Sidebar Links
const navDashboard = document.getElementById('nav-dashboard');
const navTimetable = document.getElementById('nav-timetable');
const navAssignments = document.getElementById('nav-assignments');
const navStudy = document.getElementById('nav-study');
const navProgress = document.getElementById('nav-progress');

// 2. Content Sections
const dashboardSection = document.getElementById('dashboard-section');
const timetableSection = document.getElementById('timetable-section');
const assignmentsSection = document.getElementById('assignments-section');
const studySection = document.getElementById('study-section');
const progressSection = document.getElementById('progress-section');

// --- DASHBOARD CLICK LISTENER ---
if (navDashboard) {
    navDashboard.addEventListener('click', function(e) {
        e.preventDefault();
        
        timetableSection.style.display = 'none';
        assignmentsSection.style.display = 'none';
        studySection.style.display = 'none';
        progressSection.style.display = 'none';
        dashboardSection.style.display = 'block';

        navDashboard.classList.add('active');
        navTimetable.classList.remove('active');
        navAssignments.classList.remove('active');
        navStudy.classList.remove('active');
        navProgress.classList.remove('active');
    });
}

// --- TIMETABLE CLICK LISTENER ---
if (navTimetable) {
    navTimetable.addEventListener('click', function(e) {
        e.preventDefault();
        
        dashboardSection.style.display = 'none';
        assignmentsSection.style.display = 'none';
        studySection.style.display = 'none';
        progressSection.style.display = 'none';
        timetableSection.style.display = 'block';

        navTimetable.classList.add('active');
        navDashboard.classList.remove('active');
        navAssignments.classList.remove('active');
        navStudy.classList.remove('active');
        navProgress.classList.remove('active');
    });
}

// --- ASSIGNMENTS CLICK LISTENER ---
if (navAssignments) {
    navAssignments.addEventListener('click', function(e) {
        e.preventDefault();

        dashboardSection.style.display = 'none';
        timetableSection.style.display = 'none';
        studySection.style.display = 'none';
        progressSection.style.display = 'none';
        assignmentsSection.style.display = 'block';

        navAssignments.classList.add('active');
        navDashboard.classList.remove('active');
        navTimetable.classList.remove('active');
        navStudy.classList.remove('active');
        navProgress.classList.remove('active');
    });
}

// --- STUDY TRACKER CLICK LISTENER ---
if (navStudy) {
    navStudy.addEventListener('click', function(e) {
        e.preventDefault();

        dashboardSection.style.display = 'none';
        timetableSection.style.display = 'none';
        assignmentsSection.style.display = 'none';
        progressSection.style.display = 'none';
        studySection.style.display = 'block';

        navStudy.classList.add('active');
        navDashboard.classList.remove('active');
        navTimetable.classList.remove('active');
        navAssignments.classList.remove('active');
        navProgress.classList.remove('active');
    });
}

// --- PROGRESS CLICK LISTENER ---
if (navProgress) {
    navProgress.addEventListener('click', function(e) {
        e.preventDefault();

        dashboardSection.style.display = 'none';
        timetableSection.style.display = 'none';
        assignmentsSection.style.display = 'none';
        studySection.style.display = 'none';
        progressSection.style.display = 'block';

        navProgress.classList.add('active');
        navDashboard.classList.remove('active');
        navTimetable.classList.remove('active');
        navAssignments.classList.remove('active');
        navStudy.classList.remove('active');
    });
}