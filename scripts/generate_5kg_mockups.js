/**
 * Build 5 kg product mockups (1024×1024) from the client reference layout:
 * same compact white jerrycan + blue label design — not scaled-down 25 kg cans.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const REF = path.join(ROOT, "assets", "products", "mockups", "5kg", "reference-5kg-zepol-sc100.png");
const OUT_DIR = path.join(ROOT, "assets", "products", "mockups", "5kg");

const SIZE = 1024;

/** Full front label on 1024 canvas (tuned to reference-5kg-zepol-sc100.png) */
const LABEL = { x: 296, y: 246, w: 432, h: 502 };

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapLines(text, maxChars) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function featureBullets(description) {
  const d = (description || "").toLowerCase();
  if (d.includes("bleach") || d.includes("chlorine") || d.includes("hypochlorite")) {
    return ["Whitening & Sanitizing", "Institutional Strength", "Concentrated"];
  }
  if (d.includes("powder") || d.includes("flakes") || d.includes("bag")) {
    return ["Industrial Grade", "High Purity Formula", "5 kg Pack"];
  }
  if (d.includes("acid") || d.includes("descaler") || d.includes("corrosive")) {
    return ["Scale & Mineral Removal", "Professional Strength", "Concentrated"];
  }
  if (d.includes("detergent") || d.includes("laundry") || d.includes("wash")) {
    return ["Deep Cleaning Formula", "Commercial Laundry", "Concentrated"];
  }
  if (d.includes("glass") || d.includes("mirror")) {
    return ["Streak-Free Finish", "Fast Evaporation", "Professional Use"];
  }
  return ["Deep Cleaning Formula", "Effective Performance", "Concentrated"];
}

function subtitleLines(description) {
  const clean = (description || "").replace(/\s+/g, " ").trim();
  return wrapLines(clean, 34).map((line) => (line.length > 36 ? `${line.slice(0, 33)}…` : line));
}

