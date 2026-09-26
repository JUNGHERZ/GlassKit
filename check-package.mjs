// ============================================================
// GlassKit – Package Contents
//
// Checks what `npm pack` would publish: every entry point of
// package.json (main, style, exports), the documents the README
// sends a reader to (SKILL.md, CHANGELOG.md), and any source map a
// shipped file names. Up to 1.19.0 glasskit.min.css ended in a
// sourceMappingURL comment for a map `files` did not list, so
// jsDelivr and unpkg answered it with a 404.
// The same check as NotionKit's check:package.
//
// Usage:  npm run check:package   (after npm run build)
// ============================================================
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { posix } from 'node:path';

const REQUIRED = ['package.json', 'README.md', 'LICENSE', 'CHANGELOG.md', 'SKILL.md', 'glasskit.css', 'glasskit.min.css', 'glasskit-styles.js', 'theme-override.css'];

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
const packed = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { encoding: 'utf-8' }));
// npm 10 prints a list of packages, npm 12 an object keyed by package name.
const [{ files }] = Array.isArray(packed) ? packed : Object.values(packed);
const shipped = new Set(files.map(f => f.path));
const problems = [];

/** The file paths an `exports` value points to, conditions and subpaths included. */
const targets = value => typeof value === 'string' ? [value]
  : value && typeof value === 'object' ? Object.values(value).flatMap(targets) : [];

for (const file of new Set([...REQUIRED, pkg.main, pkg.module, pkg.style, ...targets(pkg.exports)].filter(Boolean))) {
  const path = file.replace(/^\.\//, '');
  if (path.includes('*')) {
    // A subpath pattern: at least one shipped file has to match it.
    const re = new RegExp(`^${path.split('*').map(part => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]+')}$`);
    if (![...shipped].some(f => re.test(f))) problems.push(`nothing in the package matches ${file}`);
  } else if (!shipped.has(path)) problems.push(`${file} is not in the package`);
}

// A source map comment points next to its file, so the map has to ship too.
for (const file of shipped) {
  if (!/\.(css|js)$/.test(file)) continue;
  for (const [, url] of readFileSync(file, 'utf-8').matchAll(/[#@] sourceMappingURL=([^\s*]+)/g)) {
    if (!shipped.has(posix.join(posix.dirname(file), url))) problems.push(`${file} names ${url}, which is not in the package`);
  }
}

console.log(`${pkg.name}@${pkg.version}: ${shipped.size} files`);
if (problems.length) {
  for (const p of problems) console.error(`::error::${p}`);
  process.exit(1);
}
console.log('✅ the package carries every file it points to');
