import { readFile } from 'node:fs/promises';
import { parseCsvToObjects } from '../lib/csv.js';

export const SEVERITIES = ['High', 'Medium', 'Low'];

// CSV columns are snake_case (template format); the API exposes camelCase.
function toIssue(r) {
  return {
    id: r.issue_id,
    component: r.page_or_component,
    wcag: r.wcag_reference,
    evidence: r.evidence,
    severity: r.severity,
    userImpact: r.user_impact,
    fix: r.recommended_fix,
    owner: r.owner,
    status: r.status,
  };
}

export function createIssuesService(csvPath) {
  async function list({ severity } = {}) {
    const text = await readFile(csvPath, 'utf-8');
    const issues = parseCsvToObjects(text).map(toIssue);
    return severity ? issues.filter((i) => i.severity === severity) : issues;
  }
  return { list };
}
