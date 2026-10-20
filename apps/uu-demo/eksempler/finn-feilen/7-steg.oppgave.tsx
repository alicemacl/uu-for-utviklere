export default function Steg() {
  return (
    <>
      <p>Steg 2 av 3: Om bilen</p>
      <div className="knapper" style={{ flexDirection: 'row-reverse', justifyContent: 'flex-end' }}>
        <button type="button" className="knapp">Neste</button>
        <button type="button" className="knapp sek">Tilbake</button>
      </div>
    </>
  );
}
