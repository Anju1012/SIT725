// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Serve the static index.html file
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route to get all tasks as JSON
router.get('/tasks', taskController.getTasks);

// Route to add a new task
router.post('/add', taskController.addTask);

module.exports = router;
