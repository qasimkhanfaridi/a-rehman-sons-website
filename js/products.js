/** Product catalog — extracted from A. Rehman & Sons company profile */
const ARS_PRODUCTS = [
  // LAUNDRY — Hand Feed & Dosing
  { id: "zepol-sc100-low-foam", name: "ZEPOL SC100 LOW FOAM", category: "laundry", packaging: "25 kg", description: "Special laundry detergent (low foam). Washes effectively between 40°C & 90°C." },
  { id: "zepol-sc100", name: "ZEPOL SC100", category: "laundry", packaging: "25 kg", description: "High performance synthetic single-shot detergent liquid." },
  { id: "zepol-sc100-extra", name: "ZEPOL SC 100 EXTRA", category: "laundry", packaging: "25 kg", description: "High performance, synthetic, single-shot detergent liquid for medium to high temperature processes." },
  { id: "zepol-sc100-x", name: "ZEPOL SC 100 X", category: "laundry", packaging: "25 kg", description: "High performance emulsifier for heavy soiling on synthetic fabrics." },
  { id: "zepol-sc100-emulsifier", name: "ZEPOL SC 100 EMULSIFIER", category: "laundry", packaging: "25 kg", description: "Liquid emulsifier for automatic dosing systems." },
  { id: "zepol-sc10", name: "ZEPOL SC 10", category: "laundry", packaging: "25 kg", description: "High performance detergent liquid with proteolytic enzymes for protein-based stains." },
  { id: "zepol-sc10-low-foam", name: "ZEPOL SC10 LOW FOAM", category: "laundry", packaging: "25 kg", description: "Low foam detergent for commercial and on-premise laundries." },
  { id: "zepol-sc10-high-foam", name: "ZEPOL SC10 (HIGH FOAM)", category: "laundry", packaging: "25 kg", description: "Powerful detergent for heavy oil and grease soiling on natural and synthetic fabrics." },
  { id: "zeklor-ss", name: "ZEKLOR SS", category: "laundry", packaging: "25 kg", description: "Stabilised organic chlorine release agent — safer than hypochlorite." },
  { id: "zeklor-o", name: "ZEKLOR O", category: "laundry", packaging: "25 kg", description: "130-volume oxygen bleach liquid effective on white and colored work." },
  { id: "zeklor-g", name: "ZEKLOR G", category: "laundry", packaging: "25 kg", description: "Oxygen bleach release agent with alkaline builders and optical brightening agent." },
  { id: "zeklor-g-extra", name: "ZEKLOR G EXTRA Laundry Boost", category: "laundry", packaging: "25 kg", description: "Highly concentrated liquid alkali booster and stain buster activator." },
  { id: "d-sour-zx", name: "D.SOUR ZX", category: "laundry", packaging: "25 kg", description: "Alkali neutraliser and anti-chlor for final rinse." },
  { id: "d-sour-zx-extra", name: "D-Sour ZX Extra", category: "laundry", packaging: "25 kg", description: "Alkali neutralising agent — prevents yellowing on presses and finishing machines." },
  { id: "zesoft-cna", name: "Lavender ZESOFT C.N.A.", category: "laundry", packaging: "25 kg", description: "Concentrated fabric conditioner with lavender fragrance." },
  { id: "zesoft-sna", name: "Lavender ZESOFT S.N.A.", category: "laundry", packaging: "25 kg", description: "Concentrated cationic fabric conditioner with lavender scent." },
  { id: "softener-cna", name: "SOFTNER C.N.A", category: "laundry", packaging: "25 kg", description: "Fabric softener for commercial laundries." },
  { id: "whitener-brightener", name: "WHITENER BRIGHTENER", category: "laundry", packaging: "25 kg", description: "Optical brightening agent for white linens." },
  { id: "zesoft", name: "ZESOFT", category: "laundry", packaging: "25 kg", description: "Fabric softener for automatic dosing systems." },
  { id: "laundry-powder-starch", name: "Laundry Powder Starch", category: "laundry", packaging: "25 kg", description: "Starch for professional laundry finishing." },

  // SPOTTING AGENTS
  { id: "soft-on-blue", name: "ZEPOL SOFT ON BLUE", category: "spotting", packaging: "5 kg", description: "Spotting agent for blue fabric stains." },
  { id: "soft-on-yellow", name: "ZEPOL SOFT ON YELLOW", category: "spotting", packaging: "5 kg", description: "Spotting agent for yellow fabric stains." },
  { id: "soft-on-red", name: "ZEPOL SOFT ON RED", category: "spotting", packaging: "5 kg", description: "Spotting agent for red fabric stains." },
  { id: "soft-on-green", name: "ZEPOL SOFT ON GREEN", category: "spotting", packaging: "5 kg", description: "Spotting agent for green fabric stains." },
  { id: "soft-on-brown", name: "ZEPOL SOFT ON BROWN", category: "spotting", packaging: "5 kg", description: "Spotting agent for brown fabric stains." },
  { id: "soft-on-white", name: "ZEPOL SOFT ON WHITE", category: "spotting", packaging: "5 kg", description: "Spotting agent for white fabric stains." },

  // STEWARDING / KITCHEN
  { id: "zepol-ab", name: "ZEPOL AB", category: "stewarding", packaging: "25 kg", description: "Heavy-duty liquid detergent — 100% naturally derived, benzene-free." },
  { id: "zepol-ab-lemon", name: "ZEPOL AB LEMON (Pots & Pan Detergent)", category: "stewarding", packaging: "25 kg", description: "Premium high-sudsing manual-wash formula for pots, pans, and utensils." },
  { id: "tepol-liquid", name: "Tepol Liquid (Dishwashing)", category: "stewarding", packaging: "25 kg", description: "All-purpose dishwashing with anti-bac properties. Citrus, Lemon, Anti-bac variants." },
  { id: "zeklor-s", name: "ZEKLOR S", category: "stewarding", packaging: "25 kg", description: "Removes coffee and tea stains from cups and kettles in 10–15 minutes." },
  { id: "grease-cutter", name: "GREASE CUTTER", category: "stewarding", packaging: "25 kg", description: "Concentrated heavy-duty butyl cleaner for industrial kitchens." },
  { id: "oven-cleaner-100x", name: "OVEN CLEANER 100X", category: "stewarding", packaging: "25 kg", description: "Highly concentrated cleaner for ovens, grills, fryers, and hoods." },

  // HOUSEKEEPING
  { id: "scale-h3-mild", name: "SCALE H3 MILD", category: "housekeeping", packaging: "25 kg", description: "Liquid acid descaler for heating and cooling systems." },
  { id: "carpet-shampoo", name: "CARPET SHAMPOO", category: "housekeeping", packaging: "25 kg", description: "Mild antibacterial formula for carpets, rugs, and upholstery." },
  { id: "zepol-gpc", name: "ZEPOL G P C", category: "housekeeping", packaging: "25 kg", description: "Removes soap scum, lime, scale from shower walls, tiles, and stainless steel." },
  { id: "natural-hand-cleaner", name: "NATURAL HAND CLEANER", category: "housekeeping", packaging: "25 kg / 5 kg", description: "Rich-lather hand cleaner — neutral pH with glycerine, biodegradable." },
  { id: "zeklor-ct-descaler", name: "ZEKLOR CT DESCALER", category: "housekeeping", packaging: "25 kg", description: "Low-foaming descaler for lime scale and hard-water deposits." }
];

