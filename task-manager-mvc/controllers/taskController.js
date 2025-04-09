// controllers/taskController.js
const Task = require('../models/taskModel');

// Get all tasks as JSON
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.json(tasks); // Send tasks as JSON response
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Error fetching tasks');
  }
};

// Add a new task
const addTask = async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;

    // Create a new task with name, description, dueDate and completed (defaults to false)
    const newTask = new Task({
      name,
      description,
      dueDate,
      completed: false,
    });

    await newTask.save(); // Save the new task to the database
    res.redirect('/'); // Redirect to the index page to see the updated list
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).send('Error adding task');
  }
};

module.exports = {
  getTasks,
  addTask,
};
