from pathlib import Path
import re

p = Path('index.html')
s = p.read_text(encoding='utf-8')

start = '<!-- chapter-hellas-gallery:start -->'
end = '<!-- chapter-hellas-gallery:end -->'
a = s.find(start)
b = s.find(end, a)
if a < 0 or b < 0:
    raise SystemExit('Section 01 gallery markers not found')
b += len(end)

gallery = '''<!-- chapter-hellas-gallery:start -->
    <div class="part-locator">PART 01.1 — CHAPTER HELLAS PHOTOGRAPHS</div>
    <div class="chapter-photo-pair" aria-label="Chapter Hellas photographs">
      <figure class="chapter-bike-frame">
        <div class="chapter-photo-label">Ph.1 — Fraternal Brotherhood</div>
        <img src="assets/chapter-hellas-ph-1-20260906.jpg?v=20260906e" alt="Widows Sons MRA Chapter Hellas fraternal photograph" loading="eager">
      </figure>
      <figure class="chapter-bike-frame">
        <div class="chapter-photo-label">Ph.2 — Chapter Hellas on the Road</div>
        <img src="assets/chapter-hellas-road-1-v2.jpg?v=20260906e" alt="Widows Sons MRA Chapter Hellas riders on the road in Greece" loading="eager">
      </figure>
    </div>
    <div class="part-locator part-information">PART 01.2 — CHAPTER HELLAS INFORMATION</div>
    <!-- chapter-hellas-gallery:end -->'''

s = s[:a] + gallery + s[b:]
s = re.sub(r'\n?/\* section-one-pair-2026:start \*/.*?/\* section-one-pair-2026:end \*/\n?', '\n', s, flags=re.S)

bike_svg = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='24' viewBox='0 0 64 24'%3E%3Cg fill='none' stroke='%23cba867' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='17' r='5'/%3E%3Ccircle cx='52' cy='17' r='5'/%3E%3Cpath d='M17 17h12l7-9h7l9 9M29 17l-8-11h10l9 11M36 8h9M28 6h7'/%3E%3C/g%3E%3C/svg%3E\")"

css = f'''
/* section-one-pair-2026:start */
#organization .part-locator{{font-family:'Oswald',sans-serif;font-size:11.5px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-bright);margin:0 0 14px;padding:0 2px;}}
#organization .part-information{{margin-top:44px;margin-bottom:18px;border-bottom:1px solid rgba(203,168,103,.32);padding-bottom:10px;}}
#organization .chapter-photo-pair{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;width:100%;margin:0 0 12px;}}
#organization .chapter-bike-frame{{position:relative;margin:0;padding:28px 16px;background-color:#080808;background-image:{bike_svg},{bike_svg};background-repeat:repeat-x,repeat-x;background-position:left 3px,left calc(100% - 3px);background-size:64px 24px,64px 24px;border-left:2px solid rgba(203,168,103,.72);border-right:2px solid rgba(203,168,103,.72);box-shadow:0 20px 48px rgba(0,0,0,.48),inset 0 0 0 1px rgba(203,168,103,.18);overflow:hidden;}}
#organization .chapter-bike-frame::before,#organization .chapter-bike-frame::after{{content:'';position:absolute;top:24px;bottom:24px;width:5px;background:linear-gradient(180deg,#6f5832,#d2b06b 50%,#6f5832);opacity:.7;z-index:1;}}
#organization .chapter-bike-frame::before{{left:5px}}
#organization .chapter-bike-frame::after{{right:5px}}
#organization .chapter-bike-frame img{{display:block;width:100%;height:430px;object-fit:cover;object-position:center;border:1px solid rgba(233,230,221,.24);box-shadow:0 0 0 5px #090909;}}
#organization .chapter-photo-label{{position:absolute;z-index:3;left:28px;bottom:38px;padding:8px 12px;background:rgba(5,5,5,.82);border-left:3px solid var(--gold-bright);font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#f2eadb;box-shadow:0 4px 16px rgba(0,0,0,.4);}}
#organization .two-col{{display:block!important;width:100%!important;}}
#organization .two-col>div,#organization .two-col>.side-card{{width:100%!important;max-width:none!important;}}
#organization .side-card{{margin-top:30px;}}
#organization .pillar-block p,#organization .quote-block,#organization .recognized,#organization .recognized li,#organization .side-card p,#organization .side-card li{{text-align:justify;text-justify:inter-word;}}
@media(max-width:780px){{#organization .chapter-photo-pair{{grid-template-columns:1fr;gap:18px}}#organization .chapter-bike-frame img{{height:340px}}#organization .part-information{{margin-top:34px}}}}
/* section-one-pair-2026:end */
'''

if '</style>' not in s:
    raise SystemExit('No closing style tag')
s = s.replace('</style>', css + '\n</style>', 1)
p.write_text(s, encoding='utf-8')
