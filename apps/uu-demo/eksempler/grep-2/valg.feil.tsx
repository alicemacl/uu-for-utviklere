'use client';

import { useState } from 'react';

const SONER = ['Sone A', 'Sone B', 'Sone C'];

export default function Sonevalg() {
  const [valgt, settValgt] = useState('');

  return (
    <>
      <div className="etikett">Hvilken sone bor du i?</div>
      <div className="chips">
        {SONER.map((sone) => (
          <div key={sone} className={sone === valgt ? 'chip valgt' : 'chip'} onClick={() => settValgt(sone)}>
            {sone}
          </div>
        ))}
      </div>
    </>
  );
}
