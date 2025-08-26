module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    // Mock projects data
    const projects = [
      {
        id: 1,
        name: 'Website Redesign',
        status: 'in-progress',
        client: 'ABC Corp',
        description: 'Complete redesign of corporate website with modern UI/UX',
        startDate: '2024-01-10T00:00:00Z',
        endDate: '2024-03-15T00:00:00Z',
        progress: 65,
        budget: 25000,
        team: ['John Doe', 'Jane Smith', 'Bob Johnson'],
        technologies: ['React', 'Node.js', 'MongoDB'],
        priority: 'high'
      },
      {
        id: 2,
        name: 'Mobile App Development',
        status: 'completed',
        client: 'XYZ Inc',
        description: 'Cross-platform mobile application for e-commerce',
        startDate: '2023-11-01T00:00:00Z',
        endDate: '2024-01-20T00:00:00Z',
        progress: 100,
        budget: 45000,
        team: ['Alice Brown', 'Charlie Wilson'],
        technologies: ['React Native', 'Firebase', 'Stripe'],
        priority: 'medium'
      },
      {
        id: 3,
        name: 'Brand Identity',
        status: 'planning',
        client: 'Startup Co',
        description: 'Complete brand identity package including logo, colors, and guidelines',
        startDate: '2024-02-01T00:00:00Z',
        endDate: '2024-03-01T00:00:00Z',
        progress: 15,
        budget: 12000,
        team: ['David Lee', 'Emma Davis'],
        technologies: ['Adobe Creative Suite', 'Figma'],
        priority: 'low'
      },
      {
        id: 4,
        name: 'E-commerce Platform',
        status: 'in-progress',
        client: 'Retail Solutions',
        description: 'Full-featured e-commerce platform with payment integration',
        startDate: '2024-01-05T00:00:00Z',
        endDate: '2024-04-30T00:00:00Z',
        progress: 40,
        budget: 60000,
        team: ['Frank Miller', 'Grace Taylor', 'Henry Anderson'],
        technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
        priority: 'high'
      },
      {
        id: 5,
        name: 'Content Management System',
        status: 'completed',
        client: 'Media Corp',
        description: 'Custom CMS for managing digital content and assets',
        startDate: '2023-09-15T00:00:00Z',
        endDate: '2023-12-20T00:00:00Z',
        progress: 100,
        budget: 35000,
        team: ['Ivy Chen', 'Jack White'],
        technologies: ['Angular', 'Django', 'PostgreSQL'],
        priority: 'medium'
      }
    ];
    
    res.json({
      message: 'Projects retrieved successfully',
      status: 'success',
      data: {
        projects: projects,
        total: projects.length,
        completed: projects.filter(p => p.status === 'completed').length,
        inProgress: projects.filter(p => p.status === 'in-progress').length,
        planning: projects.filter(p => p.status === 'planning').length,
        totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
        averageProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
      },
      statistics: {
        byPriority: {
          high: projects.filter(p => p.priority === 'high').length,
          medium: projects.filter(p => p.priority === 'medium').length,
          low: projects.filter(p => p.priority === 'low').length
        },
        byStatus: {
          completed: projects.filter(p => p.status === 'completed').length,
          'in-progress': projects.filter(p => p.status === 'in-progress').length,
          planning: projects.filter(p => p.status === 'planning').length
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
