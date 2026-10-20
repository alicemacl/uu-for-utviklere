'use client';

// Ikonknapp med et navn: teksten er skjult visuelt, men skjermleseren leser «Søk, knapp»
export function Sokeknapp() {
  return (
    <button type="button" className="ikonknapp" onClick={() => alert('Søket kommer snart!')}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
      <span className="vh">Søk</span>
    </button>
  );
}
