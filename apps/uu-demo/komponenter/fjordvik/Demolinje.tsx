'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import d from './Demolinje.module.css';

type Props = { variant: 'feil' | 'ok' };

function Linje({ variant }: Props) {
  // ?ren i adressen skjuler demolinjen – fint når du tar opp skjermleserdemoen
  const ren = useSearchParams().has('ren');
  if (ren) return null;

  const feil = variant === 'feil';
  return (
    <nav className={d.demolinje} aria-label="Demo">
      <span className={`${d.merke} ${feil ? d.merkeFeil : d.merkeOk}`}>{feil ? 'Feil-versjon' : 'Fikset versjon'}</span>
      <ul>
        <li>{feil ? <Link href="/demo/fikset">Vis fikset</Link> : <Link href="/demo/feil">Vis feil</Link>}</li>
        <li><Link href="/">Oversikt</Link></li>
      </ul>
    </nav>
  );
}

// Demolinjen hører ikke til demoen. Skjul den med /demo/feil?ren
export function Demolinje(props: Props) {
  return (
    <Suspense fallback={null}>
      <Linje {...props} />
    </Suspense>
  );
}
