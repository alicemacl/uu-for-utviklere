'use client';

import { useState } from 'react';

export default function Varsling() {
  const [pa, settPa] = useState(false);

  return (
    <div className="bryterrad">
      <div className={pa ? 'vippe pa' : 'vippe'} onClick={() => settPa(!pa)}></div>
      <span>Varsle meg på SMS</span>
    </div>
  );
}
