# UU-demo: det axe ser, og det axe ikke ser

Tre versjoner av samme påmeldingsskjema, og Playwright-tester som viser forskjellen.

| Side | Hva den viser |
| --- | --- |
| [`/broken`](app/(uten-lang)/broken) | Typiske feil: bilde uten alt, lav kontrast, ingen `lang`, placeholder som label, `<a href="#">` som knapp, `<div onClick>`, fjernet outline, DOM-rekkefølge ≠ visuell rekkefølge |
| [`/axe-green`](app/(norsk)/axe-green) | Alt axe klager på er fikset, så axe er grønn. Men knappene, fokus og tab-rekkefølgen er fortsatt feil |
| [`/fixed`](app/(norsk)/fixed) | Semantisk HTML, alt riktig |

`/` sender deg til `/fixed`. De gamle adressene (`/broken.html` og så videre) virker fortsatt.

## Kom i gang

Fra roten av repoet:

```bash
pnpm install
pnpm --filter uu-playwright-demo exec playwright install chromium
```

Så, i denne mappa:

```bash
pnpm test            # bygger appen og kjører alle testene (5 skal feile, 5 skal passere)
pnpm report          # åpner HTML-rapporten
pnpm dev             # serverer sidene på http://localhost:4173/broken
```

Testene kjører mot et produksjonsbygg (`next build` + `next start`), slik sidene blir på Vercel.

## Testene

- [`tests/smoke.spec.ts`](tests/smoke.spec.ts): axe-røyktest (WCAG 2.0/2.1 A og AA) på hver side
- [`tests/keyboard.spec.ts`](tests/keyboard.spec.ts): `getByRole('button')`, tab-rekkefølge og ARIA-snapshot

Forventet resultat: axe feiler bare på `/broken`. Knappe- og tab-testene feiler på både `/broken` og `/axe-green`. Alt passerer på `/fixed`.

`pnpm test:ci` kjører de samme testene og sjekker at akkurat de fem riktige feiler. Det er den CI bruker.

## Lint

`pnpm lint` gir advarsler på `/broken` og `/axe-green`: `<a href="#">` som knapp, `<div onClick>`, manglende `alt` og manglende `lang`. Lint ser ikke placeholder som label, den fjernede fokusrammen eller tab-rekkefølgen. Det gjør bare et menneske, eller en test som et menneske har skrevet.

## Tips til scenen

- Vis `/axe-green` i nettleseren og tab gjennom den før du kjører testene.
- Åpne Accessibility-panelet i Chrome DevTools på `/broken` og `/fixed` side om side.
- `screenshots/` har skjermbilder fra en kjøring, som backup hvis live-demoen svikter.
