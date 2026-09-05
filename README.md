# A. Rehman & Sons — Website

Static B2B website for **A. Rehman & Sons**, commercial laundry, stewarding and housekeeping chemical supplier (Est. 1988, Rawalpindi, Pakistan).

## Live features

- Product catalog with blue gallon visuals (37 products)
- Client logo wall (Serena, Marriott, Shifa International, etc.)
- 5 separate certificate slots
- Downloadable PDF catalog
- WhatsApp & email order inquiry (no checkout)
- Mobile responsive

## Contact

| | |
|---|---|
| **Tel** | 051-5503203 |
| **WhatsApp** | 0321-8502997 · 0333-2158113 |
| **Email** | ar_sons@hotmail.com |
| **Address** | G.P.O. Box No. 1020, Rawalpindi, Pakistan |

## Local preview

Open `index.html` in a browser, or:

```bash
npx serve .
# visit http://localhost:3000
```

## Deploy

### Option 1 — Netlify (recommended)

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select `Qasimkhanfaridi/a-rehman-sons-website`
4. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `/` (root)
5. Deploy → connect custom domain when ready

### Option 2 — GitHub Pages

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from branch** → `main` → `/ (root)`
3. Site URL: `https://qasimkhanfaridi.github.io/a-rehman-sons-website/`

### Option 3 — cPanel / shared hosting

1. Upload all files to `public_html`
2. Ensure `index.html` is in the web root
3. PDF catalog: `assets/A-Rehman-Sons-Catalog.pdf`

## Replace assets

### Certificates (5 files)

Drop high-resolution scans into `assets/certificates/` with these exact names:

| File | Certificate |
|------|-------------|
| `iso-9001.png` | ISO 9001:2015 |
| `iso-45001.png` | ISO 45001:2018 |
| `haccp.png` | HACCP |
| `halal.png` | HALAL |
| `ohsas-18001.png` | OHSAS 18001 |

### Client logos

Replace files in `assets/clients/` — keep the same filename (e.g. `serena.png`, `marriott.png`).  
Then update `js/clients.js` if filenames change.

Regenerate client manifest:

```bash
node scripts/fetch-logos.js
```

### Product images

Default: `assets/products/gallon-blue.svg` (blue 25 kg container).  
Replace or add per-product images in `js/products.js` if needed.

## Project structure

```
a-rehman-sons-website/
├── index.html
├── css/styles.css
├── js/
│   ├── products.js      # Product catalog data
│   ├── clients.js       # Client logo manifest
│   ├── ui.js            # Clients & certificates render
│   └── order.js         # WhatsApp / email order builder
├── assets/
│   ├── logo.png
│   ├── A-Rehman-Sons-Catalog.pdf
│   ├── certificates/    # 5 certificate images
│   ├── clients/         # Client logos
│   └── products/        # Product visuals
└── templates/           # WhatsApp & email order templates
```

## Domain (pending)

When domain is chosen, point DNS to Netlify/hosting and add custom domain in hosting panel.

Suggested: `arehmansons.com` · `ars-chemicals.pk`

---

© A. Rehman & Sons · Est. 1988
