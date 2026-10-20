'use client';

import { useId } from 'react';

export default function Pamelding() {
  const id = useId();

  return (
    <>
      <p>Felt merket med (må fylles ut) er påkrevd.</p>
      <div className="felt"><label htmlFor={`${id}-navn`}>Navn (må fylles ut)</label><input id={`${id}-navn`} required /></div>
      <div className="felt"><label htmlFor={`${id}-firma`}>Firma</label><input id={`${id}-firma`} /></div>
      <div className="felt"><label htmlFor={`${id}-epost`}>E-post (må fylles ut)</label><input id={`${id}-epost`} type="email" required autoComplete="email" /></div>
    </>
  );
}
