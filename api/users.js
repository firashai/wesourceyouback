module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    // Mock users data
    const users = [
      { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com', 
        role: 'admin',
        status: 'active',
        createdAt: '2024-01-15T10:30:00Z',
        lastLogin: '2024-01-20T14:45:00Z'
      },
      { 
        id: 2, 
        name: 'Jane Smith', 
        email: 'jane@example.com', 
        role: 'user',
        status: 'active',
        createdAt: '2024-01-10T09:15:00Z',
        lastLogin: '2024-01-19T16:20:00Z'
      },
      { 
        id: 3, 
        name: 'Bob Johnson', 
        email: 'bob@example.com', 
        role: 'editor',
        status: 'active',
        createdAt: '2024-01-12T11:00:00Z',
        lastLogin: '2024-01-18T13:30:00Z'
      },
      { 
        id: 4, 
        name: 'Alice Brown', 
        email: 'alice@example.com', 
        role: 'user',
        status: 'inactive',
        createdAt: '2024-01-05T08:45:00Z',
        lastLogin: '2024-01-15T12:10:00Z'
      }
    ];
    
    res.json({
      message: 'Users retrieved successfully',
      status: 'success',
      data: {
        users: users,
        total: users.length,
        active: users.filter(u => u.status === 'active').length,
        inactive: users.filter(u => u.status === 'inactive').length
      },
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 1
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
        const userData = JSON.parse(body);
        
        // Validate required fields
        if (!userData.name || !userData.email) {
          res.status(400).json({
            message: 'User creation failed',
            status: 'error',
            error: 'Name and email are required',
            timestamp: new Date().toISOString()
          });
          return;
        }
        
        // Mock user creation
        const newUser = {
          id: Math.floor(Math.random() * 1000) + 1,
          name: userData.name,
          email: userData.email,
          role: userData.role || 'user',
          status: 'active',
          createdAt: new Date().toISOString(),
          lastLogin: null
        };
        
        res.json({
          message: 'User created successfully',
          status: 'success',
          data: newUser,
          timestamp: new Date().toISOString()
        });
      } catch (e) {
        res.status(400).json({
          message: 'User creation failed',
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
