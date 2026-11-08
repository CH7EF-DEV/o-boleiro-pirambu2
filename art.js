/* O Boleiro — ilustrações dos itens sem foto.
   Mesma mão do mascote: contorno de tinta, cor chapada. */
(() => {
  'use strict';
  const INK = '#2A1210';
  const CREAM = '#FFF6EE';
  const shadow = (cx = 60, cy = 101, rx = 29, ry = 5) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${INK}" opacity=".09"/>`;

  const JUICE = {
    amarelo: { liq: '#FFC53D', fruit: '#FFC53D', seg: '#E0952B' },
    vermelho: { liq: '#E2453C', fruit: '#E2453C', seg: '#B9242E' },
    branco: { liq: '#F6E6C4', fruit: '#7CB86B', seg: '#4E8A45' },
    laranja: { liq: '#F4572B', fruit: '#F4572B', seg: '#C23C18' }
  };
  const SODA = { verde: '#3FB97A', vermelho: '#D6431A' };

  const ART = {
    pao: () => `${shadow()}
      <path d="M22 73c0-21 17-35 38-35s38 14 38 35c0 9-8 15-19 15H41c-11 0-19-6-19-15Z" fill="#F2B269" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M30 62c9-6 19-8 30-8s21 2 30 8" fill="none" stroke="#FFE2BC" stroke-width="3" stroke-linecap="round"/>
      <path d="M26 75c10-5 22-8 34-8s24 3 34 8" fill="none" stroke="#FFE2BC" stroke-width="3" stroke-linecap="round"/>
      <path d="M43 49l6 4M54 44l6 5M66 44l6 5M77 49l5 4M49 57l7 3M63 54l7 3M72 58l6 3" stroke="${CREAM}" stroke-width="3.2" stroke-linecap="round"/>`,

    torrada: () => `${shadow(62)}
      <g transform="rotate(-9 51 55)">
        <rect x="22" y="30" width="54" height="46" rx="10" fill="#E8AE68" stroke="${INK}" stroke-width="3"/>
        <rect x="29" y="37" width="40" height="32" rx="6" fill="#FFE0B0" stroke="${INK}" stroke-width="2.2"/>
      </g>
      <g transform="rotate(8 66 71)">
        <rect x="38" y="47" width="56" height="49" rx="11" fill="#F4C68A" stroke="${INK}" stroke-width="3"/>
        <rect x="45" y="54" width="42" height="35" rx="7" fill="#FFE7C2" stroke="${INK}" stroke-width="2.2"/>
        <rect x="55" y="61" width="22" height="19" rx="5" fill="#FFC53D" stroke="${INK}" stroke-width="2.6"/>
        <path d="M60 61v19" stroke="#E0952B" stroke-width="2"/>
        <path d="M49 60c2-2 5-3 8-3" stroke="${CREAM}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      </g>`,

    beliscao: () => `${shadow(60, 99, 31)}
      <path d="M27 79c0-25 15-43 33-43s33 18 33 43c0 6-4 9-10 9H37c-6 0-10-3-10-9Z" fill="#F2B76C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M48 61l7 7M58 57l7 7M68 61l7 7" stroke="#C0323F" stroke-width="5" stroke-linecap="round"/>
      <path d="M34 71c3-9 8-15 15-19" fill="none" stroke="#FFE2BC" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 88v5M40 88v5M48 88v5M56 88v5M64 88v5M72 88v5M80 88v5" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="46" cy="52" r="1.6" fill="${CREAM}"/>
      <circle cx="61" cy="44" r="1.6" fill="${CREAM}"/>
      <circle cx="75" cy="53" r="1.6" fill="${CREAM}"/>`,

    casadinho: () => `${shadow(60, 103, 29, 4)}
      <path d="M31 74h58v13c0 6-6 9-29 9s-29-3-29-9Z" fill="#F2C285" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M33 66h54v8c0 4-5 7-27 7s-27-3-27-7Z" fill="#E21E7B" stroke="${INK}" stroke-width="2.6"/>
      <path d="M33 66c0-11 12-18 27-18s27 7 27 18Z" fill="#F6CE96" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M41 60c3-4 9-7 16-8" fill="none" stroke="#FFE7C2" stroke-width="3" stroke-linecap="round"/>
      <circle cx="48" cy="73" r="1.4" fill="${CREAM}"/>
      <circle cx="60" cy="72" r="1.4" fill="${CREAM}"/>
      <circle cx="72" cy="73" r="1.4" fill="${CREAM}"/>`,

    suco: (p) => {
      const t = JUICE[p.tone] || JUICE.laranja;
      return `${shadow(58, 104, 24, 4.5)}
      <path d="M76 12 63 52" stroke="#E21E7B" stroke-width="7" stroke-linecap="round"/>
      <path d="M76 12 63 52" stroke="${CREAM}" stroke-width="2" stroke-dasharray="4 8" stroke-linecap="round" opacity=".7"/>
      <path d="M40 24h40l-5 68c-.3 4.4-3.8 7-8.6 7H53.6c-4.8 0-8.3-2.6-8.6-7Z" fill="#FFFFFF" fill-opacity=".4" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M45 42h30l-3.8 49c-.3 3.6-3 5.8-6.6 5.8H55.4c-3.6 0-6.3-2.2-6.6-5.8Z" fill="${t.liq}"/>
      <ellipse cx="60" cy="42" rx="15" ry="4" fill="${t.liq}" stroke="${INK}" stroke-width="2.4"/>
      <g transform="rotate(-14 53 52)"><rect x="47" y="46" width="12" height="12" rx="3" fill="${CREAM}" fill-opacity=".55" stroke="${INK}" stroke-opacity=".2" stroke-width="1.6"/></g>
      <g transform="rotate(10 66 60)"><rect x="60" y="54" width="11" height="11" rx="3" fill="${CREAM}" fill-opacity=".45" stroke="${INK}" stroke-opacity=".2" stroke-width="1.4"/></g>
      <path d="M48 36l3 44" stroke="${CREAM}" stroke-width="3" opacity=".5" stroke-linecap="round"/>
      <g transform="rotate(-12 39 27)">
        <circle cx="39" cy="27" r="11" fill="${t.fruit}" stroke="${INK}" stroke-width="2.8"/>
        <path d="M39 16v22M28 27h22" stroke="${t.seg}" stroke-width="2.2"/>
        <circle cx="39" cy="27" r="3" fill="${CREAM}" stroke="${t.seg}" stroke-width="1.6"/>
      </g>
      <circle cx="57" cy="62" r="2" fill="${CREAM}" opacity=".65"/>
      <circle cx="64" cy="72" r="1.5" fill="${CREAM}" opacity=".55"/>
      <circle cx="55" cy="80" r="1.3" fill="${CREAM}" opacity=".5"/>`;
    },

    garrafa: (p) => {
      const tone = SODA[p.tone] || SODA.verde;
      return `${shadow(60, 104, 24, 4.5)}
      <rect x="52" y="11" width="16" height="12" rx="3.5" fill="#6B57CE" stroke="${INK}" stroke-width="2.6"/>
      <path d="M54 23h12v11c0 3.4 14 7.4 14 22v37c0 5-3.4 8-8 8H48c-4.6 0-8-3-8-8V56c0-14.6 14-18.6 14-22Z" fill="${tone}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M46 62c0-7 2-12 5-16" stroke="${CREAM}" stroke-width="3" opacity=".45" stroke-linecap="round" fill="none"/>
      <circle cx="47" cy="47" r="2.2" fill="${CREAM}" opacity=".45"/>
      <rect x="42" y="64" width="36" height="24" rx="4" fill="${CREAM}" stroke="${INK}" stroke-width="2.6"/>
      <rect x="48" y="71" width="24" height="4" rx="2" fill="#F4572B"/>
      <rect x="51" y="79" width="18" height="3" rx="1.5" fill="#6B57CE"/>`;
    },

    agua: () => `${shadow(60, 104, 24, 4.5)}
      <rect x="52" y="11" width="16" height="12" rx="3.5" fill="#6B57CE" stroke="${INK}" stroke-width="2.6"/>
      <path d="M54 23h12v11c0 3.4 14 7.4 14 22v37c0 5-3.4 8-8 8H48c-4.6 0-8-3-8-8V56c0-14.6 14-18.6 14-22Z" fill="#F1EDFB" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M41 56c6 3 12-2 19 0s12-3 19 0v33c0 4-3 6.5-7 6.5H48c-4 0-7-2.5-7-6.5Z" fill="#CFC5F2"/>
      <circle cx="49" cy="62" r="2.2" fill="${CREAM}" opacity=".8"/>
      <circle cx="66" cy="59" r="1.5" fill="${CREAM}" opacity=".75"/>
      <circle cx="57" cy="66" r="1.3" fill="${CREAM}" opacity=".7"/>
      <rect x="44" y="71" width="32" height="20" rx="4" fill="${CREAM}" stroke="${INK}" stroke-width="2.6"/>
      <path d="M52 76c-2.6 3-4 5-4 7a4 4 0 0 0 8 0c0-2-1.4-4-4-7Z" fill="#6B57CE" stroke="${INK}" stroke-width="2"/>
      <rect x="60" y="78" width="10" height="2.6" rx="1.3" fill="#F4572B"/>
      <rect x="60" y="83" width="7" height="2.6" rx="1.3" fill="#6B57CE"/>`,

    esfirra: () => `${shadow(60, 103, 30)}
      <rect x="33" y="33" width="54" height="54" rx="10" transform="rotate(45 60 60)" fill="#F2C285" stroke="${INK}" stroke-width="3"/>
      <circle cx="60" cy="60" r="22" fill="#A8432C" stroke="${INK}" stroke-width="2.8"/>
      <path d="M49 54l6-2M62 49l6 2M69 60l6-1M55 66l6 2M64 68l5-2" stroke="#7E2F1E" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="57" cy="60" r="1.6" fill="#FFE0C2"/>
      <circle cx="65" cy="56" r="1.5" fill="#FFE0C2"/>
      <path d="M52 61c1.5 2 2 3.5 2 5" stroke="#5A9A4E" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      <path d="M66 63c1.5 1.5 2 3 2 4.5" stroke="#5A9A4E" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      <path d="M60 24v10M96 60H86M60 96V86M24 60h10" stroke="#D98A3F" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M38 44l8-8" stroke="#FFE2BC" stroke-width="3" stroke-linecap="round"/>`,

    coxinha: () => `${shadow(60, 94, 26)}
      <path d="M60 22c7 11 20 27 20 46a20 20 0 0 1-40 0c0-19 13-35 20-46Z" fill="#F0A85C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="50" cy="56" r="2" fill="#D98A3F"/>
      <circle cx="67" cy="61" r="1.8" fill="#D98A3F"/>
      <circle cx="55" cy="74" r="2" fill="#D98A3F"/>
      <circle cx="68" cy="78" r="1.6" fill="#D98A3F"/>
      <circle cx="47" cy="86" r="1.6" fill="#D98A3F"/>
      <circle cx="58" cy="64" r="1.4" fill="#FFE0B0"/>
      <circle cx="62" cy="84" r="1.4" fill="#FFE0B0"/>
      <path d="M49 62c1-7 5-13 9-18" stroke="#FFD9A8" stroke-width="3.4" stroke-linecap="round" fill="none"/>`,

    'bolo-indiano': () => `${shadow(60, 104, 34, 5)}
      <ellipse cx="60" cy="96" rx="33" ry="6" fill="#F2C285" stroke="${INK}" stroke-width="2.6"/>
      <path d="M38 54h44v34c0 6-4.5 9-11 9H49c-6.5 0-11-3-11-9Z" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>
      <path d="M38 68h44M38 81h44" stroke="#E2A868" stroke-width="2.4"/>
      <path d="M44 74h3M52 62h3M66 74h3M74 66h3M50 88h3M70 88h3" stroke="#F2D7B4" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="42" cy="60" r="4.5" fill="${CREAM}" stroke="${INK}" stroke-width="2.2"/>
      <circle cx="52" cy="60" r="4.5" fill="${CREAM}" stroke="${INK}" stroke-width="2.2"/>
      <circle cx="68" cy="60" r="4.5" fill="${CREAM}" stroke="${INK}" stroke-width="2.2"/>
      <circle cx="78" cy="60" r="4.5" fill="${CREAM}" stroke="${INK}" stroke-width="2.2"/>
      <ellipse cx="60" cy="54" rx="23" ry="10" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>
      <rect x="52" y="47" width="3.5" height="8" rx="1.75" fill="#E21E7B" transform="rotate(24 54 51)"/>
      <rect x="64" y="46" width="3.5" height="8" rx="1.75" fill="#6B57CE" transform="rotate(-18 66 50)"/>
      <rect x="58" y="53" width="3.5" height="7" rx="1.75" fill="#FFC53D" transform="rotate(70 60 56)"/>
      <rect x="69" y="53" width="3" height="7" rx="1.5" fill="#F4572B" transform="rotate(-60 70 56)"/>`,

    'mini-bolo': () => `${shadow(60, 106, 27, 4.5)}
      <ellipse cx="60" cy="97" rx="30" ry="6" fill="${CREAM}" stroke="${INK}" stroke-width="2.6"/>
      <path d="M37 62h46v22c0 6-4.5 9-11 9H48c-6.5 0-11-3-11-9Z" fill="#F2C285" stroke="${INK}" stroke-width="3"/>
      <path d="M37 76h46" stroke="#E2A868" stroke-width="2.4"/>
      <path d="M36 63c0-14 11-23 24-23s24 9 24 23Z" fill="#FFC53D" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M43 62c0 5 1 7 3 7s3-2 3-7" fill="#FFC53D" stroke="${INK}" stroke-width="2.4"/>
      <path d="M57 62c0 7 1 9 3 9s3-2 3-9" fill="#FFC53D" stroke="${INK}" stroke-width="2.4"/>
      <path d="M71 62c0 5 1 6 2.6 6s2.6-1 2.6-6" fill="#FFC53D" stroke="${INK}" stroke-width="2.4"/>
      <ellipse cx="51" cy="53" rx="1.5" ry="2.5" fill="#8A6516" transform="rotate(-22 51 53)"/>
      <ellipse cx="60" cy="49" rx="1.5" ry="2.5" fill="#8A6516" transform="rotate(18 60 49)"/>
      <ellipse cx="68" cy="54" rx="1.4" ry="2.3" fill="#8A6516" transform="rotate(-14 68 54)"/>
      <path d="M43 57c1-5 3-9 6-12" stroke="${CREAM}" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".8"/>`
  };

  window.boleiroArt = (p) => {
    const fn = ART[p.art];
    if (!fn) return '';
    return `<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">${fn(p)}</svg>`;
  };
})();
