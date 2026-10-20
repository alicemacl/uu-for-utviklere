export default function Sonevalg() {
  return (
    <fieldset>
      <legend>Hvilken sone bor du i?</legend>
      <div className="chips">
        <label className="chip"><input type="radio" name="sone-24" /> Sone A</label>
        <label className="chip"><input type="radio" name="sone-24" /> Sone B</label>
        <label className="chip"><input type="radio" name="sone-24" /> Sone C</label>
      </div>
    </fieldset>
  );
}
