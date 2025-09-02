import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import { Edit, Delete, CalendarToday } from '@mui/icons-material';
import { format } from 'date-fns';

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
  // function to get color for priority 
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default'; // fallback just in case
    }
  };

  // check if task is overdue - this was tricky to figure out!
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'pending';
  
  
  // console.log('TaskItem render:', task.title, task.status);

  return (
    <Card 
      sx={{ 
        mb: 2, 
        opacity: task.status === 'completed' ? 0.7 : 1,
        borderLeft: isOverdue ? '4px solid red' : 'none'
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex" alignItems="flex-start" flex={1}>
            <Checkbox
              checked={task.status === 'completed'}
              onChange={() => onToggleStatus(task._id)}
              sx={{ pt: 0 }}
            />
            <Box flex={1} ml={1}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                  mb: 1
                }}
              >
                {task.title}
              </Typography>
              
              {task.description && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  {task.description}
                </Typography>
              )}
              
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Chip 
                  label={task.priority} 
                  color={getPriorityColor(task.priority)}
                  size="small"
                />
                
                <Chip 
                  label={task.status} 
                  color={task.status === 'completed' ? 'success' : 'default'}
                  variant="outlined"
                  size="small"
                />
                
                {task.dueDate && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <CalendarToday sx={{ fontSize: 16 }} />
                    <Typography 
                      variant="caption" 
                      color={isOverdue ? 'error' : 'text.secondary'}
                      fontWeight={isOverdue ? 'bold' : 'normal'}
                    >
                      {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      {isOverdue && ' (Overdue)'}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          
          <Box>
            <Tooltip title="Edit Task">
              <IconButton onClick={() => onEdit(task)} size="small">
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Task">
              <IconButton onClick={() => onDelete(task._id)} size="small" color="error">
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
