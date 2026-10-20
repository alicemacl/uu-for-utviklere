import Link from 'next/link';
import { BlaMellomSider } from './BlaMellomSider';
import { Hovedmeny } from './Hovedmeny';
import s from './Skall.module.css';

// Skallet rundt alle sidene unntatt demosidene: hopp-lenke, topp med meny, innhold og bunn
export function Skall({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className={s.hopp} href="#innhold">Hopp til hovedinnhold</a>
      <header className={s.topp}>
        <div className={s.toppIndre}>
          <Link className={s.merkevare} href="/">
            <span className={s.merkevarePrikk} aria-hidden="true" />
            UU-demo
          </Link>
          <Hovedmeny />
        </div>
      </header>
      <main id="innhold" className={s.innhold}>
        {children}
        <BlaMellomSider />
      </main>
      <footer className={s.bunn}>
        <p>Demo-app til kurset «UU for utviklere». Feilene på denne siden er med vilje.</p>
      </footer>
    </>
  );
}
