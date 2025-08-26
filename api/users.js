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
      message: 'Users endpoint - requires database setup',
      status: 'mock'
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        res.json({
          message: 'User creation endpoint - requires database setup',
          status: 'mock',
          data: data
        });
      } catch (e) {
        res.json({
          message: 'User creation endpoint - requires database setup',
          status: 'mock',
          data: body
        });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
