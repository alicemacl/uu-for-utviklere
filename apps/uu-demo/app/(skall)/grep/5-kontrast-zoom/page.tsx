import type { Metadata } from 'next';
import { Eksempel, Prov } from '@/komponenter/Eksempel';
import { Eksempelside } from '@/komponenter/Eksempelside';
import type { Kontrastmal } from '@/komponenter/Kontrastmaling';
import { Variant } from '@/komponenter/Variant';

export const metadata: Metadata = { title: 'Grep 5: Kontrast og zoom' };

const tekstkontrast: Kontrastmal[] = [
  { type: 'tekst', velger: 'p', navn: 'Brødtekst' },
  { type: 'tekst', velger: 'p small', navn: 'Liten tekst' },
];
const feltkant: Kontrastmal[] = [{ type: 'kant', velger: 'input', navn: 'Feltkant' }];

export default function Grep5() {
  return (
    <Eksempelside
      grep="5"
      tittel="Grep 5: Kontrast og zoom"
      ingress="Tekst trenger minst 4,5:1 kontrastforhold mot bakgrunnen. Knapper, feltkanter og ikoner trenger minst 3:1. Siden skal tåle 200 % zoom og vises på 320 px bredde uten vannrett rulling."
      huskeregel="Kontrast og zoom handler ikke om estetikk – det handler om lesbarhet for alle."
    >
      <Eksempel tittel="Tekstkontrast">
        <p>Lys grå tekst ser elegant ut på en skarp skjerm på kontoret – og forsvinner på en mobil i sola eller på en gammel prosjektor. Kontrasten under måles direkte i nettleseren.</p>
        <Prov>Hold musepekeren over teksten med DevTools sin inspektør åpen – kontrasten vises i verktøytipset. Eller se på salen: Hvem på bakerste rad kan lese «før»?</Prov>
        <Variant variant="feil" kilde="grep-5/tekstkontrast.feil" tittel="#a3a3a3" kontrast={tekstkontrast} />
        <Variant variant="riktig" kilde="grep-5/tekstkontrast.riktig" tittel="#4a5558" kontrast={tekstkontrast} />
      </Eksempel>

      <Eksempel tittel="Kontrast på felt og knapper">
        <p>Kravet gjelder ikke bare tekst. Kanten på et skjemafelt må ha 3:1 mot bakgrunnen, ellers ser mange ikke at det finnes et felt å skrive i.</p>
        <Prov>Hvor mange felt ser du i «før»?</Prov>
        <Variant variant="feil" kilde="grep-5/feltkant.feil" tittel="border: #e4e4e4" kontrast={feltkant} />
        <Variant variant="riktig" kilde="grep-5/feltkant.riktig" tittel="border: #5f6b6e" kontrast={feltkant} />
      </Eksempel>

      <Eksempel tittel="Ikke bruk farge alene">
        <p>Lenker som bare skiller seg fra teksten med farge, er usynlige for mange fargeblinde. Understreking er gratis.</p>
        <Prov>DevTools → Rendering → «Emulate vision deficiencies» → Achromatopsia. Hvor er lenken?</Prov>
        <Variant variant="feil" kilde="grep-5/farge-alene.feil" tittel="text-decoration: none" />
        <Variant variant="riktig" kilde="grep-5/farge-alene.riktig" tittel="understreket" />
      </Eksempel>

      <Eksempel tittel="Zoom, smal skjerm og tekstavstand" sim={['smal', 'tekstavstand']}>
        <p>Faste bredder og høyder ser bra ut helt til noen zoomer, bruker stor tekst eller øker linjeavstanden for å lese bedre. 400 % zoom på en 1280 px skjerm tilsvarer 320 px bredde.</p>
        <Prov>Slå på bryterne under, én om gangen. Prøv også ekte zoom med <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> og <kbd>+</kbd>.</Prov>
        <Variant variant="feil" kilde="grep-5/fast-bredde.feil" tittel="width + height i px" />
        <Variant variant="riktig" kilde="grep-5/fast-bredde.riktig" tittel="max-width + min-height + wrap" />
      </Eksempel>

      <Eksempel tittel="Ikke blokker zoom på mobil">
        <p>Denne linjen ligger i mange maler og hindrer brukerne i å knipe for å zoome. Den gir ingen fordel – fjern den.</p>
        <Variant variant="feil" kilde="grep-5/viewport.feil.html" bareKode tittel="user-scalable=no" />
        <Variant variant="riktig" kilde="grep-5/viewport.riktig.html" bareKode tittel="la brukeren zoome" />
        <Variant variant="riktig" kilde="grep-5/layout.tsx" bareKode bred tittel="I Next.js: viewport i layout.tsx" />
      </Eksempel>
    </Eksempelside>
  );
}
