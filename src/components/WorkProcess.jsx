import EditorialTitle from "./ui/EditorialTitle";
import { ChapterScrubber } from "./ui/chapter-scrubber";
import "./WorkProcess.css";

const chapters = [
  { id: "ascolto", title: "Ascolto", description: "Partiamo dalla tua idea e da chi vuoi raggiungere." },
  { id: "struttura", title: "Struttura", description: "Mettiamo in ordine pagine e contenuti." },
  { id: "design", title: "Design", description: "Diamo al sito il carattere del tuo brand." },
  { id: "sviluppo", title: "Sviluppo", description: "Sviluppiamo il sito e lo testiamo su ogni schermo." },
  { id: "lancio", title: "Lancio", description: "Andiamo online. Ti mostriamo come gestirlo." },
];

export default function WorkProcess() {
  return (
    <section id="metodo" className="work-process" aria-labelledby="work-process-title">
      <div className="work-process__inner">
        <header className="work-process__header">
          <EditorialTitle id="work-process-title">Metodo</EditorialTitle>
          <p>Dal primo incontro <span>al sito online.</span></p>
        </header>
        <ChapterScrubber chapters={chapters} label="Le cinque fasi del nostro metodo" interval={1500} />
      </div>
    </section>
  );
}
