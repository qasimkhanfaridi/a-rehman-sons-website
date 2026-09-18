/** WhatsApp & email order builder — inquiry only, no checkout */

function buildOrderMessage(formData, cart) {
  const lines = [
    "*NEW QUOTATION INQUIRY — A. Rehman & Sons*",
    "Specialist in Laundry, Kitchen & Housekeeping",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "*Customer Details*",
    `Company / Hotel: ${formData.company || "—"}`,
    `Contact Person: ${formData.contact || "—"}`,
    `Phone / Mobile: ${formData.phone || "—"}`,
    `City: ${formData.city || "—"}`,
    `Delivery Location: ${formData.address || "—"}`,
    "",
    "*Chemicals Requested*"
  ];

  if (cart.length === 0) {
    lines.push("(No products selected — general inquiry)");
  } else {
    cart.forEach((item, i) => {
      const sno = item.sNo ? `[${item.sNo}] ` : "";
      lines.push(`${i + 1}. ${sno}${item.name}`);
      lines.push(`   Quantity: ${item.qty} × ${item.packaging}`);
    });
  }

  lines.push("");
  lines.push(`*Notes / Requirements:* ${formData.notes || "—"}`);
  lines.push("");
  lines.push("Please confirm availability, wholesale quotation, and delivery schedule.");
  lines.push("Thank you — A. Rehman & Sons (Rawalpindi / Islamabad)");

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
  const subject = encodeURIComponent(`Chemical Quotation Inquiry — ${formData.company || formData.contact || "New Client"}`);
  const body = encodeURIComponent(buildEmailBody(formData, cart));
  window.location.href = `mailto:${ARS_CONTACT.email}?subject=${subject}&body=${body}`;
}

