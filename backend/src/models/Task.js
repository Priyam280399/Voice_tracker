const { Schema, model } = require('mongoose');
const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  dueDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});
module.exports = model('Task', TaskSchema);
