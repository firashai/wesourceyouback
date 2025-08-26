@echo off
echo 🚀 Media Brokerage API - Vercel Deployment Script
echo ==================================================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI is not installed. Installing now...
    npm install -g vercel
)

REM Check if user is logged in to Vercel
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Please log in to Vercel...
    vercel login
)

echo 📦 Building the application...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed! Please check your code and try again.
    pause
    exit /b 1
)

echo 🌐 Deploying to Vercel...
vercel --prod

echo 🎉 Deployment completed!
echo.
echo 📋 Next steps:
echo 1. Set up your environment variables in Vercel dashboard
echo 2. Configure your database connection
echo 3. Test your API endpoints
echo.
echo 📖 For detailed instructions, see DEPLOYMENT.md
pause
