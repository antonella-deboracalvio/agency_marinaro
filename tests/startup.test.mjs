import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../public/startup.js',import.meta.url),'utf8');
function setup({pending=false,reduced=false,savedLanguage=null}={}){
  const timers=new Map(),raf=[],events=new Map();let time=0,serial=0,decoded=0,removed=false;
  const percentage={textContent:''},caption={textContent:''};
  const loader={attributes:{},style:{setProperty(k,v){this[k]=v;}},classList:{add(value){this[value]=true;}},setAttribute(k,v){this.attributes[k]=v;},remove(){removed=true;}};
  const root={attributes:{},children:[],setAttribute(k,v){this.attributes[k]=v;},removeAttribute(k){delete this.attributes[k];},hasChildNodes(){return this.children.length>0;},append(node){this.children.push(node);}};
  const makeImage=(lazy,top,loaderImage=false)=>({loading:lazy?'lazy':'eager',getBoundingClientRect:()=>({top,bottom:top+150,width:150,height:150}),closest:()=>loaderImage?loader:null,decode:()=>{decoded++;return pending?new Promise(()=>{}):Promise.resolve();}});
  const document={documentElement:{style:{overflow:'auto'}},fonts:{ready:Promise.resolve()},images:[makeImage(false,0,true),makeImage(false,100),makeImage(true,200),makeImage(false,1500)],getElementById:id=>id==='root'?root:id==='startup-percentage'?percentage:id==='startup-caption'?caption:loader,createElement:tag=>({tag,children:[],append(node){this.children.push(node);}})};
  const window={innerHeight:800,location:{href:'https://example.test/'},matchMedia:()=>({matches:reduced}),addEventListener(name,fn){events.set(name,fn);}};
  const setTimer=(fn,delay)=>{const id=++serial;timers.set(id,{fn,at:time+delay});return id;};
  vm.runInNewContext(source,{document,window,navigator:{language:'en-GB'},requestAnimationFrame:fn=>raf.push(fn),setTimeout:setTimer,clearTimeout:id=>timers.delete(id),Set,Promise,Math,performance:{now:()=>time},localStorage:{getItem:()=>savedLanguage}});
  const advance=ms=>{
    const target=time+ms;
    while(true){
      const next=[...timers].filter(([,timer])=>timer.at<=target).sort((a,b)=>a[1].at-b[1].at)[0];
      if(!next)break;
      time=next[1].at;timers.delete(next[0]);next[1].fn();
    }
    time=target;
  };
  return{loader,root,document,window,timers,events,percentage,caption,get decoded(){return decoded;},get removed(){return removed;},advance,frame:()=>raf.splice(0).forEach(fn=>fn()),flush:async()=>{for(let i=0;i<6;i++)await Promise.resolve();}};
}
test('startup decodes visible eager images, then adds exactly one second with a visible percentage',async()=>{
  const h=setup();assert.equal(h.loader.attributes['aria-valuenow'],'16');assert.equal(h.percentage.textContent,'16%');
  h.window.__marinaroBoot.moduleReady();assert.equal(h.loader.attributes['aria-valuenow'],'32');
  h.root.children.push({tag:'main'});h.window.__marinaroBoot.mounted();h.frame();await h.flush();
  assert.equal(h.decoded,2,'offscreen and lazy images must be skipped');
  assert.equal(h.loader.attributes['aria-valuenow'],'80');assert('inert' in h.root.attributes);
  h.advance(500);assert.equal(h.percentage.textContent,'90%');assert('inert' in h.root.attributes);
  h.advance(499);assert('inert' in h.root.attributes);assert(!h.removed);assert.equal(h.percentage.textContent,'99%');
  h.advance(1);assert.equal(h.percentage.textContent,'100%');assert(!('inert' in h.root.attributes));assert.equal(h.document.documentElement.style.overflow,'auto');
  h.advance(200);assert(h.removed);assert.equal(h.timers.size,0);
});
test('slow assets cannot trap the overlay and late completion does not restart or reverse progress',async()=>{
  const h=setup({pending:true});h.root.children.push({tag:'main'});h.window.__marinaroBoot.mounted();h.frame();await h.flush();
  assert.equal(h.loader.attributes['aria-valuenow'],'64');h.advance(1200);assert('inert' in h.root.attributes);
  h.advance(1000);assert(!('inert' in h.root.attributes));assert.equal(h.percentage.textContent,'100%');h.advance(200);assert(h.removed);assert.equal(h.timers.size,0);
});
test('strict-mode repeat mount does not restart the delay; reduced motion retains readable timing',async()=>{
  const h=setup({reduced:true});h.root.children.push({tag:'main'});h.window.__marinaroBoot.mounted();h.window.__marinaroBoot.mounted();h.frame();await h.flush();
  assert.equal(h.decoded,2);h.advance(999);assert(!h.removed);h.advance(1);assert(h.removed);assert.equal(h.timers.size,0);
});
test('a missing application bundle cannot leave the screen locked',()=>{
  const h=setup();h.advance(8000);assert(!('inert' in h.root.attributes));assert.equal(h.root.children[0].children[0].textContent,'Try again');h.advance(200);assert(h.removed);
});
test('leaving during startup bypasses the delay and cannot restore a locked page from history',async()=>{
  const h=setup();h.root.children.push({tag:'main'});h.window.__marinaroBoot.mounted();h.frame();await h.flush();h.advance(750);
  h.events.get('pagehide')();assert(h.removed);assert(!('inert' in h.root.attributes));assert.equal(h.document.documentElement.style.overflow,'auto');assert.equal(h.timers.size,0);
});
test('the visible loading caption follows the saved language',()=>{
  const h=setup({savedLanguage:'de'});assert.equal(h.caption.textContent,'Wird geladen');assert.equal(h.loader.attributes['aria-label'],'Wird geladen');assert.equal(h.loader.attributes['aria-valuetext'],'Wird geladen 16%');
});
