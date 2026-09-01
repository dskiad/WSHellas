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

## GC DOC — the Grand Chancellor's documents

`gc-doc/` is a separate section of this repository: the documents of the
Chancery of the **National Grand Lodge of Greece**, each one a form that fills
in a sheet and hands it back as a print-ready **A3 portrait PDF**.
[`gc-doc/index.html`](gc-doc/index.html) is the menu they all hang off.

First of them is **Past Grand Officers** — the patent appointing a brother to
past grand rank:

| Field | Fills |
| --- | --- |
| `HISRANK` | the honoree's rank and office, e.g. *The Grand Master of the Masonic Order of Athelstan in England, Wales and its Provinces Overseas* |
| `HISGL` | his Grand Lodge, e.g. *United Grand Lodge of England* |
| `NAME` | the honoree, e.g. *Paul W. Johnston* |
| `RANK` | the rank he is appointed to, e.g. *PAST GRAND MASTER* |
| `DAY` | the day of the date, e.g. *24th* |
| `MONTH & YEAR` | the rest of the date, e.g. *October 2025* |

Everything else on the patent — the wording, the arms, the chain collar, the
seal and both signatures — is fixed. The date picker fills `DAY` and
`MONTH & YEAR` in the right form, and the body copy scales itself down if a
long rank or Grand Lodge name needs the room, so the text always sits inside
the collar.

Honorary Grand Officers and the letters of the Chancery come next; the menu
lists them as in preparation. Artwork, display faces and the PDF engine are
shared by every document in the folder, so a new one is a single small file —
[`gc-doc/README.md`](gc-doc/README.md) says how to add it.

Live at **https://dskiad.github.io/WSHellas/gc-doc/**

## About this repository

The chapter site is a single file, `index.html`; the Chancery documents live
beside it in `gc-doc/`. Styles, scripts and all imagery
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
