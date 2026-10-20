import s from './fokusramme.riktig.module.css';

export default function Verktoylinje() {
  return (
    <div className={`${s.verktoy} knapper`}>
      <a href="#tjenester">Tjenester</a>
      <a href="#kontakt">Kontakt</a>
      <button type="button" className="knapp">Søk</button>
      <button type="button" className="knapp sek">Logg inn</button>
    </div>
  );
}
