'use client';

import { useState } from 'react';

export default function SlettSoknad() {
  const [apen, settApen] = useState(false);

  return (
    <>
      <button type="button" className="knapp fare" onClick={() => settApen(true)}>Slett søknad</button>

      {apen && (
        <div className="overlay">
          <div className="modal">
            <div className="modal__tittel">Slette søknaden?</div>
            <p>Dette kan ikke angres.</p>
            <div className="knapper">
              <div className="knapp sek" onClick={() => settApen(false)}>Avbryt</div>
              <div className="knapp fare" onClick={() => settApen(false)}>Slett</div>
            </div>
          </div>
        </div>
      )}
      <p style={{ marginTop: '1rem' }}><a href="#bak-dialogen">En lenke bak dialogen</a></p>
    </>
  );
}
