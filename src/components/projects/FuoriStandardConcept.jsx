import { useState } from 'react';
import { ArrowUpRight, Plus, Check } from 'lucide-react';
import sale from '../../assets/work/fuori-sale.webp';
import teeSmall from '../../assets/work/fuori-tee-480.webp';
import tee from '../../assets/work/fuori-tee-hd.webp';
import hoodieSmall from '../../assets/work/fuori-hoodie-480.webp';
import hoodie from '../../assets/work/fuori-hoodie-hd.webp';
import denimSmall from '../../assets/work/fuori-denim-480.webp';
import denim from '../../assets/work/fuori-denim-hd.webp';
import overshirtSmall from '../../assets/work/fuori-overshirt-480.webp';
import overshirt from '../../assets/work/fuori-overshirt-hd.webp';
import './FuoriStandardConcept.css';
import {useTranslation} from "../../i18n/context.js";


const products=[['T-shirt Washed',35,tee,['#141414','#929292','#ddd9d5'],teeSmall],['Hoodie Essential',69,hoodie,['#222222','#929292','#dedbd6'],hoodieSmall],['Denim Loose',79,denim,['#829eaf','#374751'],denimSmall],['Overshirt',89,overshirt,['#171717','#5e5d58'],overshirtSmall]];
export default function FuoriStandardConcept(){
  const {t:tr}=useTranslation();

 const [saved,setSaved]=useState([]);const [colors,setColors]=useState({});
 return <div className="fuori-site">
 <section className="fuori-sale" aria-label={tr("Sale: 30% sulla selezione")}><img src={sale} alt={tr("SALE semitrasparente dietro tre magliette streetwear, su fondo antracite. 30% sulla selezione.")} width="971" height="436" loading="lazy"/><a className="fuori-sale__link" href="#fuori-shop" aria-label={tr("Scopri i saldi")}/></section>
 <section id="fuori-shop" className="fuori-shop" aria-labelledby="fuori-shop-title"><p className="fuori-shop__eyebrow">DROP 01 / ESSENTIALS</p><header><h2 id="fuori-shop-title">{tr("Il prossimo essenziale.")}</h2><a href="#fuori-shop">{tr("Tutti i capi ")}<ArrowUpRight size={15}/></a></header><div className="fuori-products">{products.map(([name,price,image,palette,small],i)=><article key={name}><img src={image} srcSet={`${small} 480w, ${image} 1122w`} sizes="(max-width:600px) 43vw, (max-width:1400px) 21vw, 360px" alt={tr(name)} width="1122" height="1402" loading="lazy" decoding="async"/><div className="fuori-product__copy"><h3>{tr(name)}</h3><p>€{tr(price)}</p></div><div className="fuori-product__actions"><div className="fuori-colors" role="group" aria-label={tr(`Colore ${name}`)}>{palette.map((color,j)=><button key={color} type="button" aria-label={tr(`Variante ${j+1} di ${name}`)} aria-pressed={(colors[i]??0)===j} onClick={()=>setColors({...colors,[i]:j})} style={{'--swatch':color}}/>)}</div><button className="fuori-add" type="button" aria-label={tr(`${saved.includes(i)?'Rimuovi':'Seleziona'} ${name}`)} aria-pressed={saved.includes(i)} onClick={()=>setSaved(saved.includes(i)?saved.filter(x=>x!==i):[...saved,i])}>{saved.includes(i)?<Check size={15}/>:<Plus size={15}/>}</button></div></article>)}</div><p className="fuori-selection" role="status">{tr(saved.length?`${saved.length} ${saved.length===1?'capo selezionato':'capi selezionati'}`:'')}</p></section>
 <footer className="fuori-footer"><strong>{tr("FUORI")}<br/>{tr("STANDARD")}</strong><a href="#fuori-shop">{tr("Shop")}</a><a href="#scelte">{tr("Info")}</a><span>{tr("Essenziali. A modo tuo.")}</span></footer>
 </div>;
}
