// seed.js
const mongoose = require('mongoose');
const Task = require('./models/taskModel');

mongoose.connect('mongodb://localhost:27017/taskManagerSocket', { // Make sure DB name matches server.js
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
    console.log('Connected to MongoDB for seeding...');

    await Task.deleteMany(); // Clear existing tasks

    await Task.create([
      {
        name: 'Task 1',
        description: 'Complete the project report',
        dueDate: new Date('2025-05-01'),
        priority: 'High',
        completed: false,
      },
      {
        name: 'Task 2',
        description: 'Review team progress',
        dueDate: new Date('2025-05-10'),
        priority: 'Medium',
        completed: false,
      },
      {
        name: 'Task 3',
        description: 'Prepare presentation slides',
        dueDate: new Date('2025-05-15'),
        priority: 'Low',
        completed: false,
      },
    ]);

    console.log('✅ Database seeded with tasks!');
    mongoose.connection.close(); // Close DB connection
})
.catch((err) => {
    console.error('❌ Error seeding database:', err);
    mongoose.connection.close();
});