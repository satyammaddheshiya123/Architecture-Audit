// Tiny static dev server for client/public. Proxies /api/* to the server so the browser sees one origin.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public');
const port = Number(process.env.CLIENT_PORT || 5173);
const api = new URL(process.env.API_ORIGIN || 'http://localhost:3000');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname.startsWith('/api/')) {
    const upstream = http.request(
      { hostname: api.hostname, port: api.port, path: url.pathname + url.search, method: req.method, headers: { accept: 'application/json' } },
      (up) => { res.writeHead(up.statusCode, up.headers); up.pipe(res); }
    );
    upstream.on('error', () => { res.writeHead(502, { 'Content-Type': 'application/json' }); res.end('{"error":"API unreachable"}'); });
    return upstream.end();
  }

  const rel = url.pathname === '/' ? '/index.html' : url.pathname;
  const file = path.join(root, path.normalize(rel));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
}).listen(port, () => console.log(`Client on http://localhost:${port}`));
