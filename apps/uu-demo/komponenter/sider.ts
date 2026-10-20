// Alle sidene i appen, i den rekkefølgen de vises i menyen
export type Side = { id: string; url: string; kort: string; tittel: string };

export const SIDER: Side[] = [
  { id: 'oversikt', url: '/', kort: 'Oversikt', tittel: 'Oversikt' },
  { id: 'demo', url: '/demo/feil', kort: 'Demo', tittel: 'Demosiden' },
  { id: 'grep-1', url: '/grep/1-semantikk', kort: '1 Semantikk', tittel: 'Grep 1: Semantisk HTML' },
  { id: 'grep-2', url: '/grep/2-skjema', kort: '2 Skjema', tittel: 'Grep 2: Skjema med label og feilmeldinger' },
  { id: 'grep-3', url: '/grep/3-tastatur', kort: '3 Tastatur', tittel: 'Grep 3: Tastatur og fokus' },
  { id: 'grep-4', url: '/grep/4-bilder', kort: '4 Bilder', tittel: 'Grep 4: Bilder med alt-tekst' },
  { id: 'grep-5', url: '/grep/5-kontrast-zoom', kort: '5 Kontrast', tittel: 'Grep 5: Kontrast og zoom' },
  { id: 'grep-6', url: '/grep/6-aria-og-sma-gevinster', kort: '6–7 ARIA', tittel: 'Grep 6 og 7: ARIA og små gevinster' },
  { id: 'finn-feilen', url: '/finn-feilen', kort: 'Finn feilen', tittel: 'Finn feilen' },
  { id: 'sjekkliste', url: '/sjekkliste', kort: 'Sjekkliste', tittel: 'Tre ting i morgen og sjekkliste' },
];

// Sidene du kan bla mellom med «Forrige» og «Neste»
export const REKKEFOLGE = ['grep-1', 'grep-2', 'grep-3', 'grep-4', 'grep-5', 'grep-6', 'finn-feilen', 'sjekkliste'];

export function sideForUrl(url: string) {
  return SIDER.find((s) => s.url === url);
}
