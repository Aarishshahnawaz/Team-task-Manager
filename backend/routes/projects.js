const express = require('express');
const router = express.Router();
const { createProject, getAllProjects } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');
const { validateProject } = require('../middleware/validation');

// All routes are protected
router.use(protect);

// @route   GET /api/projects
// @desc    Get all projects for logged in user
// @access  Private
router.get('/', getAllProjects);

// @route   POST /api/projects
// @desc    Create new project (Admin only)
// @access  Private (Admin only)
router.post('/', authorize('admin'), validateProject, createProject);

module.exports = router;