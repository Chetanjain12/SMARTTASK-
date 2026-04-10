const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate: dueDate || null,
      user: req.user._id,
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updates = req.body;

    if (updates.status === "completed" && task.status !== "completed") {
      updates.completedAt = new Date();
    }

    if (updates.status === "pending") {
      updates.completedAt = null;
    }

    Object.assign(task, updates);

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

const softDeleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.deleted = true;
    await task.save();

    return res.status(200).json({ message: "Task moved to trash", task });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};

const restoreTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.deleted = false;
    await task.save();

    return res.status(200).json({ message: "Task restored", task });
  } catch (error) {
    return res.status(500).json({ message: "Failed to restore task", error: error.message });
  }
};

const permanentDeleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task permanently deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to permanently delete task", error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  softDeleteTask,
  restoreTask,
  permanentDeleteTask,
};