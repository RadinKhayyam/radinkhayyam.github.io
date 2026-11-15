// Hero backdrops for round 2. Each draws into canvas#bg, pauses off-screen, respects reduced motion.
import { animateCanvas } from './motion.js';
function fitCanvas(cv){const d=Math.min(2,devicePixelRatio||1),r=cv.getBoundingClientRect();cv.width=r.width*d;cv.height=r.height*d;const c=cv.getContext('2d');c.setTransform(d,0,0,d,0,0);return[c,r.width,r.height]}
// H1: one soft light trail = an optimisation path descending a faint landscape (Ribbon-style night)
export function trailBackdrop(cv){
 const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
 let ctx,W,H,path=[],grid=[];
 const g=(x,z)=>0.55*Math.exp(-((x-0.9)**2/1.2+(z-0.5)**2/0.5))*-1+0.18*Math.sin(1.3*x+0.4)*Math.cos(1.1*z)+0.05*x*x+0.12*z*z;
 function P(x,z,y){ // perspective ground plane: x across, z depth (0 near .. 3 far), y height
  const zz=z+1.2,f=H*1.15/zz;return[W*0.42+x*f*0.62,H*0.70+(-(y)*0.9+0.25)*f*0.5]}
 function build(){[ctx,W,H]=fitCanvas(cv);
  // momentum descent from far-left to the basin
  let x=-3.2,z=2.6,vx=0,vz=0;path=[];for(let i=0;i<900;i++){const h=1e-3;const gx=(g(x+h,z)-g(x-h,z))/(2*h),gz=(g(x,z+h)-g(x,z-h))/(2*h);vx=0.965*vx-0.004*gx;vz=0.965*vz-0.004*gz;x+=vx;z+=vz;path.push(P(x,z,g(x,z)));if(i>200&&Math.hypot(vx,vz)<1e-5)break}
  // faint contour-ish grid lines across the ground (rows of constant depth)
  grid=[];for(let k=0;k<=26;k++){const z=0.05+k*0.12;const row=[];for(let x=-5;x<=5;x+=0.08)row.push(P(x,z,g(x,z)));grid.push({row,a:0.035+0.05*(1-k/26)})}}
 function frame(t){ctx.clearRect(0,0,W,H);
  for(const {row,a} of grid){ctx.beginPath();row.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle=`rgba(190,200,240,${a})`;ctx.lineWidth=1;ctx.stroke()}
  // ghost of whole path
  ctx.beginPath();path.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle='rgba(243,192,140,.10)';ctx.lineWidth=1.2;ctx.stroke();
  const n=path.length,cyc=14000,u=motionQuery.matches ? .72 :((t%cyc)/cyc);const head=Math.floor(Math.min(1,u/0.8)*(n-1)),tail=Math.floor(n*0.45);const fade=u>0.8?1-(u-0.8)/0.2:1;
  ctx.lineCap='round';ctx.shadowColor='rgba(243,192,140,.9)';ctx.shadowBlur=16;
  for(let i=Math.max(1,head-tail);i<=head;i++){const a=((i-(head-tail))/tail);ctx.strokeStyle=`rgba(246,205,160,${0.75*a*a*fade})`;ctx.lineWidth=0.8+2.2*a;ctx.beginPath();ctx.moveTo(path[i-1][0],path[i-1][1]);ctx.lineTo(path[i][0],path[i][1]);ctx.stroke()}
  ctx.shadowBlur=0;const hp=path[head];if(hp){const rg=ctx.createRadialGradient(hp[0],hp[1],0,hp[0],hp[1],26);rg.addColorStop(0,`rgba(255,226,190,${.55*fade})`);rg.addColorStop(1,'rgba(255,226,190,0)');ctx.fillStyle=rg;ctx.beginPath();ctx.arc(hp[0],hp[1],26,0,7);ctx.fill()}}
 return animateCanvas(cv,build,frame)}
