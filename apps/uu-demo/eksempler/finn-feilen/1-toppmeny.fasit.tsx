export default function Toppmeny() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.5rem', color: '#0b3a44' }}>Fjordvik</span>
      <button type="button" className="ikonknapp" aria-label="Meny" aria-expanded={false}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}
