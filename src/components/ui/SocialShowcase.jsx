import { useEffect, useRef } from 'react';
import SocialIcon from './SocialIcon';
import {axisAngle,ballPoint,between,initialRotation,matrix,multiply} from './social-rotation';
import './SocialShowcase.css';
import {useTranslation} from "../../i18n/context.js";

export const SOCIAL_PROFILES=[
 {id:'instagram',name:'Instagram',url:'https://www.instagram.com/marinaro_digital_studio/'},
 {id:'linkedin',name:'LinkedIn',url:''},
 {id:'tiktok',name:'TikTok',url:''},
];
function ProfileFace({profile,className,children,...props}){
  const {t:tr}=useTranslation();
return profile.url?<a {...props} className={className} href={profile.url} target="_blank" rel="noreferrer" aria-label={tr(`Apri ${profile.name}`)}>{tr(children)}</a>:<button {...props} className={className} type="button" aria-label={tr(profile.name)} disabled>{tr(children)}</button>;}
function DesktopTiles(){
  
return <div className="social-tiles">{SOCIAL_PROFILES.map(profile=><ProfileFace key={profile.id} profile={profile} className={`social-tile social-tile--${profile.id}`}><span className="social-tile__block" aria-hidden="true"><span className="social-tile__bottom"/>{['left','right','top','bottom'].map(side=><span key={side} className={`social-tile__side social-tile__side--${side}`}/>)}<span className="social-tile__front"><SocialIcon network={profile.id}/></span></span></ProfileFace>)}</div>;}
function MobileCube(){
  const {t:tr}=useTranslation();

 const stage=useRef(null),cube=useRef(null),rotation=useRef(initialRotation()),drag=useRef(null),frame=useRef(0),inertia=useRef(null),moved=useRef(false),reduced=useRef(false);
 const paint=()=>{if(cube.current)cube.current.style.transform=matrix(rotation.current);};
 const queuePaint=()=>{if(!frame.current)frame.current=requestAnimationFrame(()=>{frame.current=0;paint();});};
 const stop=()=>{cancelAnimationFrame(frame.current);frame.current=0;inertia.current=null;};
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');reduced.current=media.matches;const update=()=>{reduced.current=media.matches;if(media.matches)stop();};media.addEventListener('change',update);paint();const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)stop();},{threshold:0});if(stage.current)observer.observe(stage.current);return()=>{stop();observer.disconnect();media.removeEventListener('change',update);};},[]);
 function down(event){if(event.button!==0||drag.current)return;stop();moved.current=false;const rect=stage.current.getBoundingClientRect();drag.current={id:event.pointerId,startX:event.clientX,startY:event.clientY,last:ballPoint(event.clientX,event.clientY,rect),rect,face:event.target.closest('[data-social-face]'),time:event.timeStamp};stage.current.setPointerCapture(event.pointerId);stage.current.classList.add('is-dragging');}
 function move(event){const d=drag.current;if(!d||d.id!==event.pointerId)return;if(Math.hypot(event.clientX-d.startX,event.clientY-d.startY)>5)moved.current=true;if(!moved.current)return;const point=ballPoint(event.clientX,event.clientY,d.rect);const delta=between(d.last,point);rotation.current=multiply(delta,rotation.current);const angle=2*Math.acos(Math.max(-1,Math.min(1,delta[3])));inertia.current={axis:delta.slice(0,3),speed:Math.min(angle/Math.max(event.timeStamp-d.time,8),.012),last:0};d.last=point;d.time=event.timeStamp;queuePaint();}
 function up(event,cancelled=false){const d=drag.current;if(!d||d.id!==event.pointerId)return;drag.current=null;stage.current.classList.remove('is-dragging');if(stage.current.hasPointerCapture(event.pointerId))stage.current.releasePointerCapture(event.pointerId);const recent=event.timeStamp-d.time<90;const momentum=inertia.current;stop();paint();if(!cancelled&&!moved.current&&d.face?.href){window.open(d.face.href,'_blank','noopener,noreferrer');}if(cancelled||!moved.current||reduced.current||!recent||!momentum||Math.hypot(...momentum.axis)<.0001)return;inertia.current=momentum;function tick(now){const m=inertia.current;if(!m)return;const dt=m.last?Math.min(now-m.last,32):16;m.last=now;m.speed*=Math.exp(-dt*.012);if(m.speed<.00006){frame.current=0;inertia.current=null;return;}rotation.current=multiply(axisAngle(m.axis,m.speed*dt),rotation.current);paint();frame.current=requestAnimationFrame(tick);}frame.current=requestAnimationFrame(tick);}
 function key(event){const axes={ArrowLeft:[[0,1,0],-.22],ArrowRight:[[0,1,0],.22],ArrowUp:[[1,0,0],-.22],ArrowDown:[[1,0,0],.22],q:[[0,0,1],-.22],e:[[0,0,1],.22]};if(event.key==='Home'){event.preventDefault();stop();rotation.current=initialRotation();paint();return;}if(!axes[event.key])return;event.preventDefault();stop();rotation.current=multiply(axisAngle(...axes[event.key]),rotation.current);paint();}
 return <div className="social-mobile"><div className="social-orbit" ref={stage} tabIndex={0} role="group" aria-label={tr("Cubo social 3D. Trascina per ruotare. Usa le frecce, Q ed E per ruotare da tastiera; Home per ripristinare.")} onPointerDown={down} onPointerMove={move} onPointerUp={e=>up(e)} onPointerCancel={e=>up(e,true)} onLostPointerCapture={e=>{if(drag.current)up(e,true);}} onKeyDown={key} onClickCapture={e=>{if(e.detail>0||moved.current){e.preventDefault();e.stopPropagation();moved.current=false;}}} onDragStart={e=>e.preventDefault()}><span className="social-orbit__shadow" aria-hidden="true"/><div className="social-cube" ref={cube} style={{transform:matrix(initialRotation())}}>{['front','back','right','left','top','bottom'].map((side,i)=>{const profile=SOCIAL_PROFILES[Math.floor(i/2)];return <a key={side} data-social-face={profile.id} href={profile.url||undefined} target="_blank" rel="noopener noreferrer" aria-label={tr(`Apri ${profile.name}`)} aria-disabled={!profile.url||undefined} tabIndex={profile.url?0:-1} draggable={false} className={`social-cube__face social-cube__face--${side} social-cube__face--${profile.id}`}><SocialIcon network={profile.id}/></a>;})}</div></div><p className="social-mobile__hint">{tr("Trascina. Esplora. Seguici.")}</p></div>;
}
export default function SocialShowcase(){return <div className="social-showcase"><DesktopTiles/><MobileCube/></div>;}
