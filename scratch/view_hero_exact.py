from bs4 import BeautifulSoup

with open('scratch/eliza.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
home = soup.find('section', id='home')

print("HERO HTML:\n")
print(home.prettify())

