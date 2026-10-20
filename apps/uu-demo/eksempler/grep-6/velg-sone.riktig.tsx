'use client';

import { Button, ComboBox, Input, Label, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import s from './velg-sone.riktig.module.css';

const SONER = ['Sone A – Sentrum', 'Sone B – Havna', 'Sone C – Strandlia'];

// React Aria følger ARIA-mønsteret for combobox: roller, tilstand, piltaster, Escape og opplesning
export default function VelgSone() {
  return (
    <ComboBox className={s.velger}>
      <Label>Velg sone</Label>
      <div className={s.rad}>
        <Input className={s.felt} />
        <Button className={s.knapp}>
          <span aria-hidden="true">▾</span>
        </Button>
      </div>
      <Popover className={s.popover}>
        <ListBox className={s.liste}>
          {SONER.map((sone) => (
            <ListBoxItem key={sone} id={sone} className={s.valg}>
              {sone}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}
