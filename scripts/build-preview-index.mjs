import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const [deployDir, ...slugs] = process.argv.slice(2);
const rootDir = dirname(deployDir);

function titleFor(slug) {
  const readmePath = join(rootDir, slug, 'README.md');
  if (existsSync(readmePath)) {
    const first = readFileSync(readmePath, 'utf-8')
      .split('\n')
      .find((line) => line.startsWith('# '));
    if (first) return first.replace(/^#\s*/, '');
  }
  return slug;
}

const items = slugs.map((slug) => `<li><a href="/${slug}/">${titleFor(slug)}</a></li>`).join('\n');

const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>React для Vue-разработчиков — превью</title>
<style>
  body { font-family: system-ui, sans-serif; background: #14141c; color: #f2f2f5; max-width: 640px; margin: 40px auto; padding: 0 24px; }
  a { color: #8ab4ff; }
  li { margin-bottom: 8px; }
</style>
</head>
<body>
<h1>React для Vue-разработчиков</h1>
<p>Превью эталонных решений по модулям курса. Обновляется по мере готовности новых модулей.</p>
<ul>
${items}
</ul>
</body>
</html>
`;

writeFileSync(join(deployDir, 'index.html'), html);
console.log('Wrote', join(deployDir, 'index.html'));
