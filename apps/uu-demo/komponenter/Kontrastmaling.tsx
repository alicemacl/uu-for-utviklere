'use client';

import { useEffect, useRef, useState } from 'react';
import e from './Eksempel.module.css';

export type Kontrastmal = {
  /** tekst: tekstfarge mot bakgrunnen (krav 4,5:1). kant: kantfarge mot bakgrunnen rundt (krav 3:1) */
  type: 'tekst' | 'kant';
  /** CSS-velger inne i demoen */
  velger: string;
  navn: string;
};

type Resultat = { navn: string; forhold: number; krav: number };
type Rgba = [number, number, number, number];

function rgba(farge: string): Rgba {
  const m = farge.match(/rgba?\(([^)]+)\)/);
  if (!m) return [0, 0, 0, 1];
  const d = m[1].split(/[ ,/]+/).filter(Boolean).map(parseFloat);
  return [d[0], d[1], d[2], d.length > 3 ? d[3] : 1];
}

function luminans(c: Rgba) {
  const [r, g, b] = c.slice(0, 3).map((x) => {
    const v = x / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function bakgrunn(el: Element | null): Rgba {
  while (el) {
    const c = rgba(getComputedStyle(el).backgroundColor);
    if (c[3] > 0) return c;
    el = el.parentElement;
  }
  return [255, 255, 255, 1];
}

function forhold(a: Rgba, b: Rgba) {
  const l1 = luminans(a);
  const l2 = luminans(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const komma = (tall: number, desimaler = 1) => tall.toFixed(desimaler).replace('.', ',');

// Måler kontrasten i demoen rett over, med de faktiske fargene nettleseren har regnet ut
export function Kontrastmaling({ maal }: { maal: Kontrastmal[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [resultater, settResultater] = useState<Resultat[]>([]);
  const nokkel = JSON.stringify(maal);

  useEffect(() => {
    const live = ref.current?.parentElement?.querySelector('[data-live]');
    if (!live) return;
    const id = requestAnimationFrame(() => {
      const nye: Resultat[] = [];
      for (const m of JSON.parse(nokkel) as Kontrastmal[]) {
        const el = live.querySelector(m.velger);
        if (!el) continue;
        const cs = getComputedStyle(el);
        const tekst = m.type === 'tekst';
        const forgrunn = rgba(tekst ? cs.color : cs.borderTopColor);
        const bak = tekst ? bakgrunn(el) : bakgrunn(el.parentElement);
        nye.push({ navn: m.navn, forhold: forhold(forgrunn, bak), krav: tekst ? 4.5 : 3 });
      }
      settResultater(nye);
    });
    return () => cancelAnimationFrame(id);
  }, [nokkel]);

  return (
    <ul ref={ref} className={e.kontrast} aria-label="Målt kontrast">
      {resultater.map((r) => {
        const ok = r.forhold >= r.krav;
        return (
          <li key={r.navn} className={ok ? e.bestatt : e.stryk}>
            {ok ? '✓ ' : '✕ '}
            {r.navn}: {komma(r.forhold)}:1 (krav {komma(r.krav, r.krav % 1 ? 1 : 0)}:1)
          </li>
        );
      })}
    </ul>
  );
}
