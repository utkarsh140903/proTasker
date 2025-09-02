# Task Manager App

A full-stack task management application with user authentication, CRUD operations, and cross-platform support.

## What it does

Basically it's like a todo app but better. You can:
- Create an account and login 
- Add tasks with priorities (high, medium, low)
- Mark tasks as done
- Set due dates 
- Filter and sort your tasks
- See some basic stats

## Cool features I managed to add
- Responsive design that works on mobile browsers
- You can deploy it to the cloud 
- Has proper authentication with JWT tokens
- MongoDB database integration
- Material-UI for nice looking components

## TODO (things I want to add later)
- Push notifications (started working on this but got complicated)
- Maybe add categories or tags
- Dark mode would be cool

## Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **CORS** enabled for cross-origin requests

### Frontend
- **React 18** with functional components and hooks
- **Material-UI (MUI)** for modern UI components
- **React Router** for client-side routing
- **Axios** for API communication
- **Context API** for state management
- **date-fns** for date formatting
- **Responsive design** for mobile browser compatibility

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or cloud instance like MongoDB Atlas)
- Git

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd TASK_MANAGER
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file with your configuration
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Start React development server
npm start
```

### 4. Test the Application

```bash
# Test API endpoints
node test-api.js

# Visit the app
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
GENERATE_SOURCEMAP=false
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user (requires authentication)

### Task Endpoints (All require authentication)

#### GET /api/tasks
Get all tasks for authenticated user
- Query parameters: `status`, `priority`, `sortBy`, `order`

#### GET /api/tasks/stats
Get task statistics

#### GET /api/tasks/:id
Get specific task

#### POST /api/tasks
Create new task
```json
{
  "title": "Complete project",
  "description": "Finish the task manager app",
  "priority": "high",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

#### PUT /api/tasks/:id
Update task

#### PATCH /api/tasks/:id/status
Toggle task status

#### DELETE /api/tasks/:id
Delete task

## Deployment Options

### 1. Backend Deployment

#### Render
1. Connect your GitHub repository
2. Choose "Web Service"
3. Environment: Node
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables in Render dashboard

#### Vercel
```bash
cd backend
npm install -g vercel
vercel
```

#### Railway
1. Connect GitHub repository
2. Deploy automatically with railway.json configuration

### 2. Frontend Deployment

#### Vercel
```bash
cd frontend
npm run build
npx vercel --prod
```

#### Netlify
```bash
cd frontend
npm run build
# Drag and drop build folder to Netlify dashboard
```

## Database Setup

### Local MongoDB
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod

# Connect to database
mongo
use taskmanager
```

### MongoDB Atlas (Cloud)
1. Create account at https://cloud.mongodb.com
2. Create new cluster
3. Get connection string
4. Update MONGODB_URI in .env

## Project Structure

```
TASK_MANAGER/
├── backend/                # Node.js API server
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   ├── server.js          # Entry point
│   └── package.json
├── frontend/              # React web application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── .gitignore             # Git ignore rules
├── package.json           # Root package file
└── README.md              # Project documentation
```

## Development Workflow

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd frontend && npm start`
3. **Access App**: http://localhost:3000
4. **API Base**: http://localhost:5000

## Testing

### Manual Testing Checklist
- [ ] User signup and login
- [ ] Create new tasks
- [ ] Edit existing tasks
- [ ] Toggle task status
- [ ] Delete tasks
- [ ] Filter and sort tasks
- [ ] View task statistics
- [ ] Responsive design on mobile

### API Testing with curl

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create task (replace YOUR_TOKEN)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Task","description":"Test description","priority":"high"}'
```

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- CORS configuration
- Protected API endpoints
- Secure environment variable handling

## Performance Optimizations

- Database indexing for faster queries
- Efficient React state management
- Optimized API endpoints
- Image and bundle optimization
- Lazy loading for better performance

## Future Enhancements

- [ ] Push notifications
- [ ] Email notifications for due tasks
- [ ] Task categories/tags
- [ ] Team collaboration features
- [ ] File attachments
- [ ] Calendar integration
- [ ] Dark mode theme
- [ ] Offline support

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity

2. **CORS Issues**
   - Check frontend API URL configuration
   - Verify backend CORS settings

3. **Authentication Failures**
   - Check JWT_SECRET configuration
   - Verify token storage in localStorage

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Task Managing! 🚀**
