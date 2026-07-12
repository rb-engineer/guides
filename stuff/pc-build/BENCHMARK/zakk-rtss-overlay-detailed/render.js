/* ================================================================
     4) MOTOR DE RENDERIZADO: título, texto fijo, valores, gauges
        (SVG generado) y tooltips. Todas funciones flecha porque
        ninguna necesita su propio `this`.
     ================================================================ */
import { DATA } from './data.js';
import { APP_TITLE, UI_STRINGS } from './ui-strings.js';
import { TOOLTIPS } from './tooltips.js';
import { gaugeSVG } from './gauge.js';

const getPath = (obj, path) =>
  path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

const fmtValue = (v, spec) => {
  if (v === undefined || v === null) return '';
  if (spec === 'int') return String(Math.round(v));
  if (spec === '1dec') return Number(v).toFixed(1);
  if (spec === '2dec') return Number(v).toFixed(2);
  if (spec === '3dec') return Number(v).toFixed(3);
  return String(v);
};

export const renderTitle = () => {
  document.title = APP_TITLE;
  const h1 = document.getElementById('appTitle');
  if (!h1) return;
  const idx = APP_TITLE.indexOf(':');
  // Resalta el prefijo antes de ":" en naranja (mismo estilo que antes),
  // usando la regla CSS "header h1 span" que ya existe.
  h1.innerHTML = idx === -1
    ? APP_TITLE
    : `<span>${APP_TITLE.slice(0, idx)}</span>${APP_TITLE.slice(idx)}`;
};

export const renderUIStrings = (lang) => {
  const dict = UI_STRINGS[lang] || UI_STRINGS.en;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
};

export const renderValues = () => {
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const raw = getPath(DATA, el.getAttribute('data-bind'));
    const val = fmtValue(raw, el.getAttribute('data-fmt'));
    const unit = el.getAttribute('data-unit');
    const suffix = el.getAttribute('data-suffix');
    el.innerHTML = val + (unit ? `<sup>${unit}</sup>` : '') + (suffix || '');
  });
};

export const renderGauges = () => {
  document.querySelectorAll('[data-gauge]').forEach((el) => {
    const pct = getPath(DATA, el.getAttribute('data-gauge'));
    const color = el.getAttribute('data-gauge-color') || 'var(--gauge-color)';
    const small = el.querySelector('small');
    el.innerHTML = gaugeSVG(pct, color) + (small ? small.outerHTML : '');
  });
};

export const renderTooltips = (lang) => {
  document.querySelectorAll('[data-tip-key]').forEach((el) => {
    const entry = TOOLTIPS[el.getAttribute('data-tip-key')];
    if (entry && entry[lang]) el.setAttribute('data-tip', entry[lang](DATA));
  });
};
