import type { Metadata, Viewport } from 'next';
import f from '@/komponenter/fjordvik/Fjordvik.module.css';
import x from './feil.module.css';

// Egen rot-layout for feil-versjonen, fordi <html>, tittelen og viewport skal være feil.
// Rekkefølgen på importene over er viktig: feil.module.css må komme etter Fjordvik.module.css.

// FEIL 1: standardtittelen fra malen ble aldri endret
export const metadata: Metadata = { title: 'React App' };

// FEIL 2: hindrer zoom på mobil
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RotFeil({ children }: { children: React.ReactNode }) {
  return (
    // FEIL 1: lang="en" på en norsk side
    <html lang="en" className={`${f.fjordvik} ${x.feilside}`}>
      <body>{children}</body>
    </html>
  );
}
