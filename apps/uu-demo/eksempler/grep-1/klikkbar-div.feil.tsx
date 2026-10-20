'use client';

import { useState } from 'react';

export default function LikKnapp() {
  const [antall, settAntall] = useState(0);

  return (
    <div className="knapp" onClick={() => settAntall(antall + 1)}>
      Lik ({antall})
    </div>
  );
}
