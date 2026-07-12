/* ================================================================
     3) TOOLTIPS. Cada clave devuelve texto ES/EN calculado a partir
        de DATA, así que si cambian los valores el texto se ajusta solo.
     ================================================================ */
export const TOOLTIPS = {
  gpuName: {
    es: (d) => `Tu placa de video (GPU): NVIDIA GeForce ${d.gpu.label} con ${d.gpu.vramTotal} GB de VRAM. Todos los datos de este panel son de la GPU.`,
    en: (d) => `Your graphics card (GPU): NVIDIA GeForce ${d.gpu.label} with ${d.gpu.vramTotal} GB of VRAM. Everything in this panel is GPU data.`
  },
  gpuTemp: {
    es: (d) => `Temperatura actual del núcleo de la GPU: ${d.gpu.temp} °C. En juego exigente lo normal es 60–75 °C.`,
    en: (d) => `Current GPU core temperature: ${d.gpu.temp} °C. In demanding games, 60–75 °C is typical.`
  },
  gpuTempMax: {
    es: (d) => `Temperatura máxima que alcanzó la GPU en la sesión: ${d.gpu.tempMax} °C.`,
    en: (d) => `Highest GPU temperature recorded this session: ${d.gpu.tempMax} °C.`
  },
  gpuHotspot: {
    es: (d) => `Hot Spot: temperatura del punto más caliente del chip, ${d.gpu.hotspot} °C. Siempre es mayor que la del núcleo; una diferencia de 8–15 °C es normal.`,
    en: (d) => `Hot Spot: hottest point on the die, ${d.gpu.hotspot} °C. Always higher than the core reading; an 8–15 °C gap is normal.`
  },
  gpuVramTemp: {
    es: (d) => `Temperatura de la memoria VRAM (memory junction): ${d.gpu.vramTemp} °C. La GDDR6X puede operar con seguridad hasta ~95 °C.`,
    en: (d) => `VRAM temperature (memory junction): ${d.gpu.vramTemp} °C. GDDR6X can safely run up to ~95 °C.`
  },
  gpuTempLimit: {
    es: (d) => `Límite térmico (Temp Limit): ${d.gpu.tempLimit} °C, la temperatura a la que la GPU baja frecuencias para protegerse (throttling).`,
    en: (d) => `Temp Limit: ${d.gpu.tempLimit} °C, the temperature at which the GPU lowers clocks to protect itself (throttling).`
  },
  gpuCoreGauge: {
    es: (d) => `Medidor gráfico de la frecuencia del núcleo: ${d.gpu.coreClock} MHz, ≈${d.derived.gpuCoreClockPercent}% de un techo de boost típico (~${d.gpu.boostCeiling} MHz).`,
    en: (d) => `Graphical gauge of the core clock: ${d.gpu.coreClock} MHz, ≈${d.derived.gpuCoreClockPercent}% of a typical boost ceiling (~${d.gpu.boostCeiling} MHz).`
  },
  gpuCoreClock: {
    es: (d) => `Frecuencia actual del núcleo gráfico: ${d.gpu.coreClock} MHz.`,
    en: (d) => `Current GPU core clock: ${d.gpu.coreClock} MHz.`
  },
  gpuCoreClockMax: {
    es: (d) => `Frecuencia máxima del núcleo alcanzada en la sesión: ${d.gpu.coreClockMax} MHz.`,
    en: (d) => `Maximum core clock reached this session: ${d.gpu.coreClockMax} MHz.`
  },
  gpuPowerIcon: {
    es: () => 'Ícono de consumo eléctrico: los valores a la derecha son la potencia de la GPU.',
    en: () => 'Power draw icon: the values to the right are the GPU\'s power consumption.'
  },
  gpuPower: {
    es: (d) => `Consumo eléctrico actual de la placa de video: ${d.gpu.power} W.`,
    en: (d) => `Current power draw of the graphics card: ${d.gpu.power} W.`
  },
  gpuPowerMax: {
    es: (d) => `Consumo máximo registrado en la sesión: ${d.gpu.powerMax} W.`,
    en: (d) => `Maximum power draw recorded this session: ${d.gpu.powerMax} W.`
  },
  gpuPowerUsage: {
    es: (d) => `Porcentaje del límite de potencia (TDP) en uso. El límite de la tarjeta es ${d.gpu.powerLimit} W, así que ${d.gpu.powerUsagePercent}% ≈ ${Math.round(d.gpu.powerLimit * d.gpu.powerUsagePercent / 100)} W.`,
    en: (d) => `Percentage of the power limit (TDP) in use. The card's limit is ${d.gpu.powerLimit} W, so ${d.gpu.powerUsagePercent}% ≈ ${Math.round(d.gpu.powerLimit * d.gpu.powerUsagePercent / 100)} W.`
  },
  gpuVoltage: {
    es: (d) => `Voltaje actual aplicado al núcleo de la GPU: ${d.gpu.voltage.toFixed(3)} V. Sube y baja junto con la frecuencia.`,
    en: (d) => `Current voltage applied to the GPU core: ${d.gpu.voltage.toFixed(3)} V. It scales with clock speed.`
  },
  gpuVoltageMax: {
    es: (d) => `Voltaje máximo del núcleo registrado en la sesión: ${d.gpu.voltageMax.toFixed(3)} V.`,
    en: (d) => `Maximum core voltage recorded this session: ${d.gpu.voltageMax.toFixed(3)} V.`
  },
  gpuVramUsed: {
    es: (d) => `Memoria de video ocupada en este momento: ${d.gpu.vramUsed} GB (texturas, framebuffers, etc.).`,
    en: (d) => `Video memory currently in use: ${d.gpu.vramUsed} GB (textures, framebuffers, etc.).`
  },
  gpuVramTotal: {
    es: (d) => `Total de VRAM de la placa: ${d.gpu.vramTotal} GB.`,
    en: (d) => `Total VRAM on the card: ${d.gpu.vramTotal} GB.`
  },

  cpuName: {
    es: (d) => `Tu procesador (CPU): AMD ${d.cpu.label}, 8 núcleos / 16 hilos, arquitectura Zen 5.`,
    en: (d) => `Your processor (CPU): AMD ${d.cpu.label}, 8 cores / 16 threads, Zen 5 architecture.`
  },
  cpuUsageGauge: {
    es: (d) => `Medidor gráfico del uso del CPU: ${d.cpu.usagePercent}% en este momento.`,
    en: (d) => `Graphical gauge of CPU usage: ${d.cpu.usagePercent}% right now.`
  },
  cpuUsagePercent: {
    es: (d) => `Uso total del procesador, promediando todos los núcleos: ${d.cpu.usagePercent}%.`,
    en: (d) => `Total CPU usage, averaged across all cores: ${d.cpu.usagePercent}%.`
  },
  cpuTemp: {
    es: (d) => `Temperatura actual del procesador (Tctl/Tdie): ${d.cpu.temp} °C. El límite del 9700X es 95 °C.`,
    en: (d) => `Current CPU temperature (Tctl/Tdie): ${d.cpu.temp} °C. The 9700X's limit is 95 °C.`
  },
  cpuTempMax: {
    es: (d) => `Temperatura máxima del CPU registrada en la sesión: ${d.cpu.tempMax} °C.`,
    en: (d) => `Maximum CPU temperature recorded this session: ${d.cpu.tempMax} °C.`
  },
  cpuPowerIcon: {
    es: () => 'Ícono de consumo eléctrico: los valores a la derecha son la potencia del CPU.',
    en: () => 'Power draw icon: the values to the right are the CPU\'s power consumption.'
  },
  cpuPower: {
    es: (d) => `Consumo eléctrico actual del CPU (package power): ${d.cpu.power} W${d.cpu.power > d.cpu.powerLimitStock ? ` (por encima del PPT de fábrica de ${d.cpu.powerLimitStock} W)` : ''}.`,
    en: (d) => `Current CPU power draw (package power): ${d.cpu.power} W${d.cpu.power > d.cpu.powerLimitStock ? ` (above the stock ${d.cpu.powerLimitStock} W PPT)` : ''}.`
  },
  cpuPowerMax: {
    es: (d) => `Consumo máximo del CPU registrado en la sesión: ${d.cpu.powerMax} W.`,
    en: (d) => `Maximum CPU power draw recorded this session: ${d.cpu.powerMax} W.`
  },
  chipsetLabel: {
    es: () => 'Chipset de la placa madre (en AM5: B650/X670/X870). Maneja puertos USB, SATA y líneas PCIe extra.',
    en: () => 'Motherboard chipset (on AM5: B650/X670/X870). It handles USB ports, SATA, and extra PCIe lanes.'
  },
  chipsetTemp: {
    es: (d) => `Temperatura actual del chipset: ${d.cpu.chipsetTemp} °C. Suelen correr calientes (50–65 °C) por tener disipador pasivo.`,
    en: (d) => `Current chipset temperature: ${d.cpu.chipsetTemp} °C. They usually run warm (50–65 °C) since most have a passive heatsink.`
  },
  chipsetTempMax: {
    es: (d) => `Temperatura máxima del chipset en la sesión: ${d.cpu.chipsetTempMax} °C.`,
    en: (d) => `Maximum chipset temperature this session: ${d.cpu.chipsetTempMax} °C.`
  },

  ramName: {
    es: () => 'Memoria RAM del sistema: DDR5 en dos módulos.',
    en: () => 'System RAM: DDR5 across two modules.'
  },
  ramGauge: {
    es: (d) => `Medidor gráfico del uso de RAM: ${d.ram.used} de ${d.ram.total} GB ≈ ${d.derived.ramUsagePercent}% ocupado.`,
    en: (d) => `Graphical gauge of RAM usage: ${d.ram.used} of ${d.ram.total} GB ≈ ${d.derived.ramUsagePercent}% in use.`
  },
  ramSlot1: {
    es: () => 'Módulo de RAM n.º 1 (stick #1): el más alejado del cooler del CPU.',
    en: () => 'RAM module #1 (stick #1): the one farther from the CPU cooler.'
  },
  ramSlot2: {
    es: () => 'Módulo de RAM n.º 2 (stick #2): el más cercano al cooler del CPU, por eso suele reportar una temperatura un poco más alta.',
    en: () => 'RAM module #2 (stick #2): the one closest to the CPU cooler, which is why it usually reads a bit warmer.'
  },
  ram1Temp: {
    es: (d) => `Temperatura actual del módulo de RAM n.º 1: ${d.ram.stick1.temp} °C. Las DDR5 traen sensor propio.`,
    en: (d) => `Current temperature of RAM stick #1: ${d.ram.stick1.temp} °C. DDR5 has a built-in sensor.`
  },
  ram1Max: {
    es: (d) => `Máxima temperatura del módulo 1 en la sesión: ${d.ram.stick1.tempMax} °C.`,
    en: (d) => `Maximum temperature of stick 1 this session: ${d.ram.stick1.tempMax} °C.`
  },
  ram2Temp: {
    es: (d) => `Temperatura actual del módulo de RAM n.º 2: ${d.ram.stick2.temp} °C. Suele estar un poco más caliente por estar más cerca del cooler del CPU.`,
    en: (d) => `Current temperature of RAM stick #2: ${d.ram.stick2.temp} °C. It often runs a bit warmer because it sits closer to the CPU cooler.`
  },
  ram2Max: {
    es: (d) => `Máxima temperatura del módulo 2 en la sesión: ${d.ram.stick2.tempMax} °C.`,
    en: (d) => `Maximum temperature of stick 2 this session: ${d.ram.stick2.tempMax} °C.`
  },
  ramFreq: {
    es: (d) => `Frecuencia efectiva de la memoria: DDR5-${d.ram.freq} (MT/s). El reloj real es la mitad, porque DDR = Double Data Rate.`,
    en: (d) => `Effective memory speed: DDR5-${d.ram.freq} (MT/s). The real clock is half that, because DDR = Double Data Rate.`
  },
  ramUsed: {
    es: (d) => `RAM ocupada en este momento por Windows y los programas abiertos: ${d.ram.used} GB (≈ ${d.derived.ramUsagePercent}%).`,
    en: (d) => `RAM currently used by Windows and open programs: ${d.ram.used} GB (≈ ${d.derived.ramUsagePercent}%).`
  },
  ramTotal: {
    es: (d) => `Total de RAM instalada: ${d.ram.total} GB.`,
    en: (d) => `Total installed RAM: ${d.ram.total} GB.`
  },

  psuLabel: {
    es: () => 'Fuente de alimentación (PSU). Que reporte datos significa que es una fuente digital con monitoreo.',
    en: () => 'Power supply (PSU). Reporting data means it\'s a digital PSU with monitoring.'
  },
  psuTemp: {
    es: (d) => `Temperatura actual de la fuente: ${d.psu.temp} °C. Tomada desde un sensor probe puesto con cinta termica sobre la parte de atrás de la PSU`,
    en: (d) => `Current  PSU temperature: ${d.psu.temp} °C. From a probe sensor taped over the back of the PSU.`
  },
  psuTempMax: {
    es: (d) => `Temperatura máxima de la fuente en la sesión: ${d.psu.tempMax} °C.`,
    en: (d) => `Maximum PSU temperature this session: ${d.psu.tempMax} °C.`
  },

  ssd0Name: {
    es: (d) => `Tu ${d.ssd[0].role === 'primary' ? 'SSD principal' : 'segundo SSD'}: ${d.ssd[0].label.replace('SSD M.2: ', '')}.`,
    en: (d) => `Your ${d.ssd[0].role === 'primary' ? 'main SSD' : 'second SSD'}: ${d.ssd[0].label.replace('SSD M.2: ', '')}.`
  },
  ssd0Temp: {
    es: (d) => `Temperatura actual del disco: ${d.ssd[0].temp} °C. Los NVMe reducen velocidad (throttling) cerca de 70–80 °C.`,
    en: (d) => `Current drive temperature: ${d.ssd[0].temp} °C. NVMe drives throttle around 70–80 °C.`
  },
  ssd0Max: {
    es: (d) => `Temperatura máxima del disco en la sesión: ${d.ssd[0].tempMax} °C.`,
    en: (d) => `Maximum drive temperature this session: ${d.ssd[0].tempMax} °C.`
  },
  ssd0Write: {
    es: (d) => `Medidor de actividad de escritura: ${d.ssd[0].writePercent}% del tiempo escribiendo datos.`,
    en: (d) => `Write activity gauge: ${d.ssd[0].writePercent}% of the time spent writing data.`
  },
  ssd0Read: {
    es: (d) => `Medidor de actividad de lectura: ${d.ssd[0].readPercent}% del tiempo leyendo datos.`,
    en: (d) => `Read activity gauge: ${d.ssd[0].readPercent}% of the time spent reading data.`
  },
  ssd1Name: {
    es: (d) => `Tu ${d.ssd[1].role === 'primary' ? 'SSD principal' : 'segundo SSD'}: ${d.ssd[1].label.replace('SSD M.2: ', '')}.`,
    en: (d) => `Your ${d.ssd[1].role === 'primary' ? 'main SSD' : 'second SSD'}: ${d.ssd[1].label.replace('SSD M.2: ', '')}.`
  },
  ssd1Temp: {
    es: (d) => `Temperatura actual del disco: ${d.ssd[1].temp} °C. Los NVMe reducen velocidad (throttling) cerca de 70–80 °C.`,
    en: (d) => `Current drive temperature: ${d.ssd[1].temp} °C. NVMe drives throttle around 70–80 °C.`
  },
  ssd1Max: {
    es: (d) => `Temperatura máxima del disco en la sesión: ${d.ssd[1].tempMax} °C.`,
    en: (d) => `Maximum drive temperature this session: ${d.ssd[1].tempMax} °C.`
  },
  ssd1Write: {
    es: (d) => `Medidor de actividad de escritura: ${d.ssd[1].writePercent}% del tiempo escribiendo datos.`,
    en: (d) => `Write activity gauge: ${d.ssd[1].writePercent}% of the time spent writing data.`
  },
  ssd1Read: {
    es: (d) => `Medidor de actividad de lectura: ${d.ssd[1].readPercent}% del tiempo leyendo datos.`,
    en: (d) => `Read activity gauge: ${d.ssd[1].readPercent}% of the time spent reading data.`
  },

  rail12vLabel: {
    es: () => 'Línea de +12 V de la fuente: la más importante, alimenta CPU y GPU. Tolerancia ATX: ±5% (11.4–12.6 V).',
    en: () => '+12 V rail of the PSU: the most important one, it powers the CPU and GPU. ATX tolerance: ±5% (11.4–12.6 V).'
  },
  rail12vCurrent: {
    es: (d) => `Voltaje actual de la línea de 12 V: ${d.rail12v.current.toFixed(3)} V.`,
    en: (d) => `Current 12 V rail voltage: ${d.rail12v.current.toFixed(3)} V.`
  },
  rail12vGraph: {
    es: () => 'Mini gráfico de historial: traza cómo varió el voltaje de +12V a lo largo del tiempo. La marca vertical indica el punto donde se registró el valor mínimo de la sesión.',
    en: () => 'Mini history graph: traces how the +12V voltage varied over time. The vertical mark shows where the session\'s minimum value was recorded.'
  },
  rail12vMin: {
    es: (d) => `Voltaje mínimo de la sesión: ${d.rail12v.min.toFixed(3)} V, registrado en el pico de carga.`,
    en: (d) => `Session minimum voltage: ${d.rail12v.min.toFixed(3)} V, recorded at peak load.`
  },
  rail12vMax: {
    es: (d) => `Voltaje máximo de la sesión en la línea de 12 V: ${d.rail12v.max.toFixed(3)} V.`,
    en: (d) => `Session maximum voltage on the 12 V rail: ${d.rail12v.max.toFixed(3)} V.`
  },

  rail5vLabel: {
    es: () => 'Línea de +5 V: alimenta puertos USB, SATA y parte de la placa. Tolerancia ATX: ±5% (4.75–5.25 V).',
    en: () => '+5 V rail: powers USB ports, SATA, and parts of the board. ATX tolerance: ±5% (4.75–5.25 V).'
  },
  rail5vCurrent: {
    es: (d) => `Voltaje actual de la línea de 5 V: ${d.rail5v.current.toFixed(2)} V.`,
    en: (d) => `Current 5 V rail voltage: ${d.rail5v.current.toFixed(2)} V.`
  },
  rail5vGraph: {
    es: () => 'Mini gráfico de historial de la línea de 5 V a lo largo del tiempo.',
    en: () => 'Mini history graph of the 5 V rail over time.'
  },
  rail5vMin: {
    es: (d) => `Voltaje mínimo de la sesión en la línea de 5 V: ${d.rail5v.min.toFixed(2)} V.`,
    en: (d) => `Session minimum voltage on the 5 V rail: ${d.rail5v.min.toFixed(2)} V.`
  },
  rail5vMax: {
    es: (d) => `Voltaje máximo de la sesión en la línea de 5 V: ${d.rail5v.max.toFixed(2)} V.`,
    en: (d) => `Session maximum voltage on the 5 V rail: ${d.rail5v.max.toFixed(2)} V.`
  },

  rail3vLabel: {
    es: () => 'Línea de +3.3 V: alimenta principalmente la placa madre y ranuras M.2. Tolerancia ATX: ±5% (3.14–3.47 V).',
    en: () => '+3.3 V rail: mainly powers the motherboard and M.2 slots. ATX tolerance: ±5% (3.14–3.47 V).'
  },
  rail3vCurrent: {
    es: (d) => `Voltaje actual de la línea de 3.3 V: ${d.rail3v.current} V.`,
    en: (d) => `Current 3.3 V rail voltage: ${d.rail3v.current} V.`
  },
  rail3vGraph: {
    es: () => 'Mini gráfico de historial de la línea de 3.3 V a lo largo del tiempo.',
    en: () => 'Mini history graph of the 3.3 V rail over time.'
  },
  rail3vMin: {
    es: (d) => `Voltaje mínimo de la sesión en la línea de 3.3 V: ${d.rail3v.min} V.`,
    en: (d) => `Session minimum voltage on the 3.3 V rail: ${d.rail3v.min} V.`
  },
  rail3vMax: {
    es: (d) => `Voltaje máximo de la sesión en la línea de 3.3 V: ${d.rail3v.max} V. La cantidad de decimales varía porque así la reporta la fuente.`,
    en: (d) => `Session maximum voltage on the 3.3 V rail: ${d.rail3v.max} V. The decimal precision varies because that's how the PSU reports it.`
  },

  apiLabel: {
    es: (d) => `API gráfica que usa la aplicación monitoreada: ${d.perf.api}.`,
    en: (d) => `Graphics API used by the monitored app: ${d.perf.api}.`
  },
  frametime: {
    es: (d) => `Frametime: cuánto tarda en generarse cada cuadro, ${d.perf.frametime} ms.${d.perf.frametime > 50 ? ' Es muy alto: señal de un stutter (carga, compilación de shaders, o un cuelgue puntual del motor).' : ' Un frametime estable importa más que el número de FPS.'}`,
    en: (d) => `Frametime: how long each frame takes to render, ${d.perf.frametime} ms.${d.perf.frametime > 50 ? ' That\'s very high: a sign of a stutter (loading, shader compilation, or a momentary engine hitch).' : ' A stable frametime matters more than the FPS number.'}`
  },
  fpsValue: {
    es: (d) => {
      const gpuLow = d.gpu.powerUsagePercent < 40;
      const cpuLow = d.cpu.usagePercent < 40;
      let verdict;
      if (gpuLow && cpuLow) verdict = 'ninguno está saturado, así que el cuello de botella es otra cosa (carga de disco, compilación de shaders, o un cuelgue puntual del motor)';
      else if (!gpuLow && cpuLow) verdict = 'esto pinta como un escenario limitado por GPU (GPU bound)';
      else if (gpuLow && !cpuLow) verdict = 'esto pinta como un escenario limitado por CPU (CPU bound): el procesador no llega a alimentar más rápido a la GPU';
      else verdict = 'tanto la GPU como el CPU están trabajando fuerte acá';
      return `Cuadros por segundo que renderiza la aplicación: ${d.perf.fps} FPS. Con la GPU al ${d.gpu.powerUsagePercent}% de potencia y el CPU al ${d.cpu.usagePercent}% de uso, ${verdict}.`;
    },
    en: (d) => {
      const gpuLow = d.gpu.powerUsagePercent < 40;
      const cpuLow = d.cpu.usagePercent < 40;
      let verdict;
      if (gpuLow && cpuLow) verdict = 'neither is saturated, so the bottleneck is something else (disk loading, shader compilation, or a momentary engine hitch)';
      else if (!gpuLow && cpuLow) verdict = 'this looks GPU-bound';
      else if (gpuLow && !cpuLow) verdict = 'this looks CPU-bound: the processor can\'t feed the GPU any faster';
      else verdict = 'both the GPU and CPU are working hard here';
      return `Frames per second the app is rendering: ${d.perf.fps} FPS. With the GPU at ${d.gpu.powerUsagePercent}% power and the CPU at ${d.cpu.usagePercent}% usage, ${verdict}.`;
    }
  },
  refreshHz: {
    es: (d) => `Frecuencia de actualización del monitor: ${d.perf.refreshHz} Hz. Con ${d.perf.fps} FPS estás ${d.perf.fps < d.perf.refreshHz ? 'lejos del tope del monitor' : 'en o por encima del tope del monitor'} en esta escena.`,
    en: (d) => `Monitor refresh rate: ${d.perf.refreshHz} Hz. At ${d.perf.fps} FPS you're ${d.perf.fps < d.perf.refreshHz ? 'well below the monitor\'s ceiling' : 'at or above the monitor\'s ceiling'} in this scene.`
  },
  clock: {
    es: () => 'Hora actual del sistema. Útil para saber cuánto llevás jugando de un vistazo.',
    en: () => 'Current system time. Handy for keeping track of how long you\'ve been playing.'
  }
};

// Las 8 frecuencias de núcleo comparten la misma plantilla de tooltip;
// se generan en un loop. Ojo: usamos `let i` (no `var i`) a propósito:
// con `let`, cada vuelta del for crea una ligadura nueva de `i`, así que
// cada arrow function de abajo "recuerda" su propio número de núcleo.
// Con `var` todas las funciones terminarían compartiendo el mismo `i`
// final (el clásico bug de closures en loops) y las 8 tooltips dirían
// "núcleo 9". Este es el motivo real para preferir let sobre var.
for (let i = 1; i <= 8; i++) {
  TOOLTIPS[`cpuCore${i}`] = {
    es: (d) => `Frecuencia del núcleo ${i}: ${d.cpu.cores[i - 1]} MHz.`,
    en: (d) => `Core ${i} clock speed: ${d.cpu.cores[i - 1]} MHz.`
  };
}
