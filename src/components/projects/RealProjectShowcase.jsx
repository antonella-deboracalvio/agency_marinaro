import malgaTerritorio from '../../assets/work/malga-territorio.webp';
import malgaCucina from '../../assets/work/malga-cucina.webp';
import infinityAppartamenti from '../../assets/work/infinity-appartamenti.webp';
import infinityPrenotazioni from '../../assets/work/infinity-prenotazioni.webp';
import {useTranslation} from "../../i18n/context.js";


export const realProjectSections = {
 'malga-cavedine': [
  {src:malgaTerritorio, width:1310, height:474, alt:'Malga Cavedine: sezione originale Tra boschi e sentieri con la mappa del territorio.'},
  {src:malgaCucina, width:1310, height:729, alt:'Malga Cavedine: sezione originale Il gusto della montagna con fotografia della terrazza.'},
 ],
 'infinity-home': [
  {src:infinityAppartamenti, width:1080, height:748, alt:'Infinity Home: sezione originale Appartamenti con Family Apartment e Single Apartment.'},
  {src:infinityPrenotazioni, width:1080, height:563, alt:'Infinity Home: sezione originale dedicata alle piattaforme di prenotazione.'},
 ],
};
export default function RealProjectShowcase({id,onExpand}) {
  const {t:tr}=useTranslation();

 return <div className="real-project-sections">{realProjectSections[id].map((section,i)=><button className="real-project-capture" key={section.src} onClick={()=>onExpand(section.src)} aria-label={tr(`Ingrandisci la sezione ${i+1}`)}><img src={section.src} width={section.width} height={section.height} alt={tr(section.alt)} loading="lazy" decoding="async"/></button>)}</div>;
}
