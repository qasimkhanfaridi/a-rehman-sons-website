/**
 * Generate 5 kg photorealistic product mockups (1024x1024) for all 29 products.
 * Features:
 * - Sealed, realistic ribbed cap on the canister neck.
 * - Perfectly aligned label covering the canister's recessed panel.
 * - Official A. Rehman & Sons (ARS) branding, logo, and Rawalpindi manufacturing credentials.
 * - Accurate contact info (Tel: 051-5503203, WhatsApp: 0321-8502997).
 * - Spotless studio reflection.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { ARS_PRODUCTS } = require('../js/products.js');

const ROOT = path.join(__dirname, '..');
const BASE_IMG = path.join(ROOT, 'assets', 'products', 'mockups', '5kg', 'base_5kg_capped_perfect.png');
const LOGO_IMG = path.join(ROOT, 'assets', 'logo.png');
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

function wrapText(text, maxChars = 52) {
  if (!text) return [];
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

const CATEGORY_TAGLINES = {
  laundry: "Commercial Laundry Detergents & Bleaches",
  kitchen: "Commercial Kitchen & Dishwashing Solutions",
  stewarding: "Specialized Stewarding & Destaining Formulations",
  housekeeping: "Institutional Housekeeping & Facility Care"
};

const CATEGORY_BULLETS = {
  laundry: ["✓ High Dilution Efficiency", "✓ Institutional Linen Care", "✓ 100% Commercial Grade"],
  kitchen: ["✓ Heavy Grease Stripping", "✓ Food-Grade Formulation", "✓ Fast-Acting Degreaser"],
  stewarding: ["✓ Deep Tannin & Stain Lifter", "✓ Melamine & Urn Safe", "✓ High Dilution Yield"],
  housekeeping: ["✓ Hospital-Grade Sanitation", "✓ High-Yield Concentration", "✓ Multi-Surface Efficacy"]
};

function buildSvg(product) {
  const details = product.fullDetails || {};
  const catTagline = CATEGORY_TAGLINES[product.category] || "Commercial Chemical Formulations";
  const bullets = CATEGORY_BULLETS[product.category] || CATEGORY_BULLETS.laundry;

  const dosage = (details.dosage || '3–8 ml per Kg of dry laundry load').slice(0, 48);
  const ph = (details.ph || '11.0 – 12.0 (Alkaline)').slice(0, 36);
  const active = (details.activeIngredients || 'High active non-ionic surfactants').slice(0, 44);

  const descLines = wrapText(product.description, 50).slice(0, 2);
  const nameSize = product.name.length > 20 ? 21 : product.name.length > 14 ? 25 : 30;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="labelBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0c386e"/>
      <stop offset="100%" stop-color="#061c38"/>
    </linearGradient>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Main Label Card -->
  <rect x="${LABEL.x}" y="${LABEL.y}" width="${LABEL.w}" height="${LABEL.h}" rx="6" fill="url(#labelBg)" filter="url(#cardShadow)"/>
  <rect x="${LABEL.x + 1}" y="${LABEL.y + 1}" width="${LABEL.w - 2}" height="${LABEL.h - 2}" rx="5" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.45"/>

  <!-- Top Brand Header Bar -->
  <g transform="translate(${LABEL.x + 12}, ${LABEL.y + 12})">
    <text x="56" y="16" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="14.5" font-weight="900" letter-spacing="0.5">A. REHMAN &amp; SONS</text>
    <text x="56" y="30" fill="#7dd3fc" font-family="'Segoe UI', Arial, sans-serif" font-size="8.5" font-weight="700" letter-spacing="1.2">COMMERCIAL CHEMICALS</text>
    <text x="56" y="42" fill="#bae6fd" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5" font-weight="500">Rawalpindi, Pakistan · Est. 1988 · ISO 9001</text>
    
    <!-- 5 KG Badge -->
    <rect x="${LABEL.w - 24 - 60}" y="6" width="60" height="23" rx="4" fill="#0284c7"/>
    <text x="${LABEL.w - 24 - 30}" y="22" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="11.5" font-weight="800">5 KG</text>
  </g>

  <!-- Divider line -->
  <line x1="${LABEL.x + 12}" y1="${LABEL.y + 68}" x2="${LABEL.x + LABEL.w - 12}" y2="${LABEL.y + 68}" stroke="#1e4976" stroke-width="1.2"/>

  <!-- Product Name Area -->
  <g transform="translate(${LABEL.x + LABEL.w / 2}, ${LABEL.y + 102})">
    <text text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="${nameSize}" font-weight="900" letter-spacing="0.8">${escapeXml(product.name)}</text>
    <text y="19" text-anchor="middle" fill="#93c5fd" font-family="'Segoe UI', Arial, sans-serif" font-size="10" font-weight="700">${escapeXml(catTagline)}</text>
    ${descLines.map((line, idx) => `<text y="${33 + idx * 12}" text-anchor="middle" fill="#e0f2fe" font-family="'Segoe UI', Arial, sans-serif" font-size="8">${escapeXml(line)}</text>`).join('')}
  </g>

  <!-- Bullets Row -->
  <g transform="translate(${LABEL.x + 16}, ${LABEL.y + 158})" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="9" font-weight="600">
    <text x="0" y="0">${escapeXml(bullets[0])}</text>
    <text x="136" y="0">${escapeXml(bullets[1])}</text>
    <text x="264" y="0">${escapeXml(bullets[2])}</text>
  </g>

  <!-- Info & Safety Twin Boxes -->
  <g transform="translate(${LABEL.x + 12}, ${LABEL.y + 176})">
    <!-- Left Box: Tech specs -->
    <rect x="0" y="0" width="224" height="136" rx="5" fill="#082040" stroke="#1e4b7a" stroke-width="1"/>
    <rect x="0" y="0" width="224" height="22" rx="5" fill="#0d315b"/>
    <text x="10" y="15" fill="#7dd3fc" font-family="'Segoe UI', Arial, sans-serif" font-size="8.5" font-weight="700">TECHNICAL SPECIFICATIONS</text>
    
    <text x="10" y="38" fill="#e0f2fe" font-family="'Segoe UI', Arial, sans-serif" font-size="8" font-weight="600">Dosage / Dilution:</text>
    <text x="10" y="51" fill="#cbd5e1" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5">${escapeXml(dosage)}</text>
    
    <text x="10" y="69" fill="#e0f2fe" font-family="'Segoe UI', Arial, sans-serif" font-size="8" font-weight="600">Working pH Value:</text>
    <text x="10" y="82" fill="#cbd5e1" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5">${escapeXml(ph)}</text>
    
    <text x="10" y="100" fill="#e0f2fe" font-family="'Segoe UI', Arial, sans-serif" font-size="8" font-weight="600">Active Compound:</text>
    <text x="10" y="113" fill="#cbd5e1" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5">${escapeXml(active)}</text>

    <!-- Right Box: GHS Warning -->
    <rect x="234" y="0" width="166" height="136" rx="5" fill="#082040" stroke="#1e4b7a" stroke-width="1"/>
    <rect x="234" y="0" width="166" height="22" rx="5" fill="#1e293b"/>
    <text x="244" y="15" fill="#f87171" font-family="'Segoe UI', Arial, sans-serif" font-size="8.5" font-weight="800">SAFETY PRECAUTIONS</text>
    
    <!-- Red Diamond 1: Exclamation -->
    <g transform="translate(254, 30)">
      <polygon points="18,0 36,18 18,36 0,18" fill="#ffffff" stroke="#dc2626" stroke-width="2.5"/>
      <text x="18" y="24" text-anchor="middle" fill="#000000" font-family="sans-serif" font-size="19" font-weight="900">!</text>
    </g>
    <!-- Red Diamond 2: Corrosive -->
    <g transform="translate(304, 30)">
      <polygon points="18,0 36,18 18,36 0,18" fill="#ffffff" stroke="#dc2626" stroke-width="2.5"/>
      <circle cx="18" cy="18" r="7" fill="#dc2626"/>
    </g>

    <text x="242" y="88" fill="#fca5a5" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5" font-weight="700">Commercial Formulation</text>
    <text x="242" y="100" fill="#e2e8f0" font-family="'Segoe UI', Arial, sans-serif" font-size="7">Causes eye &amp; skin irritation.</text>
    <text x="242" y="112" fill="#e2e8f0" font-family="'Segoe UI', Arial, sans-serif" font-size="7">Keep locked away from children.</text>
    <text x="242" y="124" fill="#e2e8f0" font-family="'Segoe UI', Arial, sans-serif" font-size="7">Wear gloves &amp; eye protection.</text>
  </g>

  <!-- Bottom Manufacturer Footer Bar -->
  <g transform="translate(${LABEL.x + 10}, ${LABEL.y + 328})">
    <rect x="0" y="0" width="${LABEL.w - 20}" height="96" rx="6" fill="#031224" stroke="#0f3560" stroke-width="1"/>
    
    <text x="${(LABEL.w - 20) / 2}" y="20" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="10" font-weight="800">Manufactured by A. Rehman &amp; Sons · Rawalpindi, Pakistan</text>
    <text x="${(LABEL.w - 20) / 2}" y="36" text-anchor="middle" fill="#93c5fd" font-family="'Segoe UI', Arial, sans-serif" font-size="8.2" font-weight="600">Plot # 152, Street # 1, Millat Colony · G.P.O. Box No. 1020, Rawalpindi</text>
    <text x="${(LABEL.w - 20) / 2}" y="52" text-anchor="middle" fill="#38bdf8" font-family="'Segoe UI', Arial, sans-serif" font-size="9" font-weight="700">Tel: 051-5503203 · WhatsApp: 0321-8502997 · 0333-2158113</text>
    <text x="${(LABEL.w - 20) / 2}" y="67" text-anchor="middle" fill="#cbd5e1" font-family="'Segoe UI', Arial, sans-serif" font-size="8">Email: ar_sons@hotmail.com · ISO 9001:2015 · Halal Certified · HACCP Compliant</text>
    <text x="${(LABEL.w - 20) / 2}" y="81" text-anchor="middle" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="7.2">Verified Commercial Formulation · Purpose-Built Rawalpindi Manufacturing</text>
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
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  let count = 0;
  for (const product of ARS_PRODUCTS) {
    const svg = buildSvg(product);
    const overlayBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    const finalBuf = await sharp(baseBuffer)
      .composite([
        { input: overlayBuffer, top: 0, left: 0 },
        { input: logoBuffer, top: LABEL.y + 14, left: LABEL.x + 14 }
      ])
      .jpeg({ quality: 94, mozjpeg: true })
      .toBuffer();

    const outPath = path.join(OUT_DIR, `${product.id}.jpg`);
    fs.writeFileSync(outPath, finalBuf);
    count++;
    console.log(`[${count}/${ARS_PRODUCTS.length}] Generated 5kg mockup for ${product.id}`);
  }

  // Also update reference-5kg-zepol-sc100.png with the official capped SC100
  const sc100 = ARS_PRODUCTS.find(x => x.id === 'zepol-sc-100');
  if (sc100) {
    const sc100Svg = buildSvg(sc100);
    const overlay = await sharp(Buffer.from(sc100Svg)).png().toBuffer();
    await sharp(baseBuffer)
      .composite([
        { input: overlay, top: 0, left: 0 },
        { input: logoBuffer, top: LABEL.y + 14, left: LABEL.x + 14 }
      ])
      .png()
      .toFile(path.join(OUT_DIR, 'reference-5kg-zepol-sc100.png'));
    console.log("Updated reference-5kg-zepol-sc100.png with capped bottle & official ARS credentials");
  }

  console.log(`\nSuccessfully created all ${count} 5kg product mockups with sealed cap & official ARS credentials!`);
}

main().catch(err => {
  console.error("Error generating 5kg mockups:", err);
  process.exit(1);
});
