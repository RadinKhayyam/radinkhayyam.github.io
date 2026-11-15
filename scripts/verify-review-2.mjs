import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const origin = process.env.SITE_URL || 'http://127.0.0.1:4322';
const out = '/workspace/site/build-review/codex/round-2';
await mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
const report = { layouts: [], links: 0, motion: [], noJavaScript: [] };
const errors = [], links = new Set();
const routes = ['/', '/research/', '/experience/', '/sport/', '/blog/', '/404.html'];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluateOnNewDocument(() => {
    window.revealAnimations = 0;
    const animate = Element.prototype.animate;
    Element.prototype.animate = function(...args) { window.revealAnimations++; return animate.apply(this, args); };
  });
  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: width === 1440 ? 900 : 844 });
    for (const route of routes) {
      await page.goto(origin + route, { waitUntil: 'networkidle0' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map(async img => { img.loading = 'eager'; await img.decode(); }));
      });
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        photos: [...document.querySelectorAll('img[src^="/images/"]:not(.sport-background):not(#race-fallback)')].map(img => {
          const rect = img.getBoundingClientRect();
          return { src: img.getAttribute('src'), width: rect.width, height: rect.height, ratio: Number(img.getAttribute('width')) / Number(img.getAttribute('height')), fit: getComputedStyle(img).objectFit };
        }),
        links: [...document.querySelectorAll('[href], [src]')].flatMap(el => ['href', 'src'].map(attr => el.getAttribute(attr)).filter(Boolean)),
      }));
      assert.equal(layout.overflow, false, `${route} overflow at ${width}`);
      for (const img of layout.photos) {
        assert.notEqual(img.fit, 'cover', `${img.src}: cover`);
        assert(Math.abs(img.width / img.height - img.ratio) < .003, `${route} ${width}: photo frame ratio mismatch: ${JSON.stringify(img)}`);
      }
      for (const href of layout.links) { const url = new URL(href, origin + route); if (url.origin === origin) links.add(url.href); }
      report.layouts.push({ route, width, photos: layout.photos.length, overflow: layout.overflow });
      if (route === '/') {
        const canvases = () => page.$$eval('canvas', els => els.map(el => el.toDataURL()));
        const first = await canvases(); await sleep(500); assert.deepEqual(await canvases(), first);
        assert.match(await page.$eval('#race-step', el => el.textContent), /^Finished/);
        assert(await page.$eval('#hero-backdrop', el => el.getContext('2d').getImageData(0, 0, el.width, el.height).data.some(value => value !== 0)), 'Hero frame is blank');
        const textSize = await page.$eval('.chapter-body p', el => ({ size: getComputedStyle(el).fontSize, leading: getComputedStyle(el).lineHeight }));
        assert.equal(textSize.size, '17px'); assert.equal(textSize.leading, '27.2px');
        const portrait = await page.$eval('.chapter-card-portrait', el => ({ card: el.clientWidth, photo: el.querySelector('img').clientWidth, padding: parseFloat(getComputedStyle(el).paddingLeft) }));
        assert(Math.abs(portrait.card - portrait.photo - portrait.padding * 2) <= 1, 'Portrait card has empty side bars');
        report.motion.push(`Both canvases remain static under reduced motion at ${width}px; hero is nonblank and race is finished.`);
      }
      if (route === '/sport/') {
        assert.deepEqual(await page.$$eval('main > section', els => els.map(el => el.classList[el.classList.length - 1])), ['sport-opening', 'sport-history', 'honors', 'running-opening', 'running-results']);
        assert.deepEqual(await page.$$eval('main h1, main h2', els => els.map(el => el.textContent)), ['Table tennis', 'Selected honors', 'Running']);
        assert.equal(await page.$$eval('img[src*="kish"]', els => els.length), 1);
        for (const target of ['table-tennis', 'running']) {
          await page.click(`.sport-copy a[href="#${target}"]`);
          await sleep(100);
          const top = await page.$eval(`#${target}`, el => el.getBoundingClientRect().top);
          assert(top >= 0 && top <= 110, `${target} anchor misses target: ${top}`);
        }
      }
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 650) { scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 30)); }
        scrollTo(0, 0);
      });
      assert.equal(await page.evaluate(() => window.revealAnimations), 0, 'Scroll reveal animated with reduced motion');
      await sleep(150); // Let the browser repaint after returning from the lazy-load scroll.
      if (['/', '/research/', '/sport/'].includes(route)) await page.screenshot({ path: `${out}/${route === '/' ? 'home' : route.split('/')[1]}-${width}.png`, fullPage: true });
    }
  }
  // Check targets against parsed HTML, including fragments on other pages.
  for (const href of links) {
    const url = new URL(href), response = await fetch(url);
    assert.equal(response.status, 200, `Broken local reference: ${href}`);
    if (url.hash) {
      const html = await response.text();
      assert(await page.evaluate((html, id) => !!new DOMParser().parseFromString(html, 'text/html').getElementById(id), html, decodeURIComponent(url.hash.slice(1))), `Missing anchor: ${href}`);
    }
  }
  report.links = links.size;
  const sitemap = await (await fetch(origin + '/sitemap-0.xml')).text();
  assert(!sitemap.includes('404')); assert.equal((sitemap.match(/<loc>/g) || []).length, 5);
  await page.setJavaScriptEnabled(false);
  for (const route of routes) {
    await page.goto(origin + route, { waitUntil: 'networkidle0' });
    const hidden = await page.evaluate(() => [...document.querySelectorAll('main h1, main h2, main h3, main p, main td, main [data-reveal]')].filter(el => {
      if (el.closest('[hidden]')) return false; // JS-only filter empty state.
      for (let node = el; node instanceof Element; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return true;
      }
      return false;
    }).map(el => el.textContent));
    assert.deepEqual(hidden, [], `Hidden content without JavaScript: ${route}`);
    if (route === '/') assert(await page.$eval('#race-fallback', el => !el.hidden && el.naturalWidth > 0));
    report.noJavaScript.push(route);
  }
  assert.deepEqual(errors, []); report.consoleErrors = errors;
  await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
