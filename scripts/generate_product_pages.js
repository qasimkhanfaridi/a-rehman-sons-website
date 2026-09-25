const fs = require('fs');
const path = require('path');
const { ARS_PRODUCTS, ARS_CATEGORIES } = require('../js/products.js');

const ROOT = path.join(__dirname, '..');
const PRODUCTS_DIR = path.join(ROOT, 'products');

if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const categoryLabels = {
  laundry: "Commercial Laundry Chemicals",
  kitchen: "Kitchen & Stewarding Chemicals",
  stewarding: "Stewarding & Potwash Chemicals",
  housekeeping: "Housekeeping & Facility Care Chemicals"
};

const categoryShort = {
  laundry: "Laundry",
  kitchen: "Kitchen",
  stewarding: "Stewarding",
  housekeeping: "Housekeeping"
};

let generatedCount = 0;

for (const product of ARS_PRODUCTS) {
  const catLabel = categoryLabels[product.category] || "Commercial Chemicals";
  const catShort = categoryShort[product.category] || "Chemicals";
  const details = product.fullDetails || {};
  
  // Packaging Image Variants
  const mock5kgRel = `assets/products/mockups/5kg/${product.id}.jpg`;
  const has5kg = fs.existsSync(path.join(ROOT, mock5kgRel));
  const img5kg = has5kg ? `../${mock5kgRel}?v=7.0` : `../assets/products/mockups/${product.id}.jpg?v=7.0`;

  const mock10kgRel = `assets/products/mockups/10kg/${product.id}.jpg`;
  const has10kg = fs.existsSync(path.join(ROOT, mock10kgRel));
  const img10kg = has10kg ? `../${mock10kgRel}?v=7.0` : `../assets/products/packaging/canister-10kg.jpg?v=7.0`;

  const mock25kgRel = `assets/products/mockups/${product.id}.jpg`;
  const has25kg = fs.existsSync(path.join(ROOT, mock25kgRel));
  const img25kg = has25kg ? `../${mock25kgRel}?v=7.0` : img5kg;

  const img200kg = `../assets/products/packaging/drum-200kg.jpg?v=7.0`;

  let imgInUse = `../assets/backgrounds/industry-wash-program.jpg`;
  let inUseLabel = `Commercial Laundry Tunnel & Washhouse`;
  if (product.category === 'kitchen' || product.category === 'stewarding') {
    imgInUse = `../assets/backgrounds/industry-kitchen.jpg`;
    inUseLabel = `5-Star Commercial Kitchen & Stewarding`;
  } else if (product.category === 'housekeeping') {
    imgInUse = `../assets/backgrounds/industry-hospitality.jpg`;
    inUseLabel = `Luxury Hotel & Institutional Housekeeping`;
  }

  const canonicalUrl = `https://arschemicals.com/products/${product.id}.html`;

  // Related products from same category
  const related = ARS_PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // Genuine technical FAQs per product
  const faqs = [
    {
      q: `What is the standard commercial dilution ratio for ${product.name}?`,
      a: `${product.name} is formulated for commercial efficiency. Standard dosage is: ${details.dosage || "Refer to technical data sheet for optimal dilution"}. Adjust concentration based on soil intensity and water hardness.`
    },
    {
      q: `What commercial institutions commonly use ${product.name}?`,
      a: `${product.name} is widely supplied to 5-star hotels, tertiary hospitals, commercial laundries, and institutional facilities across Rawalpindi, Islamabad, Lahore, Karachi, and nationwide.`
    },
    {
      q: `What packaging sizes are available for ${product.name}?`,
      a: `All formulations are available in 4 standard commercial packaging options: 5 kg cans (with red safety cap), 10 kg containers, 25 kg sealed HDPE jerricans, and 200 kg bulk industrial drums.`
    },
    {
      q: `How can I request a sample or quotation for ${product.name}?`,
      a: `You can add ${product.name} directly to our online Quotation Builder, contact our sales desk at +92 51 5503203, or message our direct procurement team on WhatsApp at +92 331 8502997.`
    }
  ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Buy ${escapeHtml(product.name)} commercial ${catShort.toLowerCase()} chemical in Pakistan. Official supplier A. Rehman &amp; Sons, Rawalpindi. 5 kg, 10 kg, 25 kg, and 200 kg packaging with factory-direct wholesale pricing upon quotation.">
  <meta name="keywords" content="${escapeHtml(product.name.toLowerCase())}, ${catShort.toLowerCase()} chemicals pakistan, commercial chemical supplier rawalpindi, institutional cleaning supplies islamabad, chemical manufacturer pakistan">
  <meta name="author" content="A. Rehman &amp; Sons">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="A. Rehman &amp; Sons">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(product.name)} | ${escapeHtml(catLabel)} | ARS Chemicals">
  <meta property="og:description" content="${escapeHtml(product.description)} Factory-direct commercial wholesale pricing upon quotation.">
  <meta property="og:image" content="https://arschemicals.com/${mock5kgRel}?v=7.0">
  <meta property="og:locale" content="en_PK">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(product.name)} | ARS Chemicals Pakistan">
  <meta name="twitter:description" content="${escapeHtml(product.description)} Factory-direct commercial wholesale pricing upon quotation.">
  <meta name="twitter:image" content="https://arschemicals.com/${mock5kgRel}?v=7.0">

  <!-- Geo Location Meta Tags -->
  <meta name="geo.region" content="PK-PB">
  <meta name="geo.placename" content="Rawalpindi, Islamabad, Pakistan">
  <meta name="geo.position" content="33.5973;73.0479">
  <meta name="ICBM" content="33.5973, 73.0479">

  <!-- Favicon & Touch Icons (Google Search & Multi-Device Optimized) -->
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#002b5c">
  <link rel="stylesheet" href="../css/styles.css?v=6.0">

  <!-- Inlined Product Gallery CSS for Zero Cache Delay -->
  <style>
    .product-gallery-card {
      background: #f8fafc; border: 1px solid var(--border); border-radius: 18px; padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); position: relative; display: flex; flex-direction: column; gap: 1.25rem;
    }
    .gallery-size-tabs {
      display: flex; flex-wrap: wrap; gap: 0.45rem; padding-bottom: 0.85rem; border-bottom: 1px solid #e2e8f0;
    }
    .gallery-size-tab {
      background: #ffffff; border: 1px solid #cbd5e1; color: #334155; font-size: 0.78rem; font-weight: 700;
      padding: 0.45rem 0.85rem; border-radius: 9999px; cursor: pointer; transition: all 0.2s ease;
      display: inline-flex; align-items: center; gap: 0.4rem; line-height: 1.2;
    }
    .gallery-size-tab:hover { border-color: var(--blue); color: var(--blue); background: #f0f9ff; }
    .gallery-size-tab.active {
      background: var(--navy); color: #ffffff; border-color: var(--navy); box-shadow: 0 2px 8px rgba(0, 43, 92, 0.25);
    }
    .gallery-main-view {
      position: relative; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px;
      min-height: 380px; max-height: 440px; display: flex; align-items: center; justify-content: center;
      padding: 1.5rem; overflow: hidden;
    }
    .gallery-main-view img {
      max-height: 380px; width: auto; max-width: 100%; object-fit: contain;
      filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.14)); transition: opacity 0.2s ease, transform 0.25s ease;
    }
    .gallery-main-view img.fade-out { opacity: 0.15; transform: scale(0.96); }
    .gallery-badge {
      position: absolute; top: 1rem; left: 1rem; background: rgba(15, 23, 42, 0.88); backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2); color: #38bdf8; font-size: 0.72rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.05em; padding: 0.35rem 0.75rem; border-radius: 9999px;
      z-index: 2; display: inline-flex; align-items: center; gap: 0.35rem;
    }
    .gallery-sno {
      position: absolute; top: 1rem; right: 1rem; background: var(--navy); color: #ffffff; font-size: 0.72rem;
      font-weight: 700; padding: 0.35rem 0.75rem; border-radius: 9999px; z-index: 2;
    }
    .gallery-thumbs {
      display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.65rem;
    }
    .gallery-thumb {
      background: #ffffff; border: 2px solid #e2e8f0; border-radius: 10px; padding: 0.4rem; cursor: pointer;
      transition: all 0.2s ease; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; text-align: center;
    }
    .gallery-thumb:hover { border-color: var(--blue-light); transform: translateY(-2px); }
    .gallery-thumb.active {
      border-color: var(--blue); background: #f0f9ff; box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.2);
    }
    .gallery-thumb img { width: 100%; height: 52px; object-fit: contain; border-radius: 4px; }
    .gallery-thumb span { font-size: 0.68rem; font-weight: 700; color: #475569; line-height: 1.1; white-space: nowrap; }
    .gallery-thumb.active span { color: var(--navy); }
    .pack-spec-bar {
      background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.85rem 1rem;
      font-size: 0.8rem; color: #475569; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem;
    }
    .pack-spec-bar div { display: flex; flex-direction: column; gap: 0.15rem; }
    .pack-spec-bar strong { color: var(--navy); font-size: 0.84rem; }
    .pack-spec-bar span { font-size: 0.72rem; color: #64748b; text-transform: uppercase; font-weight: 600; }
  </style>

  <!-- Schema.org JSON-LD: Product -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "${escapeHtml(product.name)}",
    "image": [
      "https://arschemicals.com/${mock5kgRel}",
      "https://arschemicals.com/${mock10kgRel}",
      "https://arschemicals.com/${mock25kgRel}",
      "https://arschemicals.com/assets/products/packaging/drum-200kg.jpg"
    ],
    "description": "${escapeHtml(product.description)}",
    "sku": "ARS-${product.sNo}",
    "mpn": "${product.id}",
    "brand": {
      "@type": "Brand",
      "name": "A. Rehman & Sons"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "A. Rehman & Sons",
      "url": "https://arschemicals.com/"
    }
  }
  </script>

  <!-- Schema.org JSON-LD: BreadcrumbList -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://arschemicals.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Chemical Products",
        "item": "https://arschemicals.com/products.html"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${escapeHtml(catLabel)}",
        "item": "https://arschemicals.com/products.html?cat=${product.category}"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "${escapeHtml(product.name)}",
        "item": "${canonicalUrl}"
      }
    ]
  }
  </script>

  <!-- Schema.org JSON-LD: FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ${faqs.map(f => `{
        "@type": "Question",
        "name": "${escapeHtml(f.q)}",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${escapeHtml(f.a)}"
        }
      }`).join(',\n      ')}
    ]
  }
  </script>
