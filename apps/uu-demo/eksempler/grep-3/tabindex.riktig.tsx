export default function Navnefelt() {
  return (
    <>
      <div className="felt"><label htmlFor="fn-32r">Fornavn</label><input id="fn-32r" /></div>
      <div className="felt"><label htmlFor="en-32r">Etternavn</label><input id="en-32r" /></div>
      <div className="felt"><label htmlFor="ep-32r">E-post</label><input id="ep-32r" type="email" /></div>
    </>
  );
}
