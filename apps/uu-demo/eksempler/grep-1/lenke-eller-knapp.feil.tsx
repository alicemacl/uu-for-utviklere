'use client';

export default function Regellenke() {
  return (
    <p>
      <span className="lenke" onClick={() => (window.location.href = '#regler')}>
        Les reglene for beboerparkering
      </span>
    </p>
  );
}
