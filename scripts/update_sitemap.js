const fs = require('fs');
const path = require('path');
const { ARS_PRODUCTS } = require('../js/products.js');

const sitemap_entries = [
  {
    url: "https://arschemicals.com/",
    pri: "1.0",
    freq: "weekly",
    imgs: [
      { loc: "https://arschemicals.com/assets/logo.png", title: "A. Rehman & Sons Logo" }
    ]
  },
  {
    url: "https://arschemicals.com/products.html",
    pri: "0.95",
    freq: "weekly",
    imgs: [
      { loc: "https://arschemicals.com/assets/logo.png", title: "ARS Commercial Chemical Catalog 22 Formulations" }
    ]
  },
  {
    url: "https://arschemicals.com/international.html",
    pri: "0.90",
    freq: "monthly",
    imgs: [
      { loc: "https://arschemicals.com/assets/backgrounds/industry-export.jpg", title: "ARS Bulk Chemical Sea-Freight Export Supply" }
    ]
  },
  {
    url: "https://arschemicals.com/order.html",
    pri: "0.85",
    freq: "weekly",
    imgs: []
  },
  {
    url: "https://arschemicals.com/certifications.html",
    pri: "0.80",
    freq: "monthly",
    imgs: []
  },
  {
    url: "https://arschemicals.com/about.html",
    pri: "0.80",
    freq: "monthly",
    imgs: [
      { loc: "https://arschemicals.com/assets/backgrounds/industry-rd-lab.jpg", title: "ARS QC & R&D Laboratories" },
      { loc: "https://arschemicals.com/assets/backgrounds/industry-wash-program.jpg", title: "ARS Wash-Program Technology" },
      { loc: "https://arschemicals.com/assets/backgrounds/industry-warehouse.jpg", title: "ARS Bulk Supply Logistics Warehouse" }
    ]
  },
  {
    url: "https://arschemicals.com/clients.html",
    pri: "0.80",
    freq: "monthly",
    imgs: [
      { loc: "https://arschemicals.com/assets/backgrounds/industry-hospitality.jpg", title: "ARS Luxury Hotel Chemical Supply" },
      { loc: "https://arschemicals.com/assets/backgrounds/industry-healthcare.jpg", title: "ARS Hospital Infection Control Supplies" },
      { loc: "https://arschemicals.com/assets/backgrounds/industry-kitchen.jpg", title: "ARS Commercial Kitchen Chemical Supplies" }
    ]
  },
  {
    url: "https://arschemicals.com/contact.html",
    pri: "0.80",
    freq: "monthly",
    imgs: []
  }
];

const xmlLines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  '',
  '  <!-- Main Canonical Pages -->'
];

for (const entry of sitemap_entries) {
  xmlLines.push('  <url>');
  xmlLines.push(`    <loc>${entry.url}</loc>`);
  xmlLines.push('    <lastmod>2026-09-22</lastmod>');
  xmlLines.push(`    <changefreq>${entry.freq}</changefreq>`);
  xmlLines.push(`    <priority>${entry.pri}</priority>`);
  for (const img of entry.imgs) {
    xmlLines.push('    <image:image>');
    xmlLines.push(`      <image:loc>${img.loc}</image:loc>`);
    xmlLines.push(`      <image:title>${img.title}</image:title>`);
    xmlLines.push('    </image:image>');
  }
  xmlLines.push('  </url>');
}

xmlLines.push('');
xmlLines.push('  <!-- Individual Commercial Chemical Product Pages (22 Formulations) -->');

for (const p of ARS_PRODUCTS) {
  const img5kg = `https://arschemicals.com/assets/products/mockups/5kg/${p.id}.jpg`;
  const img10kg = `https://arschemicals.com/assets/products/mockups/10kg/${p.id}.jpg`;
  const img25kg = `https://arschemicals.com/assets/products/mockups/${p.id}.jpg`;

  xmlLines.push('  <url>');
  xmlLines.push(`    <loc>https://arschemicals.com/products/${p.id}.html</loc>`);
  xmlLines.push('    <lastmod>2026-09-22</lastmod>');
  xmlLines.push('    <changefreq>weekly</changefreq>');
  xmlLines.push('    <priority>0.85</priority>');
  xmlLines.push('    <image:image>');
  xmlLines.push(`      <image:loc>${img5kg}</image:loc>`);
  xmlLines.push(`      <image:title>${p.name} 5 kg Canister with Red Safety Cap</image:title>`);
  xmlLines.push('    </image:image>');
  xmlLines.push('    <image:image>');
  xmlLines.push(`      <image:loc>${img10kg}</image:loc>`);
  xmlLines.push(`      <image:title>${p.name} 10 kg Stackable Commercial Canister</image:title>`);
  xmlLines.push('    </image:image>');
  xmlLines.push('    <image:image>');
  xmlLines.push(`      <image:loc>${img25kg}</image:loc>`);
  xmlLines.push(`      <image:title>${p.name} 25 kg Industrial Jerrycan</image:title>`);
  xmlLines.push('    </image:image>');
  xmlLines.push('  </url>');
}

xmlLines.push('</urlset>');
xmlLines.push('');

const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xmlLines.join('\n'), 'utf-8');

console.log(`Successfully generated sitemap.xml with 8 main pages and ${ARS_PRODUCTS.length} product pages.`);
