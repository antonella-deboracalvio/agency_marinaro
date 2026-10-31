import { useState } from 'react';
import { CalendarDays, Clock3, Layers, ArrowUpRight, ChevronRight, Check, Search } from 'lucide-react';
import './RitmoConcept.css';
import ownerPhones from '../../assets/work/ritmo-owner-cutout.webp';
import {useTranslation} from "../../i18n/context.js";


const bookings = [
  {name:'Giulia Rossi',initials:'GR',course:'Reformer',time:'09:00',end:'10:00',status:'Confermato'},
  {name:'Marco Riva',initials:'MR',course:'Matwork',time:'12:30',end:'13:30',status:'Confermato'},
  {name:'Elena Costa',initials:'EC',course:'Reformer',time:'15:00',end:'16:00',status:'Annullato'},
  {name:'Sara Conti',initials:'SC',course:'Matwork',time:'18:00',end:'19:00',status:'Confermato'},
];
export default function RitmoConcept(){
  const {t:tr}=useTranslation();

 const [selected,setSelected]=useState(0); const [search,setSearch]=useState(''); const [expanded,setExpanded]=useState(false);

 const current=bookings[selected];
 return <div className="ritmo-concept">
 <section className="ritmo-workspace" aria-labelledby="ritmo-bookings-title">
 <nav className="ritmo-toolbar" aria-label={tr("Esplora il concept RITMO")}><span className="ritmo-logo">{tr("RITMO")}<small>{tr("STUDIO")}</small></span><a href="#anteprima"><CalendarDays size={17}/>{tr("Agenda")}</a><a className="is-selected" href="#ritmo-bookings"><CalendarDays size={17}/>{tr("Prenotazioni")}</a><a href="#ritmo-bookings"><Search size={17}/>{tr("Clienti")}</a><a href="#ritmo-mobile"><Layers size={17}/>{tr("Corsi")}</a><span className="ritmo-sidebar-note">{tr("MOVIMENTO")}<br/>{tr("PERSONE")}<br/>{tr("EQUILIBRIO")}</span></nav>
 <div className="ritmo-workspace__body" id="ritmo-bookings">
 <header className="ritmo-workspace-heading"><p>{tr("Studio Pilates")}</p><h2 id="ritmo-bookings-title">{tr("Le prenotazioni, in ordine.")}</h2><p>{tr("Mercoledì 23 · Panoramica studio")}</p></header><div className="ritmo-bookings">
 <label className="ritmo-search"><Search size={18} aria-hidden="true"/><span className="sr-only">{tr("Cerca una prenotazione")}</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={tr("Cerca una prenotazione")} type="search"/></label>
 <div className="ritmo-table" role="group" aria-label={tr("Prenotazioni")}><div className="ritmo-table__head" aria-hidden="true"><span>{tr("Nome")}</span><span>{tr("Lezione")}</span><span>{tr("Orario")}</span><span>{tr("Stato")}</span></div>
 {bookings.map((b,i)=>b.name.toLocaleLowerCase('it').includes(search.toLocaleLowerCase('it'))&&<button className={`ritmo-row ${selected===i?'is-selected':''}`} key={b.name} type="button" onClick={()=>{setSelected(i);setExpanded(false);}} aria-pressed={selected===i} aria-label={tr(`${b.name}, ${b.course}, ${b.time}, ${b.status}`)}><span className="ritmo-person"><span className="ritmo-avatar" aria-hidden="true">{tr(b.initials)}</span>{tr(b.name)}</span><span>{tr(b.course)}</span><span>{tr(b.time)}</span><span className={`ritmo-status ${b.status==='Annullato'?'is-cancelled':''}`}>{tr(b.status)}</span><ChevronRight size={15} aria-hidden="true"/></button>)}
 {!bookings.some(b=>b.name.toLocaleLowerCase('it').includes(search.toLocaleLowerCase('it')))&&<p className="ritmo-empty" role="status">{tr("Nessuna prenotazione trovata.")}</p>}</div></div>
 <aside className="ritmo-profile" aria-label={tr("Dettaglio della prenotazione selezionata")} aria-live="polite"><header><span className="ritmo-avatar">{tr(current.initials)}</span><div><h3>{tr(current.name)}</h3><p>{tr("Dettaglio prenotazione")}</p></div></header><div className="ritmo-profile__course"><div><span>{tr("Lezione")}</span><strong>{tr(current.course)}</strong></div><span className={`ritmo-status ${current.status==='Annullato'?'is-cancelled':''}`}>{tr(current.status)}</span></div><div className="ritmo-profile__fact"><CalendarDays size={23}/><div><strong>{tr("Mercoledì 23")}</strong><span>{tr("Studio 1")}</span></div></div><div className="ritmo-profile__fact"><Clock3 size={23}/><div><strong>{tr(current.time)} – {tr(current.end)}</strong><span>{tr("Durata · 60 minuti")}</span></div></div><button type="button" className="ritmo-dark-button" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>{tr("Gestisci prenotazione ")}<ArrowUpRight size={17}/></button>{expanded&&<p className="ritmo-demo-feedback" role="status">{tr("Prenotazione ")}{tr(current.status.toLowerCase())}{tr(" di ")}{tr(current.name)}. </p>}</aside>
 </div></section>
 <section className="ritmo-mobile" id="ritmo-mobile" aria-labelledby="ritmo-mobile-title"><div className="ritmo-mobile__copy"><p>{tr("Gestione mobile")}</p><h2 id="ritmo-mobile-title">{tr("Il tuo studio.")}<br/>{tr("Sotto controllo.")}</h2><p>{tr("Gestisci lezioni, iscritti e prenotazioni anche dal telefono.")}</p></div><figure className="ritmo-owner-preview"><img src={ownerPhones} width="1536" height="1024" loading="lazy" alt={tr("Pannello del titolare su due telefoni: agenda studio con iscritti, dettaglio di Giulia Rossi e azioni Modifica prenotazione, Segna presenza e Annulla prenotazione.")}/><figcaption>{tr("Agenda, iscritti e gestione delle presenze dal pannello del titolare.")}</figcaption></figure></section>
 
 </div>;
}
