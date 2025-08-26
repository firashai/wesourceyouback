#!/bin/bash

echo "🚀 Media Brokerage API - Vercel Deployment Script"
echo "=================================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing now..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    vercel login
fi

echo "📦 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please check your code and try again."
    exit 1
fi

echo "🌐 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your environment variables in Vercel dashboard"
echo "2. Configure your database connection"
echo "3. Test your API endpoints"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
