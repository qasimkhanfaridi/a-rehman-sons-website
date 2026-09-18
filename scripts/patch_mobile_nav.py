#!/usr/bin/env python3
"""
Patch all HTML pages to add:
1. Hamburger button before </header>
2. Mobile nav header (close row) inside <nav class="nav">
"""

import os
import re

HTML_DIR = r"C:\Users\qasim.faridi\source\repos\a-rehman-sons-website"

# The hamburger button to insert right before </div> that closes .header-inner
HAMBURGER_BTN = '''      <button class="nav-mobile-toggle" id="nav-mobile-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="main-nav">
        <svg class="icon-menu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>'''

# The mobile nav header row inserted as first child of <nav class="nav"
MOBILE_NAV_HEADER = '''        <div class="nav-mobile-header" aria-hidden="true">
          <span class="nav-mobile-header-brand">A. Rehman &amp; Sons</span>
          <button class="nav-mobile-close" id="nav-mobile-close" aria-label="Close navigation">&#10005;</button>
        </div>'''

HTML_FILES = [
    "index.html", "about.html", "products.html", "certifications.html",
    "clients.html", "international.html", "contact.html", "order.html"
]

patched = []
skipped = []

for fname in HTML_FILES:
    fpath = os.path.join(HTML_DIR, fname)
    if not os.path.exists(fpath):
        skipped.append(fname + " (not found)")
        continue

    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # 1. Add hamburger button before </nav> closing... actually before the </div> of header-inner
    # Find pattern: after </nav> before </div> (that closes header-inner)
    if 'nav-mobile-toggle' in content:
        skipped.append(fname + " (already patched)")
        continue

    # Insert hamburger button right before </header>
    # We look for the pattern: </nav>\n    </div>\n  </header>
    # and insert the button between </nav> and </div>
    content = re.sub(
        r'(</nav>)(\s*\n\s*</div>\s*\n\s*</header>)',
        r'\1\n' + HAMBURGER_BTN + r'\2',
        content,
        count=1
    )

    # 2. Add mobile nav header as the FIRST child of <nav class="nav" id="main-nav">
    content = re.sub(
        r'(<nav class="nav" id="main-nav">)',
        r'\1\n' + MOBILE_NAV_HEADER,
        content,
        count=1
    )

    if content != original:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        patched.append(fname)
    else:
        skipped.append(fname + " (no nav pattern found)")

print(f"PATCHED {len(patched)} files: {', '.join(patched)}")
print(f"SKIPPED: {', '.join(skipped) if skipped else 'none'}")
