const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';


const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

const testTask = {
  title: 'Test Task',
  description: 'This is a test task',
  priority: 'high',
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week from now
};

let authToken = '';

async function testAPI() {
  try {
    console.log('🧪 Testing Task Manager API...\n');

    console.log('1. Testing health check...');
    const healthResponse = await axios.get('http://localhost:5000');
    console.log('✅ Health check:', healthResponse.data.message);

 
    console.log('\n2. Testing user signup...');
    try {
      const signupResponse = await axios.post(`${API_BASE_URL}/auth/signup`, testUser);
      authToken = signupResponse.data.token;
      console.log('✅ User signup successful');
      console.log('   Token received:', authToken.substring(0, 20) + '...');
    } catch (error) {
      if (error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️  User already exists, testing login instead...');
        
        
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        authToken = loginResponse.data.token;
        console.log('✅ User login successful');
      } else {
        throw error;
      }
    }

    // Setup axios instance with auth
    const authenticatedAPI = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

   
    console.log('\n3. Testing get current user...');
    const userResponse = await authenticatedAPI.get('/auth/me');
    console.log('✅ Current user:', userResponse.data.user.name);

  
    console.log('\n4. Testing create task...');
    const createTaskResponse = await authenticatedAPI.post('/tasks', testTask);
    const createdTask = createTaskResponse.data.task;
    console.log('✅ Task created:', createdTask.title);

 
    console.log('\n5. Testing get all tasks...');
    const tasksResponse = await authenticatedAPI.get('/tasks');
    console.log('✅ Tasks retrieved:', tasksResponse.data.count, 'tasks found');

  
    console.log('\n6. Testing task statistics...');
    const statsResponse = await authenticatedAPI.get('/tasks/stats');
    console.log('✅ Task stats:', {
      total: statsResponse.data.totalTasks,
      completed: statsResponse.data.completedTasks,
      pending: statsResponse.data.pendingTasks,
      completionRate: statsResponse.data.completionRate + '%'
    });

    
    console.log('\n7. Testing toggle task status...');
    const toggleResponse = await authenticatedAPI.patch(`/tasks/${createdTask._id}/status`);
    console.log('✅ Task status toggled to:', toggleResponse.data.task.status);

   
    console.log('\n8. Testing update task...');
    const updateResponse = await authenticatedAPI.put(`/tasks/${createdTask._id}`, {
      title: 'Updated Test Task',
      description: 'This task has been updated'
    });
    console.log('✅ Task updated:', updateResponse.data.task.title);

   
    console.log('\n9. Testing delete task...');
    await authenticatedAPI.delete(`/tasks/${createdTask._id}`);
    console.log('✅ Task deleted successfully');

    console.log('\n🎉 All API tests passed! Your backend is working correctly.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    console.error('   Make sure your backend server is running on port 5000');
  }
}

// Check if this script is being run directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;
