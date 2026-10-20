# UU for utviklere – demo-apper

Demo-appene til kurset **«UU for utviklere»**. De viser vanlige feil innen universell utforming, og hvordan de fikses, direkte i nettleseren.

> Feilene i appene er med vilje. Kjører du axe eller lint på dem, finner du feilene i «før»-eksemplene. Det er meningen.

| App | Mappe | Hva den viser |
| --- | --- | --- |
| **uu-demo** | [`apps/uu-demo`](apps/uu-demo) | Fjordvik-siden med 19 innebygde feil og den samme siden fikset, før/etter-eksempler for grep 1–7, «Finn feilen» og sjekklista |
| **uu-playwright-demo** | [`apps/uu-playwright-demo`](apps/uu-playwright-demo) | Det axe ser, og det axe ikke ser: tre versjoner av samme skjema og Playwright-tester som viser forskjellen |

## Teknologi

- [Next.js](https://nextjs.org) 16 (App Router), React 19 og TypeScript
- CSS-moduler for all styling, pluss én liten global fil per app med farger og reset
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/) der HTML ikke strekker til (faner i kodevisningen, av/på-knapper, kombinasjonsboks), med norske tekster (`nb-NO`)
- [Shiki](https://shiki.style) for syntaksfarger, kjørt når siden bygges
- pnpm-workspaces og [Turborepo](https://turborepo.com)
- `eslint-plugin-jsx-a11y`, Playwright og axe-core

Rekkefølgen følger det kurset lærer bort: native HTML først. React Aria brukes bare der det ikke finnes et HTML-element som gjør jobben.

## Kom i gang

Du trenger Node 20.9 eller nyere (22 anbefales) og pnpm.

```bash
corepack enable        # gir deg riktig pnpm-versjon
pnpm install
pnpm dev               # uu-demo på http://localhost:3000, Playwright-demoen på http://localhost:4173
```

Bare én av appene:

```bash
pnpm --filter uu-demo dev
pnpm --filter uu-playwright-demo dev
```

### Reserve hvis nettet svikter på scenen

Bygg og start appene lokalt før foredraget. Da virker alt uten nett:

```bash
pnpm build
pnpm --filter uu-demo start                 # http://localhost:3000
pnpm --filter uu-playwright-demo start      # http://localhost:4173
```

## Publisere på Vercel

Hver app er et eget Vercel-prosjekt fra det samme repoet.

1. Gå til <https://vercel.com/new> og velg **Import Git Repository**. Velg dette repoet.
2. Gi prosjektet navnet `uu-demo`. Under **Root Directory**, velg **Edit** og så `apps/uu-demo`. Vercel finner Next.js, pnpm og Turborepo selv, så resten kan stå som det er. Trykk **Deploy**.
3. Gjenta for den andre appen: **Add New → Project**, samme repo, navnet `uu-playwright-demo` og **Root Directory** `apps/uu-playwright-demo`.

Etter dette bygger Vercel begge appene på nytt hver gang du pusher til `main`, og lager forhåndsvisninger for pull requests. Produksjonsadressen er offentlig. Forhåndsvisningene kan være beskyttet med Vercel-innlogging, avhengig av innstillingene dine.

## Lint-demoen

```bash
pnpm lint
```

`eslint-plugin-jsx-a11y` kjører med de strenge reglene på all kode. Filene med feil med vilje (`*.feil.tsx`, Finn feilen-oppgavene og demosidene med feil) får advarsler i stedet for feil. Advarslene viser hvilke av feilene lint fanger: `<div onClick>`, `<a href="#">` som knapp, manglende `alt` og `lang`. Sammenlign med fasitlista for å se hva lint ikke ser: fjernet fokusramme, placeholder som label, tab-rekkefølge, kontrast og feilmeldinger som aldri leses opp.

## Tester og CI

```bash
pnpm --filter uu-playwright-demo test       # 10 tester: 5 skal feile, 5 skal passere
pnpm --filter uu-playwright-demo test:ci    # sjekker at akkurat de 5 riktige feiler
pnpm --filter uu-demo test                  # sjekker at de fiksede versjonene er feilfrie
```

GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) kjører lint, typesjekk, bygg og testene på hver push og pull request. Pipelinen er grønn bare når demo-feilene fortsatt feiler og alt det andre virker. Den blir altså rød hvis noen kommer til å fikse en feil som skal vises på scenen.

## Struktur

```
apps/
  uu-demo/              Demo-appen (Next.js)
  uu-playwright-demo/   Skjemaet i tre versjoner + Playwright-tester (Next.js)
packages/
  config/               Felles tsconfig og ESLint-oppsett
```

## Den statiske versjonen

Appene var opprinnelig ren HTML, CSS og JavaScript. Den versjonen ligger i git-taggen `statisk`:

```bash
git checkout statisk
```
