#!/usr/bin/env python3
"""
enhance_seo.py - Comprehensive SEO Enhancer for arschemicals.com
Adds canonical URLs, Open Graph, Twitter Cards, Geo tags, and Schema.org JSON-LD
across all pages in the website.
"""

import os
import re

ROOT = r"C:\Users\qasim.faridi\source\repos\a-rehman-sons-website"

GEO_TAGS = """  <!-- Geo Location Meta Tags -->
  <meta name="geo.region" content="PK-PB">
  <meta name="geo.placename" content="Rawalpindi, Islamabad, Pakistan">
  <meta name="geo.position" content="33.5973;73.0479">
  <meta name="ICBM" content="33.5973, 73.0479">"""

SEO_DATA = {
    "about.html": {
        "title": "About A. Rehman & Sons | Commercial Chemical Manufacturer Since 1988",
        "description": "Learn about A. Rehman & Sons (ARS), Pakistan's leading ISO 9001 certified commercial chemical manufacturer since 1988 with purpose-built R&D and QC facilities in Rawalpindi.",
        "canonical": "https://arschemicals.com/about.html",
        "og_title": "About A. Rehman & Sons | Commercial Chemical Manufacturer Since 1988",
        "og_description": "Over 35 years of chemical manufacturing excellence in Rawalpindi, Pakistan. Supplying 5-star hotels, hospitals, and commercial laundries nationwide.",
        "schema": """  <!-- Schema.org JSON-LD: AboutPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About A. Rehman & Sons",
    "url": "https://arschemicals.com/about.html",
    "mainEntity": {
      "@type": "IndustrialSupplyStore",
      "name": "A. Rehman & Sons",
      "alternateName": "ARS Chemicals",
      "foundingDate": "1988",
      "description": "Manufacturer and imported chemical supplier in Rawalpindi, Pakistan specializing in commercial laundry, stewarding & kitchen, and institutional housekeeping chemicals since 1988.",
      "url": "https://arschemicals.com/",
      "logo": "https://arschemicals.com/assets/logo.png",
      "telephone": ["+92-51-5503203", "+92-321-8502997"],
      "email": "ar_sons@hotmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot # 152, Street # 1, Millat Colony",
        "addressLocality": "Rawalpindi",
        "addressRegion": "Punjab",
        "postalCode": "46000",
        "addressCountry": "PK"
      }
    }
  }
  </script>"""
    },
    "certifications.html": {
        "title": "Quality Certifications | ISO 9001, ISO 45001, HACCP & Halal | ARS Chemicals",
        "description": "View official quality certifications for A. Rehman & Sons including ISO 9001:2015, ISO 45001:2018, Halal certification, and HACCP compliance for institutional chemicals.",
        "canonical": "https://arschemicals.com/certifications.html",
        "og_title": "Quality Certifications | ISO 9001, ISO 45001, HACCP & Halal | ARS Chemicals",
        "og_description": "Certified chemical manufacturing standards: ISO 9001:2015, ISO 45001:2018, Halal certified, and HACCP compliant chemical formulations.",
        "schema": """  <!-- Schema.org JSON-LD: Certifications ItemPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": "A. Rehman & Sons Certifications & Quality Standards",
    "url": "https://arschemicals.com/certifications.html",
    "mainEntity": {
      "@type": "Organization",
      "name": "A. Rehman & Sons",
      "url": "https://arschemicals.com/",
      "hasCertification": [
        {
          "@type": "Certification",
          "name": "ISO 9001:2015 Quality Management System",
          "issuedBy": { "@type": "Organization", "name": "Global Certification Services" }
        },
        {
          "@type": "Certification",
          "name": "ISO 45001:2018 Occupational Health and Safety Management",
          "issuedBy": { "@type": "Organization", "name": "Global Certification Services" }
        },
        {
          "@type": "Certification",
          "name": "HACCP Food Safety Compliance",
          "issuedBy": { "@type": "Organization", "name": "HACCP Quality System" }
        },
        {
          "@type": "Certification",
          "name": "Halal Certification",
          "issuedBy": { "@type": "Organization", "name": "Punjab Halal Development Agency" }
        }
      ]
    }
  }
  </script>"""
    },
    "clients.html": {
        "title": "Client Portfolio & Institutional Partners | A. Rehman & Sons",
        "description": "Trusted by Pakistan's top hospitality and healthcare institutions: Serena Hotels, Islamabad Marriott, Pearl-Continental, Mövenpick, Shifa International Hospital.",
        "canonical": "https://arschemicals.com/clients.html",
        "og_title": "Client Portfolio & Institutional Partners | A. Rehman & Sons",
        "og_description": "Supplying Serena Hotels, Marriott Islamabad, Pearl-Continental, Mövenpick Karachi, and Shifa International Hospital with commercial hygiene chemicals.",
        "schema": """  <!-- Schema.org JSON-LD: Clients Portfolio -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": "A. Rehman & Sons Client Portfolio",
    "url": "https://arschemicals.com/clients.html",
    "mainEntity": {
      "@type": "Organization",
      "name": "A. Rehman & Sons",
      "url": "https://arschemicals.com/",
      "knowsAbout": ["Commercial Laundry Chemicals", "Hospital Disinfectants", "Hotel Kitchen Stewarding"],
      "sponsor": [
        { "@type": "Organization", "name": "Serena Hotels Pakistan" },
        { "@type": "Organization", "name": "Islamabad Marriott Hotel" },
        { "@type": "Organization", "name": "Pearl-Continental Hotels" },
        { "@type": "Organization", "name": "Shifa International Hospital" },
        { "@type": "Organization", "name": "Shaukat Khanum Memorial Cancer Hospital" }
      ]
    }
  }
  </script>"""
    },
    "contact.html": {
        "title": "Contact Us & Factory Location Rawalpindi | A. Rehman & Sons",
        "description": "Contact A. Rehman & Sons commercial chemical supplier in Rawalpindi, Pakistan. Direct sales desk: +92-51-5503203, WhatsApp: +92-321-8502997, email: ar_sons@hotmail.com.",
        "canonical": "https://arschemicals.com/contact.html",
        "og_title": "Contact Us & Factory Location Rawalpindi | A. Rehman & Sons",
        "og_description": "Direct chemical sales desk, factory warehouse, and procurement inquiries for commercial laundry, kitchen, and housekeeping chemicals in Rawalpindi.",
        "schema": """  <!-- Schema.org JSON-LD: ContactPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact A. Rehman & Sons",
    "url": "https://arschemicals.com/contact.html",
    "mainEntity": {
      "@type": "IndustrialSupplyStore",
      "name": "A. Rehman & Sons",
      "telephone": ["+92-51-5503203", "+92-321-8502997", "+92-333-2158113"],
      "email": "ar_sons@hotmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot # 152, Street # 1, Millat Colony",
        "addressLocality": "Rawalpindi",
        "addressRegion": "Punjab",
        "postalCode": "46000",
        "addressCountry": "PK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 33.5973,
        "longitude": 73.0479
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  }
  </script>"""
    },
    "order.html": {
        "title": "Request Commercial Chemical Quotation | A. Rehman & Sons (ARS)",
        "description": "Build your official commercial chemical quotation online for laundry, kitchen, and housekeeping chemicals. Factory direct rates from Rs. 80.00/Kg across Pakistan.",
        "canonical": "https://arschemicals.com/order.html",
        "og_title": "Request Commercial Chemical Quotation | A. Rehman & Sons (ARS)",
        "og_description": "Build your custom wholesale chemical quotation online. Instant calculation for 29 commercial laundry, kitchen, and housekeeping formulations.",
        "schema": """  <!-- Schema.org JSON-LD: Order/Quotation Page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CheckoutPage",
    "name": "A. Rehman & Sons Quotation Builder",
    "url": "https://arschemicals.com/order.html",
    "description": "Request an official wholesale commercial chemical quotation from A. Rehman & Sons.",
    "provider": {
      "@type": "IndustrialSupplyStore",
      "name": "A. Rehman & Sons",
      "url": "https://arschemicals.com/",
      "telephone": "+92-51-5503203",
      "priceRange": "Rs. 80 - Rs. 4000"
    }
  }
  </script>"""
    }
}

