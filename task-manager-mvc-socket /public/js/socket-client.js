const socket = io(); // Connect to server

socket.on('taskAdded', (task) => {
    console.log('New Task Added:', task);
    fetchTasks(); // Call this when a new task is broadcasted
});