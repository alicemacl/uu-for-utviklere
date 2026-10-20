import type { Metadata } from 'next';
import s from '../../skjema.module.css';
import b from './broken.module.css';
import { Pamelding } from './Pamelding';

export const metadata: Metadata = { title: 'Påmelding' };

export default function Broken() {
  return (
    <div className={b.side}>
      <div className={s.header}>
        <img src="/logo.svg" className={s.logo} />
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
