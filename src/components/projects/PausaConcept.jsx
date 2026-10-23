import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import cappuccino from '../../assets/work/pausa-cappuccino-cutout.webp';
import croissant from '../../assets/work/pausa-croissant-cutout.webp';
import icedLatte from '../../assets/work/pausa-iced-latte-cutout.webp';
import './PausaConcept.css';
const proposals=[
 {id:'cappuccino',category:'Caffetteria',title:'Caffè &\ncompagnia.',name:'Cappuccino',price:'2,50',caption:'La parte morbida del mattino.',details:'Espresso e latte montato. Chiedi al personale le alternative al latte.',photo:cappuccino,word:'CAFFÈ',tone:'lilac',extra:'Espresso · 1,30 €'},
 {id:'cornetto',category:'Colazione',title:'Buongiorno,\nsfoglia.',name:'Cornetto',price:'2,00',caption:'Burro, sfoglia. E un altro morso.',details:'Cornetto al burro. Chiedi al personale le farciture disponibili: crema o cioccolato.',photo:croissant,word:'SFOGLIA',tone:'butter',extra:'Semplice, crema o cioccolato'},
 {id:'iced-latte',category:'Bevande fredde',title:'Il caffè.\nCon calma.',name:'Iced latte',price:'3,50',caption:'Espresso, latte e tanto ghiaccio.',details:'Espresso versato sul latte con ghiaccio. Chiedi al personale le alternative al latte.',photo:icedLatte,word:'FRESH',tone:'pink',extra:'La tua pausa, anche fredda.'},
];
export default function PausaConcept(){
 const [category,setCategory]=useState('Tutto');const [open,setOpen]=useState(null);
 const shown=proposals.filter(p=>category==='Tutto'||p.category===category);
 return <div className="pausa-board">
  <header className="pausa-board__nav"><strong>PAUSA<span>CAFFÈ & CUCINA</span></strong><a href="#pausa-menu">Scopri il menu <ArrowUpRight size={18}/></a></header>
  <section id="pausa-menu" className="pausa-board__menu" aria-labelledby="pausa-menu-title">
   <div className="pausa-board__heading"><p>IL MENU · FATTO PER I TUOI MOMENTI</p><h2 id="pausa-menu-title">COSA TI VA<br/><span>DI BUONO?</span></h2><p>Una tazza calda. Una sfoglia fragrante.<br/>Oppure il tuo caffè, con ghiaccio.</p></div>
   <div className="pausa-board__filters" role="group" aria-label="Categorie del menu">{['Tutto','Caffetteria','Colazione','Bevande fredde'].map(c=><button key={c} aria-pressed={category===c} onClick={()=>{setCategory(c);setOpen(null);}}>{c}</button>)}</div>
   <div className="pausa-board__strips" aria-live="polite">{shown.map(p=><article className={`pausa-strip pausa-strip--${p.tone}`} key={p.id}>
    <div className="pausa-strip__copy"><span className="pausa-strip__word" aria-hidden="true">{p.word}</span><span className="pausa-strip__category">{p.category}</span><h3>{p.name}<span>.</span></h3><p className="pausa-strip__caption">{p.caption}</p><div className="pausa-strip__action"><strong>{p.price}<small> €</small></strong><button type="button" aria-label={`${open===p.id?'Nascondi':'Mostra'} ingredienti ${p.name}`} aria-expanded={open===p.id} aria-controls={`pausa-ingredients-${p.id}`} onClick={()=>setOpen(open===p.id?null:p.id)}><span>Ingredienti</span>{open===p.id?<Minus size={17}/>:<Plus size={17}/>}</button></div><div id={`pausa-ingredients-${p.id}`} className="pausa-strip__ingredients" hidden={open!==p.id}>{p.details}</div></div>
    <div className="pausa-strip__visual"><img src={p.photo} alt={p.name} loading="lazy"/></div>
   </article>)}</div>
   <footer className="pausa-board__note"><strong>Il bello è prendersela.</strong><span>Per ingredienti e allergeni, chiedi al personale.</span></footer>
  </section>
  <section className="pausa-board__manage"><div><p>UN MENU CHE TI SEGUE</p><h2>CAMBIA IL MENU.<br/><span>IL QR RESTA.</span></h2></div><div><article><h3>Lo aggiorni tu.</h3><p>Puoi richiedere un pannello riservato per cambiare prezzi e descrizioni, aggiungere proposte e nascondere quelle non disponibili.</p></article><article><h3>Oppure ci pensiamo noi.</h3><p>La nostra assistenza è sempre a disposizione per gli aggiornamenti: ci invii le modifiche e le inseriamo nel tuo menu.</p></article><Link to="/contatti">Progettiamo il tuo menu <ArrowUpRight size={20}/></Link></div></section>
 </div>;
}
