#!/bin/bash

echo "🚀 Building Team Task Manager for Railway Deployment..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "🔨 Building frontend..."
npm run build

# Verify build exists
if [ -f "dist/index.html" ]; then
    echo "✅ Frontend build successful! index.html found in dist/"
else
    echo "❌ Frontend build failed! index.html not found in dist/"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Frontend build is in: frontend/dist"
echo "🚀 Ready for Railway deployment!"

cd ..