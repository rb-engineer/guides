/* ================================================================
     1) DATOS. Editar acá para reflejar una captura nueva del overlay.
        Todo lo demás (texto, gauges, tooltips) se recalcula solo.
        Es un const porque el OBJETO nunca se reemplaza — solo se
        mutan sus propiedades (por eso computeDerived() puede seguir
        escribiendo en DATA.derived más abajo sin problema).
     ================================================================ */
export const DATA = {
  gpu: {
    label: 'RTX 4080 SUPER',
    temp: 34, tempMax: 38, hotspot: 42, vramTemp: 43, tempLimit: 84,
    coreClock: 915, coreClockMax: 2610,
    boostCeiling: 2900,        // referencia para el gauge de reloj (no se muestra)
    power: 50, powerMax: 139, powerLimit: 320, powerUsagePercent: 21,
    voltage: 0.960, voltageMax: 0.960,
    vramUsed: 4.77, vramTotal: 15.99
  },
  cpu: {
    label: 'R7 9700X',
    usagePercent: 10,
    temp: 56, tempMax: 67,
    power: 33, powerMax: 75, powerLimitStock: 88,
    cores: [2365, 1727, 280, 469, 820, 416, 195, 202],
    chipsetTemp: 56, chipsetTempMax: 57
  },
  ram: {
    stick1: { temp: 43, tempMax: 43 },
    stick2: { temp: 45, tempMax: 45 },
    freq: 5800,
    used: 25.14, total: 64
  },
  psu: { temp: 44, tempMax: 45 },
  ssd: [
    { label: 'SSD M.2: 970 EVO+', role: 'secondary', temp: 34, tempMax: 35, writePercent: 3, readPercent: 1 },
    { label: 'SSD M.2: 990 PRO',  role: 'primary',   temp: 36, tempMax: 37, writePercent: 4, readPercent: 2 }
  ],
  rail12v: { current: 11.884, min: 11.788, max: 11.884 },
  rail5v: { current: 5.02, min: 5.02, max: 5.06 },
  // La fuente reporta estos con una cantidad de decimales inconsistente
  // (típico de RTSS); se guardan como texto para reproducirlo tal cual.
  rail3v: { current: '3.31', min: '3.296', max: '3.312000' },
  perf: {
    api: 'OGL',
    frametime: 999.6,
    fps: 1,
    refreshHz: 140,
    clock: '05:09:13 PM'
  }
};
// Expuesto por si se quiere inspeccionar / actualizar desde la consola.
window.OVERLAY_DATA = DATA;

// Valores calculados a partir de DATA (porcentajes de gauge, etc).
// Se recalculan en cada render, así que si cambiás DATA siempre quedan al día.
export const computeDerived = () => {
  DATA.derived = {
    gpuCoreClockPercent: Math.max(0, Math.min(100, Math.round(DATA.gpu.coreClock / DATA.gpu.boostCeiling * 100))),
    ramUsagePercent: Math.round(DATA.ram.used / DATA.ram.total * 100)
  };
};
