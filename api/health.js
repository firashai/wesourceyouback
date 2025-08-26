module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    res.json({
      status: 'success',
      message: 'Media Brokerage API is running!',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      },
      endpoints: {
        health: 'GET /health',
        api: 'GET /api',
        users: 'GET,POST /users',
        auth: 'GET,POST /auth/login',
        content: 'GET /content',
        projects: 'GET /projects',
        mediaTypes: 'GET /media-types'
      }
    });
  } else {
    res.status(405).json({ 
      error: 'Method not allowed',
      status: 'error',
      allowedMethods: ['GET'],
      timestamp: new Date().toISOString()
    });
  }
};
