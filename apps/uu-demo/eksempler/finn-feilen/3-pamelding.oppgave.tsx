'use client';

import { useId } from 'react';

export default function Pamelding() {
  const id = useId();

  return (
    <>
      <p>Felt med rød ledetekst må fylles ut.</p>
      <div className="felt"><label htmlFor={`${id}-navn`} style={{ color: '#c92a2a' }}>Navn</label><input id={`${id}-navn`} /></div>
      <div className="felt"><label htmlFor={`${id}-firma`}>Firma</label><input id={`${id}-firma`} /></div>
      <div className="felt"><label htmlFor={`${id}-epost`} style={{ color: '#c92a2a' }}>E-post</label><input id={`${id}-epost`} type="email" /></div>
    </>
  );
}
