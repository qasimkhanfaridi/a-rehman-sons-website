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

function renderProducts(filter = "all") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const items = filter === "all"
    ? ARS_PRODUCTS
    : ARS_PRODUCTS.filter((p) => p.category === filter);

    grid.innerHTML = items.map((p) => `
    <article class="product-card" data-id="${p.id}" data-name="${p.name}" data-packaging="${p.packaging}">
      <div class="product-card__image">
        <img src="${ARS_PRODUCT_IMAGE}" alt="${p.name} — commercial container" loading="lazy">
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
