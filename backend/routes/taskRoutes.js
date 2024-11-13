//This is where I am definining my CRUD operations for tasks.
const express = require("express");
const router = express.Router();
//Import the middleware
const authenticateToken = require("../controllers/authMiddleware");

// route for fetching tasks for users
//authenticateToken,
router.get("/:id", (req, res) => {
  // Logic to fetch a specific task by ID
  res.send(`Fetching task with ID ${req.params.id}`);
});

//route for fetching all tasks
// Fetch all tasks
//authenticateToken,
router.get("/",authenticateToken, (req, res) => {
  // Logic to fetch all tasks
  res.send("Fetching all tasks");
});

//Create a task
//authenticateToken,
router.post("/", (req, res) => {
  // Logic to create a new task using request data
  res.status(201).send("Task created");
});

// Update an existing task (e.g., mark as complete or incomplete)
//authenticateToken,
router.patch("/:id", (req, res) => {
  const taskId = req.params.id;
  const { completed } = req.body; // Assume we're receiving { completed: true } or { completed: false }

  // Logic to update the task by ID, using the "completed" property if provided
  if (typeof completed !== "undefined") {
    // Logic to mark as complete or incomplete based on the "completed" value
    res.send(
      `Task with ID ${taskId} marked as ${completed ? "complete" : "incomplete"}`,
    );
  } else {
    // Handle other updates or partial updates
    res.send(`Updating task with ID ${taskId}`);
  }
});

//Delete a task
//authenticateToken,
router.delete("/:id", (req, res) => {
  // Logic to delete a task by ID
  res.send(`Deleting task with ID ${req.params.id}`);
});

module.exports = router;
