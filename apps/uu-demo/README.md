# UU-demo

Demo-app til kurset **«UU for utviklere»**. Den viser vanlige feil innen universell utforming, og hvordan de fikses, direkte i nettleseren.

## Hva er med

| Side | Innhold |
| --- | --- |
| `/` | Oversikt, instruksjoner til demorundene og fasit over alle feilene |
| `/demo/feil` | «Fjordvik kommune – søk om beboerparkering» med 19 innebygde feil |
| `/demo/fikset` | Den samme siden, fikset |
| `/grep/1-semantikk` … `/grep/6-aria-og-sma-gevinster` | Før/etter-eksempler for grep 1–7, med levende komponent, hva skjermleseren omtrent sier, og koden |
| `/finn-feilen` | Åtte komponenter for en «spot the bug»-runde, én om gangen |
| `/sjekkliste` | Tre ting du kan gjøre i morgen, sjekkliste, verktøy og lenker |

De gamle adressene med `.html` sendes videre til de nye.

## Kjøre lokalt

Fra roten av repoet:

```bash
pnpm install
pnpm --filter uu-demo dev        # http://localhost:3000
```

Som reserve på scenen, uten nett:

```bash
pnpm --filter uu-demo build
pnpm --filter uu-demo start
```

## Tips til foredraget

- Legg til `?ren` i adressen (`/demo/feil?ren`) for å skjule den lille demolinjen oppe til høyre. Fint når du tar opp skjermleserdemoen.
- På grep-sidene skjuler «Skjul all kode» alle kodevisningene, så du kan vise demoen først.
- Chrome DevTools → Rendering kan emulere `prefers-reduced-motion` og fargeblindhet.
- Kjør axe eller Lighthouse på `/demo/feil` og `/demo/fikset` for å vise forskjellen, og snakk om det verktøyet ikke fant.
- `pnpm lint` viser hvilke av feilene `eslint-plugin-jsx-a11y` fanger.

## Slik er eksemplene bygget

Hver variant er én liten komponent i [`eksempler/`](eksempler). Den samme filen brukes to ganger: som levende demo, og som kildekoden du ser under «Koden». Kildeteksten leses når siden bygges, så demo og kode kan aldri gli fra hverandre.

```
eksempler/grep-1/klikkbar-div.feil.tsx      ← før
eksempler/grep-1/klikkbar-div.riktig.tsx    ← etter
```

På siden:

```tsx
<Eksempel tittel="Klikkbar div eller ekte knapp">
  <p>Forklaring …</p>
  <Prov>Tab til knappen og trykk Enter eller mellomrom.</Prov>
  <Variant variant="feil" kilde="grep-1/klikkbar-div.feil" tittel="<div onClick>" sier="«Lik (0)» – bare tekst …" />
  <Variant variant="riktig" kilde="grep-1/klikkbar-div.riktig" tittel="<button>" sier="«Lik (0), knapp»" />
</Eksempel>
```

- Har eksemplet egen CSS, legg den i en CSS-modul ved siden av (`klikkbar-div.feil.module.css`) og importer den med `import s from './klikkbar-div.feil.module.css'`. Da vises den som en egen fane i kodevisningen.
- Felles utseende for demoene (`knapp`, `chip`, `felt` …) ligger i [`komponenter/Live.module.css`](komponenter/Live.module.css), så koden du viser bare handler om poenget.
- Eksempler som må være en hel side (`lang`, landemerker, hopp-lenke), ligger som HTML-dokumenter i [`public/rammer/`](public/rammer) og vises i en iframe: `<Variant ramme={230} kilde="grep-1/landemerker.feil.html" … />`.
- Andre valg: `bareKode` (bare koden, ingen demo), `kontrast` (mål kontrasten i demoen), `merk`, `bred` (hele bredden), og `sim` på `<Eksempel>` (simuler smal skjerm og økt tekstavstand).

> Feilene i appen er med vilje. Kjører du axe på grep-sidene, finner det feilene i «før»-eksemplene. Det er meningen.
