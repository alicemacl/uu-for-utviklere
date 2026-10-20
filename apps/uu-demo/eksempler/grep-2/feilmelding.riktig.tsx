'use client';

import { useRef, useState, type FormEvent } from 'react';
import { flushSync } from 'react-dom';

export default function Epostskjema() {
  const felt = useRef<HTMLInputElement>(null);
  const [feil, settFeil] = useState(false);
  const [status, settStatus] = useState('');

  function sjekk(event: FormEvent) {
    event.preventDefault();
    const ugyldig = !felt.current?.value.includes('@');

    // Oppdater DOM-en først, så skjermleseren hører «ugyldig» og feilmeldingen når fokus flyttes
    flushSync(() => {
      settFeil(ugyldig);
      settStatus(ugyldig ? '' : 'Takk!');
    });
    if (ugyldig) felt.current?.focus();
  }

  return (
    <form onSubmit={sjekk} noValidate>
      <label htmlFor="epost-23r">E-post</label>
      <p className="feiltekst" id="epost-23r-feil" hidden={!feil}>
        <span aria-hidden="true">⚠</span>
        Feil: Skriv en e-postadresse med @, for eksempel navn@eksempel.no
      </p>
      <input
        ref={felt}
        type="email"
        id="epost-23r"
        autoComplete="email"
        aria-invalid={feil || undefined}
        aria-describedby={feil ? 'epost-23r-feil' : undefined}
      />
      <button className="knapp">Send</button>
      <div className="kvittering" role="status">{status}</div>
    </form>
  );
}
