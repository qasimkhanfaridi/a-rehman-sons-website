const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'products.js');
let code = fs.readFileSync(filePath, 'utf-8');

// Match packagingOptions: [...]
const regex = /packagingOptions:\s*\[[^\]]+\]/g;
let count = 0;
code = code.replace(regex, () => {
  count++;
  return 'packagingOptions: ["5 kg", "10 kg", "25 kg", "200 kg Drum"]';
});

fs.writeFileSync(filePath, code, 'utf-8');
console.log(`Successfully standardized packagingOptions in ${count} products in js/products.js`);
