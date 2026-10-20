import { Demolinje } from '@/komponenter/fjordvik/Demolinje';
import { FeilSide } from './FeilSide';

// Demosiden med feil. Tittel, lang og viewport settes i layout.tsx ved siden av.
export default function Feil() {
  return (
    <>
      <FeilSide />
      <Demolinje variant="feil" />
    </>
  );
}
