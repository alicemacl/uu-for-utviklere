'use client';

import { useState } from 'react';
import s from './velg-sone.feil.module.css';

const SONER = ['Sone A – Sentrum', 'Sone B – Havna', 'Sone C – Strandlia'];

// Hjemmelaget: rollene er på plass, men oppførselen mangler
export default function VelgSone() {
  const [tekst, settTekst] = useState('');
  const [apen, settApen] = useState(false);
  const treff = SONER.filter((sone) => sone.toLowerCase().includes(tekst.toLowerCase()));

  return (
    <div className={s.velger}>
      <span className="etikett">Velg sone</span>
      <input
        role="combobox"
        aria-expanded={false}
        className={s.felt}
        value={tekst}
        onFocus={() => settApen(true)}
        onChange={(e) => {
          settTekst(e.target.value);
          settApen(true);
        }}
      />
      {apen && (
        <div role="listbox" className={s.liste}>
          {treff.map((sone) => (
            <div
              key={sone}
              role="option"
              className={s.valg}
              onClick={() => {
                settTekst(sone);
                settApen(false);
              }}
            >
              {sone}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
