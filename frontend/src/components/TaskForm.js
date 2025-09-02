import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const TaskForm = ({ open, onClose, onSubmit, task = null }) => {
  // Initial attempt - keeping this for reference
  /*
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  */
  
  // Better approach - single state object (learned from react docs)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: null,
  });
  // const [error, setError] = useState(''); // TODO: implement form validation errors
  
  // TODO: add validation before submit
  // TODO: maybe add categories later?

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: null,
      });
    }
  }, [task, open]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
    };
    
    // Only add dueDate if it's actually set
    if (formData.dueDate && formData.dueDate.isValid()) {
      submitData.dueDate = formData.dueDate.toISOString();
    }
    
    console.log('TaskForm submitting data:', submitData);
    
    onSubmit(submitData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {task ? 'Edit Task' : 'Create New Task'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              autoFocus
            />
            
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
            
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date (Optional)"
                value={formData.dueDate}
                onChange={(date) => handleChange('dueDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined'
                  }
                }}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!formData.title.trim()}
          >
            {task ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;
