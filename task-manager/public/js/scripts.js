document.addEventListener("DOMContentLoaded", function () {
    M.AutoInit();

    // Sample tasks (Pre-existing 3 tasks)
    let tasks = [
        { title: "Complete Assignment", description: "Finish the MongoDB tutorial.", dueDate: "2024-04-10", priority: "High", completed: false },
        { title: "Buy Groceries", description: "Milk, Eggs, Bread, and Butter.", dueDate: "2024-04-05", priority: "Medium", completed: true },
        { title: "Workout", description: "Go for a 30-minute run.", dueDate: "2024-04-07", priority: "Low", completed: false }
    ];

    // Fetch tasks from database and merge with pre-existing ones
    fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
            if (data.statusCode === 200) {
                tasks = [...tasks, ...data.data]; // Merge pre-existing and database tasks
                addCards(tasks);
            }
        });

    // Handle form submission for adding new tasks
    document.getElementById("task-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const taskData = {
            title: document.getElementById("task-title").value,
            description: document.getElementById("task-desc").value,
            dueDate: document.getElementById("task-date").value,
            priority: document.getElementById("task-priority").value,
            completed: false // New tasks start as incomplete
        };

        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            M.toast({ html: "Task added successfully!" });

            const newTask = await response.json();
            tasks.push(newTask.data); // Add new task to the list
            addCards(tasks); // Refresh UI to include new task
            document.getElementById("task-form").reset();
        } else {
            M.toast({ html: "Error adding task" });
        }
    });
});

// Function to display tasks
function addCards(tasks) {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing tasks before adding new ones

    tasks.forEach((task, index) => {
        let card = document.createElement("div");
        card.classList.add("col", "s12", "m6", "l4");

        card.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <span class="card-title">${task.title}</span>
                    <p>${task.description}</p>
                    <p><strong>Due Date:</strong> ${task.dueDate}</p>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                    <p><strong>Status:</strong> <span id="status-${index}">${task.completed ? "Completed ✅" : "Incomplete ❌"}</span></p>
                </div>
                <div class="card-action">
                    <button class="btn mark-complete" data-index="${index}" ${task.completed ? "disabled" : ""}>
                        Mark as Complete
                    </button>
                </div>
            </div>
        `;
        taskList.appendChild(card);
    });

    // Add event listeners to "Mark as Complete" buttons
    document.querySelectorAll(".mark-complete").forEach((button) => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            tasks[index].completed = true;
            document.getElementById(`status-${index}`).innerText = "Completed ✅";
            this.setAttribute("disabled", true);
            M.toast({ html: "Task marked as complete!" });
        });
    });
}
