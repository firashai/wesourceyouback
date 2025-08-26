# Media Brokerage API - Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install with `npm i -g vercel`
3. **Database**: Set up a MySQL database (you can use PlanetScale, Railway, or any MySQL provider)
4. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Environment Variables Setup

Before deploying, you need to set up the following environment variables in Vercel:

### Required Environment Variables:

```bash
# Database Configuration
DB_HOST=your_database_host
DB_PORT=3306
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Application Configuration
NODE_ENV=production
```

## Deployment Steps

### Method 1: Using Vercel CLI

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy from your project directory**:
   ```bash
   vercel
   ```

3. **Set environment variables**:
   ```bash
   vercel env add DB_HOST
   vercel env add DB_USERNAME
   vercel env add DB_PASSWORD
   vercel env add DB_NAME
   vercel env add JWT_SECRET
   vercel env add JWT_REFRESH_SECRET
   ```

4. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

### Method 2: Using Vercel Dashboard

1. **Connect your repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository

2. **Configure the project**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set environment variables**:
   - Go to Project Settings → Environment Variables
   - Add all required environment variables listed above

4. **Deploy**:
   - Click "Deploy"

## Available Endpoints

Once deployed, your API will be available at `https://your-project-name.vercel.app`

### Authentication Endpoints:
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token

### User Endpoints:
- `POST /users` - Create user
- `GET /users` - Get all users (protected)
- `GET /users/:id` - Get user by ID (protected)

### Content Endpoints:
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

### Project Endpoints:
- `POST /projects` - Create project (protected)
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `PATCH /projects/:id` - Update project (protected)
- `DELETE /projects/:id` - Delete project (protected)

### Media Types Endpoints:
- `GET /media-types` - Get all media types
- `GET /media-types/:id` - Get media type by ID
- `POST /media-types` - Create media type (protected)
- `PATCH /media-types/:id` - Update media type (protected)
- `DELETE /media-types/:id` - Delete media type (protected)

### API Documentation:
- `GET /api` - Swagger API documentation

## Testing Your Deployment

1. **Check if the API is running**:
   ```bash
   curl https://your-project-name.vercel.app/api
   ```

2. **Test user registration**:
   ```bash
   curl -X POST https://your-project-name.vercel.app/users \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123",
       "firstName": "John",
       "lastName": "Doe",
       "userType": "individual"
     }'
   ```

3. **Test login**:
   ```bash
   curl -X POST https://your-project-name.vercel.app/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

## Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Ensure your database is accessible from Vercel's servers
   - Check if your database provider allows external connections
   - Verify environment variables are correctly set

2. **Build Errors**:
   - Check if all dependencies are in `package.json`
   - Ensure TypeScript compilation is successful locally

3. **CORS Issues**:
   - The API is configured to allow all origins in production
   - If you need specific origins, update the CORS configuration in `api/index.ts`

4. **Environment Variables Not Working**:
   - Redeploy after setting environment variables
   - Check variable names for typos
   - Ensure variables are set for the correct environment (Production)

### Getting Help:

- Check Vercel deployment logs in the dashboard
- Review the build output for any errors
- Test your API locally first to ensure it works

## Security Notes

1. **JWT Secrets**: Use strong, unique secrets for JWT tokens
2. **Database**: Use a production-ready database with proper security
3. **Environment Variables**: Never commit sensitive data to your repository
4. **CORS**: Configure CORS properly for your frontend domain in production
