const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const corsMiddleware = require('./middleware/cors');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.resolve(__dirname, '../frontend/dist');
  
  // Debug logging
  console.log('Current directory:', __dirname);
  console.log('Frontend path:', frontendPath);
  console.log('Frontend path exists:', require('fs').existsSync(frontendPath));
  console.log('Index.html exists:', require('fs').existsSync(path.join(frontendPath, 'index.html')));
  
  // Try to list files in the directory
  try {
    const files = require('fs').readdirSync(path.resolve(__dirname, '../'));
    console.log('Files in parent directory:', files);
  } catch (err) {
    console.log('Cannot read parent directory:', err.message);
  }
  
  app.use(express.static(frontendPath));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    if (require('fs').existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({
        success: false,
        message: 'Frontend build not found',
        path: indexPath,
        __dirname: __dirname
      });
    }
  });
} else {
  // Basic route for development
  app.get('/', (req, res) => {
    res.json({
      message: 'Team Task Manager API',
      version: '2.0.0',
      status: 'Running',
      environment: process.env.NODE_ENV || 'development',
      features: [
        'User Authentication (JWT)',
        'User Management',
        'Project Management',
        'Task Management',
        'Role-based Access Control'
      ]
    });
  });
}

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'Connected',
    environment: process.env.NODE_ENV || 'production'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Handle 404 for API routes only
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);
});