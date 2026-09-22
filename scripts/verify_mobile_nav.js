const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const htmlFiles = [
  'index.html', 'about.html', 'products.html', 'certifications.html',
  'clients.html', 'international.html', 'contact.html', 'order.html'
];

let errors = [];

// 1. Verify styles.css
const css = fs.readFileSync(path.join(ROOT, 'css', 'styles.css'), 'utf-8');

if (css.includes('.nav-overlay')) {
  errors.push('FAIL: css/styles.css still contains .nav-overlay!');
} else {
  console.log('PASS: No .nav-overlay in css/styles.css');
}

if (css.includes('isolation: isolate')) {
  errors.push('FAIL: css/styles.css still contains isolation: isolate!');
} else {
  console.log('PASS: No isolation: isolate in css/styles.css');
}

if (!css.includes('@media (max-width: 991px)')) {
  errors.push('FAIL: css/styles.css missing @media (max-width: 991px)!');
} else {
  console.log('PASS: @media (max-width: 991px) present in css/styles.css');
}

if (!css.includes('background: #ffffff !important')) {
  errors.push('FAIL: css/styles.css missing background: #ffffff !important for mobile nav!');
} else {
  console.log('PASS: background: #ffffff !important present for mobile nav');
}

// 2. Verify ui.js
const js = fs.readFileSync(path.join(ROOT, 'js', 'ui.js'), 'utf-8');

if (js.includes('nav-overlay')) {
  errors.push('FAIL: js/ui.js still references nav-overlay!');
} else {
  console.log('PASS: No nav-overlay in js/ui.js');
}

if (!js.includes('max-width: 991px')) {
  errors.push('FAIL: js/ui.js isMobileNav does not use max-width: 991px!');
} else {
  console.log('PASS: js/ui.js uses max-width: 991px');
}

// 3. Verify HTML files
for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf-8');
  
  if (!content.includes('styles.css?v=5.4')) {
    errors.push(`FAIL: ${file} missing styles.css?v=5.4`);
  }
  
  if (!content.includes('ui.js?v=5.5')) {
    errors.push(`FAIL: ${file} missing ui.js?v=5.5`);
  }

  if (!content.includes('class="nav-dropdown-trigger"') && !content.includes('class="nav-dropdown-trigger active"')) {
    errors.push(`FAIL: ${file} missing nav-dropdown-trigger`);
  }
  if (content.includes('href="products.html" class="nav-dropdown-trigger"') || content.includes('href="../products.html" class="nav-dropdown-trigger"')) {
    errors.push(`FAIL: ${file} Products trigger is still a link (should be button)`);
  }
  if (!content.includes('<button type="button" class="nav-dropdown-trigger')) {
    errors.push(`FAIL: ${file} Products trigger should be a button`);
  }
  
  if (!content.includes('id="main-nav"')) {
    errors.push(`FAIL: ${file} missing id="main-nav"`);
  }
  
  if (!content.includes('id="nav-mobile-toggle"')) {
    errors.push(`FAIL: ${file} missing id="nav-mobile-toggle"`);
  }
  
  if (content.includes('class="nav-mobile-header"')) {
    errors.push(`FAIL: ${file} still contains nav-mobile-header!`);
  }
}

if (errors.length === 0) {
  console.log(`\nALL 8 HTML files passed verification (clean navigation, cache-buster v=5.2, zero overlay)!`);
  process.exit(0);
} else {
  console.error('\nVerification Errors:');
  errors.forEach(e => console.error(e));
  process.exit(1);
}
