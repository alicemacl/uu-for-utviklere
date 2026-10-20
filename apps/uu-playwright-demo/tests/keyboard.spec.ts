import { test, expect, type Page } from '@playwright/test';

// Det axe ikke ser: roller og tab-rekkefølge. Rekkefølgen under er bestemt av et menneske.
const sider = ['/broken', '/axe-green', '/fixed'];
const forventetTabRekkefolge = ['Hjem', 'Kurs', 'Navn', 'E-post', 'Send inn', 'Avbryt'];

async function navnPaFokusertElement(page: Page) {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLInputElement | null;
    if (!el || el === document.body) return '(ingenting – fokus forlot siden)';
    const label = el.labels?.[0]?.childNodes[0]?.textContent;
    return (el.getAttribute('aria-label') ?? label ?? el.placeholder ?? el.textContent ?? '').trim();
  });
}

for (const side of sider) {
  test.describe(side, () => {
    test('«Send inn» og «Avbryt» er knapper', async ({ page }) => {
      await page.goto(side);
      await expect(page.getByRole('button', { name: 'Send inn' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
    });

    test('tab-rekkefølgen følger den visuelle rekkefølgen', async ({ page }) => {
      await page.goto(side);
      const rekkefolge: string[] = [];
      for (let i = 0; i < forventetTabRekkefolge.length; i++) {
        await page.keyboard.press('Tab');
        rekkefolge.push(await navnPaFokusertElement(page));
      }
      expect(rekkefolge).toEqual(forventetTabRekkefolge);
    });
  });
}

test('skjemaet sett fra en skjermleser (ARIA-snapshot)', async ({ page }) => {
  await page.goto('/fixed');
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Meld deg på UU-kurset" [level=1]
    - textbox "Navn"
    - textbox "E-post"
    - button "Send inn"
    - button "Avbryt"
  `);
});
