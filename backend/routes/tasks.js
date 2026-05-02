const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTaskStatus } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');
const { validateTask } = require('../middleware/validation');

// All routes are protected
router.use(protect);

// @route   GET /api/tasks
// @desc    Get all tasks for logged in user
// @access  Private
router.get('/', getTasks);

// @route   POST /api/tasks
// @desc    Create new task (Admin only)
// @access  Private (Admin only)
router.post('/', authorize('admin'), validateTask, createTask);

// @route   PUT /api/tasks/:id/status
// @desc    Update task status (Members can update)
// @access  Private
router.put('/:id/status', updateTaskStatus);

module.exports = router;