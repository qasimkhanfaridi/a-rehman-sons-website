const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy recursive function
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Items to copy into distribution bundle
const itemsToCopy = [
  'index.html',
  'about.html',
  'products.html',
  'certifications.html',
  'clients.html',
  'international.html',
  'order.html',
  'contact.html',
  'products',
  'css',
  'js',
  'assets',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'favicon.ico',
  'favicon.svg',
  'favicon-48x48.png',
  'favicon-96x96.png',
  'favicon-192x192.png',
  'favicon-512x512.png',
  'apple-touch-icon.png',
  'site.webmanifest'
];

for (const item of itemsToCopy) {
  const srcPath = path.join(__dirname, item);
  const destPath = path.join(distDir, item);
  if (fs.existsSync(srcPath)) {
    copyRecursive(srcPath, destPath);
    console.log(`Copied ${item} -> dist/${item}`);
  }
}

console.log('Build complete! Static files ready in /dist');
