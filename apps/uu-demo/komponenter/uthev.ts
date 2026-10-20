import 'server-only';
import { createHighlighter, createJavaScriptRegexEngine, type Highlighter, type ThemeRegistration } from 'shiki';

/*
  Syntaksfarger for kodevisningen. Fargene er de samme som i den statiske versjonen,
  og alle har god kontrast mot bakgrunnen (#07071c). Uthevingen skjer når siden bygges,
  så den gir ingen JavaScript i nettleseren.
*/
const tema: ThemeRegistration = {
  name: 'uu-demo',
  type: 'dark',
  colors: { 'editor.background': '#07071c', 'editor.foreground': '#e6e6ff' },
  tokenColors: [
    { settings: { foreground: '#e6e6ff', background: '#07071c' } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#a6a6c8', fontStyle: 'italic' } },
    {
      scope: ['string', 'string.quoted', 'string.template', 'punctuation.definition.string', 'constant.numeric', 'constant.other.color', 'support.constant.property-value', 'support.constant', 'keyword.other.unit'],
      settings: { foreground: '#a8f0c6' },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'constant.language', 'variable.language', 'keyword.control.at-rule', 'punctuation.definition.keyword'],
      settings: { foreground: '#d9b3ff' },
    },
    {
      scope: [
        'entity.name.tag', 'support.class.component', 'punctuation.definition.tag', 'meta.tag.sgml.doctype',
        'entity.other.attribute-name.class.css', 'entity.other.attribute-name.pseudo-class.css',
        'entity.other.attribute-name.pseudo-element.css', 'entity.other.attribute-name.id.css', 'entity.name.tag.css',
        'punctuation.definition.entity.css',
      ],
      settings: { foreground: '#9fb4ff' },
    },
    { scope: ['entity.other.attribute-name', 'support.type.property-name', 'meta.property-name'], settings: { foreground: '#ffd9b8' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call entity.name.function'], settings: { foreground: '#c9c8ff' } },
  ],
};

export type Sprak = 'tsx' | 'css' | 'html';

let uthever: Promise<Highlighter> | undefined;

function hentUthever() {
  uthever ??= createHighlighter({
    themes: [tema],
    langs: ['tsx', 'css', 'html'],
    engine: createJavaScriptRegexEngine(),
  });
  return uthever;
}

// Gir ferdig HTML: <pre class="shiki" tabindex="0" aria-label="…"><code>…</code></pre>
export async function uthev(kode: string, sprak: Sprak, etikett: string) {
  const h = await hentUthever();
  return h.codeToHtml(kode, {
    lang: sprak,
    theme: 'uu-demo',
    transformers: [
      {
        pre(node) {
          // Kan rulles med tastaturet, og skjermleseren får vite hva det er
          node.properties.tabindex = '0';
          node.properties['aria-label'] = etikett;
        },
      },
    ],
  });
}
