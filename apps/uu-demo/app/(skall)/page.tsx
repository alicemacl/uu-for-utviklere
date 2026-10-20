import Link from 'next/link';
import s from '@/komponenter/Side.module.css';
import o from './oversikt.module.css';

export default function Oversikt() {
  return (
    <>
      <div className={o.hode}>
        <div>
          <p className={s.overtittel}>Kurs · UU for utviklere</p>
          <h1>Demo-app med vanlige UU-feil – og hvordan du fikser dem</h1>
          <p className={s.ingress}>En side full av feil vi lager hver dag, den samme siden fikset, og før/etter-eksempler for hvert grep. Alt virker uten nett når du kjører appen lokalt.</p>
          <div className={s.knapper}>
            <Link className={s.knapp} href="/demo/feil">Åpne demosiden med feil</Link>
            <Link className={`${s.knapp} ${s.omriss}`} href="/demo/fikset">Åpne den fiksede versjonen</Link>
          </div>
        </div>
        <div className={o.gradient} aria-hidden="true" />
      </div>

      <section className={s.del} aria-labelledby="del-1">
        <h2 id="del-1"><span className={s.nummer} aria-hidden="true">01</span>Demo – kjenn det på kroppen</h2>
        <p>Demosiden er et søknadsskjema for beboerparkering i den oppdiktede kommunen Fjordvik. Den ser helt grei ut – helt til du legger bort musa.</p>
        <div className={o.runder}>
          <div className={s.boks}>
            <h3>Runde 1: Bare tastatur</h3>
            <ul>
              <li>Bruk <kbd>Tab</kbd> og <kbd>Shift</kbd>+<kbd>Tab</kbd> for å navigere, <kbd>Enter</kbd> og mellomrom for å aktivere.</li>
              <li>Legg merke til: Hvor er fokus nå? Ser du det på skjermen?</li>
              <li>Prøv å sende inn skjemaet uten å røre musa.</li>
            </ul>
          </div>
          <div className={s.boks}>
            <h3>Runde 2: Skjermleser</h3>
            <ul>
              <li>VoiceOver på Mac: <kbd>Cmd</kbd>+<kbd>F5</kbd></li>
              <li>NVDA på Windows: gratis nedlasting</li>
              <li>Hva blir lest opp? Gir det mening uten å se skjermen?</li>
            </ul>
          </div>
        </div>

        <details className={o.alleFeil}>
          <summary>Alle feilene på demosiden (fasit til foredragsholderen)</summary>
          <ol>
            <li><code>lang=&quot;en&quot;</code> på en norsk side, og sidetittelen er «React App»</li>
            <li>Zoom er blokkert med <code>user-scalable=no</code>, og innholdet har fast bredde på 1100 px</li>
            <li>Fokusrammen er fjernet med <code>*:focus {'{ outline: none }'}</code></li>
            <li>Ingen «hopp til hovedinnhold» og ingen landemerker</li>
            <li>Menyen består av klikkbare <code>&lt;div&gt;</code>-er – den nås ikke med Tab</li>
            <li>Søk er en <code>&lt;div&gt;</code> med bare et ikon; «Min side» er en <code>&lt;button&gt;</code> uten navn</li>
            <li>Logo, toppbilde og sonekart mangler alt – skjermleseren leser filnavnene, som «IMG_4032.svg»</li>
            <li>Rullende varsel som ikke kan stoppes og ignorerer <code>prefers-reduced-motion</code></li>
            <li>Sidetittelen er en <code>&lt;div&gt;</code>; de eneste overskriftene er to <code>&lt;h4&gt;</code></li>
            <li>Lys grå tekst med for lav kontrast, og lenker som bare skilles med farge</li>
            <li>Lenketekster som «Klikk her» og «Les mer»</li>
            <li>Skjemafelt uten label – bare placeholder eller løs tekst</li>
            <li>Mobilfeltet har <code>tabIndex={'{1}'}</code>, så første Tab hopper rett dit</li>
            <li>Sonevalg og avkrysningsboks er <code>&lt;div&gt;</code>-er uten rolle og tilstand</li>
            <li>«Send søknad» er en <code>&lt;div&gt;</code> – skjemaet kan ikke sendes med tastatur</li>
            <li>Feil vises bare med rød ramme og en generell melding som ikke leses opp</li>
            <li>Kvitteringen er en toast som forsvinner etter 3 sekunder og aldri leses opp</li>
            <li>Bunnen har <code>aria-hidden=&quot;true&quot;</code>, men lenkene der kan fortsatt få fokus</li>
            <li>Cookie-banneret kan ikke lukkes med tastatur og dekker bunnen av siden</li>
          </ol>
        </details>
      </section>

      <section className={s.del} aria-labelledby="del-4">
        <h2 id="del-4"><span className={s.nummer} aria-hidden="true">04</span>Konkrete grep i koden</h2>
        <p>Hvert eksempel vises som før og etter – med levende komponent, hva skjermleseren omtrent sier, og koden. Koden og demoen kommer fra samme kilde.</p>
        <ul className={s.rutenett}>
          <li className={s.kort}><span className={s.nummer} aria-hidden="true">1</span><h3><Link href="/grep/1-semantikk">Semantisk HTML</Link></h3><p>Knapper, lenker, landemerker, overskrifter og tabeller.</p></li>
          <li className={s.kort}><span className={s.nummer} aria-hidden="true">2</span><h3><Link href="/grep/2-skjema">Skjema</Link></h3><p>Label, placeholder, feilmeldinger og grupper av valg.</p></li>
          <li className={s.kort}><span className={s.nummer} aria-hidden="true">3</span><h3><Link href="/grep/3-tastatur">Tastatur og fokus</Link></h3><p>Fokusramme, tabindex, hopp til innhold og dialoger.</p></li>
          <li className={s.kort}><span className={s.nummer} aria-hidden="true">4</span><h3><Link href="/grep/4-bilder">Bilder med alt-tekst</Link></h3><p>Manglende, dekorative og informative bilder, og ikonknapper.</p></li>
          <li className={s.kort}><span className={s.nummer} aria-hidden="true">5</span><h3><Link href="/grep/5-kontrast-zoom">Kontrast og zoom</Link></h3><p>Målt kontrast, farge alene, 320 px bredde og tekstavstand.</p></li>
          <li className={s.kort}><span className={s.nummer} aria-hidden="true">6–7</span><h3><Link href="/grep/6-aria-og-sma-gevinster">ARIA og små gevinster</Link></h3><p>Første regel for ARIA, tilstand, status, lang og bevegelse.</p></li>
          <li className={s.kort}><span className={s.nummer} aria-hidden="true">?</span><h3><Link href="/finn-feilen">Finn feilen</Link></h3><p>Åtte komponenter for en «spot the bug»-runde midt i foredraget.</p></li>
        </ul>
      </section>

      <section className={s.del} aria-labelledby="del-5">
        <h2 id="del-5"><span className={s.nummer} aria-hidden="true">05</span>Verktøy</h2>
        <div className={s.to}>
          <div className={s.boks}>
            <h3>Kjør axe på begge versjonene</h3>
            <p>Åpne <Link href="/demo/feil">demosiden med feil</Link>, kjør axe DevTools eller Lighthouse, og gjør det samme på <Link href="/demo/fikset">den fiksede versjonen</Link>.</p>
            <p>Med axe-core 4 gir feil-versjonen 11 ulike regelbrudd, og den fiksede ingen. Men sammenlign med fasitlista over: Verktøyet ser ikke de klikkbare <code>&lt;div&gt;</code>-ene, den fjernede fokusrammen, <code>lang=&quot;en&quot;</code>, «Les mer»-lenkene, den faste bredden eller feilmeldingene som aldri leses opp – omtrent halvparten av feilene.</p>
          </div>
          <div className={s.boks}>
            <h3>Accessibility tree</h3>
            <p>I Chrome DevTools: Elements → Accessibility. Velg «Lik»-knappen i <Link href="/grep/1-semantikk">grep 1</Link> og sammenlign rolle og navn på <code>&lt;div&gt;</code> og <code>&lt;button&gt;</code>.</p>
          </div>
        </div>
      </section>

      <section className={s.del} aria-labelledby="del-6">
        <h2 id="del-6"><span className={s.nummer} aria-hidden="true">06</span>Tre ting du kan gjøre i morgen</h2>
        <p><Link className={s.knapp} href="/sjekkliste">Tre ting i morgen, sjekkliste og lenker</Link></p>
      </section>

      <section className={s.del} aria-labelledby="tips">
        <h2 id="tips">Til foredragsholderen</h2>
        <div className={s.boks}>
          <ul className={o.tips}>
            <li>Legg til <code>?ren</code> i adressen (for eksempel <code>/demo/feil?ren</code>) for å skjule den lille demolinjen oppe til høyre.</li>
            <li>På grep-sidene kan du skjule all kode med én knapp, vise demoen først og så åpne koden.</li>
            <li>Rendering-fanen i Chrome DevTools kan emulere <code>prefers-reduced-motion</code> og ulike typer fargeblindhet.</li>
            <li>Ta opp skjermleserdemoen på forhånd, i tilfelle noe svikter på scenen.</li>
            <li>Har du en reserve klar? Kjør appen lokalt med <code>pnpm build &amp;&amp; pnpm start</code> før foredraget. Den henter ingenting fra nettet, så den virker selv om nettet på scenen svikter.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
