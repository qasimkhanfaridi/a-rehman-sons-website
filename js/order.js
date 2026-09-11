/** WhatsApp & email order builder — inquiry only, no checkout */

function buildOrderMessage(formData, cart) {
  const lines = [
    "*NEW ORDER — A. Rehman & Sons*",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "*Customer Details*",
    `Company / Name: ${formData.company || "—"}`,
    `Contact Person: ${formData.contact || "—"}`,
    `Phone: ${formData.phone || "—"}`,
    `City: ${formData.city || "—"}`,
    `Delivery Address: ${formData.address || "—"}`,
    "",
    "*Products Requested*"
  ];

  if (cart.length === 0) {
    lines.push("(No products selected — general inquiry)");
  } else {
    cart.forEach((item, i) => {
      lines.push(`${i + 1}. ${item.name}`);
      lines.push(`   Qty: ${item.qty} × ${item.packaging}`);
    });
  }

  lines.push("");
  lines.push(`*Notes:* ${formData.notes || "—"}`);
  lines.push("");
  lines.push("Please confirm availability, price, and delivery time.");
  lines.push("Thank you — A. Rehman & Sons");

  return lines.join("\n");
}

function buildEmailBody(formData, cart) {
  return buildOrderMessage(formData, cart)
    .replace(/\*/g, "")
    .replace(/━+/g, "--------------------");
}

function openWhatsApp(formData, cart, numberIndex = 0) {
  const msg = encodeURIComponent(buildOrderMessage(formData, cart));
  const number = ARS_CONTACT.whatsapp[numberIndex] || ARS_CONTACT.whatsapp[0];
  window.open(`https://wa.me/${number}?text=${msg}`, "_blank");
}

function openEmail(formData, cart) {
  const subject = encodeURIComponent(`Order Inquiry — ${formData.company || formData.contact || "New Customer"}`);
  const body = encodeURIComponent(buildEmailBody(formData, cart));
  window.location.href = `mailto:${ARS_CONTACT.email}?subject=${subject}&body=${body}`;
}

function getCart() {
  const cart = [];
  document.querySelectorAll(".product-card").forEach((card) => {
    const qtyInput = card.querySelector(".qty-input");
    const qty = parseInt(qtyInput?.value || "0", 10);
    if (qty > 0) {
      const packSelect = card.querySelector(".pack-select");
      cart.push({
        id: card.dataset.id,
        name: card.dataset.name,
        packaging: packSelect?.value || card.dataset.packaging,
        qty
      });
    }
  });
  return cart;
}

function getFormData() {
  return {
    company: document.getElementById("company")?.value.trim(),
    contact: document.getElementById("contact")?.value.trim(),
    phone: document.getElementById("phone")?.value.trim(),
    city: document.getElementById("city")?.value.trim(),
    address: document.getElementById("address")?.value.trim(),
    notes: document.getElementById("notes")?.value.trim()
  };
}

function validateForm(formData) {
  if (!formData.contact) {
    alert("Please enter your contact person name.");
    return false;
  }
  if (!formData.phone) {
    alert("Please enter your phone number.");
    return false;
  }
  return true;
}

function updateCartSummary() {
  const bar = document.getElementById("cart-summary");
  if (!bar) return;
  const cart = getCart();
  if (cart.length === 0) {
    bar.classList.remove("cart-summary--visible");
    return;
  }
  const totalUnits = cart.reduce((sum, item) => sum + item.qty, 0);
  const text = bar.querySelector(".cart-summary__text");
  if (text) {
    text.textContent = `${cart.length} product${cart.length > 1 ? "s" : ""} selected · ${totalUnits} unit${totalUnits === 1 ? "" : "s"} — Review Order`;
  }
  bar.classList.add("cart-summary--visible");
}

