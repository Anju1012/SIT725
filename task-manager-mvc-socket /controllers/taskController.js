const Task = require('../models/taskModel');

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Error fetching tasks');
  }
};

// Add a new task and broadcast it
const addTask = async (req, res) => {
  try {
    const { name, description, dueDate, priority } = req.body;

    const newTask = new Task({
      name,
      description,
      dueDate,
      priority,
      completed: false,
    });

    await newTask.save();

    // Broadcast new task
    const io = req.app.get('socketio');
    io.emit('taskAdded', newTask);

    res.redirect('/');
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).send('Error adding task');
  }
};

module.exports = {
  getTasks,
  addTask,
};
