'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-aria-components';
import s from '@/komponenter/Side.module.css';
import f from './finn-feilen.module.css';

/*
  Viser én oppgave om gangen. «Forrige» og «Neste» (og piltastene) blar,
  fokus flyttes til overskriften i den nye oppgaven, og adressen får #oppgave-N
  så du kan lenke rett til en oppgave.
*/
type Tilstand = { na: number; fokus: number };
const Kontekst = createContext<Tilstand>({ na: 0, fokus: 0 });

// Piltastene blar ikke når fokus er inne i en demo eller i et felt
const IKKE_BLA = '[data-live], input, textarea, select, [role="switch"], [role="tab"]';

function oppgaveFraAdresse() {
  const m = window.location.hash.match(/oppgave-(\d+)/);
  return m ? Number(m[1]) - 1 : 0;
}

export function Oppgaver({ antall, children }: { antall: number; children: React.ReactNode }) {
  const [tilstand, settTilstand] = useState<Tilstand>({ na: 0, fokus: 0 });
  const { na } = tilstand;

  const vis = useCallback(
    (indeks: (na: number) => number, flyttFokus: boolean) => {
      settTilstand((t) => ({
        na: Math.max(0, Math.min(antall - 1, indeks(t.na))),
        fokus: flyttFokus ? t.fokus + 1 : t.fokus,
      }));
    },
    [antall],
  );

  // Start på oppgaven i adressen, og følg med hvis den endres
  useEffect(() => {
    const fraAdresse = (flyttFokus: boolean) => vis(oppgaveFraAdresse, flyttFokus);
    const vedEndring = () => fraAdresse(true);
    fraAdresse(false);
    window.addEventListener('hashchange', vedEndring);
    return () => window.removeEventListener('hashchange', vedEndring);
  }, [vis]);

  useEffect(() => {
    history.replaceState(null, '', `#oppgave-${na + 1}`);
  }, [na]);

  useEffect(() => {
    function vedTast(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.target instanceof Element && e.target.closest(IKKE_BLA)) return;
      if (e.key === 'ArrowRight') { vis((n) => n + 1, true); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { vis((n) => n - 1, true); e.preventDefault(); }
    }
    document.addEventListener('keydown', vedTast);
    return () => document.removeEventListener('keydown', vedTast);
  }, [vis]);

  return (
    <Kontekst.Provider value={tilstand}>
      <div className={f.stepper}>
        <p className={f.teller} id="teller" aria-live="polite">{`Oppgave ${na + 1} av ${antall}`}</p>
        <div className={f.knapper}>
          <Button className={`${s.knapp} ${s.omriss}`} id="forrige" isDisabled={na === 0} onPress={() => vis((n) => n - 1, true)}>
            ← Forrige
          </Button>
          <Button className={s.knapp} id="neste" isDisabled={na === antall - 1} onPress={() => vis((n) => n + 1, true)}>
            Neste →
          </Button>
        </div>
        <p className={f.tastetips}>Tips: piltastene ← og → blar også, når fokus ikke er i en oppgave.</p>
      </div>
      {children}
    </Kontekst.Provider>
  );
}

export function OppgaveSeksjon({ nr, tittel, children }: { nr: number; tittel: string; children: React.ReactNode }) {
  const { na, fokus } = useContext(Kontekst);
  const aktiv = na === nr - 1;
  const overskrift = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (aktiv && fokus > 0) overskrift.current?.focus();
  }, [aktiv, fokus]);

  return (
    <section className={f.oppgave} id={`oppgave-${nr}`} aria-labelledby={`oppgave-${nr}-tittel`} hidden={!aktiv}>
      <h2 id={`oppgave-${nr}-tittel`} tabIndex={-1} ref={overskrift}>{`${nr}. ${tittel}`}</h2>
      {children}
    </section>
  );
}

// «Vis svaret» åpner og lukker svaret. Knappen forteller om tilstanden med aria-expanded.
export function VisSvar({ nr, children }: { nr: number; children: React.ReactNode }) {
  const [vis, settVis] = useState(false);
  return (
    <>
      <Button className={s.knapp} aria-expanded={vis} aria-controls={`svar-${nr}`} onPress={() => settVis(!vis)}>
        {vis ? 'Skjul svaret' : 'Vis svaret'}
      </Button>
      <div className={f.svar} id={`svar-${nr}`} hidden={!vis}>
        {children}
      </div>
    </>
  );
}
