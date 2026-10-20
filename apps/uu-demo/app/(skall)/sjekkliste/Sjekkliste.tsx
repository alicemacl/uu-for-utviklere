'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { Button } from 'react-aria-components';
import s from '@/komponenter/Side.module.css';
import l from './sjekkliste.module.css';

const GRUPPER: { navn: string; punkter: React.ReactNode[] }[] = [
  {
    navn: 'Semantikk',
    punkter: [
      <><code>&lt;button&gt;</code> for handlinger, <code>&lt;a href&gt;</code> for navigasjon</>,
      <>Landemerker: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code></>,
      <>Én <code>&lt;h1&gt;</code>, og ingen hopp i overskriftsnivåer</>,
      <>Ekte <code>&lt;table&gt;</code> for tabelldata, ekte lister for lister</>,
    ],
  },
  {
    navn: 'Skjema',
    punkter: [
      <>Alle felt har en synlig <code>&lt;label&gt;</code></>,
      <>Radioknapper og avkrysningsbokser er gruppert med <code>&lt;fieldset&gt;</code> og <code>&lt;legend&gt;</code></>,
      <>Feil vises med tekst, ikke bare farge, og er koblet til feltet</>,
      <><code>autocomplete</code> på felt om brukeren selv</>,
    ],
  },
  {
    navn: 'Tastatur og fokus',
    punkter: [
      <>Alt kan brukes med tastatur alene</>,
      <>Synlig fokus overalt – ingen <code>outline: none</code> uten erstatning</>,
      <>«Hopp til hovedinnhold»-lenke</>,
      <>Ingen <code>tabindex</code> større enn 0</>,
      <>Dialoger flytter fokus inn, lukkes med Escape og gir fokus tilbake</>,
    ],
  },
  {
    navn: 'Bilder',
    punkter: [
      <>Alle <code>&lt;img&gt;</code> har <code>alt</code></>,
      <>Dekorative bilder har <code>alt=&quot;&quot;</code></>,
      <>Ikonknapper har et tilgjengelig navn</>,
      <>Ingen viktig tekst bakt inn i bilder</>,
    ],
  },
  {
    navn: 'Kontrast og zoom',
    punkter: [
      <>Tekst: minst 4,5:1 mot bakgrunnen</>,
      <>Knapper, feltkanter og ikoner: minst 3:1</>,
      <>Farge er aldri eneste informasjonsbærer</>,
      <>Fungerer på 320 px bredde og 200 % zoom</>,
      <>Ingen <code>user-scalable=no</code></>,
    ],
  },
  {
    navn: 'ARIA og små gevinster',
    punkter: [
      <>ARIA bare når HTML ikke holder</>,
      <>Ingen <code>aria-hidden</code> på noe som kan få fokus</>,
      <>Statusmeldinger med <code>role=&quot;status&quot;</code></>,
      <><code>lang=&quot;no&quot;</code> på <code>&lt;html&gt;</code></>,
      <>Beskrivende <code>&lt;title&gt;</code> på hver side</>,
      <>Animasjoner respekterer <code>prefers-reduced-motion</code></>,
    ],
  },
];

const ANTALL = GRUPPER.reduce((sum, g) => sum + g.punkter.length, 0);

// Hvert punkt får et fast nummer på tvers av gruppene – det er numrene som lagres
const NUMMERERTE = GRUPPER.map((gruppe, g) => {
  const forste = GRUPPER.slice(0, g).reduce((sum, forrige) => sum + forrige.punkter.length, 0);
  return { navn: gruppe.navn, punkter: gruppe.punkter.map((innhold, i) => ({ nr: forste + i, innhold })) };
});

/*
  Hakene lagres i localStorage. Lagring er valgfritt: virker ikke localStorage
  (privat vindu, blokkert lagring), husker siden hakene til du laster den på nytt.
*/
const NOKKEL = 'uu-demo-sjekkliste';
let iMinnet = '[]';
const lyttere = new Set<() => void>();

function les() {
  try {
    return localStorage.getItem(NOKKEL) ?? iMinnet;
  } catch {
    return iMinnet;
  }
}

function lagre(haker: number[]) {
  iMinnet = JSON.stringify(haker);
  try {
    localStorage.setItem(NOKKEL, iMinnet);
  } catch {
    /* lagring er valgfritt */
  }
  lyttere.forEach((lytter) => lytter());
}

function abonner(lytter: () => void) {
  lyttere.add(lytter);
  window.addEventListener('storage', lytter);
  return () => {
    lyttere.delete(lytter);
    window.removeEventListener('storage', lytter);
  };
}

// Serveren vet ikke hva du har krysset av, så den viser alt tomt og ingen telling
const fraServer = () => null;

export function Sjekkliste() {
  const lagret = useSyncExternalStore(abonner, les, fraServer);
  const haker = useMemo(() => {
    try {
      const verdi: unknown = JSON.parse(lagret ?? '[]');
      return Array.isArray(verdi) ? verdi.filter((i): i is number => typeof i === 'number') : [];
    } catch {
      return [];
    }
  }, [lagret]);

  function endre(indeks: number, pa: boolean) {
    const nye = new Set(haker);
    if (pa) nye.add(indeks);
    else nye.delete(indeks);
    lagre([...nye].sort((a, b) => a - b));
  }

  return (
    <>
      <p>
        Hakene lagres bare i din egen nettleser.{' '}
        <span className={l.framdrift} id="framdrift" aria-live="polite">
          {lagret === null ? '' : `${haker.length} av ${ANTALL} er krysset av.`}
        </span>
      </p>
      <div className={`${s.knapper} ${l.utskriftSkjul}`}>
        <Button className={`${s.knapp} ${s.omriss}`} onPress={() => window.print()}>Skriv ut</Button>
        <Button className={`${s.knapp} ${s.omriss}`} id="nullstill" onPress={() => lagre([])}>Nullstill</Button>
      </div>

      <div className={l.sjekk} id="sjekkliste">
        {NUMMERERTE.map((gruppe) => (
          <fieldset key={gruppe.navn}>
            <legend>{gruppe.navn}</legend>
            {gruppe.punkter.map(({ nr, innhold }) => (
              <label key={nr}>
                <input type="checkbox" checked={haker.includes(nr)} onChange={(e) => endre(nr, e.target.checked)} />
                <span>{innhold}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </div>
    </>
  );
}
