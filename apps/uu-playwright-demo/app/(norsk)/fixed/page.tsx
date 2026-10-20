import type { Metadata } from 'next';
import s from '../../skjema.module.css';
import { Pamelding } from './Pamelding';

export const metadata: Metadata = { title: 'Påmelding – UU-kurset' };

export default function Fixed() {
  return (
    <>
      <header className={s.header}>
        <img src="/logo.svg" className={s.logo} alt="Kurskatalogen" />
        <nav className={s.nav} aria-label="Hovedmeny">
          <a href="/">Hjem</a>
          <a href="/kurs">Kurs</a>
        </nav>
      </header>

      <main className={s.content}>
        <h1 className={s.title}>Meld deg på UU-kurset</h1>
        <Pamelding />
      </main>
    </>
  );
}
