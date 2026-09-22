const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const LOGO = path.join(ROOT, 'assets', 'logo.png');

// Helper to create a valid ICO file containing PNG streams
function createIcoFromPngs(pngBuffersWithSizes) {
  // pngBuffersWithSizes: Array of { width, height, buffer }
  const count = pngBuffersWithSizes.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = count * dirEntrySize;
  let offset = headerSize + dirSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  const imageBuffers = [];

  for (const item of pngBuffersWithSizes) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset to image data

    entries.push(entry);
    imageBuffers.push(item.buffer);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...imageBuffers]);
}

async function main() {
  console.log('Generating complete Favicon & Google Search Icon Suite...');

  // 1. Trim whitespace from original logo
  const trimmed = await sharp(LOGO).trim({ threshold: 10 }).toBuffer();

  // Resize to 330px width (leaving 91px margin on each side for circular safe-zone)
  // Distance from center to horizontal edge: 330 / 2 = 165px.
  // 165px / 256px = 64.5% of canvas radius!
  // This guarantees huge, comfortable breathing room in circular search chips!
  const logoResized = await sharp(trimmed)
    .resize(330, null, { fit: 'inside', kernel: 'lanczos3' })
    .toBuffer();

  const logoMeta = await sharp(logoResized).metadata();
  console.log('Centered logo dimensions:', logoMeta.width, 'x', logoMeta.height);

  // SVG badge template:
  // Ring at r=240 (leaves 16px outer safety bleed within 512)
  const badgeSvg = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" r="248" fill="#002b5c"/>
      <circle cx="256" cy="256" r="242" fill="#0284c7"/>
      <circle cx="256" cy="256" r="234" fill="#ffffff"/>
    </svg>
  `);

  // Master 512x512 PNG
  const master512 = await sharp(badgeSvg)
    .composite([
      { input: logoResized, gravity: 'center' }
    ])
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  // Save 512x512
  fs.writeFileSync(path.join(ROOT, 'favicon-512x512.png'), master512);

  // Save 192x192 (Android / PWA)
  const png192 = await sharp(master512).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(ROOT, 'favicon-192x192.png'), png192);

  // Save Apple Touch Icon (180x180)
  const appleTouch = await sharp(master512).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(ROOT, 'apple-touch-icon.png'), appleTouch);

  // Save 96x96
  const png96 = await sharp(master512).resize(96, 96).png().toBuffer();
  fs.writeFileSync(path.join(ROOT, 'favicon-96x96.png'), png96);

  // Save 48x48 (Google Search official baseline standard!)
  const png48 = await sharp(master512).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(ROOT, 'favicon-48x48.png'), png48);

  // Save 32x32
  const png32 = await sharp(master512).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(ROOT, 'favicon-32x32.png'), png32);

  // Save 16x16
  const png16 = await sharp(master512).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(ROOT, 'favicon-16x16.png'), png16);

  // Build root favicon.ico (16, 32, 48)
  const icoBuffer = createIcoFromPngs([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 }
  ]);
  fs.writeFileSync(path.join(ROOT, 'favicon.ico'), icoBuffer);

  // Also copy primary icons into assets/ for backward compatibility
  fs.writeFileSync(path.join(ROOT, 'assets', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(ROOT, 'assets', 'favicon-48x48.png'), png48);
  fs.writeFileSync(path.join(ROOT, 'assets', 'favicon-192x192.png'), png192);

  // Create site.webmanifest
  const manifest = {
    name: "A. Rehman & Sons — Commercial Chemicals",
    short_name: "ARS Chemicals",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    theme_color: "#002b5c",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/"
  };
  fs.writeFileSync(path.join(ROOT, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf-8');

  console.log('Successfully created complete Favicon Suite:');
  console.log(' - favicon.ico (16, 32, 48px)');
  console.log(' - favicon-48x48.png (Google Search Standard)');
  console.log(' - favicon-96x96.png');
  console.log(' - favicon-192x192.png');
  console.log(' - favicon-512x512.png');
  console.log(' - apple-touch-icon.png (180x180)');
  console.log(' - site.webmanifest');
}

main().catch(console.error);
