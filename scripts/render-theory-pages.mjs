import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DEPLOY = join(ROOT, 'deploy');
const ASSETS = join(__dirname, 'site-assets');

const ROADMAP_TABLE_RE = /\|\s*Модуль\s*\|\s*Тема\s*\|\s*Ведёт по теме\s*\|\n(?:\|[^\n]*\n?)+/;
const ROADMAP_ROW_RE = /^\|\s*\[([^\]]+)\]\([^)]*\)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/gm;

function titleFromMarkdown(md, fallback) {
  const first = md.split('\n').find((line) => line.startsWith('# '));
  return first ? first.replace(/^#\s*/, '') : fallback;
}

// Parsed once from the root README's roadmap table — gives us the
// pedagogically correct module order (00, assessment, 01..10), the one-line
// topic per module, and which crew member leads it, all without duplicating
// that information a second time inside this script.
function loadModules() {
  const rootReadme = readFileSync(join(ROOT, 'README.md'), 'utf-8');
  const tableMatch = rootReadme.match(ROADMAP_TABLE_RE);
  if (!tableMatch) return [];

  const modules = [];
  let row;
  ROADMAP_ROW_RE.lastIndex = 0;
  while ((row = ROADMAP_ROW_RE.exec(tableMatch[0]))) {
    const [, slug, topic, crew] = row;
    const dir = join(ROOT, slug);
    if (!existsSync(join(dir, 'README.md'))) continue;
    modules.push({
      slug,
      topic,
      crew,
      title: titleFromMarkdown(readFileSync(join(dir, 'README.md'), 'utf-8'), slug),
      hasApp: existsSync(join(dir, 'solution', 'package.json')),
    });
  }
  return modules;
}

// README.md links make sense on GitHub but not on the deployed site, where each
// module is served as a folder (index.html), not a literal README.md file.
function rewriteReadmeLinks(html) {
  return html.replace(/href="([^"]*)\/README\.md"/g, 'href="$1/"').replace(/href="README\.md"/g, 'href="./"');
}

function iconSun() {
  return `<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;
}

function iconMoon() {
  return `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>`;
}

function moduleGrid(modules) {
  const cards = modules
    .map((m) => {
      const num = /^\d\d-/.test(m.slug) ? m.slug.slice(0, 2) : null;
      const badge = num ? `Модуль ${num}` : m.slug === 'assessment' ? 'Диагностика' : 'Старт';
      return `<a class="module-card" href="/${m.slug}/">
        <span class="module-card-num">${badge}</span>
        <div class="module-card-title">${marked.parseInline(m.topic)}</div>
        <div class="module-card-crew">${marked.parseInline(m.crew)}</div>
      </a>`;
    })
    .join('\n');
  return `<div class="module-grid">${cards}</div>`;
}

function sidebarNav(modules, activeSlug) {
  const items = modules
    .map((m) => {
      const active = m.slug === activeSlug ? ' class="active"' : '';
      return `<li${active}><a href="/${m.slug}/">${m.title}</a></li>`;
    })
    .join('\n');
  return `<nav class="sidebar" id="sidebar">
    <div class="sidebar-group">Модули</div>
    <ul>${items}</ul>
  </nav>`;
}

function pageNav(modules, activeSlug) {
  const index = modules.findIndex((m) => m.slug === activeSlug);
  if (index === -1) return '';
  const prev = modules[index - 1];
  const next = modules[index + 1];
  if (!prev && !next) return '';
  return `<footer class="page-nav">
    ${prev ? `<a href="/${prev.slug}/"><span class="page-nav-label">← Назад</span>${prev.title}</a>` : '<span></span>'}
    ${next ? `<a class="page-nav-next" href="/${next.slug}/"><span class="page-nav-label">Дальше →</span>${next.title}</a>` : ''}
  </footer>`;
}

function pageShell({ title, bodyHtml, isHub, appLink, modules, activeSlug }) {
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title} — React для Vue-разработчиков</title>
<link rel="stylesheet" href="/theme.css" />
<script>
(function(){
  var stored = localStorage.getItem('theme');
  var theme = stored === 'light' || stored === 'dark' ? stored : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
</script>
</head>
<body>
  <header class="topbar">
    <div class="topbar-left">
      <button class="icon-btn sidebar-toggle" aria-label="Меню">☰</button>
      <a class="brand" href="/">
        🚀 <span class="brand-full">React для Vue-разработчиков</span>
      </a>
    </div>
    <div class="topbar-actions">
      ${appLink ? `<a class="app-link" href="${appLink}">Открыть приложение →</a>` : ''}
      <button class="icon-btn theme-toggle" aria-label="Переключить тему">
        ${iconSun()}
        ${iconMoon()}
      </button>
    </div>
  </header>
  <div class="layout">
    ${sidebarNav(modules, activeSlug)}
    <main class="content">
      ${bodyHtml}
      ${isHub ? '' : pageNav(modules, activeSlug)}
    </main>
  </div>
  <script src="/site.js" defer></script>
</body>
</html>
`;
}

