from pathlib import Path
import re

p = Path('index.html')
s = p.read_text(encoding='utf-8')

s = re.sub(r'\s*<!-- section-numbering-gallery:start -->.*?<!-- section-numbering-gallery:end -->\s*', '\n', s, flags=re.S)
s = re.sub(r'<span class="section-prefix">SECTION\s+\d+\s+—\s*</span>', '', s)
s = re.sub(r'\s*<!-- chapter-hellas-gallery:start -->.*?<!-- chapter-hellas-gallery:end -->\s*', '\n', s, flags=re.S)

def matching_div_end(text, start):
    token = re.compile(r'<div\b[^>]*>|</div\s*>', re.I)
    depth = 0
    for m in token.finditer(text, start):
        if m.group(0).lower().startswith('<div'):
            depth += 1
        else:
            depth -= 1
            if depth == 0:
                return m.end()
    raise RuntimeError('Could not find closing div')

section_starts = list(re.finditer(r'<section\b[^>]*>', s, flags=re.I))
replacements = []
number = 0
for idx, sm in enumerate(section_starts):
    sec_start = sm.start()
    sec_end = section_starts[idx+1].start() if idx + 1 < len(section_starts) else s.find('</body>', sm.end())
    if sec_end == -1:
        sec_end = len(s)
    block = s[sec_start:sec_end]
    head = re.search(r'<div\s+class="section-head"[^>]*>.*?<h2>(.*?)</h2>', block, flags=re.S|re.I)
    if not head:
        continue
    number += 1
    title = re.sub(r'<span class="section-prefix">.*?</span>', '', head.group(1), flags=re.S).strip()
    a = sec_start + head.start(1)
    b = sec_start + head.end(1)
    replacements.append((a, b, f'<span class="section-prefix">SECTION {number:02d} — </span>{title}'))

for a, b, val in reversed(replacements):
    s = s[:a] + val + s[b:]

if number < 3:
    raise SystemExit(f'Only {number} numbered sections found; refusing to commit')

org = re.search(r'<section\b[^>]*id=["\']organization["\'][^>]*>', s, flags=re.I)
if not org:
    raise SystemExit('Organization section not found')
head = re.search(r'<div\s+class="section-head"[^>]*>', s[org.end():], flags=re.I)
if not head:
    raise SystemExit('Organization section heading not found')
head_start = org.end() + head.start()
head_end = matching_div_end(s, head_start)

gallery = '''

    <!-- chapter-hellas-gallery:start -->
    <div class="chapter-hellas-gallery" aria-label="Chapter Hellas on the road">
      <div class="chapter-gallery-kicker">CHAPTER HELLAS <span>•</span> GREECE</div>
      <figure class="chapter-gallery-feature">
        <img src="assets/chapter-hellas-road-1.jpg?v=20260906" alt="Widows Sons MRA Chapter Hellas riders on the road in Greece" loading="lazy">
        <figcaption>Brotherhood on the road</figcaption>
      </figure>
      <figure>
        <img src="assets/chapter-hellas-road-2.jpg?v=20260906" alt="Widows Sons MRA Chapter Hellas riders in Athens" loading="lazy">
        <figcaption>Athens</figcaption>
      </figure>
      <figure>
        <img src="assets/chapter-hellas-road-3.jpg?v=20260906" alt="Widows Sons MRA Chapter Hellas riders in the Greek islands" loading="lazy">
        <figcaption>Hellas</figcaption>
      </figure>
    </div>
    <!-- chapter-hellas-gallery:end -->
'''
s = s[:head_end] + gallery + s[head_end:]

css = r'''
/* section-numbering-gallery:start */
.section-head .index-no{display:none!important;}
.section-head h2 .section-prefix{display:block;margin:0 0 9px;font-family:'Oswald',sans-serif;font-size:12px;line-height:1.2;font-weight:600;letter-spacing:.24em;color:var(--gold-bright);text-transform:uppercase;}
.chapter-hellas-gallery{display:grid;grid-template-columns:minmax(0,1.38fr) minmax(260px,.78fr);grid-template-rows:auto minmax(0,1fr) minmax(0,1fr);gap:14px;margin:-22px 0 58px;}
.chapter-gallery-kicker{grid-column:1/-1;display:flex;align-items:center;gap:10px;font-family:'Oswald',sans-serif;font-size:11.5px;line-height:1;letter-spacing:.24em;color:var(--steel);text-transform:uppercase;padding:0 2px 4px;}
.chapter-gallery-kicker span{color:var(--gold-bright);}
.chapter-hellas-gallery figure{position:relative;margin:0;min-height:218px;overflow:hidden;background:#080808;border:1px solid rgba(203,168,103,.38);box-shadow:0 18px 42px rgba(0,0,0,.34);}
.chapter-hellas-gallery .chapter-gallery-feature{grid-row:2 / span 2;min-height:450px;}
.chapter-hellas-gallery img{width:100%;height:100%;object-fit:cover;transition:transform .45s ease,filter .45s ease;}
.chapter-hellas-gallery figure::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.70) 100%);pointer-events:none;}
.chapter-hellas-gallery figcaption{position:absolute;left:18px;bottom:14px;z-index:2;font-family:'Oswald',sans-serif;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.88);text-shadow:0 2px 8px #000;}
.chapter-hellas-gallery figure:hover img{transform:scale(1.025);filter:brightness(1.05);}
@media(max-width:780px){.section-head h2 .section-prefix{font-size:11px;letter-spacing:.20em;}.chapter-hellas-gallery{grid-template-columns:1fr;grid-template-rows:auto;margin:-10px 0 42px;gap:11px;}.chapter-gallery-kicker{grid-column:1;}.chapter-hellas-gallery .chapter-gallery-feature{grid-row:auto;min-height:300px;}.chapter-hellas-gallery figure{min-height:245px;}}
/* section-numbering-gallery:end */
'''
if '</style>' not in s:
    raise SystemExit('Closing style tag not found')
s = s.replace('</style>', css + '\n</style>', 1)

decorative = '<img src="assets/widows-sons-mra-chapter-hellas-emblem.jpg" alt="Chapter Hellas emblem">'
if decorative not in s:
    raise SystemExit('Decorative header emblem check failed')
if 'assets/official-emblem.webp' not in s:
    raise SystemExit('Official emblem check failed')
for img in ('assets/chapter-hellas-road-1.jpg','assets/chapter-hellas-road-2.jpg','assets/chapter-hellas-road-3.jpg'):
    if img not in s:
        raise SystemExit(f'Missing gallery reference: {img}')

p.write_text(s, encoding='utf-8')
print(f'Numbered {number} sections and added Chapter Hellas gallery')
