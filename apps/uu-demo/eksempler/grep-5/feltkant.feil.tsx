import s from './feltkant.feil.module.css';

export default function Navnefelt() {
  return (
    <div className={`felt ${s.kant}`}>
      <label htmlFor="navn-52f">Navn</label>
      <input id="navn-52f" />
    </div>
  );
}
