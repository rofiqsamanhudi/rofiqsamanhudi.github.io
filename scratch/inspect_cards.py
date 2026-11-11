from bs4 import BeautifulSoup

with open('scratch/eliza.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("=== HERO CONTENT ===")
home = soup.find('section', id='home')
if home:
    for el in home.find_all(['h1', 'p', 'span', 'div'], recursive=False):
        pass
    print(home.get_text(separator=' | ', strip=True)[:400])

print("\n=== ABOUT CONTENT ===")
about = soup.find('section', id='about')
if about:
    print(about.get_text(separator=' | ', strip=True)[:400])

print("\n=== PROJECTS SAMPLE ===")
projects = soup.find('section', id='projects')
if projects:
    cards = projects.find_all('div', recursive=True)
    for c in cards:
        if 'Glucare' in c.get_text():
            print("Project card class:", c.get('class', []))
            print("Project card text:", c.get_text(separator=' | ', strip=True)[:300])
            break

print("\n=== EXPERIENCE SAMPLE ===")
exp = soup.find('section', id='experience')
if exp:
    print(exp.get_text(separator=' | ', strip=True)[:400])

