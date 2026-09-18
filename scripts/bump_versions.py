import os, re
html_dir = r'C:\Users\qasim.faridi\source\repos\a-rehman-sons-website'
pages = ['index.html','about.html','products.html','certifications.html',
         'clients.html','international.html','contact.html','order.html']
for p in pages:
    fp = os.path.join(html_dir, p)
    if not os.path.exists(fp):
        print('NOT FOUND:', p)
        continue
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()
    new = re.sub(r'styles\.css\?v=[\d.]+', 'styles.css?v=5.2', c)
    # ui.js with version
    new = re.sub(r'ui\.js\?v=[\d.]+', 'ui.js?v=5.2', new)
    # ui.js without version (bare reference)
    new = re.sub(r'ui\.js"', 'ui.js?v=5.2"', new)
    if new != c:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new)
        print('Updated:', p)
    else:
        print('No changes in:', p)
