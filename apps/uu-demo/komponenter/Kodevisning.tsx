'use client';

import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import { useKodeSkjult } from './KodeSynlighet';
import e from './Eksempel.module.css';

export type Kodefil = { navn: string; html: string };

/*
  Koden til en variant. Har eksemplet egen CSS, vises filene som faner (React Aria Tabs):
  piltastene flytter mellom fanene, og Tab går videre inn i koden.
*/
export function Kodevisning({ filer }: { filer: Kodefil[] }) {
  const skjult = useKodeSkjult();
  const [apen, settApen] = useState(true);

  // «Skjul all kode» overstyrer det enkelte panelet hver gang den trykkes
  const [forrigeSkjult, settForrigeSkjult] = useState(skjult);
  if (skjult !== forrigeSkjult) {
    settForrigeSkjult(skjult);
    settApen(!skjult);
  }

  return (
    <details className={e.kode} open={apen} onToggle={(ev) => settApen(ev.currentTarget.open)}>
      <summary>Koden</summary>
      {filer.length === 1 ? (
        <>
          <p className={e.filnavn}>{filer[0].navn}</p>
          <div dangerouslySetInnerHTML={{ __html: filer[0].html }} />
        </>
      ) : (
        <Tabs>
          <TabList aria-label="Filer" className={e.faner}>
            {filer.map((f) => (
              <Tab key={f.navn} id={f.navn} className={e.fane}>
                {f.navn}
              </Tab>
            ))}
          </TabList>
          {filer.map((f) => (
            <TabPanel key={f.navn} id={f.navn} className={e.fanepanel}>
              <div dangerouslySetInnerHTML={{ __html: f.html }} />
            </TabPanel>
          ))}
        </Tabs>
      )}
    </details>
  );
}
