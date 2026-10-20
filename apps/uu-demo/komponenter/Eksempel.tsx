import { Children, cloneElement, isValidElement, type ReactElement } from 'react';
import { SimulatorSeksjon, type Simulering } from './Simulator';
import { Variant, type VariantProps } from './Variant';
import e from './Eksempel.module.css';

export type EksempelProps = {
  tittel: string;
  children: React.ReactNode;
  /** Knapper som simulerer smal skjerm eller økt tekstavstand på demoene */
  sim?: Simulering[];
  /** Bytt nummerprefiks for denne seksjonen (grep 6-siden har også grep 7) */
  grep?: string;
  /** Settes av <Eksempelside> */
  nr?: string;
  /** Settes av <Eksempelside> */
  id?: string;
};

function erVariant(barn: React.ReactNode): barn is ReactElement<VariantProps> {
  return isValidElement(barn) && barn.type === Variant;
}

/*
  Ett eksempel: overskrift, forklaring og så variantene side om side.
  Alt som ikke er <Variant>, regnes som forklaring og vises over variantene.
*/
export function Eksempel({ tittel, children, sim, nr, id = 'eksempel' }: EksempelProps) {
  const barn = Children.toArray(children);
  const tekst = barn.filter((b) => !erVariant(b));
  const varianter = barn.filter(erVariant).map((v) => cloneElement(v, { eksempeltittel: tittel }));
  const tittelId = `${id}-tittel`;

  const innhold = (
    <>
      <h2 id={tittelId}>
        {nr && <span className={e.nr}>{nr}</span>}
        {tittel}
      </h2>
      {tekst}
    </>
  );
  const par = varianter.length > 0 ? <div className={e.par}>{varianter}</div> : null;

  if (sim) {
    return <SimulatorSeksjon id={id} tittelId={tittelId} sim={sim} innhold={innhold} par={par} />;
  }
  return (
    <section id={id} className={e.eksempel} aria-labelledby={tittelId}>
      {innhold}
      {par}
    </section>
  );
}

// «Prøv: …»-avsnittet med en konkret ting å teste
export function Prov({ children }: { children: React.ReactNode }) {
  return (
    <p className={e.prov}>
      <strong>Prøv:</strong> {children}
    </p>
  );
}
