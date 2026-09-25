/**
 * A. Rehman & Sons — Official Product Database
 * 22 Verified Commercial Formulations
 * Specialist in: LAUNDRY, KITCHEN & STEWARDING, HOUSEKEEPING
 */

const ARS_PRODUCTS = [
  {
    "id": "zepol-ab",
    "sNo": "1.1",
    "name": "ZEPOL AB",
    "category": "kitchen",
    "stewarding": true,
    "packaging": "25 kg",
    "description": "Heavy-duty commercial dishwashing & degreasing liquid detergent — 100% biodegradable & benzene-free.",
    "fullDetails": {
      "categoryName": "Kitchen & Stewarding",
      "applications": "Heavy-duty manual dishwashing, pots, pans, cutlery, food preparation utensils, and stainless steel kitchen surfaces in commercial hotels and restaurants.",
      "dosage": "10 ml to 20 ml per 5 Liters of warm water (approx. 1:250 - 1:500 dilution depending on grease intensity).",
      "ph": "7.0 - 8.0 (Neutral, skin-safe formulation).",
      "activeIngredients": "Linear Alkylbenzene Sulfonate, Biodegradable Surfactants, Foam Boosters, Skin Conditioning Agents.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Non-toxic, food-contact safe after rinsing. Avoid contact with eyes; rinse thoroughly with clean water if contact occurs."
    }
  },
  {
    "id": "zeklor-s",
    "sNo": "1.2",
    "name": "ZEKLOR S",
    "category": "kitchen",
    "stewarding": true,
    "packaging": "25 kg",
    "description": "Specialized destaining sanitizer for ceramic cups, teapots, coffee urns, and melamine crockery.",
    "fullDetails": {
      "categoryName": "Kitchen & Stewarding",
      "applications": "Rapidly removes stubborn tannins, tea stains, coffee stains, and food pigmentation from china, melamine, plasticware, and stainless steel tea urns.",
      "dosage": "Soak 10–15 minutes in solution of 15–20 grams per Liter of warm water (50°C–60°C).",
      "ph": "10.5 - 11.5 (Mildly alkaline destaining oxidizer).",
      "activeIngredients": "Stabilized Chlorine Destaining Agents, Alkaline Builders, Chelating Sequesterants.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Do not mix with acid solutions. Store in a cool dry area away from direct sunlight."
    }
  },
  {
    "id": "descaler-h3",
    "sNo": "1.3",
    "name": "DESCALER H3",
    "category": "kitchen",
    "stewarding": true,
    "packaging": "25 kg",
    "description": "Concentrated food-grade acid descaler for commercial dishwashers, bain-maries, boilers, and water heaters.",
    "fullDetails": {
      "categoryName": "Kitchen & Stewarding",
      "applications": "Dissolves severe limescale, calcium carbonate, and mineral scale in industrial dishwashers, steam tables, bain-maries, kettles, and kitchen piping.",
      "dosage": "Dilute 50 ml to 100 ml per Liter of warm water. Circulate for 20–30 minutes, then drain and rinse thoroughly.",
      "ph": "1.0 - 2.0 (Strong organic/inorganic acid compound).",
      "activeIngredients": "Inhibited Phosphoric & Sulfamic Acid Blend, Metal Corrosion Inhibitors, Wetting Agents.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Corrosive. Wear rubber gloves and goggles during application. Do not use on galvanized surfaces or aluminum."
    }
  },
  {
    "id": "oven-cleaner",
    "sNo": "1.4",
    "name": "OVEN CLEANER",
    "category": "kitchen",
    "stewarding": true,
    "packaging": "25 kg",
    "description": "Extra-strength viscous carbon & baked-on grease stripper for commercial ovens, grills, and rotisseries.",
    "fullDetails": {
      "categoryName": "Kitchen & Stewarding",
      "applications": "Heavy commercial kitchen ovens, tandoors, char-broilers, grill grates, deep fat fryers, and carbon-encrusted cooking equipment.",
      "dosage": "Use neat (undiluted) on warm surfaces (50°C–60°C). Allow 10–15 minutes contact time, scrub and wipe clean with damp cloth.",
      "ph": "13.0 - 14.0 (High alkaline caustic stripper).",
      "activeIngredients": "Sodium Hydroxide, Penetrating Surfactants, Thickening Polymers for vertical surface clinging.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Highly alkaline. Always wear gloves, face shield, and protective apron. Rinse surfaces with potable water before cooking."
    }
  },
  {
    "id": "grease-cutter",
    "sNo": "1.5",
    "name": "GREASE CUTTER",
    "category": "kitchen",
    "stewarding": true,
    "packaging": "25 kg",
    "description": "Fast-acting industrial solvent-detergent degreaser for kitchen exhaust hoods, filters, and quarry tile floors.",
    "fullDetails": {
      "categoryName": "Kitchen & Stewarding",
      "applications": "Commercial kitchen exhaust canopies, grease baffles/filters, stainless steel splashbacks, floor drains, and oily kitchen flooring.",
      "dosage": "Light grease: 20 ml/L. Heavy baked grease: 100 ml to 200 ml/L of hot water. Can be used neat for deep baffle soaking.",
      "ph": "11.5 - 12.5 (Alkaline degreasing agent).",
      "activeIngredients": "Glycol Ethers, Alkaline Builders, Non-ionic Emulsifiers, Sequestering Agents.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Wear protective gloves. Keep away from open flame. Ensure adequate kitchen ventilation."
    }
  },
  {
    "id": "bio-detergent",
    "sNo": "1.6",
    "name": "BIO-DETERGENT",
    "category": "kitchen",
    "stewarding": true,
    "packaging": "25 kg",
    "description": "Multi-enzyme food-waste breakdown detergent for automated dishwashing and kitchen grease trap maintenance.",
    "fullDetails": {
      "categoryName": "Kitchen & Stewarding",
      "applications": "Automated dishwashing machines, stewarding soak tanks, kitchen pipe line clearing, and biological grease trap odor control.",
      "dosage": "2–4 grams per Liter in automated dishwashers; 100 ml daily dosing into kitchen grease traps.",
      "ph": "7.5 - 8.5 (Enzyme-stabilized neutral formula).",
      "activeIngredients": "Protease, Amylase and Lipase Enzymes, Non-ionic Biodegradable Surfactants, Bio-catalysts.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Store below 35°C to preserve enzyme activity. Safe for plumbing, septic tanks, and municipal sewer systems."
    }
  },
  {
    "id": "t-pol",
    "sNo": "1.7",
    "name": "T-POL",
    "category": "kitchen",
    "stewarding": true,
    "packaging": "25 kg",
    "description": "Universal multi-surface liquid detergent for general catering, glass, tableware, and food prep counters.",
    "fullDetails": {
      "categoryName": "Kitchen & Stewarding",
      "applications": "Daily wipe-down of stainless steel prep tables, dining furniture, kitchen tiling, glassware, and light food contact surfaces.",
      "dosage": "15 ml to 30 ml per 10 Liters of water for general wiping and mopping.",
      "ph": "7.0 - 7.5 (Completely neutral & mild).",
      "activeIngredients": "Anionic & Non-ionic Surfactant Blend, Coconut Diethanolamide, Deionized Water.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Gentle on hands and surfaces. Free from abrasive fillers, perfumes, and caustic residues."
    }
  },
  {
    "id": "zepol-sc-10",
    "sNo": "2.1",
    "name": "ZEPOL SC 10",
    "category": "laundry",
    "packaging": "25 kg",
    "description": "Enzyme-boosted liquid laundry detergent designed for protein, blood, food, and organic stains in hotels & hospitals.",
    "fullDetails": {
      "categoryName": "Commercial Laundry",
      "applications": "Institutional linen, hotel bedsheets, bath towels, hospital scrubs, and F&B table linen. Operates across 30°C–65°C.",
      "dosage": "3 ml to 6 ml per kg of dry linen depending on soil level.",
      "ph": "8.5 - 9.5.",
      "activeIngredients": "Protease Enzymes, Optical Brightening Agents, Soil Anti-Redeposition Polymers.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Industrial laundry chemical. Avoid breathing mist; store sealed in cool area."
    }
  },
  {
    "id": "zepol-sc-100",
    "sNo": "2.2",
    "name": "ZEPOL SC 100",
    "category": "laundry",
    "packaging": "25 kg",
    "description": "Heavy-duty built single-shot synthetic detergent liquid for heavy grease and high-temperature laundering.",
    "fullDetails": {
      "categoryName": "Commercial Laundry",
      "applications": "Heavily soiled chef coats, kitchen rags, mechanic overalls, industrial uniforms, and heavy cotton hotel linen at 60°C–90°C.",
      "dosage": "4 ml to 8 ml per kg of dry linen.",
      "ph": "11.5 - 12.5 (High alkaline built detergent).",
      "activeIngredients": "Synthetic Non-ionic Surfactants, Silicates, Sequestering Agents, Optical Enhancers.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Alkaline liquid. Use automatic liquid dosing or wear rubber gloves for manual dispensing."
    }
  },
  {
    "id": "zeklor-ss",
    "sNo": "2.3",
    "name": "ZEKLOR SS",
    "category": "laundry",
    "packaging": "25 kg",
    "description": "Stabilized commercial liquid chlorine bleach for brilliant whites and hospital-grade sanitization.",
    "fullDetails": {
      "categoryName": "Commercial Laundry",
      "applications": "White cotton hospital bed sheets, surgical towels, hotel white linens. Destroys pathogens, mildew, and yellowing.",
      "dosage": "3 ml to 6 ml per kg of dry linen at 55°C–65°C. Bleach cycle 8–10 minutes.",
      "ph": "11.0 - 12.0.",
      "activeIngredients": "Stabilized Sodium Hypochlorite (12–15% available chlorine), Alkaline Stabilizers.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Use ONLY on white bleach-safe fabrics. Never mix directly with acids (liberates toxic chlorine gas)."
    }
  },
  {
    "id": "zeklor-o",
    "sNo": "2.4",
    "name": "ZEKLOR O",
    "category": "laundry",
    "packaging": "25 kg",
    "description": "High-grade 130-volume oxygen color-safe liquid bleach effective on both colored and delicate fabrics.",
    "fullDetails": {
      "categoryName": "Commercial Laundry",
      "applications": "Colored hotel uniform garments, guest laundry, delicate fabrics, tablecloths, and colored patient apparel.",
      "dosage": "2 ml to 5 ml per kg of dry linen at 60°C–80°C.",
      "ph": "3.5 - 4.5 (Stabilized acidic peroxide release).",
      "activeIngredients": "High Concentration Hydrogen Peroxide (35–50%), Organic Peroxide Stabilizers.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Strong oxidizing agent. Store in vented containers away from direct heat and organic materials."
    }
  },
  {
    "id": "d-sour-zx",
    "sNo": "2.5",
    "name": "D-SOUR ZX",
    "category": "laundry",
    "packaging": "25 kg",
    "description": "Liquid laundry sour & antichlor neutralizer for the final rinse cycle — prevents yellowing and fabric degradation.",
    "fullDetails": {
      "categoryName": "Commercial Laundry",
      "applications": "Final rinse of all hotel, hospital, and commercial wash loads. Neutralizes residual alkali and chlorine to skin-compatible pH 5.5–6.5.",
      "dosage": "1.5 ml to 3 ml per kg dry linen in final rinse.",
      "ph": "1.5 - 2.5.",
      "activeIngredients": "Synergistic Acid Neutralizers, Reducing Anti-Chlor Agents, Iron Inhibitors.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Acidic chemical. Dispense through laundry injection systems or handle with rubber gloves."
    }
  },
  {
    "id": "softener-cna",
    "sNo": "2.6",
    "name": "SOFTENER CNA",
    "category": "laundry",
    "packaging": "25 kg",
    "description": "Premium cationic fabric softener with antistatic properties and long-lasting fresh fragrance for hotel linens.",
    "fullDetails": {
      "categoryName": "Commercial Laundry",
      "applications": "Final rinse softening for hotel towels, bedsheets, bathrobes, table linens, and uniforms. Imparts luxurious fluffy touch and eases ironing.",
      "dosage": "2 ml to 4 ml per kg dry linen in final rinse with D-SOUR ZX.",
      "ph": "3.0 - 4.5.",
      "activeIngredients": "Quaternary Cationic Softening Surfactants, Antistatic Compounds, Encapsulated Perfume.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Do not pour directly onto dry fabrics. Add to water during final rinse."
    }
  },
  {
    "id": "amrole",
    "sNo": "2.7",
    "name": "AMROLE",
    "category": "laundry",
    "packaging": "25 kg",
    "description": "Specialized high-potency textile auxiliary & stain lifter for stubborn dye-run, cosmetics, and industrial stains.",
    "fullDetails": {
      "categoryName": "Commercial Laundry",
      "applications": "Spotting and wash bath booster for guest laundry, banquet tablecloth dye transfer, makeup/lipstick, and pharmaceutical stains.",
      "dosage": "1 ml to 3 ml per kg dry linen in wash bath, or dilute 1:5 for manual spotting table application.",
      "ph": "7.0 - 8.0.",
      "activeIngredients": "Ethoxylated Fatty Alcohols, Solvent Emulsifiers, Anti-Redeposition Complexes.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Flammable when concentrated. Keep away from ignition sources; seal tightly."
    }
  },
  {
    "id": "rust-remour",
    "sNo": "2.8",
    "name": "RUST REMOVER",
    "category": "laundry",
    "packaging": "5 kg",
    "description": "Professional concentrated rust stain eliminator for boiler water iron spots, rust stains, and metal oxidation marks.",
    "fullDetails": {
      "categoryName": "Commercial Laundry",
      "applications": "Direct spotting on yellow, orange, and reddish iron/rust stains on fabrics caused by steam lines, water pipelines, or metal hangers.",
      "dosage": "Apply 2–3 drops directly to moistened rust stain. Allow 1–2 minutes until stain disappears, then flush immediately with water.",
      "ph": "1.0 - 2.0 (High active acid rust complexer).",
      "activeIngredients": "Oxalic Acid & Fluoride Complex Inhibitors, Penetrating Surfactants.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "POISON / TOXIC. Wear chemical gloves. Never allow to dry on fabric; always flush with fresh water."
    }
  },
  {
    "id": "zeklor-hard",
    "sNo": "2.9",
    "name": "ZEKLOR HARD",
    "category": "laundry",
    "packaging": "25 kg",
    "description": "Hard water sequestering agent & calcium/magnesium chelating booster for commercial washhouses.",
    "fullDetails": {
      "categoryName": "Commercial Laundry",
      "applications": "Essential in areas with high water hardness (>150 ppm TDS) to prevent linen greying, fabric stiffness, and detergent waste.",
      "dosage": "1 to 3 grams per Liter of wash water depending on water test hardness.",
      "ph": "9.0 - 10.0.",
      "activeIngredients": "Tetrasodium EDTA, Polycarboxylates, Phosphonates.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Non-corrosive when diluted. Store dry and sealed."
    }
  },
  {
    "id": "carpet-shampoo",
    "sNo": "3.1",
    "name": "CARPET SHAMPOO",
    "category": "housekeeping",
    "packaging": "25 kg",
    "description": "High-foam dry extraction carpet & upholstery shampoo — revives fibers, removes traffic stains, and dries to vacuumable powder.",
    "fullDetails": {
      "categoryName": "Housekeeping & Facility Care",
      "applications": "Hotel corridor carpets, guest room rugs, banquet hall carpets, and fabric upholstered armchairs and sofas.",
      "dosage": "1:20 to 1:30 with warm water for rotary brush carpet machines; 1:10 for manual stain scrubbing.",
      "ph": "7.5 - 8.5 (Neutral fiber safe).",
      "activeIngredients": "High-Foaming Anionic Surfactants, Polymer Soil Encapsulators, Fiber Conditioning Fragrance.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Safe on wool and synthetic blends. Test in inconspicuous corner for colorfastness before full application."
    }
  },
  {
    "id": "gpc",
    "sNo": "3.2",
    "name": "G.P.C",
    "category": "housekeeping",
    "packaging": "25 kg",
    "description": "General Purpose Cleaner for daily streak-free cleaning of tiles, marble, vinyl, laminate, and painted walls.",
    "fullDetails": {
      "categoryName": "Housekeeping & Facility Care",
      "applications": "Hotel lobbies, guest rooms, hospital hallways, office corridors, polished stone, porcelain tiles, and washable surfaces.",
      "dosage": "20 ml to 40 ml per 10 Liters of water for daily damp mopping; 1:10 for spray-and-wipe cleaning.",
      "ph": "7.0 - 8.0 (Neutral, non-stripping).",
      "activeIngredients": "Biodegradable Neutral Detergent Surfactants, Pine / Citrus Fresh Fragrance, Chelating Agents.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Leaves no sticky film or residue. Does not dull polished floor finishes."
    }
  },
  {
    "id": "hand-cleaning-shampoo",
    "sNo": "3.3",
    "name": "HAND CLEANING SHAMPOO",
    "category": "housekeeping",
    "packaging": "25 kg",
    "description": "Luxurious antibacterial pearlized hand soap with cosmetic glycerine for hotel restrooms, hospitals, and executive offices.",
    "fullDetails": {
      "categoryName": "Housekeeping & Personal Hygiene",
      "applications": "Wall-mounted soap dispensers in hotel guest restrooms, public washrooms, healthcare patient areas, and corporate facilities.",
      "dosage": "Use neat via manual or automatic infrared soap dispensers. Dispenses 1.0–1.5 ml per pump.",
      "ph": "6.0 - 6.5 (Balanced to natural skin mantle).",
      "activeIngredients": "Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerine, Chloroxylenol Antibacterial Agent, Pearlizing Agents.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Dermatologically tested. Hypoallergenic and non-drying even with frequent handwashing."
    }
  },
  {
    "id": "lavatory-floor-cleaner",
    "sNo": "3.4",
    "name": "LAVATORY / FLOOR CLEANER",
    "category": "housekeeping",
    "packaging": "25 kg",
    "description": "Heavy-duty germicidal acid cleaner for toilet bowls, urinals, shower cubicles, and ceramic bathroom tiling.",
    "fullDetails": {
      "categoryName": "Housekeeping & Facility Care",
      "applications": "Removal of uric acid encrustation, water hardness rings, soap scum, and bathroom odor in public & hotel washrooms.",
      "dosage": "Use neat on toilet bowls and urinals with bowl brush; dilute 50 ml per 5 Liters of water for bathroom floor scrubbing.",
      "ph": "1.5 - 2.5 (Disinfecting acid formula).",
      "activeIngredients": "Organic Acid Blend, Quaternary Ammonium Compounds, Thickened Clinging Surfactant.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Do not use on natural marble or terrazzo. Wear protective rubber gloves during application."
    }
  },
  {
    "id": "zeklor-chlorine",
    "sNo": "3.5",
    "name": "ZEKLOR CHLORINE",
    "category": "housekeeping",
    "packaging": "25 kg",
    "description": "Commercial surface disinfectant & odor eliminator for hospital floors, waste disposal areas, and sanitary facilities.",
    "fullDetails": {
      "categoryName": "Housekeeping & Infection Control",
      "applications": "Hospital ward floor mopping, morgue disinfection, garbage chutes, sewage drains, and public restroom sanitization.",
      "dosage": "10 ml to 20 ml per Liter of water for general disinfection (approx. 500–1000 ppm available chlorine).",
      "ph": "10.5 - 11.5.",
      "activeIngredients": "Sodium Hypochlorite Disinfectant Solution, Stabilizing Alkali.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Avoid breathing vapors. Never mix with toilet bowl cleaners, ammonia, or acids."
    }
  },
  {
    "id": "glass-cleaner",
    "sNo": "3.6",
    "name": "GLASS CLEANER",
    "category": "housekeeping",
    "packaging": "25 kg",
    "description": "Professional fast-evaporating glass & mirror polish — leaves glass crystal-clear with zero streaks, haze, or film.",
    "fullDetails": {
      "categoryName": "Housekeeping & Facility Care",
      "applications": "Hotel room mirrors, storefront glass, lobby chandeliers, showcase counters, elevator stainless steel, and window panes.",
      "dosage": "Use neat via trigger spray bottle. Mist lightly on surface and wipe immediately with microfiber cloth or squeegee.",
      "ph": "7.0 - 8.0 (Neutral & safe on treated glass).",
      "activeIngredients": "Isopropyl Alcohol, Deionized Water, Glycol Ether Solvent, Anti-Static Dust Repellent.",
      "packagingOptions": [
        "5 kg",
        "10 kg",
        "25 kg",
        "200 kg Drum"
      ],
      "safety": "Keep away from sparks and open flames. Store in cool, well-ventilated location."
    }
  }
];

const ARS_CATEGORIES = {
  all: { label: "All Products (22)", count: 22 },
  laundry: { label: "Laundry Products (9)", count: 9 },
  kitchen: { label: "Kitchen Products (7)", count: 7 },
  stewarding: { label: "Stewarding (7)", count: 7 },
  housekeeping: { label: "Housekeeping (6)", count: 6 }
};

const ARS_STANDARD_SIZES = ["5 kg", "10 kg", "25 kg", "200 kg Drum"];

const ARS_PACKAGE_SIZES = {
  kitchen: ARS_STANDARD_SIZES,
  laundry: ARS_STANDARD_SIZES,
  stewarding: ARS_STANDARD_SIZES,
  housekeeping: ARS_STANDARD_SIZES
};

function isFiveKgPack(value) {
  return /^5\s*kg/i.test(String(value || "").trim());
}

function getPackageSizes(product) {
  return ["5 kg", "10 kg", "25 kg", "200 kg Drum"];
}

function getDefaultPackaging(product) {
  return "5 kg";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { ARS_PRODUCTS, ARS_CATEGORIES, ARS_PACKAGE_SIZES, ARS_STANDARD_SIZES, getPackageSizes, getDefaultPackaging, isFiveKgPack };
}
