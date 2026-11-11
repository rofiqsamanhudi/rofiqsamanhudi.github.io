from bs4 import BeautifulSoup

with open('scratch/eliza.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("--- NAV BAR ---")
nav = soup.find('header') or soup.find('nav')
if nav:
    print(nav.prettify()[:600])

print("\n--- HERO SECTION ---")
hero = soup.find('section')
if hero:
    print(hero.prettify()[:800])

print("\n--- ALL SECTIONS ---")
sections = soup.find_all('section')
for i, sec in enumerate(sections):
    sec_id = sec.get('id', f'sec-{i}')
    heading = sec.find(['h1', 'h2', 'h3'])
    h_text = heading.get_text(strip=True) if heading else 'No heading'
    print(f"Section #{i} id='{sec_id}' classes='{sec.get('class', [])}': {h_text}")

