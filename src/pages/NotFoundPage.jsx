import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {BRAND_NAME} from '../lib/brand';
import './NotFoundPage.css';
import {useTranslation} from "../i18n/context.js";


export default function NotFoundPage(){
  const {t:tr}=useTranslation();

  useEffect(()=>{
    const previous=document.title;
    document.title=`Pagina non trovata — ${BRAND_NAME}`;
    return()=>{document.title=previous;};
  },[]);
  return <main className="not-found" aria-labelledby="not-found-title">
    <div className="not-found__inner">
      <p className="not-found__eyebrow">{tr("Una piccola deviazione")}</p>
      <p className="not-found__number" aria-hidden="true">404<span>·</span></p>
      <h1 id="not-found-title">{tr("Questa pagina ha perso la strada.")}</h1>
      <p className="not-found__copy">{tr("Il link potrebbe essere cambiato, oppure la pagina non esiste più.")}<br/>{tr("Da qui puoi tornare a ciò che conta.")}</p>
      <nav className="not-found__links" aria-label={tr("Riprendi la navigazione")}>
        <Link className="not-found__home" to="/"><ArrowLeft size={17} aria-hidden="true"/>{tr("Torna alla home")}</Link>
        <Link to="/progetti">{tr("Esplora i progetti")}<ArrowUpRight size={17} aria-hidden="true"/></Link>
      </nav>
    </div>
  </main>;
}
