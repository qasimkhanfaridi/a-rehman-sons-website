/**
 * Generate 5 kg photorealistic product mockups (1024x1024) matching the 25 kg color theme:
 * - Bright red ribbed safety cap on top.
 * - Clean white background label with rounded corners.
 * - Official ARS oval logo on top-left.
 * - Three circular certification seals on top-right (ISO 9001, HACCP, OHSAS 18001).
 * - Cyan & purple ribbon wave banner with magenta "A.R. & SONS®" and navy "CHEMICAL & GENERAL ORDER SUPPLIER".
 * - High-visibility 5 KG blue badge.
 * - Deep navy product title.
 * - Twin light-blue spec boxes with purple pill headers (First Aid/Dosage & Safety Precautions with GHS hazard diamonds).
 * - Authentic Rawalpindi contact footer & bottom cyan/purple wave border.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { ARS_PRODUCTS } = require('../js/products.js');

const ROOT = path.join(__dirname, '..');
const BASE_IMG = path.join(ROOT, 'assets', 'products', 'mockups', '5kg', 'base_5kg_redcap_perfect.png');
const LOGO_IMG = path.join(ROOT, 'assets', 'logo.png');
const SEALS_IMG = path.join(ROOT, 'assets', 'products', 'mockups', '5kg', 'seals.png');
const OUT_DIR = path.join(ROOT, 'assets', 'products', 'mockups', '5kg');

const LABEL = { x: 268, y: 368, w: 424, h: 436 };

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncateText(str, maxLen) {
  if (!str) return '';
  const clean = String(str).replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen - 1) + '…';
}

function buildSvg(product) {
  const details = product.fullDetails || {};
  const dosage = truncateText(details.dosage || '3–8 ml per Kg of dry laundry load', 46);
  const ph = truncateText(details.ph || '11.0 – 12.0 (Alkaline)', 34);
  const active = truncateText(details.activeIngredients || 'Commercial active surfactants', 40);

  const nameLen = product.name.length;
  const nameSize = nameLen > 22 ? 21 : nameLen > 16 ? 24 : nameLen > 12 ? 27 : 31;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <filter id="labelShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- 1. White Background matching 25kg canister -->
  <rect x="${LABEL.x}" y="${LABEL.y}" width="${LABEL.w}" height="${LABEL.h}" rx="8" fill="#ffffff" filter="url(#labelShadow)"/>
  <rect x="${LABEL.x}" y="${LABEL.y}" width="${LABEL.w}" height="${LABEL.h}" rx="8" fill="none" stroke="#cbd5e1" stroke-width="1.2"/>

  <!-- 2. Cyan & Purple Ribbon Wave Banner (Exact 25kg style) -->
  <g transform="translate(${LABEL.x}, ${LABEL.y + 64})">
    <!-- Cyan upper wave -->
    <path d="M 0 16 Q 106 -4 212 10 Q 318 24 424 6 L 424 24 Q 318 42 212 28 Q 106 14 0 34 Z" fill="#00a8ec"/>
    <!-- Purple bottom wave border -->
    <path d="M 0 34 Q 106 14 212 28 Q 318 42 424 24 L 424 29 Q 318 47 212 33 Q 106 19 0 39 Z" fill="#3c2a82"/>

    <!-- A.R. & SONS in Magenta/Burgundy -->
    <text x="212" y="58" text-anchor="middle" fill="#b51263" font-family="'Segoe UI', Arial, sans-serif" font-size="18.5" font-weight="900" font-style="italic" letter-spacing="0.5">A.R. &amp; SONS®</text>
    
    <!-- Subtitle in Deep Navy -->
    <text x="212" y="73" text-anchor="middle" fill="#0c2f68" font-family="'Segoe UI', Arial, sans-serif" font-size="8.8" font-weight="800" letter-spacing="1.2">CHEMICAL &amp; GENERAL ORDER SUPPLIER</text>
    
    <!-- 5 KG Badge (Floating right on wave) -->
    <rect x="${LABEL.w - 62}" y="44" width="50" height="20" rx="4" fill="#0284c7"/>
    <text x="${LABEL.w - 37}" y="58" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="10.5" font-weight="800">5 KG</text>
  </g>

  <!-- 3. Product Name in Deep Navy Blue (25kg style) -->
  <g transform="translate(${LABEL.x + LABEL.w / 2}, ${LABEL.y + 164})">
    <text text-anchor="middle" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="${nameSize}" font-weight="900" letter-spacing="0.8">${escapeXml(product.name)}</text>
  </g>

  <!-- 4. Twin Rounded Blue Spec Boxes (25kg style) -->
  <g transform="translate(${LABEL.x + 12}, ${LABEL.y + 180})">
    <!-- LEFT BOX: First Aid / Technical Specs -->
    <rect x="0" y="0" width="194" height="152" rx="6" fill="#eef6fc" stroke="#bae6fd" stroke-width="1"/>
    
    <!-- Purple Pill Header -->
    <rect x="0" y="0" width="194" height="22" rx="6" fill="#372b7b"/>
    <text x="97" y="15" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="8.5" font-weight="800" letter-spacing="0.4">👁 FIRST AID &amp; DOSAGE:</text>
    
    <!-- Left Box Content -->
    <text x="8" y="37" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5" font-weight="700">Commercial Application / Dosage:</text>
    <text x="8" y="49" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="7">${escapeXml(dosage)}</text>
    
    <text x="8" y="65" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5" font-weight="700">In Case of Eye Contact:</text>
    <text x="8" y="77" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="7">Flush with water at least 15 min; seek</text>
    <text x="8" y="87" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="7">medical attention if irritation persists.</text>
    
    <text x="8" y="103" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5" font-weight="700">Working pH Value &amp; Purity:</text>
    <text x="8" y="115" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="7">${escapeXml(ph)}</text>
    
    <text x="8" y="131" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5" font-weight="700">Active Compound:</text>
    <text x="8" y="143" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="7">${escapeXml(active)}</text>

    <!-- RIGHT BOX: Special Precautions & GHS Hazard Symbols -->
    <rect x="206" y="0" width="194" height="152" rx="6" fill="#eef6fc" stroke="#bae6fd" stroke-width="1"/>
    
    <!-- Purple Pill Header -->
    <rect x="206" y="0" width="194" height="22" rx="6" fill="#372b7b"/>
    <text x="303" y="15" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="8.5" font-weight="800" letter-spacing="0.4">⚠ SPECIAL PRECAUTIONS:</text>
    
    <!-- Right Box Content -->
    <text x="214" y="37" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="7.2">Always use chemicals with awareness of</text>
    <text x="214" y="47" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="7.2">potential hazards &amp; institutional safety.</text>
    
    <!-- GHS Diamond 1: Harmful (!) -->
    <g transform="translate(230, 56)">
      <polygon points="20,0 40,20 20,40 0,20" fill="#ffffff" stroke="#dc2626" stroke-width="2.5"/>
      <text x="20" y="27" text-anchor="middle" fill="#000000" font-family="sans-serif" font-size="22" font-weight="900">!</text>
      <text x="20" y="52" text-anchor="middle" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5" font-weight="800">HARMFUL</text>
    </g>

    <!-- GHS Diamond 2: Corrosive -->
    <g transform="translate(300, 56)">
      <polygon points="20,0 40,20 20,40 0,20" fill="#ffffff" stroke="#dc2626" stroke-width="2.5"/>
      <circle cx="20" cy="20" r="8" fill="#dc2626"/>
      <text x="20" y="52" text-anchor="middle" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5" font-weight="800">CORROSIVE</text>
    </g>

    <text x="214" y="125" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="7">Wear protective gloves &amp; eye goggles.</text>
    <text x="214" y="137" fill="#dc2626" font-family="'Segoe UI', Arial, sans-serif" font-size="7" font-weight="700">Keep out of reach of children.</text>
  </g>

  <!-- 5. Contact Footer on White (Exact 25kg style) -->
  <g transform="translate(${LABEL.x + 14}, ${LABEL.y + 344})" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif">
    <line x1="0" y1="0" x2="${LABEL.w - 28}" y2="0" stroke="#bae6fd" stroke-width="1"/>
    
    <text x="0" y="14" font-size="7.8" font-weight="700">📍 Contact us: Plot # 152, St. # 1, Millat Colony, Rawalpindi (G.P.O. Box 1020)</text>
    <text x="0" y="27" font-size="7.8" font-weight="700">📞 Mob: 0321-8502997, 0333-2158113 · Tel: 051-5503203</text>
    <text x="0" y="40" font-size="7.8" font-weight="700">✉ E-mail: ar_sons@hotmail.com · Fax: 051-5953130</text>
    <text x="0" y="52" font-size="7.2" fill="#0284c7" font-weight="600">ISO 9001:2015 · Halal Certified · HACCP Compliant · Rawalpindi Manufacturing</text>
  </g>

  <!-- 6. Bottom Cyan & Purple Wave (Exact 25kg style) -->
  <g transform="translate(${LABEL.x}, ${LABEL.y + 404})">
    <!-- Upper cyan wave -->
    <path d="M 0 10 Q 106 -4 212 10 Q 318 24 424 6 L 424 16 Q 318 34 212 20 Q 106 6 0 20 Z" fill="#00a8ec"/>
    <!-- Bottom purple wave -->
    <path d="M 0 20 Q 106 6 212 20 Q 318 34 424 16 L 424 32 L 0 32 Z" fill="#3c2a82"/>
  </g>
</svg>`;
}

async function main() {
  if (!fs.existsSync(BASE_IMG)) {
    console.error("Missing base capped image:", BASE_IMG);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const baseBuffer = await sharp(BASE_IMG).toBuffer();
  const logoBuffer = await sharp(LOGO_IMG)
    .resize(92, 54, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const sealsBuffer = await sharp(SEALS_IMG)
    .resize(150, 52, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  let count = 0;
  for (const product of ARS_PRODUCTS) {
    const svg = buildSvg(product);
    const overlayBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    const finalBuf = await sharp(baseBuffer)
      .composite([
        { input: overlayBuffer, top: 0, left: 0 },
        { input: logoBuffer, top: LABEL.y + 10, left: LABEL.x + 14 },
        { input: sealsBuffer, top: LABEL.y + 10, left: LABEL.x + LABEL.w - 14 - 150 }
      ])
      .jpeg({ quality: 94, mozjpeg: true })
      .toBuffer();

    const outPath = path.join(OUT_DIR, `${product.id}.jpg`);
    fs.writeFileSync(outPath, finalBuf);
    count++;
    console.log(`[${count}/${ARS_PRODUCTS.length}] Generated 25kg-matched 5kg mockup for ${product.id}`);
  }

  // Also update reference-5kg-zepol-sc100.png with the official capped SC100
  const sc100 = ARS_PRODUCTS.find(x => x.id === 'zepol-sc-100');
  if (sc100) {
    const sc100Svg = buildSvg(sc100);
    const overlay = await sharp(Buffer.from(sc100Svg)).png().toBuffer();
    await sharp(baseBuffer)
      .composite([
        { input: overlay, top: 0, left: 0 },
        { input: logoBuffer, top: LABEL.y + 10, left: LABEL.x + 14 },
        { input: sealsBuffer, top: LABEL.y + 10, left: LABEL.x + LABEL.w - 14 - 150 }
      ])
      .png()
      .toFile(path.join(OUT_DIR, 'reference-5kg-zepol-sc100.png'));
    console.log("Updated reference-5kg-zepol-sc100.png with 25kg-matched theme");
  }

  console.log(`\nSuccessfully created all ${count} 5kg product mockups matching the 25kg color theme!`);
}

main().catch(err => {
  console.error("Error generating 5kg mockups:", err);
  process.exit(1);
});
