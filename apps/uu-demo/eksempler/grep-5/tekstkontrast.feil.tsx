import s from './tekstkontrast.feil.module.css';

export default function Behandlingstid() {
  return (
    <p className={s.info}>
      Behandlingstiden er normalt 2–3 uker.<br />
      <small>Sist oppdatert 3. oktober</small>
    </p>
  );
}
