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

## Deploy on your VPS

Static site — no Node.js on the server. Only **Nginx** to serve files.

### 1. Upload to VPS

**Git (after GitHub push):**

```bash
ssh user@YOUR_VPS_IP
sudo mkdir -p /var/www/a-rehman-sons
sudo chown $USER:$USER /var/www/a-rehman-sons
git clone https://github.com/qasimkhanfaridi/a-rehman-sons-website.git /var/www/a-rehman-sons
```

**SCP from Windows:**

```powershell
scp -r "C:\Users\Faridi\source\repos\Zindigi_Rebranding\Zindigi.Rebranding\a-rehman-sons-website\*" user@YOUR_VPS_IP:/var/www/a-rehman-sons/
```

### 2. Nginx (Ubuntu/Debian)

```bash
sudo apt update && sudo apt install nginx -y
sudo cp /var/www/a-rehman-sons/deploy/nginx.conf /etc/nginx/sites-available/a-rehman-sons
sudo ln -sf /etc/nginx/sites-available/a-rehman-sons /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Edit `server_name` in `deploy/nginx.conf` when domain is ready.

### 3. Firewall & HTTPS

```bash
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 4. Updates

```bash
cd /var/www/a-rehman-sons && git pull
```

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

### Catalog page previews

`assets/catalog-preview/page-01.png` … `page-39.png` — PNG exports of each page from `assets/A-Rehman-Sons-Catalog.pdf`.  
`page-01.png` matches `assets/catalog-cover.png` (homepage hero image).

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

When domain is chosen, set an **A record** pointing to your VPS IP, update `server_name` in `deploy/nginx.conf`, then run Certbot for HTTPS.

Suggested: `arehmansons.com` · `ars-chemicals.pk`

---

© A. Rehman & Sons · Est. 1988
