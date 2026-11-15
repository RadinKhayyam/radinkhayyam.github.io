import puppeteer from 'puppeteer-core';
import {mkdir} from 'node:fs/promises';
const out='/workspace/site/build-review/codex/screens-final';await mkdir(out,{recursive:true});
const browser=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage();
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 for(const [size,width,height] of [['desktop',1440,900],['phone',390,844]]){
  await page.setViewport({width,height,deviceScaleFactor:1});
  for(const route of ['home','research','experience','sport','blog']){
   await page.goto(`http://127.0.0.1:4321/${route==='home'?'':route+'/'}`,{waitUntil:'networkidle0'});
   await page.evaluate(async()=>{
    await document.fonts.ready;
    // Exercise native lazy loading before the full-page capture.
    const height=document.documentElement.scrollHeight;
    for(let y=0;y<height;y+=650){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}
    await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));
    scrollTo(0,0);
   });
   await new Promise(r=>setTimeout(r,100));
   await page.screenshot({path:`${out}/screen-${route}-${size}.png`,fullPage:true});
   console.log(route,size);
  }
 }
}finally{await browser.close();}
