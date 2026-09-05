const https = require("https");
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "../assets/clients");

const clients = [
  { id: "serena", name: "Serena Hotels", url: "https://www.serenahotels.com", subtitle: "Islamabad · Kabul · Swat · Quetta · Gilgit · Faisalabad · Peshawar", color: "#1a5632", bg: "#f0f7f2" },
  { id: "marriott", name: "Marriott", url: "https://www.marriott.com", subtitle: "Hotel Islamabad", color: "#9d2235", bg: "#fdf2f4" },
  { id: "movenpick", name: "Mövenpick", url: "https://www.movenpick.com", subtitle: "Hotel", color: "#8B004B", bg: "#faf0f5" },
  { id: "pc-hotels", name: "Pearl Continental", url: "https://www.pchotels.com", subtitle: "Hotels", color: "#8B6914", bg: "#faf6ee" },
  { id: "ramada", name: "Ramada", url: "https://www.ramada.com", subtitle: "Hotels", color: "#003366", bg: "#eef4fa" },
  { id: "best-western", name: "Best Western", url: "https://www.bestwestern.com", subtitle: "Hotels", color: "#003087", bg: "#eef2fa" },
  { id: "shifa", name: "Shifa International", url: "https://www.shifa.com.pk", subtitle: "Hospital", color: "#0066b3", bg: "#eef6fc" },
  { id: "ric", name: "RIC", url: "https://ric.org.pk", subtitle: "Rawalpindi Institute of Cardiology", color: "#c41e3a", bg: "#fdf0f2" },
  { id: "cmh", name: "CMH", url: "https://www.pakarmy.gov.pk", subtitle: "Combined Military Hospital, Rawalpindi", color: "#2d5016", bg: "#f2f6ee" },
  { id: "fauji", name: "Fauji Foundation", url: "https://www.fauji.org.pk", subtitle: "Hospital, Rawalpindi", color: "#1e4d2b", bg: "#f0f5f1" },
  { id: "islamabad-club", name: "Islamabad Club", url: "https://islamabadclub.com.pk", subtitle: "", color: "#003366", bg: "#eef4fa" },
  { id: "centaurus", name: "Centaurus", url: "https://thecentaurusmall.com", subtitle: "Mall", color: "#b8860b", bg: "#faf6ee" },
  { id: "giga-mall", name: "Giga Mall", url: "https://gigamall.pk", subtitle: "Islamabad", color: "#0066b3", bg: "#eef6fc" }
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchBuffer(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error("HTTP " + res.statusCode));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

function wordmarkSvg(c) {
  const sub = c.subtitle
    ? `<text x="100" y="62" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="8" fill="#64748b">${c.subtitle.replace(/&/g, "and").slice(0, 42)}</text>`
    : "";
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80" role="img" aria-label="${c.name}">`,
    `<rect width="200" height="80" fill="${c.bg}" rx="8"/>`,
    `<text x="100" y="42" text-anchor="middle" font-family="Georgia,Times New Roman,serif" font-size="15" font-weight="700" fill="${c.color}">${c.name.replace(/&/g, "and")}</text>`,
    sub,
    "</svg>"
  ].join("");
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const manifest = [];

  for (const c of clients) {
    let logoFile = c.id + ".svg";
    try {
      const domain = new URL(c.url).hostname.replace(/^www\./, "");
      const favUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      const buf = await fetchBuffer(favUrl);
      if (buf.length > 200) {
        fs.writeFileSync(path.join(outDir, c.id + ".png"), buf);
        logoFile = c.id + ".png";
        console.log("favicon", c.id);
      } else {
        throw new Error("small");
      }
    } catch (_) {
      fs.writeFileSync(path.join(outDir, c.id + ".svg"), wordmarkSvg(c));
      console.log("wordmark", c.id);
    }

    manifest.push({
      id: c.id,
      name: c.name,
      subtitle: c.subtitle,
      logo: "assets/clients/" + logoFile
    });
  }

  fs.writeFileSync(
    path.join(__dirname, "../js/clients.js"),
    "const ARS_CLIENT_LOGOS = " + JSON.stringify(manifest, null, 2) + ";\n"
  );
  console.log("manifest written");
})();
