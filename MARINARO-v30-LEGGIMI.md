# Marinaro Digital Studio — v30

Progetto aggiornato dalla v29: revisione responsive condivisa dalle quattro pagine servizi e dalle 14 sezioni. Conservate tutte le 56 immagini. Nessuna dipendenza aggiunta o installata.

## Vetro dei prezzi

- Superficie satinata chiara, trasparenza morbida e pacchetti sfocati dietro.
- Testo grafite, titolo più contenuto e pulsante scuro. Ridotta anche l'altezza dell'apertura.
- Conservati il messaggio sulla bozza e sul preventivo gratuiti, l'apertura animata e tutti i pacchetti della versione precedente.
- Il vetro rispetta la preferenza di movimento ridotto e mantiene il colore di riserva sui browser senza backdrop-filter.

## Service: quattro aree

La home mantiene il linguaggio del menu ramificato, con quattro gruppi. Su desktop sono disposti in due colonne accanto al titolo; su mobile in una colonna. Ogni gruppo si può richiudere.

| Area | Voci in home | Pagina |
| --- | --- | --- |
| Digital | Siti web su misura; Prenotazioni & gestionali; Menu QR | `/servizi/digital` |
| Identity | Logo & visual identity; Packaging; Brand materials | `/servizi/identity` |
| Content | Content shoot; Social content; Talent content | `/servizi/content` |
| Campaigns | Event visuals; Promotional design; Digital invitations | `/servizi/campaigns` |

Il nome dell'area apre la pagina dall'inizio. Le singole voci portano al relativo contenuto. Nella pagina Digital, Prenotazioni e Gestionali sono spiegati in due blocchi distinti; in Identity sono distinti Logo e Visual identity.

## Le quattro pagine

Ogni pagina usa la stessa struttura:

- apertura con nome dell'area, titolo e spiegazione breve;
- carosello con immagini originali e apertura ingrandita;
- collegamenti rapidi ai servizi;
- sezioni con testo semplice, elenco concreto e coppia di immagini;
- contenuti finali su cosa viene consegnato;
- invito a Parliamone e collegamenti alle altre aree.

La pagina Content contiene anche Social Starter (6 post e 3 stories), Social Kit (9 post, 6 stories e copertine highlights) e Social Refresh. Non sono stati inventati prezzi per questi pacchetti.

Il testo distingue chiaramente i materiali dalla loro produzione: i file di packaging vengono preparati sulle specifiche del fornitore; la stampa fisica è esterna. Per Content lo studio realizza i materiali, mentre il cliente pubblica. Talent content non viene presentato come influencer marketing.

La tipografia dei titoli usa **Impact**, con gli stessi caratteri di riserva della home. Sfondo scuro, spazi leggibili, superfici avorio e colori neutri mantengono la continuità con il sito.

### Caroselli e movimento

Scorrimento orizzontale nativo, gesto su mobile, pulsanti precedente/successivo e frecce della tastiera quando il carosello ha il focus. I pulsanti si disattivano ai due estremi. Nessun nuovo autoplay, Canvas o libreria per queste pagine. I cicli preesistenti di BRANDS e Metodo restano a 1,5 secondi.

## Revisione responsive v30

- Rimossi il collegamento introduttivo “Parliamo del progetto” e i due testi sopra il carosello.
- Terminologia aggiornata: sito responsive per desktop e mobile; didascalie Desktop e Mobile.
- Capitoli distinti da una lieve alternanza di fondo, etichette discrete e spaziature regolari.
- Su mobile, immagini grandi in una galleria orizzontale con anteprima della successiva e due indicatori cliccabili; scorrimento anche con le frecce della tastiera.
- Cambio stile riporta la galleria alla prima immagine. Nessun autoplay.
- Su desktop, coppie di immagini più equilibrate; su tablet, disposizione verticale per salvaguardare la leggibilità.
- Carosello introduttivo più vicino ai testi, comandi sotto le immagini.
- Nessuna dipendenza installata. Build e verifica visiva nel browser non eseguite nell’ambiente disponibile.

## Immagini originali — v30

56 immagini coprono entrambe le direzioni visive: 48 posizioni nei caroselli e 56 nelle sezioni (due coppie per ogni servizio). I progetti sono concept illustrativi con brand inventati, non lavori commissionati da clienti reali.

La nuova direzione è visibile per prima. Ogni sezione offre due pulsanti: **Pop & grafico** ed **Essenziale & materico**. Le coppie cambiano su richiesta, senza autoplay. I caroselli alternano esempi nuovi e precedenti. Le immagini della prima raccolta sono conservate.

