const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <span class="task-name">${task.name}</span>
            <div class="task-buttons">
                <button class="status-button ${task.status}" data-index="${index}">
                    ${task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </button>
                <button class="delete-button" data-index="${index}">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTaskStatus(index) {
    const task = tasks[index];
    if (task.status === 'not-started') {
        task.status = 'in-progress';
    } else if (task.status === 'in-progress') {
        task.status = 'completed';
    } else {
        task.status = 'not-started';
    }
    renderTasks();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName === '') {
        return;
    }
    const task = { name: taskName, status: 'not-started' };
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
});

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.dataset.index;
        deleteTask(index);
    } else if (event.target.classList.contains('status-button')) {
        const index = event.target.dataset.index;
        toggleTaskStatus(index);
    }
    renderTasks();
});

renderTasks();
