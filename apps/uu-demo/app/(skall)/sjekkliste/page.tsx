import type { Metadata } from 'next';
import s from '@/komponenter/Side.module.css';
import { Sjekkliste } from './Sjekkliste';
import l from './sjekkliste.module.css';

export const metadata: Metadata = { title: 'Tre ting i morgen og sjekkliste' };

export default function SjekklisteSide() {
  return (
    <div className={l.side}>
      <p className={s.overtittel}>Del 6 · Avslutning</p>
      <h1>Tre ting du kan gjøre i morgen</h1>

      <ol className={l.tre}>
        <li><div><strong>Tab gjennom din egen app</strong><span>Ser du fokus hele veien? Kommer du til alt – og ut igjen?</span></div></li>
        <li><div><strong>Kjør axe på én side</strong><span>Fiks de alvorligste feilene først.</span></div></li>
        <li><div><strong>Bytt én klikkbar &lt;div&gt; med &lt;button&gt;</strong><span>Du får tastaturnavigasjon, fokus og riktig rolle gratis.</span></div></li>
      </ol>
      <p className={l.oppmuntring}>Du trenger ikke fikse alt på én gang. Start med én ting i dag.</p>

      <h2>Sjekkliste</h2>
      <Sjekkliste />

      <h2 className={l.avstand}>Verktøy som finner det du ikke ser</h2>
      <div className={s.to}>
        <div className={s.boks}>
          <ul>
            <li><a href="https://www.deque.com/axe/devtools/">axe DevTools</a> – finner feil og forklarer konkrete rettelser</li>
            <li><a href="https://developer.chrome.com/docs/lighthouse/overview">Lighthouse</a> – innebygd i Chrome, rask helsesjekk</li>
            <li><a href="https://wave.webaim.org/">WAVE</a> – viser feilene direkte på siden</li>
            <li><a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y">eslint-plugin-jsx-a11y</a> – stopper feil i JSX før commit</li>
            <li><a href="https://developer.chrome.com/docs/devtools/accessibility/reference">Accessibility tree i Chrome DevTools</a> – viser rolle og navn slik hjelpemidler ser dem</li>
          </ul>
        </div>
        <div className={s.boks}>
          <p><strong>Husk:</strong> Automatiske verktøy finner bare en del av feilene. De ser at et bilde mangler alt-tekst, men ikke om alt-teksten er god – og de kan ikke kjenne på om skjemaet ditt er forvirrende.</p>
          <p>Test alltid også med tastatur og skjermleser: <kbd>Cmd</kbd>+<kbd>F5</kbd> starter VoiceOver på Mac, og <a href="https://www.nvaccess.org/download/">NVDA</a> er gratis for Windows.</p>
        </div>
      </div>

      <h2 className={l.avstand}>Lenker</h2>
      <ul className={l.lenker}>
        <li><a href="https://www.uutilsynet.no/">Uutilsynet</a><small>Regelverk, veiledning og tilgjengelighetserklæring</small></li>
        <li><a href="https://www.w3.org/WAI/WCAG21/quickref/">WCAG 2.1 – hurtigreferanse</a><small>Alle suksesskriterier med teknikker, fra W3C</small></li>
        <li><a href="https://www.a11yproject.com/checklist/">The A11Y Project – sjekkliste</a><small>Praktisk sjekkliste for utviklere</small></li>
        <li><a href="https://testing-library.com/docs/queries/byrole/">Testing Library – getByRole</a><small>Tester som bruker det samme tilgjengelighetstreet</small></li>
      </ul>
    </div>
  );
}
