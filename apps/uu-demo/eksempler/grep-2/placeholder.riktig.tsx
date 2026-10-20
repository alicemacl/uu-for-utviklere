export default function Telefonfelt() {
  return (
    <>
      <label htmlFor="tlf-22">Telefon</label>
      <span className="hjelp" id="tlf-22-hjelp">8 siffer, uten landskode</span>
      <input type="tel" id="tlf-22" autoComplete="tel" aria-describedby="tlf-22-hjelp" />
    </>
  );
}
