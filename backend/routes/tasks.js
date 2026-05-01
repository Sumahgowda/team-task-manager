const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// CREATE TASK (Admin OR Member)
router.post("/", auth(), async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      status: "Pending",
      assignedTo: req.user.id
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET TASKS (only logged-in user tasks)
router.get("/", auth(), async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE TASK STATUS
router.put("/:id", auth(), async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE TASK (optional but useful)
router.delete("/:id", auth(), async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
