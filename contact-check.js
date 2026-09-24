(() => {
  const targets = ['iven@kidsdoing.com', '+86 15377609510', 'Unit4-3, Xingang International Furniture Park'];
  const bodyText = document.body.innerText || '';
  const domText = document.body.textContent || '';
  const html = document.documentElement.outerHTML;
  const results = targets.map((t) => {
    const inVisibleText = bodyText.includes(t);
    // searchable: present anywhere in DOM text
    const inDomText = domText.includes(t);
    // loose search ignoring surrounding spacing/case
    const norm = (s) => s.replace(/\s+/g, ' ').toLowerCase();
    const loose = norm(domText).includes(norm(t));
    // find nearest anchor/container that holds it
    let container = null;
    if (inDomText) {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      let best = null;
      while ((n = walker.nextNode())) {
        if (n.nodeValue && n.nodeValue.includes(t)) { best = n; break; }
      }
      if (best) {
        const el = best.parentElement;
        container = {
          tag: el.tagName.toLowerCase(),
          className: typeof el.className === 'string' ? el.className : '',
          href: el.closest('a') ? el.closest('a').getAttribute('href') : null,
        };
      }
    }
    return { target: t, inVisibleText, inDomText, looseMatch: loose, foundIn: container };
  });
  const anchors = Array.from(document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]')).map((a) => a.getAttribute('href'));
  return {
    ...Object.fromEntries(results.map((r, i) => ['check' + (i + 1), r])),
    hrefsFound: anchors,
    textLength: bodyText.length,
    allFoundInVisibleText: results.every((r) => r.inVisibleText),
  };
})()
