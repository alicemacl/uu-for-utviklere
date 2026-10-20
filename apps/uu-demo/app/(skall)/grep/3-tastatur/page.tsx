import type { Metadata } from 'next';
import { Eksempel, Prov } from '@/komponenter/Eksempel';
import { Eksempelside } from '@/komponenter/Eksempelside';
import { Variant } from '@/komponenter/Variant';

export const metadata: Metadata = { title: 'Grep 3: Tastatur og fokus' };

export default function Grep3() {
  return (
    <Eksempelside
      grep="3"
      tittel="Grep 3: Tastatur og fokus"
      ingress={<>Behold fokusrammen – bruk <code>:focus-visible</code> hvis den skal vises bare ved tastaturbruk. Legg inn en «hopp til hovedinnhold»-lenke, og unngå <code>tabindex</code> større enn 0.</>}
      huskeregel="Tastaturbrukeren må alltid vite hvor hen er på siden – fokusrammen er ikke valgfri."
    >
      <Eksempel tittel="Ikke fjern fokusrammen">
        <p><code>outline: none</code> er en av de vanligste UU-feilene på nettet. Synes designeren rammen er stygg, er løsningen å lage en penere ramme – og vise den bare ved tastaturbruk med <code>:focus-visible</code>.</p>
        <Prov>Klikk på et tomt sted i den hvite boksen og trykk Tab noen ganger. Hvor er du?</Prov>
        <Variant variant="feil" kilde="grep-3/fokusramme.feil" tittel="outline: none" sier="Skjermleseren klarer seg – men den som bruker tastatur uten skjermleser, ser ikke hvor fokus er." />
        <Variant variant="riktig" kilde="grep-3/fokusramme.riktig" tittel=":focus-visible" sier="Samme opplesning – men nå ser alle hvor fokus er." />
      </Eksempel>

      <Eksempel tittel="Unngå tabindex større enn 0">
        <p>Positive <code>tabindex</code>-verdier river feltene ut av den naturlige rekkefølgen – og de hopper foran <em>alt</em> annet på siden. <code>tabindex=&quot;0&quot;</code> gjør noe fokuserbart i vanlig rekkefølge, <code>tabindex=&quot;-1&quot;</code> gjør det fokuserbart fra skript.</p>
        <Prov>Klikk i «Fornavn» og trykk Tab. Prøv også å trykke Tab helt fra toppen av siden.</Prov>
        <Variant variant="feil" kilde="grep-3/tabindex.feil" tittel="tabIndex={1}, {2}, {3}" sier='Fokus hopper fra Fornavn til E-post, så til Etternavn. Med tabindex="1" blir E-post første stopp på hele siden.' />
        <Variant variant="riktig" kilde="grep-3/tabindex.riktig" tittel="ingen tabIndex" sier="Fokus følger rekkefølgen du ser: Fornavn, Etternavn, E-post." />
      </Eksempel>

      <Eksempel tittel="Hopp til hovedinnhold">
        <p>Uten en snarvei må tastaturbrukeren tabbe gjennom hele menyen på hver eneste side. Lenken kan være skjult til den får fokus.</p>
        <Prov>Klikk inni rammen (ikke på en lenke) og trykk Tab. Trykk Enter når «Hopp til hovedinnhold» dukker opp.</Prov>
        <Variant variant="feil" kilde="grep-3/hopp.feil.html" ramme={250} tittel="ingen snarvei" sier="Ni lenker før du når innholdet – på hver side." />
        <Variant variant="riktig" kilde="grep-3/hopp.riktig.html" ramme={250} tittel="skip-lenke" sier="«Hopp til hovedinnhold, lenke» – ett trykk på Enter, og du er i innholdet." />
      </Eksempel>

      <Eksempel tittel="Dialoger som holder på fokus">
        <p>En hjemmelaget modal av <code>&lt;div&gt;</code>-er lar fokus bli liggende bak den mørke bakgrunnen, og Escape gjør ingenting. Native <code>&lt;dialog&gt;</code> med <code>showModal()</code> flytter fokus inn, holder det der, lukkes med Escape og gjør resten av siden utilgjengelig så lenge den er åpen.</p>
        <Prov>Åpne dialogen med tastaturet. Trykk Tab – hvor havner du? Trykk Escape.</Prov>
        <Variant variant="feil" kilde="grep-3/dialog.feil" tittel='<div className="overlay">' sier="Ingenting om dialogen. Fokus blir på «Slett søknad», og Tab går videre til lenker bak den mørke bakgrunnen." />
        <Variant variant="riktig" kilde="grep-3/dialog.riktig" tittel="<dialog> + showModal()" sier="«Slette søknaden?, dialog. Avbryt, knapp». Escape lukker, og fokus går tilbake til «Slett søknad»." />
      </Eksempel>
    </Eksempelside>
  );
}
