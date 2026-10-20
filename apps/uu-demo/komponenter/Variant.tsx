import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Kodevisning, type Kodefil } from './Kodevisning';
import { Kontrastmaling, type Kontrastmal } from './Kontrastmaling';
import { uthev, type Sprak } from './uthev';
import e from './Eksempel.module.css';
import l from './Live.module.css';

export type VariantProps = {
  variant: 'feil' | 'riktig';
  /**
   * Hvor eksemplet bor:
   * - «grep-1/klikkbar-div.feil» → komponenten i eksempler/grep-1/klikkbar-div.feil.tsx
   * - med `ramme`: «grep-1/landemerker.feil.html» → et helt HTML-dokument i public/rammer/
   * - med `bareKode`: en hvilken som helst fil under eksempler/, med filendelse
   */
  kilde: string;
  /** Kort navn på varianten, vist som kode i overskriften */
  tittel?: string;
  /** Hva skjermleseren omtrent sier */
  sier?: React.ReactNode;
  /** En ekstra merknad */
  merk?: React.ReactNode;
  /** Vis som egen side i en iframe med denne høyden – nødvendig for lang, landemerker og lignende */
  ramme?: number;
  /** Vis bare koden, ingen levende demo */
  bareKode?: boolean;
  /** Mål kontrasten til elementer i demoen */
  kontrast?: Kontrastmal[];
  /** Bruk hele bredden i stedet for en kolonne */
  bred?: boolean;
  /** Settes av <Eksempel>, brukes som tittel på iframen */
  eksempeltittel?: string;
};

const ROT = process.cwd();
const SPRAK: Record<string, Sprak> = { '.tsx': 'tsx', '.ts': 'tsx', '.css': 'css', '.html': 'html' };

/*
  Demoen og koden kommer fra samme fil: komponenten importeres, og kildeteksten
  til den samme filen leses når siden bygges. Da kan de aldri gli fra hverandre.
*/
async function lesFiler({ kilde, ramme, bareKode }: VariantProps, etikett: string): Promise<Kodefil[]> {
  const harEndelse = /\.(tsx|ts|css|html)$/.test(kilde);
  const fil = ramme
    ? path.join(ROT, 'public', 'rammer', kilde)
    : path.join(ROT, 'eksempler', harEndelse || bareKode ? kilde : `${kilde}.tsx`);

  const kode = await readFile(fil, 'utf8');
  const filer = [{ sti: fil, kode: kode.replace(/^'use client';\s*\n/, '') }];

  // CSS-moduler eksemplet importerer fra sin egen mappe, vises som egne faner
  for (const [, css] of kode.matchAll(/^import \w+ from '(\.\/[^']+\.module\.css)';$/gm)) {
    const cssFil = path.join(path.dirname(fil), css);
    filer.push({ sti: cssFil, kode: await readFile(cssFil, 'utf8') });
  }

  return Promise.all(
    filer.map(async ({ sti, kode }) => {
      const navn = path.basename(sti);
      return { navn, html: await uthev(kode.trimEnd(), SPRAK[path.extname(sti)] ?? 'tsx', `${etikett} – ${navn}`) };
    }),
  );
}

export async function Variant(props: VariantProps) {
  const { variant, kilde, tittel, sier, merk, ramme, bareKode, kontrast, bred, eksempeltittel } = props;
  const feil = variant === 'feil';
  const merke = feil ? 'Før' : 'Etter';
  const filer = await lesFiler(props, `Kode: ${merke.toLowerCase()}`);

  let live: React.ReactNode = null;
  if (ramme) {
    live = (
      <div className={`${e.live} ${e.liveRamme}`}>
        <iframe src={`/rammer/${kilde}`} title={`${merke}: ${tittel ?? eksempeltittel ?? 'demo'}`} style={{ height: ramme }} />
      </div>
    );
  } else if (!bareKode) {
    const { default: Komponent } = await import(`@/eksempler/${kilde}.tsx`);
    live = (
      <div className={`${e.live} ${l.kit}`} data-live="">
        <Komponent />
      </div>
    );
  }

  return (
    <div className={[e.side, feil ? e.feil : e.riktig, bred && e.bred].filter(Boolean).join(' ')}>
      <h3 className={e.sideTittel}>
        <span className={e.merke}>{merke}</span>
        {tittel && <code>{tittel}</code>}
      </h3>
      {live}
      {kontrast && <Kontrastmaling maal={kontrast} />}
      {sier && (
        <p className={e.srSier}>
          <span className={e.srSierEtikett}>Skjermleseren sier omtrent</span>
          {sier}
        </p>
      )}
      {merk && (
        <p className={e.srSier}>
          <span className={e.srSierEtikett}>Merk</span>
          {merk}
        </p>
      )}
      <Kodevisning filer={filer} />
    </div>
  );
}
