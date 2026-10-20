'use client';

import { useState } from 'react';

// Rullende varsel som kan stoppes (WCAG 2.2.2). Med «Reduser bevegelse» står teksten stille (se fikset.module.css).
export function Varsel() {
  const [stoppet, settStoppet] = useState(false);

  return (
    <section className={stoppet ? 'varsel stoppet' : 'varsel'} id="varsel" aria-label="Viktig melding">
      <div className="varsel__indre">
        <div className="varsel__spor">
          <p className="varsel__tekst" style={{ margin: 0 }}><strong>Viktig:</strong> Fra 1. november innføres ny beboerparkeringssone C i Strandlia. Søk innen 15. oktober for å få tillatelse fra første dag.</p>
        </div>
        <button type="button" className="varsel__pause" aria-pressed={stoppet} onClick={() => settStoppet(!stoppet)}>
          {stoppet ? 'Start rulling' : 'Stopp rulling'}
        </button>
      </div>
    </section>
  );
}
