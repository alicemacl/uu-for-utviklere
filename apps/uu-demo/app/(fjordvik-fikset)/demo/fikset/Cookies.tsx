'use client';

import { useState } from 'react';

// Informasjonskapsler: ekte knapper, og fokus flyttes til innholdet etterpå
export function Cookies() {
  const [skjult, settSkjult] = useState(false);

  function velg() {
    settSkjult(true);
    document.getElementById('hoved')?.focus();
  }

  return (
    <section className="cookies" id="cookies" aria-label="Informasjonskapsler" hidden={skjult}>
      <div className="cookies__indre">
        <p>Vi bruker informasjonskapsler for å forbedre nettstedet og lage statistikk.</p>
        <div className="knapper">
          <button type="button" className="knapp" onClick={velg}>Godta alle</button>
          <button type="button" className="knapp knapp--sekundaer" onClick={velg}>Bare nødvendige</button>
        </div>
      </div>
    </section>
  );
}
