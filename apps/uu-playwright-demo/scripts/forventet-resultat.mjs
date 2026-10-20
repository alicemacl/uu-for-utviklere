// Kjører testene og sjekker at akkurat de riktige feiler.
//
// Demoen er laget for å feile: broken og axe-green har feil med vilje. I CI vil vi derfor ikke ha
// «alt grønt», men «nøyaktig disse fem feiler, og resten passerer». Da blir pipelinen rød både hvis
// noen fikser en feil som skal vises på scenen, og hvis noe går i stykker på fixed.
//
// Bruk: pnpm test:ci

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const FORVENTET_FEIL = [
  'axe: ingen WCAG A/AA-brudd på /broken',
  '/broken › «Send inn» og «Avbryt» er knapper',
  '/broken › tab-rekkefølgen følger den visuelle rekkefølgen',
  '/axe-green › «Send inn» og «Avbryt» er knapper',
  '/axe-green › tab-rekkefølgen følger den visuelle rekkefølgen',
];

const resultatfil = 'test-results/resultat.json';
spawnSync('pnpm', ['exec', 'playwright', 'test', '--reporter=list,json'], {
  stdio: 'inherit',
  env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_FILE: resultatfil },
});

const rapport = JSON.parse(readFileSync(resultatfil, 'utf8'));
const feilet = [];
const bestatt = [];

function gaGjennom(suite, sti) {
  // Øverste nivå er filen – den er ikke med i navnet
  const nySti = suite.title && !suite.title.endsWith('.ts') ? [...sti, suite.title] : sti;
  for (const spec of suite.specs ?? []) {
    const navn = [...nySti, spec.title].join(' › ');
    const ok = spec.tests.every((t) => t.results.at(-1)?.status === 'passed');
    (ok ? bestatt : feilet).push(navn);
  }
  for (const under of suite.suites ?? []) gaGjennom(under, nySti);
}
for (const suite of rapport.suites) gaGjennom(suite, []);

const uventetFeil = feilet.filter((n) => !FORVENTET_FEIL.includes(n));
const uventetBestatt = FORVENTET_FEIL.filter((n) => !feilet.includes(n));

console.log(`\n${feilet.length} feilet (forventet ${FORVENTET_FEIL.length}), ${bestatt.length} passerte.`);
if (uventetFeil.length) console.log('\nFeilet, men skulle passere:\n  ' + uventetFeil.join('\n  '));
if (uventetBestatt.length) console.log('\nSkulle feile, men gjorde det ikke (er en demo-feil blitt fikset?):\n  ' + uventetBestatt.join('\n  '));

if (uventetFeil.length || uventetBestatt.length) process.exit(1);
console.log('Akkurat som forventet: demo-feilene feiler, og resten passerer.');
