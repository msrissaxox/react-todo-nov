//This is where I am definining my CRUD operations for tasks.
const express = require("express");
const router = express.Router();

const Task = require('../models/Task');

//Import the middleware
const authenticateToken = require("../controllers/authMiddleware");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route for fetching tasks for users
//authenticateToken,
// router.get("/:id", (req, res) => {
//   // Logic to fetch a specific task by ID
//   res.send(`Fetching task with ID ${req.params.id}`);

// });

router.get("/:id", authenticateToken, async (req, res) => {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//route for fetching all tasks
// Fetch all tasks
//authenticateToken,
// router.get("/",authenticateToken, (req, res) => {
//   // Logic to fetch all tasks
//   const tasks = req.body.name;
//   res.send(`${tasks}`);
// });

router.get('/', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Create a task
// router.post("/", authenticationToken, async (req, res) => {
//   // Logic to create a new task using request data
//   res.status(201).send("Task created");
// });

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { content, userId } = req.body;
        
        if (!content || !userId) {
            return res.status(400).json({ 
                message: "Content and userId are required fields" 
            });
        }

        const task = new Task({
            content,
            userId,
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
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
