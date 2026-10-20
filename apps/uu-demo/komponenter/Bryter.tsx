'use client';

import { ToggleButton, type ToggleButtonProps } from 'react-aria-components';
import s from './Side.module.css';

// Av/på-knapp fra React Aria: gir aria-pressed, tastatur og :focus-visible-oppførsel ferdig
export function Bryter(props: Omit<ToggleButtonProps, 'className'>) {
  return <ToggleButton {...props} className={s.bryter} />;
}
