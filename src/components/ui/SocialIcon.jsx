import { useId } from 'react';
export default function SocialIcon({network}){
 const id=useId().replace(/:/g,'');
 if(network==='instagram')return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c128b5"/><stop offset=".5" stopColor="#ee466b"/><stop offset="1" stopColor="#f8ae55"/></linearGradient></defs><g stroke={`url(#${id})`} strokeWidth="5"><rect x="9" y="9" width="46" height="46" rx="14"/><circle cx="32" cy="32" r="11"/></g><circle cx="46" cy="18" r="3.5" fill={`url(#${id})`}/></svg>;
 if(network==='linkedin')return <svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><circle cx="15" cy="15" r="5"/><path d="M11 25h8v29h-8zm15 0h8v4c2-3 5-5 9-5 8 0 11 5 11 13v17h-8V38c0-4-1-7-5-7s-7 3-7 7v16h-8z"/></svg>;
 return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M36 9h8c1 7 5 11 12 12v8c-5 0-9-2-12-4v18c0 11-13 17-22 12-12-7-8-25 5-27h5v9c-12-3-15 12-5 12 5 0 9-3 9-8V9Z" fill="#25f4ee" transform="translate(-2 1)"/><path d="M36 9h8c1 7 5 11 12 12v8c-5 0-9-2-12-4v18c0 11-13 17-22 12-12-7-8-25 5-27h5v9c-12-3-15 12-5 12 5 0 9-3 9-8V9Z" fill="#fe2c55" transform="translate(2 -1)"/><path d="M36 9h8c1 7 5 11 12 12v8c-5 0-9-2-12-4v18c0 11-13 17-22 12-12-7-8-25 5-27h5v9c-12-3-15 12-5 12 5 0 9-3 9-8V9Z" fill="#eeeaf2"/></svg>;
}
