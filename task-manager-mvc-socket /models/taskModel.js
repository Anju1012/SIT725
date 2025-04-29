// models/taskModel.js
const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create a model from the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
