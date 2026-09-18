/**
 * Shared UI functionality for A. Rehman & Sons multi-page website
 * Handles navigation active states, product dropdown, lightboxes, and dynamic content.
 */

function initNavigationActiveState() {
  const path = window.location.pathname.toLowerCase();
  const filename = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  const onProducts = filename === "products.html";

  document.querySelectorAll(".nav a").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    link.classList.remove("active");

    if (filename === "index.html" || filename === "") {
      if (href === "index.html" || href === "./" || href === "#" || href === "") {
        link.classList.add("active");
      }
    } else if (href === filename || href.endsWith("/" + filename)) {
      link.classList.add("active");
    }
  });

  if (onProducts) {
    const trigger = document.querySelector(".nav-dropdown-trigger");
    if (trigger) trigger.classList.add("active");
  }

  initProductsNavDropdown();
}

function getNavDropdownMenu(wrap) {
  return wrap.querySelector(".nav-dropdown-menu");
}

function positionNavDropdownMenu(wrap) {
  const trigger = wrap.querySelector(".nav-dropdown-trigger");
  const menu = getNavDropdownMenu(wrap);
  if (!trigger || !menu || !wrap.classList.contains("is-open")) return;

  const rect = trigger.getBoundingClientRect();
  menu.style.display = "block";
  menu.style.position = "fixed";
  menu.style.top = `${Math.round(rect.bottom + 6)}px`;
  menu.style.left = `${Math.round(rect.left)}px`;
  menu.style.minWidth = `${Math.max(Math.round(rect.width), 220)}px`;
  menu.style.zIndex = "10001";
}

function closeNavDropdown(wrap) {
  const trigger = wrap.querySelector(".nav-dropdown-trigger");
  const menu = getNavDropdownMenu(wrap);
  wrap.classList.remove("is-open");
  if (trigger) trigger.setAttribute("aria-expanded", "false");
  if (menu) {
    menu.style.display = "";
    menu.style.position = "";
    menu.style.top = "";
    menu.style.left = "";
    menu.style.minWidth = "";
    menu.style.zIndex = "";
  }
}

function closeAllNavDropdowns() {
  document.querySelectorAll(".nav-dropdown-wrap.is-open").forEach((wrap) => {
    closeNavDropdown(wrap);
  });
}

function openNavDropdown(wrap) {
  closeAllNavDropdowns();
  const trigger = wrap.querySelector(".nav-dropdown-trigger");
  const menu = getNavDropdownMenu(wrap);
  if (!trigger || !menu) return;

  wrap.classList.add("is-open");
  trigger.setAttribute("aria-expanded", "true");
  positionNavDropdownMenu(wrap);
}

function isProductsPageLocation(loc = window.location) {
  const file = (loc.pathname.split("/").pop() || "index.html").toLowerCase();
  return file === "products.html" || file === "products";
}

function isProductsCatalogUrl(url) {
  const file = (url.pathname.split("/").pop() || "").toLowerCase();
  return file === "products.html" || file === "products";
}

function initProductsNavDropdown() {
  document.querySelectorAll(".nav-dropdown-wrap").forEach((wrap) => {
    const trigger = wrap.querySelector(".nav-dropdown-trigger");
    const menu = getNavDropdownMenu(wrap);
    if (!trigger || !menu) return;

    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (wrap.classList.contains("is-open")) {
        closeNavDropdown(wrap);
      } else {
        openNavDropdown(wrap);
      }
    });

    menu.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        const targetUrl = new URL(href, window.location.href);
        closeNavDropdown(wrap);

        if (
          isProductsPageLocation() &&
          isProductsCatalogUrl(targetUrl) &&
          typeof window.applyProductCategoryFilter === "function"
        ) {
          e.preventDefault();
          const cat = targetUrl.searchParams.get("cat") || targetUrl.searchParams.get("category");
          window.applyProductCategoryFilter(cat || "all");
        }
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".nav-dropdown-wrap") || e.target.closest(".nav-dropdown-menu")) {
      return;
    }
    closeAllNavDropdowns();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllNavDropdowns();
  });

  window.addEventListener("scroll", () => {
    document.querySelectorAll(".nav-dropdown-wrap.is-open").forEach((wrap) => {
      positionNavDropdownMenu(wrap);
    });
  }, true);

  window.addEventListener("resize", () => {
    document.querySelectorAll(".nav-dropdown-wrap.is-open").forEach((wrap) => {
      positionNavDropdownMenu(wrap);
    });
  });
}

function openLightbox(imgSrc, title = "Document View") {
  let modal = document.getElementById("global-lightbox");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "global-lightbox";
    modal.className = "lightbox-modal";
    modal.innerHTML = `
      <div class="lightbox-dialog">
        <div class="lightbox-header">
          <h3 id="lightbox-title">Document View</h3>
          <button type="button" class="lightbox-close" id="lightbox-close-btn" aria-label="Close">&times;</button>
        </div>
        <div class="lightbox-body">
          <img id="lightbox-img" src="" alt="Document Preview">
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".lightbox-close").addEventListener("click", () => {
      modal.classList.remove("open");
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        modal.classList.remove("open");
      }
    });
  }

  document.getElementById("lightbox-title").textContent = title;
  const img = document.getElementById("lightbox-img");
  img.src = imgSrc;
  img.alt = title;
  modal.classList.add("open");
}

function renderClients() {
  const grid = document.getElementById("clients-grid");
  if (!grid || typeof ARS_CLIENT_LOGOS === "undefined") return;

  grid.innerHTML = ARS_CLIENT_LOGOS.map((c) => `
    <div class="client-logo-card">
      <div class="client-logo-card__img">
        <img src="${c.logo}" alt="${c.name} logo" loading="lazy" onerror="this.src='assets/clients/${c.id}.svg'">
      </div>
      <div class="client-logo-card__text">
        <strong>${c.name}</strong>
        ${c.subtitle ? `<span>${c.subtitle}</span>` : ""}
      </div>
    </div>
  `).join("");
}

function renderCertificates() {
  const grid = document.getElementById("certificates-grid");
  if (!grid || typeof ARS_CERTIFICATES === "undefined") return;

  grid.innerHTML = ARS_CERTIFICATES.map((cert) => {
    const src = cert.image;
    const fallback = cert.fallback || "assets/certificates/placeholder.svg";
    return `
      <div class="certificate-card" id="cert-${cert.id}" style="cursor: pointer;" title="Click to view full certificate">
        <div class="certificate-card__frame">
          <img
            src="${src}"
            alt="${cert.name} certificate"
            loading="lazy"
            onerror="this.onerror=null;this.src='${fallback}'"
          >
        </div>
        <div class="certificate-card__info">
          <strong>${cert.name}</strong>
          <span>${cert.desc}</span>
        </div>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".certificate-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const name = card.querySelector("strong")?.textContent || "Certificate";
      if (img && img.src) {
        openLightbox(img.src, name + " — Official Certificate");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigationActiveState();
  renderClients();
  renderCertificates();
});
