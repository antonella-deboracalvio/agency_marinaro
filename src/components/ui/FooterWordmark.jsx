import {useEffect,useId,useRef} from 'react';
import {WORDMARK_PATHS, WORDMARK_VIEWBOX} from '../../lib/brand-wordmark';

export default function FooterWordmark({className='site-footer__wordmark'}) {
  const id=useId(),light=useRef(null),frame=useRef(0),position=useRef([448,37]);
  const move=event=>{
    if(event.pointerType==='touch')return;
    const rect=event.currentTarget.getBoundingClientRect();
    position.current=[(event.clientX-rect.left)/rect.width*904-4,(event.clientY-rect.top)/rect.height*84-4];
    if(!frame.current)frame.current=requestAnimationFrame(()=>{
      light.current?.setAttribute('cx',position.current[0]);
      light.current?.setAttribute('cy',position.current[1]);
      frame.current=0;
    });
  };
  useEffect(()=>()=>cancelAnimationFrame(frame.current),[]);
  return <div className={className} aria-hidden="true">
    <svg viewBox={WORDMARK_VIEWBOX} onPointerMove={move} focusable="false">
      <defs>
        <linearGradient id={`${id}-color`}><stop stopColor="#efe7f9"/><stop offset=".5" stopColor="#bda4de"/><stop offset="1" stopColor="#b2cbd9"/></linearGradient>
        <radialGradient id={`${id}-light`} ref={light} gradientUnits="userSpaceOnUse" cx="448" cy="37" r="230"><stop stopColor="white"/><stop offset="1" stopColor="black"/></radialGradient>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="-4" y="-4" width="904" height="84"><rect x="-4" y="-4" width="904" height="84" fill={`url(#${id}-light)`}/></mask>
      </defs>
      <g className="footer-lettering__base" fill="#292432">{WORDMARK_PATHS.map((d,index)=><path key={index} d={d} fillRule="evenodd"/>)}</g>
      <g className="footer-lettering__light" fill={`url(#${id}-color)`} mask={`url(#${id}-mask)`}>{WORDMARK_PATHS.map((d,index)=><path key={index} d={d} fillRule="evenodd"/>)}</g>
    </svg>
  </div>;
}
