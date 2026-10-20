import { uuEslint } from '@uu/config/eslint';

// broken og axe-green har feil med vilje. Der gir jsx-a11y advarsler i stedet for feil,
// så `pnpm lint` viser hvilke av feilene lint fanger.
export default uuEslint({
  feilFiler: ['app/*uten-lang*/**', 'app/*/axe-green/**'],
});
