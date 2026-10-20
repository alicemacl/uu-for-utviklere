export default function Prisliste() {
  return (
    <table>
      <caption>Pris per år</caption>
      <thead>
        <tr><th scope="col">Sone</th><th scope="col">Bensin og diesel</th><th scope="col">El-bil</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">A</th><td>1 200 kr</td><td>600 kr</td></tr>
        <tr><th scope="row">B</th><td>1 000 kr</td><td>500 kr</td></tr>
        <tr><th scope="row">C</th><td>800 kr</td><td>400 kr</td></tr>
      </tbody>
    </table>
  );
}
