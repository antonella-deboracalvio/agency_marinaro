import { useState } from 'react';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import sale from '../../assets/work/fuori-sale.webp';
import tee from '../../assets/work/fuori-product-0.webp';
import hoodie from '../../assets/work/fuori-product-1.webp';
import denim from '../../assets/work/fuori-product-2.webp';
import overshirt from '../../assets/work/fuori-product-3.webp';
import './FuoriStandardConcept.css';

const products=[['T-shirt Washed',35,tee,['#141414','#929292','#ddd9d5']],['Hoodie Essential',69,hoodie,['#222222','#929292','#dedbd6']],['Denim Loose',79,denim,['#829eaf','#374751']],['Overshirt',89,overshirt,['#171717','#5e5d58']]];
export default function FuoriStandardConcept(){
 const [saved,setSaved]=useState([]);const [colors,setColors]=useState({});
 return <div className="fuori-site">
 <section className="fuori-sale" aria-label="Sale: 30% sulla selezione"><img src={sale} alt="SALE semitrasparente dietro tre magliette streetwear, su fondo antracite. 30% sulla selezione." width="971" height="436" loading="lazy"/><a className="fuori-sale__link" href="#fuori-shop" aria-label="Scopri i saldi"/></section>
 <section id="fuori-shop" className="fuori-shop" aria-labelledby="fuori-shop-title"><header><h2 id="fuori-shop-title">Il prossimo essenziale.</h2><a href="#fuori-shop">Tutti i capi <ArrowUpRight size={15}/></a></header><div className="fuori-products">{products.map(([name,price,image,palette],i)=><article key={name}><img src={image} alt={name} width="216" height="227" loading="lazy"/><div className="fuori-product__copy"><h3>{name}</h3><p>€{price}</p></div><div className="fuori-product__actions"><div className="fuori-colors" role="group" aria-label={`Colore ${name}`}>{palette.map((color,j)=><button key={color} type="button" aria-label={`Variante ${j+1} di ${name}`} aria-pressed={(colors[i]??0)===j} onClick={()=>setColors({...colors,[i]:j})} style={{'--swatch':color}}/>)}</div><button className="fuori-add" type="button" aria-label={`${saved.includes(i)?'Rimuovi':'Seleziona'} ${name}`} aria-pressed={saved.includes(i)} onClick={()=>setSaved(saved.includes(i)?saved.filter(x=>x!==i):[...saved,i])}>{saved.includes(i)?<Check size={15}/>:<Plus size={15}/>}</button></div></article>)}</div><p className="fuori-selection" role="status">{saved.length?`${saved.length} ${saved.length===1?'capo selezionato':'capi selezionati'}`:''}</p></section>
 <footer className="fuori-footer"><strong>FUORI<br/>STANDARD</strong><a href="#fuori-shop">Shop</a><a href="#scelte">Info</a><span>Essenziali. A modo tuo.</span></footer>
 </div>;
}
