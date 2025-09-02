const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();


router.get('/', auth, async (req, res) => {
  try {
    const { status, priority, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    // console.log('Fetching tasks for user:', req.user._id); 
    
    // Build filter object 
    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Build sort object - this was confusing at first!
    const sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1; // -1 for desc, 1 for asc

    const tasks = await Task.find(filter).sort(sort);
    
    res.json({
      tasks,
      count: tasks.length
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});


router.get('/stats', auth, async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user._id });
    const completedTasks = await Task.countDocuments({ user: req.user._id, status: 'completed' });
    const pendingTasks = await Task.countDocuments({ user: req.user._id, status: 'pending' });
    
    const tasksByPriority = await Task.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      tasksByPriority
    });
  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({ message: 'Server error while fetching task statistics' });
  }
});


router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }
    res.status(500).json({ message: 'Server error while fetching task' });
  }
});


router.post('/', [
  auth,
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be between 1 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, priority, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      user: req.user._id
    });

    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
});


router.put('/:id', [
  auth,
  body('title').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('status').optional().isIn(['pending', 'completed']).withMessage('Status must be pending or completed'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = req.body;
    if (updates.dueDate) {
      updates.dueDate = new Date(updates.dueDate);
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }
    res.status(500).json({ message: 'Server error while updating task' });
  }
});


router.patch('/:id/status', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();

    res.json({
      message: 'Task status updated successfully',
      task
    });
  } catch (error) {
    console.error('Toggle task status error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }
    res.status(500).json({ message: 'Server error while updating task status' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

module.exports = router;
