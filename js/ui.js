/** Render clients, certificates, and shared UI */

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
      <div class="certificate-card" id="cert-${cert.id}">
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
}

document.addEventListener("DOMContentLoaded", () => {
  renderClients();
  renderCertificates();
});
