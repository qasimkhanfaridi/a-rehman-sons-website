/**
 * Update 200kg industrial drum packaging asset with official ARS branding,
 * matching cyan & purple waves, certification seals, and 200 KG badge.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const DRUM_IMG = path.join(ROOT, 'assets', 'products', 'packaging', 'drum-200kg.jpg');
const LOGO_IMG = path.join(ROOT, 'assets', 'logo.png');
const SEALS_IMG = path.join(ROOT, 'assets', 'products', 'mockups', '5kg', 'seals.png');

const LABEL = { x: 372, y: 460, w: 274, h: 228 };

function buildDrumSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <filter id="drumShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- 1. White Background -->
  <rect x="${LABEL.x}" y="${LABEL.y}" width="${LABEL.w}" height="${LABEL.h}" rx="6" fill="#ffffff" filter="url(#drumShadow)"/>
  <rect x="${LABEL.x}" y="${LABEL.y}" width="${LABEL.w}" height="${LABEL.h}" rx="6" fill="none" stroke="#cbd5e1" stroke-width="1"/>

  <!-- 2. Cyan & Purple Ribbon Wave Banner -->
  <g transform="translate(${LABEL.x}, ${LABEL.y + 34})">
    <path d="M 0 10 Q 68 -2 137 6 Q 205 14 274 4 L 274 15 Q 205 25 137 17 Q 68 9 0 20 Z" fill="#00a8ec"/>
    <path d="M 0 20 Q 68 9 137 17 Q 205 25 274 15 L 274 18 Q 205 28 137 20 Q 68 12 0 23 Z" fill="#3c2a82"/>

    <text x="137" y="34" text-anchor="middle" fill="#b51263" font-family="'Segoe UI', Arial, sans-serif" font-size="11.5" font-weight="900" font-style="italic" letter-spacing="0.4">A.R. &amp; SONS®</text>
    <text x="137" y="44" text-anchor="middle" fill="#0c2f68" font-family="'Segoe UI', Arial, sans-serif" font-size="5.8" font-weight="800" letter-spacing="0.8">CHEMICAL &amp; GENERAL ORDER SUPPLIER</text>

    <!-- 200 KG Badge -->
    <rect x="${LABEL.w - 50}" y="24" width="44" height="15" rx="3" fill="#0284c7"/>
    <text x="${LABEL.w - 28}" y="35" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5" font-weight="800">200 KG</text>
  </g>

  <!-- 3. Title -->
  <g transform="translate(${LABEL.x + LABEL.w / 2}, ${LABEL.y + 96})">
    <text text-anchor="middle" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="900" letter-spacing="0.6">INDUSTRIAL BULK SUPPLY</text>
    <text y="11" text-anchor="middle" fill="#0284c7" font-family="'Segoe UI', Arial, sans-serif" font-size="6.5" font-weight="800" letter-spacing="0.5">HEAVY-DUTY HDPE SHIPPING DRUM (55 GALLONS)</text>
  </g>

  <!-- 4. Spec Details & Hazard -->
  <g transform="translate(${LABEL.x + 8}, ${LABEL.y + 116})">
    <rect x="0" y="0" width="124" height="66" rx="4" fill="#eef6fc" stroke="#bae6fd" stroke-width="0.8"/>
    <rect x="0" y="0" width="124" height="14" rx="4" fill="#372b7b"/>
    <text x="62" y="9.5" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="6" font-weight="800">👁 TECHNICAL SPECIFICATIONS</text>
    <text x="6" y="23" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="5.2" font-weight="700">Gross Weight: ~216 kg</text>
    <text x="6" y="32" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="5">Tamper-evident 2" &amp; 3/4" Tri-Sure bungs</text>
    <text x="6" y="41" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="5.2" font-weight="700">Packaging: UV-stabilised virgin HDPE</text>
    <text x="6" y="50" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="5">UN certified for hazardous bulk transport</text>
    <text x="6" y="59" fill="#0284c7" font-family="'Segoe UI', Arial, sans-serif" font-size="4.8" font-weight="600">Export &amp; Nationwide Dispensing Ready</text>

    <rect x="134" y="0" width="124" height="66" rx="4" fill="#eef6fc" stroke="#bae6fd" stroke-width="0.8"/>
    <rect x="134" y="0" width="124" height="14" rx="4" fill="#372b7b"/>
    <text x="196" y="9.5" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="6" font-weight="800">⚠ HANDLING PRECAUTIONS</text>
    
    <!-- Diamonds -->
    <g transform="translate(150, 20)">
      <polygon points="10,0 20,10 10,20 0,10" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
      <text x="10" y="14" text-anchor="middle" fill="#000000" font-family="sans-serif" font-size="11" font-weight="900">!</text>
      <text x="10" y="27" text-anchor="middle" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="4.5" font-weight="800">HARMFUL</text>
    </g>
    <g transform="translate(196, 20)">
      <polygon points="10,0 20,10 10,20 0,10" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
      <circle cx="10" cy="10" r="4" fill="#dc2626"/>
      <text x="10" y="27" text-anchor="middle" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="4.5" font-weight="800">CORROSIVE</text>
    </g>
    <text x="140" y="54" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="4.8">Use mechanical barrel lifter / pump.</text>
    <text x="140" y="62" fill="#dc2626" font-family="'Segoe UI', Arial, sans-serif" font-size="4.8" font-weight="700">Keep bung tightly sealed when idle.</text>
  </g>

  <!-- 5. Contact Footer -->
  <g transform="translate(${LABEL.x + 8}, ${LABEL.y + 190})" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif">
    <line x1="0" y1="0" x2="${LABEL.w - 16}" y2="0" stroke="#bae6fd" stroke-width="0.8"/>
    <text x="0" y="9" font-size="5" font-weight="700">📍 Plot # 152, St. # 1, Millat Colony, Rawalpindi · Tel: 051-5503203 · Mob: 0321-8502997</text>
    <text x="0" y="17" font-size="5" font-weight="700">✉ ar_sons@hotmail.com · ISO 9001:2015 · Halal Certified · HACCP Compliant</text>
  </g>

  <!-- 6. Bottom Wave -->
  <g transform="translate(${LABEL.x}, ${LABEL.y + 214})">
    <path d="M 0 5 Q 68 -2 137 6 Q 205 14 274 4 L 274 9 Q 205 19 137 11 Q 68 3 0 11 Z" fill="#00a8ec"/>
    <path d="M 0 11 Q 68 3 137 11 Q 205 19 274 9 L 274 14 L 0 14 Z" fill="#3c2a82"/>
  </g>
</svg>`;
}

async function main() {
  const baseBuffer = fs.readFileSync(DRUM_IMG);
  const logoBuffer = await sharp(LOGO_IMG)
    .resize(56, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const sealsBuffer = await sharp(SEALS_IMG)
    .resize(92, 30, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const svg = buildDrumSvg();
  const overlayBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  const finalBuf = await sharp(baseBuffer)
    .composite([
      { input: overlayBuffer, top: 0, left: 0 },
      { input: logoBuffer, top: LABEL.y + 6, left: LABEL.x + 8 },
      { input: sealsBuffer, top: LABEL.y + 6, left: LABEL.x + LABEL.w - 8 - 92 }
    ])
    .jpeg({ quality: 95, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(DRUM_IMG, finalBuf);
  console.log('Successfully updated assets/products/packaging/drum-200kg.jpg with official ARS label');
}

main().catch(err => {
  console.error("Error generating 200kg drum mockup:", err);
  process.exit(1);
});
