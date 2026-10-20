# UU-demo

Demo-app til kurset **«UU for utviklere»**. Den viser vanlige feil innen universell utforming – og hvordan de fikses – direkte i nettleseren.

Alt er ren HTML, CSS og JavaScript. Ingen byggesteg, ingen avhengigheter, og ingenting lastes fra nettet. Appen virker derfor også når nettet på scenen svikter.

## Hva er med

| Side | Innhold |
| --- | --- |
| `index.html` | Oversikt, instruksjoner til demorundene og fasit over alle feilene |
| `demo/feil.html` | «Fjordvik kommune – søk om beboerparkering» med 19 innebygde feil |
| `demo/fikset.html` | Den samme siden, fikset |
| `grep/1-semantikk.html` … `grep/6-aria-og-sma-gevinster.html` | Før/etter-eksempler for grep 1–7, med levende komponent, hva skjermleseren omtrent sier, og koden |
| `finn-feilen.html` | Åtte komponenter for en «spot the bug»-runde, én om gangen |
| `sjekkliste.html` | Tre ting du kan gjøre i morgen, sjekkliste, verktøy og lenker |

## Kjøre lokalt

Enklest: dobbeltklikk på `index.html`. Alt virker rett fra disken.

Vil du heller ha en lokal server:

```bash
npx serve .            # eller: npm start
# eller
python3 -m http.server 8080
```

## Legge den ut på nett

Det er en helt statisk side, så alle statiske verter fungerer:

- **Netlify Drop:** Dra hele mappen inn på <https://app.netlify.com/drop>. Ferdig på et halvt minutt.
- **GitHub Pages:** Legg mappen i et repo, og velg Settings → Pages → «Deploy from a branch».
- **Vercel:** `npx vercel` i mappen.
- **Docker (Azure, AWS, GCP …):**

  ```bash
  docker build -t uu-demo .
  docker run -p 8080:80 uu-demo
  ```

## Tips til foredraget

- Legg til `?ren` i adressen (`demo/feil.html?ren`) for å skjule den lille demolinjen oppe til høyre – fint når du tar opp skjermleserdemoen.
- På grep-sidene skjuler «Skjul all kode» alle kodeblokkene, så du kan vise demoen først.
- Chrome DevTools → Rendering kan emulere `prefers-reduced-motion` og fargeblindhet.
- Kjør axe eller Lighthouse på `demo/feil.html` og `demo/fikset.html` for å vise forskjellen – og snakk om det verktøyet ikke fant.

## Legge til et eget eksempel

Hvert eksempel skrives én gang. `assets/site.js` bruker den samme kilden til både den levende demoen og kodevisningen:

```html
<section class="eksempel">
  <h2>Overskrift</h2>
  <p>Forklaring.</p>
  <script type="text/html" data-variant="feil" data-tittel="<div onclick>" data-sier="«Lagre»">
    <div class="knapp" onclick="…">Lagre</div>
  </script>
  <script type="text/html" data-variant="riktig" data-tittel="<button>" data-sier="«Lagre, knapp»">
    <button type="button" class="knapp" onclick="…">Lagre</button>
  </script>
</section>
```

Valgfrie attributter: `data-js` (vis kildekoden til en global funksjon), `data-ramme="250"` (vis som egen side i en iframe – nødvendig for `lang`, landemerker og lignende), `data-kontrast` (mål kontrast) og `data-bare-kode`. Se kommentaren øverst i `assets/site.js`.

> Feilene i appen er med vilje. Kjører du axe på grep-sidene, vil det finne feilene i «før»-eksemplene – det er meningen.
