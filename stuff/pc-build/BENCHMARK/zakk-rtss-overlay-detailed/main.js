/* ================================================================
   PUNTO DE ENTRADA. Importa cada módulo y los conecta entre sí.
   Es el único archivo que referencia `window`, salvo por
   `window.OVERLAY_DATA` (definido en data.js por conveniencia).
   ================================================================ */
import { DATA, DATA_BASE, computeDerived } from './data.js';
import {
  renderTitle,
  renderUIStrings,
  renderValues,
  renderGauges,
  renderTooltips
} from './render.js';
import { fit, requestFit } from './layout.js';

// Idioma activo, recordado para que la simulación y el botón usen el
// texto correcto sin depender de localStorage en cada tick.
let currentLang = 'en';

/* ----------------------------------------------------------------
   5) IDIOMA: un solo punto de entrada que vuelve a pintar todo.
   ---------------------------------------------------------------- */
const setLang = (lang) => {
  currentLang = lang;
  computeDerived();
  renderValues();
  renderGauges();
  renderTooltips(lang);
  renderUIStrings(lang);

  const esBtn = document.getElementById('btn-es');
  const enBtn = document.getElementById('btn-en');
  if (esBtn) esBtn.classList.toggle('active', lang === 'es');
  if (enBtn) enBtn.classList.toggle('active', lang === 'en');

  // El texto del botón de simulación también depende del idioma.
  const simBtn = document.getElementById('btn-sim');
  if (simBtn) simBtn.textContent = simLabel(isSimRunning());

  try { localStorage.setItem('tipLang', lang); } catch (e) { /* private mode, ignore */ }

  requestFit();
};

// Vuelve a dibujar todo (valores + gauges + tooltips) sin tocar el
// idioma. Útil si se actualiza OVERLAY_DATA desde la consola.
const renderOverlay = () => {
  let lang = 'en';
  try { lang = localStorage.getItem('tipLang') || 'en'; } catch (e) { /* ignore */ }
  setLang(lang);
};

// Los botones ES/EN usan onclick="setLang('es')" en el HTML, y
// renderOverlay() está pensado para invocarse desde la consola del
// navegador — ambos necesitan existir en el ámbito global, ya que
// los módulos no exponen sus bindings automáticamente a `window`.
window.setLang = setLang;
window.renderOverlay = renderOverlay;

/* ================================================================
   6b) Tooltip flotante. Un ÚNICO elemento fijo, agregado al <body>
       (fuera del #stage escalado), posicionado por JS a partir del
       rect del elemento apuntado y recortado al viewport.
       Resuelve dos cosas que el tooltip de CSS puro no podía:
         1) Siempre queda por encima de todo (incluidos los núcleos
            del CPU, que antes quedaban tapados por paneles vecinos).
         2) Nunca se sale de la pantalla: se centra en el elemento
            pero se recorta a los bordes visibles.
   ================================================================ */
const tip = document.createElement('div');
tip.id = 'tip';
tip.innerHTML = '<span class="tip-text"></span><span class="caret"></span>';
document.body.appendChild(tip);
const tipTextEl = tip.querySelector('.tip-text');
const caretEl = tip.querySelector('.caret');
let tipTarget = null;

const placeTip = () => {
  if (!tipTarget) return;
  const r = tipTarget.getBoundingClientRect();
  const gap = 10, margin = 8;
  const tw = tip.offsetWidth, th = tip.offsetHeight;

  // Vertical: arriba si entra; si no, abajo.
  const above = r.top - gap - th >= margin;
  tip.classList.toggle('above', above);
  tip.classList.toggle('below', !above);
  let top = above ? r.top - gap - th : r.bottom + gap;
  top = Math.max(margin, Math.min(top, window.innerHeight - th - margin));

  // Horizontal: centrado en el elemento, recortado al viewport.
  const cx = r.left + r.width / 2;
  let left = cx - tw / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - tw - margin));

  tip.style.left = `${Math.round(left)}px`;
  tip.style.top = `${Math.round(top)}px`;

  // La flecha apunta al centro del elemento, sin salirse del tooltip.
  const caretX = Math.max(10, Math.min(cx - left, tw - 10));
  caretEl.style.left = `${Math.round(caretX)}px`;
};

const showTip = (el) => {
  const text = el.getAttribute('data-tip');
  if (!text) return;
  tipTarget = el;
  tipTextEl.textContent = text;
  tip.classList.add('show');
  placeTip();
};
const hideTip = () => {
  tipTarget = null;
  tip.classList.remove('show');
};

const TIP_SEL = '[data-tip]';
document.addEventListener('mouseover', (e) => {
  const el = e.target.closest && e.target.closest(TIP_SEL);
  if (el) showTip(el);
});
document.addEventListener('mouseout', (e) => {
  const el = e.target.closest && e.target.closest(TIP_SEL);
  // Ignorar movimientos hacia un hijo del mismo elemento (p. ej. <sup>).
  if (el && el === tipTarget && !el.contains(e.relatedTarget)) hideTip();
});
document.addEventListener('focusin', (e) => {
  const el = e.target.closest && e.target.closest(TIP_SEL);
  if (el) showTip(el);
});
document.addEventListener('focusout', (e) => {
  if (tipTarget && e.target === tipTarget) hideTip();
});
window.addEventListener('scroll', () => { if (tipTarget) placeTip(); }, true);
window.addEventListener('resize', () => { if (tipTarget) placeTip(); });

