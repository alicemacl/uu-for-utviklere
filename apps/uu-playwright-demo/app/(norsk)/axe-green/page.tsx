import type { Metadata } from 'next';
import s from '../../skjema.module.css';
import a from './axe-green.module.css';
import { Pamelding } from './Pamelding';

export const metadata: Metadata = { title: 'Påmelding' };

// Alt axe klagde på er fikset. Det betyr ikke at siden er universelt utformet.
export default function AxeGreen() {
  return (
    <div className={a.side}>
      <div className={s.header}>
        <img src="/logo.svg" className={s.logo} alt="Kurskatalogen" />
        <div className={s.nav}>
          <a href="/">Hjem</a>
          <a href="/kurs">Kurs</a>
        </div>
      </div>

      <div className={s.content}>
        <div className={s.title}>Meld deg på UU-kurset</div>
        <Pamelding />
      </div>
    </div>
  );
}
