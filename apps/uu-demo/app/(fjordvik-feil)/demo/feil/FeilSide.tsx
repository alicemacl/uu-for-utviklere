'use client';

import { useRef, useState } from 'react';

/*
  «Fjordvik kommune – søk om beboerparkering» med 19 innebygde feil.
  Numrene i kommentarene viser til fasitlista på oversiktssiden.
  FEIL 4: ingen «hopp til hovedinnhold» og ingen landemerker – alt er <div>-er.
*/

type Tekstfelt = 'fornavn' | 'etternavn' | 'epost' | 'adresse' | 'regnr';
const PAKREVD: Tekstfelt[] = ['fornavn', 'etternavn', 'epost', 'adresse', 'regnr'];
const SONER = ['A', 'B', 'C'];

const klasser = (...navn: (string | false)[]) => navn.filter(Boolean).join(' ');

export function FeilSide() {
  const skjema = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [sone, settSone] = useState<string | null>(null);
  const [bekreftet, settBekreftet] = useState(false);
  const [feil, settFeil] = useState<Set<string>>(new Set());
  const [visFeilmelding, settVisFeilmelding] = useState(false);
  const [visToast, settVisToast] = useState(false);
  const [cookiesSkjult, settCookiesSkjult] = useState(false);

  function sendSoknad() {
    const nye = new Set<string>();
    for (const id of PAKREVD) {
      const verdi = skjema.current?.querySelector<HTMLInputElement>(`#${id}`)?.value ?? '';
      if (verdi.trim() === '' || (id === 'epost' && !verdi.includes('@'))) nye.add(id);
    }
    if (!sone) nye.add('sone');
    if (!bekreftet) nye.add('bekreft');

    settFeil(nye);
    settVisFeilmelding(nye.size > 0);

    if (nye.size === 0) {
      settVisToast(true);
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => settVisToast(false), 3000);
    }
  }

  return (
    <>
      <div className="topp">
        <div className="topp__indre">
          {/* FEIL 7: logoen er en klikkbar <div>, og bildet mangler alt */}
          <div className="logo" onClick={() => (window.location.href = '/demo/feil')} style={{ cursor: 'pointer' }}>
            <img src="/img/fjordvik-logo.svg" />
          </div>
          {/* FEIL 5: menyen består av klikkbare <div>-er – den nås ikke med Tab */}
          <div className="meny">
            <div className="menypunkt" onClick={() => (window.location.href = '#')}>Tjenester</div>
            <div className="menypunkt" onClick={() => (window.location.href = '#')}>Bolig og eiendom</div>
            <div className="menypunkt aktiv" onClick={() => (window.location.href = '#')}>Trafikk og parkering</div>
            <div className="menypunkt" onClick={() => (window.location.href = '#')}>Helse og omsorg</div>
            <div className="menypunkt" onClick={() => (window.location.href = '#')}>Kontakt</div>
          </div>
          {/* FEIL 6: søk er en <div> med bare et ikon … */}
          <div className="ikonknapp" onClick={() => alert('Søket kommer snart!')}>
            <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
          </div>
          {/* … og «Min side» er en <button> uten navn */}
          <button className="ikonknapp" onClick={() => alert('Min side kommer snart!')}>
            <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="currentColor" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="currentColor" /></svg>
          </button>
        </div>
      </div>

      {/* FEIL 8: rullende varsel som ikke kan stoppes og ignorerer prefers-reduced-motion */}
      <div className="varsel">
        <div className="varsel__indre">
          <div className="varsel__spor">
            <span className="varsel__tekst">Viktig: Fra 1. november innføres ny beboerparkeringssone C i Strandlia. Søk innen 15. oktober for å få tillatelse fra første dag.</span>
          </div>
        </div>
      </div>

      <div className="side">
        <div className="brodsmuler">
          <span>Forside</span> › <span>Trafikk og parkering</span> › <span>Beboerparkering</span>
        </div>

        {/* FEIL 9: sidetittelen er en <div> */}
        <div className="h1">Søk om beboerparkering</div>
        <div className="ingress">Bor du i en sone med beboerparkering, kan du søke om parkeringstillatelse for bilen din. Tillatelsen gjelder i ett år fra den blir innvilget.</div>

        {/* FEIL 7: ingen alt – skjermleseren leser filnavnet */}
        <div className="hero"><img src="/img/IMG_4032.svg" /></div>

        <div className="to-kol">
          <div>
            <div className="h2">Før du søker</div>
            {/* FEIL 11: lenketekster som «Klikk her» og «Les mer» */}
            <p>Du må være folkeregistrert på en adresse i sonen, og bilen må være registrert på deg eller noen i husstanden din. <a href="#">Klikk her</a> for å lese reglene.</p>
            <p>Usikker på hvilken sone du bor i? Se kartet under. <a href="#">Les mer</a></p>
            <div className="sonekart"><img src="/img/sonekart_v3_FINAL.svg" /></div>
          </div>
          <div className="kort">
            {/* FEIL 9: de eneste overskriftene er to <h4> */}
            <h4>Pris og behandlingstid</h4>
            <p><b>Pris:</b> 1 200 kr per år</p>
            <p><b>El-bil:</b> 600 kr per år</p>
            <p className="liten">Behandlingstiden er normalt 2–3 uker. Du får svar på e-post.</p>
            <p><a href="#">Les mer</a></p>
          </div>
        </div>

        <h4 className="h2">Søknadsskjema</h4>

        {/* FEIL 16: en generell feilmelding som ikke leses opp */}
        <div className="feilmelding" id="feilmelding" style={visFeilmelding ? { display: 'block' } : undefined}>Noe gikk galt. Sjekk skjemaet og prøv igjen.</div>

        {/* FEIL 12: skjemafelt uten label – bare placeholder eller løs tekst */}
        <div className="skjema" ref={skjema}>
          <div className="rad">
            <div className="felt"><input type="text" id="fornavn" placeholder="Fornavn" className={feil.has('fornavn') ? 'feil' : undefined} /></div>
            <div className="felt"><input type="text" id="etternavn" placeholder="Etternavn" className={feil.has('etternavn') ? 'feil' : undefined} /></div>
          </div>
          <div className="rad">
            <div className="felt"><input type="text" id="epost" placeholder="E-post" className={feil.has('epost') ? 'feil' : undefined} /></div>
            <div className="felt">
              <span className="etikett">Mobil</span>
              {/* FEIL 13: tabIndex={1}, så første Tab hopper rett hit */}
              <input type="text" id="mobil" tabIndex={1} />
            </div>
          </div>
          <div className="felt">
            <span className="etikett">Adresse</span>
            <input type="text" id="adresse" className={feil.has('adresse') ? 'feil' : undefined} />
          </div>
          <div className="felt">
            <span className="etikett">Hvilken sone bor du i?</span>
            {/* FEIL 14: sonevalget er <div>-er uten rolle og tilstand */}
            <div className={klasser('chips', feil.has('sone') && 'feil')} id="soner">
              {SONER.map((s) => (
                <div key={s} className={klasser('chip', sone === s && 'valgt')} onClick={() => settSone(s)}>Sone {s}</div>
              ))}
            </div>
          </div>
          <div className="felt kort-felt">
            <span className="etikett">Registreringsnummer</span>
            <span className="hjelp">For eksempel EL 12345</span>
            <input type="text" id="regnr" className={feil.has('regnr') ? 'feil' : undefined} />
          </div>
          <div className="felt">
            {/* FEIL 14: avkrysningsboksen er en <div> uten rolle og tilstand */}
            <div className={klasser('avkrysning', bekreftet && 'pa', feil.has('bekreft') && 'feil')} id="bekreft" onClick={() => settBekreftet(!bekreftet)}>
              <span className="boks" /> Jeg bekrefter at opplysningene er riktige
            </div>
          </div>

          {/* FEIL 15: «Send søknad» er en <div> – skjemaet kan ikke sendes med tastatur */}
          <div className="knapp" onClick={sendSoknad}>Send søknad</div>
        </div>
      </div>

      {/* FEIL 18: bunnen har aria-hidden="true", men lenkene der kan fortsatt få fokus */}
      <div className="bunn" aria-hidden="true">
        <div className="bunn__indre">
          <div>
            <div className="bunn__tittel">Fjordvik kommune</div>
            <p>Rådhusplassen 1, 9999 Fjordvik<br />Telefon 99 99 99 99</p>
          </div>
          <div>
            <div className="bunn__tittel">Snarveier</div>
            <ul>
              <li><a href="#">Kontakt oss</a></li>
              <li><a href="#">Tilgjengelighetserklæring</a></li>
              <li><a href="#">Personvern og informasjonskapsler</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* FEIL 19: cookie-banneret kan ikke lukkes med tastatur og dekker bunnen av siden */}
      <div className="cookies" id="cookies" style={cookiesSkjult ? { display: 'none' } : undefined}>
        <div className="cookies__indre">
          <p>Vi bruker informasjonskapsler for å forbedre nettstedet og lage statistikk.</p>
          <div className="knapper">
            <div className="knapp" onClick={() => settCookiesSkjult(true)}>Godta alle</div>
            <div className="knapp knapp--sekundaer" onClick={() => settCookiesSkjult(true)}>Bare nødvendige</div>
          </div>
        </div>
      </div>

      {/* FEIL 17: kvitteringen er en toast som forsvinner etter 3 sekunder og aldri leses opp */}
      <div className="toast" id="toast" style={visToast ? { display: 'block' } : undefined}>Søknaden er sendt!</div>
    </>
  );
}
