import re

with open('scratch/eliza_0.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Search for color definitions of primary, secondary, background, etc.
matches = re.findall(r'(\.[a-zA-Z0-9_-]*(?:primary|secondary|tertiary|background|foreground)[a-zA-Z0-9_-]*\s*\{[^}]+\})', css)
print(f"Color class matches: {len(matches)}")
for m in matches[:25]:
    print(m)

# Also search for :root or theme definitions
themes = re.findall(r'(:root[^{]*\{[^}]+\})', css)
print("\nTheme root definitions:")
for t in themes:
    print(t[:500])

# Look for body background color
body_match = re.findall(r'(body[^{]*\{[^}]+\})', css)
print("\nBody definitions:")
for b in body_match:
    print(b)

