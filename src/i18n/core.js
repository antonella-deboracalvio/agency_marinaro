import {messages} from './messages.js';
export const languages=[
  {code:'it',name:'Italiano'}, {code:'en',name:'English'},
  {code:'de',name:'Deutsch'}, {code:'es',name:'Español'},
];
export const storageKey='marinaro-language';
export const supported=code=>languages.some(item=>item.code===code);
export const normalize=text=>text.replace(/\s+/g,' ').trim();
const entries=new Map(Object.entries(messages).map(([key,value])=>[normalize(key),value]));
const insensitive=new Map([...entries].map(([key,value])=>[key.toLocaleLowerCase('it'),value]));
const templates=[...entries].filter(([key])=>key.includes('{x}')).map(([key,value])=>({
  specificity:key.replaceAll('{x}','').length,
  expression:new RegExp('^'+key.split('{x}').map(part=>part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('(.+?)')+'$'),value,
})).sort((a,b)=>b.specificity-a.specificity);
export function detectLanguage(storage,browserLanguages=[]){
  try{const stored=storage?.getItem(storageKey);if(supported(stored))return stored;}catch{/* Private browsing can disable storage. */}
  for(const language of browserLanguages){const code=language.toLowerCase().split('-')[0];if(supported(code))return code;}
  return 'it';
}
export function translateText(text,language='it',depth=0){
  if(typeof text!=='string'||language==='it'||!supported(language)||depth>4)return text;
  const source=normalize(text);
  if(!source)return text;
  const index={en:0,de:1,es:2}[language];
  let result=entries.get(source)?.[index];
  if(!result){
    const matchCase=insensitive.get(source.toLocaleLowerCase('it'))?.[index];
    if(matchCase)result=source===source.toLocaleUpperCase('it')?matchCase.toLocaleUpperCase(language):matchCase;
  }
  if(!result){
    for(const {expression,value} of templates){
      const match=source.match(expression);
      if(match){let at=1;result=value[index].replace(/\{x\}/g,()=>translateText(match[at++],language,depth+1));break;}
    }
  }
  if(!result&&/ — | · |, /.test(source)){
    const parts=source.split(/( — | · |, )/);
    const translated=parts.map(part=>translateText(part,language,depth+1)).join('');
    if(translated!==source)result=translated;
  }
  if(!result)return text;
  return (text.match(/^\s*/)?.[0]||'')+result+(text.match(/\s*$/)?.[0]||'');
}
