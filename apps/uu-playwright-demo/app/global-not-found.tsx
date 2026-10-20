import type { Metadata } from 'next';
import s from './skjema.module.css';
import './globals.css';

// Appen har flere rot-layouter, så 404-siden må ha sin egen <html lang="no">.
// «Kurs»-lenken i menyen havner her.
export const metadata: Metadata = {
  title: 'Fant ikke siden – UU-kurset',
};

export default function FantIkkeSiden() {
  return (
    <html lang="no">
      <body>
        <main className={s.content}>
          <h1 className={s.title}>Fant ikke siden</h1>
          <p>Denne siden finnes ikke i demoen.</p>
          <p>
            <a href="/fixed">Tilbake til påmeldingen</a>
          </p>
        </main>
      </body>
    </html>
  );
}
