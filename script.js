const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskProgress = document.getElementById('task-progress');
const progressBar = document.getElementById('progress-bar');



//add an event listener to the form to handle the submit event
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        return;
    }

    const listItem = document.createElement('li');

//create a checkbox for each task and add an event listener to handle the change event
const checkboxes = document.createElement('input');
checkboxes.type = 'checkbox';
checkboxes.setAttribute('aria-label', 'Mark task as complete');

//create a span to hold the task text
const taskLabel = document.createElement('span');
taskLabel.textContent = taskText;

//cross out the the text when the checkbox is checked
checkboxes.addEventListener('change', function() {
    taskLabel.classList.toggle('completed', checkboxes.checked);
    updateProgress();
});

//create a delete button for each task and add an event listener to handle the click event
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.addEventListener('click', function() {
    listItem.remove();
    updateProgress();
});

//put all 3 elements together in a div and append it to the list item
listItem.appendChild(checkboxes);
listItem.appendChild(taskLabel);
listItem.appendChild(deleteButton);

//add the list item to the task list
taskList.appendChild(listItem);
updateProgress();

taskInput.value = '';
taskInput.focus();
});

//function for progree bar
function updateProgress() {
    const checkbox = taskList.querySelectorAll('input[type="checkbox"]');
    const totalTasks = checkbox.length;
    const completedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
    const percent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    taskProgress.textContent = `${Math.round(percent)}% completed`;
    progressBar.style.width = `${percent}%`;
}