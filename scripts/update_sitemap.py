#!/usr/bin/env python3
"""
update_sitemap.py - Generates an exhaustive, high-priority sitemap.xml
covering the 8 main pages + 29 individual product pages with rich multi-pack image metadata.
"""

import os
import json
import subprocess

# Get products from node
node_cmd = 'node -e "const { ARS_PRODUCTS } = require(\'./js/products.js\'); console.log(JSON.stringify(ARS_PRODUCTS.map(p => ({ id: p.id, name: p.name }))));"'
res = subprocess.check_output(node_cmd, shell=True, text=True)
products = json.loads(res.strip())

sitemap_entries = [
    ("https://arschemicals.com/", "1.0", "weekly", [
        ("https://arschemicals.com/assets/logo.png", "A. Rehman & Sons Logo"),
        ("https://arschemicals.com/assets/hero-chemical-facility.jpg", "ARS Chemical Manufacturing Facility")
    ]),
    ("https://arschemicals.com/products.html", "0.95", "weekly", [
        ("https://arschemicals.com/assets/logo.png", "ARS Commercial Chemical Catalog 29 Formulations")
    ]),
    ("https://arschemicals.com/international.html", "0.90", "monthly", [
        ("https://arschemicals.com/assets/backgrounds/industry-export.jpg", "ARS Bulk Chemical Sea-Freight Export Supply")
    ]),
    ("https://arschemicals.com/order.html", "0.85", "weekly", []),
    ("https://arschemicals.com/certifications.html", "0.80", "monthly", []),
    ("https://arschemicals.com/about.html", "0.80", "monthly", [
        ("https://arschemicals.com/assets/backgrounds/industry-rd-lab.jpg", "ARS QC & R&D Laboratories"),
        ("https://arschemicals.com/assets/backgrounds/industry-wash-program.jpg", "ARS Wash-Program Technology"),
        ("https://arschemicals.com/assets/backgrounds/industry-warehouse.jpg", "ARS Bulk Supply Logistics Warehouse")
    ]),
    ("https://arschemicals.com/clients.html", "0.80", "monthly", [
        ("https://arschemicals.com/assets/backgrounds/industry-hospitality.jpg", "ARS Luxury Hotel Chemical Supply"),
        ("https://arschemicals.com/assets/backgrounds/industry-healthcare.jpg", "ARS Hospital Infection Control Supplies"),
        ("https://arschemicals.com/assets/backgrounds/industry-kitchen.jpg", "ARS Commercial Kitchen Chemical Supplies")
    ]),
    ("https://arschemicals.com/contact.html", "0.80", "monthly", []),
]

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    '',
    '  <!-- Main Canonical Pages -->'
]

for url, pri, freq, imgs in sitemap_entries:
    xml_lines.append(f'  <url>')
    xml_lines.append(f'    <loc>{url}</loc>')
    xml_lines.append(f'    <lastmod>2026-09-22</lastmod>')
    xml_lines.append(f'    <changefreq>{freq}</changefreq>')
    xml_lines.append(f'    <priority>{pri}</priority>')
    for img_loc, img_title in imgs:
        xml_lines.append('    <image:image>')
        xml_lines.append(f'      <image:loc>{img_loc}</image:loc>')
        xml_lines.append(f'      <image:title>{img_title}</image:title>')
        xml_lines.append('    </image:image>')
    xml_lines.append(f'  </url>')

xml_lines.append('')
xml_lines.append('  <!-- Individual Commercial Chemical Product Pages (29 Formulations) -->')

for p in products:
    pid = p['id']
    pname = p['name']
    img_5kg = f"https://arschemicals.com/assets/products/mockups/5kg/{pid}.jpg"
    img_25kg = f"https://arschemicals.com/assets/products/mockups/{pid}.jpg"
    
    xml_lines.append(f'  <url>')
    xml_lines.append(f'    <loc>https://arschemicals.com/products/{pid}.html</loc>')
    xml_lines.append(f'    <lastmod>2026-09-22</lastmod>')
    xml_lines.append(f'    <changefreq>weekly</changefreq>')
    xml_lines.append(f'    <priority>0.85</priority>')
    xml_lines.append(f'    <image:image>')
    xml_lines.append(f'      <image:loc>{img_5kg}</image:loc>')
    xml_lines.append(f'      <image:title>{pname} 5 kg Canister with Red Safety Cap</image:title>')
    xml_lines.append(f'    </image:image>')
    xml_lines.append(f'    <image:image>')
    xml_lines.append(f'      <image:loc>{img_25kg}</image:loc>')
    xml_lines.append(f'      <image:title>{pname} 25 kg Industrial Jerrycan</image:title>')
    xml_lines.append(f'    </image:image>')
    xml_lines.append(f'  </url>')

xml_lines.append('</urlset>')
xml_lines.append('')

sitemap_path = os.path.join(os.path.dirname(__file__), '..', 'sitemap.xml')
with open(sitemap_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml_lines))

print(f"Successfully generated sitemap.xml with 8 main pages and {len(products)} product pages with multi-pack image metadata.")
