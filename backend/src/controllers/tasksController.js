const Task = require('../models/Task');
exports.getTasks = async (req, res) => {
  try { const tasks = await Task.find().sort({ createdAt: -1 }); res.json(tasks); }
  catch (err) { res.status(500).json({ error: 'Failed to fetch tasks' }); }
};
exports.getTaskById = async (req, res) => {
  try { const task = await Task.findById(req.params.id); if (!task) return res.status(404).json({ error: 'Task not found' }); res.json(task); }
  catch (err) { res.status(500).json({ error: 'Failed to fetch task' }); }
};
exports.createTask = async (req, res) => {
  try { const { title, description, status, priority, dueDate } = req.body; if (!title) return res.status(400).json({ error: 'Title is required' }); const task = new Task({ title, description, status, priority, dueDate }); await task.save(); res.status(201).json(task); }
  catch (err) { res.status(500).json({ error: 'Failed to create task' }); }
};
exports.updateTask = async (req, res) => {
  try { const updates = req.body; const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true }); if (!task) return res.status(404).json({ error: 'Task not found' }); res.json(task); }
  catch (err) { res.status(500).json({ error: 'Failed to update task' }); }
};
exports.deleteTask = async (req, res) => {
  try { const task = await Task.findByIdAndDelete(req.params.id); if (!task) return res.status(404).json({ error: 'Task not found' }); res.json({ ok: true }); }
  catch (err) { res.status(500).json({ error: 'Failed to delete task' }); }
};
