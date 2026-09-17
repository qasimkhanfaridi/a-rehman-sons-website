# 📘 A. Rehman & Sons — Complete Deployment & Maintenance Guide

This document contains everything you need to know about the architecture, deployment, and future maintenance of the **A. Rehman & Sons** commercial chemical supplier website.

---

## 1. Quick Reference & Key Links

| Item | Details |
| :--- | :--- |
| **Live Production URL** | [https://arschemicals.com](https://arschemicals.com) |
| **GitHub Repository** | [https://github.com/qasimkhanfaridi/a-rehman-sons-website](https://github.com/qasimkhanfaridi/a-rehman-sons-website) |
| **Git Branch** | `main` |
| **Hosting Platform** | **GitHub Pages** (GitHub Actions deploy) |
| **Local Path on Disk** | `C:\Users\qasim.faridi\source\repos\a-rehman-sons-website` |

---

## 2. How to Deploy (Step-by-Step)

### Deploy by pushing to GitHub (recommended)

Every push to `main` runs **`.github/workflows/github-pages.yml`**: builds `dist/` and publishes to GitHub Pages.

```powershell
cd C:\Users\qasim.faridi\source\repos\a-rehman-sons-website
git add .
git commit -m "Describe your update here"
git push origin main
```

Watch progress under **GitHub → Actions → Deploy to GitHub Pages**. The site updates in 1–3 minutes.

**One-time GitHub setup (if deploy ever fails on OIDC):**

1. **Settings → Pages → Build and deployment** → Source: **GitHub Actions**.
2. **Settings → Actions → General → Workflow permissions** → **Read and write permissions**.

### Optional: verify build before push

```powershell
cd C:\Users\qasim.faridi\source\repos\a-rehman-sons-website
.\deploy.ps1
# then commit and push as above
```

**What the build does:** `node build.js` copies HTML, CSS, JS, assets, SEO files, and **`CNAME`** into `dist/` (that folder is not committed; CI builds it fresh).

---

## 3. How to Run & Preview Locally

To preview the website on your computer before deploying:

```powershell
cd C:\Users\qasim.faridi\source\repos\a-rehman-sons-website
python -m http.server 8080
```
Open your browser at: **`http://localhost:8080`**

---

## 4. Website Architecture & Directory Structure

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
├── build.js                    # Cross-platform packaging script for /dist folder
├── deploy.ps1                  # Local build check before git push
├── package.json                # npm script: `build`
├── CNAME                       # Custom domain (copied into dist for GitHub Pages)
└── .github/workflows/github-pages.yml  # CI deploy to GitHub Pages
```

---

## 5. Important Rules & Design Guidelines

1. **Product Image Heights (384px)**:
   - Product container mockups are styled at `384px` height (`height: 384px !important; width: auto; object-fit: contain;`) in `css/styles.css` and inline in `js/order.js`.
   - Never remove this constraint to maintain photorealistic proportions.
2. **Cross-Page Cart Persistence**:
   - Cart selections on `products.html` are saved to browser `localStorage`.
   - `order.html` reads this cart to build the quotation table and format the WhatsApp message.
3. **Cache-Busting (`?v=...`)**:
   - When updating CSS or JS, update the query version in the `<head>` of HTML files (e.g. `href="css/styles.css?v=3.1"`) so existing browser caches refresh immediately.

---

## 6. How to Perform Common Future Updates

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
  primaryNumber: "923218502997",    // Format: CountryCode + Number (without + or dashes)
  secondaryNumber: "923332158113"
};
```
Change the numbers here to update ordering across all pages.

---

### C. Updating the Catalog PDF
1. Replace `assets/A-Rehman-Sons-Catalog.pdf` with your new PDF file.
2. Keep the file name the same (`A-Rehman-Sons-Catalog.pdf`).
3. Keep the file size reasonable for Git (GitHub warns above ~100 MB per file; aim under 50 MB).

---

### D. Custom domain (`arschemicals.com`)

The repo includes **`CNAME`** with `arschemicals.com`. `build.js` copies it into `dist/` for each deploy.

1. **GitHub → Settings → Pages** → confirm custom domain **arschemicals.com** and HTTPS.
2. At your domain registrar/DNS host, point the domain to GitHub Pages ([GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)):
   - **Apex (`arschemicals.com`):** `A` records to GitHub’s IPs, or ALIAS/ANAME if your DNS provider supports it.
   - **`www`:** `CNAME` to `qasimkhanfaridi.github.io` (or your Pages default URL).
3. Wait for DNS propagation; GitHub will issue a free HTTPS certificate automatically.
