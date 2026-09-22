/**
 * Overlay 25 KG blue badge onto all 29 official 25kg jerrycan mockups
 * to perfectly align with 5kg and 10kg badges and layout styling.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { ARS_PRODUCTS } = require('../js/products.js');

const ROOT = path.join(__dirname, '..');
const MOCKUPS_DIR = path.join(ROOT, 'assets', 'products', 'mockups');

const badgeSvg = Buffer.from(`
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect x="648" y="424" width="56" height="22" rx="4" fill="#0284c7" filter="url(#badgeShadow)"/>
  <text x="676" y="439.5" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="11" font-weight="800">25 KG</text>
</svg>
`);

async function main() {
  const badgePng = await sharp(badgeSvg).png().toBuffer();
  let count = 0;

  for (const prod of ARS_PRODUCTS) {
    const filePath = path.join(MOCKUPS_DIR, `${prod.id}.jpg`);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const inputBuffer = fs.readFileSync(filePath);
    const updated = await sharp(inputBuffer)
      .composite([{ input: badgePng, top: 0, left: 0 }])
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(filePath, updated);
    count++;
    console.log(`[${count}/${ARS_PRODUCTS.length}] Added 25 KG badge to ${prod.id}.jpg`);
  }

  console.log(`\nSuccessfully updated all ${count} 25kg mockups with matching 25 KG badge!`);
}

main().catch(err => {
  console.error("Error updating 25kg mockups:", err);
  process.exit(1);
});
