const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Railway Deployment Setup...\n');

// Check if frontend build exists
const frontendDistPath = path.join(__dirname, 'frontend', 'dist');
const indexHtmlPath = path.join(frontendDistPath, 'index.html');

console.log('📁 Checking frontend build...');
if (fs.existsSync(frontendDistPath)) {
  console.log('✅ frontend/dist directory exists');
  
  if (fs.existsSync(indexHtmlPath)) {
    console.log('✅ frontend/dist/index.html exists');
  } else {
    console.log('❌ frontend/dist/index.html NOT found');
    console.log('🔧 Run: cd frontend && npm run build');
  }
} else {
  console.log('❌ frontend/dist directory NOT found');
  console.log('🔧 Run: cd frontend && npm install && npm run build');
}

// Check backend package.json
const backendPackagePath = path.join(__dirname, 'backend', 'package.json');
console.log('\n📦 Checking backend package.json...');
if (fs.existsSync(backendPackagePath)) {
  console.log('✅ backend/package.json exists');
  
  const packageJson = JSON.parse(fs.readFileSync(backendPackagePath, 'utf8'));
  if (packageJson.scripts && packageJson.scripts.start) {
    console.log('✅ start script found:', packageJson.scripts.start);
  } else {
    console.log('❌ start script NOT found in backend/package.json');
  }
} else {
  console.log('❌ backend/package.json NOT found');
}

// Check railway.toml
const railwayConfigPath = path.join(__dirname, 'railway.toml');
console.log('\n🚂 Checking Railway configuration...');
if (fs.existsSync(railwayConfigPath)) {
  console.log('✅ railway.toml exists');
} else {
  console.log('❌ railway.toml NOT found');
}

// Check Procfile
const procfilePath = path.join(__dirname, 'Procfile');
console.log('\n📋 Checking Procfile...');
if (fs.existsSync(procfilePath)) {
  console.log('✅ Procfile exists');
} else {
  console.log('❌ Procfile NOT found');
}

console.log('\n🎯 Environment Variables to set in Railway:');
console.log('MONGODB_URI=mongodb+srv://aarish:khan098@cluster0.zvootjk.mongodb.net/taskmanager');
console.log('NODE_ENV=production');
console.log('JWT_SECRET=team-task-manager-super-secret-jwt-key-for-production');
console.log('JWT_EXPIRE=30d');

console.log('\n🚀 If all checks pass, you\'re ready for Railway deployment!');