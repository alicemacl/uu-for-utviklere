'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { REKKEFOLGE, SIDER, sideForUrl } from './sider';
import s from './Skall.module.css';

// «Forrige» og «Neste» nederst på grep-sidene, finn feilen og sjekklista
export function BlaMellomSider() {
  const side = sideForUrl(usePathname());
  const plass = side ? REKKEFOLGE.indexOf(side.id) : -1;
  if (plass === -1) return null;

  const finn = (id?: string) => SIDER.find((s) => s.id === id);
  const forrige = finn(REKKEFOLGE[plass - 1]);
  const neste = finn(REKKEFOLGE[plass + 1]);

  return (
    <nav className={s.bla} aria-label="Bla mellom sidene">
      {forrige && (
        <Link href={forrige.url}>
          <small>← Forrige</small>
          {forrige.tittel}
        </Link>
      )}
      {neste && (
        <Link href={neste.url} className={s.neste}>
          <small>Neste →</small>
          {neste.tittel}
        </Link>
      )}
    </nav>
  );
}
