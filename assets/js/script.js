let currentTaskBox = null;

// Load tasks from session storage on page load
window.addEventListener('load', function() {
    const taskDisplaySection = document.getElementById('taskDisplaySection');
    const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskBox = document.createElement('div');
        taskBox.className = 'task-box ' + task.size;
        taskBox.textContent = task.text;
        taskBox.setAttribute('data-comment', task.comment);
        taskBox.addEventListener('click', function() {
            currentTaskBox = taskBox;
            document.getElementById('taskComment').value = taskBox.getAttribute('data-comment'); // Load the comment into the input field
            $('#commentModal').modal('show');
        });
        taskDisplaySection.appendChild(taskBox);
    });
});

document.getElementById('saveTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskSize = document.getElementById('taskSize').value;
    const taskDisplaySection = document.getElementById('taskDisplaySection');

    if (taskInput.value.trim() !== '') {
        const taskBox = document.createElement('div');
        taskBox.className = 'task-box ' + taskSize;
        taskBox.textContent = taskInput.value;
        taskBox.setAttribute('data-comment', '');
        taskBox.addEventListener('click', function() {
            currentTaskBox = taskBox;
            document.getElementById('taskComment').value = ''; // Clear the comment input field
            $('#commentModal').modal('show');
        });
        taskDisplaySection.appendChild(taskBox);

        // Save task to session storage
        const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];
        tasks.push({ text: taskInput.value, size: taskSize, comment: '' });
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
        const taskIndex = Array.from(currentTaskBox.parentNode.children).indexOf(currentTaskBox);
        if (taskIndex > -1) {
            tasks[taskIndex].comment = taskComment;
            sessionStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
});