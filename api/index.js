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
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    title: 'Media Brokerage API',
    description: 'API for media professionals and companies',
    version: '1.0.0',
    status: 'running',
    note: 'This is a simplified version. Full functionality requires database setup.',
    endpoints: {
      health: 'GET /health',
      api: 'GET /api',
      users: 'POST /users',
      auth: 'POST /auth/login',
      content: 'GET /content',
      projects: 'GET /projects',
      mediaTypes: 'GET /media-types'
    }
  });
});

// Mock endpoints for testing
app.get('/users', (req, res) => {
  res.json({
    message: 'Users endpoint - requires database setup',
    status: 'mock'
  });
});

app.post('/users', (req, res) => {
  res.json({
    message: 'User creation endpoint - requires database setup',
    status: 'mock',
    data: req.body
  });
});

app.post('/auth/login', (req, res) => {
  res.json({
    message: 'Login endpoint - requires database setup',
    status: 'mock',
    data: req.body
  });
});

app.get('/auth/login', (req, res) => {
  res.json({
    message: 'Login endpoint (GET) - requires database setup',
    status: 'mock',
    note: 'This endpoint is typically accessed via POST with credentials'
  });
});

app.get('/content', (req, res) => {
  res.json({
    message: 'Content endpoint - requires database setup',
    status: 'mock'
  });
});

app.get('/projects', (req, res) => {
  res.json({
    message: 'Projects endpoint - requires database setup',
    status: 'mock'
  });
});

app.get('/media-types', (req, res) => {
  res.json({
    message: 'Media types endpoint - requires database setup',
    status: 'mock'
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Media Brokerage API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      users: '/users',
      auth: '/auth/login',
      content: '/content',
      projects: '/projects',
      mediaTypes: '/media-types'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api',
      'GET /users',
      'POST /users',
      'POST /auth/login',
      'GET /content',
      'GET /projects',
      'GET /media-types'
    ]
  });
});

module.exports = app;
