import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..', '..');

export const config = {
  port: Number(process.env.PORT || 3000),
  // Single source of truth for the first vertical slice: the audit worksheet itself.
  issuesCsvPath: process.env.ISSUES_CSV || path.join(repoRoot, 'docs', 'audit', 'accessibility-audit.csv'),
};
