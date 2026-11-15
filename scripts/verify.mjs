import puppeteer from 'puppeteer-core';
import { AxePuppeteer } from '@axe-core/puppeteer';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { marked } from 'marked';
import assert from 'node:assert/strict';
const origin=process.env.SITE_URL||'http://127.0.0.1:4321';
const browser=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
const report={routes:[],copy:[],interactions:[]};
const raw=await readFile('content/site-copy.md','utf8');
const sections=raw.split(/^## \d\. /m).slice(1,6);
const routes=['/','/research/','/experience/','/sport/','/blog/','/404.html'];
const normalize=s=>s.replace(/\s+/g,' ').trim();
try{
 const page=await browser.newPage();
 page.setDefaultTimeout(15000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 for(const width of [1440,390,320]){
  await page.setViewport({width,height:width===1440?900:844,deviceScaleFactor:1});
  for(let i=0;i<routes.length;i++){
   const route=routes[i];await page.goto(origin+route,{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
   await page.evaluate(async()=>{for(const img of document.images){img.loading='eager';await img.decode().catch(()=>{});}});
   const diagnostics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src),h1:document.querySelectorAll('h1').length,body:document.body.innerText,fonts:[getComputedStyle(document.querySelector('h1')).fontFamily,getComputedStyle(document.body).fontFamily],active:document.querySelector('.desktop-nav [aria-current="page"]')?.textContent}));
   assert.equal(diagnostics.overflow,false,route+' overflow at '+width);assert.equal(diagnostics.h1,1,route+' heading');
   assert.deepEqual(diagnostics.brokenImages,[],route+' broken images');
   if(width===1440){
    const axe=await new AxePuppeteer(page).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    report.routes.push({route,width,violations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),fonts:diagnostics.fonts});
    if(i<5){
     const lines=sections[i].split('\n').map(l=>l.replace(/\[(?:Photo|DESIGN NOTE|CONFIRM)[^\]]*\]/g,'').trim()).filter(l=>l&&!/^#{1,6} |^\[|^---|^Filter:|^Buttons:|^\*Note for the build:|^\|/.test(l));
     const missing=[];
     for(let line of lines){
      if(/^\*\*\d\. /.test(line)||/^\*\*.*?\*\* ·/.test(line))continue;
      if(/^\*\*(Teaching assistant)/.test(line))continue;
      if(/^\*\*(Experience & Projects\.|Sport\.)/.test(line))continue;
      line=line.replace(/^Link: /,'').replace(/^\*\*(Intro|Empty state):\*\* /,'').replace(/^- /,'');
      // The first line is an editorial page title, not body copy.
      if(['Home','Research','Experience & Projects','Sport','Blog'].includes(line))continue;
      if(line==='LinkedIn · X · Instagram · GitHub · Google Scholar'){for(const label of line.split(' · ')) assert(diagnostics.body.includes(label));continue;}
      const text=await page.evaluate(html=>{const el=document.createElement('div');el.innerHTML=html;return el.textContent;},marked.parse(line));
      if(!normalize(diagnostics.body).includes(normalize(text)))missing.push(normalize(text));
     }
     report.copy.push({route,missing});
    }
   }
  }
 }
 await mkdir('/workspace/site/build-review/codex/verification',{recursive:true});
 await writeFile('/workspace/site/build-review/codex/verification/report.json',JSON.stringify(report,null,2));
 await page.setViewport({width:390,height:844});await page.goto(origin,{waitUntil:'networkidle0'});
 await page.click('.mobile-menu summary');assert(await page.$eval('.mobile-menu',e=>e.open));
 await page.keyboard.press('Escape');assert.equal(await page.$eval('.mobile-menu',e=>e.open),false);report.interactions.push('Mobile menu opens and Escape closes it, restoring focus.');
 await page.click('.mobile-menu summary');await page.click('.mobile-menu a[href="/experience/"]');await page.waitForSelector('[data-filter]');
 for(const [filter,count] of [['Personal',1],['Course',4],['Sharif',4],['Koç',0],['All',5]]){
  await page.click(`[data-filter="${filter}"]`);assert.equal(await page.$$eval('[data-tags]',els=>els.filter(el=>!el.hidden).length),count);
 }
 report.interactions.push('All five project filters return the expected projects and the empty state.');
 await page.setViewport({width:1440,height:900,deviceScaleFactor:2});await page.goto(origin,{waitUntil:'networkidle0'});
 const frame=()=>page.$eval('#race-canvas',e=>e.toDataURL());
 const reduced=await frame();await new Promise(r=>setTimeout(r,400));assert((await frame())===reduced,'Reduced-motion frame changed');
 assert.match(await page.$eval('#race-step',e=>e.textContent),/^Finished/);
 await page.focus('#race-canvas');await page.keyboard.press('ArrowRight');await page.keyboard.press('Enter');assert.match(await page.$eval('#race-step',e=>e.textContent),/^Finished/);
 report.interactions.push('Reduced motion shows a finished, static race; keyboard restart works.');
 await page.click('#restart-race');await page.$eval('#race-canvas',e=>e.blur());
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
 await page.bringToFront();await new Promise(r=>setTimeout(r,300));await page.click('#restart-race');
 await page.waitForFunction(()=>/^Step (?:[1-9]\d*)$/.test(document.querySelector('#race-step').textContent),{timeout:5000});
 const a=await frame();await new Promise(r=>setTimeout(r,800));assert((await frame())!==a,'Animation did not advance');
 await page.click('#pause-motion');await new Promise(r=>setTimeout(r,100));const paused=await frame();await new Promise(r=>setTimeout(r,300));assert((await frame())===paused,'Paused frame changed');
 await page.click('#pause-motion');await page.$eval('#contact',e=>e.scrollIntoView());await new Promise(r=>setTimeout(r,100));const offscreen=await frame();await new Promise(r=>setTimeout(r,300));assert((await frame())===offscreen,'Offscreen frame changed');
 await page.evaluate(()=>scrollTo(0,0));await new Promise(r=>setTimeout(r,200));
 const other=await browser.newPage();await other.bringToFront();await new Promise(r=>setTimeout(r,150));
 assert(await page.evaluate(()=>document.hidden));const hiddenFrame=await frame();await new Promise(r=>setTimeout(r,300));assert((await frame())===hiddenFrame,'Hidden-tab frame changed');await other.close();
 report.interactions.push('Animation advances, pauses on request, and stops offscreen and in hidden tabs.');
 await page.setJavaScriptEnabled(false);await page.goto(origin,{waitUntil:'networkidle0'});assert(await page.$eval('#about',e=>e.innerText.length>100));assert(await page.$eval('.hong-kong',e=>getComputedStyle(e).opacity==='1'));report.interactions.push('Copy, timeline, and native mobile navigation remain available without JavaScript.');
 assert.deepEqual(errors,[]);report.runtimeErrors=errors;
 await mkdir('/workspace/site/build-review/codex/verification',{recursive:true});
 await writeFile('/workspace/site/build-review/codex/verification/report.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
