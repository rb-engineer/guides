/* ================================================================
     0) IDENTIDAD DE LA PÁGINA.
        Un único const: cambiando este valor cambia el <title> del
        navegador y el encabezado <h1> a la vez.
     ================================================================ */
export const APP_TITLE = 'ZAKK: Overlay RTSS DETAILED';

/* ================================================================
     2) TEXTO FIJO DE LA INTERFAZ (ES/EN), aparte de los tooltips.
        Todo lo que ve la barra superior y la leyenda sale de acá.
     ================================================================ */
export const UI_STRINGS = {
  en: {
    intro: 'Hover (or Tab through) any value to see what that sensor measures.',
    langLabel: 'Tooltip language:',
    legendCyanName: 'Cyan',       legendCyanDesc: '= current value',
    legendYellowName: 'Yellow',   legendYellowDesc: '= session maximum',
    legendPinkName: 'Pink',       legendPinkDesc: '= session minimum',
    legendOrangeName: 'Orange',   legendOrangeDesc: '= component name'
  },
  es: {
    intro: 'Pasá el mouse (o navegá con Tab) sobre cualquier valor para ver qué mide ese sensor.',
    langLabel: 'Idioma de tooltips:',
    legendCyanName: 'Cian',       legendCyanDesc: '= valor actual',
    legendYellowName: 'Amarillo', legendYellowDesc: '= máximo de la sesión',
    legendPinkName: 'Rosa',       legendPinkDesc: '= mínimo de la sesión',
    legendOrangeName: 'Naranja',  legendOrangeDesc: '= nombre del componente'
  }
};
