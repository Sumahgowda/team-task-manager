const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Pending" },
  dueDate: Date
});

module.exports = mongoose.model("Task", taskSchema);