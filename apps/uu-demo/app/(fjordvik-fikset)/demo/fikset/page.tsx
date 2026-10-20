/* Plassholderlenkene med href="#" er med vilje – dette er en demo, ikke et ekte nettsted. */
/* eslint jsx-a11y/anchor-is-valid: ["error", { "aspects": ["noHref", "preferButton"] }] */

import { Demolinje } from '@/komponenter/fjordvik/Demolinje';
import { Cookies } from './Cookies';
import { Sokeknapp } from './Sokeknapp';
import { Soknadsskjema } from './Soknadsskjema';
import { Varsel } from './Varsel';

/*
  Den samme siden som /demo/feil, fikset. Det meste er ren HTML på serveren –
  JavaScript trengs bare for cookie-banneret, søkeknappen, varselet og skjemaet.
*/
export default function Fikset() {
  return (
    <>
      <a className="hopp" href="#hoved">Hopp til hovedinnhold</a>

      <Cookies />

      <header className="topp">
        <div className="topp__indre">
          <a className="logo" href="/demo/fikset"><img src="/img/fjordvik-logo.svg" alt="Fjordvik kommune – forsiden" width={200} height={43} /></a>
          <nav aria-label="Hovedmeny">
            <ul className="meny">
              <li><a href="#">Tjenester</a></li>
              <li><a href="#">Bolig og eiendom</a></li>
              <li><a href="#" aria-current="page">Trafikk og parkering</a></li>
              <li><a href="#">Helse og omsorg</a></li>
              <li><a href="#">Kontakt</a></li>
            </ul>
          </nav>
          <Sokeknapp />
          <a className="ikonknapp" href="#">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="4" fill="currentColor" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="currentColor" /></svg>
            <span className="vh">Min side</span>
          </a>
        </div>
      </header>

      <Varsel />

      <main id="hoved" className="side" tabIndex={-1}>
        <nav className="brodsmuler" aria-label="Brødsmulesti">
          <ol>
            <li><a href="#">Forside</a></li>
            <li><a href="#">Trafikk og parkering</a></li>
            <li><a href="#" aria-current="page">Beboerparkering</a></li>
          </ol>
        </nav>

        <h1>Søk om beboerparkering</h1>
        <p className="ingress">Bor du i en sone med beboerparkering, kan du søke om parkeringstillatelse for bilen din. Tillatelsen gjelder i ett år fra den blir innvilget.</p>

        <div className="hero"><img src="/img/IMG_4032.svg" alt="" /></div>

        <div className="to-kol">
          <section aria-labelledby="for-du-soker">
            <h2 id="for-du-soker">Før du søker</h2>
            <p>Du må være folkeregistrert på en adresse i sonen, og bilen må være registrert på deg eller noen i husstanden din. <a href="#">Les reglene for beboerparkering</a>.</p>
            <p>Usikker på hvilken sone du bor i? Se kartet under, eller <a href="#">finn sonen din med adressesøk</a>.</p>
            <figure className="sonekart" style={{ margin: 0 }}>
              <img src="/img/sonekart_v3_FINAL.svg" alt="Kart over beboerparkeringssonene i Fjordvik." />
              <figcaption>Sone A: Sentrum, vest for elva. Sone B: Bryggen, øst for elva. Sone C (ny fra 1. november): Strandlia, sør for sentrum.</figcaption>
            </figure>
          </section>
          <aside className="kort" aria-labelledby="pris">
            <h2 id="pris">Pris og behandlingstid</h2>
            <dl>
              <dt>Pris</dt><dd>1 200 kr per år</dd>
              <dt>El-bil</dt><dd>600 kr per år</dd>
            </dl>
            <p>Behandlingstiden er normalt 2–3 uker. Du får svar på e-post.</p>
            <p><a href="#">Les mer om priser og fritak</a></p>
          </aside>
        </div>

        <h2 id="skjema-tittel">Søknadsskjema</h2>
        <p>Alle felt må fylles ut.</p>

        <Soknadsskjema />
      </main>

      <footer className="bunn">
        <div className="bunn__indre">
          <div>
            <h2 className="bunn__tittel">Fjordvik kommune</h2>
            <p>Rådhusplassen 1, 9999 Fjordvik<br />Telefon <a href="tel:+4799999999">99 99 99 99</a></p>
          </div>
          <nav aria-labelledby="snarveier">
            <h2 className="bunn__tittel" id="snarveier">Snarveier</h2>
            <ul>
              <li><a href="#">Kontakt oss</a></li>
              <li><a href="#">Tilgjengelighetserklæring</a></li>
              <li><a href="#">Personvern og informasjonskapsler</a></li>
            </ul>
          </nav>
        </div>
      </footer>

      <Demolinje variant="ok" />
    </>
  );
}
