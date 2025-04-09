// seed.js
const mongoose = require('mongoose');
const Task = require('./models/taskModel');

mongoose.connect('mongodb://localhost:27017/taskManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    await Task.deleteMany(); // Remove all tasks if any exist
    await Task.create([
      {
        name: 'Task 1',
        description: 'Complete the project report',
        dueDate: new Date('2025-05-01'),
        completed: false,
      },
      {
        name: 'Task 2',
        description: 'Review team progress',
        dueDate: new Date('2025-05-10'),
        completed: false,
      },
      {
        name: 'Task 3',
        description: 'Prepare presentation slides',
        dueDate: new Date('2025-05-15'),
        completed: false,
      },
    ]);
    console.log('Database seeded with tasks');
    mongoose.connection.close(); // Close the connection
  })
  .catch((err) => {
    console.log('Error seeding database:', err);
    mongoose.connection.close(); // Close the connection in case of error
  });

