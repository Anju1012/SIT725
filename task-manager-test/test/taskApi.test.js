const request = require("supertest");
const expect = require("chai").expect;
const app = require("../server");

describe("Task Manager API", () => {

  // 1. GET all tasks
  it("should return all tasks with status 200", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("statusCode", 200);
    expect(res.body.data).to.be.an("array");
  });

  // 2. POST a new task
  it("should create a new task and return it", async () => {
    const newTask = {
      title: "Supertest Task",
      description: "Created via supertest",
      dueDate: "2025-06-01",
      priority: "Medium"
    };

    const res = await request(app)
      .post("/api/tasks")
      .send(newTask);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message", "Task Added");
    expect(res.body.data).to.include(newTask);
  });

  // 3. POST a task with missing title
  it("should fail to create a task without a title", async () => {
    const incompleteTask = {
      description: "Missing title field",
      dueDate: "2025-06-01",
      priority: "Low"
    };

    const res = await request(app)
      .post("/api/tasks")
      .send(incompleteTask);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error", "Title is required");
  });

  // 4. GET tasks after posting new one
  it("should include the newly created task in the task list", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).to.equal(200);
    const taskTitles = res.body.data.map(task => task.title);
    expect(taskTitles).to.include("Supertest Task");
  });

  // 5. POST invalid payload (non-object)
  it("should return 400 if invalid payload is sent", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send("invalidPayload");

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error");
  });

});