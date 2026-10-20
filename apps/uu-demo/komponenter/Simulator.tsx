'use client';

import { useState } from 'react';
import { Bryter } from './Bryter';
import e from './Eksempel.module.css';
import s from './Side.module.css';

export type Simulering = 'smal' | 'tekstavstand';

const TEKSTER: Record<Simulering, string> = {
  smal: 'Smal skjerm: 320 px (som 400 % zoom)',
  tekstavstand: 'Øk tekstavstand (WCAG 1.4.12)',
};

const KLASSER: Record<Simulering, string> = {
  smal: e.simSmal,
  tekstavstand: e.simTekstavstand,
};

// Et eksempel med av/på-knapper som endrer hvordan demoene vises
export function SimulatorSeksjon({ id, tittelId, sim, innhold, par }: {
  id: string;
  tittelId: string;
  sim: Simulering[];
  innhold: React.ReactNode;
  par: React.ReactNode;
}) {
  const [pa, settPa] = useState<Partial<Record<Simulering, boolean>>>({});
  const klasser = [e.eksempel, ...sim.filter((navn) => pa[navn]).map((navn) => KLASSER[navn])].join(' ');

  return (
    <section id={id} className={klasser} aria-labelledby={tittelId}>
      {innhold}
      <div className={s.verktoylinje} role="group" aria-label="Simuler">
        {sim.map((navn) => (
          <Bryter key={navn} isSelected={!!pa[navn]} onChange={(verdi) => settPa({ ...pa, [navn]: verdi })}>
            {TEKSTER[navn]}
          </Bryter>
        ))}
      </div>
      {par}
    </section>
  );
}
