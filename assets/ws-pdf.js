/* =====================================================================
   Widows Sons MRA — Chapter Hellas
   WSPdf — the renderer that draws an official document of the Chapter.

   It takes the specification of a document (see WSDocs in the page) and
   draws it on A4: the letterhead, the subject block, the body with its
   tables, and the foot bearing the seal in the centre with a signature
   to each side. The document is issued under the Chapter's security
   code, so it cannot be opened without it.

   The renderer holds no knowledge of any particular document — every
   report, regulation, letter and certificate of the Chapter is drawn by
   it, so they all carry the same form.
   ===================================================================== */
(function(root){

  var ORG     = 'Widows Sons Masonic Riders Association';
  var CHAPTER = 'Chapter Hellas';
  var MOTTO   = 'Meet on the Level & Part upon the Square';

  /* --- the page --- */
  var PW = 210, PH = 297, ML = 15, MR = 15, MT = 14, MB = 17;
  var CW = PW - ML - MR, CX = PW / 2;

  /* --- the colours of the Chapter --- */
  var INK    = [22,24,28],   CRIMSON = [158,27,31], GOLD  = [138,109,53],
      GREY   = [107,111,119], RULE   = [216,212,202], HEAD = [34,38,44],
      ZEBRA  = [246,244,239], BORDER = [207,203,193], FAINT = [154,150,142];

  var SERIF = 'WSGaramond', DISPLAY = 'WSCinzel';

  function mm(pt){ return pt * 25.4 / 72; }

  /* Width of a string as it will actually be drawn, letter-spacing and all. */
  function widthOf(doc, str, charSpace){
    var w = doc.getTextWidth(str);
    return w + (charSpace || 0) * Math.max(0, str.length - 1);
  }

  /* One line of text. o: {font, style, size, colour, spacing, align, x, y} */
  function line(doc, str, o){
    doc.setFont(o.font || SERIF, o.style || 'normal');
    doc.setFontSize(o.size);
    doc.setTextColor.apply(doc, o.colour || INK);
    var cs = o.spacing || 0, x = o.x;
    if(o.align === 'center'){ x = CX - widthOf(doc, str, cs) / 2; }
    if(o.align === 'right'){  x = (o.x === undefined ? PW - MR : o.x) - widthOf(doc, str, cs); }
    doc.text(str, x, o.y, cs ? { charSpace: cs } : undefined);
    return o.y;
  }

  /* A paragraph, justified to the measure. Returns the new cursor. */
  function paragraph(doc, str, y, o){
    o = o || {};
    var size = o.size || 10.4, lead = o.lead || 1.34, width = o.width || CW;
    doc.setFont(o.font || SERIF, o.style || 'normal');
    doc.setFontSize(size);
    doc.setTextColor.apply(doc, o.colour || INK);
    var lines = doc.splitTextToSize(str, width);
    for(var i = 0; i < lines.length; i++){
      var last = (i === lines.length - 1);
      doc.text(lines[i], o.x || ML, y, {
        maxWidth: width,
        align: (o.align || (last ? 'left' : 'justify'))
      });
      y += mm(size) * lead;
    }
    return y;
  }

  /* ---------- the letterhead ---------- */
  function letterhead(doc, spec, art){
    var y = MT;
    if(art && art.emblem){
      var w = 25, h = w * (art.emblemH / art.emblemW || 1);
      doc.addImage(art.emblem, 'PNG', CX - w/2, y, w, h);
      y += h + 4.5;
    }
    line(doc, ORG.toUpperCase(), {font:DISPLAY, style:'bold', size:12.4, spacing:0.42, align:'center', y:y});
    y += 5.2;
    line(doc, CHAPTER.toUpperCase(), {font:DISPLAY, style:'bold', size:10.4, spacing:0.95,
                                      colour:CRIMSON, align:'center', y:y});
    y += 4.6;
    line(doc, MOTTO, {style:'italic', size:8.6, colour:GREY, align:'center', y:y});
    y += 3.4;
    doc.setDrawColor.apply(doc, CRIMSON); doc.setLineWidth(0.5);
    doc.line(ML, y, PW - MR, y);
    doc.setDrawColor.apply(doc, GOLD); doc.setLineWidth(0.2);
    doc.line(ML, y + 0.9, PW - MR, y + 0.9);
    y += 9;

    /* subject */
    line(doc, 'SUBJECT', {size:7.4, spacing:1.15, colour:GOLD, align:'center', y:y});
    y += 6.6;
    line(doc, String(spec.subject || '').toUpperCase(),
         {font:DISPLAY, style:'bold', size:18, spacing:0.55, align:'center', y:y});
    y += 3.4;
    doc.setDrawColor.apply(doc, GOLD); doc.setLineWidth(0.3);
    doc.line(CX - 11, y, CX + 11, y);
    y += 6.4;

    /* the reference and the place and day of issue */
    doc.setDrawColor.apply(doc, RULE); doc.setLineWidth(0.15);
    doc.line(ML, y, PW - MR, y);
    y += 3.6;
    line(doc, String(spec.ref || '').toUpperCase(), {size:7.4, spacing:0.45, colour:GREY, x:ML, y:y});
    line(doc, ((spec.place || '') + (spec.date ? ' · ' + spec.date : '')).toUpperCase(),
         {size:7.4, spacing:0.45, colour:GREY, align:'right', y:y});
    y += 2.2;
    doc.line(ML, y, PW - MR, y);
    return y + 7;
  }

  /* ---------- a table in the house style ---------- */
  function table(doc, t, y){
    var widths = {}, i;
    if(t.widths){
      for(i = 0; i < t.widths.length; i++){ widths[i] = { cellWidth: CW * t.widths[i] / 100 }; }
    }
    /* An office cell carries its Greek title beneath; room is reserved for
       it under the English line, and it is drawn once the cell is down. */
    var GR_SIZE = 7.2, GR_LEAD = 1.22;
    /* The column width is taken from the specification, because a cell does
       not know its own width until after the heights have been settled. */
    function greekLines(doc, cell, col){
      var raw = cell.raw;
      if(!raw || !raw._gr){ return null; }
      doc.setFont(SERIF, 'normal'); doc.setFontSize(GR_SIZE);
      var pad = (cell.styles.cellPadding.left || 0) + (cell.styles.cellPadding.right || 0);
      var w = cell.width || (t.widths ? CW * t.widths[col] / 100 : 40);
      return doc.splitTextToSize(raw._gr, Math.max(8, w - pad));
    }

    doc.autoTable({
      head: t.head ? [t.head] : undefined,
      body: t.rows,
      startY: y,
      margin: { left: ML, right: MR, bottom: MB + 4 },
      theme: 'grid',
      styles: {
        font: SERIF, fontStyle: 'normal', fontSize: 8.8, textColor: INK,
        lineColor: BORDER, lineWidth: 0.15, valign: 'top',
        cellPadding: { top: 1.7, right: 1.9, bottom: 1.7, left: 1.9 }
      },
      headStyles: {
        font: SERIF, fontStyle: 'bold', fontSize: 7.4, textColor: [255,255,255],
        fillColor: HEAD, lineColor: HEAD, cellPadding: { top: 1.9, right: 1.9, bottom: 1.9, left: 1.9 }
      },
      alternateRowStyles: { fillColor: ZEBRA },
      columnStyles: widths,
      didParseCell: function(data){
        if(data.section !== 'body'){ return; }
        var raw = data.cell.raw;
        if(raw && raw._gr){
          var n = greekLines(doc, data.cell, data.column.index), p = data.cell.styles.cellPadding;
          /* a fresh object: the padding is shared between cells */
          data.cell.styles.cellPadding = {
            top: p.top, right: p.right, left: p.left,
            bottom: p.bottom + (n ? n.length : 1) * mm(GR_SIZE) * GR_LEAD + 0.4
          };
        }
      },
      didDrawCell: function(data){
        if(data.section !== 'body'){ return; }
        var raw = data.cell.raw;
        if(raw && raw._gr){
          var n = greekLines(doc, data.cell, data.column.index);
          var yy = data.cell.y + data.cell.height - data.cell.styles.cellPadding.bottom
                   + mm(GR_SIZE) * GR_LEAD;
          doc.setTextColor.apply(doc, GREY);
          for(var k = 0; k < n.length; k++){
            doc.text(n[k], data.cell.x + data.cell.styles.cellPadding.left, yy);
            yy += mm(GR_SIZE) * GR_LEAD;
          }
        }
      }
    });
    y = doc.lastAutoTable.finalY + 3;
    if(t.note){ y = paragraph(doc, t.note, y + 1.4, {size:8.2, style:'italic', colour:GREY, lead:1.3}) + 1; }
    return y;
  }

  /* ---------- the foot: a signature to each side of the seal ---------- */
  function foot(doc, spec, art, y){
    var COL = 56, SEAL = 34, capH = 3.2;
    var head = 5.6, rule = 15, name = 4.6, road = 3.6, role = 3.6;
    var height = head + rule + name + road + role + 4;
    if(y + height + 8 > PH - MB){ doc.addPage(); y = MT + 4; }

    var base = y + head + rule;                        /* the signing rule */
    function column(sig, x){
      if(!sig){ return; }
      var cx = x + COL / 2;
      doc.setFont(DISPLAY, 'bold'); doc.setFontSize(9.6);
      var t = String(sig.title || '').toUpperCase();
      doc.setTextColor.apply(doc, INK);
      doc.text(t, cx - widthOf(doc, t, 0.5) / 2, y + head, { charSpace: 0.5 });
      doc.setDrawColor.apply(doc, INK); doc.setLineWidth(0.25);
      doc.line(x, base, x + COL, base);
      var yy = base + name;
      line(doc, sig.name || '', {style:'bold', size:9.6, x:cx - doc.getTextWidth(sig.name || '')/2, y:yy});
      if(sig.road){
        yy += road;
        line(doc, '«' + String(sig.road).toUpperCase() + '»',
             {size:7.8, spacing:0.35, colour:CRIMSON,
              x:cx - widthOf(doc, '«' + String(sig.road).toUpperCase() + '»', 0.35)/2, y:yy});
      }
      if(sig.role){
        yy += role;
        line(doc, sig.role, {size:7.2, spacing:0.2, colour:GREY,
             x:cx - widthOf(doc, sig.role, 0.2)/2, y:yy});
      }
    }

    if(spec.seal !== false && art && art.seal){
      doc.addImage(art.seal, 'PNG', CX - SEAL/2, base - SEAL + 2, SEAL, SEAL);
      line(doc, 'OFFICIAL SEAL OF CHAPTER HELLAS',
           {size:6.2, spacing:0.4, colour:FAINT, align:'center', y:base + capH});
    }
    var pair = spec.signatures;
    column(pair ? pair.left : null, ML);
    column(pair ? pair.right : (spec.signature || null), PW - MR - COL);
    return base + name + road + role;
  }

  /* ---------- the running foot of every page ---------- */
  function pageFeet(doc, spec){
    var n = doc.internal.getNumberOfPages();
    for(var p = 1; p <= n; p++){
      doc.setPage(p);
      var t = (ORG + ' — ' + CHAPTER + (spec.subject ? ' · ' + spec.subject : '')).toUpperCase();
      line(doc, t, {size:6.4, spacing:0.42, colour:FAINT, align:'center', y:PH - 9});
      line(doc, p + ' / ' + n, {size:6.4, spacing:0.3, colour:FAINT, align:'center', y:PH - 6});
    }
  }

  /* ---------- draw the whole document ---------- */
  function build(jsPDFCtor, spec, art, fonts, code){
    var doc = new jsPDFCtor({
      unit: 'mm', format: 'a4', compress: true,
      encryption: { userPassword: code, ownerPassword: code,
                    userPermissions: ['print', 'copy'] }
    });
    fonts.register(doc);
    doc.setProperties({
      title: CHAPTER + ' — ' + (spec.subject || 'Document'),
      subject: spec.subject || '', author: ORG + ' — ' + CHAPTER,
      creator: ORG + ' — ' + CHAPTER
    });

    var y = letterhead(doc, spec, art), i, j;

    (spec.lead || []).forEach(function(p){ y = paragraph(doc, p, y, {size:10.6}) + 1.6; });

    (spec.sections || []).forEach(function(s){
      if(y + 26 > PH - MB){ doc.addPage(); y = MT + 4; }
      y += 3.4;
      line(doc, String(s.title || '').toUpperCase(),
           {font:DISPLAY, style:'bold', size:9.8, spacing:0.5, colour:CRIMSON, x:ML, y:y});
      y += 1.9;
      doc.setDrawColor.apply(doc, RULE); doc.setLineWidth(0.15);
      doc.line(ML, y, PW - MR, y);
      y += 4.2;
      if(s.table){ y = table(doc, s.table, y); }
      (s.paragraphs || []).forEach(function(p){ y = paragraph(doc, p, y, {}) + 1.4; });
    });

    if(spec.closing && spec.closing.length){
      y += 3;
      spec.closing.forEach(function(p){ y = paragraph(doc, p, y, {size:10.4}) + 1.4; });
    }

    y += 4;
    if(spec.place || spec.date){
      if(y + 8 > PH - MB){ doc.addPage(); y = MT + 4; }
      line(doc, (spec.place || '') + (spec.date ? ', ' + spec.date : ''),
           {size:10, align:'right', y:y});
      y += 6;
    }
    foot(doc, spec, art, y + 4);
    pageFeet(doc, spec);
    return doc;
  }

  root.WSPdf = { build: build, ORG: ORG, CHAPTER: CHAPTER };

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