for page, data in SEO_DATA.items():
    fp = os.path.join(ROOT, page)
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()

    # Construct the complete head tags
    head_block = f"""  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{data['description']}">
  <meta name="author" content="A. Rehman &amp; Sons">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="{data['canonical']}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="A. Rehman &amp; Sons">
  <meta property="og:url" content="{data['canonical']}">
  <meta property="og:title" content="{data['og_title']}">
  <meta property="og:description" content="{data['og_description']}">
  <meta property="og:image" content="https://arschemicals.com/assets/logo.png">
  <meta property="og:locale" content="en_PK">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{data['og_title']}">
  <meta name="twitter:description" content="{data['og_description']}">
  <meta name="twitter:image" content="https://arschemicals.com/assets/logo.png">

{GEO_TAGS}

  <title>{data['title']}</title>
  <link rel="icon" href="assets/logo.png" type="image/png">
  <link rel="stylesheet" href="css/styles.css?v=5.2">

{data['schema']}"""

    # Replace <head>...</head> content cleanly
    # Find from <head> to </head>
    new_content = re.sub(
        r'<head>.*?</head>',
        f'<head>\n{head_block}\n</head>',
        content,
        flags=re.DOTALL
    )

    if new_content != content:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Enhanced SEO for {page}")
    else:
        print(f"No changes for {page}")

# Also update sitemap.xml lastmod date to current date (2026-09-19)
sitemap_path = os.path.join(ROOT, "sitemap.xml")
with open(sitemap_path, "r", encoding="utf-8") as f:
    sm = f.read()
new_sm = re.sub(r'<lastmod>[\d-]+</lastmod>', '<lastmod>2026-09-19</lastmod>', sm)
with open(sitemap_path, "w", encoding="utf-8") as f:
    f.write(new_sm)
print("Updated sitemap.xml lastmod to 2026-09-19")
