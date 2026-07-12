/* ================================================================
   PUNTO DE ENTRADA. Importa cada módulo y los conecta entre sí.
   Es el único archivo que referencia `window`, salvo por
   `window.OVERLAY_DATA` (definido en data.js por conveniencia).
   ================================================================ */
import { computeDerived } from './data.js';
import {
  renderTitle,
  renderUIStrings,
  renderValues,
  renderGauges,
  renderTooltips
} from './render.js';
import { fit, requestFit } from './layout.js';

/* ----------------------------------------------------------------
   5) IDIOMA: un solo punto de entrada que vuelve a pintar todo.
   ---------------------------------------------------------------- */
const setLang = (lang) => {
  computeDerived();
  renderValues();
  renderGauges();
  renderTooltips(lang);
  renderUIStrings(lang);

  const esBtn = document.getElementById('btn-es');
  const enBtn = document.getElementById('btn-en');
  if (esBtn) esBtn.classList.toggle('active', lang === 'es');
  if (enBtn) enBtn.classList.toggle('active', lang === 'en');

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

/* ----------------------------------------------------------------
   7) Arranque.
   ---------------------------------------------------------------- */
renderTitle();
let savedLang = 'en';
try { savedLang = localStorage.getItem('tipLang') || 'en'; } catch (e) { /* ignore */ }
setLang(savedLang);
fit();
