# UU-demo: det axe ser, og det axe ikke ser

Tre versjoner av samme påmeldingsskjema, og Playwright-tester som viser forskjellen.

| Side | Hva den viser |
| --- | --- |
| `public/broken.html` | Typiske feil: bilde uten alt, lav kontrast, ingen `lang`, placeholder som label, `<a href="#">` som knapp, `<div onclick>`, fjernet outline, DOM-rekkefølge ≠ visuell rekkefølge |
| `public/axe-green.html` | Alt axe klager på er fikset – axe er grønn. Men knappene, fokus og tab-rekkefølgen er fortsatt feil |
| `public/fixed.html` | Semantisk HTML, alt riktig |

## Kom i gang

```bash
npm install
npx playwright install chromium
npm test            # kjører alle testene (5 skal feile, 5 skal passere)
npm run report      # åpner HTML-rapporten
npm start           # serverer sidene på http://localhost:4173/broken.html
```

## Testene

- `tests/smoke.spec.ts` – axe-røyktest (WCAG 2.0/2.1 A og AA) på hver side
- `tests/keyboard.spec.ts` – `getByRole('button')`, tab-rekkefølge og ARIA-snapshot

Forventet resultat: axe feiler bare på `broken.html`. Knappe- og tab-testene feiler på både `broken.html` og `axe-green.html`. Alt passerer på `fixed.html`.

## Tips til scenen

- Vis `axe-green.html` i nettleseren og tab gjennom den før du kjører testene.
- Åpne Accessibility-panelet i Chrome DevTools på `broken.html` og `fixed.html` side om side.
- `screenshots/` har skjermbilder fra en kjøring, som backup hvis live-demoen svikter.
