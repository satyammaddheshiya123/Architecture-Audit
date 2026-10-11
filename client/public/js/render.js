// Pure DOM helpers. Text goes in via textContent, so API data can never inject markup.
export function renderIssues(tbody, issues) {
  tbody.replaceChildren(
    ...issues.map((issue) => {
      const tr = document.createElement('tr');
      const cell = (text, cls) => {
        const td = document.createElement('td');
        td.textContent = text;
        if (cls) td.className = cls;
        return td;
      };
      tr.append(
        cell(issue.id),
        cell(issue.component),
        cell(issue.wcag),
        cell(issue.severity, `sev sev-${issue.severity}`),
        cell(issue.fix)
      );
      return tr;
    })
  );
}
