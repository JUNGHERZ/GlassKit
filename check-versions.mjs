// ============================================================
// GlassKit – Version Consistency Check
//
// The version is written out by hand in the README badges, on the three
// HTML pages and in the stylesheet header. Every release so far has left at
// least one of them behind — the changelog badge sat five minor versions
// back before anyone noticed, because nothing renders wrong when it is stale.
//
// This walks the places that name a version and fails if any of them
// disagrees with package.json.
//
// Usage:  npm run check:versions
// ============================================================

import { readFileSync, existsSync } from 'fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
const VERSION = pkg.version;
const [MAJOR, MINOR] = VERSION.split('.');
const CDN_PIN = `${MAJOR}.${MINOR}`;   // CDN URLs pin major.minor, not the patch

const FILES = ['README.md', 'SKILL.md', 'index.html', 'docs.html', 'showcase.html', 'glasskit.css'];

// Each pattern anchors on the surrounding markup rather than on a bare number,
// so prose like "since 1.10.0" stays untouched — those references are history
// and must not be rewritten.
const LABELS = [
  ['shields badge',        /badge\/(?:version|changelog)-v?(\d+\.\d+\.\d+)/g],
  ['header version',       /class="header__version">v(\d+\.\d+\.\d+)/g],
  ['docs sidebar',         /class="docs-sidebar__version">v(\d+\.\d+\.\d+)/g],
  ['docs hero badge',      /class="docs-hero__badge">v(\d+\.\d+\.\d+)/g],
  ['showcase heading',     /Showcase v(\d+\.\d+\.\d+)/g],
  ['stylesheet header',    /Jungherz GmbH – v(\d+\.\d+\.\d+)/g],
  ['SKILL.md description', /library \(v(\d+\.\d+\.\d+)\)/g],
];

// CDN pins carry only major.minor and point at this package itself.
const CDN = [
  ['CDN pin',     /@jungherz-de\/glasskit@(\d+\.\d+)\//g, CDN_PIN],
  ['CDN pin tip', /Replace `@(\d+\.\d+)` with `@latest`/g, CDN_PIN],
];

const problems = [];
let found = 0;

for (const file of FILES) {
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf-8');
  const lines = text.split('\n');

  const check = (name, pattern, expected) => {
    for (const [i, line] of lines.entries()) {
      for (const match of line.matchAll(pattern)) {
        found++;
        if (match[1] !== expected) {
          problems.push(`${file}:${i + 1} – ${name} says ${match[1]}, expected ${expected}`);
        }
      }
    }
  };

  for (const [name, pattern] of LABELS) check(name, pattern, VERSION);
  for (const [name, pattern, expected] of CDN) check(name, pattern, expected);
}

// A renamed class would make every pattern above match nothing and the check
// would pass while saying nothing. Refuse to be that useless.
if (found === 0) {
  problems.push('no version label matched at all – the patterns in this script are out of date');
}

// The newest changelog entry belongs to the version being shipped, and its
// heading is reference syntax: without the matching link definition at the
// bottom GitHub renders a literal "[1.11.0]" instead of a link.
if (existsSync('CHANGELOG.md')) {
  const changelog = readFileSync('CHANGELOG.md', 'utf-8');
  const newest = changelog.match(/^## \[(\d+\.\d+\.\d+)\]/m);
  if (!newest) {
    problems.push('CHANGELOG.md – no "## [x.y.z]" entry found');
  } else if (newest[1] !== VERSION) {
    problems.push(`CHANGELOG.md – newest entry is ${newest[1]}, expected ${VERSION}`);
  } else if (!new RegExp(`^\\[${VERSION.replace(/\./g, '\\.')}\\]:`, 'm').test(changelog)) {
    problems.push(`CHANGELOG.md – entry ${VERSION} has no "[${VERSION}]: …" link definition`);
  }
}

if (problems.length) {
  for (const problem of problems) console.error(`::error::${problem}`);
  console.error(`\n✗ ${problems.length} version reference(s) out of step with package.json (${VERSION})`);
  process.exit(1);
}

console.log(`✅ ${found} version references agree with package.json (v${VERSION})`);
