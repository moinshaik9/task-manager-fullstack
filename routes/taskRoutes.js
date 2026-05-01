const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ADD task
router.post('/tasks', async (req, res) => {
  const newTask = new Task({
    title: req.body.title
  });

  await newTask.save();
  res.json(newTask);
});

// UPDATE task
router.put('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;

  await task.save();
  res.json(task);
});

// DELETE task
router.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;