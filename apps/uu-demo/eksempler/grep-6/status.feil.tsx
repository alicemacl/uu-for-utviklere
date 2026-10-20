'use client';

import { useState } from 'react';

export default function Kladd() {
  const [melding, settMelding] = useState('');

  return (
    <div>
      <button type="button" className="knapp" onClick={() => settMelding('Søknaden er lagret som kladd.')}>
        Lagre kladd
      </button>
      <div className="status-ut">{melding}</div>
    </div>
  );
}
