'use client';

import { useId } from 'react';

export default function BekreftEpost() {
  const id = useId();

  return (
    <div className="felt"><label htmlFor={`${id}-epost`}>E-post</label><input id={`${id}-epost`} type="email" autoComplete="email" /></div>
  );
}