</head>
<body>

  <!-- Top bar -->
  <div class="top-bar">
    <div class="container top-bar-inner">
      <span>Est. 1988 · Rawalpindi, Pakistan · Purpose-Built Manufacturing &amp; Warehouse</span>
      <span>
        Tel: 051-5503203 &nbsp;|&nbsp;
        WhatsApp: 0331-8502997 &nbsp;|&nbsp;
        <a href="mailto:ar_sons@hotmail.com">ar_sons@hotmail.com</a>
      </span>
    </div>
  </div>

  <!-- Header -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="../index.html" class="brand">
        <img src="../assets/logo.png" alt="A. Rehman &amp; Sons ARS Logo" class="brand-logo" width="72" height="72">
        <div class="brand-text">
          <span class="brand-title">A. REHMAN &amp; SONS</span>
          <p>Chemical &amp; General Order Supplier</p>
        </div>
      </a>
      <nav class="nav" id="main-nav">
        <a href="../index.html">Home</a>
        <a href="../about.html">About</a>
        <div class="nav-dropdown-wrap">
          <button type="button" class="nav-dropdown-trigger active" aria-expanded="false">Products</button>
          <div class="nav-dropdown-menu" role="menu">
            <a href="../products.html" role="menuitem">All Products (22)</a>
            <a href="../products.html?cat=laundry" role="menuitem">Laundry (9)</a>
            <a href="../products.html?cat=kitchen" role="menuitem">Kitchen (7)</a>
            <a href="../products.html?cat=stewarding" role="menuitem">Stewarding (7)</a>
            <a href="../products.html?cat=housekeeping" role="menuitem">Housekeeping (6)</a>
          </div>
        </div>
        <a href="../certifications.html">Certifications</a>
        <a href="../clients.html">Industries</a>
        <a href="../international.html">Export</a>
        <a href="../contact.html">Contact</a>
        <a href="../order.html" class="nav-cta">Quote</a>
      </nav>
      <button class="nav-mobile-toggle" id="nav-mobile-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="main-nav">
        <svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  </header>

  <!-- Breadcrumb Banner -->
  <section class="page-banner" style="background: linear-gradient(135deg, #001a33 0%, #003366 100%); padding: 1.75rem 0 1.5rem;">
    <div class="container page-banner-inner">
      <div class="breadcrumb" style="font-size: 0.85rem; color: rgba(255,255,255,0.75); margin-bottom: 0.5rem;">
        <a href="../index.html" style="color: #93c5fd; text-decoration: none;">Home</a> <span>/</span> 
        <a href="../products.html" style="color: #93c5fd; text-decoration: none;">Products</a> <span>/</span> 
        <a href="../products.html?cat=${product.category}" style="color: #93c5fd; text-decoration: none;">${escapeHtml(catShort)}</a> <span>/</span> 
        <strong style="color: #fff;">${escapeHtml(product.name)}</strong>
      </div>
    </div>
  </section>

  <!-- Product Detail Showcase -->
  <main class="section" style="padding: 3rem 0;">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 3rem; align-items: start; margin-bottom: 3.5rem;">
        
        <!-- Multi-View Product Gallery & Packaging Selector -->
        <div class="product-gallery-card">
          <!-- Size Selector Tabs -->
          <div class="gallery-size-tabs" role="tablist" aria-label="Product packaging size options">
            <button type="button" class="gallery-size-tab active" data-key="5kg" onclick="switchPackView('5kg')">
              <span>🧴 5 kg</span> (Safety Cap)
            </button>
            <button type="button" class="gallery-size-tab" data-key="10kg" onclick="switchPackView('10kg')">
              <span>🛢️ 10 kg</span> (Stackable)
            </button>
            <button type="button" class="gallery-size-tab" data-key="25kg" onclick="switchPackView('25kg')">
              <span>📦 25 kg</span> (Industrial)
            </button>
            <button type="button" class="gallery-size-tab" data-key="200kg" onclick="switchPackView('200kg')">
              <span>🏭 200 kg</span> (Bulk Drum)
            </button>
            <button type="button" class="gallery-size-tab" data-key="inuse" onclick="switchPackView('inuse')">
              <span>🏢 In-Use</span>
            </button>
          </div>

          <!-- Main Showcase Image -->
          <div class="gallery-main-view">
            <span class="gallery-badge">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>
              <span id="gallery-badge-text">5 KG · Red Safety Seal Canister</span>
            </span>
            <span class="gallery-sno">S.No ${product.sNo}</span>
            <img id="gallery-main-img" src="${img5kg}" alt="${escapeHtml(product.name)} 5 kg commercial canister" width="400" height="400">
          </div>

          <!-- Thumbnail Strip -->
          <div class="gallery-thumbs" aria-label="Select packaging format">
            <div class="gallery-thumb active" data-key="5kg" onclick="switchPackView('5kg')">
              <img src="${img5kg}" alt="5 kg canister thumbnail">
              <span>5 kg Can</span>
            </div>
            <div class="gallery-thumb" data-key="10kg" onclick="switchPackView('10kg')">
              <img src="${img10kg}" alt="10 kg canister thumbnail">
              <span>10 kg Can</span>
            </div>
            <div class="gallery-thumb" data-key="25kg" onclick="switchPackView('25kg')">
              <img src="${img25kg}" alt="25 kg jerrycan thumbnail">
              <span>25 kg Can</span>
            </div>
            <div class="gallery-thumb" data-key="200kg" onclick="switchPackView('200kg')">
              <img src="${img200kg}" alt="200 kg drum thumbnail">
              <span>200 kg Drum</span>
            </div>
            <div class="gallery-thumb" data-key="inuse" onclick="switchPackView('inuse')">
              <img src="${imgInUse}" alt="Commercial in-use facility thumbnail">
              <span>In-Use</span>
            </div>
          </div>

          <!-- Packaging Technical Specs -->
          <div class="pack-spec-bar">
            <div>
              <span>Container Material</span>
              <strong id="pack-spec-material">Food-Grade HDPE Container</strong>
            </div>
            <div>
              <span>Closure &amp; Seal</span>
              <strong id="pack-spec-closure">Tamper-Evident Red Safety Cap + Induction Seal</strong>
            </div>
            <div>
              <span>Gross Weight</span>
              <strong id="pack-spec-weight">Approx. 5.3 kg per Unit</strong>
            </div>
            <div>
              <span>Packing Format</span>
              <strong id="pack-spec-config">4 x 5 kg per Master Carton (20 kg)</strong>
            </div>
          </div>

          <!-- Institutional Trust Badges -->
          <div style="font-size: 0.8rem; color: var(--gray-600); display: flex; align-items: center; justify-content: center; gap: 0.85rem; flex-wrap: wrap; padding-top: 0.25rem;">
            <span>🛡️ ISO 9001:2015</span>
            <span>✅ Halal Certified</span>
            <span>🧪 Commercial Grade</span>
            <span>⚡ UN Packaging</span>
          </div>
        </div>

        <!-- Product Information & Order CTA -->
        <div>
          <span style="display: inline-block; background: #e0f2fe; color: #0369a1; font-weight: 700; font-size: 0.82rem; padding: 0.25rem 0.75rem; border-radius: 6px; margin-bottom: 0.75rem; text-transform: uppercase;">
            ${escapeHtml(catLabel)}
          </span>
          <h1 style="font-size: 2.2rem; color: var(--navy); margin-bottom: 0.75rem; line-height: 1.2;">
            ${escapeHtml(product.name)}
          </h1>
          <p style="font-size: 1.15rem; color: var(--gray-800); line-height: 1.6; margin-bottom: 1.25rem;">
            ${escapeHtml(product.description)}
          </p>

          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1.75rem;">
            <div style="font-size: 0.85rem; color: #0369a1; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Commercial Supply &amp; Quotation</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--navy); margin: 0.25rem 0;">
              Wholesale Pricing Upon Quotation
            </div>
            <div style="font-size: 0.85rem; color: var(--gray-600);">
              Standard Packaging Sizes: <strong>5 kg, 10 kg, 25 kg, 200 kg Bulk Drum</strong> · Free delivery across Rawalpindi &amp; Islamabad · Nationwide &amp; Export dispatch daily.
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div style="display: flex; flex-wrap: wrap; gap: 0.85rem; margin-bottom: 2rem;">
            <a href="../order.html?add=${product.id}" class="btn btn-primary" style="padding: 0.9rem 1.5rem; font-size: 1.05rem; font-weight: 700;">
              📋 Add to Quotation Builder
            </a>
            <a href="https://wa.me/923318502997?text=Hello%20ARS,%20I%20would%20like%20to%20inquire%20about%20commercial%20procurement%20of%20${encodeURIComponent(product.name)}" target="_blank" rel="noopener" class="btn" style="background: #25d366; color: #fff; padding: 0.9rem 1.5rem; font-size: 1.05rem; font-weight: 700; border: none;">
              💬 Inquire via WhatsApp
            </a>
            <a href="tel:0515503203" class="btn btn-outline" style="padding: 0.9rem 1.25rem;">
              📞 Call: 051-5503203
            </a>
          </div>

          <!-- Quick Spec Badges -->
          <div style="border-top: 1px solid var(--border); padding-top: 1.25rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--gray-600); font-weight: 600; display: block;">Dosage / Dilution</span>
              <strong style="color: var(--navy); font-size: 0.9rem;">${escapeHtml(details.dosage || "Refer to Tech Sheet")}</strong>
            </div>
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--gray-600); font-weight: 600; display: block;">pH Value</span>
              <strong style="color: var(--navy); font-size: 0.9rem;">${escapeHtml(details.ph || "Industrial Formulated")}</strong>
            </div>
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--gray-600); font-weight: 600; display: block;">Active Formula</span>
              <strong style="color: var(--navy); font-size: 0.9rem;">${escapeHtml((details.activeIngredients || "Proprietary Complex").slice(0, 45))}...</strong>
            </div>
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--gray-600); font-weight: 600; display: block;">Packaging Options</span>
              <strong style="color: var(--navy); font-size: 0.9rem;">5 kg, 10 kg, 25 kg, 200 kg Drum</strong>
            </div>
          </div>

        </div>
      </div>

      <!-- Technical Specifications & Applications -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; margin-bottom: 3.5rem;">
        
        <!-- Applications Card -->
        <div style="background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 2rem; box-shadow: var(--shadow-sm);">
          <h2 style="font-size: 1.35rem; color: var(--navy); margin-bottom: 1rem;">
            🧪 Commercial Applications
          </h2>
          <p style="color: var(--gray-800); line-height: 1.6; margin-bottom: 1.25rem;">
            ${escapeHtml(details.applications || product.description)}
          </p>
          <h3 style="font-size: 1.05rem; color: var(--navy); margin-bottom: 0.75rem;">Suitable For:</h3>
          <ul style="padding-left: 1.25rem; color: var(--gray-800); line-height: 1.8;">
            <li><strong>5-Star Hotels &amp; Resorts:</strong> Guest linen, kitchen rotisseries, and banquet tableware</li>
            <li><strong>Hospitals &amp; Healthcare:</strong> Medical ward linen, surgical scrubs, and sanitized surfaces</li>
            <li><strong>Commercial Laundries:</strong> High-capacity washer-extractors and continuous batch tunnels</li>
            <li><strong>Industrial Kitchens:</strong> Heavy grease hood baffles, dishwashers, and food-prep areas</li>
          </ul>
        </div>

        <!-- Technical Data & Safety Card -->
        <div style="background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 2rem; box-shadow: var(--shadow-sm);">
          <h2 style="font-size: 1.35rem; color: var(--navy); margin-bottom: 1rem;">
            🛡️ Safety &amp; Handling Guidelines
          </h2>
          <p style="color: var(--gray-800); line-height: 1.6; margin-bottom: 1.25rem;">
            ${escapeHtml(details.safety || "Follow standard commercial chemical safety protocols. Wear gloves and protective eyewear when handling concentrates.")}
          </p>
          <h3 style="font-size: 1.05rem; color: var(--navy); margin-bottom: 0.75rem;">Storage &amp; Transport:</h3>
          <ul style="padding-left: 1.25rem; color: var(--gray-800); line-height: 1.8;">
            <li>Store in original UN-approved heavy-duty HDPE jerrican containers.</li>
            <li>Keep in a cool, well-ventilated dry warehouse away from direct sunlight.</li>
            <li>Keep container tightly sealed when not in active commercial dosing.</li>
            <li>Material Safety Data Sheet (MSDS / SDS) available on technical request.</li>
          </ul>
        </div>

      </div>

      <!-- FAQ Section -->
      <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 16px; padding: 2.5rem; margin-bottom: 3.5rem;">
        <h2 style="font-size: 1.6rem; color: var(--navy); margin-bottom: 1.5rem; text-align: center;">
          Frequently Asked Questions About ${escapeHtml(product.name)}
        </h2>
        <div style="display: grid; gap: 1.25rem; max-width: 850px; margin: 0 auto;">
          ${faqs.map(f => `
          <div style="background: #fff; border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem 1.5rem;">
            <h3 style="font-size: 1.05rem; color: var(--navy); margin-bottom: 0.5rem;">${escapeHtml(f.q)}</h3>
            <p style="color: var(--gray-600); line-height: 1.6; margin: 0;">${escapeHtml(f.a)}</p>
          </div>`).join('')}
        </div>
      </div>

      <!-- Related Products from same category -->
      ${related.length > 0 ? `
      <div>
        <h2 style="font-size: 1.5rem; color: var(--navy); margin-bottom: 1.5rem;">
          Related ${escapeHtml(catShort)} Formulations
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          ${related.map(r => `
          <div style="background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span style="font-size: 0.75rem; color: var(--blue); font-weight: 700; text-transform: uppercase;">S.No ${r.sNo}</span>
              <h3 style="font-size: 1.15rem; color: var(--navy); margin: 0.25rem 0 0.5rem;">${escapeHtml(r.name)}</h3>
              <p style="font-size: 0.88rem; color: var(--gray-600); line-height: 1.5; margin-bottom: 1rem;">${escapeHtml(r.description)}</p>
            </div>
            <div>
              <div style="font-weight: 700; color: var(--navy); font-size: 0.92rem; margin-bottom: 0.75rem;">Sizes: 5 kg, 10 kg, 25 kg, 200 kg · Wholesale Quote</div>
              <div style="display: flex; gap: 0.5rem;">
                <a href="${r.id}.html" class="btn btn-outline" style="flex: 1; text-align: center; padding: 0.5rem; font-size: 0.85rem;">View Specs</a>
                <a href="../order.html?add=${r.id}" class="btn btn-primary" style="padding: 0.5rem 0.85rem; font-size: 0.85rem;">+ Quote</a>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>` : ''}

    </div>
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-col">
        <h3>A. REHMAN &amp; SONS</h3>
        <p>Commercial Chemical &amp; General Order Supplier since 1988. ISO 9001:2015, ISO 45001:2018, Halal Certified &amp; HACCP Compliant.</p>
        <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--gray-500);">
          Factory: Plot # 152, Street # 1, Millat Colony, Rawalpindi, Pakistan.
        </p>
      </div>
      <div class="footer-col">
        <h4>Chemical Divisions</h4>
        <ul>
          <li><a href="../products.html?cat=laundry">Commercial Laundry Chemicals (9)</a></li>
          <li><a href="../products.html?cat=kitchen">Kitchen Stewarding Detergents (7)</a></li>
          <li><a href="../products.html?cat=housekeeping">Housekeeping &amp; Floor Care (6)</a></li>
          <li><a href="../international.html">Global Bulk Sea-Freight Export</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Procurement &amp; Orders</h4>
        <ul>
          <li><a href="../order.html">Online Quotation Builder</a></li>
          <li><a href="../certifications.html">Quality Accreditations</a></li>
          <li><a href="../clients.html">Institutional Clientele</a></li>
          <li><a href="../contact.html">Contact Rawalpindi Sales Desk</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Direct Procurement Contact</h4>
        <p>Tel: 051-5503203<br>WhatsApp: 0331-8502997<br>Email: ar_sons@hotmail.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <span>&copy; 1988–2026 A. Rehman &amp; Sons · All Rights Reserved.</span>
        <span>Rawalpindi, Pakistan · Est. 1988 · ISO 9001 · ISO 45001 · HACCP · Halal</span>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp -->
  <a href="https://wa.me/923318502997?text=Hello%20ARS,%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}" target="_blank" rel="noopener" class="fab-whatsapp" aria-label="Order on WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>

  <!-- Interactive Gallery Switcher Script -->
  <script>
    const PACK_VARIANTS = {
      "5kg": {
        src: "${img5kg}",
        badge: "5 KG · Red Safety Seal Canister",
        alt: "${escapeHtml(product.name)} 5 kg commercial canister",
        material: "Food-Grade HDPE Container",
        closure: "Tamper-Evident Red Safety Cap + Induction Seal",
        weight: "Approx. 5.3 kg per Unit",
        config: "4 x 5 kg per Master Carton (20 kg)"
      },
      "10kg": {
        src: "${img10kg}",
        badge: "10 KG · Ergonomic Stackable Jerrycan",
        alt: "${escapeHtml(product.name)} 10 kg commercial canister",
        material: "High-Density Polyethylene (HDPE)",
        closure: "Heavy-Duty Ribbed Cap + Inner Plug",
        weight: "Approx. 10.6 kg per Unit",
        config: "2 x 10 kg per Carton / Palletized"
      },
      "25kg": {
        src: "${img25kg}",
        badge: "25 KG · Industrial Heavy-Duty Jerrycan",
        alt: "${escapeHtml(product.name)} 25 kg industrial jerrycan",
        material: "UN-Approved Industrial HDPE Jerrycan",
        closure: "Tamper-Proof Vented / Solid Cap",
        weight: "Approx. 26.2 kg per Unit",
        config: "Palletized (32 Cans / 800 kg per Pallet)"
      },
      "200kg": {
        src: "${img200kg}",
        badge: "200 KG · High-Capacity Bulk Drum",
        alt: "${escapeHtml(product.name)} 200 kg bulk chemical drum",
        material: "UN1760 Tight-Head High-Density Drum",
        closure: "Dual 2 Inch Bung Plugs with Poly Gaskets",
        weight: "Approx. 210 kg per Drum",
        config: "4 Drums per Industrial Pallet"
      },
      "inuse": {
        src: "${imgInUse}",
        badge: "Facility In-Use · Commercial Operation",
        alt: "${escapeHtml(product.name)} commercial application in ${escapeHtml(inUseLabel)}",
        material: "${escapeHtml(inUseLabel)}",
        closure: "Automated Dosing Injection & Manual Station",
        weight: "High-Efficiency Concentrated Dispensing",
        config: "Standard Operating Procedure Applied"
      }
    };

    function switchPackView(key) {
      const data = PACK_VARIANTS[key];
      if (!data) return;

      // Update active state on tabs
      document.querySelectorAll('.gallery-size-tab').forEach(function(tab) {
        tab.classList.toggle('active', tab.getAttribute('data-key') === key);
      });

      // Update active state on thumbnails
      document.querySelectorAll('.gallery-thumb').forEach(function(thumb) {
        thumb.classList.toggle('active', thumb.getAttribute('data-key') === key);
      });

      // Smooth crossfade on image
      var mainImg = document.getElementById('gallery-main-img');
      if (mainImg) {
        mainImg.classList.add('fade-out');
        setTimeout(function() {
          mainImg.src = data.src;
          mainImg.alt = data.alt;
          mainImg.classList.remove('fade-out');
        }, 120);
      }

      // Update badge text
      var badgeText = document.getElementById('gallery-badge-text');
      if (badgeText) badgeText.textContent = data.badge;

      // Update specs
      var elMat = document.getElementById('pack-spec-material');
      if (elMat) elMat.textContent = data.material;

      var elClosure = document.getElementById('pack-spec-closure');
      if (elClosure) elClosure.textContent = data.closure;

      var elWeight = document.getElementById('pack-spec-weight');
      if (elWeight) elWeight.textContent = data.weight;

      var elConfig = document.getElementById('pack-spec-config');
      if (elConfig) elConfig.textContent = data.config;
    }
  </script>

  <!-- Site UI Scripts -->
  <script src="../js/ui.js?v=6.0"></script>
</body>
</html>`;

  const destPath = path.join(PRODUCTS_DIR, `${product.id}.html`);
  fs.writeFileSync(destPath, html, 'utf-8');
  generatedCount++;
}

console.log(`Successfully generated ${generatedCount} static product SEO pages with multi-view packaging galleries in ${PRODUCTS_DIR}`);
