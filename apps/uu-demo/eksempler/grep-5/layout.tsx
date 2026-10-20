import type { Viewport } from 'next';

// I Next.js skriver du ikke <meta name="viewport"> selv.
// Eksporter viewport fra layout.tsx eller page.tsx, så lager Next taggen.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // FEIL: maximumScale: 1 og userScalable: false blokkerer zoom – ikke legg dem til
};
