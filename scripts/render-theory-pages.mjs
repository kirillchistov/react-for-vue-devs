import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DEPLOY = join(ROOT, 'deploy');

const EXCLUDE = new Set(['node_modules', 'deploy', 'scripts', 'tmp']);

function findModuleSlugs() {
  return readdirSync(ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && !EXCLUDE.has(entry.name))
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(ROOT, name, 'README.md')))
    .sort();
}

function titleFromMarkdown(md, fallback) {
  const first = md.split('\n').find((line) => line.startsWith('# '));
  return first ? first.replace(/^#\s*/, '') : fallback;
}

// README.md links make sense on GitHub but not on the deployed site, where each
// module is served as a folder (index.html), not a literal README.md file.
function rewriteReadmeLinks(html) {
  return html
    .replace(/href="([^"]*)\/README\.md"/g, 'href="$1/"')
    .replace(/href="README\.md"/g, 'href="./"');
}

function pageShell({ title, bodyHtml, isHub, appLink }) {
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title} — React для Vue-разработчиков</title>
<style>
  :root { color-scheme: dark; }
  body { font-family: system-ui, sans-serif; background: #14141c; color: #f2f2f5; max-width: 780px; margin: 0 auto; padding: 24px 24px 64px; line-height: 1.6; }
  a { color: #8ab4ff; }
  h1, h2, h3 { line-height: 1.3; }
  h1 { font-size: 1.8rem; }
  h2 { margin-top: 2em; border-top: 1px solid #33333f; padding-top: 1em; }
  pre { background: #1c1c26; border: 1px solid #33333f; border-radius: 8px; padding: 12px 16px; overflow-x: auto; }
  code { font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 0.92em; }
  :not(pre) > code { background: #1c1c26; padding: 0.1em 0.4em; border-radius: 4px; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; display: block; overflow-x: auto; }
  th, td { border: 1px solid #33333f; padding: 8px 10px; text-align: left; vertical-align: top; }
  th { background: #1c1c26; }
  details { border: 1px solid #33333f; border-radius: 8px; padding: 12px 16px; margin: 12px 0; }
  summary { cursor: pointer; font-weight: 600; }
  .top-nav { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 24px; font-size: 0.9rem; flex-wrap: wrap; }
  .app-link { display: inline-block; margin: 24px 0; padding: 10px 18px; background: #2a5bd7; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; }
  .app-link:hover { background: #3568e0; }
  hr { border: none; border-top: 1px solid #33333f; margin: 2em 0; }
</style>
</head>
<body>
  ${isHub ? '' : `<nav class="top-nav"><a href="/">← Все модули</a>${appLink ? `<a class="app-link" href="${appLink}">Открыть приложение →</a>` : ''}</nav>`}
  ${bodyHtml}
  ${isHub ? '' : '<hr /><a href="/">← Все модули</a>'}
</body>
</html>
`;
}

function renderOne(slug, dir) {
  const readmePath = join(dir, 'README.md');
  const md = readFileSync(readmePath, 'utf-8');
  const isHub = slug === '';
  const title = titleFromMarkdown(md, isHub ? 'react-for-vue-devs' : slug);
  const hasApp = !isHub && existsSync(join(dir, 'solution', 'package.json'));
  const bodyHtml = rewriteReadmeLinks(marked.parse(md));

  const outDir = isHub ? DEPLOY : join(DEPLOY, slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), pageShell({ title, bodyHtml, isHub, appLink: hasApp ? `/${slug}/app/` : null }));
  console.log('Rendered theory page:', isHub ? '/ (hub)' : `/${slug}/`);
}

mkdirSync(DEPLOY, { recursive: true });
renderOne('', ROOT);
for (const slug of findModuleSlugs()) {
  renderOne(slug, join(ROOT, slug));
}
