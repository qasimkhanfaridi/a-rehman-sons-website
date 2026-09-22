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
  if (!isMobileNav()) {
    positionNavDropdownMenu(wrap);
  }
}

function isProductsPageLocation(loc = window.location) {
  const file = (loc.pathname.split("/").pop() || "index.html").toLowerCase();
  return file === "products.html" || file === "products";
}

function isProductsCatalogUrl(url) {
  const file = (url.pathname.split("/").pop() || "").toLowerCase();
  return file === "products.html" || file === "products";
}

/** True when the hamburger breakpoint is active */
function isMobileNav() {
  return window.matchMedia("(max-width: 991px)").matches;
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
        if (!isMobileNav()) closeNavDropdown(wrap);

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
    if (isMobileNav()) return;
    document.querySelectorAll(".nav-dropdown-wrap.is-open").forEach((wrap) => {
      positionNavDropdownMenu(wrap);
    });
  }, true);

  window.addEventListener("resize", () => {
    if (isMobileNav()) return;
    document.querySelectorAll(".nav-dropdown-wrap.is-open").forEach((wrap) => {
      positionNavDropdownMenu(wrap);
    });
  });
}

/* =========================================================================
   CERTIFICATES & LIGHTBOX MODAL
   ========================================================================= */

const CERT_DATA_FALLBACK = [
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    fullName: "ISO 9001:2015 Quality Management System",
    standard: "Quality Management System (QMS)",
    scope: "Chemical formulation, automated batch blending, laboratory titration & supply chain traceability.",
    desc: "Rigorous consistency in raw material sourcing, automated batching, laboratory titration, and packaging reliability.",
    issuer: "Global Certification Services",
    image: "assets/certificates/iso-9001.png",
    badge: "Quality Certified",
    docNumber: "PK-QMS-1988-09"
  },
  {
    id: "iso-45001",
    name: "ISO 45001:2018",
    fullName: "ISO 45001:2018 Occupational Health & Safety",
    standard: "Occupational Health & Safety (OH&S)",
    scope: "Workplace safety, chemical handling protocols, spill containment & worker protective standards.",
    desc: "Validates safe handling practices, proper labeling compliance, spill containment protocols, and workforce health standards.",
    issuer: "Global Certification Services",
    image: "assets/certificates/iso-45001.png",
    badge: "Safety Certified",
    docNumber: "PK-OHS-2018-45"
  },
  {
    id: "haccp",
    name: "HACCP Compliance",
    fullName: "HACCP Food Safety Critical Control Point",
    standard: "Food Safety Critical Control (HACCP)",
    scope: "Safe application of stewarding & kitchen hygiene chemicals ensuring zero toxic chemical residue.",
    desc: "Essential for hotels, restaurant kitchens, and flight catering. Certifies zero toxic residues on tableware.",
    issuer: "HACCP Quality System",
    image: "assets/certificates/haccp.png",
    badge: "Food Safety Compliant",
    docNumber: "PK-HACCP-FS-22"
  },
  {
    id: "halal",
    name: "HALAL Certification",
    fullName: "HALAL Certified Chemical Manufacturing",
    standard: "Punjab Halal Development Agency",
    scope: "Formulations verified 100% free from prohibited animal derivatives, alcohol impurities & non-halal agents.",
    desc: "Confirms ingredients, emulsifiers, and surfactants are strictly suitable for Halal-compliant hospitality.",
    issuer: "Punjab Halal Development Agency",
    image: "assets/certificates/halal.png",
    badge: "Halal Certified",
    docNumber: "PHDA-HC-2024-88"
  }
];

function getCertificatesList() {
  if (typeof ARS_CERTIFICATES !== "undefined" && Array.isArray(ARS_CERTIFICATES) && ARS_CERTIFICATES.length > 0) {
    return ARS_CERTIFICATES;
  }
  return CERT_DATA_FALLBACK;
}

let activeCertIndex = 0;
let certModalEl = null;

