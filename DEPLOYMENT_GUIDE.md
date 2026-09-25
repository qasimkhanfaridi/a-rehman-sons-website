# 📘 A. Rehman & Sons — Complete Deployment & Maintenance Guide

This document contains everything you need to know about the architecture, deployment, and future maintenance of the **A. Rehman & Sons** commercial chemical supplier website.

---

## 1. Quick Reference & Key Links

| Item | Details |
| :--- | :--- |
| **Live Production URL** | [https://arschemicals.com](https://arschemicals.com) · [https://a-rehman-sons.pages.dev](https://a-rehman-sons.pages.dev) |
| **GitHub Repository** | [https://github.com/qasimkhanfaridi/a-rehman-sons-website](https://github.com/qasimkhanfaridi/a-rehman-sons-website) |
| **Git Branch** | `main` |
| **Hosting Platform** | **Cloudflare Pages** (global CDN — strong performance in Pakistan + export markets) |
| **Cloudflare Project** | `a-rehman-sons` |
| **Local Path on Disk** | `C:\Users\qasim.faridi\source\repos\a-rehman-sons-website` |

---

## 2. How to Deploy (Step-by-Step)

### Option A: 1-command deploy from your PC (fastest)

Requires one-time login: `npx wrangler login`

```powershell
cd C:\Users\qasim.faridi\source\repos\a-rehman-sons-website
npm run deploy
```

Or run **`deploy.ps1`** in PowerShell.

**What it does:**

1. Runs `node build.js` → packages the site into `dist/`
2. Uploads `dist/` to Cloudflare Pages project **`a-rehman-sons`**
3. Goes live on Cloudflare’s edge (typically **~15 seconds** worldwide, including Pakistan)

---

### Option B: Push to GitHub → Cloudflare builds automatically

Connect the repo in **Cloudflare Dashboard → Workers & Pages → a-rehman-sons → Settings → Builds**:

| Setting | Value |
| :--- | :--- |
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

Then deploy with:

```powershell
git add .
git commit -m "Describe your update"
git push origin main
```

`wrangler.toml` only declares the Pages output folder (`dist`). Set the **build command** in the Cloudflare dashboard (see Option B), not in `wrangler.toml`.

---

### Turn off GitHub Pages (avoid double hosting)

In **GitHub → Settings → Pages**, set source to **None**.  
The old GitHub Actions workflow was removed from this repo so pushes no longer publish to GitHub Pages.

---

### Verify build locally before deploy

```powershell
cd C:\Users\qasim.faridi\source\repos\a-rehman-sons-website
npm run build
python -m http.server 8080
```

Open **`http://localhost:8080`** (serve from project root, or use a static server pointed at `dist/`).

## 3. Website Architecture & Directory Structure

```text
a-rehman-sons-website/
├── index.html                  # Home Page (Hero, Stats, Categories, Client Logos)
├── about.html                  # About Page (Heritage, Mission, Values, Team)
├── products.html               # Products Catalog (Instant Search, Filter, Add to Cart)
├── certifications.html         # Certifications Page (ISO, Halal, Eco Standards + Zoom)
├── clients.html                # Institutional Clients (PC, Marriott, Hospitals, etc.)
├── catalog.html                # 39-Page Digital Catalog Viewer + PDF Download
├── order.html                  # Order Hub (Live Cart Review + WhatsApp Submission)
├── contact.html                # Contact Information, Location & Inquiry Form
│
├── css/
│   └── styles.css              # Master stylesheet (colors, layout, responsive design)
├── js/
│   ├── ui.js                   # Nav toggle, active links, lightbox zoom modal
│   └── order.js                # Product database (41 items), search, cart localStorage
│
├── assets/
│   ├── brand/                  # Logo and branding assets
│   ├── certs/                  # Certificate images (ISO, Halal, etc.)
│   ├── clients/                # Client logo icons
│   ├── catalog/                # 39 catalog page images (page-01.png to page-39.png)
│   ├── products/
│   │   └── mockups/            # 41 Photorealistic 384px HDPE Gallon images
│   └── A-Rehman-Sons-Catalog.pdf # Official 39-page high-resolution brochure PDF (20.9 MB)
│
├── build.js                    # Packaging script → /dist
├── deploy.ps1                  # 1-click Cloudflare Pages deploy
├── package.json                # npm scripts: `build`, `deploy`
├── wrangler.toml               # Pages project name + output directory for CI
├── .assetsignore               # Keeps Wrangler from scanning .git pack files
└── DEPLOYMENT_GUIDE.md         # This file
```

---

## 4. Important Rules & Design Guidelines

1. **Product Image Heights (384px)**:
   - Product container mockups are styled at `384px` height (`height: 384px !important; width: auto; object-fit: contain;`) in `css/styles.css` and inline in `js/order.js`.
   - Never remove this constraint to maintain photorealistic proportions.
2. **Cross-Page Cart Persistence**:
   - Cart selections on `products.html` are saved to browser `localStorage`.
   - `order.html` reads this cart to build the quotation table and format the WhatsApp message.
3. **Cache-Busting (`?v=...`)**:
   - When updating CSS or JS, update the query version in the `<head>` of HTML files (e.g. `href="css/styles.css?v=3.1"`) so existing browser caches refresh immediately.

---

## 5. How to Perform Common Future Updates

### A. Adding or Editing Products
All product data is stored in **`js/order.js`** inside the `PRODUCTS` array:
```javascript
{
  id: "my-chemical-id",
  name: "My Chemical Name",
  code: "FORMULATION-CODE",
  cat: "laundry", // laundry, drycleaning, housekeeping, foodbev, watertreatment
  desc: "Commercial description of the chemical...",
  specs: "pH: 12-13 | Dilution: 1:100",
  pkg: "30L Gallon / 200L Drum",
  image: "assets/products/mockups/my-chemical-id.jpg"
}
```
Simply add or edit an item in `js/order.js`. Both `products.html` and `order.html` update automatically!

---

### B. Changing WhatsApp Phone Numbers
WhatsApp numbers are defined in **`js/order.js`**:
```javascript
const WHATSAPP_CONFIG = {
  primaryNumber: "923318502997",    // Format: CountryCode + Number (without + or dashes)
  secondaryNumber: "923332158113"
};
```
Change the numbers here to update ordering across all pages.

---

### C. Updating the Catalog PDF
1. Replace `assets/A-Rehman-Sons-Catalog.pdf` with your new PDF file.
2. Keep the file name the same (`A-Rehman-Sons-Catalog.pdf`).
3. Keep the file size under **25 MiB** per file (Cloudflare Pages limit). Compress the PDF when possible.

---

3. Keep individual files under **25 MiB** (Cloudflare Pages per-file limit). The catalog PDF should stay compressed when possible.

---

### D. Custom domain & DNS (`arschemicals.com`) — Pakistan + worldwide

Hosting on **Cloudflare Pages** puts your site on Cloudflare’s network (good for **local Pakistan traffic** and **international buyers**).

#### Step 1 — Add the domain to Cloudflare (if not already)

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Add a site** → enter **`arschemicals.com`**
2. Choose the **Free** plan
3. Cloudflare shows two nameservers (e.g. `ada.ns.cloudflare.com`) — at your **domain registrar**, replace existing nameservers with Cloudflare’s
4. Wait until Cloudflare shows the zone as **Active**

#### Step 2 — Attach domain to the Pages project

1. **Workers & Pages** → project **`a-rehman-sons`** → **Custom domains**
2. Add **`arschemicals.com`** and optionally **`www.arschemicals.com`**
3. Cloudflare creates DNS records and provisions **HTTPS** automatically

#### Step 3 — Recommended DNS records

| Type | Name | Content | Proxy |
| :--- | :--- | :--- | :--- |
| CNAME | `@` or apex | `a-rehman-sons.pages.dev` (or value Cloudflare suggests for Pages) | Proxied (orange cloud) |
| CNAME | `www` | `a-rehman-sons.pages.dev` | Proxied |

*(Exact apex setup depends on Cloudflare’s “CNAME flattening” for your zone — follow the prompts in the Custom domains UI.)*

#### Step 4 — Speed settings (helpful for Pakistan mobile users)

In **Speed → Optimization** (Free tier):

- **Auto Minify:** HTML, CSS, JS — ON  
- **Brotli** — ON (default on many zones)

Optional later: **Cache Rules** to cache `/assets/*`, `/css/*`, `/js/*` with long TTL.

#### Step 5 — SEO checklist (unchanged)

- Canonical URLs should stay **`https://arschemicals.com`**
- Keep **`sitemap.xml`**, **`robots.txt`**, and structured data in the repo — they deploy with every build
- Test mobile speed: [PageSpeed Insights](https://pagespeed.web.dev/) for `arschemicals.com`

#### Remove old GitHub Pages DNS

If you previously pointed the domain at **GitHub**, delete old **A/CNAME** records to GitHub so only **Cloudflare Pages** serves traffic.
