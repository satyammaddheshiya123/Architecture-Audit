import http from 'node:http';
import { createIssuesService } from './services/issuesService.js';
import { issuesRoutes } from './routes/issues.js';

// Builds the HTTP server. No framework on purpose (see docs/adr/0001-zero-dependency-baseline.md).
export function createApp({ issuesCsvPath }) {
  const issuesService = createIssuesService(issuesCsvPath);
  const routes = {
    'GET /api/health': async () => ({ status: 200, body: { status: 'ok' } }),
    ...issuesRoutes(issuesService),
  };

  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const handler = routes[`${req.method} ${url.pathname}`];
    let result;
    try {
      result = handler
        ? await handler(req, url)
        : { status: 404, body: { error: 'Not found' } };
    } catch (err) {
      console.error(err);
      result = { status: 500, body: { error: 'Internal server error' } };
    }
    res.writeHead(result.status, {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(JSON.stringify(result.body));
  });
}
