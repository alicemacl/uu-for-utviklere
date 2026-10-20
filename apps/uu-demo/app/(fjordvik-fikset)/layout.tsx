import type { Metadata } from 'next';
import f from '@/komponenter/fjordvik/Fjordvik.module.css';
import x from './fikset.module.css';

// Egen rot-layout for den fiksede versjonen: norsk språk, en tittel som sier noe, og zoom er lov.
// Rekkefølgen på importene over er viktig: fikset.module.css må komme etter Fjordvik.module.css.

export const metadata: Metadata = { title: 'Søk om beboerparkering – Fjordvik kommune' };

export default function RotFikset({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${f.fjordvik} ${x.fiksetside}`}>
      <body>{children}</body>
    </html>
  );
}
