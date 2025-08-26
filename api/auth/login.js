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
      message: 'Login endpoint (GET)',
      status: 'info',
      note: 'This endpoint is typically accessed via POST with credentials',
      availableMethods: ['POST'],
      requiredFields: {
        email: 'string (required)',
        password: 'string (required)'
      },
      example: {
        email: 'user@example.com',
        password: 'password123'
      },
      response: {
        success: {
          message: 'Login successful',
          status: 'success',
          data: {
            user: { id: 1, email: 'user@example.com', name: 'User Name', role: 'user' },
            token: 'jwt-token-here',
            expiresIn: '24h'
          }
        },
        error: {
          message: 'Login failed',
          status: 'error',
          error: 'Invalid credentials'
        }
      },
      timestamp: new Date().toISOString()
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        
        // Validate required fields
        if (!email || !password) {
          res.status(400).json({
            message: 'Login failed',
            status: 'error',
            error: 'Email and password are required',
            timestamp: new Date().toISOString()
          });
          return;
        }
        
        // Mock authentication logic
        const mockUsers = [
          { email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin', id: 1 },
          { email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user', id: 2 },
          { email: 'editor@example.com', password: 'editor123', name: 'Editor User', role: 'editor', id: 3 }
        ];
        
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          // Generate mock JWT token
          const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
          
          res.json({
            message: 'Login successful',
            status: 'success',
            data: {
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
              },
              token: token,
              expiresIn: '24h',
              refreshToken: 'refresh-token-' + Math.random().toString(36).substr(2, 9)
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
      } catch (e) {
        res.status(400).json({
          message: 'Login failed',
          status: 'error',
          error: 'Invalid JSON data',
          timestamp: new Date().toISOString()
        });
      }
    });
  } else {
    res.status(405).json({ 
      error: 'Method not allowed',
      status: 'error',
      allowedMethods: ['GET', 'POST'],
      timestamp: new Date().toISOString()
    });
  }
};
