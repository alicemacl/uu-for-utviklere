'use client';

import { useState } from 'react';

export default function Varsling() {
  const [pa, settPa] = useState(false);

  return (
    <div className="bryterrad">
      <button type="button" className="vippe" role="switch" aria-checked={pa} aria-labelledby="o4-tekst"
        onClick={() => settPa(!pa)}></button>
      <span id="o4-tekst">Varsle meg på SMS</span>
    </div>
  );
}
