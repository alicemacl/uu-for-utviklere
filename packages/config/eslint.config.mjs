import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * Felles ESLint-oppsett for demo-appene.
 *
 * eslint-plugin-jsx-a11y kjøres med «strict»-reglene på all kode.
 * Filene som har UU-feil med vilje (`feilFiler`), får de samme reglene som advarsler.
 * Da viser `pnpm lint` nøyaktig hvilke av feilene lint fanger – uten å stoppe bygget.
 *
 * @param {{ feilFiler?: string[], ignorer?: string[] }} [valg]
 */
export function uuEslint({ feilFiler = [], ignorer = [] } = {}) {
  const strenge = jsxA11y.flatConfigs.strict.rules;
  const somAdvarsler = Object.fromEntries(
    Object.entries(strenge).map(([regel, verdi]) => {
      if (verdi === 'off' || verdi === 0) return [regel, 'off'];
      return [regel, Array.isArray(verdi) ? ['warn', ...verdi.slice(1)] : 'warn'];
    }),
  );

  return [
    ...nextVitals,
    ...nextTs,
    {
      rules: {
        ...strenge,
        // Demoene bruker vanlig <img> med vilje: next/image krever alt, og da forsvinner feilene vi vil vise.
        '@next/next/no-img-element': 'off',
      },
    },
    ...(feilFiler.length ? [{ files: feilFiler, rules: somAdvarsler }] : []),
    {
      ignores: ['.next/**', 'out/**', 'playwright-report/**', 'test-results/**', 'next-env.d.ts', ...ignorer],
    },
  ];
}
