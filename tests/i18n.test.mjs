import test from 'node:test';
import assert from 'node:assert/strict';
import {detectLanguage,translateText as t} from '../src/i18n/core.js';
import {messages} from '../src/i18n/messages.js';

test('saved language wins; regional browser preferences resolve in order',()=>{
  assert.equal(detectLanguage({getItem:()=> 'en'},['it-IT']),'en');
  assert.equal(detectLanguage({getItem:()=>null},['fr-FR','de-CH','en-US']),'de');
  assert.equal(detectLanguage({getItem:()=>null},['es-MX']),'es');
  assert.equal(detectLanguage({getItem:()=>null},['fr-FR']),'it');
});
test('invalid or blocked storage does not prevent detection',()=>{
  assert.equal(detectLanguage({getItem:()=> 'invalid'},['de-DE']),'de');
  assert.equal(detectLanguage({getItem:()=>{throw Error('disabled');}},['es']),'es');
});
test('every message has all translations and preserves interpolation slots',()=>{
  for(const [source,targets] of Object.entries(messages)){
    assert.equal(targets.length,3,source);
    assert.equal(t(source,'it'),source);
    ['en','de','es'].forEach((language,i)=>assert.equal(t(source,language),targets[i],source));
    for(const target of targets){
      assert(target.trim(),source);
      assert.equal((source.match(/\{x\}/g)||[]).length,(target.match(/\{x\}/g)||[]).length,source);
    }
  }
});
test('specific templates take priority over generic open-action labels',()=>{
  assert.equal(t('Apri il progetto Malga Cavedine in una nuova scheda','de'),'Projekt Malga Cavedine in einem neuen Tab öffnen');
  assert.equal(t('Variante 2 di T-shirt Washed','es'),'Variante 2 de Camiseta Washed');
});
test('dynamic booking dates, stock feedback and page titles translate',()=>{
  assert.equal(t('Hai scelto Reformer · Mer 28. ','de'),'Du hast Reformer · Mi 28 gewählt. ');
  assert.equal(t('2 articoli nella lista di riordino.','en'),'2 items on the reorder list.');
  assert.equal(t('SCORTA — Progetti — Marinaro Digital Studio','es'),'SCORTA — Proyectos — Marinaro Digital Studio');
});
test('whitespace and non-text values are preserved',()=>{
  assert.equal(t('  Il primo passo è gratuito.\n','en'),'  The first step is free.\n');
  assert.equal(t(null,'en'),null);
  assert.equal(t(1248,'en'),1248);
  assert.equal(t('Nome','invalid'),'Nome');
});
test('brand names, personal names and technical values stay unchanged',()=>{
  for(const source of ['SCORTA','FUORI STANDARD','SFOGLIA','Marinaro Digital Studio','Giulia Rossi','/progetti/scorta','booking','#f5f3ef']){
    for(const language of ['en','de','es'])assert.equal(t(source,language),source);
  }
});
