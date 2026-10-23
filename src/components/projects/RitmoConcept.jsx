import { useState } from 'react';
import { CalendarDays, Clock3, Layers, ArrowUpRight, ChevronRight, Check, Search } from 'lucide-react';
import './RitmoConcept.css';
import ownerPhones from '../../assets/work/ritmo-owner-cutout.webp';

const bookings = [
  {name:'Giulia Rossi',initials:'GR',course:'Reformer',time:'09:00',end:'10:00',status:'Confermato'},
  {name:'Marco Riva',initials:'MR',course:'Matwork',time:'12:30',end:'13:30',status:'Confermato'},
  {name:'Elena Costa',initials:'EC',course:'Reformer',time:'15:00',end:'16:00',status:'Annullato'},
  {name:'Sara Conti',initials:'SC',course:'Matwork',time:'18:00',end:'19:00',status:'Confermato'},
];
export default function RitmoConcept(){
 const [selected,setSelected]=useState(0); const [search,setSearch]=useState(''); const [expanded,setExpanded]=useState(false);

 const current=bookings[selected];
 return <div className="ritmo-concept">
 <section className="ritmo-workspace" aria-labelledby="ritmo-bookings-title">
 <nav className="ritmo-toolbar" aria-label="Esplora il concept RITMO"><span className="ritmo-logo">RITMO<small>STUDIO</small></span><a href="#anteprima"><CalendarDays size={17}/>Agenda</a><a className="is-selected" href="#ritmo-bookings"><CalendarDays size={17}/>Prenotazioni</a><a href="#ritmo-bookings"><Search size={17}/>Clienti</a><a href="#ritmo-mobile"><Layers size={17}/>Corsi</a><span className="ritmo-sidebar-note">MOVIMENTO<br/>PERSONE<br/>EQUILIBRIO</span></nav>
 <div className="ritmo-workspace__body" id="ritmo-bookings">
 <header className="ritmo-workspace-heading"><p>Studio Pilates</p><h2 id="ritmo-bookings-title">Le prenotazioni, in ordine.</h2><p>Mercoledì 23 · Panoramica studio</p></header><div className="ritmo-bookings">
 <label className="ritmo-search"><Search size={18} aria-hidden="true"/><span className="sr-only">Cerca una prenotazione</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cerca una prenotazione" type="search"/></label>
 <div className="ritmo-table" role="group" aria-label="Prenotazioni"><div className="ritmo-table__head" aria-hidden="true"><span>Nome</span><span>Lezione</span><span>Orario</span><span>Stato</span></div>
 {bookings.map((b,i)=>b.name.toLocaleLowerCase('it').includes(search.toLocaleLowerCase('it'))&&<button className={`ritmo-row ${selected===i?'is-selected':''}`} key={b.name} type="button" onClick={()=>{setSelected(i);setExpanded(false);}} aria-pressed={selected===i} aria-label={`${b.name}, ${b.course}, ${b.time}, ${b.status}`}><span className="ritmo-person"><span className="ritmo-avatar" aria-hidden="true">{b.initials}</span>{b.name}</span><span>{b.course}</span><span>{b.time}</span><span className={`ritmo-status ${b.status==='Annullato'?'is-cancelled':''}`}>{b.status}</span><ChevronRight size={15} aria-hidden="true"/></button>)}
 {!bookings.some(b=>b.name.toLocaleLowerCase('it').includes(search.toLocaleLowerCase('it')))&&<p className="ritmo-empty" role="status">Nessuna prenotazione trovata.</p>}</div></div>
 <aside className="ritmo-profile" aria-label="Dettaglio della prenotazione selezionata" aria-live="polite"><header><span className="ritmo-avatar">{current.initials}</span><div><h3>{current.name}</h3><p>Dettaglio prenotazione</p></div></header><div className="ritmo-profile__course"><div><span>Lezione</span><strong>{current.course}</strong></div><span className={`ritmo-status ${current.status==='Annullato'?'is-cancelled':''}`}>{current.status}</span></div><div className="ritmo-profile__fact"><CalendarDays size={23}/><div><strong>Mercoledì 23</strong><span>Studio 1</span></div></div><div className="ritmo-profile__fact"><Clock3 size={23}/><div><strong>{current.time} – {current.end}</strong><span>Durata · 60 minuti</span></div></div><button type="button" className="ritmo-dark-button" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>Gestisci prenotazione <ArrowUpRight size={17}/></button>{expanded&&<p className="ritmo-demo-feedback" role="status">Prenotazione {current.status.toLowerCase()} di {current.name}. </p>}</aside>
 </div></section>
 <section className="ritmo-mobile" id="ritmo-mobile" aria-labelledby="ritmo-mobile-title"><div className="ritmo-mobile__copy"><p>Gestione mobile</p><h2 id="ritmo-mobile-title">Il tuo studio.<br/>Sotto controllo.</h2><p>Gestisci lezioni, iscritti e prenotazioni anche dal telefono.</p></div><figure className="ritmo-owner-preview"><img src={ownerPhones} width="1536" height="1024" loading="lazy" alt="Pannello del titolare su due telefoni: agenda studio con iscritti, dettaglio di Giulia Rossi e azioni Modifica prenotazione, Segna presenza e Annulla prenotazione."/><figcaption>Agenda, iscritti e gestione delle presenze dal pannello del titolare.</figcaption></figure></section>
 
 </div>;
}
