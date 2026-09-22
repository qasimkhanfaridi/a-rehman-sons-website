const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", "dist", ".git"].includes(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const patterns = [
  {
    from: /<a href="\.\.\/products\.html" class="nav-dropdown-trigger active">Products<\/a>/g,
    to: '<button type="button" class="nav-dropdown-trigger active" aria-expanded="false">Products</button>',
  },
  {
    from: /<a href="products\.html" class="nav-dropdown-trigger active">Products<\/a>/g,
    to: '<button type="button" class="nav-dropdown-trigger active" aria-expanded="false">Products</button>',
  },
  {
    from: /<a href="\.\.\/products\.html" class="nav-dropdown-trigger">Products<\/a>/g,
    to: '<button type="button" class="nav-dropdown-trigger" aria-expanded="false">Products</button>',
  },
  {
    from: /<a href="products\.html" class="nav-dropdown-trigger">Products<\/a>/g,
    to: '<button type="button" class="nav-dropdown-trigger" aria-expanded="false">Products</button>',
  },
];

let changed = 0;
for (const file of walk(".")) {
  let s = fs.readFileSync(file, "utf8");
  let t = s;
  for (const { from, to } of patterns) t = t.replace(from, to);
  if (t !== s) {
    fs.writeFileSync(file, t);
    changed++;
  }
}

const gen = path.join("scripts", "generate_product_pages.js");
if (fs.existsSync(gen)) {
  let s = fs.readFileSync(gen, "utf8");
  let t = s;
  for (const { from, to } of patterns) t = t.replace(from, to);
  if (t !== s) fs.writeFileSync(gen, t);
}

console.log("Updated HTML files:", changed);