Nuova raccolta:
- MOSSA: studio di movimento, rosa acceso, nero e bianco, lettering morbido e fotografia editoriale.
- FARINA: Bakery & Coffee, bordeaux e bianco caldo. Immagini selezionate, menu digitale e anteprima del sito aggiornati; dettagli in `AGGIORNAMENTO-FARINA.md`.
- FUORI: festival, giallo limone e nero, tipografia e geometrie nette.
- GIULIA / 30: invito di compleanno, rosa e nero, grande numero e composizione giocosa.

Raccolta precedente:
- RIVA: caffetteria, bordeaux e avorio, carta e fotografia di prodotto.
- FORMA: studio di movimento, blu cobalto e basi neutre, siti e interfacce.
- TRAMA: evento culturale, giallo e nero, poster e materiali promozionali.
- Lia & Elia: invito editoriale in rosso e avorio.

Le immagini sono generate con imagegen; prompt e metodo sono in `docs/art-direction-prompts.json` e `docs/contemporary-art-direction-prompts.json`. Le interfacce e i QR sono illustrativi e non funzionali.

I file WebP in `public/images/services/` hanno tre larghezze: 640, 960 e 1254 px. Il browser seleziona la variante adatta tramite srcSet. Le immagini si caricano in modo differito e si possono ingrandire; il visualizzatore si chiude anche con Escape.

Per sostituire un'immagine aggiornate `src/data/service-artwork.js` (prima raccolta) o `src/data/contemporary-artwork.js` (nuova raccolta): percorso, varianti, testo alternativo, brand e inquadratura. I testi delle pagine restano in `src/data/service-pages.js`.

## Parliamone aggiornato

- Servizi organizzati nelle stesse quattro aree, con un gruppo aperto per volta.
- Le scelte effettuate rimangono selezionate anche cambiando gruppo o tornando indietro tra i passaggi.
- I pulsanti dei singoli servizi preselezionano la voce corretta. I pulsanti generali di un'area aprono quel gruppo senza scegliere servizi al posto del visitatore.
- I nuovi servizi sono riconosciuti sia dal modulo sia dalla validazione sul server e compaiono nel riepilogo email.
- Conservati i vecchi codici per i collegamenti già esistenti, compreso E-commerce.
- I quattro nuovi percorsi sono aggiunti alle regole Vercel per consentire anche l'accesso diretto e il ricaricamento della pagina. La regola SPA Netlify già presente li copre.

## Verifiche v30

- 30 test esistenti superati; controllo sintattico dei moduli dati aggiornati.
- Controllati i 104 riferimenti alle immagini e le 168 varianti WebP.
- ZIP verificato con CRC, estrazione e confronto dei file archiviati con i sorgenti; verifica della copia salvata.
- Nessuna dipendenza aggiunta o installata.
- Build Vite e controllo visivo nel browser non eseguiti: dipendenze e browser locale non disponibili. I test automatici non sostituiscono il collaudo visivo su desktop e telefono.

## Percorso di contatto

1. **Servizi:** scelta multipla; almeno un’opzione.
2. **Progetto:** breve descrizione e tempistica, inclusa l’opzione Da definire insieme.
3. **Contatti:** nome ed email richiesti; azienda e telefono facoltativi. Riepilogo delle scelte prima dell’invio.

I pulsanti Indietro e Modifica conservano i dati. Gli errori non cancellano le risposte. La conferma compare soltanto dopo l’accettazione del messaggio da parte del servizio email; non certifica la consegna nella posta in entrata. È disponibile anche il normale collegamento email. Le risposte del modulo non vengono salvate nel browser.

## Recapiti da configurare

Il cambio del nome non crea automaticamente una nuova casella o un dominio. I pulsanti email continuano a usare la casella presente nel progetto, `hello@brodaxy.it`, senza mostrarla come nome del marchio. Quando avete il nuovo indirizzo, aggiornate `studio.email` in `src/data/studio.js` e `MAIL_TO` nella configurazione server.

Il numero WhatsApp precedente era un segnaposto composto da zeri. Il pulsante compare solo dopo aver impostato `studio.whatsappNumber` con il vostro numero internazionale reale, senza spazi o simboli. Il pulsante email è già presente.

Il nome visualizzato è centralizzato in `src/lib/brand.js`; titolo e descrizione iniziali sono anche in `index.html`. Il prefisso tecnico delle chiavi di idempotenza dell’invio è mantenuto stabile, così eventuali tentativi ripetuti non diventano nuovi invii dopo il rebrand.

