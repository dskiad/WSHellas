# GC DOC — the Grand Chancellor's documents

Each document of the Chancery is one page in this folder. Open
[`index.html`](index.html) for the menu, pick a document, fill in the fields
that change and download it as a print-ready A3 PDF.

## What is here

| File | What it is |
| --- | --- |
| `index.html` | the menu of documents |
| `past-grand-officers.html` | patent appointing a brother to past grand rank |
| `assets/gc.css` | the shared styling — chrome, the sheet, the patent layout |
| `assets/gc.js` | the shared engine — fields, dates, fitting, PDF and print |
| `assets/artwork.js` | the arms, collar, seal, drop cap and both signatures |
| `assets/fonts.css` | Great Vibes and Cinzel Decorative (SIL OFL) |
| `assets/lib/` | html2canvas and jsPDF (MIT) |

Nothing is fetched at run time except the interface fonts, so the documents
render and export offline. Opening a page straight off the disk works too.

## Adding another document

Copy `past-grand-officers.html`, rename it, and change three things.

**1. The head of the page** — its title, and the name it gives the file it
downloads:

```html
<body data-doc="Patent" data-file="f-name,f-rank">
```

`data-doc` starts the file name; `data-file` lists the fields appended to it.

**2. The form fields.** Each one carries `data-field`:

```html
<input id="f-name" data-field="name" type="text" value="Paul W. Johnston">
```

A date field fills two text fields — the day as `24th`, the rest as
`October 2025`:

```html
<input id="f-date" type="date" data-day="f-day" data-monthyear="f-monthyear">
```

**3. The sheet.** Anything a field fills is a span carrying the same name:

```html
<p class="name" data-out="name"></p>
```

Artwork is pulled in by name from `assets/artwork.js`:

```html
<img class="art-header" data-art="header" alt="">
```

The body copy sits in the clear window inside the collar and scales itself
down when the text runs long, so keep it inside:

```html
<div class="body-copy"><div class="copy"> … </div></div>
```

Then add a card for it in `index.html`.

## The sheet

The sheets are laid out at the real size of the source documents — A3 portrait,
11.6963in × 16.5in — with the artwork at the coordinates of the originals. The
clear window inside the chain collar runs from 6.28in to 12.73in down the sheet;
`.body-copy` in `assets/gc.css` holds those measurements.

`Download PDF` renders the sheet at 250 dpi into an A3 PDF. `Print` hands the
same page to the browser, where *Save as PDF* gives a sharper, text-based file.
The italic lines want *Palatino Linotype* from the system, falling back to Book
Antiqua, Palatino, then a Garamond.
