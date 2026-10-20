'use client';

import { I18nProvider } from 'react-aria-components';

// React Aria bruker norske tekster for det den legger til selv (for eksempel skjulte «Lukk»-knapper)
export function Leverandorer({ children }: { children: React.ReactNode }) {
  return <I18nProvider locale="nb-NO">{children}</I18nProvider>;
}
