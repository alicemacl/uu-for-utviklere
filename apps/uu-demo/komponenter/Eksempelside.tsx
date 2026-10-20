import { Children, cloneElement, isValidElement, type ReactElement } from 'react';
import { Eksempel, type EksempelProps } from './Eksempel';
import { KodeBryter, KodeSynlighet } from './KodeSynlighet';
import s from './Side.module.css';

type Props = {
  /** Nummerprefikset til eksemplene: 1 gir 1.1, 1.2 … */
  grep: string;
  overtittel?: string;
  tittel: string;
  ingress: React.ReactNode;
  huskeregel: React.ReactNode;
  children: React.ReactNode;
};

type Innslag = { id: string; nr: string; tittel: string };

// Ramme rundt en grep-side: innledning, innholdsliste, «Skjul all kode» og nummererte eksempler
export function Eksempelside({ grep, overtittel = 'Del 4 · Konkrete grep i koden', tittel, ingress, huskeregel, children }: Props) {
  const innhold: Innslag[] = [];
  const tellere: Record<string, number> = {};

  const eksempler = Children.map(children, (barn) => {
    if (!isValidElement(barn) || barn.type !== Eksempel) return barn;
    const eksempel = barn as ReactElement<EksempelProps>;
    const prefiks = eksempel.props.grep ?? grep;
    tellere[prefiks] = (tellere[prefiks] ?? 0) + 1;
    const nr = `${prefiks}.${tellere[prefiks]}`;
    const id = eksempel.props.id ?? `eksempel-${innhold.length + 1}`;
    innhold.push({ id, nr, tittel: eksempel.props.tittel });
    return cloneElement(eksempel, { nr, id });
  });

  return (
    <KodeSynlighet>
      <p className={s.overtittel}>{overtittel}</p>
      <h1>{tittel}</h1>
      <p className={s.ingress}>{ingress}</p>
      <p className={s.huskeregel}>
        <strong>Huskeregel:</strong> {huskeregel}
      </p>
      <div className={s.sidelinje}>
        <nav aria-label="På denne siden">
          <ul className={s.innholdsliste}>
            {innhold.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`}>
                  <span className={s.nr}>{i.nr}</span>
                  {i.tittel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <KodeBryter />
      </div>
      {eksempler}
    </KodeSynlighet>
  );
}
