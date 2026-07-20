import { readFileSync, writeFileSync } from 'node:fs';

const [, , file, slug] = process.argv;
let html = readFileSync(file, 'utf-8');

const banner = `<a href="/${slug}/" style="position:fixed;top:8px;left:8px;z-index:9999;background:#2a5bd7;color:#fff;padding:6px 12px;border-radius:6px;font-family:system-ui,sans-serif;font-size:13px;text-decoration:none;">← Модуль</a>`;

html = html.replace('<body>', `<body>${banner}`);
writeFileSync(file, html);
