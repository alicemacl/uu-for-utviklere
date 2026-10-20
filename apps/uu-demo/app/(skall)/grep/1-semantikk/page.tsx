import type { Metadata } from 'next';
import { Eksempel, Prov } from '@/komponenter/Eksempel';
import { Eksempelside } from '@/komponenter/Eksempelside';
import { Variant } from '@/komponenter/Variant';

export const metadata: Metadata = { title: 'Grep 1: Semantisk HTML' };

export default function Grep1() {
  return (
    <Eksempelside
      grep="1"
      tittel="Grep 1: Semantisk HTML – bruk elementene HTML gir deg"
      ingress={<>Bruk <code>&lt;button&gt;</code> for knapper og <code>&lt;a href&gt;</code> for lenker, bruk landemerker, og ha én <code>&lt;h1&gt;</code> per side med overskriftsnivåer i riktig rekkefølge.</>}
      huskeregel="Riktig HTML-element gir tastaturnavigasjon, rolle og navn gratis – uten én linje ARIA."
    >
      <Eksempel tittel="Klikkbar div eller ekte knapp">
        <p>En <code>&lt;div onClick&gt;</code> kan se ut som en knapp, men for hjelpemidlene er den bare tekst. Den kan ikke nås med Tab, og den reagerer ikke på Enter eller mellomrom.</p>
        <Prov>Tab til knappen og trykk Enter eller mellomrom. Med mus virker begge to.</Prov>
        <Variant variant="feil" kilde="grep-1/klikkbar-div.feil" tittel="<div onClick>" sier="«Lik (0)» – bare tekst, og den hoppes over når du tabber." />
        <Variant variant="riktig" kilde="grep-1/klikkbar-div.riktig" tittel="<button>" sier="«Lik (0), knapp»" />
      </Eksempel>

      <Eksempel tittel="Lenke eller knapp?">
        <p>Lenker tar deg et sted, knapper gjør noe. En <code>&lt;span&gt;</code> med <code>location.href</code> mister alt en lenke gir: Tab, Enter, «åpne i ny fane», lenkelista i skjermleseren og besøkt-farge.</p>
        <Prov>Tab til lenken, eller høyreklikk og se etter «Åpne i ny fane».</Prov>
        <Variant variant="feil" kilde="grep-1/lenke-eller-knapp.feil" tittel="<span onClick>" sier="«Les reglene for beboerparkering» – bare tekst, finnes ikke i lenkelista." />
        <Variant variant="riktig" kilde="grep-1/lenke-eller-knapp.riktig" tittel="<a href>" sier="«lenke, Les reglene for beboerparkering»" />
      </Eksempel>

      <Eksempel tittel="Landemerker">
        <p>Landemerker lar skjermleserbrukere hoppe rett til menyen, innholdet eller bunnen av siden – litt som å skumme med øynene.</p>
        <Prov>Åpne landemerkelista: VoiceOver <kbd>VO</kbd>+<kbd>U</kbd> og velg «Landemerker», NVDA <kbd>D</kbd> for neste landemerke. Eller se på Accessibility tree i Chrome DevTools.</Prov>
        <Variant variant="feil" kilde="grep-1/landemerker.feil.html" ramme={230} tittel='<div class="header">' sier="Ingen landemerker. Lista er tom, så brukeren må lese seg gjennom alt." />
        <Variant variant="riktig" kilde="grep-1/landemerker.riktig.html" ramme={230} tittel="<header> <nav> <main> <footer>" sier="«banner» · «navigasjon, Hovedmeny» · «hovedområde» · «bunntekst»" />
      </Eksempel>

      <Eksempel tittel="Overskriftsstruktur">
        <p>Mange skjermleserbrukere navigerer etter overskrifter. Overskriftsnivået skal beskrive strukturen, ikke størrelsen – utseendet styrer du med CSS.</p>
        <Prov>Hent fram overskriftslista: VoiceOver <kbd>VO</kbd>+<kbd>U</kbd> og «Overskrifter», NVDA <kbd>H</kbd> for neste overskrift. Eller kjør HeadingsMap-utvidelsen.</Prov>
        <Variant variant="feil" kilde="grep-1/overskrifter.feil.html" ramme={280} tittel="div + h4 + h2" sier="Bare to overskrifter: «nivå 4, Pris» og «nivå 2, Søknadsskjema». Sidetittelen er ikke en overskrift." />
        <Variant variant="riktig" kilde="grep-1/overskrifter.riktig.html" ramme={280} tittel="h1 → h2 → h2" sier="«nivå 1, Søk om beboerparkering» · «nivå 2, Pris» · «nivå 2, Søknadsskjema»" />
      </Eksempel>

      <Eksempel tittel="Tabell for tabelldata">
        <p>Et rutenett av <code>&lt;div&gt;</code>-er ser ut som en tabell, men skjermleseren leser bare en lang rekke tall. Med <code>&lt;table&gt;</code>, <code>&lt;th&gt;</code> og <code>&lt;caption&gt;</code> får hver celle overskriftene sine lest opp.</p>
        <Prov>Naviger i tabellen med skjermleser: VoiceOver <kbd>VO</kbd>+piltaster, NVDA <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+piltaster.</Prov>
        <Variant variant="feil" kilde="grep-1/tabell.feil" tittel='<div className="divtabell">' sier="«Pris per år, Sone, Bensin og diesel, El-bil, A, 1 200 kr, 600 kr, …» – hva var 600 kr igjen?" />
        <Variant variant="riktig" kilde="grep-1/tabell.riktig" tittel="<table>" sier="«tabell, Pris per år, 4 rader, 3 kolonner» … «El-bil, A, 600 kr»" />
      </Eksempel>
    </Eksempelside>
  );
}
