'use client';

import { useState } from 'react';

export default function Pris() {
  const [apen, settApen] = useState(false);

  return (
    <div className="trekkspill">
      <div className="trekkspill-tittel" onClick={() => settApen(!apen)}>
        Hva koster det? ▾
      </div>
      <div className="trekkspill-innhold" hidden={!apen}>
        1 200 kr per år, 600 kr for el-bil.
      </div>
    </div>
  );
}
