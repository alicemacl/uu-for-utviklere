'use client';

import { useId, useState } from 'react';

export default function Pris() {
  const [apen, settApen] = useState(false);
  const panelId = useId();

  function vekslePanel() {
    settApen(!apen);
  }

  return (
    <div className="trekkspill">
      <h4>
        <button type="button" aria-expanded={apen} aria-controls={panelId} onClick={vekslePanel}>
          Hva koster det? <span className="pil" aria-hidden="true">▾</span>
        </button>
      </h4>
      <div className="trekkspill-innhold" id={panelId} hidden={!apen}>
        1 200 kr per år, 600 kr for el-bil.
      </div>
    </div>
  );
}
