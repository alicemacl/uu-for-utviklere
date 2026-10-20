import s from './feltkant.riktig.module.css';

export default function Navnefelt() {
  return (
    <div className={`felt ${s.kant}`}>
      <label htmlFor="navn-52r">Navn</label>
      <input id="navn-52r" />
    </div>
  );
}
