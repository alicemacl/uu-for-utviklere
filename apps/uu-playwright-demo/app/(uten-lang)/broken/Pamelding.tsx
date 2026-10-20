'use client';

import { useRef, useState, type MouseEvent } from 'react';
import s from '../../skjema.module.css';
import b from './broken.module.css';

export function Pamelding() {
  const skjema = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');

  function send(e: MouseEvent) {
    e.preventDefault();
    setStatus('Takk, du er påmeldt!');
  }

  function avbryt() {
    skjema.current?.reset();
  }

  return (
    <>
      <form ref={skjema}>
        <div className={s.row}>
          {/* Visuelt: Navn, så E-post. I DOM-en: motsatt. */}
          <input id="epost" type="email" placeholder="E-post" className={s.second} />
          <input id="navn" placeholder="Navn" className={s.first} />
        </div>
        <p className={`${s.hint} ${b.lysHint}`}>Vi deler aldri e-postadressen din.</p>

        <div className={s.actions}>
          <a href="#" className={s.btn} onClick={send}>Send inn</a>
          <div className={`${s.btn} ${s.secondary}`} onClick={avbryt}>Avbryt</div>
        </div>
      </form>
      <p id="status" className={s.status}>{status}</p>
    </>
  );
}
