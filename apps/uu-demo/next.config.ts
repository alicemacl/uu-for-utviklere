import type { NextConfig } from 'next';

// De gamle adressene fra den statiske versjonen sendes videre, så lenker i lysbilder og notater virker
const gamleAdresser = [
  ['/index.html', '/'],
  ['/demo/feil.html', '/demo/feil'],
  ['/demo/fikset.html', '/demo/fikset'],
  ['/grep/:side.html', '/grep/:side'],
  ['/finn-feilen.html', '/finn-feilen'],
  ['/sjekkliste.html', '/sjekkliste'],
];

const config: NextConfig = {
  // Utviklerknappen til Next kan få fokus og forstyrrer tastaturdemoene i `next dev`
  devIndicators: false,
  // Egen 404-side med lang="no" (app/global-not-found.tsx), siden appen har flere rot-layouter
  experimental: { globalNotFound: true },
  async redirects() {
    return gamleAdresser.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default config;
