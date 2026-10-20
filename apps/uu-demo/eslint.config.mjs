import { uuEslint } from '@uu/config/eslint';

const feilFiler = [
  'eksempler/**/*.feil.tsx',
  'eksempler/finn-feilen/**/*.oppgave.tsx',
  'app/*fjordvik-feil*/**',
];

// Filene med feil med vilje gir advarsler i stedet for feil.
// Kjør `pnpm lint` for å se hvilke av feilene lint fanger – og hvilke den ikke ser.
export default [
  ...uuEslint({ feilFiler }),
  {
    // Bare UU-regler i feilfilene, så lint-demoen handler om det den skal
    files: feilFiler,
    rules: { '@next/next/no-location-assign-relative-destination': 'off' },
  },
];
