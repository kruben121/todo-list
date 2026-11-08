const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskProgress = document.getElementById('numbers');
const progressBar = document.getElementById('progress');



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

// Create an edit button that lets the task label be updated in place.
const editButton = document.createElement('button');
editButton.type = 'button';
editButton.className = 'icon-button edit-button';
editButton.setAttribute('aria-label', 'Edit task');
editButton.title = 'Edit task';
editButton.innerHTML = '<img src="img/Edit.png" alt="" aria-hidden="true">';

editButton.addEventListener('click', function() {
    taskLabel.contentEditable = 'true';
    taskLabel.classList.add('editing');
    taskLabel.focus();

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(taskLabel);
    selection.removeAllRanges();
    selection.addRange(range);
});

taskLabel.addEventListener('blur', function() {
    const updatedText = taskLabel.textContent.trim();
    taskLabel.textContent = updatedText || taskText;
    taskLabel.contentEditable = 'false';
    taskLabel.classList.remove('editing');
});

taskLabel.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        taskLabel.blur();
    }
});

// Create a delete button for each task and add an event listener to handle the click event.
const deleteButton = document.createElement('button');
deleteButton.type = 'button';
deleteButton.className = 'icon-button delete-button';
deleteButton.setAttribute('aria-label', 'Delete task');
deleteButton.title = 'Delete task';
deleteButton.innerHTML = '<img src="img/Delete.png" alt="" aria-hidden="true">';
deleteButton.addEventListener('click', function() {
    listItem.remove();
    updateProgress();
});

//put all 3 elements together in a div and append it to the list item
listItem.appendChild(checkboxes);
listItem.appendChild(taskLabel);
listItem.appendChild(editButton);
listItem.appendChild(deleteButton);

//add the list item to the task list
taskList.appendChild(listItem);
updateProgress();

taskInput.value = '';
taskInput.focus();
});

//function for progree bar
function updateProgress() {
    const totalTasks = taskList.querySelectorAll('input[type="checkbox"]').length;
    const completedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
    const percent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    taskProgress.textContent =  completedTasks + "/" + totalTasks;
    progressBar.style.width = percent + '%';
}