// Refresca el texto del tooltip abierto (los tooltips leen data-tip al
// mostrarse; en simulación hay que reinyectar el texto ya recalculado).
const refreshOpenTip = () => {
  if (!tipTarget) return;
  const t = tipTarget.getAttribute('data-tip');
  if (t) { tipTextEl.textContent = t; placeTip(); }
};

/* ================================================================
   6c) SIMULACIÓN. Un toggle que "enciende" el overlay: cada tick
       genera lecturas plausibles y correlacionadas (una variable
       `load` que sube/baja hace mover juntas temperatura, consumo,
       clocks y FPS), actualiza máximos/mínimos de sesión, redibuja
       valores + gauges + tooltips y alimenta los mini-gráficos de
       los rieles de la fuente. Al apagarlo se restaura el snapshot.
   ================================================================ */
const rnd = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pad2 = (n) => String(n).padStart(2, '0');

const HIST_MAX = 22;
const hist = { rail12v: [], rail5v: [], rail3v: [] };
const pushHist = (k, v) => {
  const a = hist[k];
  a.push(v);
  if (a.length > HIST_MAX) a.shift();
};

let simTimer = null;
let load = 0.12;
const isSimRunning = () => simTimer !== null;
const simLabel = (on) => currentLang === 'es'
  ? (on ? '■ Detener' : '▶ Simular')
  : (on ? '■ Stop' : '▶ Simulate');

const simStep = () => {
  // `load` es la "intensidad de juego": un paseo aleatorio en [0,1]
  // del que dependen casi todas las demás lecturas.
  load = clamp(load + rnd(-0.18, 0.18), 0, 1);
  const g = DATA.gpu, c = DATA.cpu;

  // ---- GPU ----
  g.power = Math.round(clamp(45 + load * 265 + rnd(-8, 8), 20, g.powerLimit));
  g.powerUsagePercent = Math.round(g.power / g.powerLimit * 100);
  g.temp = Math.round(clamp(34 + load * 40 + rnd(-1, 1), 30, 84));
  g.hotspot = Math.round(clamp(g.temp + 8 + load * 6, g.temp, 100));
  g.vramTemp = Math.round(clamp(g.temp + 4 + rnd(-1, 2), 30, 95));
  g.coreClock = Math.round(clamp(900 + load * 1720 + rnd(-40, 40), 300, g.boostCeiling));
  g.voltage = +clamp(0.85 + load * 0.25 + rnd(-0.01, 0.01), 0.8, 1.15).toFixed(3);
  g.vramUsed = +clamp(4.2 + load * 8 + rnd(-0.3, 0.3), 3, g.vramTotal).toFixed(2);
  g.tempMax = Math.max(g.tempMax, g.temp);
  g.coreClockMax = Math.max(g.coreClockMax, g.coreClock);
  g.powerMax = Math.max(g.powerMax, g.power);
  g.voltageMax = Math.max(g.voltageMax, g.voltage);

  // ---- CPU ----
  const cpuLoad = clamp(load * rnd(0.6, 1.1), 0, 1);
  c.usagePercent = Math.round(cpuLoad * 100);
  c.temp = Math.round(clamp(42 + cpuLoad * 45 + rnd(-1, 1), 35, 95));
  c.power = Math.round(clamp(18 + cpuLoad * 72 + rnd(-3, 3), 10, 120));
  c.tempMax = Math.max(c.tempMax, c.temp);
  c.powerMax = Math.max(c.powerMax, c.power);
  for (let i = 0; i < c.cores.length; i++) {
    const active = Math.random() < 0.35 + cpuLoad * 0.5;
    c.cores[i] = Math.round(active ? rnd(3200, 4700 + cpuLoad * 600) : rnd(400, 1600));
  }
  c.chipsetTemp = Math.round(clamp(54 + load * 8 + rnd(-1, 1), 45, 70));
  c.chipsetTempMax = Math.max(c.chipsetTempMax, c.chipsetTemp);

  // ---- RAM ----
  DATA.ram.used = +clamp(DATA.ram.used + rnd(-0.6, 0.6), 12, DATA.ram.total - 2).toFixed(2);
  DATA.ram.stick1.temp = Math.round(clamp(40 + load * 8 + rnd(-1, 1), 35, 60));
  DATA.ram.stick2.temp = Math.round(clamp(42 + load * 8 + rnd(-1, 1), 35, 62));
  DATA.ram.stick1.tempMax = Math.max(DATA.ram.stick1.tempMax, DATA.ram.stick1.temp);
  DATA.ram.stick2.tempMax = Math.max(DATA.ram.stick2.tempMax, DATA.ram.stick2.temp);

  // ---- SSDs ----
  DATA.ssd.forEach((s) => {
    s.temp = Math.round(clamp(s.temp + rnd(-1, 1.4), 32, 70));
    s.tempMax = Math.max(s.tempMax, s.temp);
    s.writePercent = Math.round(clamp(rnd(0, 55) * (0.3 + load), 0, 100));
    s.readPercent = Math.round(clamp(rnd(0, 55) * (0.3 + load), 0, 100));
  });

  // ---- PSU ----
  DATA.psu.temp = Math.round(clamp(42 + load * 10 + rnd(-1, 1), 38, 70));
  DATA.psu.tempMax = Math.max(DATA.psu.tempMax, DATA.psu.temp);

  // ---- Rieles de la fuente (caen un poco cuando sube la carga) ----
  const v12 = clamp(12.0 - load * 0.22 + rnd(-0.03, 0.03), 11.4, 12.6);
  DATA.rail12v.current = +v12.toFixed(3);
  DATA.rail12v.min = +Math.min(DATA.rail12v.min, v12).toFixed(3);
  DATA.rail12v.max = +Math.max(DATA.rail12v.max, v12).toFixed(3);
  const v5 = clamp(5.03 - load * 0.04 + rnd(-0.02, 0.02), 4.75, 5.25);
  DATA.rail5v.current = +v5.toFixed(2);
  DATA.rail5v.min = +Math.min(DATA.rail5v.min, v5).toFixed(2);
  DATA.rail5v.max = +Math.max(DATA.rail5v.max, v5).toFixed(2);
  const v3 = clamp(3.31 - load * 0.02 + rnd(-0.01, 0.01), 3.14, 3.47);
  DATA.rail3v.current = v3.toFixed(2);
  DATA.rail3v.min = Math.min(parseFloat(DATA.rail3v.min), v3).toFixed(3);
  DATA.rail3v.max = Math.max(parseFloat(DATA.rail3v.max), v3).toFixed(2);
  pushHist('rail12v', v12);
  pushHist('rail5v', v5);
  pushHist('rail3v', v3);

  // ---- FPS / frametime ----
  const fps = Math.round(clamp(60 + load * 220 + rnd(-15, 15), 20, 360));
  DATA.perf.fps = fps;
  DATA.perf.frametime = +(1000 / Math.max(fps, 1)).toFixed(1);

  // ---- Reloj real ----
  const now = new Date();
  let h = now.getHours();
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  DATA.perf.clock = `${pad2(h)}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())} ${ap}`;
};

