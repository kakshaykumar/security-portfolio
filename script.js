// ── CANVAS BACKGROUND ────────────────────────────────────────────
(function(){
  const canvas=document.getElementById('bg-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W,H;
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
  resize();
  window.addEventListener('resize',resize);
  const N=55,MAX=160;
  class P{constructor(){this.reset(true)}reset(r){this.x=r?Math.random()*W:(Math.random()>.5?0:W);this.y=r?Math.random()*H:Math.random()*H;this.vx=(Math.random()-.5)*.35;this.vy=(Math.random()-.5)*.35;this.r=Math.random()*1.8+.8;this.a=Math.random()*.4+.15;this.ph=Math.random()*Math.PI*2;this.node=Math.random()<.18}update(){this.x+=this.vx;this.y+=this.vy;this.ph+=.018;if(this.x<-20||this.x>W+20||this.y<-20||this.y>H+20)this.reset(false)}draw(){const p=.75+Math.sin(this.ph)*.25,r=this.node?this.r*2.2*p:this.r*p,a=this.a*p;ctx.beginPath();ctx.arc(this.x,this.y,r,0,Math.PI*2);if(this.node){const g=ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,r*2.5);g.addColorStop(0,`rgba(138,215,176,${a*1.2})`);g.addColorStop(1,'rgba(138,215,176,0)');ctx.fillStyle=g;ctx.fill();ctx.beginPath();ctx.arc(this.x,this.y,r,0,Math.PI*2);ctx.fillStyle=`rgba(138,215,176,${a*.9})`;ctx.fill()}else{ctx.fillStyle=`rgba(107,183,232,${a})`;ctx.fill()}}}
  const ps=Array.from({length:N},()=>new P());
  function draw(){ctx.clearRect(0,0,W,H);for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<MAX){const op=(1-d/MAX)*.2*(ps[i].node||ps[j].node?1.6:1);ctx.beginPath();ctx.moveTo(ps[i].x,ps[i].y);ctx.lineTo(ps[j].x,ps[j].y);ctx.strokeStyle=`rgba(138,215,176,${op})`;ctx.lineWidth=ps[i].node||ps[j].node?.7:.45;ctx.stroke()}}ps.forEach(p=>{p.update();p.draw()});requestAnimationFrame(draw)}
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)draw()});
  draw();
})();

// ── MOBILE NAV ───────────────────────────────────────────────────
const navToggle=document.querySelector('.nav-toggle');
const navLinks=document.querySelector('.nav-links');
if(navToggle&&navLinks){
  navToggle.addEventListener('click',()=>{const o=navLinks.classList.toggle('is-open');navToggle.setAttribute('aria-expanded',String(o))});
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('is-open');navToggle.setAttribute('aria-expanded','false')}));
}

// ── ACTIVE NAV ON SCROLL ─────────────────────────────────────────
const secs=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const id=e.target.id;navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id))}})},{threshold:.3}).observe(document.querySelector('#top')||document.body);
secs.forEach(s=>new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const id=e.target.id;navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id))}})},{threshold:.3}).observe(s));

// ── REVEAL ON SCROLL ──────────────────────────────────────────────
new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');}}),{threshold:.08}}).observe;
const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible')}})},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// ── TYPING ANIMATION ──────────────────────────────────────────────
const typingTarget=document.getElementById('typing-role');
if(typingTarget){
  const roles=['SOC_Analyst','Blue_Team_Defender','Network_Security_Engineer','Cloud_Security_Analyst','Cybersecurity_Professional'];
  let ri=0,ci=0,del=false;
  function type(){
    const cur=roles[ri];
    if(del){typingTarget.textContent=cur.slice(0,ci-1);ci--}
    else{typingTarget.textContent=cur.slice(0,ci+1);ci++}
    if(!del&&ci===cur.length){setTimeout(()=>{del=true;type()},2400);return}
    if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
    setTimeout(type,del?38:72);
  }
  setTimeout(type,900);
}
