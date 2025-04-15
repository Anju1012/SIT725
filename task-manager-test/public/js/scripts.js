document.addEventListener("DOMContentLoaded", async function () {
    M.AutoInit();

    // Pre-existing tasks
    let predefinedTasks = [
        { title: "Complete Assignment", description: "Finish the MongoDB tutorial.", dueDate: "2024-04-10", priority: "High", completed: false },
        { title: "Buy Groceries", description: "Milk, Eggs, Bread, and Butter.", dueDate: "2024-04-05", priority: "Medium", completed: true },
        { title: "Workout", description: "Go for a 30-minute run.", dueDate: "2024-04-07", priority: "Low", completed: false }
    ];

    let tasks = [];

    try {
        let response = await fetch("/api/tasks");
        let data = await response.json();
        
        if (data.statusCode === 200) {
            tasks = data.data;
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }

    // Add predefined tasks to database if not already present
    for (let task of predefinedTasks) {
        if (!tasks.some(t => t.title === task.title && t.dueDate === task.dueDate)) {
            try {
                let response = await fetch("/api/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(task),
                });
                
                if (response.ok) {
                    let newTask = await response.json();
                    tasks.push(newTask.data);
                }
            } catch (error) {
                console.error("Error adding predefined task:", error);
            }
        }
    }

    addCards(tasks);

    // Handle new task form submission
    document.getElementById("task-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const taskData = {
            title: document.getElementById("task-title").value,
            description: document.getElementById("task-desc").value,
            dueDate: document.getElementById("task-date").value,
            priority: document.getElementById("task-priority").value,
            completed: false
        };

        try {
            let response = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                M.toast({ html: "Task added successfully!" });

                let newTask = await response.json();
                tasks.push(newTask.data);
                addCards(tasks);
                document.getElementById("task-form").reset();
            } else {
                M.toast({ html: "Error adding task" });
            }
        } catch (error) {
            console.error("Error submitting task:", error);
        }
    });
});

// Function to display tasks
function addCards(tasks) {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

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
        button.addEventListener("click", async function () {
            const index = this.getAttribute("data-index");
            tasks[index].completed = true;
            document.getElementById(`status-${index}`).innerText = "Completed ✅";
            this.setAttribute("disabled", true);
            M.toast({ html: "Task marked as complete!" });
        });
    });
}
