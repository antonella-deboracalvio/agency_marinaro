import {WORDMARK_PATHS, WORDMARK_VIEWBOX} from '../../lib/brand-wordmark';

export default function MarinaroWordmark({className='', ...props}) {
  return <svg className={className} viewBox={WORDMARK_VIEWBOX} fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    {WORDMARK_PATHS.map((d,index)=><path key={index} d={d} fillRule="evenodd"/>)}
  </svg>;
}
