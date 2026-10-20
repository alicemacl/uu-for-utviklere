import type { Metadata } from 'next';
import s from '@/komponenter/Side.module.css';
import { Oppgave } from './Oppgave';
import { Oppgaver } from './Stepper';

export const metadata: Metadata = { title: 'Finn feilen' };

export default function FinnFeilen() {
  return (
    <>
      <p className={s.overtittel}>Midtveis-runde · Spot the bug</p>
      <h1>Finn feilen</h1>
      <p className={s.ingress}>Vis én komponent om gangen. La salen foreslå hva som er galt – og hvem som rammes – før du viser svaret. Alle komponentene er levende, så du kan teste forslagene med tastatur og skjermleser.</p>

      <Oppgaver antall={8}>
        <Oppgave
          nr={1}
          tittel="Toppmeny"
          kilde="finn-feilen/1-toppmeny"
          hint="Tab til knappen til høyre med skjermleser på."
          wcag={['WCAG 4.1.2 Navn, rolle, verdi', 'WCAG 1.1.1 Ikke-tekstlig innhold']}
        >
          <p>Menyknappen har ikke noe navn. Skjermleseren sier bare «knapp», og talestyring har ingenting å kalle den.</p>
        </Oppgave>

        <Oppgave
          nr={2}
          tittel="Nyhetskort"
          kilde="finn-feilen/2-nyhetskort"
          hint={<>Åpne lenkelista i skjermleseren (VoiceOver <kbd>VO</kbd>+<kbd>U</kbd>, NVDA <kbd>Insert</kbd>+<kbd>F7</kbd>).</>}
          wcag={['WCAG 2.4.4 Formål med lenke', 'WCAG 1.3.1 Informasjon og relasjoner']}
        >
          <p>Tre lenker som heter «Les mer». I lenkelista – og for den som tabber – er det umulig å vite hvor de går. Titlene ser ut som overskrifter, men er det ikke.</p>
        </Oppgave>

        <Oppgave
          nr={3}
          tittel="Påmelding"
          kilde="finn-feilen/3-pamelding"
          hint="Hvilke felt må fylles ut? Prøv å se på det i gråtoner (DevTools → Rendering → Emulate vision deficiencies)."
          wcag={['WCAG 1.4.1 Bruk av farge', 'WCAG 3.3.2 Ledetekster eller instruksjoner']}
        >
          <p>Påkrevde felt vises bare med farge. Fargeblinde ser ikke forskjellen, og skjermleseren sier ingenting om at feltet må fylles ut.</p>
        </Oppgave>

        <Oppgave
          nr={4}
          tittel="Varslingsinnstilling"
          kilde="finn-feilen/4-varsling"
          hint="Prøv å slå den på med tastaturet. Hva sier skjermleseren om tilstanden?"
          wcag={['WCAG 2.1.1 Tastatur', 'WCAG 4.1.2 Navn, rolle, verdi']}
        >
          <p>Bryteren er en <code>&lt;div&gt;</code>: ingen rolle, ingen tilstand (på/av), ikke i Tab-rekkefølgen og ikke koblet til teksten. Den finnes rett og slett ikke for tastatur- og skjermleserbrukere.</p>
        </Oppgave>

        <Oppgave
          nr={5}
          tittel="Logoen"
          kilde="finn-feilen/5-logo"
          hint="Hva er navnet på lenken? Sjekk Accessibility-fanen i DevTools."
          wcag={['WCAG 1.1.1 Ikke-tekstlig innhold', 'WCAG 2.4.4 Formål med lenke']}
        >
          <p>Lenken består bare av et bilde uten alt-tekst. Lenken får dermed ikke noe ordentlig navn – skjermleseren leser filnavnet eller adressen. Alt-teksten til et bilde i en lenke skal beskrive hvor lenken går.</p>
        </Oppgave>

        <Oppgave
          nr={6}
          tittel="Instruksjonen"
          kilde="finn-feilen/6-instruksjon"
          hint="Les instruksjonen høyt for en som ikke ser skjermen."
          wcag={['WCAG 1.3.3 Sensoriske egenskaper', 'WCAG 1.4.1 Bruk av farge']}
        >
          <p>Instruksjonen bygger bare på farge. Skjermleserbrukere og mange fargeblinde vet ikke hvilken knapp som er «den grønne». Vis til teksten på knappen i stedet.</p>
        </Oppgave>

        <Oppgave
          nr={7}
          tittel="Steg i skjemaet"
          kilde="finn-feilen/7-steg"
          hint="Klikk på teksten og tab gjennom knappene. Hvilken kommer først?"
          wcag={['WCAG 2.4.3 Fokusrekkefølge', 'WCAG 1.3.2 Meningsfylt rekkefølge']}
        >
          <p><code>flex-direction: row-reverse</code> snur rekkefølgen visuelt, men ikke i koden. Tab går til «Neste» før «Tilbake», mens øyet leser motsatt. Det samme skjer med <code>order</code> og grid-plassering.</p>
        </Oppgave>

        <Oppgave
          nr={8}
          tittel="Bekreft e-post"
          kilde="finn-feilen/8-bekreft-epost"
          hint="Kopier e-postadressen fra det første feltet og lim den inn i det andre. Prøv også autoutfylling."
          wcag={['WCAG 1.3.5 Identifiser formål med inndata', 'WCAG 3.3.7 Overflødig inntasting (2.2)']}
        >
          <p>Skjemaet ber om det samme to ganger, slår av autoutfylling og blokkerer innliming. Det rammer alle som bruker passordbehandler, talegjenkjenning eller har motoriske eller kognitive utfordringer. Bruk ett felt med <code>autoComplete=&quot;email&quot;</code>, og vis adressen på oppsummeringen før innsending.</p>
        </Oppgave>
      </Oppgaver>
    </>
  );
}
