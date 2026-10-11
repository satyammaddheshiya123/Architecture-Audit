// The only place the client knows about the server's URLs.
export async function fetchIssues(severity = '') {
  const qs = severity ? `?severity=${encodeURIComponent(severity)}` : '';
  const res = await fetch(`/api/issues${qs}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}
