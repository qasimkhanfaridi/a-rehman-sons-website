import os
import re

html_dir = r"C:\Users\qasim.faridi\source\repos\a-rehman-sons-website"
subpages = [
    "about.html", "products.html", "certifications.html",
    "clients.html", "international.html", "contact.html", "order.html"
]

for p in subpages:
    fp = os.path.join(html_dir, p)
    with open(fp, "r", encoding="utf-8") as f:
        c = f.read()

    # Replace <div class="brand-text">\n          <h1>A. REHMAN &amp; SONS</h1>
    new_c = re.sub(
        r'(<div class="brand-text">\s*)<h1>(.*?)</h1>',
        r'\1<span class="brand-title">\2</span>',
        c
    )
    if new_c != c:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(new_c)
        print(f"Single H1 applied to {p}")
    else:
        print(f"No change in {p}")
