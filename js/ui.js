/**
 * Shared UI functionality for A. Rehman & Sons multi-page website
 * Handles navigation active states, mobile menu toggle, lightboxes, and dynamic content.
 */

// Highlight current page in navigation
function initNavigationActiveState() {
  const path = window.location.pathname.toLowerCase();
  const filename = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  
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

  // Mobile menu toggle
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }
}

// Lightbox modal for viewing high-res certificates and catalog pages
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

  // Attach click to zoom
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

