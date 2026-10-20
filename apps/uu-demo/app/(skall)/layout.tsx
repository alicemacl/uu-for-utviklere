import type { Metadata } from 'next';
import { Leverandorer } from '@/komponenter/Leverandorer';
import { Skall } from '@/komponenter/Skall';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s – UU-demo',
    default: 'UU-demo – demo-app til kurset UU for utviklere',
  },
  description: 'Vanlige feil innen universell utforming – og hvordan du fikser dem.',
};

export default function RotSkall({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <Leverandorer>
          <Skall>{children}</Skall>
        </Leverandorer>
      </body>
    </html>
  );
}
