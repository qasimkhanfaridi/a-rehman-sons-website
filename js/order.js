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
      cart.push({
        id: card.dataset.id,
        name: card.dataset.name,
        packaging: card.dataset.packaging,
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

function renderGallonSvg(pname, packaging = "25 kg", cat = "laundry") {
  const catColors = {
    laundry: "#1d4ed8",
    spotting: "#7c3aed",
    stewarding: "#0d9488",
    housekeeping: "#059669"
  };
  const catColor = catColors[cat] || "#1d4ed8";

  const words = (pname || "").trim().split(/\s+/);
  let nameSvg = "";
  if (pname.length > 15 && words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(" ");
    const line2 = words.slice(mid).join(" ");
    nameSvg = `<text x="83" y="121" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="6.8" font-weight="800" fill="#0f172a">${line1}</text>
    <text x="83" y="129" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="6.8" font-weight="800" fill="#0f172a">${line2}</text>`;
  } else {
    nameSvg = `<text x="83" y="125" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="7.8" font-weight="800" fill="#0f172a">${pname}</text>`;
  }

  const packUpper = (packaging || "25 KG").toUpperCase();

  return `<svg class="gallon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166 210" role="img" aria-label="${pname} commercial container">
    <defs>
      <linearGradient id="bodyGrad_${cat}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#082f49"/>
        <stop offset="12%" stop-color="#0284c7"/>
        <stop offset="28%" stop-color="#0369a1"/>
        <stop offset="70%" stop-color="#0284c7"/>
        <stop offset="100%" stop-color="#075985"/>
      </linearGradient>
      <linearGradient id="bodyShine_${cat}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.32"/>
        <stop offset="18%" stop-color="#ffffff" stop-opacity="0.04"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.22"/>
      </linearGradient>
      <linearGradient id="capGrad_${cat}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#991b1b"/>
        <stop offset="35%" stop-color="#ef4444"/>
        <stop offset="70%" stop-color="#dc2626"/>
        <stop offset="100%" stop-color="#7f1d1d"/>
      </linearGradient>
    </defs>
    <ellipse cx="83" cy="199" rx="60" ry="6.5" fill="#0f172a" opacity="0.18" />
    <g>
      <path d="M 32 46 L 32 34 Q 32 30 36 30 L 58 30 Q 62 30 62 34 L 62 46 L 74 46 Q 80 18 100 18 L 126 18 Q 142 18 142 36 L 142 54 Q 146 60 146 70 L 146 180 Q 146 192 134 192 L 32 192 Q 20 192 20 180 L 20 70 Q 20 60 24 54 L 24 46 Z" fill="url(#bodyGrad_${cat})"/>
      <path d="M 32 46 L 32 34 Q 32 30 36 30 L 58 30 Q 62 30 62 34 L 62 46 L 74 46 Q 80 18 100 18 L 126 18 Q 142 18 142 36 L 142 54 Q 146 60 146 70 L 146 180 Q 146 192 134 192 L 32 192 Q 20 192 20 180 L 20 70 Q 20 60 24 54 L 24 46 Z" fill="url(#bodyShine_${cat})"/>
      <path d="M 82 38 Q 82 30 92 30 L 122 30 Q 132 30 132 38 L 132 44 Q 132 52 122 52 L 92 52 Q 82 52 82 44 Z" fill="#ffffff"/>
      <path d="M 90 30 L 124 30 Q 132 30 132 35 L 132 38 Q 124 33 118 33 L 94 33 Q 86 33 86 36 Z" fill="#082f49" opacity="0.45"/>
      <rect x="29" y="20" width="36" height="15" rx="3.5" fill="url(#capGrad_${cat})"/>
      <line x1="35" y1="20" x2="35" y2="35" stroke="#ffffff" stroke-width="1.2" opacity="0.35"/>
      <line x1="41" y1="20" x2="41" y2="35" stroke="#ffffff" stroke-width="1.2" opacity="0.35"/>
      <line x1="47" y1="20" x2="47" y2="35" stroke="#ffffff" stroke-width="1.2" opacity="0.35"/>
      <line x1="53" y1="20" x2="53" y2="35" stroke="#ffffff" stroke-width="1.2" opacity="0.35"/>
      <line x1="59" y1="20" x2="59" y2="35" stroke="#ffffff" stroke-width="1.2" opacity="0.35"/>
      <rect x="31" y="33" width="32" height="3" rx="1" fill="#fca5a5" opacity="0.8"/>
      <rect x="23" y="68" width="4" height="110" rx="2" fill="#ffffff" opacity="0.25"/>
      <line x1="22" y1="80" x2="25" y2="80" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
      <line x1="22" y1="105" x2="25" y2="105" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
      <line x1="22" y1="130" x2="25" y2="130" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
      <line x1="22" y1="155" x2="25" y2="155" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
      <line x1="26" y1="64" x2="140" y2="64" stroke="#ffffff" stroke-width="0.8" opacity="0.2"/>
      <line x1="26" y1="65" x2="140" y2="65" stroke="#082f49" stroke-width="1" opacity="0.3"/>
      <line x1="26" y1="184" x2="140" y2="184" stroke="#ffffff" stroke-width="0.8" opacity="0.2"/>
      <line x1="26" y1="185" x2="140" y2="185" stroke="#082f49" stroke-width="1" opacity="0.3"/>
      <rect x="38" y="67" width="90" height="112" rx="5" fill="#082f49" opacity="0.3"/>
      <rect x="39" y="68" width="88" height="110" rx="4" fill="#ffffff"/>
      <rect x="39" y="68" width="88" height="110" rx="4" fill="none" stroke="#e2e8f0" stroke-width="1"/>
      <image href="assets/logo.png" x="48" y="71" width="70" height="36" preserveAspectRatio="xMidYMid meet"/>
      <rect x="43" y="108" width="80" height="3.5" rx="1.75" fill="${catColor}"/>
      ${nameSvg}
      <text x="83" y="140" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="4.5" font-weight="700" fill="#64748b" letter-spacing="0.5">COMMERCIAL HYGIENE</text>
      <rect x="43" y="147" width="80" height="26" rx="3" fill="#f8fafc" stroke="#f1f5f9" stroke-width="1"/>
      <text x="49" y="159" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="7" font-weight="800" fill="#0369a1">${packUpper}</text>
      <text x="49" y="168" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="4.2" font-weight="600" fill="#64748b">CONCENTRATE</text>
      <rect x="91" y="151" width="28" height="18" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
      <text x="105" y="159" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="4.2" font-weight="800" fill="#1e293b">ARS CERT</text>
      <text x="105" y="165" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="3.2" font-weight="700" fill="#059669">ISO · HALAL</text>
    </g>
  </svg>`;
}

function renderProducts(filter = "all") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const items = filter === "all"
    ? ARS_PRODUCTS
    : ARS_PRODUCTS.filter((p) => p.category === filter);

  grid.innerHTML = items.map((p) => `
    <article class="product-card" data-id="${p.id}" data-name="${p.name}" data-packaging="${p.packaging}">
      <div class="product-card__image">
        ${renderGallonSvg(p.name, p.packaging, p.category)}
      </div>
      <div class="product-card__head">
        <span class="product-card__cat">${ARS_CATEGORIES[p.category]?.label || p.category}</span>
        <h3>${p.name}</h3>
      </div>
      <p class="product-card__desc">${p.description}</p>
      <div class="product-card__foot">
        <span class="product-card__pack">${p.packaging}</span>
        <label class="qty-label">
          Qty
          <input type="number" class="qty-input" min="0" value="0" aria-label="Quantity for ${p.name}">
        </label>
      </div>
    </article>
  `).join("");
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

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initFilters();
  initOrderForm();
});
