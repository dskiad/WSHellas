# Widows Sons MRA — Chapter Hellas

The public website of the Chapter, served by GitHub Pages.

**Live site: https://dskiad.github.io/WSHellas/**

## Always end a reply with the live link

Every answer finishes with the live page link, on its own line:

```
🌐 Live: https://dskiad.github.io/WSHellas/
```

When the work touched another page, give that page's link too —
`/secretary.html`, `/officers.html`.

## The pages

| File | What it is |
| --- | --- |
| `index.html` | The main site: organization, administration, emblem, constitution, by-laws. Self-contained but for `assets/`. |
| `officers.html` | The fifteen officers, their titles and duties. |
| `secretary.html` | The document office: the founding documents and the documents of the Secretariat. |

## The document office

The Chapter issues its documents from the page itself. Three files carry it:

| File | What it holds |
| --- | --- |
| `assets/ws-docs.js` | **The register.** Every document is a function returning its specification. Add a document here and it inherits the letterhead, the tables, the sealed foot and the code. |
| `assets/ws-pdf.js` | **The renderer.** Draws a specification on A4 — letterhead, subject block, tables, the foot. Knows nothing of any particular document. |
| `assets/ws-office.js` | **The office.** Issues a specification as a sealed PDF or as a Word file, and holds the security code. |

jsPDF, the plugin and the letterhead faces live in `assets/vendor/` and are
fetched only when a document is called for.

### How documents are signed

- **Founding documents** — signed by the Founding President alone.
- **Everything issued thereafter** — the seal at the centre of the foot, the
  Secretary on the left, the President on the right.

Both are declared once in `ws-docs.js` as `FOUNDING` and `EXECUTED`.

### Other rules of the documents

- Founding documents are set in English first, then Greek and Bulgarian. Words
  proper to the brotherhood are left as they stand: Widows Sons, Chapter, MRA,
  patch, and the office names used as titles.
- Every PDF is issued under the Chapter's security code, set in
  `assets/ws-office.js`. The Word export carries no code, so a document can be
  perfected before it is issued.
- **The edition stamp.** `EDITION` in `assets/ws-office.js` is appended to every
  part the office fetches, and the same stamp is written on the scripts and the
  art in `secretary.html`. Raise it in both places whenever a document, the
  register or the renderer changes — otherwise a brother who has opened the
  office before is served a cached renderer and gets a document drawn by the old
  rules (this is how the President's hand went missing from every document while
  the code that draws it was already live).
- The letterhead uses `assets/chapter-hellas-letterhead-emblem.png` (background
  cut away) and `assets/chapter-hellas-official-seal.png`. Both are read off the
  page by id — `#wsLetterhead` and `#wsSeal` — so a page that issues documents
  must carry them.

## Working on this repository

- Develop and push on `claude/repo-push-vfylka`. A push deploys the site
  through `.github/workflows/pages.yml`.
- Uploaded artwork often arrives with its transparency painted into the pixels
  as a grey checkerboard. Cut it out before committing — a colour key alone
  punches holes in silver lettering; flood-fill from the borders instead.
- After changing a document, build it and check it before pushing: that it is
  encrypted, that it opens only with the code, and that the Greek and Bulgarian
  text survive into the file.
