import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Sidene i skallet. Feilene med vilje er merket med data-variant="feil" og holdes utenfor axe.
const sider = [
  '/',
  '/grep/1-semantikk',
  '/grep/2-skjema',
  '/grep/3-tastatur',
  '/grep/4-bilder',
  '/grep/5-kontrast-zoom',
  '/grep/6-aria-og-sma-gevinster',
  '/finn-feilen',
  '/sjekkliste',
];

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

test('404-siden er på norsk og gir status 404', async ({ page }) => {
  const svar = await page.goto('/finnes-ikke');
  expect(svar?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'no');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Fant ikke siden');
});

for (const side of sider) {
  test.describe(side, () => {
    test('har én h1 og en sidetittel', async ({ page }) => {
      await page.goto(side);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/UU-demo/);
    });

    test('ingen WCAG A/AA-brudd utenom feilene med vilje', async ({ page }) => {
      await page.goto(side);
      const resultat = await new AxeBuilder({ page }).withTags(WCAG).exclude('[data-variant="feil"]').analyze();
      expect(resultat.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
    });

    test('alle interne lenker virker', async ({ page, request }) => {
      await page.goto(side);
      const lenker = await page.locator('a[href^="/"]').evaluateAll((a) => [
        ...new Set(a.map((el) => (el.getAttribute('href') ?? '').split('#')[0].split('?')[0])),
      ]);
      for (const lenke of lenker) {
        const svar = await request.get(lenke);
        expect(svar.status(), lenke).toBe(200);
      }
    });
  });
}
