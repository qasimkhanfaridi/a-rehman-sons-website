import os
import re

html_dir = r"C:\Users\qasim.faridi\source\repos\a-rehman-sons-website"
pages = [
    "index.html", "about.html", "products.html", "certifications.html",
    "clients.html", "international.html", "contact.html", "order.html"
]

pattern = re.compile(r'\s*<div class="nav-mobile-header"[^>]*>.*?</div>', re.DOTALL)

for p in pages:
    fp = os.path.join(html_dir, p)
    with open(fp, "r", encoding="utf-8") as f:
        c = f.read()
    new_c, count = pattern.subn("", c)
    if count > 0:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(new_c)
        print(f"Removed nav-mobile-header from {p} ({count} removed)")
    else:
        print(f"Clean: {p}")
