import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, X, Expand } from 'lucide-react';
import { projects } from '../data/projects';
import { projectDetails } from '../data/project-details';
import { BRAND_NAME } from '../lib/brand';
import './ServiceAreaPage.css';
import './SfogliaProjectPage.css';
import './ProjectDetailPage.css';
import NotFoundPage from './NotFoundPage';
import FuoriStandardConcept from '../components/projects/FuoriStandardConcept';
import fuoriApproved from '../assets/work/fuori-approved.webp';
import RitmoConcept from '../components/projects/RitmoConcept';
import PausaConcept from '../components/projects/PausaConcept';
import ScortaConcept from '../components/projects/ScortaConcept';
import PilatesConcept from '../components/projects/PilatesConcept';
import ritmoApproved from '../assets/work/ritmo-approved.webp';
import RealProjectShowcase, { realProjectSections } from '../components/projects/RealProjectShowcase';
import pilatesConcept from '../assets/work/forma-concept.webp';
import {useTranslation} from "../i18n/context.js";


function Detail({project:p, detail:d}) {
  const {t:tr}=useTranslation();

 const [tab,setTab]=useState(0); const [expandedImage,setExpandedImage]=useState(null); const dialog=useRef(null); const trigger=useRef(null);
 useEffect(()=>{const title=document.title; document.title=`${p.title} — Progetti — ${BRAND_NAME}`; return()=>{document.title=title;document.body.style.overflow='';};},[p]);
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 const isPilates=p.id==='forma-pilates';
 const artwork=isPilates?pilatesConcept:p.id==='ritmo-studio'?ritmoApproved:p.id==='fuori-standard'?fuoriApproved:p.cover;
 function expand(image){setExpandedImage(typeof image==='string'?image:null);dialog.current.showModal();document.body.style.overflow='hidden';}
 function close(){dialog.current.close();document.body.style.overflow='';trigger.current?.focus();}
 return <main className={`service-area project-detail project-detail--${p.id}`} style={{'--area-accent':'#bba6d8','--project-accent':d.colors[0][1],'--project-paper':d.colors[2][1]}}>
 <header className="service-area__hero service-area__wrap">
 <Link className="service-area__back" to={`/progetti#${p.id}`}><ArrowLeft size={15}/>{tr("Tutti i progetti")}</Link>
 <h1>{tr(p.title)}</h1>
 <div className="service-area__intro"><p className="service-area__promise">{tr(p.result)}</p><div className="service-area__lead"><p>{tr(p.description)}</p><a className="service-area__text-link" href="#anteprima">{tr("Esplora il progetto ")}<ArrowUpRight size={18}/></a></div></div>
 <dl className="sfoglia-project__facts"><div><dt>{tr("Settore")}</dt><dd>{tr(p.sector)}</dd></div><div><dt>{tr("Progetto")}</dt><dd>{tr(p.status)} · {tr(p.year)}</dd></div><div><dt>{tr("Cosa abbiamo curato")}</dt><dd>{tr(p.services.join(' · '))}</dd></div></dl>
 </header>
 <section id="anteprima" className="service-area__wrap detail-showcase" aria-label={tr(`Presentazione ${p.title}`)}>
 <div className="sfoglia-preview-heading"><p>{tr(p.category==='Brand identity'?'L’identità, da vicino.':'Il progetto, da esplorare.')}</p><button ref={trigger} onClick={expand}><Expand size={15}/>{tr("Ingrandisci l’immagine")}</button></div>
 {p.status === "Concept" && <p className="visual-transparency">{tr("Progetto dimostrativo con visual generati con AI; non è una commessa cliente.")}</p>}
 <div className="detail-canvas">
 <img className="detail-cover" src={p.cover} width={p.coverWidth} height={p.coverHeight} alt={tr(`Anteprima completa ${p.title}`)} fetchPriority="high"/>
 {p.id==='scorta' ? <ScortaConcept/> : p.id==='qr-menu-restaurant' ? <PausaConcept/> : realProjectSections[p.id] ? <RealProjectShowcase id={p.id} onExpand={expand}/> : isPilates ? <PilatesConcept /> : p.id==='ritmo-studio' ? <RitmoConcept /> : p.id==='fuori-standard' ? <FuoriStandardConcept /> : <>
 <nav className="detail-inner-nav" aria-label={tr(`Contenuti ${p.title}`)}><strong>{tr(p.title)}</strong><a href="#direzione">{tr("Il progetto ↗")}</a><a href="#scelte">{tr("Le scelte ↗")}</a></nav>
 <section id="direzione" className="detail-editorial"><p className="detail-eyebrow">{tr(d.eyebrow)}</p><div className="detail-editorial__lead"><h2>{tr(d.heading)}</h2><p>{tr(d.intro)}</p></div>
 {d.image&&<img className="detail-editorial__photo" src={d.image} width="1536" height="1024" alt={tr(d.imageAlt)} loading="lazy"/>}
 {d.kind ? <div className="detail-explorer"><div className="detail-tabs" role="group" aria-label={tr("Esplora le aree del concept")}>{d.sections.map(([title],i)=><button key={title} aria-pressed={tab===i} onClick={()=>setTab(i)}>{tr(title)}</button>)}</div><div className="detail-tab-content" aria-live="polite"><span>0{tr(tab+1)}</span><h3>{tr(d.sections[tab][0])}</h3><p>{tr(d.sections[tab][1])}</p>{d.kind==='inventory'&&<ul className="detail-data"><li><span>{tr("Articolo A")}</span><strong>{tr(tab===0?'24 disponibili':tab===1?'+12 in entrata':'Scorta regolare')}</strong></li><li><span>{tr("Articolo B")}</span><strong>{tr(tab===0?'3 disponibili':tab===1?'−4 in uscita':'Da riordinare')}</strong></li></ul>}{d.kind==='agenda'&&<p className="detail-demo-line">{tr("Lunedì · 09:00 Reformer / 12:30 Matwork / 18:00 Reformer")}</p>}{d.kind==='menu'&&<p className="detail-demo-line">{tr(['Espresso · Cappuccino · Iced latte','Cornetto semplice · Alla crema · Yogurt','Toast · Insalata · Focaccia'][tab])}</p>}</div></div> : <div className="detail-pillars">{d.sections.map(([title,text],i)=><article key={title}><span>0{tr(i+1)}</span><h3>{tr(title)}</h3><p>{tr(text)}</p></article>)}</div>}
 </section><div className="detail-signoff"><strong>{tr(p.title)}</strong><span>{tr(d.eyebrow)}</span></div></>}
 </div>
 
 {p.liveUrl&&<a className="service-area__text-link" href={p.liveUrl} target="_blank" rel="noreferrer">{tr("Visita il sito ")}<ArrowUpRight size={18}/></a>}
 </section>
 <section id="scelte" className="sfoglia-story"><div className="service-area__wrap"><div><p className="sfoglia-story__label">{tr("Il progetto")}</p><h2>{tr("Dietro il progetto")}</h2></div><div className="sfoglia-story__body"><p>{tr(d.story)}</p><ul className="sfoglia-palette" aria-label={tr("Palette del progetto")}>{d.colors.map(([name,color])=><li key={name}><span style={{background:color}} aria-hidden="true"/><span>{tr(name)}</span></li>)}</ul></div></div></section>
 <section className="service-area__closing service-area__wrap"><div><h2>{p.id==='ritmo-studio'?<>{tr("Il tuo studio.")}<br/>{tr("Il tuo sistema.")}</>:<>{tr("Il tuo progetto.")}<br/>{tr("Il suo carattere.")}</>}</h2><p>{tr(p.id==='ritmo-studio'?'Progettiamo strumenti su misura per il lavoro di ogni giorno.':'Diamo forma a un’identità che ti rappresenti.')}</p></div><Link className="service-area__button" to="/contatti">{tr("Raccontaci la tua idea ")}<ArrowUpRight size={20}/></Link></section>
 <nav className="service-area__others service-area__wrap detail-next" aria-label={tr("Navigazione progetti")}><Link to="/progetti"><ArrowLeft size={18}/>{tr("Tutti i progetti")}</Link><Link to={next.detailPath}>{tr("Prossimo: ")}{tr(next.title)}<ArrowUpRight size={18}/></Link></nav>
 <dialog ref={dialog} className="sfoglia-art-dialog" aria-label={tr(`Immagine completa ${p.title}`)} onClose={()=>{document.body.style.overflow='';trigger.current?.focus();}} onClick={e=>{if(e.target===e.currentTarget)close();}}><div><header><span>{tr(p.title)}</span><button onClick={close} aria-label={tr("Chiudi immagine")}><X/></button></header><img src={expandedImage || artwork} alt={tr(`Immagine completa ${p.title}`)}/></div></dialog>
 </main>
}
export default function ProjectDetailPage(){const {slug}=useParams();const p=projects.find(x=>x.id===slug); if(!p||!projectDetails[slug])return <NotFoundPage/>;return <Detail key={slug} project={p} detail={projectDetails[slug]}/>;}
