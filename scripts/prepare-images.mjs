import sharp from 'sharp';
import {writeFile,mkdir} from 'node:fs/promises';
const names = ['2018-taipei-gold-podium','2025-sharif-graduation','2023-cuhk-faculty-of-science','2025-olympia-presenting','2026-koc-campus','2023-cuhk-campus','2018-taipei-action-iran-shirt','2017-slovenia-cadet-podium','2018-jordan-action','2018-tottori-wcc-asian-silver-podium','2022-sulaymaniyah-world-tournament','2025-olympia-day-run','2025-kish-marathon'];
const inputs=names.map(n=>[n,`/workspace/site/photo-package/images/${n}.jpg`]);
inputs.push(['casual-B-waist','/workspace/site/design-samples/round2/assets/casual-B-waist.jpg'],['2025-tehrun-10k','/workspace/site/handoff/photos-extra/2025-tehrun-10k.jpg']);
const manifest={};
await mkdir('public/images',{recursive:true});
for(const [name,path] of inputs){
 const wide = ['2018-taipei-action-iran-shirt','2026-koc-campus'].includes(name);
 const out=await sharp(path).rotate().resize({width:wide?1600:1000,withoutEnlargement:true}).webp({quality:80}).toFile(`public/images/${name}.webp`);
 const small=await sharp(path).rotate().resize({width:600,withoutEnlargement:true}).webp({quality:80}).toFile(`public/images/${name}-600.webp`);
 manifest[name]={src:`/images/${name}.webp`,width:out.width,height:out.height,srcset:`/images/${name}-600.webp ${small.width}w, /images/${name}.webp ${out.width}w`};
}
await writeFile('src/data/images.json',JSON.stringify(manifest,null,2)+'\n');
console.log('Optimized',inputs.length,'photos');