function createCertificateModal() {
  if (certModalEl) return certModalEl;

  const modal = document.createElement("div");
  modal.id = "certificate-modal";
  modal.className = "cert-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Official Certificate Viewer");
  modal.innerHTML = `
    <div class="cert-modal__backdrop" id="cert-modal-backdrop"></div>
    <div class="cert-modal__container">
      <div class="cert-modal__card">
        <div class="cert-modal__header">
          <div class="cert-modal__head-text">
            <span class="cert-modal__badge" id="cert-modal-badge">Audited &amp; Certified</span>
            <h3 class="cert-modal__title" id="cert-modal-title">ISO 9001:2015</h3>
            <p class="cert-modal__sub" id="cert-modal-sub">Quality Management System</p>
          </div>
          <div class="cert-modal__actions">
            <button type="button" class="cert-modal__action-btn" id="cert-modal-zoom-btn" title="Toggle Zoom In/Out" aria-label="Toggle zoom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              <span>Zoom</span>
            </button>
            <a href="#" target="_blank" rel="noopener" class="cert-modal__action-btn" id="cert-modal-open-tab" title="Open high-resolution file in new tab">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <span>Full File</span>
            </a>
            <button type="button" class="cert-modal__close-btn" id="cert-modal-close" aria-label="Close Certificate Viewer">&times;</button>
          </div>
        </div>

        <div class="cert-modal__body" id="cert-modal-body">
          <button type="button" class="cert-modal__nav-btn cert-modal__nav-btn--prev" id="cert-modal-prev" aria-label="Previous certificate" title="Previous (Left Arrow)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          
          <div class="cert-modal__img-wrapper" id="cert-modal-img-wrapper" title="Click to toggle zoom">
            <img id="cert-modal-img" src="" alt="Official Scanned Certificate" loading="eager">
          </div>

          <button type="button" class="cert-modal__nav-btn cert-modal__nav-btn--next" id="cert-modal-next" aria-label="Next certificate" title="Next (Right Arrow)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div class="cert-modal__footer">
          <div class="cert-modal__footer-left">
            <span class="cert-modal__counter" id="cert-modal-counter">Certificate 1 of 4</span>
            <span class="cert-modal__scope" id="cert-modal-scope"></span>
          </div>
          <div class="cert-modal__nav-dots" id="cert-modal-dots"></div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  certModalEl = modal;

  // Bind close events
  const closeBtn = modal.querySelector("#cert-modal-close");
  const backdrop = modal.querySelector("#cert-modal-backdrop");
  if (closeBtn) closeBtn.addEventListener("click", closeCertificateModal);
  if (backdrop) backdrop.addEventListener("click", closeCertificateModal);

  // Bind nav arrows
  const prevBtn = modal.querySelector("#cert-modal-prev");
  const nextBtn = modal.querySelector("#cert-modal-next");
  if (prevBtn) prevBtn.addEventListener("click", () => navigateCertificates(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => navigateCertificates(1));

  // Bind zoom toggle
  const zoomBtn = modal.querySelector("#cert-modal-zoom-btn");
  const imgWrapper = modal.querySelector("#cert-modal-img-wrapper");
  function toggleZoom() {
    imgWrapper.classList.toggle("is-zoomed");
    const isZoomed = imgWrapper.classList.contains("is-zoomed");
    zoomBtn.querySelector("span").textContent = isZoomed ? "Reset" : "Zoom";
  }
  if (zoomBtn) zoomBtn.addEventListener("click", toggleZoom);
  if (imgWrapper) imgWrapper.addEventListener("click", toggleZoom);

  // Global keydown listeners for modal navigation
  document.addEventListener("keydown", (e) => {
    if (!certModalEl || !certModalEl.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      closeCertificateModal();
    } else if (e.key === "ArrowLeft") {
      navigateCertificates(-1);
    } else if (e.key === "ArrowRight") {
      navigateCertificates(1);
    }
  });

  return certModalEl;
}

function openCertificateModal(identifier) {
  const certs = getCertificatesList();
  if (!certs || certs.length === 0) return;

  createCertificateModal();

  let index = 0;
  if (typeof identifier === "number") {
    index = Math.max(0, Math.min(certs.length - 1, identifier));
  } else if (typeof identifier === "string") {
    const foundIndex = certs.findIndex((c) => c.id === identifier || c.name.toLowerCase().includes(identifier.toLowerCase()));
    if (foundIndex !== -1) index = foundIndex;
  }

  activeCertIndex = index;
  updateCertificateModalContent();

  certModalEl.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

window.openCertificateModal = openCertificateModal;

function closeCertificateModal() {
  if (!certModalEl) return;
  certModalEl.classList.remove("is-open");
  const imgWrapper = certModalEl.querySelector("#cert-modal-img-wrapper");
  if (imgWrapper) imgWrapper.classList.remove("is-zoomed");
  const zoomBtn = certModalEl.querySelector("#cert-modal-zoom-btn span");
  if (zoomBtn) zoomBtn.textContent = "Zoom";
  document.body.style.overflow = "";
}

window.closeCertificateModal = closeCertificateModal;

function navigateCertificates(delta) {
  const certs = getCertificatesList();
  activeCertIndex = (activeCertIndex + delta + certs.length) % certs.length;
  updateCertificateModalContent();
}

function updateCertificateModalContent() {
  if (!certModalEl) return;
  const certs = getCertificatesList();
  const cert = certs[activeCertIndex];
  if (!cert) return;

  const titleEl = certModalEl.querySelector("#cert-modal-title");
  const badgeEl = certModalEl.querySelector("#cert-modal-badge");
  const subEl = certModalEl.querySelector("#cert-modal-sub");
  const imgEl = certModalEl.querySelector("#cert-modal-img");
  const openTabEl = certModalEl.querySelector("#cert-modal-open-tab");
  const counterEl = certModalEl.querySelector("#cert-modal-counter");
  const scopeEl = certModalEl.querySelector("#cert-modal-scope");
  const dotsEl = certModalEl.querySelector("#cert-modal-dots");
  const imgWrapper = certModalEl.querySelector("#cert-modal-img-wrapper");

  if (imgWrapper) imgWrapper.classList.remove("is-zoomed");
  const zoomBtn = certModalEl.querySelector("#cert-modal-zoom-btn span");
  if (zoomBtn) zoomBtn.textContent = "Zoom";

  if (titleEl) titleEl.textContent = cert.fullName || cert.name;
  if (badgeEl) badgeEl.textContent = cert.badge || "Audited & Certified";
  if (subEl) subEl.textContent = `${cert.standard || cert.desc} · Issued by ${cert.issuer || "Audited Authority"}`;
  if (counterEl) counterEl.textContent = `Certificate ${activeCertIndex + 1} of ${certs.length}`;
  if (scopeEl) scopeEl.textContent = cert.desc || cert.scope || "";

  if (imgEl) {
    imgEl.src = cert.image;
    imgEl.alt = `${cert.name} Official Certificate Scan`;
  }

  if (openTabEl) {
    openTabEl.href = cert.image;
  }

  if (dotsEl) {
    dotsEl.innerHTML = certs.map((_, idx) => `
      <button type="button" class="cert-modal__dot ${idx === activeCertIndex ? "is-active" : ""}" aria-label="Go to certificate ${idx + 1}" onclick="openCertificateModal(${idx})"></button>
    `).join("");
  }
}

// Keep generic openLightbox function for any other images
function openLightbox(imgSrc, title = "Document View") {
  const certs = getCertificatesList();
  const matchedCert = certs.find((c) => imgSrc.includes(c.id) || (c.image && imgSrc.includes(c.image)));
  if (matchedCert) {
    openCertificateModal(matchedCert.id);
    return;
  }

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
      document.body.style.overflow = "";
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  document.getElementById("lightbox-title").textContent = title;
  const img = document.getElementById("lightbox-img");
  img.src = imgSrc;
  img.alt = title;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
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
  const certs = getCertificatesList();
  const grid = document.getElementById("certificates-grid");

  if (grid) {
    // If the grid is empty, populate it with rich certificate cards
    if (grid.children.length === 0) {
      grid.innerHTML = certs.map((cert, index) => {
        const src = cert.image;
        const fallback = cert.fallback || "assets/certificates/placeholder.svg";
        return `
          <div class="certificate-card" id="cert-${cert.id}" data-cert-index="${index}" data-cert-id="${cert.id}" tabindex="0" role="button" aria-label="View ${cert.name} certificate in full detail">
            <div class="certificate-card__badge">${cert.badge || "Certified"}</div>
            <div class="certificate-card__frame">
              <img
                src="${src}"
                alt="${cert.name} certificate"
                loading="lazy"
                onerror="this.onerror=null;this.src='${fallback}'"
              >
              <div class="certificate-card__overlay">
                <span class="certificate-card__overlay-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                </span>
                <span class="certificate-card__overlay-text">Click to Inspect Document</span>
              </div>
            </div>
            <div class="certificate-card__info">
              <strong>${cert.name}</strong>
              <span>${cert.standard || cert.desc}</span>
              <div class="certificate-card__action">
                <span class="certificate-card__btn">Inspect Certificate &rarr;</span>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }

    // Attach click and keyboard listeners to all certificate cards
    grid.querySelectorAll(".certificate-card").forEach((card, index) => {
      const targetId = card.getAttribute("data-cert-id") || certs[index]?.id || index;
      card.addEventListener("click", () => {
        openCertificateModal(targetId);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCertificateModal(targetId);
        }
      });
    });
  }

  // Also bind click handlers to the 4 narrative cards on certifications.html
  const narrativeCards = document.querySelectorAll(".about-card");
  narrativeCards.forEach((card) => {
    const heading = card.querySelector("h3")?.textContent || "";
    let matchedId = null;
    if (heading.includes("9001")) matchedId = "iso-9001";
    else if (heading.includes("45001")) matchedId = "iso-45001";
    else if (heading.includes("HACCP")) matchedId = "haccp";
    else if (heading.includes("HALAL") || heading.includes("Halal")) matchedId = "halal";

    if (matchedId) {
      card.style.cursor = "pointer";
      card.setAttribute("title", "Click to view official scanned certificate");
      card.addEventListener("click", () => {
        openCertificateModal(matchedId);
      });
      // Append a subtle inspection button if not present
      if (!card.querySelector(".narrative-cert-btn")) {
        const btn = document.createElement("div");
        btn.className = "narrative-cert-btn";
        btn.innerHTML = `<span class="btn btn-outline btn-sm" style="margin-top:0.75rem; display:inline-flex; align-items:center; gap:0.4rem;">View Scanned Document &rarr;</span>`;
        card.appendChild(btn);
      }
    }
  });
}


