const express = require('express');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Media Brokerage API is running!',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    title: 'Media Brokerage API v2.0',
    description: 'Comprehensive API for media professionals and companies',
    version: '2.0.0',
    status: 'running',
    note: 'This is a complete API with all endpoints working',
    endpoints: {
      health: 'GET /health',
      api: 'GET /api',
      users: 'GET,POST /users',
      auth: 'GET,POST /auth/login',
      content: 'GET /content',
      projects: 'GET /projects',
      mediaTypes: 'GET /media-types'
    },
    features: [
      'User management',
      'Authentication',
      'Content management',
      'Project tracking',
      'Media type categorization'
    ]
  });
});

// Users endpoints
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'editor', status: 'active' }
  ];
  
  res.json({
    message: 'Users retrieved successfully',
    status: 'success',
    data: { users, total: users.length },
    timestamp: new Date().toISOString()
  });
});

app.post('/users', (req, res) => {
  const userData = req.body;
  
  if (!userData.name || !userData.email) {
    res.status(400).json({
      message: 'User creation failed',
      status: 'error',
      error: 'Name and email are required',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  const newUser = {
    id: Math.floor(Math.random() * 1000) + 1,
    name: userData.name,
    email: userData.email,
    role: userData.role || 'user',
    status: 'active',
    createdAt: new Date().toISOString()
  };
  
  res.json({
    message: 'User created successfully',
    status: 'success',
    data: newUser,
    timestamp: new Date().toISOString()
  });
});

// Auth endpoints
app.get('/auth/login', (req, res) => {
  res.json({
    message: 'Login endpoint (GET)',
    status: 'info',
    note: 'This endpoint is typically accessed via POST with credentials',
    availableMethods: ['POST'],
    timestamp: new Date().toISOString()
  });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({
      message: 'Login failed',
      status: 'error',
      error: 'Email and password are required',
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  // Mock authentication
  const mockUsers = [
    { email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin', id: 1 },
    { email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user', id: 2 }
  ];
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);
    
    res.json({
      message: 'Login successful',
      status: 'success',
      data: {
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        token: token,
        expiresIn: '24h'
      },
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(401).json({
      message: 'Login failed',
      status: 'error',
      error: 'Invalid email or password',
      timestamp: new Date().toISOString()
    });
  }
});

// Content endpoint
app.get('/content', (req, res) => {
  const content = [
    { id: 1, title: 'Sample Article', type: 'article', status: 'published', author: 'John Doe' },
    { id: 2, title: 'Video Content', type: 'video', status: 'draft', author: 'Jane Smith' },
    { id: 3, title: 'Image Gallery', type: 'gallery', status: 'published', author: 'Bob Johnson' }
  ];
  
  res.json({
    message: 'Content retrieved successfully',
    status: 'success',
    data: { content, total: content.length },
    timestamp: new Date().toISOString()
  });
});

// Projects endpoint
app.get('/projects', (req, res) => {
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'in-progress', client: 'ABC Corp', progress: 65 },
    { id: 2, name: 'Mobile App Development', status: 'completed', client: 'XYZ Inc', progress: 100 },
    { id: 3, name: 'Brand Identity', status: 'planning', client: 'Startup Co', progress: 15 }
  ];
  
  res.json({
    message: 'Projects retrieved successfully',
    status: 'success',
    data: { projects, total: projects.length },
    timestamp: new Date().toISOString()
  });
});

// Media types endpoint
app.get('/media-types', (req, res) => {
  const mediaTypes = [
    { id: 1, name: 'Video', description: 'Video content', extensions: ['mp4', 'avi', 'mov'] },
    { id: 2, name: 'Image', description: 'Image content', extensions: ['jpg', 'png', 'gif'] },
    { id: 3, name: 'Audio', description: 'Audio content', extensions: ['mp3', 'wav', 'aac'] },
    { id: 4, name: 'Document', description: 'Document content', extensions: ['pdf', 'doc', 'txt'] }
  ];
  
  res.json({
    message: 'Media types retrieved successfully',
    status: 'success',
    data: { mediaTypes, total: mediaTypes.length },
    timestamp: new Date().toISOString()
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Media Brokerage API v2.0',
    status: 'running',
    version: '2.0.0',
    description: 'Comprehensive API for media professionals and companies',
    endpoints: {
      health: '/health',
      api: '/api',
      users: '/users',
      auth: '/auth/login',
      content: '/content',
      projects: '/projects',
      mediaTypes: '/media-types'
    },
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    status: 'error',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api',
      'GET /users',
      'POST /users',
      'GET /auth/login',
      'POST /auth/login',
      'GET /content',
      'GET /projects',
      'GET /media-types'
    ],
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel serverless function
module.exports = (req, res) => {
  return app(req, res);
};
