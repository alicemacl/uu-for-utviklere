'use client';

import { createContext, useContext, useState } from 'react';
import { Bryter } from './Bryter';

// Lar «Skjul all kode» lukke alle kodevisningene på siden – fint når du vil vise demoen først
const KodeSkjult = createContext<{ skjult: boolean; settSkjult: (skjult: boolean) => void }>({
  skjult: false,
  settSkjult: () => {},
});

export function KodeSynlighet({ children }: { children: React.ReactNode }) {
  const [skjult, settSkjult] = useState(false);
  return <KodeSkjult.Provider value={{ skjult, settSkjult }}>{children}</KodeSkjult.Provider>;
}

export function useKodeSkjult() {
  return useContext(KodeSkjult).skjult;
}

export function KodeBryter() {
  const { skjult, settSkjult } = useContext(KodeSkjult);
  return (
    <Bryter isSelected={skjult} onChange={settSkjult}>
      Skjul all kode
    </Bryter>
  );
}
