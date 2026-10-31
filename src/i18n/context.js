import {createContext,createElement,useCallback,useContext,useEffect,useLayoutEffect,useMemo,useState} from 'react';
import {detectLanguage,storageKey,supported,translateText} from './core';
const LanguageContext=createContext({language:'it',setLanguage:()=>{},t:text=>text});
export const useTranslation=()=>useContext(LanguageContext);

function initialLanguage(){
  if(typeof window==='undefined')return 'it';
  let storage;try{storage=window.localStorage;}catch{}
  return detectLanguage(storage,navigator.languages||[navigator.language||'it']);
}
function LocalizedHead({language}){
  useLayoutEffect(()=>{
    document.documentElement.lang=language;
    const description=document.querySelector('meta[name="description"]');
    let titleSource=document.title,titleRendered='',descriptionSource=description?.content,descriptionRendered='';
    const update=()=>{
      if(document.title!==titleRendered)titleSource=document.title;
      const next=translateText(titleSource,language);
      titleRendered=next;
      if(document.title!==next)document.title=next;
      if(description){
        if(description.content!==descriptionRendered)descriptionSource=description.content;
        descriptionRendered=translateText(descriptionSource,language);
        if(description.content!==descriptionRendered)description.content=descriptionRendered;
      }
    };
    // Keep original head values across language changes and route-level title effects.
    const originalTitle=document.head.dataset.i18nTitle;
    if(originalTitle&&document.title===document.head.dataset.i18nRendered)titleSource=originalTitle;
    if(description?.dataset.i18nSource&&description.content===description.dataset.i18nRendered)descriptionSource=description.dataset.i18nSource;
    titleRendered=document.title;
    descriptionRendered=description?.content;
    const sync=()=>{
      update();
      document.head.dataset.i18nTitle=titleSource;
      document.head.dataset.i18nRendered=titleRendered;
      if(description){description.dataset.i18nSource=descriptionSource;description.dataset.i18nRendered=descriptionRendered;}
    };
    const observer=new MutationObserver(sync);
    sync();observer.observe(document.head,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['content']});
    return()=>observer.disconnect();
  },[language]);
  return null;
}
export function LanguageProvider({children}){
  const [language,setLanguageState]=useState(initialLanguage);
  const setLanguage=useCallback(code=>{
    if(!supported(code))return;
    setLanguageState(code);
    try{localStorage.setItem(storageKey,code);}catch{}
  },[]);
  useEffect(()=>{
    const sync=e=>{if(e.key===storageKey&&supported(e.newValue))setLanguageState(e.newValue);};
    window.addEventListener('storage',sync);
    return()=>window.removeEventListener('storage',sync);
  },[]);
  const value=useMemo(()=>({language,setLanguage,t:text=>translateText(text,language)}),[language,setLanguage]);
  return createElement(LanguageContext.Provider,{value},createElement(LocalizedHead,{language}),children);
}