function getStoredCart() {
  try {
    const raw = localStorage.getItem("ars_cart");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveStoredCart(cart) {
  try {
    localStorage.setItem("ars_cart", JSON.stringify(cart));
  } catch (e) {}
}

function getCart() {
  // If we are on products page with active cards, read from DOM & save to storage
  const domCards = document.querySelectorAll(".product-card");
  if (domCards.length > 0) {
    const cart = [];
    domCards.forEach((card) => {
      const qtyInput = card.querySelector(".qty-input");
      const qty = parseInt(qtyInput?.value || "0", 10);
      if (qty > 0) {
        const packSelect = card.querySelector(".pack-select");
        const prod = (typeof ARS_PRODUCTS !== "undefined") ? ARS_PRODUCTS.find((p) => p.id === card.dataset.id) : null;
        cart.push({
          id: card.dataset.id,
          sNo: prod ? prod.sNo : card.dataset.sno,
          name: card.dataset.name,
          packaging: packSelect?.value || card.dataset.packaging,
          rate: prod ? prod.rate : parseFloat(card.dataset.rate || "0"),
          rateFormatted: prod ? prod.rateFormatted : card.dataset.rateFormatted,
          qty
        });
      }
    });
    saveStoredCart(cart);
    return cart;
  }
  // Otherwise read persisted cart from localStorage
  return getStoredCart();
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
    text.textContent = `${cart.length} product${cart.length > 1 ? "s" : ""} selected · ${totalUnits} unit${totalUnits === 1 ? "" : "s"} — Review Quote`;
  }
  bar.classList.add("cart-summary--visible");
}

function initCartSummary() {
  const bar = document.getElementById("cart-summary");
  if (!bar) return;
  bar.addEventListener("click", () => {
    // Navigate to order page if not already there
    if (!window.location.pathname.toLowerCase().endsWith("order.html")) {
      window.location.href = "order.html";
    } else {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  updateCartSummary();
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

function renderProducts(filter = "all", searchQuery = "") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const q = (searchQuery || "").trim().toLowerCase();
  const storedCart = getStoredCart();

  let items = ARS_PRODUCTS;
  if (filter === "stewarding") {
    items = ARS_PRODUCTS.filter((p) => p.stewarding || p.category === "kitchen");
  } else if (filter !== "all") {
    items = ARS_PRODUCTS.filter((p) => p.category === filter);
  }

  if (q) {
    items = items.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      (p.sNo && p.sNo.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    );
  }

  const countBadge = document.getElementById("search-results-count");
  if (countBadge) {
    countBadge.textContent = `Showing ${items.length} verified quotation product${items.length === 1 ? "" : "s"}`;
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--gray-600);">
        <h3>No products matched "${searchQuery}"</h3>
        <p>Try searching for chemicals like Zepol, Zeklor, Descaler, Starch, or switch category tabs above.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map((p) => {
    const existing = storedCart.find((item) => item.id === p.id);
    const selectedPackaging = existing ? existing.packaging : p.packaging;
    const qtyValue = existing ? existing.qty : 0;

    const sizes = getPackageSizes(p);
    const options = sizes.map((s) =>
      `<option value="${s}"${s === selectedPackaging ? " selected" : ""}>${s}</option>`
    ).join("");

    const catLabel = ARS_CATEGORIES[p.category]?.label || p.category.toUpperCase();

    return `
    <article class="product-card" data-id="${p.id}" data-sno="${p.sNo || ''}" data-name="${p.name}" data-packaging="${selectedPackaging}" data-category="${p.category}">
      <div class="product-card__header-row">
        <span class="product-card__sno">S.No ${p.sNo || '—'}</span>
      </div>
      <button type="button" class="product-card__image-btn btn-open-product-details" data-id="${p.id}" aria-label="View details for ${p.name}">
        <span class="product-card__image">
          <img
            src="assets/products/mockups/${p.id}.jpg?v=5.0"
            alt="${p.name} — A. Rehman & Sons Commercial Gallon"
            class="product-mockup-img"
            loading="lazy"
            onerror="this.onerror=null; this.parentElement.innerHTML = renderGallonSvg('${p.name.replace(/'/g, "\\'")}', '${selectedPackaging}', '${p.category}', '${p.id}');"
          >
          <span class="product-card__image-hint">Details</span>
        </span>
      </button>
      <div class="product-card__head">
        <span class="product-card__cat">${catLabel}</span>
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
          <input type="number" class="qty-input" min="0" value="${qtyValue}" aria-label="Quantity for ${p.name}">
        </label>
      </div>
    </article>`;
  }).join("");
}

function openProductModal(productId) {
  const p = ARS_PRODUCTS.find((item) => item.id === productId);
  if (!p) return;

  let modal = document.getElementById("tech-product-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "tech-product-modal";
    modal.className = "tech-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest(".tech-modal-close")) {
        closeProductModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        closeProductModal();
      }
    });
  }

  const details = p.fullDetails || {};
  const currentCart = getStoredCart();
  const inCart = currentCart.find((item) => item.id === p.id);

  modal.innerHTML = `
    <div class="tech-modal-dialog">
      <div class="tech-modal-header">
        <div>
          <span class="product-card__sno" style="background: rgba(255,255,255,0.2); color: #fff; border-color: rgba(255,255,255,0.3);">S.No ${p.sNo || "—"}</span>
          <h2>${p.name}</h2>
          <p style="margin: 0; color: #93c5fd; font-size: 0.88rem; font-weight: 600;">Specialist Category: ${details.categoryName || p.category.toUpperCase()}</p>
        </div>
        <button type="button" class="tech-modal-close" aria-label="Close modal">&times;</button>
      </div>
      <div class="tech-modal-body">
        <div class="tech-meta-bar">
          <div class="tech-meta-item"><strong>Standard Packing:</strong> ${p.packaging}</div>
          <div class="tech-meta-item"><strong>Working pH:</strong> ${details.ph || "Balanced"}</div>
        </div>

        <div class="tech-spec-grid">
          <div class="tech-spec-box">
            <h4><span>🏢</span> Applications & Recommended Facilities</h4>
            <p>${details.applications || p.description}</p>
          </div>

          <div class="tech-spec-box accent">
            <h4><span>⚖️</span> Recommended Dosage & Dilution Ratio</h4>
            <p>${details.dosage || "Consult technical representative for automated dosing calibration."}</p>
          </div>

          <div class="tech-spec-box">
            <h4><span>🔬</span> Formulation & Chemical Components</h4>
            <p>${details.activeIngredients || "Commercial high-purity chemical compound."}</p>
          </div>

          <div class="tech-spec-box warning">
            <h4><span>⚠️</span> Safety Precautions & Handling</h4>
            <p>${details.safety || "Industrial grade chemical. Keep out of reach of children. Store in a cool, well-ventilated location."}</p>
          </div>
        </div>
      </div>
      <div class="tech-modal-footer">
        <div style="font-size: 0.85rem; color: var(--gray-600);">
          Available Container Sizes: <strong>${(details.packagingOptions || ["25 kg"]).join(", ")}</strong>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button type="button" class="btn btn-secondary tech-modal-close" style="width: auto; height: auto; border-radius: 4px; padding: 0.5rem 1rem; font-size: 0.85rem; color: var(--gray-700); background: #e2e8f0;">Close</button>
          <button type="button" class="btn btn-primary btn-add-modal-quote" data-id="${p.id}" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">
            + Add to Quote Inquiry
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  modal.querySelector(".btn-add-modal-quote")?.addEventListener("click", () => {
    const cart = getStoredCart();
    const existing = cart.find((item) => item.id === p.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: p.id,
        sNo: p.sNo,
        name: p.name,
        packaging: p.packaging,
        rate: p.rate,
        rateFormatted: p.rateFormatted,
        qty: 1
      });
    }
    saveStoredCart(cart);
    closeProductModal();
    renderProducts(activeFilter, activeQuery);
    if (typeof updateCartSummary === "function") updateCartSummary();
  });
}

function closeProductModal() {
  const modal = document.getElementById("tech-product-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

let activeFilter = "all";
let activeQuery = "";

const PRODUCT_CATEGORY_KEYS = new Set(["all", "laundry", "kitchen", "stewarding", "housekeeping"]);

function normalizeProductCategory(cat) {
  if (cat == null || cat === "") return "all";
  const key = String(cat).trim().toLowerCase();
  if (key === "all") return "all";
  if (PRODUCT_CATEGORY_KEYS.has(key) && key !== "all") return key;
  return null;
}

function readCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("cat") || params.get("category");
  return normalizeProductCategory(raw) || "all";
}

function syncCategoryInUrl(filter) {
  const url = new URL(window.location.href);
  if (filter === "all") {
    url.searchParams.delete("cat");
    url.searchParams.delete("category");
  } else {
    url.searchParams.set("cat", filter);
  }
  window.history.replaceState(null, "", url);
}

function setActiveFilter(filter, { updateUrl = true } = {}) {
  const normalized = normalizeProductCategory(filter) || "all";
  activeFilter = normalized;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === activeFilter);
  });
  if (updateUrl) syncCategoryInUrl(activeFilter);
  renderProducts(activeFilter, activeQuery);
}

function applyProductCategoryFilter(cat) {
  setActiveFilter(normalizeProductCategory(cat) || "all");
}

function initFilters() {
  activeFilter = readCategoryFromUrl();

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === activeFilter);
    btn.addEventListener("click", () => {
      if (btn.dataset.filter === activeFilter) return;
      setActiveFilter(btn.dataset.filter);
    });
  });
}

function initProductCategoryFromNavigation() {
  if (!document.getElementById("products-grid")) return;

  window.addEventListener("pageshow", () => {
    const fromUrl = readCategoryFromUrl();
    if (fromUrl !== activeFilter) {
      setActiveFilter(fromUrl, { updateUrl: false });
    }
  });

  window.addEventListener("popstate", () => {
    setActiveFilter(readCategoryFromUrl(), { updateUrl: false });
  });
}

if (typeof window !== "undefined") {
  window.applyProductCategoryFilter = applyProductCategoryFilter;
}

function initProductSearch() {
  const searchInput = document.getElementById("product-search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    activeQuery = e.target.value;
    renderProducts(activeFilter, activeQuery);
  });
}

function initProductCardEvents() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.addEventListener("change", (e) => {
    const select = e.target.closest(".pack-select");
    if (!select) return;
    const card = select.closest(".product-card");
    if (!card) return;
    card.dataset.packaging = select.value;
    getCart(); // triggers save
  });

  grid.addEventListener("input", (e) => {
    if (!e.target.classList.contains("qty-input")) return;
    getCart(); // triggers save
    if (typeof updateCartSummary === "function") updateCartSummary();
  });

  grid.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".btn-open-product-details");
    if (openBtn) {
      openProductModal(openBtn.dataset.id);
    }
  });
}

// Order review table for order.html
function renderOrderReviewTable() {
  const tableContainer = document.getElementById("order-cart-table-container");
  if (!tableContainer) return;

  const cart = getStoredCart();
  if (!cart || cart.length === 0) {
    tableContainer.innerHTML = `
      <div class="empty-cart-message">
        <p>No products selected yet in your quotation.</p>
        <a href="products.html" class="btn btn-primary">Browse Product Catalog</a>
      </div>
    `;
    return;
  }

  const totalUnits = cart.reduce((sum, item) => sum + item.qty, 0);

  tableContainer.innerHTML = `
    <div class="cart-table-scroll">
    <table class="cart-table cart-table--quote">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Product Name</th>
          <th>Packaging</th>
          <th>Qty</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map((item, idx) => `
          <tr data-id="${item.id}">
            <td data-label="S.No"><span class="product-card__sno">${item.sNo || (idx + 1)}</span></td>
            <td data-label="Product"><strong>${item.name}</strong></td>
            <td data-label="Packaging">${item.packaging}</td>
            <td data-label="Quantity">
              <input type="number" class="qty-input order-table-qty" min="1" value="${item.qty}" data-index="${idx}">
            </td>
            <td data-label="Remove">
              <button type="button" class="btn-remove-item" data-index="${idx}" title="Remove item">&times;</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2"><strong>${cart.length} product${cart.length === 1 ? "" : "s"} in quote</strong></td>
          <td colspan="3"><strong>${totalUnits} units total</strong></td>
        </tr>
      </tfoot>
    </table>
    </div>
    <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
      <a href="products.html" class="btn btn-outline btn-sm">+ Add More Products</a>
      <button type="button" id="btn-clear-cart" class="btn btn-secondary btn-sm" style="color: #dc2626; border-color: #fca5a5;">Clear All Items</button>
    </div>
  `;

  // Attach event listeners for table
  tableContainer.querySelectorAll(".order-table-qty").forEach((input) => {
    input.addEventListener("input", (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      const val = parseInt(e.target.value, 10);
      if (val > 0) {
        cart[idx].qty = val;
        saveStoredCart(cart);
        updateCartSummary();
      }
    });
  });

  tableContainer.querySelectorAll(".btn-remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      cart.splice(idx, 1);
      saveStoredCart(cart);
      renderOrderReviewTable();
      updateCartSummary();
    });
  });

  document.getElementById("btn-clear-cart")?.addEventListener("click", () => {
    if (confirm("Clear all items from your quote?")) {
      saveStoredCart([]);
      renderOrderReviewTable();
      updateCartSummary();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  initProductCategoryFromNavigation();
  initProductSearch();
  renderProducts(activeFilter, activeQuery);
  initProductCardEvents();
  initOrderForm();
  initCartSummary();
  renderOrderReviewTable();
});
