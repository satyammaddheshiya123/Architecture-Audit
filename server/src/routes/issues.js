import { SEVERITIES } from '../services/issuesService.js';

export function issuesRoutes(service) {
  return {
    'GET /api/issues': async (_req, url) => {
      const severity = url.searchParams.get('severity') || undefined;
      if (severity && !SEVERITIES.includes(severity)) {
        return { status: 400, body: { error: `severity must be one of: ${SEVERITIES.join(', ')}` } };
      }
      const issues = await service.list({ severity });
      return { status: 200, body: { count: issues.length, issues } };
    },
  };
}
