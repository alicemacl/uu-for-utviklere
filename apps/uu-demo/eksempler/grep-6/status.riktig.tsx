'use client';

import { useState } from 'react';

export default function Kladd() {
  const [melding, settMelding] = useState('');

  function lagreKladd() {
    settMelding('Søknaden er lagret som kladd.');
  }

  return (
    <div>
      <button type="button" className="knapp" onClick={lagreKladd}>
        Lagre kladd
      </button>
      {/* Finnes fra start – bare teksten endres, og da blir den lest opp */}
      <div className="status-ut" role="status">{melding}</div>
    </div>
  );
}
