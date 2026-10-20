import s from './fast-bredde.riktig.module.css';

export default function Priskort() {
  return (
    <div className={`kortdemo ${s.kort}`}>
      <p className="kort-tittel">Beboerparkering</p>
      <p>Tillatelsen gjelder i ett år. Søk innen 15. oktober for å få tillatelse fra første dag.</p>
      <p className={s.priser}><span>Pris: 1 200 kr per år</span><span>El-bil: 600 kr per år</span></p>
    </div>
  );
}