const ARS_CATEGORIES = {
  laundry: { label: "Laundry", icon: "" },
  spotting: { label: "Spotting Agents", icon: "" },
  stewarding: { label: "Stewarding & Kitchen", icon: "" },
  housekeeping: { label: "Housekeeping", icon: "" }
};

const ARS_PRODUCT_IMAGE = "assets/products/gallon-blue.svg";

const ARS_CERTIFICATES = [
  { id: "iso-9001", name: "ISO 9001:2015", desc: "Quality Management Systems", image: "assets/certificates/iso-9001.png" },
  { id: "iso-45001", name: "ISO 45001:2018", desc: "Occupational Health & Safety", image: "assets/certificates/iso-45001.png" },
  { id: "haccp", name: "HACCP", desc: "Food Safety Critical Control Points", image: "assets/certificates/haccp.png" },
  { id: "halal", name: "HALAL", desc: "Halal Certified Products", image: "assets/certificates/halal.png" }
];

const ARS_CONTACT = {
  name: "A. Rehman & Sons",
  tagline: "Chemical & General Order Supplier",
  established: 1988,
  address: "G.P.O. Box No. 1020, Rawalpindi, Pakistan",
  warehouse: "Rawalpindi",
  tel: "051-5503203",
  fax: "051-5953130",
  whatsapp: ["923218502997", "923332158113"],
  whatsappDisplay: ["0321-8502997", "0333-2158113"],
  email: "ar_sons@hotmail.com"
};
