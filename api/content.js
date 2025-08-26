module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    // Mock content data
    const content = [
      {
        id: 1,
        title: 'Sample Article',
        type: 'article',
        status: 'published',
        author: 'John Doe',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-18T14:20:00Z',
        tags: ['technology', 'web development'],
        views: 1250,
        likes: 45
      },
      {
        id: 2,
        title: 'Video Content',
        type: 'video',
        status: 'draft',
        author: 'Jane Smith',
        createdAt: '2024-01-12T09:15:00Z',
        updatedAt: '2024-01-16T11:30:00Z',
        tags: ['tutorial', 'video'],
        duration: '15:30',
        thumbnail: 'https://example.com/thumbnail1.jpg'
      },
      {
        id: 3,
        title: 'Image Gallery',
        type: 'gallery',
        status: 'published',
        author: 'Bob Johnson',
        createdAt: '2024-01-10T16:45:00Z',
        updatedAt: '2024-01-14T13:20:00Z',
        tags: ['photography', 'art'],
        images: 12,
        views: 890
      },
      {
        id: 4,
        title: 'Podcast Episode',
        type: 'audio',
        status: 'published',
        author: 'Alice Brown',
        createdAt: '2024-01-08T12:00:00Z',
        updatedAt: '2024-01-12T10:15:00Z',
        tags: ['podcast', 'interview'],
        duration: '45:20',
        downloads: 320
      },
      {
        id: 5,
        title: 'Infographic Design',
        type: 'infographic',
        status: 'published',
        author: 'Charlie Wilson',
        createdAt: '2024-01-05T14:30:00Z',
        updatedAt: '2024-01-09T16:45:00Z',
        tags: ['design', 'data visualization'],
        views: 2100,
        shares: 156
      }
    ];
    
    res.json({
      message: 'Content retrieved successfully',
      status: 'success',
      data: {
        content: content,
        total: content.length,
        published: content.filter(c => c.status === 'published').length,
        draft: content.filter(c => c.status === 'draft').length,
        types: {
          article: content.filter(c => c.type === 'article').length,
          video: content.filter(c => c.type === 'video').length,
          gallery: content.filter(c => c.type === 'gallery').length,
          audio: content.filter(c => c.type === 'audio').length,
          infographic: content.filter(c => c.type === 'infographic').length
        }
      },
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 1
      },
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ 
      error: 'Method not allowed',
      status: 'error',
      allowedMethods: ['GET'],
      note: 'POST, PUT, DELETE methods will be available in future versions',
      timestamp: new Date().toISOString()
    });
  }
};
