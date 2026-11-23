import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>500 Internal Server Error</h1>', 'utf-8');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  // Handle CORS for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Clean URL path
  let urlPath = new URL(req.url, `http://localhost:${PORT}`).pathname;

  // Default to index.html for root
  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  // Remove leading slash for path joining
  const relativePath = urlPath.replace(/^\//, '');
  const filePath = path.join(PUBLIC_DIR, relativePath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>403 Forbidden</h1>', 'utf-8');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try to serve index.html for client-side routing (SPA fallback)
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.stat(indexPath, (indexErr) => {
        if (!indexErr) {
          serveFile(res, indexPath, 'text/html; charset=utf-8');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('<h1>404 Not Found</h1>', 'utf-8');
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    serveFile(res, filePath, contentType);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 AUDIRA website running at http://localhost:${PORT}`);
  console.log(`📁 Serving from: ${PUBLIC_DIR}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => process.exit(0));
});