import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {servicePages} from '../src/data/service-pages.js';
import {farinaArtwork} from '../src/data/farina-artwork.js';
import {translateText} from '../src/i18n/core.js';

const root=new URL('../public/',import.meta.url);
const groups=Object.values(servicePages).flatMap(page=>[
  ...page.sections.flatMap(section=>[section.visuals,section.contemporaryVisuals]),
]);

test('every service image and responsive variant resolves without empty slides or duplicates',()=>{
  for(const group of groups){
    assert(group.length>0,'Every displayed collection needs a valid image');
    assert.equal(new Set(group.map(image=>image.src)).size,group.length,'Duplicate slides');
    for(const image of group){
      assert(image.src&&image.label&&image.alt&&image.brand);
      assert(existsSync(new URL(image.src.slice(1),root)),image.src);
      for(const variant of (image.srcSet ? image.srcSet.split(',') : [])){
        const [src,width]=variant.trim().split(/\s+/);
        assert(/^\d+w$/.test(width));
        assert(existsSync(new URL(src.slice(1),root)),src);
      }
    }
  }
});

test('all selected FARINA images are reachable; rejected alternatives are absent',()=>{
  const all=groups.flat(),sources=new Set(all.map(image=>image.src));
  assert.equal(Object.keys(farinaArtwork).length,11);
  for(const image of Object.values(farinaArtwork)){
    assert(sources.has(image.src),image.id);
    assert.equal(image.fit,'contain');
    for(const language of ['en','de','es'])assert.notEqual(translateText(image.alt,language),image.alt,image.id+' '+language);
  }
  assert.equal(servicePages.digital.sections.find(section=>section.id==='menu-qr').contemporaryVisuals.length,1);
  assert.equal(servicePages.content.sections.find(section=>section.id==='content-shoot').contemporaryVisuals.length,1);
  assert.equal(servicePages.campaigns.sections.find(section=>section.id==='promotional-design').contemporaryVisuals.length,1);
  const retiredBrand=['PI','EGA'].join('');
  for(const image of all)assert(!JSON.stringify(image).includes(retiredBrand));
  for(const id of ['d-menu','c-product','a-promo'])assert(!sources.has('/images/services/pop-'+id+'.webp'));
});

test('the delivered variants come from the selected final source versions',()=>{
  const selection=JSON.parse(readFileSync(new URL('../docs/farina-selection.json',import.meta.url),'utf8'));
  assert.deepEqual(selection.excluded_numbers,['07','09','10']);
  assert.equal(selection.assets.length,11);
  for(const asset of selection.assets)for(const variant of asset.variants){
    const data=readFileSync(new URL(variant.src.slice(1),root));
    assert.equal(data.length,variant.bytes,variant.src);
    assert.equal(createHash('sha256').update(data).digest('hex'),variant.sha256,variant.src);
  }
  const website=farinaArtwork.website;
  assert.equal(website.width,website.height,'Website must fill a square card without letterboxing');
  assert(website.srcSet.endsWith(website.width+'w')); 
  const selected=new Map(selection.assets.map(asset=>[asset.id,asset]));
  assert.equal(selected.get('website').source_library_file_id,'libfile_fcd67ce9be2c819186fb0a6c70a2d810');
  assert(selected.get('bread').source.endsWith('exec-edbafcac-2897-4d01-96c2-c76e581e5889.png'));
  assert(selected.get('qr-menu').source.endsWith('exec-1a80d175-455f-4cd9-935d-cbbabc44f364.png'));
});
