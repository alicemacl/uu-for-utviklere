import type { Metadata } from 'next';
import { Eksempel, Prov } from '@/komponenter/Eksempel';
import { Eksempelside } from '@/komponenter/Eksempelside';
import { Variant } from '@/komponenter/Variant';

export const metadata: Metadata = { title: 'Grep 2: Skjema med label og feilmeldinger' };

export default function Grep2() {
  return (
    <Eksempelside
      grep="2"
      tittel="Grep 2: Skjema med label og feilmeldinger"
      ingress={<>Alle felt skal ha en synlig <code>&lt;label&gt;</code> – ikke bare placeholder-tekst. Bruk <code>aria-invalid=&quot;true&quot;</code> på felt med feil, og koble feilmeldingen til feltet med <code>aria-describedby</code>.</>}
      huskeregel="Et skjema uten label er ubrukelig for skjermleserbrukere – og placeholder forsvinner når du begynner å skrive."
    >
      <Eksempel tittel="Tekst ved siden av er ikke en label">
        <p>Teksten «E-post» står rett over feltet, men nettleseren vet ikke at de hører sammen. Med <code>&lt;label htmlFor&gt;</code> får feltet et navn – og hele teksten blir en del av klikkflaten.</p>
        <Prov>Klikk på ordet «E-post». I «etter» havner markøren i feltet.</Prov>
        <Variant variant="feil" kilde="grep-2/label.feil" tittel="<span> + <input>" sier="«redigerbar tekst» – men hva skal stå her?" />
        <Variant variant="riktig" kilde="grep-2/label.riktig" tittel="<label htmlFor>" sier="«E-post, redigerbar tekst»" />
      </Eksempel>

      <Eksempel tittel="Placeholder er ikke en label">
        <p>Skjermleseren bruker ofte placeholder som reserve, så den klarer seg. Det er alle andre som mister ledeteksten: Den forsvinner når du skriver, har ofte for lav kontrast, og er vanskelig for brukere med kognitive utfordringer.</p>
        <Prov>Skriv noe i begge feltene. Hva skulle det første feltet inneholde igjen?</Prov>
        <Variant variant="feil" kilde="grep-2/placeholder.feil" tittel="placeholder" sier="«Telefon, redigerbar tekst» – men ledeteksten er borte for alle som ser." />
        <Variant variant="riktig" kilde="grep-2/placeholder.riktig" tittel="<label> + hjelpetekst" sier="«Telefon, redigerbar tekst, 8 siffer, uten landskode»" />
      </Eksempel>

      <Eksempel tittel="Feilmeldinger som blir lest opp">
        <p>En rød ramme og ordet «Ugyldig» sier ingenting til en som ikke ser fargen eller ikke finner teksten. Feilen må vises med mer enn farge, forklare hva som er galt, og være koblet til feltet.</p>
        <Prov>Skriv «hei» i feltet og trykk Send – først med mus, så med skjermleseren på.</Prov>
        <Variant variant="feil" kilde="grep-2/feilmelding.feil" tittel="rød ramme" sier="«Send, knapp» – og så ingenting. Fokus blir på knappen, og feilen blir aldri nevnt." />
        <Variant variant="riktig" kilde="grep-2/feilmelding.riktig" tittel="aria-invalid + aria-describedby" sier="«E-post, ugyldig data, redigerbar tekst. Feil: Skriv en e-postadresse med @, for eksempel navn@eksempel.no»" />
      </Eksempel>

      <Eksempel tittel="Grupper av valg">
        <p>Pene «chips» bygget av <code>&lt;div&gt;</code>-er har verken rolle, tilstand eller tastaturstøtte. Ekte radioknapper i en <code>&lt;fieldset&gt;</code> med <code>&lt;legend&gt;</code> gir alt dette – og de kan styles akkurat like pent.</p>
        <Prov>Tab inn i gruppen og bruk piltastene.</Prov>
        <Variant variant="feil" kilde="grep-2/valg.feil" tittel='<div className="chip">' sier="«Sone A» – bare tekst. Ingen gruppe, ingen tilstand, og den nås ikke med Tab." />
        <Variant variant="riktig" kilde="grep-2/valg.riktig" tittel="<fieldset> + radio" sier="«Hvilken sone bor du i?, gruppe. Sone A, valgknapp, ikke valgt, 1 av 3»" />
      </Eksempel>
    </Eksempelside>
  );
}
