import {useId} from 'react';
import {useTranslation} from '../../i18n/context.js';

export default function StepWordmark({text,width=650}){
  const {t}=useTranslation();
  const id=useId();
  const lettering={fontFamily:'var(--font-display)',fontWeight:900,fontSize:180,letterSpacing:'-.025em'};
  const props={x:width/2,y:166,textAnchor:'middle',textLength:width-44,lengthAdjust:'spacingAndGlyphs',style:lettering,fill:'none'};
  return <div className="next-step__word step-word" aria-hidden="true">
    <svg viewBox={`0 0 ${width} 190`} focusable="false">
      <defs>
        <linearGradient id={`${id}-base`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#74677c"/><stop offset=".55" stopColor="#77608d"/><stop offset="1" stopColor="#637e8b"/>
        </linearGradient>
        <radialGradient id={`${id}-violet`} data-step-light="0" data-step-width={width} gradientUnits="userSpaceOnUse" cx={width*.32} cy="90" r={width*.31}>
          <stop stopColor="#a37ac9"/><stop offset=".4" stopColor="#b69ad1" stopOpacity=".85"/><stop offset="1" stopColor="#b69ad1" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id={`${id}-blue`} data-step-light="1" data-step-width={width} gradientUnits="userSpaceOnUse" cx={width*.8} cy="110" r={width*.31}>
          <stop stopColor="#82a9c3"/><stop offset=".4" stopColor="#9bb9cf" stopOpacity=".85"/><stop offset="1" stopColor="#9bb9cf" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <text {...props} className="step-word__base" fill="#71617d" fillOpacity=".055" stroke={`url(#${id}-base)`} strokeWidth="1.8">{t(text)}</text>
      <g className="step-word__beam">
        <text {...props} stroke={`url(#${id}-violet)`} strokeWidth="2.1">{t(text)}</text>
        <text {...props} stroke={`url(#${id}-blue)`} strokeWidth="2.1">{t(text)}</text>
      </g>
    </svg>
  </div>;
}
