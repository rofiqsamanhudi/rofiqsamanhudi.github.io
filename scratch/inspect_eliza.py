import re

with open('scratch/eliza_0.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Find root variables
root_vars = re.findall(r'--[a-zA-Z0-9_-]+:\s*[^;]+;', css)
print("CSS Variables in CSS:")
for v in root_vars[:40]:
    print(" ", v)

# Find color hexes
hexes = set(re.findall(r'#[0-9a-fA-F]{3,8}', css))
print("\nUnique hex colors:", sorted(hexes))

# Find font families
fonts = set(re.findall(r'font-family:\s*([^;}]+)', css))
print("\nFont families:", fonts)

with open('scratch/eliza.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Look for font imports or inline styles in HTML
font_links = re.findall(r'https://fonts\.googleapis\.com/[^"\'\s>]+', html)
print("\nGoogle fonts in HTML:", font_links)

# Look for style tags or inline styles
styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL)
print(f"\nInline styles count: {len(styles)}")
for s in styles:
    inline_vars = re.findall(r'--[a-zA-Z0-9_-]+:\s*[^;]+;', s)
    if inline_vars:
        print("Inline vars:")
        for iv in inline_vars:
            print(" ", iv)

