const socket = io();

socket.on('taskAdded', (task) => {
  console.log("New Task Received:", task);

  const taskList = document.getElementById('task-list');

  const taskCard = document.createElement('div');
  taskCard.classList.add('col', 's12', 'm6', 'l4');
  taskCard.innerHTML = `
      <div class="card">
          <div class="card-content">
              <span class="card-title">${task.name}</span>
              <p><strong>Description:</strong> ${task.description}</p>
              <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
              <p><strong>Priority:</strong> ${task.priority}</p>
              <p>Status: ${task.completed ? 'Completed' : 'Pending'}</p>
          </div>
      </div>
  `;

  taskList.appendChild(taskCard);
});
