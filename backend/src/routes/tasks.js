const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasksController');
router.get('/', controller.getTasks);
router.post('/', controller.createTask);
router.get('/:id', controller.getTaskById);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);
module.exports = router;
