const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (Admin only)
const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors.array()
      });
    }

    const { title, description, projectId, assignedTo, priority, dueDate } = req.body;

    // Check if project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if assigned user exists (if provided)
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(404).json({
          success: false,
          message: 'Assigned user not found'
        });
      }
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo: assignedTo || null,
      priority: priority || 'medium',
      dueDate: dueDate || null,
      createdBy: req.user.id
    });

    await task.populate('assignedTo', 'name email');
    await task.populate('createdBy', 'name email');
    await task.populate('projectId', 'title');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { projectId, status } = req.query;
    
    // Build query - get tasks from projects user has access to
    const userProjects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { 'members.user': req.user.id }
      ]
    }).select('_id');
    
    let query = {
      projectId: { $in: userProjects.map(p => p._id) }
    };
    
    // Add filters
    if (projectId) query.projectId = projectId;
    if (status) query.status = status;

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('projectId', 'title')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private (Members can update status)
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['todo', 'inprogress', 'done'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be todo, inprogress, or done'
      });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user has access to this task's project
    const project = await Project.findById(task.projectId);
    const hasAccess = project.createdBy.toString() === req.user.id ||
                     project.members.some(member => member.user.toString() === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email')
    .populate('projectId', 'title');

    res.json({
      success: true,
      message: 'Task status updated successfully',
      data: updatedTask
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
  createTask,
  getTasks,
  updateTaskStatus
};