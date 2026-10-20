import s from './farge-alene.feil.module.css';

export default function Regeltekst() {
  return (
    <p className={s.tekst}>
      Du må være folkeregistrert i sonen. Les <a href="#regler">reglene for beboerparkering</a> før du søker.
    </p>
  );
}
