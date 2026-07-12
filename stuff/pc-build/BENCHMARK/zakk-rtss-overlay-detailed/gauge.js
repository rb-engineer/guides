/* ================================================================
   Gauges: arco + aguja SVG generados a partir de un porcentaje.
   polarToCartesian y arcPath quedan privados del módulo: solo
   gaugeSVG se exporta, que es lo único que el resto necesita.
   ================================================================ */
const polarToCartesian = (cx, cy, r, angleDeg) => {
  const a = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};
const arcPath = (cx, cy, r, startAngle, endAngle) => {
  const s = polarToCartesian(cx, cy, r, startAngle);
  const e = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = (endAngle - startAngle) <= 180 ? 0 : 1;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
};
export const gaugeSVG = (percent, color) => {
  const cx = 20, cy = 20, r = 14, start = -135, sweep = 270, end = start + sweep;
  const pct = Math.max(0, Math.min(100, Number(percent) || 0));
  const valAngle = start + sweep * (pct / 100);
  const track = arcPath(cx, cy, r, start, end);
  const value = pct > 0.5 ? arcPath(cx, cy, r, start, valAngle) : '';
  const needle = polarToCartesian(cx, cy, r - 1, valAngle);
  return `<svg class="g-ico" viewBox="0 0 40 40" aria-hidden="true">
    <path d="${track}" fill="none" stroke="var(--gauge-track)" stroke-width="6" stroke-linecap="round"/>
    ${value ? `<path d="${value}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>` : ''}
    <line x1="${cx}" y1="${cy}" x2="${needle.x.toFixed(2)}" y2="${needle.y.toFixed(2)}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
};
