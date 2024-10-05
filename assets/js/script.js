let currentTaskBox = null;

// Load tasks from session storage on page load
window.addEventListener('load', function() {
    const taskDisplaySection = document.getElementById('taskDisplaySection');
    const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (!task.deleted) {
            const taskBox = createTaskBox(task.text, task.size, task.comment, task.completed, task.deleted);
            taskDisplaySection.appendChild(taskBox);
        }
    });
});

document.getElementById('saveTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskSize = document.getElementById('taskSize').value;
    const taskDisplaySection = document.getElementById('taskDisplaySection');

    if (taskInput.value.trim() !== '') {
        const taskBox = createTaskBox(taskInput.value, taskSize, '', false, false);
        taskDisplaySection.appendChild(taskBox);

        // Save task to session storage
        const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
        tasks.push({ text: taskInput.value, size: taskSize, comment: '', completed: false, deleted: false });
        sessionStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = ''; // Clear the input field
    }
});

document.getElementById('saveCommentButton').addEventListener('click', function() {
    const taskComment = document.getElementById('taskComment').value;
    if (currentTaskBox) {
        currentTaskBox.setAttribute('data-comment', taskComment);
        $('#commentModal').modal('hide');

        // Update comment in session storage
        const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(t => t.text === currentTaskBox.textContent && t.size === currentTaskBox.className.split(' ').pop());
        if (taskIndex > -1) {
            tasks[taskIndex].comment = taskComment;
            sessionStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
});

function createTaskBox(text, size, comment, completed, deleted) {
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
    taskBox.setAttribute('data-comment', comment);

    // Create tick button
    const tickButton = document.createElement('button');
    tickButton.textContent = '✔';
    tickButton.className = 'tick-button';
    tickButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering the task box click event
        showConfetti(); // Trigger confetti effect

        // Mark task as completed and deleted in session storage
        const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(t => t.text === text && t.size === size);
        if (taskIndex > -1) {
            tasks[taskIndex].completed = true;
            tasks[taskIndex].deleted = true;
            sessionStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Remove task box from DOM
        taskBox.remove();
    });
    taskBox.appendChild(tickButton);

    taskBox.addEventListener('click', function() {
        currentTaskBox = taskBox;
        document.getElementById('taskComment').value = taskBox.getAttribute('data-comment'); // Load the comment into the input field
        $('#commentModal').modal('show');
    });

    return taskBox;
}

function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
