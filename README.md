# Media Brokerage API

A comprehensive NestJS API for media professionals and companies to manage content, projects, and collaborations.

## 🚀 Quick Deploy to Vercel

### Prerequisites
- [Vercel Account](https://vercel.com)
- MySQL Database (PlanetScale, Railway, or any MySQL provider)
- Git repository

### Quick Start

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy using the script**:
   ```bash
   # On Windows
   deploy.bat
   
   # On Mac/Linux
   ./deploy.sh
   ```

3. **Or deploy manually**:
   ```bash
   vercel login
   vercel --prod
   ```

## 📋 Environment Variables

Set these in your Vercel dashboard:

```bash
# Database
DB_HOST=your_database_host
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# App
NODE_ENV=production
```

## 🔗 API Endpoints

Your API will be available at: `https://your-project-name.vercel.app`

### Authentication
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token

### Users
- `POST /users` - Create user
- `GET /users` - Get all users (protected)
- `GET /users/:id` - Get user by ID (protected)

### Content
- `POST /content` - Create content (protected)
- `GET /content` - Get all content
- `GET /content/:id` - Get content by ID
- `PATCH /content/:id` - Update content (protected)
- `DELETE /content/:id` - Delete content (protected)
- `POST /content/:id/view` - Increment views
- `POST /content/:id/download` - Increment downloads
- `GET /content/tags/all` - Get all tags
- `POST /content/tags` - Create tag (protected)
- `DELETE /content/tags/:id` - Delete tag (protected)

### Projects
- `POST /projects` - Create project (protected)
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `PATCH /projects/:id` - Update project (protected)
- `DELETE /projects/:id` - Delete project (protected)

### Media Types
- `GET /media-types` - Get all media types
- `GET /media-types/:id` - Get media type by ID
- `POST /media-types` - Create media type (protected)
- `PATCH /media-types/:id` - Update media type (protected)
- `DELETE /media-types/:id` - Delete media type (protected)

### Documentation
- `GET /api` - Swagger API documentation

## 🧪 Testing Your API

Use the provided test script:

1. Update `test-api.js` with your deployment URL
2. Run: `node test-api.js`

Or test manually:

```bash
# Test API health
curl https://your-project-name.vercel.app/api

# Create a user
curl -X POST https://your-project-name.vercel.app/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "individual"
  }'

# Login
curl -X POST https://your-project-name.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

## 📁 Project Structure

```
src/
├── auth/           # Authentication module
├── users/          # User management
├── content/        # Content management
├── projects/       # Project management
├── media-types/    # Media type management
├── common/         # Shared utilities
└── main.ts         # Application entry point

api/
└── index.ts        # Vercel serverless entry point
```

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `DEPLOYMENT.md` - Detailed deployment guide

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Verify environment variables are set correctly
   - Ensure database allows external connections
   - Check database provider's connection limits

2. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript compilation with `npm run build`

3. **CORS Issues**
   - API is configured to allow all origins
   - Update CORS settings in `api/index.ts` if needed

4. **Environment Variables**
   - Redeploy after setting environment variables
   - Check variable names for typos

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- [NestJS Documentation](https://docs.nestjs.com/)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
