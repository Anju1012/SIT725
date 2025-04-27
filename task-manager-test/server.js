const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/taskManagerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

// Task Schema
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  description: String,
  dueDate: String,
  priority: String,
});

const Task = mongoose.model("Task", TaskSchema);

// API Endpoints
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json({ statusCode: 200, data: tasks, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    if (typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    if (!req.body.title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json({ statusCode: 201, message: "Task Added", data: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;