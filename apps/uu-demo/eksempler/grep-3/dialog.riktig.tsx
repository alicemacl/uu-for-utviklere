'use client';

import { useRef } from 'react';

export default function SlettSoknad() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className="knapp fare" onClick={() => dialog.current?.showModal()}>Slett søknad</button>

      <dialog ref={dialog} className="modal" aria-labelledby="modal-34r-tittel">
        <h2 id="modal-34r-tittel">Slette søknaden?</h2>
        <p>Dette kan ikke angres.</p>
        <form method="dialog">
          <button className="knapp sek" value="avbryt">Avbryt</button>
          <button className="knapp fare" value="slett">Slett</button>
        </form>
      </dialog>
      <p style={{ marginTop: '1rem' }}><a href="#bak-dialogen">En lenke bak dialogen</a></p>
    </>
  );
}
