#!/usr/bin/env python3
"""
update_sitemap.py - Generates an exhaustive, high-priority sitemap.xml
covering the 8 main pages + 29 individual product pages.
"""

import os
import json
import subprocess

# Get products from node
node_cmd = 'node -e "const { ARS_PRODUCTS } = require(\'./js/products.js\'); console.log(JSON.stringify(ARS_PRODUCTS.map(p => ({ id: p.id, name: p.name }))));"'
res = subprocess.check_output(node_cmd, shell=True, text=True)
products = json.loads(res.strip())

sitemap_entries = [
    ("https://arschemicals.com/", "1.0", "weekly"),
    ("https://arschemicals.com/products.html", "0.95", "weekly"),
    ("https://arschemicals.com/international.html", "0.90", "monthly"),
    ("https://arschemicals.com/order.html", "0.85", "weekly"),
    ("https://arschemicals.com/certifications.html", "0.80", "monthly"),
    ("https://arschemicals.com/about.html", "0.80", "monthly"),
    ("https://arschemicals.com/clients.html", "0.80", "monthly"),
    ("https://arschemicals.com/contact.html", "0.80", "monthly"),
]

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    '',
    '  <!-- Main Canonical Pages -->'
]

for url, pri, freq in sitemap_entries:
    xml_lines.append(f'  <url>')
    xml_lines.append(f'    <loc>{url}</loc>')
    xml_lines.append(f'    <lastmod>2026-09-19</lastmod>')
    xml_lines.append(f'    <changefreq>{freq}</changefreq>')
    xml_lines.append(f'    <priority>{pri}</priority>')
    if url == "https://arschemicals.com/":
        xml_lines.append('    <image:image>')
        xml_lines.append('      <image:loc>https://arschemicals.com/assets/logo.png</image:loc>')
        xml_lines.append('      <image:title>A. Rehman &amp; Sons Logo</image:title>')
        xml_lines.append('    </image:image>')
    xml_lines.append(f'  </url>')

xml_lines.append('')
xml_lines.append('  <!-- Individual Commercial Chemical Product Pages (29 Formulations) -->')

for p in products:
    pid = p['id']
    pname = p['name']
    img_url = f"https://arschemicals.com/assets/products/mockups/{pid}.jpg"
    xml_lines.append(f'  <url>')
    xml_lines.append(f'    <loc>https://arschemicals.com/products/{pid}.html</loc>')
    xml_lines.append(f'    <lastmod>2026-09-19</lastmod>')
    xml_lines.append(f'    <changefreq>weekly</changefreq>')
    xml_lines.append(f'    <priority>0.85</priority>')
    xml_lines.append(f'    <image:image>')
    xml_lines.append(f'      <image:loc>{img_url}</image:loc>')
    xml_lines.append(f'      <image:title>{pname} Commercial Chemical Canister</image:title>')
    xml_lines.append(f'    </image:image>')
    xml_lines.append(f'  </url>')

xml_lines.append('</urlset>')
xml_lines.append('')

sitemap_content = '\n'.join(xml_lines)

sitemap_path = os.path.join(r"C:\Users\qasim.faridi\source\repos\a-rehman-sons-website", "sitemap.xml")
with open(sitemap_path, "w", encoding="utf-8") as f:
    f.write(sitemap_content)

print(f"Updated sitemap.xml with {len(sitemap_entries)} main pages and {len(products)} product pages (Total: {len(sitemap_entries) + len(products)} URLs).")