/* =========================================================================
   MOBILE NAV DRAWER
   ========================================================================= */
function initMobileNav() {
  const toggle = document.getElementById("nav-mobile-toggle");
  const closeBtn = document.getElementById("nav-mobile-close");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  function openNav() {
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    closeAllNavDropdowns();
  }

  closeNav();

  // Hamburger toggle
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (document.body.classList.contains("nav-open")) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Optional X close button inside drawer
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeNav();
    });
  }

  // Escape key closes nav
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
      closeNav();
      toggle.focus();
    }
  });

  // Clicking a nav link closes the drawer (not the Products toggle button)
  nav.querySelectorAll("a[href]").forEach((link) => {
    if (link.classList.contains("nav-dropdown-trigger")) return;
    link.addEventListener("click", () => {
      if (isMobileNav()) {
        setTimeout(closeNav, 80);
      }
    });
  });

  // Auto-close when viewport grows past mobile breakpoint
  window.matchMedia("(min-width: 992px)").addEventListener("change", (e) => {
    if (e.matches) closeNav();
  });
}

function initIndustryDetails() {
  const hash = (window.location.hash || "").replace("#", "");
  const target = hash ? document.getElementById(hash) : null;
  if (target && target.classList.contains("industry-open-card")) {
    target.classList.add("is-highlight");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigationActiveState();
  initMobileNav();
  initIndustryDetails();
  renderClients();
  renderCertificates();
});
