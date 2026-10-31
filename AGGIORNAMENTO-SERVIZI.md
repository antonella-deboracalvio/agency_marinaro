# Aggiornamento pagine servizi

- Rimossi i caroselli iniziali da Digital, Identity, Content e Campaigns, inclusi componente e dati inutilizzati. L’introduzione porta all’indice e alle sezioni.
- Anteprima FARINA adattata al quadrato: occupa il contenitore, senza fasce vuote, deformazioni o titoli tagliati. Hero, categorie e tre prodotti conservano la direzione approvata.
- Le immagini singole sono centrate nella propria colonna su desktop (massimo 420 px); su mobile usano tutta la larghezza. La griglia singola non mantiene una seconda colonna vuota. I due stili restano selezionabili.
- Inviti digitali: nuovo titolo “Il tuo evento comincia con un link.”, testo dedicato alla condivisione e alla pagina dell’evento, funzionalità di mappa e conferma da concordare. Rimossi gli esempi cartacei autonomi; entrambi gli stili mostrano l’invito su smartphone.
- Nuovi testi tradotti in inglese, tedesco e spagnolo. Collegamenti al modulo contatti conservati.

## Apertura

Estrarre l’intero archivio in una nuova cartella oppure sostituire tutti i file del progetto, comprese `src` e `public`. Arrestare e riavviare `npm run dev` se il server era già avviato. Nessuna dipendenza aggiunta o installata per questa revisione.

## Ultima anteprima FARINA

Sostituita l’anteprima del sito con l’ultima immagine generata e scelta nella conversazione: “FARINA: vetrina digitale di prodotti autentici.png”. La stessa immagine compare nella card e nell’ingrandimento. Sono incluse tre varianti WebP da 640, 960 e 1254 px; proporzioni quadrate conservate senza deformazioni. Provenienza e checksum sono in `docs/farina-selection.json`.

Rimossa la precedente anteprima HTML con fotografie separate, sostituita dall’immagine richiesta. Tutte le altre immagini FARINA restano invariate.

## Verifiche della revisione

46 test Node superati, compresi tempi del loader e integrità delle immagini. Compilazione sintattica di 90 moduli e 40 rendering statici di pagine/componenti in italiano, inglese, tedesco e spagnolo. Verificati numero WhatsApp, messaggio tradotto e collegamenti di contatto. Controllo browser dell’anteprima quadrata su desktop e mobile.

La build Vite completa non è stata eseguita: le dipendenze del progetto non sono disponibili nell’ambiente. I rendering statici non sostituiscono l’esecuzione dell’applicazione React. Nessuna dipendenza aggiunta o installata.
