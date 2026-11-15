import { XR, YR, Race, f, sampleGrid, contourCells, mix } from './race.js';
import { animateCanvas } from './motion.js';
// 3D surface version: shaded surface with thin contour lines, slow camera sway
export function mountRace3D(cv,opts={}){
 const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
 let reduceMotion=motionQuery.matches;
 const ctx=cv.getContext('2d');let W,H,dpr,hover=null,hoverXY=null,ripple=null,lastUser=0,doneAt=0;
 const NX=56,NY=40,{G,lo,hi}=sampleGrid(NX,NY);
 const LEVELS=[];for(let k=1;k<=18;k++)LEVELS.push(lo+(hi-lo)*Math.pow(k/19,1.6));
 const cells=contourCells(G,NX,NY,LEVELS);
 const gx=i=>XR[0]+(XR[1]-XR[0])*i/(NX-1), gy=j=>YR[1]-(YR[1]-YR[0])*j/(NY-1);
 const ZS=opts.zScale||1.1;
 const world=(x,y,v)=>[(x/3)*1.5,(y/2)*1.0,((v-lo)/(hi-lo))*ZS];
 let yaw=-0.55,pitch=0.62,cx,cy,scale;
 function proj([X,Y,Z]){const c=Math.cos(yaw),s=Math.sin(yaw);const xr=X*c-Y*s,yr=X*s+Y*c;const sp=Math.sin(pitch),cp=Math.cos(pitch);
  const sx=xr,sy=-(yr*sp+Z*cp),depth=yr*cp-Z*sp;const k=6/(6+depth);return[cx+scale*k*sx,cy+scale*k*sy,depth]}
 const deep=[22,25,42],mid=[52,56,86],top=[120,118,150];
 function col(t,light,boost){const c=t<.4?mix(deep,mid,t/.4):mix(mid,top,(t-.4)/.6);const m=(0.55+0.6*light)*(1+boost);return`rgb(${Math.min(255,c[0]*m)|0},${Math.min(255,c[1]*m)|0},${Math.min(255,c[2]*m)|0})`}
 // precompute normals-based lighting per quad
 const quads=[];for(let j=0;j<NY-1;j++)for(let i=0;i<NX-1;i++){const v=[G[j*NX+i],G[j*NX+i+1],G[(j+1)*NX+i+1],G[(j+1)*NX+i]];
  const P=[world(gx(i),gy(j),v[0]),world(gx(i+1),gy(j),v[1]),world(gx(i+1),gy(j+1),v[2]),world(gx(i),gy(j+1),v[3])];
  const dx=P[1][0]-P[0][0],uz=P[1][2]-P[0][2],vy=P[3][1]-P[0][1],vz=P[3][2]-P[0][2];let n=[-uz*vy,-dx*vz,dx*vy];if(n[2]<0)n=n.map(a=>-a);
  const L=[-0.4,0.5,0.75],nl=Math.hypot(...n);const light=Math.max(0,(n[0]*L[0]+n[1]*L[1]+n[2]*L[2])/nl/Math.hypot(...L));
  const segs=cells[j*(NX-1)+i].map(([li,a,b])=>{const A=[gx(a[0]),gy(a[1])],B=[gx(b[0]),gy(b[1])];return[li,world(A[0],A[1],LEVELS[li]),world(B[0],B[1],LEVELS[li])]});
  quads.push({P,t:((v[0]+v[1]+v[2]+v[3])/4-lo)/(hi-lo),light,segs,x:gx(i+.5),y:gy(j+.5)})}
 function resize(){dpr=Math.min(2,devicePixelRatio||1);const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);cx=W/2;cy=H*0.57;scale=W*0.22}
 const race=new Race(opts.start||[-2.2,-0.3]);
 const FONT=opts.font||'500 11px "Wix Madefor Text Variable", sans-serif';
 function label(text,x,y,color='rgb(240,238,232)'){
  ctx.font=FONT;const width=ctx.measureText(text).width;
  ctx.fillStyle='rgba(16,18,28,.92)';ctx.beginPath();ctx.roundRect(x-3,y-11,width+6,15,3);ctx.fill();
  ctx.fillStyle=color;ctx.fillText(text,x,y);
 }
 let verts=[];
 function draw(now){ctx.clearRect(0,0,W,H);
  if(!reduceMotion)yaw=-0.55+0.16*Math.sin(now/1000*2*Math.PI/22);
  const items=quads.map(q=>{const pp=q.P.map(proj);return{q,pp,d:(pp[0][2]+pp[1][2]+pp[2][2]+pp[3][2])/4}}).sort((a,b)=>b.d-a.d);
  verts=[];
  for(const {q,pp} of items){let boost=0;if(hoverXY){const dd=Math.hypot(q.x-hoverXY[0],q.y-hoverXY[1]);if(dd<0.7)boost=.35*(1-dd/0.7)}
   ctx.beginPath();ctx.moveTo(pp[0][0],pp[0][1]);for(let k=1;k<4;k++)ctx.lineTo(pp[k][0],pp[k][1]);ctx.closePath();ctx.fillStyle=col(q.t,q.light,boost);ctx.fill();ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=.6;ctx.stroke();
   if(q.segs.length){ctx.beginPath();for(const [li,a,b] of q.segs){const A=proj(a),B=proj(b);ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1])}ctx.strokeStyle=`rgba(225,228,255,${.16+boost*.6})`;ctx.lineWidth=.7;ctx.stroke()}
   verts.push([(pp[0][0]+pp[2][0])/2,(pp[0][1]+pp[2][1])/2,q.x,q.y])}
  const P3=(x,y)=>proj(world(x,y,f(x,y)+0.012*(hi-lo)));
  const s0=P3(...race.start);ctx.strokeStyle='rgba(240,238,232,.8)';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(s0[0],s0[1],6,0,7);ctx.stroke();ctx.fillStyle='rgba(240,238,232,.7)';ctx.font=FONT;label('Start',s0[0]+10,s0[1]+4);
  for(const [x,y,lab] of [[1.3,-0.5,'Global minimum'],[-1.1,0.7,'Local minimum']]){const p=P3(x,y);ctx.fillStyle='rgba(240,238,232,.55)';label(lab,p[0]-ctx.measureText(lab).width/2,p[1]+24)}
  if(ripple){const a=(now-ripple[2])/700;if(a<1){ctx.strokeStyle=`rgba(170,177,246,${.7*(1-a)})`;ctx.beginPath();ctx.arc(ripple[0],ripple[1],8+40*a,0,7);ctx.stroke()}else ripple=null}
  for(const r of race.runners){const T=r.trail,n=T.length;ctx.lineWidth=2.2;ctx.lineCap='round';ctx.strokeStyle=r.o.color;
   let prev=P3(...T[0]);for(let k=1;k<n;k++){const p=P3(...T[k]);ctx.globalAlpha=Math.pow(k/n,1.6)*.95;ctx.beginPath();ctx.moveTo(prev[0],prev[1]);ctx.lineTo(p[0],p[1]);ctx.stroke();prev=p}
   ctx.globalAlpha=1;const p=P3(r.s.x,r.s.y);ctx.fillStyle=r.o.color;ctx.beginPath();ctx.arc(p[0],p[1],5,0,7);ctx.fill();ctx.strokeStyle='rgba(20,22,32,.9)';ctx.lineWidth=1.5;ctx.stroke()}
  const placed=[];for(const r of race.runners){const p=P3(r.s.x,r.s.y);let ly=p[1]-11;while(placed.some(q=>Math.abs(q[0]-p[0])<80&&Math.abs(q[1]-ly)<14))ly-=14;placed.push([p[0],ly]);ctx.fillStyle=r.o.color;ctx.font=FONT;label(r.o.name,p[0]+9,ly,r.o.color)}
  if(hover&&hoverXY){ctx.fillStyle='rgba(240,238,232,.85)';ctx.font=FONT;label(`loss ${f(...hoverXY).toFixed(3)}`,hover[0]+12,hover[1]+20)}
  opts.onUpdate&&opts.onUpdate(race)}
 function pick(px,py){let best=null,bd=1e9;for(const v of verts){const d=(v[0]-px)**2+(v[1]-py)**2;if(d<bd){bd=d;best=v}}return bd<900?[best[2],best[3]]:null}
 let acc=0,lastT=0;const SPS=opts.sps||35;
 function loop(now){
  const dt=Math.min(.05,(now-(lastT||now))/1000);lastT=now;
  if(!reduceMotion){acc+=dt*SPS;while(acc>=1){race.tick();acc--}
   if(race.done){doneAt=doneAt||now;if(now-doneAt>4500&&now-lastUser>8000){race.reset([XR[0]+.3+Math.random()*5.4,YR[0]+.3+Math.random()*3.4]);doneAt=0}}}
  draw(now);
 }
 let keyboardStart=[...race.start];
 function restart(xy, point){
   race.reset(xy);keyboardStart=[...xy];acc=0;doneAt=0;lastUser=clock.time;
   ripple=reduceMotion?null:point&&[...point,clock.time];
   if(reduceMotion)race.finish();
   clock.redraw();
 }
 cv.addEventListener('pointerdown',e=>{const r=cv.getBoundingClientRect();const px=e.clientX-r.left,py=e.clientY-r.top;const xy=pick(px,py);if(xy)restart(xy,[px,py]);});
 cv.addEventListener('pointermove',e=>{if(reduceMotion||e.pointerType==='touch')return;const r=cv.getBoundingClientRect();hover=[e.clientX-r.left,e.clientY-r.top];hoverXY=pick(...hover);});
 cv.addEventListener('pointerleave',()=>{hover=null;hoverXY=null;});
 cv.addEventListener('keydown',e=>{
   if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter',' '].includes(e.key)){
     e.preventDefault();
     if(e.key==='ArrowLeft')keyboardStart[0]=Math.max(XR[0],keyboardStart[0]-.3);
     if(e.key==='ArrowRight')keyboardStart[0]=Math.min(XR[1],keyboardStart[0]+.3);
     if(e.key==='ArrowUp')keyboardStart[1]=Math.min(YR[1],keyboardStart[1]+.3);
     if(e.key==='ArrowDown')keyboardStart[1]=Math.max(YR[0],keyboardStart[1]-.3);
     if(e.key==='Enter'||e.key===' ')restart(keyboardStart);
     else {hoverXY=[...keyboardStart];hover=proj(world(...keyboardStart,f(...keyboardStart)));clock.redraw();}
   }
 });
 document.querySelector('#restart-race')?.addEventListener('click',()=>restart([-2.2,-.3]));
 if(reduceMotion)race.finish();
 const clock=animateCanvas(cv,resize,loop,()=>{reduceMotion=motionQuery.matches;if(reduceMotion){race.finish();ripple=null;hover=null;hoverXY=null;}});
 document.querySelector('#race-fallback')?.setAttribute('hidden','');
 cv.classList.add('ready');
 return race;
}
