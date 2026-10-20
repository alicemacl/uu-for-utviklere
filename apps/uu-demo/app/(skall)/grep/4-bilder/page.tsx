import type { Metadata } from 'next';
import { Eksempel, Prov } from '@/komponenter/Eksempel';
import { Eksempelside } from '@/komponenter/Eksempelside';
import { Variant } from '@/komponenter/Variant';

export const metadata: Metadata = { title: 'Grep 4: Bilder med alt-tekst' };

export default function Grep4() {
  return (
    <Eksempelside
      grep="4"
      tittel="Grep 4: Bilder med alt-tekst"
      ingress={<>Beskriv hensikten med bildet, ikke pikslene. Dekorative bilder får <code>alt=&quot;&quot;</code> slik at skjermleseren hopper over dem. Informative bilder skal gi samme informasjon som bildet gir seende brukere.</>}
      huskeregel="Tom alt-tekst er et bevisst valg – manglende alt-tekst er en feil."
    >
      <Eksempel tittel="Bilde uten alt-tekst">
        <p>Mangler <code>alt</code> helt, gjetter skjermleseren – og leser som regel opp filnavnet.</p>
        <Prov>Les bildet med skjermleser, eller se på «Name» i Accessibility-fanen i DevTools.</Prov>
        <Variant variant="feil" kilde="grep-4/uten-alt.feil" tittel="ingen alt" sier="«IMG_4032.svg, bilde»" />
        <Variant variant="riktig" kilde="grep-4/uten-alt.riktig" tittel="alt med innhold" sier="«Fargerike trehus på kaia langs fjorden, med fjell i bakgrunnen, bilde»" />
      </Eksempel>

      <Eksempel tittel='Dekorative bilder får alt=""'>
        <p>Ikoner som står ved siden av tekst som sier det samme, og rene pynt-elementer, gir bare støy. <code>alt=&quot;&quot;</code> forteller at bildet kan hoppes over. Uten <code>alt</code> i det hele tatt får du filnavnet igjen.</p>
        <Prov>Les linjen med skjermleser.</Prov>
        <Variant variant="feil" kilde="grep-4/dekorative.feil" tittel='alt="ikon telefon"' sier="«ikon telefon, bilde. Ring oss: 99 99 99 99. dekorativ bølge, bilde»" />
        <Variant variant="riktig" kilde="grep-4/dekorative.riktig" tittel='alt=""' sier="«Ring oss: 99 99 99 99»" />
      </Eksempel>

      <Eksempel tittel="Informative bilder og grafer">
        <p>«Graf» forteller at det finnes en graf, ikke hva den viser. Alt-teksten skal gi poenget. Er dataene viktige, legg dem også i en tabell eller tekst under.</p>
        <Prov>Spør salen: Hva er hovedpoenget med grafen? Det er det alt-teksten skal si.</Prov>
        <Variant variant="feil" kilde="grep-4/graf.feil" tittel='alt="graf"' sier="«graf, bilde»" />
        <Variant variant="riktig" kilde="grep-4/graf.riktig" tittel="alt med poenget" sier="«Søknader om beboerparkering per måned i 2025. Flest i august med 420, færrest i januar med 80, bilde»" />
      </Eksempel>

      <Eksempel tittel="Knapper med bare ikon">
        <p>Et SVG-ikon i en <code>&lt;button&gt;</code> gir en knapp uten navn. Gi knappen et navn med visuelt skjult tekst eller <code>aria-label</code>, og skjul selve ikonet med <code>aria-hidden=&quot;true&quot;</code>.</p>
        <Prov>Tab gjennom knappene med skjermleser på.</Prov>
        <Variant variant="feil" kilde="grep-4/ikonknapper.feil" tittel="<button><svg>" sier="«knapp» · «knapp» · «knapp»" />
        <Variant variant="riktig" kilde="grep-4/ikonknapper.riktig" tittel="skjult tekst / aria-label" sier="«Søk, knapp» · «Rediger søknad, knapp» · «Slett søknad, knapp»" />
      </Eksempel>

      <Eksempel tittel="Tekst i bilder">
        <p>Tekst som er bakt inn i et bilde kan ikke forstørres skarpt, ikke oversettes, ikke tilpasses med egne farger – og alt-teksten blir ofte bare «banner». Bruk ekte tekst og CSS.</p>
        <Prov>Marker teksten med musa, eller zoom til 400 %.</Prov>
        <Variant variant="feil" kilde="grep-4/tekst-i-bilder.feil" tittel="tekst i bildet" sier="«banner, bilde»" />
        <Variant variant="riktig" kilde="grep-4/tekst-i-bilder.riktig" tittel="ekte tekst" sier="«Ny sone C fra 1. november. Søk innen 15. oktober og få 50 % rabatt første år»" />
      </Eksempel>
    </Eksempelside>
  );
}
