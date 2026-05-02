const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin only)
const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors.array()
      });
    }

    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,
      members: [{
        user: req.user.id,
        role: 'owner'
      }]
    });

    await project.populate('createdBy', 'name email');
    await project.populate('members.user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get all projects for logged in user
// @route   GET /api/projects
// @access  Private
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { 'members.user': req.user.id }
      ]
    })
    .populate('createdBy', 'name email')
    .populate('members.user', 'name email')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  createProject,
  getAllProjects
};