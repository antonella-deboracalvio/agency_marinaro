import {languages} from './core';
import {useTranslation} from './context';
import './languages.css';

export function Flag({code}){
  

  return <svg viewBox="0 0 30 20" className="language-flag" aria-hidden="true" focusable="false">
    {code==='it'?<><path fill="#fff" d="M0 0h30v20H0z"/><path fill="#159263" d="M0 0h10v20H0z"/><path fill="#cf3548" d="M20 0h10v20H20z"/></>:
    code==='de'?<><path fill="#202027" d="M0 0h30v7H0z"/><path fill="#ce3547" d="M0 7h30v6H0z"/><path fill="#eac54b" d="M0 13h30v7H0z"/></>:
    code==='es'?<><path fill="#c73445" d="M0 0h30v20H0z"/><path fill="#edc34c" d="M0 5h30v10H0z"/><path fill="#c73445" d="M8 8h3v5H8z"/></>:
    <><path fill="#263968" d="M0 0h30v20H0z"/><path stroke="#fff" strokeWidth="5" d="m0 0 30 20M30 0 0 20"/><path stroke="#c7364b" strokeWidth="2" d="m0 0 30 20M30 0 0 20"/><path stroke="#fff" strokeWidth="7" d="M15 0v20M0 10h30"/><path stroke="#c7364b" strokeWidth="4" d="M15 0v20M0 10h30"/></>}
  </svg>;
}
export default function LanguageSwitcher(){
  const {t:tr}=useTranslation();

  const {language,setLanguage,t}=useTranslation();
  return <div className="language-picker" role="group" aria-label={t('Scegli la lingua')}>
    <p className="language-picker__label">{tr("Lingua")}</p>
    <div className="language-picker__options">
      {languages.map(item=><button key={item.code} type="button" lang={item.code} translate="no"
        aria-pressed={language===item.code} onClick={()=>setLanguage(item.code)}>
        <Flag code={item.code}/><span>{item.name}</span>
      </button>)}
    </div>
    <span className="sr-only" role="status" aria-live="polite">{tr(t('Lingua selezionata: {x}').replace('{x}',languages.find(item=>item.code===language).name))}</span>
  </div>;
}
