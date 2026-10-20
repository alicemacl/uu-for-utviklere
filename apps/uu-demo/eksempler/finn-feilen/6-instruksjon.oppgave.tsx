export default function Instruksjon() {
  return (
    <>
      <p>Trykk på den grønne knappen for å fortsette.</p>
      <div className="knapper">
        <button type="button" className="knapp" style={{ background: '#5f6b6e' }}>Avbryt</button>
        <button type="button" className="knapp" style={{ background: '#2b7a3d' }}>Fortsett</button>
      </div>
    </>
  );
}
