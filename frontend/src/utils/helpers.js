// Helper functions for the app
// Some of these are not used yet but might be useful later

export const formatDate = (date) => {
  // TODO: make this more flexible with different formats
  if (!date) return '';
  return new Date(date).toLocaleDateString();
};

// Task priority sorting - still working on this
export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
  return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
};

// TODO: finish this function
export const calculateTaskStats = (tasks) => {
  // basic stats for now, want to add more later
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  
  return {
    total,
    completed,
    pending: total - completed,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  };
};

// Not using this yet but might be useful for notifications
export const getOverdueTasks = (tasks) => {
  const now = new Date();
  return tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < now && 
    task.status === 'pending'
  );
};

// Experimental - trying to add search functionality
/*
export const searchTasks = (tasks, searchTerm) => {
  if (!searchTerm) return tasks;
  
  return tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};
*/

// Advanced task filtering helper
export const filterTasksByDateRange = (tasks, startDate, endDate) => {
  if (!startDate && !endDate) return tasks;
  
  return tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    const start = startDate ? new Date(startDate) : new Date('1900-01-01');
    const end = endDate ? new Date(endDate) : new Date('2100-01-01');
    
    return taskDate >= start && taskDate <= end;
  });
};
