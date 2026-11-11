import urllib.request
import re
import os

os.makedirs('scratch', exist_ok=True)
url = 'https://eliza-portfolio-six.vercel.app'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print('Fetched HTML length:', len(html))
        with open('scratch/eliza.html', 'w', encoding='utf-8') as f:
            f.write(html)
            
        css_links = re.findall(r'href=["\']([^"\']+\.css[^"\']*)["\']', html)
        print('CSS links:', css_links)
        for i, css in enumerate(css_links):
            full_css = css if css.startswith('http') else url + ('/' if not css.startswith('/') else '') + css
            print('Fetching CSS:', full_css)
            try:
                creq = urllib.request.Request(full_css, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(creq) as cresp:
                    css_data = cresp.read().decode('utf-8', errors='ignore')
                    with open(f'scratch/eliza_{i}.css', 'w', encoding='utf-8') as f:
                        f.write(css_data)
                    print(f'Saved CSS {i} length:', len(css_data))
            except Exception as ce:
                print('CSS fetch error:', ce)
except Exception as e:
    print('Error:', e)

