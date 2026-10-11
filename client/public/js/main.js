import { fetchIssues } from './api.js';
import { renderIssues } from './render.js';

const select = document.getElementById('severity');
const table = document.getElementById('issues-table');
const status = document.getElementById('status');

async function load() {
  status.textContent = 'Loading issues…';
  try {
    const { count, issues } = await fetchIssues(select.value);
    renderIssues(table.tBodies[0], issues);
    table.hidden = count === 0;
    // Announced politely to screen readers via role="status".
    status.textContent = count === 0 ? 'No issues match this filter.' : `Showing ${count} issue${count === 1 ? '' : 's'}.`;
  } catch (err) {
    table.hidden = true;
    status.textContent = 'Could not load issues. Is the API running (npm run dev)?';
    console.error(err);
  }
}

select.addEventListener('change', load);
load();
