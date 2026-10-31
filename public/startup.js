/* Startup milestones + a one-second final handoff, never a network byte count. */
(function () {
  const loader=document.getElementById('startup-loader');
  const root=document.getElementById('root');
  if(!loader||!root)return;
  const percentage=document.getElementById('startup-percentage');
  const caption=document.getElementById('startup-caption');
  const complete=new Set(['shell']);
  const oldOverflow=document.documentElement.style.overflow;
  const handoffDuration=1000;
  let closed=false,mounted=false,finishing=false,value=0,assetTimer,exitTimer,handoffTimer;
  document.documentElement.style.overflow='hidden';
  root.setAttribute('inert','');
  root.setAttribute('aria-busy','true');
  const supported=['it','en','de','es'];
  let language=(navigator.languages||[navigator.language||'it']).map(item=>item.toLowerCase().split('-')[0]).find(item=>supported.includes(item))||'it';
  try{const saved=localStorage.getItem('marinaro-language');if(supported.includes(saved))language=saved;}catch{}
  const labels={it:'Caricamento',en:'Loading',de:'Wird geladen',es:'Cargando'};
  const label=labels[language]||labels.it;
  loader.setAttribute('aria-label',label);
  if(caption)caption.textContent=label;
  function paint(next){
    value=Math.max(value,Math.min(100,Math.round(next)));
    loader.style.setProperty('--startup-progress',value+'%');
    loader.setAttribute('aria-valuenow',String(value));
    loader.setAttribute('aria-valuetext',label+' '+value+'%');
    if(percentage)percentage.textContent=value+'%';
  }
  function release(){
    if(closed)return;
    closed=true;
    clearTimeout(assetTimer);clearTimeout(failsafe);clearTimeout(handoffTimer);
    document.documentElement.style.overflow=oldOverflow;
    root.removeAttribute('inert');root.removeAttribute('aria-busy');
    loader.classList.add('is-complete');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    exitTimer=setTimeout(()=>loader.remove(),reduced?0:200);
  }
  function finish(){
    if(closed||finishing)return;
    finishing=true;clearTimeout(assetTimer);
    const start=value,started=performance.now();
    function tick(){
      if(closed)return;
      const elapsed=performance.now()-started;
      paint(elapsed>=handoffDuration?100:Math.min(99,start+(100-start)*elapsed/handoffDuration));
      if(elapsed>=handoffDuration)release();
      else handoffTimer=setTimeout(tick,50);
    }
    tick();
  }
  function step(name){
    if(closed)return;
    complete.add(name);
    if(!finishing)paint(complete.size/5*80);
    if(complete.size===5)finish();
  }
  function decode(image){
    if(typeof image.decode==='function')return image.decode().catch(()=>{});
    if(image.complete)return Promise.resolve();
    return new Promise(resolve=>{
      const done=()=>{image.removeEventListener('load',done);image.removeEventListener('error',done);resolve();};
      image.addEventListener('load',done,{once:true});image.addEventListener('error',done,{once:true});
    });
  }
  const failsafe=setTimeout(()=>{
    // Error and history exits always bypass the visual handoff.
    if(!root.hasChildNodes()){
      const message=document.createElement('p');
      message.className='startup-error';
      const copy={it:'Il sito non si è ancora aperto.',en:'The website has not opened yet.',de:'Die Website wurde noch nicht geöffnet.',es:'El sitio aún no se ha abierto.'};
      message.textContent=(copy[language]||copy.it)+' ';
      const link=document.createElement('a');
      link.href=window.location.href;link.textContent={it:'Riprova',en:'Try again',de:'Erneut versuchen',es:'Reintentar'}[language]||'Riprova';
      message.append(link);root.append(message);
    }
    release();
  },8000);
  window.__marinaroBoot={
    moduleReady(){step('module');},
    mounted(){
      if(mounted||closed)return;
      mounted=true;step('module');step('render');
      const fonts=document.fonts?.ready||Promise.resolve();
      Promise.resolve(fonts).catch(()=>{}).then(()=>step('fonts'));
      requestAnimationFrame(()=>{
        if(closed)return;
        const visible=[...document.images].filter(image=>{
          if(image.closest('#startup-loader'))return true;
          if(image.loading==='lazy')return false;
          const rect=image.getBoundingClientRect();
          return rect.width>0&&rect.height>0&&rect.bottom>0&&rect.top<window.innerHeight;
        });
        Promise.all(visible.map(decode)).then(()=>step('images'));
      });
      // On slow connections the page continues loading after the handoff.
      assetTimer=setTimeout(finish,1200);
    },
  };
  paint(16);
  window.addEventListener('pagehide',()=>{release();clearTimeout(exitTimer);loader.remove();},{once:true});
})();
