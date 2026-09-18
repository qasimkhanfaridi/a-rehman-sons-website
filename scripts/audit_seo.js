const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const htmlFiles = [
  'index.html', 'about.html', 'products.html', 'certifications.html',
  'clients.html', 'international.html', 'contact.html', 'order.html'
];

console.log('=== SEO AUDIT REPORT FOR ARSCHEMICALS.COM ===\n');

for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf-8');
  console.log(`--- [${file}] ---`);

  // Title
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'MISSING';
  console.log(`Title (${title.length} chars): ${title}`);

  // Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i);
  const desc = descMatch ? descMatch[1].trim() : 'MISSING';
  console.log(`Description (${desc.length} chars): ${desc.slice(0, 80)}...`);

  // Canonical
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canon = canonMatch ? canonMatch[1].trim() : 'MISSING';
  console.log(`Canonical: ${canon}`);

  // Open Graph
  const ogTitle = content.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
  const ogImage = content.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
  console.log(`OG Title: ${ogTitle ? 'YES' : 'NO'} | OG Image: ${ogImage ? ogImage[1] : 'NO'}`);

  // Schema.org JSON-LD
  const schemaMatches = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  if (schemaMatches) {
    console.log(`Structured Data (JSON-LD): ${schemaMatches.length} block(s) found`);
    schemaMatches.forEach((s, idx) => {
      try {
        const jsonText = s.replace(/<script\s+type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '');
        const parsed = JSON.parse(jsonText);
        const type = parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Unknown');
        console.log(`   Block ${idx + 1}: @type = ${type}`);
      } catch (err) {
        console.log(`   Block ${idx + 1}: JSON parse error: ${err.message}`);
      }
    });
  } else {
    console.log(`Structured Data (JSON-LD): NONE`);
  }

  // H1 tag check
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  console.log(`H1 Tags: ${h1Matches ? h1Matches.length : 0} found`);

  // Missing alt tags on img
  const imgMatches = content.match(/<img\s+[^>]*>/gi) || [];
  const missingAlt = imgMatches.filter(img => !img.includes('alt='));
  console.log(`Images: ${imgMatches.length} total, ${missingAlt.length} missing alt`);

  console.log('');
}
