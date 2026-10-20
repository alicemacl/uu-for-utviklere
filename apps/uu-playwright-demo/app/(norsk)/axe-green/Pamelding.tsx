'use client';

import { useRef, useState, type MouseEvent } from 'react';
import s from '../../skjema.module.css';

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
          <label className={`${s.field} ${s.second}`}>E-post <input id="epost" type="email" /></label>
          <label className={`${s.field} ${s.first}`}>Navn <input id="navn" /></label>
        </div>
        <p className={s.hint}>Vi deler aldri e-postadressen din.</p>

        <div className={s.actions}>
          <a href="#" className={s.btn} onClick={send}>Send inn</a>
          <div className={`${s.btn} ${s.secondary}`} onClick={avbryt}>Avbryt</div>
        </div>
      </form>
      <p id="status" className={s.status}>{status}</p>
    </>
  );
}
