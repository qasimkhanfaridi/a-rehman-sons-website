# 📘 A. Rehman & Sons — Complete Deployment & Maintenance Guide

This document contains everything you need to know about the architecture, deployment, and future maintenance of the **A. Rehman & Sons** commercial chemical supplier website.

---

## 1. Quick Reference & Key Links

| Item | Details |
| :--- | :--- |
| **Live Production URL** | [https://main.a-rehman-sons.pages.dev](https://main.a-rehman-sons.pages.dev) / [https://a-rehman-sons.pages.dev](https://a-rehman-sons.pages.dev) |
| **GitHub Repository** | [https://github.com/qasimkhanfaridi/a-rehman-sons-website](https://github.com/qasimkhanfaridi/a-rehman-sons-website) |
| **Git Branch** | `main` |
| **Hosting Platform** | **Cloudflare Pages** (100% Free Forever, Unlimited Bandwidth) |
| **Local Path on Disk** | `C:\Users\qasim.faridi\source\repos\a-rehman-sons-website` |

---

## 2. How to Deploy (Step-by-Step)

### Option A: The 1-Command Automated Deploy (Recommended)
Open PowerShell and run:

```powershell
cd C:\Users\qasim.faridi\source\repos\a-rehman-sons-website; npm run deploy
```

**What this automated command does:**
1. Runs `node build.js` — packages all 8 HTML pages, CSS, JS, and product mockups into `dist/` (bypassing Git history files).
2. Uploads `dist/` directly to Cloudflare Pages using Wrangler CLI.
3. Your changes are live worldwide in ~15 seconds.

*(Alternatively, you can right-click and run `deploy.ps1` in PowerShell).*

---

### Option B: GitHub Push
If you prefer pushing changes to GitHub:

```powershell
cd C:\Users\qasim.faridi\source\repos\a-rehman-sons-website
git add .
git commit -m "Describe your update here"
git push origin main
```

If Cloudflare Git integration is active with Build Command `npm run build` and Output Directory `dist`, Cloudflare will build and deploy automatically upon push.

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
├── deploy.ps1                  # 1-click PowerShell deployment script
├── package.json                # npm scripts (`build`, `deploy`, `deploy:vercel`)
└── .assetsignore               # Protects Cloudflare from scanning Git packfiles
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
3. Keep the file size under 25 MiB (Cloudflare's individual file limit).

---

### D. Connecting a Free Custom Domain (e.g. `arehmansons.com`)
1. In the **Cloudflare Dashboard**, open your project (`a-rehman-sons`).
2. Click the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Enter your domain (e.g., `arehmansons.com` or `www.arehmansons.com`).
5. Cloudflare will automatically configure DNS and generate a **free SSL/HTTPS certificate** that renews automatically forever!
