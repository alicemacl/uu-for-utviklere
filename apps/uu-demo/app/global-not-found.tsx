import type { Metadata } from 'next';
import Link from 'next/link';
import s from './global-not-found.module.css';
import './globals.css';

// Appen har flere rot-layouter, så 404-siden må ha sin egen <html lang="no">.
// Standardsiden til Next mangler lang i dette oppsettet.
export const metadata: Metadata = {
  title: 'Fant ikke siden – UU-demo',
};

export default function FantIkkeSiden() {
  return (
    <html lang="no">
      <body>
        <main className={s.innhold}>
          <p className={s.kode}>404</p>
          <h1>Fant ikke siden</h1>
          <p>Adressen finnes ikke i demo-appen. Kanskje den har flyttet da appen gikk over til Next.js?</p>
          <p>
            <Link href="/">Gå til oversikten</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
