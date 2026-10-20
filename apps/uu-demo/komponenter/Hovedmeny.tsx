'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDER } from './sider';
import s from './Skall.module.css';

export function Hovedmeny() {
  const sti = usePathname();
  return (
    <nav className={s.hovedmeny} aria-label="Hovedmeny">
      <ul>
        {SIDER.map((side) => (
          <li key={side.id}>
            <Link href={side.url} aria-current={side.url === sti ? 'page' : undefined}>
              {side.kort}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
