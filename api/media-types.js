module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    // Mock media types data
    const mediaTypes = [
      {
        id: 1,
        name: 'Video',
        description: 'Video content and multimedia files',
        extensions: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'],
        mimeTypes: ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-ms-wmv'],
        maxSize: '500MB',
        supported: true,
        category: 'multimedia',
        icon: '🎥'
      },
      {
        id: 2,
        name: 'Image',
        description: 'Image files and graphics',
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff'],
        mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'],
        maxSize: '50MB',
        supported: true,
        category: 'graphics',
        icon: '🖼️'
      },
      {
        id: 3,
        name: 'Audio',
        description: 'Audio files and music',
        extensions: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a'],
        mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/aac', 'audio/ogg', 'audio/flac'],
        maxSize: '100MB',
        supported: true,
        category: 'audio',
        icon: '🎵'
      },
      {
        id: 4,
        name: 'Document',
        description: 'Document files and text content',
        extensions: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'pages'],
        mimeTypes: ['application/pdf', 'application/msword', 'text/plain', 'application/rtf'],
        maxSize: '25MB',
        supported: true,
        category: 'document',
        icon: '📄'
      },
      {
        id: 5,
        name: 'Archive',
        description: 'Compressed and archive files',
        extensions: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
        mimeTypes: ['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed'],
        maxSize: '200MB',
        supported: true,
        category: 'archive',
        icon: '📦'
      },
      {
        id: 6,
        name: 'Presentation',
        description: 'Presentation and slideshow files',
        extensions: ['ppt', 'pptx', 'key', 'odp'],
        mimeTypes: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
        maxSize: '50MB',
        supported: true,
        category: 'presentation',
        icon: '📊'
      },
      {
        id: 7,
        name: 'Spreadsheet',
        description: 'Spreadsheet and data files',
        extensions: ['xls', 'xlsx', 'csv', 'ods', 'numbers'],
        mimeTypes: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
        maxSize: '30MB',
        supported: true,
        category: 'data',
        icon: '📈'
      },
      {
        id: 8,
        name: '3D Model',
        description: '3D models and CAD files',
        extensions: ['obj', 'fbx', 'dae', '3ds', 'blend', 'stl'],
        mimeTypes: ['model/obj', 'model/fbx', 'model/collada+xml'],
        maxSize: '100MB',
        supported: false,
        category: '3d',
        icon: '🎯'
      }
    ];
    
    res.json({
      message: 'Media types retrieved successfully',
      status: 'success',
      data: {
        mediaTypes: mediaTypes,
        total: mediaTypes.length,
        supported: mediaTypes.filter(mt => mt.supported).length,
        unsupported: mediaTypes.filter(mt => !mt.supported).length,
        categories: {
          multimedia: mediaTypes.filter(mt => mt.category === 'multimedia').length,
          graphics: mediaTypes.filter(mt => mt.category === 'graphics').length,
          audio: mediaTypes.filter(mt => mt.category === 'audio').length,
          document: mediaTypes.filter(mt => mt.category === 'document').length,
          archive: mediaTypes.filter(mt => mt.category === 'archive').length,
          presentation: mediaTypes.filter(mt => mt.category === 'presentation').length,
          data: mediaTypes.filter(mt => mt.category === 'data').length,
          '3d': mediaTypes.filter(mt => mt.category === '3d').length
        }
      },
      features: {
        totalExtensions: mediaTypes.reduce((sum, mt) => sum + mt.extensions.length, 0),
        totalMimeTypes: mediaTypes.reduce((sum, mt) => sum + mt.mimeTypes.length, 0),
        averageMaxSize: '100MB'
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
