from bs4 import BeautifulSoup
import json

with open('scratch/eliza.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("Title:", soup.title.string if soup.title else "No title")

# Find main sections and headings
headings = soup.find_all(['h1', 'h2', 'h3', 'h4'])
print("\nHeadings:")
for h in headings:
    print(f"<{h.name} class='{h.get('class', [])}'>: {h.get_text(strip=True)[:80]}")

# Look at main container classes
main = soup.find('main') or soup.find('body')
if main:
    print("\nMain classes:", main.get('class', []))

# Look at navigation
nav = soup.find('nav') or soup.find('header')
if nav:
    print("\nNav/Header classes:", nav.get('class', []))
    print("Nav text:", nav.get_text(strip=True)[:150])

# Look for specific class names used across elements
classes = set()
for tag in soup.find_all(True):
    for c in tag.get('class', []):
        classes.add(c)

print(f"\nTotal unique classes: {len(classes)}")
relevant_classes = [c for c in classes if any(k in c.lower() for k in ['bg-', 'text-', 'border-', 'rounded', 'font-'])]
print("\nSample style classes (first 30):", sorted(relevant_classes)[:30])