// Assessment quiz rendering ------------------------------------------------
//
// assessment/README.md authors each question as a GFM task list
// (`- [ ] wrong option` / `- [x] correct option`) so the answer key lives
// right next to the option text in the source. Marked's default renderer
// would turn `[x]` into a *disabled, pre-checked* checkbox — the correct
// answer shows up ticked before the learner does anything. We parse that
// same task-list markdown ourselves and emit real, unchecked, clickable
// checkboxes plus a per-question "Проверить" button instead.
function renderAssessmentQuiz(md) {
  const chunks = md.split(/\n---\n/);
  const intro = chunks[0];
  const outro = chunks[chunks.length - 1];
  const questionChunks = chunks.slice(1, -1);

  const questionsHtml = questionChunks
    .map((chunk, index) => renderQuizQuestion(chunk, index + 1))
    .join('\n<hr />\n');

  return `${marked.parse(intro)}\n<hr />\n${questionsHtml}\n<hr />\n${marked.parse(outro)}`;
}

function renderQuizQuestion(chunk, number) {
  const headingMatch = chunk.match(/^###\s*\d+\.\s*(.+)$/m);
  const heading = headingMatch ? headingMatch[1] : `Вопрос ${number}`;

  const codeMatch = chunk.match(/```(\w*)\n([\s\S]*?)```/);
  const codeHtml = codeMatch ? marked.parse('```' + codeMatch[1] + '\n' + codeMatch[2] + '```') : '';

  let rest = chunk;
  if (headingMatch) rest = rest.slice(rest.indexOf(headingMatch[0]) + headingMatch[0].length);
  if (codeMatch) rest = rest.slice(rest.indexOf(codeMatch[0]) + codeMatch[0].length);

  const optionRe = /^- \[( |x)\]\s*(.+)$/gm;
  const promptEnd = rest.search(optionRe);
  const prompt = (promptEnd === -1 ? rest : rest.slice(0, promptEnd)).trim();
  const promptHtml = prompt ? marked.parseInline(prompt) : '';

  const options = [];
  let match;
  optionRe.lastIndex = 0;
  while ((match = optionRe.exec(rest))) {
    const correct = match[1] === 'x';
    const [label, verdict] = splitLabelVerdict(match[2]);
    options.push({ correct, label, verdict });
  }

  const pointerMatch = rest.match(/^→\s*(.+)$/m);
  const pointerText = pointerMatch ? marked.parseInline(linkifyModuleRefs(pointerMatch[1])) : '';

  const optionsHtml = options
    .map(
      (opt, i) => `<label class="quiz-option" data-correct="${opt.correct}">
        <div class="quiz-option-row">
          <input type="checkbox" name="q${number}-${i}" />
          <span class="quiz-option-label">${marked.parseInline(opt.label)}</span>
        </div>
        <div class="quiz-feedback">${marked.parseInline(opt.verdict)}</div>
      </label>`,
    )
    .join('\n');

  return `<section class="quiz-question" data-qid="${number}">
    <h3>${number}. ${marked.parseInline(heading)}</h3>
    ${codeHtml}
    <p class="quiz-prompt">${promptHtml}</p>
    <div class="quiz-form">${optionsHtml}</div>
    <div class="quiz-actions">
      <button type="button" class="quiz-btn quiz-check-btn">Проверить ответ</button>
      <button type="button" class="quiz-btn quiz-btn-ghost quiz-reset-btn" hidden>Попробовать снова</button>
    </div>
    <div class="quiz-result" hidden>
      <p class="quiz-result-banner"></p>
      <p class="quiz-pointer">${pointerText}</p>
    </div>
  </section>`;
}

// "Text. — Верно: explanation" / "Text. — Неверно: explanation" — split at
// the LAST " — " that precedes the verdict word, since option text can
// itself contain plain em dashes (e.g. "1 — и дальше не меняется.").
function splitLabelVerdict(text) {
  const splitPoint = text.search(/\s—\s(?=Верно|Неверно)/);
  if (splitPoint === -1) return [text, ''];
  return [text.slice(0, splitPoint).trim(), text.slice(splitPoint).replace(/^\s—\s/, '').trim()];
}

function linkifyModuleRefs(text) {
  return text.replace(/\*\*([\w-]+)\*\*/g, (full, slug) => `[**${slug}**](/${slug}/)`);
}

function renderOne(slug, dir, modules) {
  const readmePath = join(dir, 'README.md');
  const md = readFileSync(readmePath, 'utf-8');
  const isHub = slug === '';
  const title = titleFromMarkdown(md, isHub ? 'react-for-vue-devs' : slug);
  const hasApp = !isHub && existsSync(join(dir, 'solution', 'package.json'));

  let bodyHtml;
  if (slug === 'assessment') {
    bodyHtml = renderAssessmentQuiz(md);
  } else if (isHub) {
    const withoutTable = md.replace(ROADMAP_TABLE_RE, '%%MODULE_GRID%%\n');
    bodyHtml = marked.parse(withoutTable).replace(/<p>%%MODULE_GRID%%<\/p>/, moduleGrid(modules));
  } else {
    bodyHtml = marked.parse(md);
  }
  bodyHtml = rewriteReadmeLinks(bodyHtml);

  const outDir = isHub ? DEPLOY : join(DEPLOY, slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    join(outDir, 'index.html'),
    pageShell({ title, bodyHtml, isHub, appLink: hasApp ? `/${slug}/app/` : null, modules, activeSlug: slug }),
  );
  console.log('Rendered theory page:', isHub ? '/ (hub)' : `/${slug}/`);
}

mkdirSync(DEPLOY, { recursive: true });
copyFileSync(join(ASSETS, 'theme.css'), join(DEPLOY, 'theme.css'));
copyFileSync(join(ASSETS, 'site.js'), join(DEPLOY, 'site.js'));

const modules = loadModules();
renderOne('', ROOT, modules);
for (const m of modules) {
  renderOne(m.slug, join(ROOT, m.slug), modules);
}
