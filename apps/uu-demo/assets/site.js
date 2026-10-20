/*
  UU-demo – felles skript for skallet.

  Hvert eksempel skrives én gang, i en <script type="text/html">-blokk.
  Skriptet under bruker den samme kildeteksten til både den levende demoen
  og kodevisningen, så de kan aldri gli fra hverandre.

  <section class="eksempel">
    <h2>Overskrift</h2>
    <p>Forklaring …</p>
    <script type="text/html"
            data-variant="feil"            feil | riktig
            data-tittel="<div onclick>"    (valgfri) kort navn på varianten
            data-sier="«Lagre»"            (valgfri) hva skjermleseren omtrent sier
            data-merk="…"                  (valgfri) en ekstra merknad
            data-js="funksjon1 funksjon2"  (valgfri) vis kildekoden til globale funksjoner
            data-ramme="260"               (valgfri) vis i iframe med denne høyden (for hele sider)
            data-bare-kode                 (valgfri) vis bare koden, ingen levende demo
            data-kontrast="tekst|.velger|Navn; kant|.velger|Navn"  (valgfri) mål kontrast
    > … HTML … </script>
  </section>
*/
(function () {
  'use strict';

  var rot = document.body.getAttribute('data-rot') || '';

  // ---------- Navigasjon ----------
  var SIDER = [
    { id: 'oversikt', url: 'index.html', kort: 'Oversikt', tittel: 'Oversikt' },
    { id: 'demo', url: 'demo/feil.html', kort: 'Demo', tittel: 'Demosiden' },
    { id: 'grep-1', url: 'grep/1-semantikk.html', kort: '1 Semantikk', tittel: 'Grep 1: Semantisk HTML' },
    { id: 'grep-2', url: 'grep/2-skjema.html', kort: '2 Skjema', tittel: 'Grep 2: Skjema med label og feilmeldinger' },
    { id: 'grep-3', url: 'grep/3-tastatur.html', kort: '3 Tastatur', tittel: 'Grep 3: Tastatur og fokus' },
    { id: 'grep-4', url: 'grep/4-bilder.html', kort: '4 Bilder', tittel: 'Grep 4: Bilder med alt-tekst' },
    { id: 'grep-5', url: 'grep/5-kontrast-zoom.html', kort: '5 Kontrast', tittel: 'Grep 5: Kontrast og zoom' },
    { id: 'grep-6', url: 'grep/6-aria-og-sma-gevinster.html', kort: '6–7 ARIA', tittel: 'Grep 6 og 7: ARIA og små gevinster' },
    { id: 'finn-feilen', url: 'finn-feilen.html', kort: 'Finn feilen', tittel: 'Finn feilen' },
    { id: 'sjekkliste', url: 'sjekkliste.html', kort: 'Sjekkliste', tittel: 'Tre ting i morgen og sjekkliste' }
  ];
  var REKKEFOLGE = ['grep-1', 'grep-2', 'grep-3', 'grep-4', 'grep-5', 'grep-6', 'finn-feilen', 'sjekkliste'];
  var denne = document.body.getAttribute('data-side');

  function lag(tag, attr, html) {
    var el = document.createElement(tag);
    if (attr) Object.keys(attr).forEach(function (k) { el.setAttribute(k, attr[k]); });
    if (html != null) el.innerHTML = html;
    return el;
  }

  var main = document.querySelector('main');
  if (main && !main.id) main.id = 'innhold';

  var hopp = lag('a', { 'class': 'hopp', href: '#' + (main ? main.id : '') }, 'Hopp til hovedinnhold');
  var topp = lag('header', { 'class': 'topp' });
  topp.innerHTML =
    '<div class="topp__indre">' +
      '<a class="merkevare" href="' + rot + 'index.html"><span class="merkevare__prikk" aria-hidden="true"></span>UU-demo</a>' +
      '<nav class="hovedmeny" aria-label="Hovedmeny"><ul>' +
        SIDER.map(function (s) {
          return '<li><a href="' + rot + s.url + '"' + (s.id === denne ? ' aria-current="page"' : '') + '>' + s.kort + '</a></li>';
        }).join('') +
      '</ul></nav>' +
    '</div>';
  document.body.insertBefore(topp, document.body.firstChild);
  document.body.insertBefore(hopp, topp);

  // Forrige / neste
  var plass = REKKEFOLGE.indexOf(denne);
  if (plass !== -1 && main) {
    var finn = function (id) { return SIDER.filter(function (s) { return s.id === id; })[0]; };
    var forrige = finn(REKKEFOLGE[plass - 1]);
    var neste = finn(REKKEFOLGE[plass + 1]);
    var bla = lag('nav', { 'class': 'bla', 'aria-label': 'Bla mellom sidene' });
    if (forrige) bla.appendChild(lag('a', { href: rot + forrige.url, 'class': 'forrige' }, '<small>← Forrige</small>' + forrige.tittel));
    if (neste) bla.appendChild(lag('a', { href: rot + neste.url, 'class': 'neste' }, '<small>Neste →</small>' + neste.tittel));
    main.appendChild(bla);
  }

  var bunn = lag('footer', { 'class': 'bunn' }, '<p>Demo-app til kurset «UU for utviklere». Feilene på denne siden er med vilje.</p>');
  document.body.appendChild(bunn);

  // ---------- Hjelpere for kode ----------
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function dedent(tekst) {
    var linjer = tekst.replace(/\t/g, '  ').split('\n');
    while (linjer.length && !linjer[0].trim()) linjer.shift();
    while (linjer.length && !linjer[linjer.length - 1].trim()) linjer.pop();
    var min = Infinity;
    linjer.forEach(function (l) { if (l.trim()) min = Math.min(min, l.match(/^ */)[0].length); });
    if (!isFinite(min)) min = 0;
    return linjer.map(function (l) { return l.slice(min); }).join('\n');
  }

  function dedentFunksjon(kilde) {
    var linjer = kilde.split('\n');
    if (linjer.length < 2) return kilde;
    var siste = linjer[linjer.length - 1].match(/^ */)[0].length;
    return linjer.map(function (l, i) { return i === 0 ? l : l.slice(Math.min(siste, l.match(/^ */)[0].length)); }).join('\n');
  }

  function fargeCss(tekst) {
    return esc(tekst).replace(/\/\*[\s\S]*?\*\//g, function (m) { return '<span class="k-kommentar">' + m + '</span>'; });
  }

  function fargeAttr(attr) {
    return attr.replace(/([^\s=]+)(\s*=\s*)?("[^"]*"|'[^']*'|[^\s"']+)?/g, function (m, navn, lik, verdi) {
      var ut = '<span class="k-attr">' + esc(navn) + '</span>';
      if (lik) ut += esc(lik);
      if (verdi) ut += '<span class="k-verdi">' + esc(verdi) + '</span>';
      return ut;
    });
  }

  function fargeHtml(kilde) {
    var re = /<!--[\s\S]*?-->|<\/?[a-zA-Z][\w-]*(?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s*\/?>|<!DOCTYPE[^>]*>/gi;
    var ut = '', sist = 0, m;
    while ((m = re.exec(kilde))) {
      ut += fargeCss(kilde.slice(sist, m.index));
      var bit = m[0];
      if (bit.indexOf('<!--') === 0 || /^<!DOCTYPE/i.test(bit)) {
        ut += '<span class="k-kommentar">' + esc(bit) + '</span>';
      } else {
        var t = bit.match(/^(<\/?)([a-zA-Z][\w-]*)([\s\S]*?)(\s*\/?>)$/);
        ut += '<span class="k-tag">' + esc(t[1] + t[2]) + '</span>' + fargeAttr(t[3]) + '<span class="k-tag">' + esc(t[4]) + '</span>';
      }
      sist = re.lastIndex;
    }
    return ut + fargeCss(kilde.slice(sist));
  }

  function fargeJs(kilde) {
    var re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(function|var|let|const|return|if|else|for|of|in|new|true|false|null|this|typeof)\b/g;
    var ut = '', sist = 0, m;
    while ((m = re.exec(kilde))) {
      ut += esc(kilde.slice(sist, m.index));
      var kl = m[1] ? 'k-kommentar' : m[2] ? 'k-streng' : 'k-nokkel';
      ut += '<span class="' + kl + '">' + esc(m[0]) + '</span>';
      sist = re.lastIndex;
    }
    return ut + esc(kilde.slice(sist));
  }

  // ---------- Kontrastmåling ----------
  function rgba(s) {
    var m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return [0, 0, 0, 1];
    var d = m[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat);
    return [d[0], d[1], d[2], d.length > 3 ? d[3] : 1];
  }
  function luminans(c) {
    var v = c.slice(0, 3).map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function bakgrunn(el) {
    while (el && el.nodeType === 1) {
      var c = rgba(getComputedStyle(el).backgroundColor);
      if (c[3] > 0) return c;
      el = el.parentElement;
    }
    return [255, 255, 255, 1];
  }
  function forhold(a, b) {
    var l1 = luminans(a), l2 = luminans(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  function malKontrast(live, oppsett, liste) {
    oppsett.split(';').forEach(function (del) {
      var d = del.split('|').map(function (x) { return x.trim(); });
      if (d.length < 3) return;
      var el = live.querySelector(d[1]);
      if (!el) return;
      var cs = getComputedStyle(el);
      var tekst = d[0] === 'tekst';
      var forgrunn = rgba(tekst ? cs.color : d[0] === 'kant' ? cs.borderTopColor : cs.color);
      var bak = tekst ? bakgrunn(el) : bakgrunn(el.parentElement);
      var krav = tekst ? 4.5 : 3;
      var f = forhold(forgrunn, bak);
      var ok = f >= krav;
      var li = lag('li', { 'class': ok ? 'bestatt' : 'stryk' });
      li.textContent = (ok ? '✓ ' : '✕ ') + d[2] + ': ' + f.toFixed(1).replace('.', ',') + ':1 (krav ' + String(krav).replace('.', ',') + ':1)';
      liste.appendChild(li);
    });
  }

  // ---------- Bygg eksemplene ----------
  var grepNr = document.body.getAttribute('data-grep');
  var eksempler = document.querySelectorAll('section.eksempel');
  var innhold = document.querySelector('[data-innhold]');
  var innholdUl = innhold ? lag('ul', { 'class': 'innhold-liste' }) : null;

  var tellere = {};
  eksempler.forEach(function (sek, i) {
    var h2 = sek.querySelector('h2');
    if (!sek.id) sek.id = 'eksempel-' + (i + 1);
    if (h2) {
      if (!h2.id) h2.id = sek.id + '-tittel';
      sek.setAttribute('aria-labelledby', h2.id);
      // Nummerering: 1.1, 1.2 … En seksjon kan bytte prefiks med data-grep="7"
      var prefiks = sek.getAttribute('data-grep') || grepNr;
      if (prefiks) {
        tellere[prefiks] = (tellere[prefiks] || 0) + 1;
        h2.insertAdjacentHTML('afterbegin', '<span class="nr">' + prefiks + '.' + tellere[prefiks] + '</span>');
      }
      if (innholdUl) {
        var li = lag('li');
        li.appendChild(lag('a', { href: '#' + sek.id }, h2.innerHTML));
        innholdUl.appendChild(li);
      }
    }

    var sim = sek.getAttribute('data-sim');
    if (sim) {
      var linje = lag('div', { 'class': 'verktoylinje', role: 'group', 'aria-label': 'Simuler' });
      var tekster = { smal: 'Smal skjerm: 320 px (som 400 % zoom)', tekstavstand: 'Øk tekstavstand (WCAG 1.4.12)' };
      sim.split(/\s+/).forEach(function (navn) {
        var b = lag('button', { type: 'button', 'class': 'bryter', 'aria-pressed': 'false' }, tekster[navn] || navn);
        b.addEventListener('click', function () {
          var pa = b.getAttribute('aria-pressed') !== 'true';
          b.setAttribute('aria-pressed', String(pa));
          sek.classList.toggle('sim-' + navn, pa);
        });
        linje.appendChild(b);
      });
      sek.appendChild(linje);
    }

    var kilder = sek.querySelectorAll('script[type="text/html"][data-variant]');
    if (!kilder.length) return;
    var par = lag('div', { 'class': 'par' });

    kilder.forEach(function (s) {
      var variant = s.getAttribute('data-variant');
      var feil = variant === 'feil';
      var kilde = dedent(s.textContent);
      var tittel = s.getAttribute('data-tittel') || '';
      var side = lag('div', { 'class': 'side side--' + variant });

      var h3 = lag('h3', { 'class': 'side__tittel' });
      h3.appendChild(lag('span', { 'class': 'merke' }, feil ? 'Før' : 'Etter'));
      if (tittel) { var c = lag('code'); c.textContent = tittel; h3.appendChild(c); }
      side.appendChild(h3);

      var live = lag('div', { 'class': 'live' });
      var ramme = s.getAttribute('data-ramme');
      if (s.hasAttribute('data-bare-kode')) {
        live = lag('div');
      } else if (ramme) {
        live.classList.add('live--ramme');
        var iframe = lag('iframe', { title: (feil ? 'Før' : 'Etter') + ': ' + (tittel || (h2 ? h2.textContent : 'demo')), style: 'height:' + ramme + 'px' });
        iframe.srcdoc = kilde;
        live.appendChild(iframe);
      } else {
        live.innerHTML = kilde;
      }
      if (live.className) side.appendChild(live);

      var kontrast = s.getAttribute('data-kontrast');
      if (kontrast) {
        var liste = lag('ul', { 'class': 'kontrast', 'aria-label': 'Målt kontrast' });
        side.appendChild(liste);
        requestAnimationFrame(function () { malKontrast(live, kontrast, liste); });
      }

      var sier = s.getAttribute('data-sier');
      if (sier) {
        var p = lag('p', { 'class': 'sr-sier' });
        p.appendChild(lag('span', { 'class': 'sr-sier__etikett' }, 'Skjermleseren sier omtrent'));
        p.appendChild(document.createTextNode(sier));
        side.appendChild(p);
      }

      var merk = s.getAttribute('data-merk');
      if (merk) side.appendChild(lag('p', { 'class': 'sr-sier' }, '<span class="sr-sier__etikett">Merk</span>' + merk));

      var kodeHtml = fargeHtml(kilde);
      var js = s.getAttribute('data-js');
      if (js) {
        js.split(/\s+/).forEach(function (navn) {
          if (typeof window[navn] === 'function') {
            kodeHtml += '\n\n<span class="k-tag">&lt;script&gt;</span>\n' + fargeJs(dedentFunksjon(window[navn].toString())) + '\n<span class="k-tag">&lt;/script&gt;</span>';
          }
        });
      }
      var detaljer = lag('details', { 'class': 'kode', open: '' });
      detaljer.appendChild(lag('summary', null, 'Koden'));
      var pre = lag('pre', { tabindex: '0', 'aria-label': 'Kode: ' + (feil ? 'før' : 'etter') });
      pre.innerHTML = kodeHtml;
      detaljer.appendChild(pre);
      side.appendChild(detaljer);

      par.appendChild(side);
    });
    sek.appendChild(par);
  });

  if (innhold && innholdUl && innholdUl.children.length) {
    innhold.appendChild(innholdUl);
  }

  // Knapp for å skjule/vise all kode – nyttig når du vil vise demoen først
  var kodeBryter = document.querySelector('[data-kodebryter]');
  if (kodeBryter) {
    kodeBryter.addEventListener('click', function () {
      var skjul = kodeBryter.getAttribute('aria-pressed') !== 'true';
      kodeBryter.setAttribute('aria-pressed', String(skjul));
      document.querySelectorAll('details.kode').forEach(function (d) { d.open = !skjul; });
    });
  }

  // Eksporter hjelperne til andre sider (finn-feilen)
  window.UUDemo = { fargeHtml: fargeHtml, fargeJs: fargeJs, dedent: dedent };
})();
