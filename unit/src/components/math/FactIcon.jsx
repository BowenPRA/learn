/**
 * A small picture of each angle fact, for the fact cards of the Year 7 angle
 * tasks (Find It, Say Why; Find Every Angle): the straight line, the full
 * turn, the X, the upright F, the true Z, the same-side pair, the triangle,
 * the quadrilateral, a parallelogram's opposite and next-door corners, and
 * two lines with no arrows ("you can't tell").
 * The colours are the diagram's: the angle you find is orange, the angle (or
 * angles) you know teal — "use this one to find that one".
 */
const INK = 'currentColor';
const FIND = '#f28c28';
const KNOW = '#3fb4c9';

const wedge = (x, y, r, a0, a1) => {
  const p = (a) => [x + r * Math.cos((a * Math.PI) / 180), y - r * Math.sin((a * Math.PI) / 180)];
  const [sx, sy] = p(a0);
  const [ex, ey] = p(a1);
  return `M ${x} ${y} L ${sx.toFixed(1)} ${sy.toFixed(1)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 0 ${ex.toFixed(1)} ${ey.toFixed(1)} Z`;
};
const W = ({ at, r = 8, from, to, find, soft }) => (
  <path d={wedge(at[0], at[1], r, from, to)} fill={find ? FIND : KNOW} opacity={soft ? 0.6 : 1} stroke="none" />
);

const PICS = {
  line: <><W at={[24, 26]} r={9} from={0} to={54.8} /><W at={[24, 26]} r={9} from={54.8} to={180} find /><path d="M 4 26 L 44 26 M 24 26 L 36 9" /></>,
  point: (
    <>
      <W at={[24, 17]} from={22.4} to={151.9} /><W at={[24, 17]} from={151.9} to={270} soft /><W at={[24, 17]} from={270} to={382.4} find />
      <path d="M 24 17 L 41 10 M 24 17 L 9 9 M 24 17 L 24 34" /><circle cx="24" cy="17" r="2" fill={INK} />
    </>
  ),
  opp: <><W at={[24, 17]} r={9} from={29.4} to={150.6} find /><W at={[24, 17]} r={9} from={209.4} to={330.6} /><path d="M 8 26 L 40 8 M 8 8 L 40 26" /></>,
  corr: <><W at={[19.2, 10]} from={301} to={360} /><W at={[28.8, 26]} from={301} to={360} find /><path d="M 6 10 L 44 10 M 6 26 L 44 26 M 15 3 L 33 33" /></>,
  alt: <><W at={[29.3, 10]} from={180} to={236.3} /><W at={[18.7, 26]} from={0} to={56.3} find /><path d="M 6 10 L 44 10 M 6 26 L 44 26 M 36 0 L 12 36" /></>,
  side: <><W at={[19.2, 10]} from={180} to={301} /><W at={[28.8, 26]} from={121} to={180} find /><path d="M 6 10 L 44 10 M 6 26 L 44 26 M 15 3 L 33 33" /></>,
  tri: (
    <>
      <W at={[8, 30]} from={0} to={57.4} /><W at={[40, 30]} from={122.6} to={180} soft /><W at={[24, 5]} r={7} from={237.4} to={302.6} find />
      <path d="M 8 30 L 40 30 L 24 5 Z" />
    </>
  ),
  quad: (
    <>
      <W at={[7, 29]} r={7} from={-3.4} to={73.3} /><W at={[41, 31]} r={7} from={103.5} to={176.6} soft />
      <W at={[35, 6]} r={7} from={187.8} to={283.5} find /><W at={[13, 9]} r={7} from={253.3} to={367.8} soft />
      <path d="M 7 29 L 41 31 L 35 6 L 13 9 Z" />
    </>
  ),
  para: <><W at={[6, 29]} from={0} to={70} /><W at={[42, 7]} from={180} to={250} find /><path d="M 6 29 L 34 29 L 42 7 L 14 7 Z" /></>,
  next: <><W at={[6, 29]} from={0} to={70} /><W at={[34, 29]} from={70} to={180} find /><path d="M 6 29 L 34 29 L 42 7 L 14 7 Z" /></>,
  // Two lines that look parallel but carry no arrows: you can't tell.
  none: (
    <>
      <path d="M 4 11 L 34 9 M 4 26 L 34 27 M 12 3 L 26 33" />
      <text x="42" y="25" textAnchor="middle" fontSize="20" fontWeight="900" fill={FIND} stroke="none" fontFamily="Inter, 'Segoe UI', system-ui, sans-serif">?</text>
    </>
  ),
};

export default function FactIcon({ kind, className = 'w-11 h-8' }) {
  return (
    <svg viewBox="0 0 48 36" className={className} aria-hidden="true" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {PICS[kind] || null}
    </svg>
  );
}
