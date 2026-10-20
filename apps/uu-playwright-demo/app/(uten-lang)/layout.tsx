import '../globals.css';

// Egen rot-layout for broken, fordi den skal mangle lang på <html>.
export default function RotUtenLang({ children }: { children: React.ReactNode }) {
  return (
    // FEIL: ingen lang-attributt, så skjermleseren må gjette språket
    <html>
      <body>{children}</body>
    </html>
  );
}
