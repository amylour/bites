let currentTaskBox = null;

// Load tasks from local storage on page load
window.addEventListener('load', function() {
    const taskDisplaySection = document.getElementById('taskDisplaySection');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        if (!task.deleted) {
            const taskBox = createTaskBox(task.text, task.size, task.completed, task.deleted);
            taskDisplaySection.appendChild(taskBox);
        }
    });
});

// Save new task and append it to the taskDisplaySection
document.getElementById('saveTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskSize = document.getElementById('taskSize').value;
    const taskDisplaySection = document.getElementById('taskDisplaySection');

    if (taskInput.value.trim() !== '') {
        const taskBox = createTaskBox(taskInput.value, taskSize, false, false);
        taskDisplaySection.appendChild(taskBox);

        // Save task to local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskInput.value, size: taskSize, completed: false, deleted: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = ''; // Clear the input field
    }
});

// Function to create a task box
function createTaskBox(text, size, completed, deleted) {
    const taskDisplaySection = document.getElementById('taskDisplaySection');
    const existingTasks = taskDisplaySection.getElementsByClassName('task-box ' + size);

    // Restrict the number of tasks based on size
    const sizeLimits = {
        'priority': 1,
        'small': 2,
        'medium': 2,
        'large': 1
    };

    if (existingTasks.length >= sizeLimits[size]) {
        alert(`You can only have ${sizeLimits[size]} ${size} task(s).`);
        return null;
    }

    const taskBox = document.createElement('div');
    taskBox.className = 'task-box ' + size;
    taskBox.textContent = text;

    // Create tick button
    const tickButton = document.createElement('button');
    tickButton.textContent = '✔';
    tickButton.className = 'tick-button';
    tickButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering the task box click event
        showConfetti(); // Trigger confetti effect

        // Mark task as deleted in local storage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(t => {
            if (t.text === text && t.size === size && !t.deleted) {
                t.deleted = true;
            }
            return t;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Remove task box from DOM
        taskBox.remove();
    });
    taskBox.appendChild(tickButton);

    return taskBox;
}

// Function to show confetti effect
function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
