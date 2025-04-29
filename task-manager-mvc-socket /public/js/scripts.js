const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
};

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        clickMe();
    });

    $('.modal').modal();
    $('select').formSelect();
    fetchTasks();
});

// Fetch and display tasks
function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';

            tasks.forEach(task => {
                const taskCard = document.createElement('div');
                taskCard.classList.add('col', 's12', 'm6', 'l4');
                taskCard.innerHTML = `
                    <div class="card ${task.completed ? 'green lighten-4' : ''}">
                        <div class="card-content">
                            <span class="card-title">${task.name}</span>
                            <p><strong>Description:</strong> ${task.description}</p>
                            <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
                            <p><strong>Priority:</strong> ${task.priority}</p>
                            <p>Status: ${task.completed ? '✅ Completed' : '⏳ Pending'}</p>
                        </div>
                    </div>
                `;
                taskList.appendChild(taskCard);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Submit new task
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('task-name').value;
        const description = document.getElementById('task-description').value;
        const dueDate = document.getElementById('task-due-date').value;
        const priority = document.getElementById('task-priority').value;

        fetch('/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${name}&description=${description}&dueDate=${dueDate}&priority=${priority}`,
        }).then(() => {
            $('#addTaskModal').modal('close');
            taskForm.reset();
        });
    });
});