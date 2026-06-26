const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');

console.log('Starting build process...');

// 1. Clean dist directory
if (fs.existsSync(distPath)) {
  console.log('Cleaning existing dist directory...');
  fs.rmSync(distPath, { recursive: true, force: true });
}

// 2. Recreate dist directory
fs.mkdirSync(distPath, { recursive: true });
console.log('Created dist directory.');

// 3. Files to copy directly to dist
const filesToCopy = [
  'index.html',
  'sitemap.xml',
  'robots.txt',
  'vercel.json'
];

filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(distPath, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to dist/`);
  } else {
    console.warn(`Warning: ${file} not found in workspace root.`);
  }
});

// 4. Directories to copy to dist
const dirsToCopy = [
  'css',
  'js',
  'public'
];

dirsToCopy.forEach(dir => {
  const src = path.join(__dirname, dir);
  const dest = path.join(distPath, dir);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`Copied directory ${dir}/ to dist/${dir}/`);
  } else {
    console.warn(`Warning: Directory ${dir}/ not found in workspace root.`);
  }
});

console.log('Build completed successfully!');
