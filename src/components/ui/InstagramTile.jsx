import { useEffect, useId, useRef, useState } from 'react';
import './InstagramTile.css';
import {useTranslation} from "../../i18n/context.js";

export const INSTAGRAM_URL='https://www.instagram.com/marinaro_digital_studio/';
export default function InstagramTile({href=INSTAGRAM_URL}) {
  const {t:tr}=useTranslation();

 const id=useId().replace(/:/g,'');const ref=useRef(null);const [visible,setVisible]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect();}},{threshold:.55});observer.observe(node);return()=>observer.disconnect();},[]);
 return <a ref={ref} className={`instagram-tile${visible?' is-visible':''}`} href={href} target="_blank" rel="noreferrer" aria-label={tr("Seguici su Instagram")}><span className="instagram-cube" aria-hidden="true"><span className="instagram-cube__back"/><span className="instagram-cube__side instagram-cube__side--left"/><span className="instagram-cube__side instagram-cube__side--right"/><span className="instagram-cube__side instagram-cube__side--top"/><span className="instagram-cube__side instagram-cube__side--bottom"/><span className="instagram-cube__front"><svg viewBox="0 0 160 160" fill="none"><defs><linearGradient id={id} x1="15" y1="10" x2="140" y2="145" gradientUnits="userSpaceOnUse"><stop stopColor="#c020b0"/><stop offset=".5" stopColor="#ed4469"/><stop offset="1" stopColor="#f5aa58"/></linearGradient></defs><rect x="12" y="12" width="136" height="136" rx="10" stroke={`url(#${id})`} strokeWidth="1" opacity=".5"/><rect x="43" y="43" width="74" height="74" rx="23" stroke={`url(#${id})`} strokeWidth="7"/><circle cx="80" cy="80" r="18" stroke={`url(#${id})`} strokeWidth="7"/><circle cx="103" cy="57" r="5" fill={`url(#${id})`}/></svg></span></span></a>;
}
