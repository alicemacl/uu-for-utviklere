import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Vakter demosidene: den fiksede skal være feilfri, og feil-versjonen skal ha akkurat de feilene foredraget viser.

// axe 4.14 med standardreglene (WCAG + beste praksis), slik axe DevTools kjører
const FORVENTEDE_AXE_FEIL = [
  'aria-hidden-focus',
  'button-name',
  'color-contrast',
  'image-alt',
  'label',
  'landmark-one-main',
  'link-in-text-block',
  'meta-viewport',
  'page-has-heading-one',
  'region',
  'tabindex',
];

test.describe('/demo/fikset', () => {
  test('ingen axe-brudd, heller ikke på beste praksis', async ({ page }) => {
    await page.goto('/demo/fikset');
    const resultat = await new AxeBuilder({ page }).analyze();
    expect(resultat.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });

  test('tomt skjema gir en feiloppsummering som får fokus', async ({ page }) => {
    await page.goto('/demo/fikset');
    await page.getByRole('button', { name: 'Send søknad' }).click();
    const sammendrag = page.locator('#feilsammendrag');
    await expect(sammendrag).toBeFocused();
    await expect(sammendrag.getByRole('heading')).toHaveText(/Skjemaet har \d+ feil/);
  });
});

test.describe('/demo/feil', () => {
  test(`axe finner akkurat de ${FORVENTEDE_AXE_FEIL.length} regelbruddene foredraget viser`, async ({ page }) => {
    await page.goto('/demo/feil');
    const resultat = await new AxeBuilder({ page }).analyze();
    expect(resultat.violations.map((v) => v.id).sort()).toEqual(FORVENTEDE_AXE_FEIL);
  });

  test('feilene axe ikke ser, er der fortsatt', async ({ page }) => {
    await page.goto('/demo/feil');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle('React App');
    // «Send søknad» er en <div>, så den finnes ikke som knapp
    await expect(page.getByRole('button', { name: 'Send søknad' })).toHaveCount(0);
    await expect(page.getByText('Send søknad', { exact: true })).toBeVisible();
  });
});
