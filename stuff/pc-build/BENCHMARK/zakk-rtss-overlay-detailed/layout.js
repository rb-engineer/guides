/* ================================================================
     6) Escalado del overlay: diseño fijo de 1200px, se escala como
        un todo para entrar en la pantalla; solo se apila en columna
        por debajo de 700px de ancho.
     ================================================================ */
const DESIGN_W = 1200;
const STACK_BREAKPOINT = 700;
const stage = document.getElementById('stage');
const wrap = document.getElementById('stageWrap');
const root = document.documentElement;

// El tooltip vive fuera del #stage escalado, así que no hereda su
// scale. Para que acompañe el tamaño del overlay (y no se vea chico
// en pantallas grandes/4K) reflejamos el mismo factor en --tip-k,
// acotado para que nunca quede ilegible ni gigante.
const setTipScale = (k) => {
  root.style.setProperty('--tip-k', Math.max(0.9, Math.min(k, 2.6)).toFixed(3));
};

export const fit = () => {
  if (!stage || !wrap) return;

  if (window.innerWidth <= STACK_BREAKPOINT) {
    stage.classList.add('stack');
    stage.style.transform = '';
    stage.style.left = '';
    wrap.style.height = 'auto';
    setTipScale(1);
    return;
  }

  stage.classList.remove('stack');
  stage.style.transform = 'none';
  const designH = stage.offsetHeight;

  const availW = wrap.clientWidth;
  let availH = window.innerHeight - wrap.getBoundingClientRect().top - 12;
  if (availH < 100) availH = 100;

  const scale = Math.min(availW / DESIGN_W, availH / designH);

  stage.style.transform = `scale(${scale})`;
  stage.style.left = `${Math.max(0, (availW - DESIGN_W * scale) / 2)}px`;
  wrap.style.height = `${designH * scale}px`;
  setTipScale(scale);
};

let raf = null;
export const requestFit = () => {
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(fit);
};

window.addEventListener('resize', requestFit);
window.addEventListener('load', fit);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fit).catch(() => {});
}
