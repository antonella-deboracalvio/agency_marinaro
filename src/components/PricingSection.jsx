import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import BeamPanel from './ui/BeamPanel';
import StudioOrb from './ui/StudioOrb';
import StepWordmark from './ui/StepWordmark';
import './PricingSection.css';
import {useTranslation} from "../i18n/context.js";

const paths=[
 {id:'inizia',word:'INIZIA',title:'Hai un’idea da far partire.',text:'Non hai ancora un sito, un logo o una direzione precisa? Mettiamo a fuoco ciò che serve per dare alla tua attività una prima forma.'},
 {id:'rinnova',word:'RINNOVA',title:'Hai già qualcosa. Vuoi di più.',text:'Un sito che non ti rappresenta più, un’immagine poco coerente o materiali da aggiornare. Guardiamo cosa funziona e dove intervenire.'},
 {id:'evolvi',word:'EVOLVI',title:'Il prossimo passo è concreto.',text:'Vuoi vendere online, ricevere prenotazioni o gestire meglio il lavoro? Definiamo le funzioni utili e come inserirle nella tua attività.'},
];
export default function PricingSection(){
  const {t:tr}=useTranslation();
return <section className="next-step" id="soluzioni" aria-labelledby="next-step-title"><span id="prezzi" className="next-step__legacy" aria-hidden="true"/><div className="next-step__wrap"><header className="next-step__heading"><h2 id="next-step-title">{tr("Facciamo il")}<br/>{tr("prossimo passo.")}</h2></header><div className="next-step__grid">{paths.map((p,index)=><BeamPanel seed={index} className="next-step__card" key={p.id} aria-labelledby={`path-${p.id}`}><div className="next-step__content"><StepWordmark text={p.word}/><h3 id={`path-${p.id}`}>{tr(p.title)}</h3><p>{tr(p.text)}</p></div></BeamPanel>)}</div><div className="next-step__closing"><div className="next-step__mascot"><StudioOrb/></div><div><p className="next-step__free">{tr("Il primo passo è gratuito.")}</p><p>{tr("Consulenza iniziale, preventivo e prima bozza.")}<br/>{tr("Valutiamo insieme la proposta, poi decidi come proseguire.")}</p></div><Link to="/contatti">{tr("Parliamo ")}<ArrowUpRight size={18} aria-hidden="true"/></Link></div></div></section>}
