const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Create task (Admin only)
router.post("/", auth("Admin"), async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Get tasks
router.get("/", auth(), async (req, res) => {
  const tasks = await Task.find().populate("assignedTo");
  res.json(tasks);
});

// Update status
router.put("/:id", auth(), async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

module.exports = router;