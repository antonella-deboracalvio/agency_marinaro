import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import ring from '../../assets/work/forma-ring.webp';
import reformer from '../../assets/work/forma-reformer.webp';
import './PilatesConcept.css';

export default function PilatesConcept() {
  const [course, setCourse] = useState('Reformer');
  const [date, setDate] = useState('Lun 26');
  const [confirmed, setConfirmed] = useState(false);
  function choose(setter, value) { setter(value); setConfirmed(false); }
  return <div className="pilates-concept" aria-label="Concept del sito Forma Pilates">
    <section className="pilates-method" aria-labelledby="pilates-method-title">
      <div className="pilates-method__copy">
        <p className="pilates-eyebrow">Forma Pilates</p>
        <h2 id="pilates-method-title">Spazio al<br />movimento.</h2>
        <p>Reformer e Matwork, al tuo ritmo.</p>
        <a href="#pilates-prima-lezione">Scopri i percorsi <ArrowUpRight size={20} aria-hidden="true" /></a>
      </div>
      <img src={ring} width="793" height="455" alt="Cerchio Pilates appoggiato a un tappetino rosa polvere, nella luce naturale dello studio." loading="lazy" />
    </section>
    <section id="pilates-prima-lezione" className="pilates-first" aria-labelledby="pilates-first-title">
      <div className="pilates-first__intro">
        <h2 id="pilates-first-title">Il primo passo è il tuo.</h2>
        <p>Trova il tuo ritmo. Inizia da una lezione.</p>
        <img src={reformer} width="910" height="335" alt="Dettaglio di un reformer in legno con imbottitura bordeaux e molle in acciaio." loading="lazy" />
      </div>
      <form className="pilates-booking" onSubmit={e => { e.preventDefault(); setConfirmed(true); }}>
        <h3>La tua prima lezione</h3>
        <p>Uno spazio per conoscerci, ascoltare il tuo corpo e scegliere il percorso più adatto.</p>
        <fieldset><legend>Scegli il tipo di lezione</legend><div className="pilates-options">{['Reformer', 'Matwork'].map(value => <label key={value}><input type="radio" name="pilates-course" value={value} checked={course === value} onChange={() => choose(setCourse, value)} /><span>{value}{course === value && <Check size={16} aria-hidden="true" />}</span></label>)}</div></fieldset>
        <fieldset><legend>Scegli una data</legend><div className="pilates-options">{['Lun 26', 'Mer 28'].map(value => <label key={value}><input type="radio" name="pilates-date" value={value} checked={date === value} onChange={() => choose(setDate, value)} /><span>{value}{date === value && <Check size={16} aria-hidden="true" />}</span></label>)}</div></fieldset>
        <button className="pilates-booking__submit" type="submit">Prenota una prova <ArrowUpRight size={18} aria-hidden="true" /></button>
        
        <p className="pilates-booking__result" role="status">{confirmed ? `Hai scelto ${course} · ${date}. ` : ''}</p>
      </form>
    </section>
  </div>;
}
