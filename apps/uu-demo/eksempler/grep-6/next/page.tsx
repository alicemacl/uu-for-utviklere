import type { Metadata } from 'next';

// app/soknad/page.tsx – Next.js lager <title> ut fra metadata.
// Med en mal i layout.tsx – title: { template: '%s – Fjordvik kommune' } –
// holder det å skrive sidens eget navn her: title: 'Søk om beboerparkering'.
export const metadata: Metadata = {
  title: 'Søk om beboerparkering – Fjordvik kommune',
};

export default function Soknad() {
  return <h1>Søk om beboerparkering</h1>;
}
