'use client';

import { useRef, useState, type FormEvent } from 'react';

export default function Epostskjema() {
  const felt = useRef<HTMLInputElement>(null);
  const [feil, settFeil] = useState(false);
  const [kvittering, settKvittering] = useState('');

  function sjekk(event: FormEvent) {
    event.preventDefault();
    const ugyldig = !felt.current?.value.includes('@');
    settFeil(ugyldig);
    settKvittering(ugyldig ? '' : 'Takk!');
  }

  return (
    <form onSubmit={sjekk} noValidate>
      <label htmlFor="epost-23f">E-post</label>
      <input ref={felt} type="email" id="epost-23f" style={{ borderColor: feil ? 'red' : undefined }} />
      <div className="rodtekst">{feil ? 'Ugyldig' : ''}</div>
      <button className="knapp">Send</button>
      <div className="kvittering">{kvittering}</div>
    </form>
  );
}
