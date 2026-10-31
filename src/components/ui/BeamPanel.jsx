import {useEffect,useRef} from 'react';

export default function BeamPanel({children,className='',seed=0,...props}){
  const root=useRef(null),hovered=useRef(false);
  useEffect(()=>{
    const el=root.current;
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const pointer=matchMedia('(hover: hover) and (pointer: fine)');
    const lights=[...el.querySelectorAll('[data-step-light]')];
    let raf=0,last=0,angle=seed*113,visible=false;
    function paintLetters(degrees){
      lights.forEach((gradient,index)=>{
        const width=Number(gradient.dataset.stepWidth)||650;
        const phase=degrees*Math.PI/180+index*Math.PI;
        gradient.setAttribute('cx',width/2+Math.cos(phase)*width*.42);
        gradient.setAttribute('cy',95+Math.sin(phase)*68);
      });
    }
    function paint(){
      el.style.setProperty('--beam-angle',`${angle%360}deg`);
      if(hovered.current&&pointer.matches&&!media.matches)paintLetters(angle);
    }
    function tick(now){
      const dt=Math.min((now-(last||now))/1000,.035);
      last=now;
      angle+=42*dt;
      paint();
      raf=requestAnimationFrame(tick);
    }
    function sync(){
      cancelAnimationFrame(raf);raf=0;last=0;
      paintLetters(28);
      if(media.matches){angle=40+seed*70;paint();}
      else if(visible&&!document.hidden)raf=requestAnimationFrame(tick);
    }
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.02});
    observer.observe(el);
    media.addEventListener('change',sync);
    pointer.addEventListener('change',sync);
    document.addEventListener('visibilitychange',sync);
    paintLetters(28);paint();
    return()=>{
      cancelAnimationFrame(raf);observer.disconnect();
      media.removeEventListener('change',sync);
      pointer.removeEventListener('change',sync);
      document.removeEventListener('visibilitychange',sync);
    };
  },[seed]);
  return <article {...props} ref={root} className={`beam-panel ${className}`}
    onPointerEnter={()=>{hovered.current=true;}} onPointerLeave={()=>{hovered.current=false;}}>
    <span className="beam-panel__glow" aria-hidden="true"/>
    <span className="beam-panel__ring" aria-hidden="true"/>
    {children}
  </article>;
}
