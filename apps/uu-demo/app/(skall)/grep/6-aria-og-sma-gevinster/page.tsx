import type { Metadata } from 'next';
import { Eksempel, Prov } from '@/komponenter/Eksempel';
import { Eksempelside } from '@/komponenter/Eksempelside';
import { Variant } from '@/komponenter/Variant';

export const metadata: Metadata = { title: 'Grep 6 og 7: ARIA og små gevinster' };

export default function Grep6() {
  return (
    <Eksempelside
      grep="6"
      tittel="Grep 6 og 7: ARIA og små gevinster"
      ingress={<>ARIA er bare for når HTML ikke holder. Første regel for ARIA er å ikke bruke ARIA når HTML kan gjøre jobben. Og noen av de minste grepene – som <code>lang</code> og <code>prefers-reduced-motion</code> – er blant de raskeste å fikse.</>}
      huskeregel="Ingen ARIA er bedre enn dårlig ARIA."
    >
      <Eksempel tittel='role="button" er ikke nok'>
        <p>ARIA endrer bare hva skjermleseren <em>sier</em> – ikke hva elementet <em>gjør</em>. En <code>&lt;div role=&quot;button&quot;&gt;</code> lover en knapp, men trenger fortsatt <code>tabindex=&quot;0&quot;</code>, tastaturhåndtering for Enter og mellomrom, fokusstil og logikk for deaktivert tilstand. Eller du kan bruke <code>&lt;button&gt;</code>.</p>
        <Prov>Tab til knappen. Hva skjer i «før»?</Prov>
        <Variant variant="feil" kilde="grep-6/role-button.feil" tittel='<div role="button">' sier="«Lik (0), knapp» – hvis du finner den med skjermleserens piltaster. Med Tab kommer du aldri dit, og Enter gjør ingenting." />
        <Variant variant="riktig" kilde="grep-6/role-button.riktig" tittel="<button>" sier="«Lik (0), knapp» – og den virker." />
      </Eksempel>

      <Eksempel tittel="aria-hidden på noe som kan få fokus">
        <p><code>aria-hidden=&quot;true&quot;</code> skjuler innholdet for skjermleseren, men ikke for tastaturet. Resultatet er en lenke du kan tabbe til, men som er stum.</p>
        <Prov>Tab til lenken med skjermleser på.</Prov>
        <Variant variant="feil" kilde="grep-6/aria-hidden.feil" tittel='aria-hidden="true"' sier="(ingenting – eller bare «tom») når fokus lander på lenken." />
        <Variant
          variant="riktig"
          kilde="grep-6/aria-hidden.riktig"
          tittel="ingen aria-hidden"
          sier="«lenke, vilkårene for beboerparkering»"
          merk="Skal noe være skjult for alle, bruk hidden. Skal et område være synlig men utilgjengelig – for eksempel bak en åpen dialog – bruk inert."
        />
      </Eksempel>

      <Eksempel tittel="aria-label som overstyrer synlig tekst">
        <p><code>aria-label</code> erstatter teksten i elementet. Når den ikke stemmer med det som står på knappen, hører skjermleserbrukeren noe annet enn det andre ser – og talestyring («klikk Søk nå») virker ikke.</p>
        <Prov>Se på «Name» i Accessibility-fanen i DevTools for begge knappene.</Prov>
        <Variant variant="feil" kilde="grep-6/aria-label.feil" tittel='aria-label="btn-cta-primary"' sier="«btn-cta-primary, knapp»" />
        <Variant variant="riktig" kilde="grep-6/aria-label.riktig" tittel="teksten er navnet" sier="«Søk nå, knapp»" />
      </Eksempel>

      <Eksempel tittel="Når ARIA er riktig: tilstand">
        <p>HTML har ikke et eget element for alt. Et trekkspill trenger å fortelle om det er åpent eller lukket – da er <code>aria-expanded</code> på en ekte knapp riktig verktøy. (Og trenger du ikke full kontroll over utseendet, gir <code>&lt;details&gt;</code> og <code>&lt;summary&gt;</code> deg alt dette gratis.)</p>
        <Prov>Åpne og lukk med tastaturet. Lytt etter «sammenslått» og «utvidet».</Prov>
        <Variant variant="feil" kilde="grep-6/trekkspill.feil" tittel="<div onClick>" sier="«Hva koster det? ▾» – ingen rolle, ingen tilstand, ikke i Tab-rekkefølgen." />
        <Variant variant="riktig" kilde="grep-6/trekkspill.riktig" tittel="<button aria-expanded>" sier="«Hva koster det?, knapp, sammenslått» → «utvidet»" />
      </Eksempel>

      <Eksempel tittel='Statusmeldinger med role="status"'>
        <p>En melding som dukker opp et annet sted på siden, ser du – men skjermleseren vet ikke at den kom. Et element med <code>role=&quot;status&quot;</code> som finnes på siden fra start, blir lest opp når innholdet endres.</p>
        <Prov>Trykk «Lagre kladd» med skjermleser på.</Prov>
        <Variant variant="feil" kilde="grep-6/status.feil" tittel="vanlig <div>" sier="(ingenting – fokus blir på knappen, og meldingen blir aldri lest)" />
        <Variant variant="riktig" kilde="grep-6/status.riktig" tittel='role="status"' sier="«Søknaden er lagret som kladd.»" />
      </Eksempel>

      <Eksempel tittel="Når HTML ikke holder: bruk et testet bibliotek">
        <p>Noen komponenter har ikke et eget HTML-element: en kombinasjonsboks med forslag, faner, menyer. Da må du bygge med ARIA – og det er her det oftest går galt. Rollene blir riktige, men oppførselen mangler: piltaster, Escape, hvilket valg som er aktivt, og om lista er åpen eller lukket.</p>
        <p>Dette er trinn 4, det siste, i rekkefølgen å strekke seg etter: følg mønsteret i <a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/">ARIA Authoring Practices Guide</a> – eller bruk et bibliotek som allerede har gjort det og testet det med skjermlesere, som React Aria. Du styler det med CSS og data-attributtene biblioteket setter, som <code>[data-focused]</code> og <code>[data-selected]</code>.</p>
        <Prov>Tab til feltet, skriv «s», og bruk pil ned, Enter og Escape. Gjør det samme i begge.</Prov>
        <Variant
          variant="feil"
          kilde="grep-6/velg-sone.feil"
          tittel='<input role="combobox">'
          sier="«kombinasjonsboks, sammenslått» – uten navn, og «sammenslått» også når lista er åpen. Pil ned gjør ingenting, og valgene blir aldri lest opp."
        />
        <Variant
          variant="riktig"
          kilde="grep-6/velg-sone.riktig"
          tittel="<ComboBox> fra React Aria"
          sier="«Velg sone, kombinasjonsboks, sammenslått» · pil ned: «3 alternativer finnes.» «Sone A – Sentrum» · Enter: «Sone A – Sentrum, valgt»"
          merk="Knappen ved siden av feltet får navnet «Vis forslag» fra React Aria – på norsk, fordi appen har I18nProvider med locale nb-NO."
        />
      </Eksempel>

      <Eksempel grep="7" tittel="lang på html-elementet">
        <p>Malen fra Vite og Create React App har <code>lang=&quot;en&quot;</code>. Da leser skjermleseren norsk tekst med engelsk stemme. Riktig språk gir også riktig orddeling, stavekontroll og oversettelse. Bruk <code>lang=&quot;en&quot;</code> på enkeltord eller avsnitt som faktisk er engelske.</p>
        <Prov>Les teksten i begge rammene med skjermleser. Hør på uttalen.</Prov>
        <Variant variant="feil" kilde="grep-6/lang.feil.html" ramme={150} tittel='lang="en"' sier="Norsk tekst med engelsk stemme og uttale – «Søk» blir til noe sånt som «Sook»." />
        <Variant variant="riktig" kilde="grep-6/lang.riktig.html" ramme={150} tittel='lang="no"' sier="Norsk tekst med norsk stemme." />
        <Variant variant="riktig" bred bareKode kilde="grep-6/next/layout.tsx" tittel="I Next.js: app/layout.tsx" />
      </Eksempel>

      <Eksempel grep="7" tittel="prefers-reduced-motion">
        <p>Animasjoner som glir, spretter eller ruller kan gi svimmelhet og kvalme for personer med vestibulære plager. Mange har slått på «Reduser bevegelse» i operativsystemet – respekter det.</p>
        <Prov>DevTools → Rendering → «Emulate CSS media feature prefers-reduced-motion» → reduce. Eller slå det på i macOS (Tilgjengelighet → Skjerm) eller Windows (Animasjonseffekter av).</Prov>
        <Variant variant="feil" kilde="grep-6/bevegelse.feil" tittel="alltid animasjon" />
        <Variant variant="riktig" kilde="grep-6/bevegelse.riktig" tittel="@media (prefers-reduced-motion)" />
      </Eksempel>

      <Eksempel grep="7" tittel="En sidetittel som sier noe">
        <p><code>&lt;title&gt;</code> er det første skjermleseren leser når siden lastes, og det som står i fanen og i historikken. «React App» i tolv faner hjelper ingen.</p>
        <Variant variant="feil" bareKode kilde="grep-6/tittel.feil.html" tittel="malens tittel" sier="«React App»" />
        <Variant variant="riktig" bareKode kilde="grep-6/tittel.riktig.html" tittel="beskrivende tittel" sier="«Søk om beboerparkering – Fjordvik kommune»" />
        <Variant variant="riktig" bred bareKode kilde="grep-6/next/page.tsx" tittel="I Next.js: metadata i page.tsx" />
      </Eksempel>
    </Eksempelside>
  );
}
