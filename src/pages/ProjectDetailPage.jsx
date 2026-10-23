import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, X, Expand } from 'lucide-react';
import { projects } from '../data/projects';
import { projectDetails } from '../data/project-details';
import { BRAND_NAME } from '../lib/brand';
import './ServiceAreaPage.css';
import './SfogliaProjectPage.css';
import './ProjectDetailPage.css';
import FuoriStandardConcept from '../components/projects/FuoriStandardConcept';
import fuoriApproved from '../assets/work/fuori-approved.webp';
import RitmoConcept from '../components/projects/RitmoConcept';
import PausaConcept from '../components/projects/PausaConcept';
import PilatesConcept from '../components/projects/PilatesConcept';
import ritmoApproved from '../assets/work/ritmo-approved.webp';
import RealProjectShowcase, { realProjectSections } from '../components/projects/RealProjectShowcase';
import pilatesConcept from '../assets/work/forma-concept.webp';

function Detail({project:p, detail:d}) {
 const [tab,setTab]=useState(0); const [expandedImage,setExpandedImage]=useState(null); const dialog=useRef(null); const trigger=useRef(null);
 useEffect(()=>{const title=document.title; document.title=`${p.title} — Progetti — ${BRAND_NAME}`; return()=>{document.title=title;document.body.style.overflow='';};},[p]);
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 const isPilates=p.id==='forma-pilates';
 const artwork=isPilates?pilatesConcept:p.id==='ritmo-studio'?ritmoApproved:p.id==='fuori-standard'?fuoriApproved:p.cover;
 function expand(image){setExpandedImage(typeof image==='string'?image:null);dialog.current.showModal();document.body.style.overflow='hidden';}
 function close(){dialog.current.close();document.body.style.overflow='';trigger.current?.focus();}
 return <main className={`service-area project-detail project-detail--${p.id}`} style={{'--area-accent':'#bba6d8','--project-accent':d.colors[0][1],'--project-paper':d.colors[2][1]}}>
 <header className="service-area__hero service-area__wrap">
 <Link className="service-area__back" to={`/progetti#${p.id}`}><ArrowLeft size={15}/>Tutti i progetti</Link>
 <h1>{p.title}</h1>
 <div className="service-area__intro"><p className="service-area__promise">{p.result}</p><div className="service-area__lead"><p>{p.description}</p><a className="service-area__text-link" href="#anteprima">Esplora il progetto <ArrowUpRight size={18}/></a></div></div>
 <dl className="sfoglia-project__facts"><div><dt>Settore</dt><dd>{p.sector}</dd></div><div><dt>Progetto</dt><dd>{p.status} · {p.year}</dd></div><div><dt>Cosa abbiamo curato</dt><dd>{p.services.join(' · ')}</dd></div></dl>
 </header>
 <section id="anteprima" className="service-area__wrap detail-showcase" aria-label={`Presentazione ${p.title}`}>
 <div className="sfoglia-preview-heading"><p>{p.category==='Brand identity'?'L’identità, da vicino.':'Il progetto, da esplorare.'}</p><button ref={trigger} onClick={expand}><Expand size={15}/>Ingrandisci l’immagine</button></div>
 <div className="detail-canvas">
 <img className="detail-cover" src={p.cover} width={p.coverWidth} height={p.coverHeight} alt={`Anteprima completa ${p.title}`} fetchPriority="high"/>
 {p.id==='qr-menu-restaurant' ? <PausaConcept/> : realProjectSections[p.id] ? <RealProjectShowcase id={p.id} onExpand={expand}/> : isPilates ? <PilatesConcept /> : p.id==='ritmo-studio' ? <RitmoConcept /> : p.id==='fuori-standard' ? <FuoriStandardConcept /> : <>
 <nav className="detail-inner-nav" aria-label={`Contenuti ${p.title}`}><strong>{p.title}</strong><a href="#direzione">Il progetto ↗</a><a href="#scelte">Le scelte ↗</a></nav>
 <section id="direzione" className="detail-editorial"><p className="detail-eyebrow">{d.eyebrow}</p><div className="detail-editorial__lead"><h2>{d.heading}</h2><p>{d.intro}</p></div>
 {d.image&&<img className="detail-editorial__photo" src={d.image} width="1536" height="1024" alt={d.imageAlt} loading="lazy"/>}
 {d.kind ? <div className="detail-explorer"><div className="detail-tabs" role="group" aria-label="Esplora le aree del concept">{d.sections.map(([title],i)=><button key={title} aria-pressed={tab===i} onClick={()=>setTab(i)}>{title}</button>)}</div><div className="detail-tab-content" aria-live="polite"><span>0{tab+1}</span><h3>{d.sections[tab][0]}</h3><p>{d.sections[tab][1]}</p>{d.kind==='inventory'&&<ul className="detail-data"><li><span>Articolo A</span><strong>{tab===0?'24 disponibili':tab===1?'+12 in entrata':'Scorta regolare'}</strong></li><li><span>Articolo B</span><strong>{tab===0?'3 disponibili':tab===1?'−4 in uscita':'Da riordinare'}</strong></li></ul>}{d.kind==='agenda'&&<p className="detail-demo-line">Lunedì · 09:00 Reformer / 12:30 Matwork / 18:00 Reformer</p>}{d.kind==='menu'&&<p className="detail-demo-line">{['Espresso · Cappuccino · Iced latte','Cornetto semplice · Alla crema · Yogurt','Toast · Insalata · Focaccia'][tab]}</p>}</div></div> : <div className="detail-pillars">{d.sections.map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>}
 </section><div className="detail-signoff"><strong>{p.title}</strong><span>{d.eyebrow}</span></div></>}
 </div>
 
 {p.liveUrl&&<a className="service-area__text-link" href={p.liveUrl} target="_blank" rel="noreferrer">Visita il sito <ArrowUpRight size={18}/></a>}
 </section>
 <section id="scelte" className="sfoglia-story"><div className="service-area__wrap"><div><p className="sfoglia-story__label">Il progetto</p><h2>Dietro il progetto</h2></div><div className="sfoglia-story__body"><p>{d.story}</p><ul className="sfoglia-palette" aria-label="Palette del progetto">{d.colors.map(([name,color])=><li key={name}><span style={{background:color}} aria-hidden="true"/><span>{name}</span></li>)}</ul></div></div></section>
 <section className="service-area__closing service-area__wrap"><div><h2>{p.id==='ritmo-studio'?<>Il tuo studio.<br/>Il tuo sistema.</>:<>Il tuo progetto.<br/>Il suo carattere.</>}</h2><p>{p.id==='ritmo-studio'?'Progettiamo strumenti su misura per il lavoro di ogni giorno.':'Diamo forma a un’identità che ti rappresenti.'}</p></div><Link className="service-area__button" to="/contatti">Raccontaci la tua idea <ArrowUpRight size={20}/></Link></section>
 <nav className="service-area__others service-area__wrap detail-next" aria-label="Navigazione progetti"><Link to="/progetti"><ArrowLeft size={18}/>Tutti i progetti</Link><Link to={next.detailPath}>Prossimo: {next.title}<ArrowUpRight size={18}/></Link></nav>
 <dialog ref={dialog} className="sfoglia-art-dialog" aria-label={`Immagine completa ${p.title}`} onClose={()=>{document.body.style.overflow='';trigger.current?.focus();}} onClick={e=>{if(e.target===e.currentTarget)close();}}><div><header><span>{p.title}</span><button onClick={close} aria-label="Chiudi immagine"><X/></button></header><img src={expandedImage || artwork} alt={`Immagine completa ${p.title}`}/></div></dialog>
 </main>
}
export default function ProjectDetailPage(){const {slug}=useParams();const p=projects.find(x=>x.id===slug); if(!p||!projectDetails[slug])return <main className="service-area service-area__wrap" style={{paddingTop:180,paddingBottom:100}}><h1>Progetto non trovato</h1><Link to="/progetti">Torna ai progetti</Link></main>;return <Detail key={slug} project={p} detail={projectDetails[slug]}/>;}