// Dibuja un mini-sparkline dentro de cada .volt-graph a partir del
// historial del riel correspondiente.
const drawGraph = (el, buf) => {
  if (!buf || buf.length < 2) { el.innerHTML = '<span class="tick"></span>'; return; }
  const W = 44, H = 16, pad = 2;
  let mn = Math.min(...buf), mx = Math.max(...buf);
  if (mx - mn < 1e-6) { mn -= 0.01; mx += 0.01; }
  const n = buf.length;
  const pts = buf.map((v, i) => {
    const x = pad + (W - 2 * pad) * (i / (n - 1));
    const y = pad + (H - 2 * pad) * (1 - (v - mn) / (mx - mn));
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  el.innerHTML =
    `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true"` +
    ` style="position:absolute;left:0;top:0">` +
    `<polyline points="${pts}" fill="none" stroke="var(--cyan)" stroke-width="1.2"` +
    ` stroke-linejoin="round" stroke-linecap="round"/></svg>`;
};
const updateGraphs = () => {
  document.querySelectorAll('.volt-graph').forEach((el) => {
    const rail = (el.getAttribute('data-tip-key') || '').replace('Graph', '');
    drawGraph(el, hist[rail]);
  });
};
const resetGraphs = () => {
  document.querySelectorAll('.volt-graph').forEach((el) => {
    el.innerHTML = '<span class="tick"></span>';
  });
};

// Restaura DATA a los valores originales (mutando el objeto, no
// reemplazándolo, así window.OVERLAY_DATA sigue apuntando al mismo).
const restoreData = () => {
  const src = JSON.parse(JSON.stringify(DATA_BASE));
  Object.keys(src).forEach((k) => { DATA[k] = src[k]; });
};

const toggleSim = () => {
  const btn = document.getElementById('btn-sim');
  if (isSimRunning()) {
    clearInterval(simTimer);
    simTimer = null;
    restoreData();
    hist.rail12v.length = hist.rail5v.length = hist.rail3v.length = 0;
    resetGraphs();
    renderOverlay();
    if (btn) { btn.classList.remove('active'); btn.setAttribute('aria-pressed', 'false'); btn.textContent = simLabel(false); }
  } else {
    simTimer = setInterval(() => {
      simStep();
      computeDerived();
      renderValues();
      renderGauges();
      renderTooltips(currentLang);
      updateGraphs();
      refreshOpenTip();
    }, 700);
    if (btn) { btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); btn.textContent = simLabel(true); }
  }
};
window.toggleSim = toggleSim;

/* ----------------------------------------------------------------
   7) Arranque.
   ---------------------------------------------------------------- */
renderTitle();
let savedLang = 'en';
try { savedLang = localStorage.getItem('tipLang') || 'en'; } catch (e) { /* ignore */ }
setLang(savedLang);
fit();
