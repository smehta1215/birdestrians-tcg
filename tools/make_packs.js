// Draws the three booster-pack wrappers as SVG and renders them to packs/*.webp (1200 x 2080, 2x of 600 x 1040).
// Run from the repo root: node tools/make_packs.js   (needs Playwright + Chromium and ImageMagick's `convert`)
// The tear line sits in the white stripe at y = 158-167 (config tearLine 0.158).
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const { chromium } = require('playwright');
const OUT = path.join(__dirname, '..', 'packs');
const W = 600, H = 1040;
const LOGO = "'Inter Display','Inter',Arial,sans-serif";

// ------------------------------------------------------------------ shared pieces
const teeth = (y0, y1) => { const p = []; for (let i = 0, x = 0; x <= W; i++, x += 15) p.push(`${x},${i % 2 ? y1 : y0}`); return p.join(' '); };
const ridges = (y0, y1) => { let s = ''; for (let x = 4; x < W; x += 9) s += `<line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}"/>`; return s; };
const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
function sparkles(n, color = '#fff', area = [20, 190, 560, 560], max = 1.6) {
  let s = ''; for (let i = 0; i < n; i++) {
    const x = area[0] + rnd() * area[2], y = area[1] + rnd() * area[3], k = 0.4 + rnd() * max;
    s += `<path transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${k.toFixed(2)})" d="M0 -12 L2.6 -2.6 L12 0 L2.6 2.6 L0 12 L-2.6 2.6 L-12 0 L-2.6 -2.6 Z" fill="${color}"/>`;
  } return s;
}
function bird({ body, belly, wing, beak = '#ff9f1c', hat = '', flap = false }) {
  const w = flap
    ? `<path d="M70 100 C 40 40, 70 10, 112 30 C 104 60, 98 86, 100 108 Z" fill="${wing}"/>`
    : `<path d="M60 106 C 68 80, 106 86, 106 116 C 100 142, 72 142, 56 128 Z" fill="${wing}"/>`;
  return `<g stroke="${beak}" stroke-width="7" stroke-linecap="round" fill="none">${flap ? '<path d="M88 160 L76 182 M76 182 L64 184 M76 182 L80 192"/><path d="M112 160 L104 184 M104 184 L92 188 M104 184 L108 194"/>'
      : '<path d="M88 158 L80 188 M80 188 L66 190 M80 188 L86 198"/><path d="M114 158 L128 184 M128 184 L142 184 M128 184 L136 194"/>'}</g>
    <path d="M46 104 L6 86 L18 112 L2 128 L46 134 Z" fill="${wing}"/>
    <ellipse cx="100" cy="110" rx="62" ry="58" fill="${body}"/><ellipse cx="114" cy="128" rx="40" ry="35" fill="${belly}"/>${w}
    <circle cx="124" cy="86" r="13" fill="#fff"/><circle cx="128" cy="87" r="7.5" fill="#1d1d2b"/><circle cx="130.5" cy="84" r="2.6" fill="#fff"/>
    <ellipse cx="138" cy="106" rx="9" ry="5.5" fill="#ff7aa2" opacity=".55"/><path d="M154 88 L186 99 L154 110 Z" fill="${beak}"/>${hat}`;
}
// Frame shared by every pack: crimped top and bottom, header with the wordmark, tear stripes, art window, bottom band.
function frame({ dark, mid, accent, ridge, headerExtra = '', art, logo, band, bandText = '#fff', defs = '' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <linearGradient id="hdr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dark}"/><stop offset="1" stop-color="${mid}"/></linearGradient>
  <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <clipPath id="artclip"><rect x="0" y="176" width="${W}" height="768"/></clipPath>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="drop" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity=".35"/></filter>
  ${defs}
</defs>
<polygon points="0,14 ${teeth(0, 14)} ${W},44 0,44" fill="${ridge}"/>
<g stroke="#fff" stroke-opacity=".22" stroke-width="3">${ridges(0, 44)}</g>
<rect x="0" y="44" width="${W}" height="114" fill="url(#hdr)"/>
${headerExtra}
<text x="300" y="114" text-anchor="middle" font-family="${LOGO}" font-weight="900" font-size="58" letter-spacing="1" fill="#fff"
  stroke="${accent}" stroke-width="11" paint-order="stroke" stroke-linejoin="round" filter="url(#drop)">BIRDESTRIANS</text>
<rect x="190" y="125" width="220" height="26" rx="13" fill="${accent}"/>
<text x="300" y="144" text-anchor="middle" font-family="${LOGO}" font-weight="800" font-size="15" letter-spacing="3" fill="#fff">TRADING CARD GAME</text>
<rect x="0" y="158" width="${W}" height="9" fill="#fff"/><rect x="0" y="167" width="${W}" height="9" fill="${accent}"/>
<g clip-path="url(#artclip)">${art}</g>
${logo}
<rect x="0" y="944" width="${W}" height="52" fill="${band}"/>
<rect x="0" y="940" width="${W}" height="5" fill="${accent}"/>
<text x="300" y="978" text-anchor="middle" font-family="${LOGO}" font-weight="800" font-size="19" letter-spacing="6" fill="${bandText}">BOOSTER PACK</text>
<polygon points="0,996 ${W},996 ${W},1026 ${teeth(1040, 1026).split(' ').reverse().join(' ')} 0,1026" fill="${ridge}"/>
<g stroke="#fff" stroke-opacity=".22" stroke-width="3">${ridges(996, 1040)}</g>
<rect x="0" y="0" width="${W}" height="${H}" fill="url(#foil)"/>
</svg>`;
}

// ------------------------------------------------------------------ 1. Celebrations: 29th Birthday Edition
function celebrations() {
  const balloons = [[90, 300, '#ff7aa8'], [168, 240, '#4fd1c5'], [455, 250, '#b58cff'], [525, 330, '#ffd34f'], [60, 430, '#ff9f43']]
    .map(([x, y, c]) => `<path d="M${x} ${y + 52} C ${x - 14} ${y + 120}, ${x + 18} ${y + 160}, ${x + 4} ${y + 230}" stroke="#ffffffcc" stroke-width="2.5" fill="none"/>
      <ellipse cx="${x}" cy="${y}" rx="40" ry="50" fill="${c}"/><ellipse cx="${x - 13}" cy="${y - 18}" rx="9" ry="15" fill="#fff" opacity=".55"/>
      <path d="M${x - 7} ${y + 49} L${x + 7} ${y + 49} L${x} ${y + 58} Z" fill="${c}"/>`).join('');
  let confetti = ''; const cc = ['#ff5c93', '#ffd34f', '#4fe0bd', '#5cc7ff', '#b98bff', '#ff9f43'];
  for (let i = 0; i < 46; i++) confetti += `<rect x="${(rnd() * 580).toFixed(0)}" y="${(190 + rnd() * 560).toFixed(0)}" width="${(6 + rnd() * 8).toFixed(0)}" height="${(4 + rnd() * 5).toFixed(0)}" rx="1.5" fill="${cc[i % 6]}" transform="rotate(${(rnd() * 180).toFixed(0)})" transform-origin="center" opacity=".9"/>`;
  const drip = (x0, x1, y) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += 26) d += ` q 6 ${18 + (x % 3) * 6} 13 0 q 6 -${8} 13 0`; return `<path d="${d} L${x1} ${y - 16} L${x0} ${y - 16} Z" fill="#ff8fb8"/>`; };
  const candle = (x, digit) => `<g transform="translate(${x} 22)">
      <path d="M0 398 C -12 380, -4 366, 0 356 C 4 366, 12 380, 0 398 Z" fill="#ffd34f"/><path d="M0 396 C -6 386, -2 378, 0 372 C 2 378, 6 386, 0 396 Z" fill="#fff6c8"/>
      <circle cx="0" cy="380" r="26" fill="#ffd34f" opacity=".35" filter="url(#glow)"/>
      <text x="0" y="478" text-anchor="middle" font-family="${LOGO}" font-weight="900" font-size="86" fill="#7fd6ff" stroke="#1f6fa8" stroke-width="7" paint-order="stroke">${digit}</text></g>`;
  const art = `
    <rect x="0" y="176" width="${W}" height="768" fill="url(#cbg)"/>
    ${[...Array(9)].map((_, i) => `<polygon points="${-80 + i * 90},176 ${-20 + i * 90},176 ${140 + i * 90},944 ${80 + i * 90},944" fill="#fff" opacity="${i % 2 ? .18 : .1}"/>`).join('')}
    ${[...Array(14)].map(() => `<circle cx="${(rnd() * 600).toFixed(0)}" cy="${(190 + rnd() * 520).toFixed(0)}" r="${(8 + rnd() * 26).toFixed(0)}" fill="#fff" opacity=".22"/>`).join('')}
    ${balloons}${confetti}
    <ellipse cx="300" cy="716" rx="200" ry="26" fill="#c9962e"/><ellipse cx="300" cy="708" rx="190" ry="22" fill="#ffe9a8"/>
    <rect x="160" y="590" width="280" height="118" rx="14" fill="#fff4f8"/>${drip(160, 440, 608)}
    <rect x="160" y="664" width="280" height="14" fill="#b58cff" opacity=".7"/>
    <rect x="205" y="500" width="190" height="96" rx="12" fill="#fff4f8"/>${drip(205, 395, 516)}
    ${[...Array(6)].map((_, i) => `<circle cx="${186 + i * 46}" cy="640" r="7" fill="${cc[i]}"/>`).join('')}
    ${[...Array(4)].map((_, i) => `<circle cx="${228 + i * 48}" cy="552" r="6" fill="${cc[i + 2]}"/>`).join('')}
    ${candle(262, '2')}${candle(338, '9')}
    <g transform="translate(468 600) scale(.92) translate(-100 -110)">${bird({ body: '#ffcf3f', belly: '#fff3c4', wing: '#f2a900',
      hat: '<path d="M78 58 L100 0 L122 58 Z" fill="#ff5c93"/><path d="M84 42 L116 42 M90 26 L110 26" stroke="#fff" stroke-width="5"/><circle cx="100" cy="0" r="9" fill="#4fd1c5"/>' })}</g>
    ${sparkles(10, '#fff', [20, 190, 560, 480])}`;
  const logo = `
    <g filter="url(#drop)">
      <path d="M36 806 L70 772 L530 772 L564 806 L536 906 L64 906 Z" fill="#4a2a0a" stroke="url(#gold)" stroke-width="8" stroke-linejoin="round"/>
      <text x="268" y="828" text-anchor="middle" font-family="${LOGO}" font-weight="900" font-size="170" letter-spacing="-6" fill="url(#gold)" stroke="#3b1f05" stroke-width="12" paint-order="stroke" stroke-linejoin="round">29</text>
      <text x="398" y="824" font-family="${LOGO}" font-weight="900" font-size="54" fill="url(#gold)" stroke="#3b1f05" stroke-width="8" paint-order="stroke">th</text>
      <text x="300" y="884" text-anchor="middle" font-family="${LOGO}" font-weight="900" font-size="54" letter-spacing="2" fill="url(#gold)" stroke="#3b1f05" stroke-width="8" paint-order="stroke">CELEBRATIONS</text>
    </g>
    <path d="M150 904 L450 904 L436 922 L450 940 L150 940 L164 922 Z" fill="#ff5c93"/>
    <text x="300" y="929" text-anchor="middle" font-family="${LOGO}" font-weight="800" font-size="19" letter-spacing="3" fill="#fff">BIRTHDAY EDITION</text>`;
  return frame({ dark: '#2e1804', mid: '#6b4211', accent: '#c9962e', ridge: '#8a5a1c', band: 'url(#goldband)', bandText: '#3b1f05', art, logo,
    defs: `<linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7d9ff"/><stop offset=".45" stop-color="#d6f0ff"/><stop offset="1" stop-color="#fff1bf"/></linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8"/><stop offset=".45" stop-color="#ffd34f"/><stop offset=".55" stop-color="#e0a92a"/><stop offset="1" stop-color="#fff0a8"/></linearGradient>
      <linearGradient id="goldband" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9962e"/><stop offset=".5" stop-color="#ffe9a8"/><stop offset="1" stop-color="#c9962e"/></linearGradient>` });
}

// ------------------------------------------------------------------ 2. Violet & Yellow: Coalescence
function coalescence() {
  const ribbon = (phase, color, width) => { let d = ''; for (let i = 0; i <= 60; i++) { const t = i / 60;
      const x = 640 - t * 700, y = 190 + t * 620, o = Math.sin(t * Math.PI * 5 + phase) * 46;
      d += `${i ? 'L' : 'M'}${(x + o * 0.6).toFixed(1)} ${(y + o).toFixed(1)} `; }
    return `<path d="${d}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round"/>`; };
  const orb = (x, y, c1, c2) => `<circle cx="${x}" cy="${y}" r="92" fill="${c1}" opacity=".45" filter="url(#glow)"/>
    <circle cx="${x}" cy="${y}" r="62" fill="url(#${c2})"/><path d="M${x - 34} ${y + 6} C ${x - 20} ${y - 36}, ${x + 30} ${y - 30}, ${x + 32} ${y + 2} C ${x + 28} ${y + 30}, ${x - 8} ${y + 34}, ${x - 12} ${y + 10}"
      stroke="#fff" stroke-opacity=".7" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="${x - 22}" cy="${y - 24}" r="10" fill="#fff" opacity=".7"/>`;
  const shards = [[60, 260, 40], [520, 230, 52], [470, 690, 36], [110, 640, 44], [300, 210, 28], [560, 520, 30], [30, 470, 26]]
    .map(([x, y, s]) => `<polygon points="${x},${y - s} ${x + s * .55},${y} ${x},${y + s} ${x - s * .55},${y}" fill="url(#gem)" opacity=".55"/>`).join('');
  const art = `
    <rect x="0" y="176" width="${W}" height="768" fill="url(#vbg)"/>
    <polygon points="0,176 600,176 600,560 0,860" fill="#8b4dff" opacity=".12"/>
    ${shards}
    <g filter="url(#soft)">${ribbon(0, '#1b0838', 40)}${ribbon(0, '#d46bff', 32)}${ribbon(Math.PI, '#ffd84f', 30)}</g>
    <g filter="url(#glow)" opacity=".8">${ribbon(0, '#f0b8ff', 18)}${ribbon(Math.PI, '#fff0a0', 16)}</g>
    ${ribbon(0, '#fbe6ff', 8)}${ribbon(Math.PI, '#fffbe0', 5)}
    ${orb(168, 400, '#b46bff', 'porb')}${orb(436, 590, '#ffd84f', 'yorb')}
    ${sparkles(16, '#fff', [20, 190, 560, 560], 1.3)}${sparkles(8, '#ffd84f', [20, 190, 560, 560], 1)}`;
  const logo = `
    <g filter="url(#drop)">
      <polygon points="70,782 128,744 472,744 530,782 472,820 128,820" fill="url(#plate)" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>
      <polygon points="128,744 300,744 250,820 128,820 70,782" fill="#fff" opacity=".25"/>
      <text x="300" y="799" text-anchor="middle" font-family="${LOGO}" font-weight="900" font-style="italic" font-size="44" letter-spacing="1"
        stroke="#2a0f4d" stroke-width="8" paint-order="stroke" stroke-linejoin="round"><tspan fill="url(#vtxt)">VIOLET</tspan><tspan fill="#fff" font-size="34" dx="6" dy="-2">&amp;</tspan><tspan fill="url(#ytxt)" dx="6" dy="2">YELLOW</tspan></text>
      <text x="300" y="896" text-anchor="middle" font-family="${LOGO}" font-weight="900" font-style="italic" font-size="72" letter-spacing="-1"
        fill="url(#ytxt)" stroke="#3b1470" stroke-width="12" paint-order="stroke" stroke-linejoin="round">COALESCENCE</text>
    </g>`;
  return frame({ dark: '#1b0838', mid: '#4b1d86', accent: '#9b5cff', ridge: '#3b1470', band: '#2a0f4d', art, logo,
    headerExtra: `<polygon points="400,44 600,44 600,158 470,158" fill="#ffd84f" opacity=".14"/>`,
    defs: `<radialGradient id="vbg" cx=".5" cy=".5" r=".8"><stop offset="0" stop-color="#7a3ae0"/><stop offset=".6" stop-color="#3a1474"/><stop offset="1" stop-color="#160630"/></radialGradient>
      <radialGradient id="porb" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#f1dcff"/><stop offset=".5" stop-color="#b46bff"/><stop offset="1" stop-color="#5a1fb0"/></radialGradient>
      <radialGradient id="yorb" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#fffbe0"/><stop offset=".5" stop-color="#ffd84f"/><stop offset="1" stop-color="#d99a00"/></radialGradient>
      <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#c9a8ff"/></linearGradient>
      <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4ecff"/><stop offset="1" stop-color="#b9a3dc"/></linearGradient>
      <linearGradient id="vtxt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2c4ff"/><stop offset="1" stop-color="#8b3dff"/></linearGradient>
      <linearGradient id="ytxt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6b0"/><stop offset=".55" stop-color="#ffd84f"/><stop offset="1" stop-color="#f0a800"/></linearGradient>` });
}

// ------------------------------------------------------------------ 3. Evolving Memories
function evolving() {
  const cloud = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})" fill="#fff" opacity=".9"><circle cx="0" cy="0" r="30"/><circle cx="34" cy="-12" r="38"/><circle cx="72" cy="0" r="28"/><rect x="0" y="-4" width="72" height="32" rx="14"/></g>`;
  const doodles = {
    heart: '<path d="M0 10 C -26 -10, -12 -30, 0 -16 C 12 -30, 26 -10, 0 10 Z" fill="#ff5c93"/>',
    star: '<path d="M0 -22 L6 -6 L22 -6 L9 4 L14 20 L0 10 L-14 20 L-9 4 L-22 -6 L-6 -6 Z" fill="#ffd34f"/>',
    sun: '<circle r="13" fill="#ffb300"/><g stroke="#ffb300" stroke-width="4" stroke-linecap="round"><path d="M0 -24v6M0 18v6M-24 0h6M18 0h6M-17 -17l4 4M13 13l4 4M17 -17l-4 4M-13 13l-4 4"/></g>',
    birds: '<path d="M-20 0 q 8 -10 16 0 q 8 -10 16 0" stroke="#3a3a4a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M2 14 q 6 -8 12 0 q 6 -8 12 0" stroke="#3a3a4a" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
  };
  const polaroid = (x, y, r, bg, d) => `<g transform="translate(${x} ${y}) rotate(${r})" filter="url(#drop)">
      <rect x="-52" y="-58" width="104" height="120" rx="4" fill="#fff"/><rect x="-44" y="-50" width="88" height="82" fill="${bg}"/>
      <g transform="translate(0 -9)">${doodles[d]}</g></g>`;
  const swirl = (y, amp, op, w) => { let d = ''; for (let i = 0; i <= 50; i++) { const t = i / 50, x = -40 + t * 680, yy = y + Math.sin(t * Math.PI * 2.2) * amp - t * 120; d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${yy.toFixed(1)} `; }
    return `<path d="${d}" stroke="#fff" stroke-opacity="${op}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`; };
  const art = `
    <rect x="0" y="176" width="${W}" height="768" fill="url(#sky)"/>
    <circle cx="470" cy="300" r="110" fill="#fff3c4" opacity=".55" filter="url(#glow)"/>
    ${cloud(40, 640, 1.2)}${cloud(400, 700, 1.4)}${cloud(250, 260, .8)}
    ${swirl(620, 60, .55, 14)}${swirl(700, 40, .35, 8)}${swirl(520, 80, .3, 6)}
    ${polaroid(112, 330, -12, '#bfe8ff', 'heart')}${polaroid(486, 452, 10, '#ffe3b0', 'birds')}${polaroid(140, 560, 8, '#ffd1e8', 'star')}${polaroid(450, 640, -9, '#c8f5d0', 'sun')}
    <g transform="translate(300 470) rotate(-8) scale(1.25) translate(-100 -110)">${bird({ body: '#ff8fb8', belly: '#fff0f6', wing: '#e8558f', beak: '#ffb23f' })}</g>
    ${sparkles(12, '#fff', [20, 190, 560, 520], 1.3)}`;
  const logo = `
    <g filter="url(#drop)">
      <text x="296" y="836" text-anchor="middle" font-family="${LOGO}" font-weight="900" font-style="italic" font-size="96" letter-spacing="-3"
        fill="url(#ptxt)" stroke="#fff3a0" stroke-width="16" paint-order="stroke" stroke-linejoin="round">EVOLVING</text>
      <text x="296" y="836" text-anchor="middle" font-family="${LOGO}" font-weight="900" font-style="italic" font-size="96" letter-spacing="-3"
        fill="url(#ptxt)" stroke="#6a0a35" stroke-width="7" paint-order="stroke" stroke-linejoin="round">EVOLVING</text>
      <text x="520" y="912" text-anchor="end" font-family="${LOGO}" font-weight="900" font-style="italic" font-size="62" letter-spacing="1"
        fill="url(#ytxt2)" stroke="#2e5d12" stroke-width="9" paint-order="stroke" stroke-linejoin="round">MEMORIES</text>
    </g>`;
  return frame({ dark: '#1f6b2c', mid: '#5fb043', accent: '#f2c94c', ridge: '#2e7a33', band: '#1f5a28', art, logo,
    headerExtra: [...Array(8)].map((_, i) => `<polygon points="${-60 + i * 95},44 ${-30 + i * 95},44 ${30 + i * 95},158 ${0 + i * 95},158" fill="#f6e45c" opacity=".22"/>`).join(''),
    defs: `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc8ff"/><stop offset=".5" stop-color="#ffe0b8"/><stop offset="1" stop-color="#ffb8d4"/></linearGradient>
      <linearGradient id="ptxt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9cc0"/><stop offset=".5" stop-color="#ff3d7f"/><stop offset="1" stop-color="#c4125a"/></linearGradient>
      <linearGradient id="ytxt2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbd0"/><stop offset=".5" stop-color="#ffe14d"/><stop offset="1" stop-color="#f2a900"/></linearGradient>` });
}

(async () => {
  const packs = { 'pack-celebrations': celebrations(), 'pack-coalescence': coalescence(), 'pack-evolving-memories': evolving() };
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  for (const [name, svg] of Object.entries(packs)) {
    fs.writeFileSync(path.join('/tmp', name + '.svg'), svg);
    await p.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
    await p.evaluate(() => document.fonts.ready);
    const png = path.join('/tmp', name + '.png');
    await p.screenshot({ path: png, omitBackground: true, clip: { x: 0, y: 0, width: W, height: H } });
    execSync(`convert "${png}" -quality 90 -define webp:alpha-quality=100 -define webp:method=6 "${path.join(OUT, name + '.webp')}"`);
    console.log('wrote packs/' + name + '.webp');
  }
  await b.close();
})();
