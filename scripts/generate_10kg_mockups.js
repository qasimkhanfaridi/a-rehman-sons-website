/**
 * Generate 10 kg photorealistic product mockups (1024x1024) matching 5kg and 25kg:
 * - 10L stackable HDPE canister with red safety cap.
 * - Clean white background label with rounded corners and drop shadow.
 * - Official ARS oval logo on top-left.
 * - Three circular certification seals on top-right (ISO 9001, HACCP, OHSAS 18001).
 * - Cyan & purple ribbon wave banner with magenta "A.R. & SONS®" and navy "CHEMICAL & GENERAL ORDER SUPPLIER".
 * - High-visibility 10 KG blue badge.
 * - Deep navy product title.
 * - Twin light-blue spec boxes with purple pill headers (FIRST AID MEASURES & SPECIAL PRECAUTIONS with GHS diamonds).
 * - Authentic Rawalpindi contact footer & bottom cyan/purple wave border.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { ARS_PRODUCTS } = require('../js/products.js');

const ROOT = path.join(__dirname, '..');
const BASE_IMG = path.join(ROOT, 'assets', 'products', 'packaging', 'canister-10kg.jpg');
const LOGO_IMG = path.join(ROOT, 'assets', 'logo.png');
const SEALS_IMG = path.join(ROOT, 'assets', 'products', 'mockups', '5kg', 'seals.png');
const OUT_DIR = path.join(ROOT, 'assets', 'products', 'mockups', '10kg');

const LABEL = { x: 308, y: 382, w: 416, h: 394 };

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

function buildSvg(prod, sizeText = '10 KG') {
  const details = prod.fullDetails || {};
  const dosage = truncateText(details.dosage || '3–8 ml per Kg of dry laundry load', 44);
  const ph = truncateText(details.ph || '11.0 – 12.0 (Alkaline)', 34);
  const active = truncateText(details.activeIngredients || 'Commercial active surfactants', 38);

  const nameLen = prod.name.length;
  const nameSize = nameLen > 22 ? 19 : nameLen > 16 ? 22 : nameLen > 12 ? 25 : 28;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <filter id="labelShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- 1. White Background matching 5kg and 25kg canister -->
  <rect x="${LABEL.x}" y="${LABEL.y}" width="${LABEL.w}" height="${LABEL.h}" rx="8" fill="#ffffff" filter="url(#labelShadow)"/>
  <rect x="${LABEL.x}" y="${LABEL.y}" width="${LABEL.w}" height="${LABEL.h}" rx="8" fill="none" stroke="#cbd5e1" stroke-width="1.2"/>

  <!-- 2. Cyan & Purple Ribbon Wave Banner -->
  <g transform="translate(${LABEL.x}, ${LABEL.y + 56})">
    <!-- Cyan upper wave -->
    <path d="M 0 14 Q 104 -4 208 8 Q 312 20 416 5 L 416 21 Q 312 36 208 24 Q 104 12 0 28 Z" fill="#00a8ec"/>
    <!-- Purple bottom wave -->
    <path d="M 0 28 Q 104 12 208 24 Q 312 36 416 21 L 416 26 Q 312 41 208 29 Q 104 17 0 33 Z" fill="#3c2a82"/>

    <!-- A.R. & SONS in Magenta/Burgundy -->
    <text x="208" y="50" text-anchor="middle" fill="#b51263" font-family="'Segoe UI', Arial, sans-serif" font-size="16.5" font-weight="900" font-style="italic" letter-spacing="0.5">A.R. &amp; SONS®</text>
    
    <!-- Subtitle in Deep Navy -->
    <text x="208" y="63" text-anchor="middle" fill="#0c2f68" font-family="'Segoe UI', Arial, sans-serif" font-size="7.8" font-weight="800" letter-spacing="1.1">CHEMICAL &amp; GENERAL ORDER SUPPLIER</text>

    <!-- 10 KG Badge (Floating right on wave) -->
    <rect x="${LABEL.w - 58}" y="37" width="48" height="19" rx="4" fill="#0284c7"/>
    <text x="${LABEL.w - 34}" y="50.5" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="9.8" font-weight="800">${sizeText}</text>
  </g>

  <!-- 3. Product Name in Deep Navy Blue -->
  <g transform="translate(${LABEL.x + LABEL.w / 2}, ${LABEL.y + 144})">
    <text text-anchor="middle" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="${nameSize}" font-weight="900" letter-spacing="0.8">${escapeXml(prod.name)}</text>
  </g>

  <!-- 4. Twin Rounded Blue Spec Boxes (Same stuff & same colors) -->
  <g transform="translate(${LABEL.x + 10}, ${LABEL.y + 158})">
    <!-- LEFT BOX: First Aid & Specs -->
    <rect x="0" y="0" width="192" height="140" rx="5" fill="#eef6fc" stroke="#bae6fd" stroke-width="1"/>
    <rect x="0" y="0" width="192" height="20" rx="5" fill="#372b7b"/>
    <text x="96" y="13.5" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="8" font-weight="800" letter-spacing="0.3">👁 FIRST AID MEASURES:</text>

    <text x="8" y="33" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7" font-weight="700">Eye &amp; Skin Contact:</text>
    <text x="8" y="43" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="6.5">Flush with water 15 min; seek medical attention.</text>

    <text x="8" y="58" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7" font-weight="700">Commercial Application &amp; Dosage:</text>
    <text x="8" y="68" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="6.5">${escapeXml(dosage)}</text>

    <text x="8" y="83" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7" font-weight="700">Working pH Value &amp; Purity:</text>
    <text x="8" y="93" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="6.5">${escapeXml(ph)}</text>

    <text x="8" y="108" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="7" font-weight="700">Active Compound:</text>
    <text x="8" y="118" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="6.5">${escapeXml(active)}</text>

    <!-- RIGHT BOX: Special Precautions & GHS Hazard Symbols -->
    <rect x="204" y="0" width="192" height="140" rx="5" fill="#eef6fc" stroke="#bae6fd" stroke-width="1"/>
    <rect x="204" y="0" width="192" height="20" rx="5" fill="#372b7b"/>
    <text x="300" y="13.5" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="8" font-weight="800" letter-spacing="0.3">⚠ SPECIAL PRECAUTIONS:</text>

    <text x="212" y="33" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="6.6">Always handle industrial chemicals with</text>
    <text x="212" y="42" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="6.6">protective equipment and institutional safety.</text>

    <!-- GHS Diamond 1: Harmful (!) -->
    <g transform="translate(228, 50)">
      <polygon points="17,0 34,17 17,34 0,17" fill="#ffffff" stroke="#dc2626" stroke-width="2.2"/>
      <text x="17" y="23" text-anchor="middle" fill="#000000" font-family="sans-serif" font-size="19" font-weight="900">!</text>
      <text x="17" y="44" text-anchor="middle" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="6.8" font-weight="800">HARMFUL</text>
    </g>

    <!-- GHS Diamond 2: Corrosive -->
    <g transform="translate(292, 50)">
      <polygon points="17,0 34,17 17,34 0,17" fill="#ffffff" stroke="#dc2626" stroke-width="2.2"/>
      <circle cx="17" cy="17" r="6.8" fill="#dc2626"/>
      <text x="17" y="44" text-anchor="middle" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif" font-size="6.8" font-weight="800">CORROSIVE</text>
    </g>

    <text x="212" y="114" fill="#1e3a8a" font-family="'Segoe UI', Arial, sans-serif" font-size="6.6">Wear protective gloves &amp; eye goggles.</text>
    <text x="212" y="126" fill="#dc2626" font-family="'Segoe UI', Arial, sans-serif" font-size="6.6" font-weight="700">Keep out of reach of children.</text>
  </g>

  <!-- 5. Contact Footer on White -->
  <g transform="translate(${LABEL.x + 12}, ${LABEL.y + 308})" fill="#002b5c" font-family="'Segoe UI', Arial, sans-serif">
    <line x1="0" y1="0" x2="${LABEL.w - 24}" y2="0" stroke="#bae6fd" stroke-width="1"/>
    
    <text x="0" y="12" font-size="7" font-weight="700">📍 Plot # 152, St. # 1, Millat Colony, Rawalpindi (G.P.O. Box 1020)</text>
    <text x="0" y="23" font-size="7" font-weight="700">📞 Mob: 0321-8502997, 0333-2158113 · Tel: 051-5503203</text>
    <text x="0" y="34" font-size="7" font-weight="700">✉ E-mail: ar_sons@hotmail.com · Fax: 051-5953130</text>
    <text x="0" y="45" font-size="6.5" fill="#0284c7" font-weight="600">ISO 9001:2015 · Halal Certified · HACCP Compliant · Rawalpindi Manufacturing</text>
  </g>

  <!-- 6. Bottom Cyan & Purple Wave -->
  <g transform="translate(${LABEL.x}, ${LABEL.y + 364})">
    <path d="M 0 8 Q 104 -4 208 8 Q 312 20 416 5 L 416 14 Q 312 29 208 17 Q 104 5 0 17 Z" fill="#00a8ec"/>
    <path d="M 0 17 Q 104 5 208 17 Q 312 29 416 14 L 416 28 L 0 28 Z" fill="#3c2a82"/>
  </g>
</svg>`;
}

async function main() {
  if (!fs.existsSync(BASE_IMG)) {
    console.error("Missing base 10kg canister image:", BASE_IMG);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const baseBuffer = await sharp(BASE_IMG).toBuffer();
  const logoBuffer = await sharp(LOGO_IMG)
    .resize(86, 50, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const sealsBuffer = await sharp(SEALS_IMG)
    .resize(140, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  let count = 0;
  for (const prod of ARS_PRODUCTS) {
    const svg = buildSvg(prod, '10 KG');
    const overlayBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    const finalBuf = await sharp(baseBuffer)
      .composite([
        { input: overlayBuffer, top: 0, left: 0 },
        { input: logoBuffer, top: LABEL.y + 8, left: LABEL.x + 12 },
        { input: sealsBuffer, top: LABEL.y + 8, left: LABEL.x + LABEL.w - 12 - 140 }
      ])
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer();

    const outPath = path.join(OUT_DIR, `${prod.id}.jpg`);
    fs.writeFileSync(outPath, finalBuf);
    count++;
    console.log(`[${count}/${ARS_PRODUCTS.length}] Generated 10kg mockup for ${prod.id}`);
  }

  // Also update assets/products/packaging/canister-10kg.jpg with standard ZEPOL SC 100 branding
  const sc100 = ARS_PRODUCTS.find(x => x.id === 'zepol-sc-100');
  if (sc100) {
    const sc100Svg = buildSvg(sc100, '10 KG');
    const overlay = await sharp(Buffer.from(sc100Svg)).png().toBuffer();
    const default10kgBuf = await sharp(baseBuffer)
      .composite([
        { input: overlay, top: 0, left: 0 },
        { input: logoBuffer, top: LABEL.y + 8, left: LABEL.x + 12 },
        { input: sealsBuffer, top: LABEL.y + 8, left: LABEL.x + LABEL.w - 12 - 140 }
      ])
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(BASE_IMG, default10kgBuf);
    console.log("Updated assets/products/packaging/canister-10kg.jpg with official ARS label");
  }

  console.log(`\nSuccessfully created all ${count} 10kg product mockups!`);
}

main().catch(err => {
  console.error("Error generating 10kg mockups:", err);
  process.exit(1);
});
