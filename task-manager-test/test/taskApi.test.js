const request = require("supertest");
const expect = require("chai").expect;
const app = require("../server"); 

describe("Task Manager API", () => {

  // GET all tasks
  it("should return all tasks with status 200", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("statusCode", 200);
    expect(res.body).to.have.property("data").that.is.an("array");
  });

  // POST a new task
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

});