## Attivare l’invio alla vostra casella

Il codice dell’invio diretto è implementato sia per le richieste di progetto sia per le candidature. **L’invio reale non è ancora attivo: occorre configurare il servizio email con le vostre credenziali e un mittente verificato.** Nessuna chiave o account email era presente nel progetto. Senza configurazione, il modulo segnala che l’invio non è disponibile e conserva le risposte nella pagina; non mostra una conferma fittizia.

La soluzione usa l’API di **Resend**, chiamata dal server con `fetch` nativo. Non è necessario installare il pacchetto Resend. Il sito può ricevere le candidature in una casella esistente; il destinatario è deciso dal server.

### Configurazione locale

1. Nel vostro account Resend verificate il dominio da cui volete inviare e create una chiave per l’invio.
2. Copiate `.env.example` in `.env.local` nella cartella del progetto.
3. Compilate le variabili:

| Variabile | Valore da inserire |
| --- | --- |
| `RESEND_API_KEY` | La vostra chiave privata Resend |
| `MAIL_FROM` | Un mittente del dominio verificato, per esempio `Marinaro Digital Studio <candidature@tuo-dominio.it>` usando il vostro dominio verificato |
| `MAIL_TO` | La casella che consultate realmente; l’esempio contiene l’indirizzo già usato dal sito, `hello@brodaxy.it` |
| `SITE_URL` | Vuota in locale; in produzione l’origine esatta, per esempio `https://vostro-dominio.it` |

4. Riavviate `npm run dev`. Vite include gli endpoint locali `/api/contact` e `/api/careers`.
5. Quando la configurazione è completa, inviate una candidatura di prova e verificate che arrivi alla casella scelta. Questo controllo con le vostre credenziali non è stato eseguito qui.

La chiave rimane sul server. Non inseritela in `src`, non anteponete `VITE_` e non caricate `.env.local` su Git. Il file `.gitignore` esclude i file `.env` privati. Non serve incollare la chiave in una chat.

L’indirizzo usato dai pulsanti email si modifica in `src/data/studio.js`. Se cambiate casella, aggiornate anche `MAIL_TO` nella configurazione server.

### Pubblicazione

- **Vercel:** il progetto include `api/contact.js`, `api/careers.js` e `vercel.json`. Impostate le quattro variabili nelle impostazioni del progetto e distribuite i sorgenti con le funzioni, oltre alla build Vite.
- **Netlify:** sono incluse le funzioni `contact.mjs` e `careers.mjs` in `netlify/functions`, `netlify.toml` e le regole `/api/contact` e `/api/careers` in `public/_redirects`. Impostate le variabili con ambito Functions e pubblicate il progetto con il supporto alle funzioni.
- **Hosting solo statico o PHP:** caricare soltanto `dist` non avvia il codice server Node. Serve ospitare l’endpoint su un ambiente compatibile o adattarlo al backend del vostro hosting.

Le configurazioni di distribuzione sono incluse, ma non sono state pubblicate o collaudate su un account Vercel/Netlify in questa sessione. Per il runtime usate una versione Node compatibile con Vite 7, per esempio Node 22 aggiornato.

## Come funziona il modulo candidature

Tre passaggi: ambito e collaborazione; esperienza, disponibilità e portfolio; nome ed email con riepilogo. Il portfolio è facoltativo e può essere un link a GitHub, LinkedIn o un CV online.

Il server valida di nuovo i campi, controlla l’origine della richiesta, limita la dimensione del corpo, usa un campo anti-bot e un limite di tentativi per istanza. Destinatario, mittente e oggetto non vengono accettati dal browser. L’indirizzo del candidato è usato come Reply-To, così potete rispondere alla candidatura.

I tentativi ripetuti della stessa candidatura mantengono una chiave di idempotenza. Gli errori non cancellano le risposte. La conferma viene mostrata solo se il servizio email accetta il messaggio e restituisce un identificativo; non certifica l’arrivo nella casella o nella posta in entrata. Non vengono registrati i contenuti delle candidature nei log del codice.

Il limite locale è per istanza: per volumi elevati o più istanze, configurate anche i limiti di traffico della piattaforma. Il modulo supporta link a CV, non allegati.

## Personalizzare Team e About

- Nomi, ruoli, ritratti e numeri: `src/data/studio.js`.
- I due ritratti restano **dimostrativi**; inserite le vostre foto e poi impostate `illustrative: false`.
- Cartellone originale Marinaro: `src/assets/team/marinaro-street-campaign.webp`, con variante mobile. Prompt e dettagli in `docs/marinaro-street-campaign.md`. Potete cambiarne l’import in `src/components/team/StudioProjectCard.jsx`.
- I prompt dei ritratti della v9 sono conservati in `docs/team-portraits-prompts.json`.

