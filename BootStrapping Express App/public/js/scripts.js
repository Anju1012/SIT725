$(document).ready(function () {
    $('.modal').modal();
    $('select').formSelect();

    let tasks = [
        {
            title: "Finish Project Proposal",
            description: "Complete the initial draft of the project proposal.",
            dueDate: "2025-04-01",
            priority: "High",
            completed: false
        },
        {
            title: "Update Client Report",
            description: "Review and update the monthly report for the client.",
            dueDate: "2025-03-28",
            priority: "Medium",
            completed: false
        },
        {
            title: "Fix Website Bugs",
            description: "Resolve UI issues reported by the testing team.",
            dueDate: "2025-03-30",
            priority: "Low",
            completed: false
        }
    ];

    // Function to render tasks
    function renderTasks() {
        $('#task-list').empty();
        tasks.forEach((task, index) => {
            let taskHTML = `
                <div class="col s12 m6">
                    <div class="card ${task.completed ? 'grey lighten-2' : ''}">
                        <div class="card-content">
                            <span class="card-title">${task.title} (${task.priority})</span>
                            <p>${task.description}</p>
                            <p><strong>Due:</strong> ${task.dueDate}</p>
                        </div>
                        <div class="card-action">
                            <a href="#" class="complete-task btn green" data-index="${index}">Complete</a>
                            <a href="#" class="delete-task btn red" data-index="${index}">Delete</a>
                        </div>
                    </div>
                </div>`;
            $('#task-list').append(taskHTML);
        });
    }

    // Handle task submission
    $('#task-form').submit(function (event) {
        event.preventDefault();
        let newTask = {
            title: $('#task-title').val(),
            description: $('#task-desc').val(),
            dueDate: $('#task-date').val(),
            priority: $('#task-priority').val(),
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
        $('#task-form')[0].reset();
        $('.modal').modal('close');
    });

    // Handle task completion
    $(document).on('click', '.complete-task', function () {
        let index = $(this).data('index');
        tasks[index].completed = true;
        renderTasks();
    });

    // Handle task deletion
    $(document).on('click', '.delete-task', function () {
        let index = $(this).data('index');
        tasks.splice(index, 1);
        renderTasks();
    });

    // Render the default tasks on page load
    renderTasks();
});