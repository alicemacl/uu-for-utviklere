export default function Verktoyknapper() {
  return (
    <div className="ikonrad">
      <button type="button" className="ikonknapp">
        <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
      </button>
      <button type="button" className="ikonknapp">
        <svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z" fill="currentColor" /></svg>
      </button>
      <button type="button" className="ikonknapp">
        <svg viewBox="0 0 24 24"><path d="M6 7h12l-1 14H7zM9 4h6v2H9z" fill="currentColor" /></svg>
      </button>
    </div>
  );
}
