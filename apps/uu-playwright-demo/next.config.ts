import type { NextConfig } from 'next';

const config: NextConfig = {
  // Utviklerknappen til Next kan få fokus og forstyrrer tab-rekkefølgen i `next dev`
  devIndicators: false,
  async redirects() {
    return [
      { source: '/', destination: '/fixed', permanent: false },
      // De gamle adressene fra den statiske versjonen
      ...['broken', 'axe-green', 'fixed'].map((side) => ({
        source: `/${side}.html`,
        destination: `/${side}`,
        permanent: true,
      })),
    ];
  },
};

export default config;
