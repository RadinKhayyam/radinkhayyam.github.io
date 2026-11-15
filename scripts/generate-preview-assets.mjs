import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const browser=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage();
 await page.setViewport({width:1440,height:900,deviceScaleFactor:2});
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.goto('http://127.0.0.1:4321',{waitUntil:'networkidle0'});
 await page.evaluate(()=>document.fonts.ready);
 const canvas=await page.$('#race-canvas');
 const bytes=await canvas.screenshot();
 await sharp(bytes).webp({quality:85}).toFile('public/images/race-static.webp');
 await page.setViewport({width:1200,height:900,deviceScaleFactor:1});
 await page.addStyleTag({content:`.hero{min-height:630px;height:630px;padding:40px 0}.hero-grid{grid-template-columns:minmax(0,1fr) minmax(0,500px);gap:40px;padding-inline:60px}.hero h1{font-size:62px}.hero .lead{font-size:21px}.hero .why{font-size:17px}.hero-actions,.contact-link,.race-controls{display:none}.race{max-width:none}.hero-copy{max-width:none}`});
 await new Promise(r=>setTimeout(r,200));
 await (await page.$('.hero')).screenshot({path:'public/og.png'});
 const favicon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#101117"/><path d="M6 11C9 8 12 25 18 23S24 12 27 18" fill="none" stroke="#aab1f6" stroke-width="1.5"/><path d="M5 8C9 4 10 23 18 24S23 20 26 21" fill="none" stroke="#f3c08c" stroke-width="1.5"/><circle cx="26" cy="21" r="2" fill="#f3c08c"/></svg>`;
 await writeFile('public/favicon.svg',favicon+'\n');
 await sharp(Buffer.from(favicon)).resize(32,32).png().toFile('public/favicon.png');
 console.log('Created static race fallback, 1200×630 OG image, and favicon pair.');
}finally{await browser.close();}
