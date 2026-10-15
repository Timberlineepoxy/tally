// Checks every theme for readable text (WCAG contrast). Run: node tools/contrast.js
global.window = {};
require('../themes.js');
const T = window.TALLY_THEMES;
const lum = hex => {
  const c = hex.replace('#', '').match(/../g).map(h => parseInt(h, 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
// [text, background, minimum]: 4.5 for words, 3 for big numbers and icons
const checks = [
  ['ink', 'bg', 4.5], ['ink', 'surface', 4.5], ['ink', 'cell', 4.5], ['ink', 'soft', 4.5],
  ['muted', 'bg', 4.5], ['muted', 'surface', 4.5], ['muted', 'cell', 4.5],
  ['aink', 'accent', 4.5], ['atext', 'surface', 4.5], ['atext', 'soft', 4.5], ['atext', 'bg', 4.5],
  ['bad', 'surface', 4.5], ['good', 'surface', 4.5], ['gold', 'surface', 3],
  ['surface', 'good', 4.5], ['surface', 'bad', 4.5], ['screen', 'ink', 4.5]
];
let fails = 0;
for (const [k, t] of Object.entries(T)) {
  const bad = checks.map(([a, b, m]) => [a, b, m, ratio(t[a], t[b])]).filter(x => x[3] < x[2]);
  const low = Math.min(...checks.map(([a, b]) => ratio(t[a], t[b])));
  console.log((bad.length ? 'FAIL ' : 'ok   ') + t.name.padEnd(13) + ' lowest ' + low.toFixed(2) + (bad.length ? '  ' + bad.map(x => `${x[0]} on ${x[1]} ${x[3].toFixed(2)} (need ${x[2]})`).join(', ') : ''));
  fails += bad.length;
}
process.exit(fails ? 1 : 0);
