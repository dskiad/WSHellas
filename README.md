# Widows Sons Masonic Riders Association — Chapter Hellas

The chapter's public information page: organization, administration, emblem,
constitution, by-laws and dress code.

## Live page

**https://dskiad.github.io/WSHellas/**

> The link goes live once GitHub Pages is enabled for this repository:
> **Settings → Pages → Build and deployment → Source: _Deploy from a branch_**,
> then pick the branch holding `index.html` and the `/ (root)` folder.

## Contents

| Section | What it covers |
| --- | --- |
| Organization | What the Widows Sons are, and what Chapter Hellas is |
| Administration | The officers of the chapter and their duties |
| Emblem | The Chapter Hellas emblem and its symbolism |
| Constitution | The constitution of Chapter Hellas |
| By-Laws | Regulations and operating rules |
| Dress Code | Vest and patch regulations |

## About this repository

The whole site is a single file, `index.html`. Styles, scripts and all imagery
are embedded in it — images as data URIs — so the page is self-contained and
needs no build step, no dependencies and no asset directory. The only external
requests it makes are for the Google Fonts it uses (Cinzel, Cinzel Decorative,
EB Garamond, Oswald and Mrs Saint Delafield).

## Viewing or editing locally

Open `index.html` in any browser, or serve the directory:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

Edit `index.html` directly and reload the browser to see the change.
