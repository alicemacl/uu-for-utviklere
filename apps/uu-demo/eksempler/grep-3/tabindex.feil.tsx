export default function Navnefelt() {
  return (
    <>
      <div className="felt"><label htmlFor="fn-32f">Fornavn</label><input id="fn-32f" tabIndex={2} /></div>
      <div className="felt"><label htmlFor="en-32f">Etternavn</label><input id="en-32f" tabIndex={3} /></div>
      <div className="felt"><label htmlFor="ep-32f">E-post</label><input id="ep-32f" type="email" tabIndex={1} /></div>
    </>
  );
}
