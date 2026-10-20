import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Røyktest: kjør axe på de viktigste sidene. Legg til nye ruter i lista.
const sider = ['/broken', '/axe-green', '/fixed'];

for (const side of sider) {
  test(`axe: ingen WCAG A/AA-brudd på ${side}`, async ({ page }, testInfo) => {
    await page.goto(side);

    const resultat = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Hele axe-rapporten havner som vedlegg i HTML-rapporten
    await testInfo.attach('axe-resultat', {
      body: JSON.stringify(resultat.violations, null, 2),
      contentType: 'application/json',
    });

    // Lesbar feilmelding: «regel-id: hva som er galt (antall elementer)»
    const brudd = resultat.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`);
    expect(brudd).toEqual([]);
  });
}
