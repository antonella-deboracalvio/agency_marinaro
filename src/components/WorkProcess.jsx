import EditorialTitle from "./ui/EditorialTitle";
import { ChapterScrubber } from "./ui/chapter-scrubber";
import "./WorkProcess.css";
import {useTranslation} from "../i18n/context.js";


const chapters = [
  { id: "ascolto", title: "Ascolto", description: "Partiamo dalla tua idea e da chi vuoi raggiungere." },
  { id: "struttura", title: "Struttura", description: "Mettiamo in ordine pagine e contenuti." },
  { id: "design", title: "Design", description: "Diamo al sito il carattere del tuo brand." },
  { id: "sviluppo", title: "Sviluppo", description: "Costruiamo il sito perché funzioni bene su desktop e mobile." },
  { id: "sicurezza", title: "Test e sicurezza", description: "Verifichiamo moduli, accessi e gestione dei dati prima della messa online." },
  { id: "lancio", title: "Lancio", description: "Andiamo online. Ti mostriamo come gestirlo." },
];

export default function WorkProcess() {
  const {t:tr}=useTranslation();

  return (
    <section id="metodo" className="work-process" aria-labelledby="work-process-title">
      <div className="work-process__inner">
        <header className="work-process__header">
          <EditorialTitle id="work-process-title">{tr("Metodo")}</EditorialTitle>
          <p>{tr("Dal primo incontro ")}<span>{tr("al sito online.")}</span></p>
        </header>
        <ChapterScrubber chapters={chapters} label="Le sei fasi del nostro metodo" interval={1500} />
      </div>
    </section>
  );
}