function buildLabelOverlaySvg(product) {
  const name = escapeXml(product.name);
  const subtitles = subtitleLines(product.description);
  const bullets = featureBullets(product.description);
  const infoLines = wrapLines(product.description, 38);
  const { x, y, w, h } = LABEL;
  const pad = 14;
  const innerX = x + pad;
  const innerW = w - pad * 2;

  const nameSize = product.name.length > 14 ? 32 : product.name.length > 10 ? 38 : 44;
  const subSize = 12.5;
  const brandY = y + 36;

  const infoY = y + 168;
  const infoText = infoLines
    .map((line, i) => `<tspan x="${innerX + 4}" dy="${i === 0 ? 0 : 14}">${escapeXml(line)}</tspan>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <filter id="labelShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0b3d78" filter="url(#labelShadow)"/>
  <g transform="translate(${x + w / 2}, ${y + 18})">
    <path d="M -22 -10 L 0 -24 L 22 -10 L 16 14 L -16 14 Z" fill="#166534" stroke="#ffffff" stroke-width="1.2"/>
    <text y="6" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="11" font-weight="900">R&amp;S</text>
  </g>
  <text x="${x + w / 2}" y="${brandY}" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="11" font-weight="700">Rehman and Son&apos;s</text>
  <text x="${x + w / 2}" y="${brandY + 14}" text-anchor="middle" fill="#bfdbfe" font-family="'Segoe UI', Arial, sans-serif" font-size="9" font-weight="600" letter-spacing="2">CHEMICALS</text>
  <text x="${x + w / 2}" y="${y + 108}" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="${nameSize}" font-weight="800" letter-spacing="1">${name}</text>
  <text x="${x + w / 2}" y="${y + 128}" text-anchor="middle" fill="#dbeafe" font-family="'Segoe UI', Arial, sans-serif" font-size="${subSize}" font-weight="600">
    ${subtitles.map((line, i) => `<tspan x="${x + w / 2}" dy="${i === 0 ? 0 : 13}">${escapeXml(line)}</tspan>`).join("")}
  </text>
  <g fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="10.5" font-weight="600">
    <text x="${innerX}" y="${y + 152}">✓ ${escapeXml(bullets[0])}</text>
    <text x="${innerX + innerW / 2}" y="${y + 152}">✓ ${escapeXml(bullets[1])}</text>
    <text x="${innerX}" y="${y + 166}">✓ ${escapeXml(bullets[2])}</text>
  </g>
  <text x="${innerX}" y="${infoY}" fill="#e0f2fe" font-family="'Segoe UI', Arial, sans-serif" font-size="9.5" font-weight="600">Typical Chemical Product Information</text>
  <text fill="#bfdbfe" font-family="'Segoe UI', Arial, sans-serif" font-size="8.5">${infoText}</text>
  <rect x="${x + w - pad - 118}" y="${infoY - 4}" width="112" height="118" fill="none" stroke="#93c5fd" stroke-width="1.2" rx="4"/>
  <text x="${x + w - pad - 62}" y="${infoY + 10}" text-anchor="middle" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="10" font-weight="800">WARNING</text>
  <rect x="${x + w - pad - 108}" y="${infoY + 22}" width="28" height="28" fill="#fff" stroke="#dc2626" stroke-width="2"/>
  <text x="${x + w - pad - 94}" y="${infoY + 42}" text-anchor="middle" fill="#dc2626" font-size="18" font-weight="900">!</text>
  <rect x="${x + w - pad - 72}" y="${infoY + 22}" width="28" height="28" fill="#fff" stroke="#dc2626" stroke-width="2"/>
  <text x="${x + w - pad - 58}" y="${infoY + 42}" text-anchor="middle" fill="#dc2626" font-size="14" font-weight="900">☣</text>
  <text x="${x + w - pad - 62}" y="${infoY + 68}" text-anchor="middle" fill="#e0f2fe" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5">Causes skin irritation.</text>
  <text x="${x + w - pad - 62}" y="${infoY + 80}" text-anchor="middle" fill="#e0f2fe" font-family="'Segoe UI', Arial, sans-serif" font-size="7.5">Keep out of reach of children.</text>
  <text x="${x + w / 2}" y="${y + h - 28}" text-anchor="middle" fill="#dbeafe" font-family="'Segoe UI', Arial, sans-serif" font-size="8">Manufactured by Rehman and Son&apos;s (Pvt.) Ltd., Karachi, Pakistan</text>
  <text x="${x + w / 2}" y="${y + h - 14}" text-anchor="middle" fill="#dbeafe" font-family="'Segoe UI', Arial, sans-serif" font-size="8">Customer Support Number: 833 357 7559</text>
  <text x="${x + w - pad - 4}" y="${y + 28}" text-anchor="end" fill="#ffffff" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="800">5 KG</text>
</svg>`;
}

function loadProducts() {
  const src = fs.readFileSync(path.join(ROOT, "js", "products.js"), "utf8");
  const block = src.match(/const ARS_PRODUCTS = (\[[\s\S]*?\n\];)/);
  if (!block) throw new Error("Could not parse ARS_PRODUCTS");
  return Function(`"use strict"; return ${block[1].replace(/;\s*$/, "")}`)();
}

async function baseFromReference() {
  return sharp(REF)
    .resize(SIZE, SIZE, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer();
}

async function renderProduct(baseBuffer, product, useReferenceAsIs) {
  if (useReferenceAsIs) {
    return sharp(baseBuffer).jpeg({ quality: 92, mozjpeg: true }).toBuffer();
  }
  const overlaySvg = Buffer.from(buildLabelOverlaySvg(product));
  const overlayPng = await sharp(overlaySvg).png().toBuffer();
  return sharp(baseBuffer)
    .composite([{ input: overlayPng, top: 0, left: 0 }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}

async function main() {
  if (!fs.existsSync(REF)) {
    console.error("Missing reference image:", REF);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const products = loadProducts();
  const baseBuffer = await baseFromReference();

  for (const product of products) {
    const outPath = path.join(OUT_DIR, `${product.id}.jpg`);
    const isRef = product.id === "zepol-sc-100";
    const buf = await renderProduct(baseBuffer, product, isRef);
    fs.writeFileSync(outPath, buf);
    console.log(isRef ? `OK ${product.id} (client reference)` : `OK ${product.id} (5kg label layout)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
