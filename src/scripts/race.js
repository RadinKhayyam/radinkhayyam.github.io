// Shared: loss landscape + live optimizer race (real update rules)
const XR=[-3,3], YR=[-2,2];
const GMIN=[1.3,-0.5];
function f(x,y){return 0.05*(x*x+1.6*y*y)-1.1*Math.exp(-((x-1.3)**2+(y+0.5)**2)/1.3)-0.45*Math.exp(-((x+1.1)**2+(y-0.7)**2)/0.22)+0.05*Math.sin(2.2*x)*Math.cos(1.8*y)+1.1}
function grad(x,y){const h=1e-4;return[(f(x+h,y)-f(x-h,y))/(2*h),(f(x,y+h)-f(x,y-h))/(2*h)]}
const OPTS=[
 {key:'sgd',name:'SGD',color:'#9cc9e8',step(s){const[g1,g2]=grad(s.x,s.y);s.x-=0.05*g1;s.y-=0.05*g2}},
 {key:'mom',name:'Momentum',color:'#f3c08c',step(s){const[g1,g2]=grad(s.x,s.y);s.vx=0.93*(s.vx||0)-0.02*g1;s.vy=0.93*(s.vy||0)-0.02*g2;s.x+=s.vx;s.y+=s.vy}},
 {key:'adam',name:'Adam',color:'#aab1f6',step(s){const g=grad(s.x,s.y);s.t=(s.t||0)+1;s.m=s.m||[0,0];s.v=s.v||[0,0];
   for(let i=0;i<2;i++){s.m[i]=0.9*s.m[i]+0.1*g[i];s.v[i]=0.999*s.v[i]+0.001*g[i]*g[i];const mh=s.m[i]/(1-0.9**s.t),vh=s.v[i]/(1-0.999**s.t);const d=0.03*mh/(Math.sqrt(vh)+1e-8);if(i)s.y-=d;else s.x-=d}}}
];
class Race{
 constructor(start){this.reset(start)}
 reset([x,y]){this.start=[x,y];this.t=0;this.done=false;this.runners=OPTS.map(o=>({o,s:{x,y},trail:[[x,y]],still:0}))}
 tick(){if(this.done)return;this.t++;let all=true;
  for(const r of this.runners){const px=r.s.x,py=r.s.y;r.o.step(r.s);
   r.s.x=Math.max(XR[0],Math.min(XR[1],r.s.x));r.s.y=Math.max(YR[0],Math.min(YR[1],r.s.y));
   {const L=r.trail[r.trail.length-1];if(Math.hypot(L[0]-r.s.x,L[1]-r.s.y)>2e-3){r.trail.push([r.s.x,r.s.y]);if(r.trail.length>260)r.trail.shift()}}
   r.still=Math.hypot(r.s.x-px,r.s.y-py)<4e-4?r.still+1:0;if(r.still<25)all=false}
  if(all||this.t>=700)this.done=true}
 finish(){while(!this.done)this.tick()}
}

// marching squares: returns per-cell segment lists for given levels on grid G (nx x ny values)
function contourCells(G,nx,ny,levels){const cells=new Array((nx-1)*(ny-1));
 for(let j=0;j<ny-1;j++)for(let i=0;i<nx-1;i++){const a=G[j*nx+i],b=G[j*nx+i+1],c=G[(j+1)*nx+i+1],d=G[(j+1)*nx+i];const segs=[];
  for(let li=0;li<levels.length;li++){const L=levels[li];const pts=[];
   const e=(v1,v2,p1,p2)=>{const t=(L-v1)/(v2-v1);pts.push([p1[0]+(p2[0]-p1[0])*t,p1[1]+(p2[1]-p1[1])*t])};
   if((a<L)!=(b<L))e(a,b,[i,j],[i+1,j]);if((b<L)!=(c<L))e(b,c,[i+1,j],[i+1,j+1]);if((c<L)!=(d<L))e(c,d,[i+1,j+1],[i,j+1]);if((d<L)!=(a<L))e(d,a,[i,j+1],[i,j]);
   if(pts.length>=2)segs.push([li,pts[0],pts[1]]);if(pts.length==4)segs.push([li,pts[2],pts[3]])}
  cells[j*(nx-1)+i]=segs}
 return cells}
function sampleGrid(nx,ny){const G=new Float32Array(nx*ny);let lo=1e9,hi=-1e9;
 for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const x=XR[0]+(XR[1]-XR[0])*i/(nx-1),y=YR[1]-(YR[1]-YR[0])*j/(ny-1);const v=f(x,y);G[j*nx+i]=v;lo=Math.min(lo,v);hi=Math.max(hi,v)}
 return{G,lo,hi}}
function mix(c1,c2,t){return c1.map((v,i)=>Math.round(v+(c2[i]-v)*t))}

export { XR, YR, Race, f, sampleGrid, contourCells, mix };
