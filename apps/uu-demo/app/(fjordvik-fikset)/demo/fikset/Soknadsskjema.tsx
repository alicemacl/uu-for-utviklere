'use client';

import { useRef, useState, type FormEvent } from 'react';
import { flushSync } from 'react-dom';

type Felt = 'fornavn' | 'etternavn' | 'epost' | 'adresse' | 'sone' | 'regnr' | 'bekreft';
type Feil = { felt: Felt; mal: string; melding: string };

/** Feilmeldingen står mellom ledeteksten og feltet, med ikon og skjult «Feil:» for skjermleseren */
function Feiltekst({ felt, children }: { felt: Felt; children: React.ReactNode }) {
  return (
    <p className="feiltekst" id={`${felt}-feil`}>
      <span aria-hidden="true">⚠</span>
      <span><span className="vh">Feil: </span>{children}</span>
    </p>
  );
}

// Skjema med feilsammendrag, aria-invalid og aria-describedby
export function Soknadsskjema() {
  const [feil, settFeil] = useState<Feil[]>([]);
  const [visSammendrag, settVisSammendrag] = useState(false);
  const [sendtTil, settSendtTil] = useState<string | null>(null);
  const sammendrag = useRef<HTMLDivElement>(null);
  const kvittering = useRef<HTMLDivElement>(null);
  const opprinneligTittel = useRef<string | null>(null);

  const melding = (felt: Felt) => feil.find((f) => f.felt === felt)?.melding;

  // Kobler feltet til feilmeldingen (og ev. hjelpeteksten) – og fjerner koblingen igjen når feilen er rettet
  function feilkobling(felt: Felt, ...hjelp: string[]) {
    const ugyldig = melding(felt) !== undefined;
    const beskrevet = [ugyldig ? `${felt}-feil` : '', ...hjelp].filter(Boolean).join(' ');
    return { 'aria-invalid': ugyldig ? true : undefined, 'aria-describedby': beskrevet || undefined };
  }

  function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    opprinneligTittel.current ??= document.title;
    const data = new FormData(e.currentTarget);
    const verdi = (navn: string) => String(data.get(navn) ?? '');
    const nye: Feil[] = [];

    function sjekk(felt: Felt, gyldig: boolean, tekst: string, mal: string = felt) {
      if (!gyldig) nye.push({ felt, mal, melding: tekst });
    }

    sjekk('fornavn', verdi('fornavn').trim() !== '', 'Skriv fornavnet ditt.');
    sjekk('etternavn', verdi('etternavn').trim() !== '', 'Skriv etternavnet ditt.');
    sjekk('epost', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(verdi('epost').trim()), 'Skriv e-postadressen din, for eksempel navn@eksempel.no.');
    sjekk('adresse', verdi('adresse').trim() !== '', 'Skriv adressen din.');
    sjekk('sone', data.has('sone'), 'Velg hvilken sone du bor i.', 'sone-a');
    sjekk('regnr', /^[A-ZÆØÅa-zæøå]{2}\s?\d{4,5}$/.test(verdi('regnr').trim()), 'Skriv registreringsnummeret, for eksempel EL 12345.');
    sjekk('bekreft', data.has('bekreft'), 'Du må bekrefte at opplysningene er riktige.');

    if (nye.length) {
      flushSync(() => {
        settFeil(nye);
        settVisSammendrag(true);
      });
      document.title = 'Feil i skjema – ' + opprinneligTittel.current;
      sammendrag.current?.focus();
      return;
    }

    // Alt ok: vis kvittering og flytt fokus dit
    flushSync(() => {
      settFeil([]);
      settVisSammendrag(false);
      settSendtTil(verdi('epost').replace(/[<>&"]/g, ''));
    });
    document.title = 'Søknaden er sendt – ' + opprinneligTittel.current;
    kvittering.current?.focus();
  }

  // Lenkene i feilsammendraget flytter fokus til feltet, ikke bare rulling
  function gaTilFelt(e: React.MouseEvent<HTMLAnchorElement>, mal: string) {
    e.preventDefault();
    document.getElementById(mal)?.focus();
  }

  return (
    <>
      <div id="feilsammendrag" className="feilsammendrag" tabIndex={-1} hidden={!visSammendrag} ref={sammendrag}>
        {feil.length > 0 && (
          <>
            <h2>{`Skjemaet har ${feil.length} feil`}</h2>
            <ul>
              {feil.map((f) => (
                <li key={f.felt}><a href={`#${f.mal}`} onClick={(e) => gaTilFelt(e, f.mal)}>{f.melding}</a></li>
              ))}
            </ul>
          </>
        )}
      </div>

      {sendtTil !== null ? (
        <div className="kvittering" tabIndex={-1} ref={kvittering}>
          <h2>Søknaden er sendt</h2>
          <p>{`Vi har sendt en bekreftelse til ${sendtTil}. Saksnummeret ditt er 2026/04817.`}</p>
        </div>
      ) : (
        <form id="soknad" className="skjema" noValidate aria-labelledby="skjema-tittel" onSubmit={send}>
          <div className="rad">
            <div className="felt">
              <label htmlFor="fornavn">Fornavn</label>
              {melding('fornavn') && <Feiltekst felt="fornavn">{melding('fornavn')}</Feiltekst>}
              <input type="text" id="fornavn" name="fornavn" autoComplete="given-name" {...feilkobling('fornavn')} />
            </div>
            <div className="felt">
              <label htmlFor="etternavn">Etternavn</label>
              {melding('etternavn') && <Feiltekst felt="etternavn">{melding('etternavn')}</Feiltekst>}
              <input type="text" id="etternavn" name="etternavn" autoComplete="family-name" {...feilkobling('etternavn')} />
            </div>
          </div>
          <div className="rad">
            <div className="felt">
              <label htmlFor="epost">E-post</label>
              {melding('epost') && <Feiltekst felt="epost">{melding('epost')}</Feiltekst>}
              <input type="email" id="epost" name="epost" autoComplete="email" {...feilkobling('epost')} />
            </div>
            <div className="felt">
              <label htmlFor="mobil">Mobil</label>
              <input type="tel" id="mobil" name="mobil" autoComplete="tel" />
            </div>
          </div>
          <div className="felt">
            <label htmlFor="adresse">Adresse</label>
            {melding('adresse') && <Feiltekst felt="adresse">{melding('adresse')}</Feiltekst>}
            <input type="text" id="adresse" name="adresse" autoComplete="street-address" {...feilkobling('adresse')} />
          </div>

          <fieldset className="felt" id="sone-gruppe" {...feilkobling('sone', 'sone-hjelp')}>
            <legend className="etikett">Hvilken sone bor du i?</legend>
            <span className="hjelp" id="sone-hjelp">Se kartet over hvis du er usikker.</span>
            {melding('sone') && <Feiltekst felt="sone">{melding('sone')}</Feiltekst>}
            <div className="chips">
              <label className="chip"><input type="radio" name="sone" value="A" id="sone-a" /> Sone A</label>
              <label className="chip"><input type="radio" name="sone" value="B" /> Sone B</label>
              <label className="chip"><input type="radio" name="sone" value="C" /> Sone C</label>
            </div>
          </fieldset>

          <div className="felt kort-felt">
            <label htmlFor="regnr">Registreringsnummer</label>
            {melding('regnr') && <Feiltekst felt="regnr">{melding('regnr')}</Feiltekst>}
            <span className="hjelp" id="regnr-hjelp">For eksempel EL 12345</span>
            <input type="text" id="regnr" name="regnr" {...feilkobling('regnr', 'regnr-hjelp')} />
          </div>

          <div className="felt">
            {melding('bekreft') && <Feiltekst felt="bekreft">{melding('bekreft')}</Feiltekst>}
            <label className="avkrysning"><input type="checkbox" id="bekreft" name="bekreft" {...feilkobling('bekreft')} /> Jeg bekrefter at opplysningene er riktige</label>
          </div>

          <button type="submit" className="knapp">Send søknad</button>
        </form>
      )}
    </>
  );
}