## File principali

| File | Funzione |
| --- | --- |
| `src/lib/brand.js` | Nome del marchio |
| `src/data/studio.js` | Recapiti, persone e dati |
| `src/components/layout/BrandMark.jsx` e CSS | Marchio tipografico |
| `src/components/layout/Footer.jsx` e CSS | Footer desktop e mobile |
| `src/components/ui/TechText.jsx` e CSS | Contorni delle lettere, selezione tecnica e ciclo automatico su tutti i dispositivi |
| `src/components/layout/Navbar.jsx` e CSS | Navbar da 84 px su mobile, 96 px su desktop |
| `src/components/ui/liquid-morph-floating-menu.jsx` e CSS | Menu essenziale condiviso da mobile e desktop |
| `src/components/PricingSection.jsx` e CSS | Vetro satinato chiaro, apertura animata e pacchetti |
| `src/components/WorkProcess.jsx` e CSS | Testi brevi del Metodo e layout desktop/mobile |
| `src/components/ui/chapter-scrubber.jsx` e CSS | Tacche elastiche, anteprima delle fasi e riproduzione automatica |
| `src/components/BrandIdentity.jsx` e CSS | Titolo BRANDS e sette mockup scontornati |
| `src/components/StoryScroll.jsx` e CSS | DIFFERENT / BY DESIGN. e WE THINK. WE CREATE. |
| `src/components/ContactSection.jsx` e CSS | Creiamo qualcosa / che resti. e collegamento a /contatti |
| `src/pages/ContactPage.jsx` e CSS | Pagina Parliamone a tre step |
| `src/components/ui/AuroraBackdrop.jsx` e CSS | Sfondo adattivo Canvas, condiviso dai form |
| `src/lib/draw-veil-aurora.js` | Pieghe e riflessi aurora originali dello sfondo mobile |
| `src/styles/FrostedForms.css` | Vetro, campi e passaggi dei form |
| `src/lib/chapter-autoplay.js` | Avvio alla visibilità e cadenza di 1,5 secondi |
| `src/lib/contact.js` | Tempistiche, validazione e testo della richiesta |
| `src/data/service-catalog.js` | Quattro aree, voci della home, percorsi e opzioni del modulo |
| `src/data/service-pages.js` | Testi e associazioni delle immagini delle quattro pagine |
| `src/pages/ServiceAreaPage.jsx` e CSS | Struttura condivisa delle quattro pagine servizi |
| `src/components/services/ServiceGallery.jsx` | Carosello nativo con pulsanti e controllo da tastiera |
| `src/components/services/ServiceVisual.jsx` | Immagine responsive con didascalia e visualizzatore ingrandito |
| `src/components/EditorialServicesShowcase.jsx` e CSS | Service della home con quattro gruppi ramificati |
| `server/contact-handler.js` | Endpoint per le richieste di progetto |
| `src/components/team/TeamPreview.jsx` e CSS | Card Team nella home |
| `src/pages/TeamPage.jsx` e CSS | Pagina Team e About |
| `src/pages/ProjectsPage.jsx` e CSS | Pagina Works, card uniformi e chiusura con CTA |
| `src/components/team/StudioProjectCard.jsx` e CSS | Cartellone originale Marinaro, con collegamento a Parliamone |
| `src/components/team/StudioOverview.jsx` e CSS | Composizione Team in grafite e avorio, statistiche e invito a contattarci |
| `src/components/team/StudioNotifications.jsx` | Percorso animato Idea, Design, Codice, Online |
| `src/lib/brand-autoplay.js` | Scorrimento automatico mobile dei mockup ogni 1,5 secondi |
| `src/components/team/CareersForm.jsx` e CSS | Candidature, tre passaggi |
| `src/lib/careers.js` | Domande, validazione e testo email |
| `server/careers-handler.js` | Endpoint di invio |


## Uso del progetto aggiornato

Lo ZIP contiene la cartella `Marinaro-Digital-Studio` completa di codice, immagini, test e configurazione. Non contiene `node_modules`, build o credenziali private. Per evitare stili obsoleti, usate la nuova cartella dei sorgenti, conservando la vostra configurazione email locale.

Nell'ambiente in cui avete già le dipendenze, avviate `npm run dev`. Per la build usate `npm run build`.

I test si eseguono con `node --test tests/*.test.mjs`.