function initCartSummary() {
  document.getElementById("cart-summary")?.addEventListener("click", () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function initOrderForm() {
  document.getElementById("btn-whatsapp")?.addEventListener("click", () => {
    const formData = getFormData();
    if (!validateForm(formData)) return;
    openWhatsApp(formData, getCart(), 0);
  });

  document.getElementById("btn-whatsapp-2")?.addEventListener("click", () => {
    const formData = getFormData();
    if (!validateForm(formData)) return;
    openWhatsApp(formData, getCart(), 1);
  });

  document.getElementById("btn-email")?.addEventListener("click", () => {
    const formData = getFormData();
    if (!validateForm(formData)) return;
    openEmail(formData, getCart());
  });

  document.getElementById("btn-copy-template")?.addEventListener("click", () => {
    const text = buildOrderMessage(getFormData(), getCart());
    navigator.clipboard.writeText(text).then(() => {
      alert("Order message copied! Paste it in WhatsApp or email.");
    });
  });
}

function renderGallonSvg(pname, packaging = "25 kg", cat = "laundry", uid = "default") {
  const cleanName = (pname || "").trim();
  const words = cleanName.split(/\s+/);
  let nameSvg = "";

  if (cleanName.length > 18 && words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(" ");
    const line2 = words.slice(mid).join(" ");
    nameSvg = `
      <text x="120" y="167" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10.5" font-weight="900" fill="#002b5c" letter-spacing="-0.2">${line1}</text>
      <text x="120" y="179" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10.5" font-weight="900" fill="#002b5c" letter-spacing="-0.2">${line2}</text>
    `;
  } else if (cleanName.length > 13) {
    nameSvg = `<text x="120" y="173" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11.5" font-weight="900" fill="#002b5c" letter-spacing="-0.3">${cleanName}</text>`;
  } else {
    nameSvg = `<text x="120" y="173" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="900" fill="#002b5c" letter-spacing="-0.3">${cleanName}</text>`;
  }

  const safeUid = (uid || "uid").replace(/[^a-zA-Z0-9]/g, "_");

  return `<svg class="gallon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 290" role="img" aria-label="${cleanName} — ${packaging} commercial container">
    <defs>
      <!-- Gallon Plastic Gradient -->
      <linearGradient id="hdpeGrad_${safeUid}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#cbd5e1"/>
        <stop offset="6%" stop-color="#f1f5f9"/>
        <stop offset="25%" stop-color="#ffffff"/>
        <stop offset="75%" stop-color="#f8fafc"/>
        <stop offset="92%" stop-color="#e2e8f0"/>
        <stop offset="100%" stop-color="#94a3b8"/>
      </linearGradient>

      <!-- Gloss & Specular -->
      <linearGradient id="shineGrad_${safeUid}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
        <stop offset="25%" stop-color="#ffffff" stop-opacity="0.1"/>
        <stop offset="85%" stop-color="#0f172a" stop-opacity="0.04"/>
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.2"/>
      </linearGradient>

      <!-- Red Cap Gradient -->
      <linearGradient id="capGrad_${safeUid}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#991b1b"/>
        <stop offset="25%" stop-color="#ef4444"/>
        <stop offset="75%" stop-color="#dc2626"/>
        <stop offset="100%" stop-color="#7f1d1d"/>
      </linearGradient>

      <!-- Drop Shadow Filter -->
      <filter id="shadow_${safeUid}" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.16"/>
      </filter>
    </defs>

    <!-- Ground Contact Shadow -->
    <ellipse cx="120" cy="276" rx="84" ry="9" fill="#0f172a" opacity="0.22" filter="blur(3px)"/>

    <!-- GALLON CONTAINER BODY -->
    <g filter="url(#shadow_${safeUid})">
      <!-- Ergonomic Carry Handle -->
      <path d="M 88 56 Q 88 20 120 18 Q 152 20 152 56 Z" fill="none" stroke="url(#hdpeGrad_${safeUid})" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 88 56 Q 88 20 120 18 Q 152 20 152 56 Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>

      <!-- Main Jug Vessel -->
      <path d="M 52 74 Q 38 74 36 92 L 30 248 Q 30 268 48 268 L 192 268 Q 210 268 210 248 L 204 92 Q 202 74 188 74 Z" fill="url(#hdpeGrad_${safeUid})"/>
      <path d="M 52 74 Q 38 74 36 92 L 30 248 Q 30 268 48 268 L 192 268 Q 210 268 210 248 L 204 92 Q 202 74 188 74 Z" fill="url(#shineGrad_${safeUid})"/>

      <!-- Shoulder Ridge -->
      <path d="M 40 92 Q 120 86 200 92" stroke="#cbd5e1" stroke-width="2.5" fill="none" opacity="0.6"/>

      <!-- Threaded Spout & Industrial Cap -->
      <rect x="52" y="38" width="36" height="24" rx="4" fill="url(#hdpeGrad_${safeUid})" stroke="#94a3b8" stroke-width="0.8"/>
      <rect x="50" y="24" width="40" height="20" rx="3" fill="url(#capGrad_${safeUid})"/>
      <!-- Cap Grip Ribs -->
      <line x1="56" y1="26" x2="56" y2="42" stroke="#7f1d1d" stroke-width="1.2"/>
      <line x1="62" y1="26" x2="62" y2="42" stroke="#7f1d1d" stroke-width="1.2"/>
      <line x1="70" y1="26" x2="70" y2="42" stroke="#f87171" stroke-width="1.2" opacity="0.8"/>
      <line x1="78" y1="26" x2="78" y2="42" stroke="#7f1d1d" stroke-width="1.2"/>
      <line x1="84" y1="26" x2="84" y2="42" stroke="#7f1d1d" stroke-width="1.2"/>

      <!-- Side Volume Measurement Graduations -->
      <line x1="37" y1="120" x2="43" y2="120" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="44" y="122" font-size="5" fill="#64748b" font-weight="700">20L</text>
      <line x1="36" y1="150" x2="43" y2="150" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="44" y="152" font-size="5" fill="#64748b" font-weight="700">15L</text>
      <line x1="35" y1="180" x2="43" y2="180" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="44" y="182" font-size="5" fill="#64748b" font-weight="700">10L</text>
      <line x1="34" y1="210" x2="42" y2="210" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="43" y="212" font-size="5" fill="#64748b" font-weight="700">5L</text>
    </g>

    <!-- OFFICIAL FRONT LABEL PANEL (matching checking.png) -->
    <g>
      <!-- Label Base Paper -->
      <rect x="48" y="98" width="144" height="156" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"/>

      <!-- LABEL HEADER: ARS Oval Logo (Left) -->
      <g transform="translate(54, 103)">
        <!-- Oval Gold Frame -->
        <ellipse cx="23" cy="12" rx="20" ry="10" fill="#fef08a" stroke="#ca8a04" stroke-width="1.2"/>
        <!-- Pink Arc -->
        <path d="M 5 10 A 18 8 0 0 1 41 8" fill="none" stroke="#e11d48" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Green Arc -->
        <path d="M 5 14 A 18 8 0 0 0 41 15" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round"/>
        <!-- ARS Text -->
        <text x="23" y="15.5" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="9" font-weight="900" fill="#4c0519" letter-spacing="0.5">ARS</text>
      </g>

      <!-- LABEL HEADER: 3 Certifications (Right) -->
      <g transform="translate(136, 104)">
        <!-- 18001 / Safety -->
        <circle cx="9" cy="11" r="7" fill="#f0fdf4" stroke="#0284c7" stroke-width="0.8"/>
        <text x="9" y="9" text-anchor="middle" font-size="3.2" font-weight="700" fill="#0369a1">18001</text>
        <text x="9" y="13" text-anchor="middle" font-size="2.6" font-weight="600" fill="#0f172a">CERT</text>

        <!-- HACCP -->
        <circle cx="27" cy="11" r="7" fill="#eff6ff" stroke="#1d4ed8" stroke-width="0.8"/>
        <text x="27" y="12" text-anchor="middle" font-size="3.4" font-weight="800" fill="#1e40af">HACCP</text>

        <!-- ISO 9001 -->
        <circle cx="45" cy="11" r="7" fill="#f8fafc" stroke="#0f172a" stroke-width="0.8"/>
        <text x="45" y="9" text-anchor="middle" font-size="3.4" font-weight="800" fill="#0f172a">ISO</text>
        <text x="45" y="13" text-anchor="middle" font-size="2.4" font-weight="600" fill="#475569">9001:2015</text>
      </g>

      <!-- Blue Wave Accent Band (from checking.png) -->
      <path d="M 48 128 C 90 133, 140 125, 192 131 L 192 133 C 140 127, 90 135, 48 130 Z" fill="#0284c7"/>
      <path d="M 48 130 C 85 135, 145 127, 192 133" stroke="#e11d48" stroke-width="0.8" fill="none"/>

      <!-- BRAND NAME: A.R. & SONS® -->
      <text x="120" y="141" text-anchor="middle" font-family="'Georgia', serif, system-ui" font-size="11.5" font-weight="900" font-style="italic" fill="#be123c" letter-spacing="0.4">A.R. &amp; SONS<tspan font-size="7" font-style="normal" dy="-4">®</tspan></text>
      
      <!-- SUBTITLE: CHEMICAL & GENERAL ORDER SUPPLIER -->
      <text x="120" y="148" text-anchor="middle" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="4.8" font-weight="800" fill="#0369a1" letter-spacing="0.5">CHEMICAL &amp; GENERAL ORDER SUPPLIER</text>

      <!-- Center Separator Bar -->
      <line x1="56" y1="152" x2="184" y2="152" stroke="#0284c7" stroke-width="1.2"/>

      <!-- HIGH-CONTRAST READABLE PRODUCT NAME -->
      ${nameSvg}

      <!-- Bottom Separator -->
      <line x1="56" y1="190" x2="184" y2="190" stroke="#e2e8f0" stroke-width="0.8"/>

      <!-- GHS HAZARD WARNING DIAMONDS (from checking.png) -->
      <g transform="translate(56, 195)">
        <!-- Exclamation / Harmful Diamond -->
        <g transform="translate(10, 8)">
          <rect x="-6.5" y="-6.5" width="13" height="13" transform="rotate(45)" fill="#ffffff" stroke="#dc2626" stroke-width="1.3"/>
          <text x="0" y="3.5" text-anchor="middle" font-size="8.5" font-weight="900" fill="#0f172a">!</text>
        </g>
        <text x="10" y="21" text-anchor="middle" font-size="3.6" font-weight="800" fill="#dc2626">HARMFUL</text>

        <!-- Corrosive Diamond -->
        <g transform="translate(30, 8)">
          <rect x="-6.5" y="-6.5" width="13" height="13" transform="rotate(45)" fill="#ffffff" stroke="#dc2626" stroke-width="1.3"/>
          <path d="M -3.5 -2 L -1.5 1 L 0 -1 L 2 2" stroke="#0f172a" stroke-width="0.8" fill="none"/>
          <rect x="-3" y="1.5" width="6" height="1" fill="#0f172a"/>
        </g>
        <text x="30" y="21" text-anchor="middle" font-size="3.6" font-weight="800" fill="#dc2626">CORROSIVE</text>
      </g>

      <!-- PACKAGING BADGE -->
      <g transform="translate(142, 196)">
        <rect x="0" y="0" width="44" height="14" rx="3" fill="#002b5c"/>
        <text x="22" y="9.5" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.8" font-weight="800" fill="#ffffff">${(packaging || "25 KG").toUpperCase()}</text>
        <text x="22" y="20" text-anchor="middle" font-size="3.8" font-weight="700" fill="#64748b">COMMERCIAL GRADE</text>
      </g>

      <!-- Purple Contact & Safety Footer Band (from checking.png) -->
      <path d="M 48 238 Q 120 234 192 238 L 192 254 L 48 254 Z" fill="#0f172a"/>
      <text x="120" y="244" text-anchor="middle" font-size="3.7" font-weight="600" fill="#93c5fd">Rawalpindi · Mob: 0321-8502997, 0333-2158113</text>
      <text x="120" y="249" text-anchor="middle" font-size="3.4" font-weight="500" fill="#cbd5e1">Email: ar_sons@hotmail.com · G.P.O. Box 1020</text>
    </g>
  </svg>`;
}

function renderProducts(filter = "all") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const items = filter === "all"
    ? ARS_PRODUCTS
    : ARS_PRODUCTS.filter((p) => p.category === filter);

  grid.innerHTML = items.map((p) => {
    const sizes = getPackageSizes(p);
    const options = sizes.map((s) =>
      `<option value="${s}"${s === p.packaging ? " selected" : ""}>${s}</option>`
    ).join("");

    return `
    <article class="product-card" data-id="${p.id}" data-name="${p.name}" data-packaging="${p.packaging}" data-category="${p.category}">
      <div class="product-card__image">
        <img
          src="assets/products/mockups/${p.id}.jpg"
          alt="${p.name} — A. Rehman & Sons Commercial Gallon"
          class="product-mockup-img"
          loading="lazy"
          onerror="this.onerror=null; this.parentElement.innerHTML = renderGallonSvg('${p.name.replace(/'/g, "\\'")}', '${p.packaging}', '${p.category}', '${p.id}');"
        >
      </div>
      <div class="product-card__head">
        <span class="product-card__cat">${ARS_CATEGORIES[p.category]?.label || p.category}</span>
        <h3>${p.name}</h3>
      </div>
      <p class="product-card__desc">${p.description}</p>
      <div class="product-card__foot">
        <label class="pack-label">
          Size
          <select class="pack-select" aria-label="Pack size for ${p.name}">${options}</select>
        </label>
        <label class="qty-label">
          Qty
          <input type="number" class="qty-input" min="0" value="0" aria-label="Quantity for ${p.name}">
        </label>
      </div>
    </article>`;
  }).join("");
}

function initFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });
}

function initProductCardEvents() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  // Changing pack size updates the cart's source-of-truth attribute and
  // regenerates that card's illustration so its size tag stays in sync.
  grid.addEventListener("change", (e) => {
    const select = e.target.closest(".pack-select");
    if (!select) return;
    const card = select.closest(".product-card");
    if (!card) return;
    card.dataset.packaging = select.value;
    const product = ARS_PRODUCTS.find((p) => p.id === card.dataset.id);
    const imgHost = card.querySelector(".product-card__image");
    if (product && imgHost) {
      imgHost.innerHTML = renderGallonSvg(product.name, select.value, product.category, product.id);
    }
  });

  grid.addEventListener("input", (e) => {
    if (!e.target.classList.contains("qty-input")) return;
    if (typeof updateCartSummary === "function") updateCartSummary();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initFilters();
  initProductCardEvents();
  initOrderForm();
  initCartSummary();
});
