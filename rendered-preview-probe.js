(async () => {
  const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  const root = document.querySelector('#root');
  const images = Array.from(document.images);
  const encounteredImages = new WeakSet();
  const loadErrors = new WeakSet();
  const errorListeners = new Map();
  const intersectsViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < window.innerHeight &&
      rect.left < window.innerWidth
    );
  };
  const markEncounteredImages = () => {
    images.forEach((image) => {
      if (intersectsViewport(image)) encounteredImages.add(image);
    });
  };

  images.forEach((image) => {
    const recordLoadError = () => loadErrors.add(image);
    image.addEventListener('error', recordLoadError, { once: true });
    errorListeners.set(image, recordLoadError);
    if (image.loading === 'lazy') image.loading = 'eager';
  });

  const step = Math.max(240, Math.floor(window.innerHeight * 0.8));
  const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  for (let y = 0; y < pageHeight; y += step) {
    window.scrollTo(0, y);
    await wait(60);
    markEncounteredImages();
  }
  window.scrollTo(0, pageHeight);
  await wait(250);
  markEncounteredImages();

  await Promise.allSettled(
    images.map(async (image) => {
      if (!image.complete) {
        await new Promise((resolve) => {
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            clearTimeout(timeoutId);
            image.removeEventListener('load', finish);
            image.removeEventListener('error', finish);
            resolve();
          };
          const timeoutId = setTimeout(finish, 2500);
          image.addEventListener('load', finish, { once: true });
          image.addEventListener('error', finish, { once: true });
        });
      }

      if (image.complete && image.naturalWidth > 0 && typeof image.decode === 'function') {
        await Promise.race([image.decode().catch(() => undefined), wait(1500)]);
      }
    }),
  );

  const summarizeImage = (image) => ({
    src: image.currentSrc || image.src || '',
    alt: image.alt || '',
    visible: intersectsViewport(image),
    encountered: encounteredImages.has(image),
  });
  const brokenImages = images
    .filter((image) => loadErrors.has(image) || (image.complete && image.naturalWidth === 0))
    .map(summarizeImage);
  const pendingImages = images
    .filter((image) => !loadErrors.has(image) && !image.complete)
    .map(summarizeImage);

  const overflowElements = Array.from(document.body.querySelectorAll('*'))
    .map((element) => ({ element, rect: element.getBoundingClientRect() }))
    .filter(({ rect }) => rect.width > 0 && (rect.left < -1 || rect.right > window.innerWidth + 1))
    .slice(0, 20)
    .map(({ element, rect }) => ({
      tag: element.tagName.toLowerCase(),
      id: element.id || '',
      className: typeof element.className === 'string' ? element.className : '',
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
    }));

  const rootText = root?.textContent?.trim() || '';
  const rootHasMedia = Boolean(root?.querySelector('img, svg, video, canvas'));
  const result = {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    rootNonBlank: Boolean(root && root.childElementCount > 0 && (rootText || rootHasMedia)),
    rootChildCount: root?.childElementCount || 0,
    documentOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    overflowElements,
    imageCount: images.length,
    loadedImageCount: images.filter((image) => image.complete && image.naturalWidth > 0).length,
    brokenImages,
    pendingImages,
  };

  errorListeners.forEach((listener, image) => image.removeEventListener('error', listener));
  window.scrollTo(0, 0);
  await wait(100);
  return result;
})()
