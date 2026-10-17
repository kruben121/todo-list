const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function addTask(taskText) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    taskList.appendChild(listItem);
}

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }

    taskInput.focus();
});
