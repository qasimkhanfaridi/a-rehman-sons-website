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
  // Label artwork (assets/products/product-label-template.png) has the product
  // name baked in at ~33%-45% of its own canvas height. We paint over that
  // band and redraw each product's own name in the same relative spot/style,
  // scaled to this SVG's larger label panel.
  const words = (pname || "").trim().split(/\s+/);
  let nameSvg = "";
  if (pname.length > 15 && words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(" ");
    const line2 = words.slice(mid).join(" ");
    nameSvg = `<text x="100" y="134.5" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="8.2" font-weight="800" fill="#003a7e">${line1}</text>
    <text x="100" y="143" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="8.2" font-weight="800" fill="#003a7e">${line2}</text>`;
  } else {
    nameSvg = `<text x="100" y="139" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="9.5" font-weight="800" fill="#003a7e">${pname}</text>`;
  }

  return `<svg class="gallon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 252" role="img" aria-label="${pname} — ${packaging} commercial container">
    <defs>
      <linearGradient id="bodyGrad_${uid}" gradientUnits="userSpaceOnUse" x1="24" y1="0" x2="176" y2="0">
        <stop offset="0%" stop-color="#082f49"/>
        <stop offset="12%" stop-color="#0284c7"/>
        <stop offset="28%" stop-color="#0369a1"/>
        <stop offset="70%" stop-color="#0284c7"/>
        <stop offset="100%" stop-color="#075985"/>
      </linearGradient>
      <linearGradient id="bodyShine_${uid}" gradientUnits="userSpaceOnUse" x1="0" y1="16" x2="0" y2="222">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
        <stop offset="18%" stop-color="#ffffff" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.22"/>
      </linearGradient>
      <linearGradient id="capGrad_${uid}" gradientUnits="userSpaceOnUse" x1="79" y1="0" x2="121" y2="0">
        <stop offset="0%" stop-color="#991b1b"/>
        <stop offset="35%" stop-color="#ef4444"/>
        <stop offset="70%" stop-color="#dc2626"/>
        <stop offset="100%" stop-color="#7f1d1d"/>
      </linearGradient>
      <filter id="blurSoft_${uid}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="7"/>
      </filter>
    </defs>

    <ellipse cx="100" cy="239" rx="72" ry="8" fill="#0f172a" opacity="0.18" />

    <g>
      <!-- main body, flat centered shoulder -->
      <rect x="30" y="60" width="140" height="162" rx="14" fill="url(#bodyGrad_${uid})"/>
      <rect x="30" y="60" width="140" height="162" rx="14" fill="url(#bodyShine_${uid})"/>
      <ellipse cx="140" cy="145" rx="11" ry="68" fill="#ffffff" opacity="0.15" filter="url(#blurSoft_${uid})"/>

      <!-- carry handle: single centered loop arching over the cap -->
      <path d="M 52 60 L 52 34 Q 52 16 70 16 L 130 16 Q 148 16 148 34 L 148 60 L 134 60 L 134 36 Q 134 30 128 30 L 72 30 Q 66 30 66 36 L 66 60 Z" fill="url(#bodyGrad_${uid})"/>
      <path d="M 52 60 L 52 34 Q 52 16 70 16 L 130 16 Q 148 16 148 34 L 148 60 L 134 60 L 134 36 Q 134 30 128 30 L 72 30 Q 66 30 66 36 L 66 60 Z" fill="none" stroke="#082f49" stroke-width="0.6" opacity="0.3"/>

      <!-- screw cap, centered inside the handle loop -->
      <rect x="79" y="38" width="42" height="22" rx="4" fill="url(#capGrad_${uid})"/>
      <line x1="87" y1="40" x2="87" y2="56" stroke="#ffffff" stroke-width="1.2" opacity="0.35"/>
      <line x1="95" y1="40" x2="95" y2="56" stroke="#ffffff" stroke-width="1.2" opacity="0.35"/>
      <line x1="105" y1="40" x2="105" y2="56" stroke="#ffffff" stroke-width="1.2" opacity="0.35"/>
      <line x1="113" y1="40" x2="113" y2="56" stroke="#ffffff" stroke-width="1.2" opacity="0.35"/>
      <rect x="77" y="56" width="46" height="4" rx="1.2" fill="#fca5a5" opacity="0.8"/>

      <!-- recessed label panel -->
      <rect x="42" y="82" width="116" height="134" rx="6" fill="#082f49" opacity="0.3"/>
      <rect x="44" y="84" width="112" height="130" rx="5" fill="#ffffff"/>
      <image href="assets/products/product-label-template.png" x="45" y="85" width="110" height="128" preserveAspectRatio="xMidYMid meet"/>
      <rect x="45" y="127" width="110" height="16" fill="#ffffff"/>
      ${nameSvg}
      <rect x="44" y="84" width="112" height="130" rx="5" fill="none" stroke="#e2e8f0" stroke-width="1"/>

      <!-- packaging size sticker, tucked on the label's top-right corner -->
      <rect x="120" y="76" width="36" height="16" rx="3" fill="#b45309"/>
      <text x="138" y="87.5" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="800" fill="#ffffff">${(packaging || "").toUpperCase()}</text>
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
        ${renderGallonSvg(p.name, p.packaging, p.category, p.id)}
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
