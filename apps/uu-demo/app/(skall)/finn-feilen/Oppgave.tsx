import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Kodevisning } from '@/komponenter/Kodevisning';
import { uthev } from '@/komponenter/uthev';
import e from '@/komponenter/Eksempel.module.css';
import l from '@/komponenter/Live.module.css';
import { OppgaveSeksjon, VisSvar } from './Stepper';
import f from './finn-feilen.module.css';

type Props = {
  nr: number;
  tittel: string;
  hint: React.ReactNode;
  /** «finn-feilen/1-toppmeny» → eksempler/finn-feilen/1-toppmeny.oppgave.tsx og …fasit.tsx */
  kilde: string;
  wcag: string[];
  /** Forklaringen i svaret */
  children: React.ReactNode;
};

// Koden vises fra de samme filene som demoene, lest når siden bygges
async function kode(fil: string, etikett: string) {
  const sti = path.join(process.cwd(), 'eksempler', fil);
  const tekst = (await readFile(sti, 'utf8')).replace(/^'use client';\s*\n/, '').trimEnd();
  const navn = path.basename(sti);
  return [{ navn, html: await uthev(tekst, 'tsx', `${etikett} – ${navn}`) }];
}

export async function Oppgave({ nr, tittel, hint, kilde, wcag, children }: Props) {
  const { default: Oppgavekomponent } = await import(`@/eksempler/${kilde}.oppgave.tsx`);
  const { default: Fasitkomponent } = await import(`@/eksempler/${kilde}.fasit.tsx`);
  const [kodeFor, kodeEtter] = await Promise.all([
    kode(`${kilde}.oppgave.tsx`, 'Kode: før'),
    kode(`${kilde}.fasit.tsx`, 'Kode: etter'),
  ]);

  return (
    <OppgaveSeksjon nr={nr} tittel={tittel}>
      <details className={f.hint}>
        <summary>Hint</summary>
        <p>{hint}</p>
      </details>
      {/* data-variant="feil": oppgaven har feil med vilje */}
      <div className={`${e.live} ${l.kit} ${f.oppgaveLive}`} data-live="" data-variant="feil">
        <Oppgavekomponent />
      </div>

      <VisSvar nr={nr}>
        <h3>Svar</h3>
        {children}
        <p>
          {wcag.map((w) => (
            <span key={w} className={f.wcag}>{w}</span>
          ))}
        </p>
        <div className={e.par}>
          <div className={`${e.side} ${e.feil}`} data-variant="feil">
            <h4 className={e.sideTittel}><span className={e.merke}>Før</span></h4>
            <div className={`${e.live} ${l.kit} ${f.svarLive}`} data-live="">
              <Oppgavekomponent />
            </div>
            <Kodevisning filer={kodeFor} />
          </div>
          <div className={`${e.side} ${e.riktig}`} data-variant="riktig">
            <h4 className={e.sideTittel}><span className={e.merke}>Etter</span></h4>
            <div className={`${e.live} ${l.kit} ${f.svarLive}`} data-live="">
              <Fasitkomponent />
            </div>
            <Kodevisning filer={kodeEtter} />
          </div>
        </div>
      </VisSvar>
    </OppgaveSeksjon>
  );
}
