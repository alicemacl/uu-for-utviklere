'use client';

import { useState, type FormEvent } from 'react';
import s from '../../skjema.module.css';

export function Pamelding() {
  const [status, setStatus] = useState('');

  function send(e: FormEvent) {
    e.preventDefault();
    setStatus('Takk, du er påmeldt!');
  }

  return (
    <>
      <form id="pamelding" onSubmit={send}>
        <div className={s.row}>
          {/* DOM-rekkefølge = visuell rekkefølge */}
          <label className={s.field}>Navn <input id="navn" name="navn" autoComplete="name" required /></label>
          <label className={s.field}>E-post
            <input id="epost" name="epost" type="email" autoComplete="email" required aria-describedby="epost-hint" />
          </label>
        </div>
        <p id="epost-hint" className={s.hint}>Vi deler aldri e-postadressen din.</p>

        <div className={s.actions}>
          <button type="submit" className={s.btn}>Send inn</button>
          <button type="reset" className={`${s.btn} ${s.secondary}`}>Avbryt</button>
        </div>
      </form>
      <p id="status" className={s.status} role="status">{status}</p>
    </>
  );
}
