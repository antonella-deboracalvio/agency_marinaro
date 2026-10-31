# Marinaro Digital Studio - sicurezza e conformita
Controllo del 29 ottobre 2026.


## Esito del controllo

Il progetto è stato rafforzato, ma non è ancora pronto per essere dichiarato conforme e pubblicato come sito professionale completo. Restano da confermare identità del titolare, dati fiscali, hosting, informativa e diritti sui materiali.

| Verifica | Risultato |
| --- | --- |
| Dipendenze prima / dopo | 9 pacchetti segnalati / 0 segnalazioni note |
| Test automatici | 52 superati, 0 falliti |
| Build di produzione | Completata con Vite 7.3.7 |
| Credenziali nel progetto | Nessuna corrispondenza nei controlli mirati |
| Moduli pubblici | Inattivi fino a informativa e configurazione |
| Valutazione legale/fiscale | Da completare con dati reali e professionista |


### Ambito e limiti

Revisione del codice e del lockfile della versione 97 di Marinaro-v31.zip, test degli endpoint con provider simulato e verifica del sito compilato. Non sono stati consultati hosting, DNS, account email, contratti, log del sito pubblico o database. Nessun test di intrusione è stato effettuato su servizi esterni.

Il risultato non è una certificazione, un penetration test completo o un parere professionale sottoscritto. Il commercialista deve verificare inquadramento fiscale e attività; un consulente legale/privacy deve validare informative e casi dubbi. Il rapporto distingue interventi eseguiti da adempimenti ancora aperti.


### Modifiche visive richieste

Mascotte lilla più luminosa, ombreggiatura WebGL molto ridotta e fallback senza ombra interna. Pulsante hero "Parliamo del progetto" schiarito a #dbc0f5 con testo scuro. Le altre scelte grafiche e il numero WhatsApp restano invariati.


## Sicurezza: correzioni eseguite


### Dipendenze e codice

Aggiornato il lockfile con correzioni compatibili, senza aggiornamenti forzati di versione maggiore. Vite passa da 7.3.3 a 7.3.7; PostCSS da 8.5.15 a 8.5.32; esbuild da 0.27.7 a 0.28.2. Aggiornati anche Babel, Browserslist, nanoid, parser e source-map. I dettagli esatti sono nei due audit JSON: nessuna segnalazione nota rimane alla data del controllo. Non significa assenza di vulnerabilita future o non censite. [19]

Separati gli strumenti di build dalle dipendenze runtime. Centralizzati lettura e limiti degli endpoint, eliminando codice duplicato; rimosso il vecchio prefisso Brodaxy e semplificato il pulsante hero. Il bundle principale resta circa 0,91 MB: è un margine di ottimizzazione prestazionale, non una falla di per se.


### Difese sugli invii

SITE_URL ora obbligatorio: nessuna origine ricavata dal dominio della richiesta. Rifiuto di origini diverse, richieste cross-site e corpi compressi. Limiti applicati prima di leggere i dati: 20 tentativi per IP ogni 10 minuti; successivamente massimo 5 invii per email. Lettura limitata a 12/16 KB e 5 secondi, anche con flussi lenti senza Content-Length.

IP e indirizzi non vengono registrati dal codice in file o database: il contatore conserva identificativi HMAC con chiave casuale per istanza e scadenza logica. Le voci scadute sono eliminate alla richiesta successiva o al riavvio; non è un termine fisico garantito di cancellazione. È pseudonimizzazione temporanea, non anonimizzazione. Conservati validazione server, honeypot, destinatario fisso, email in testo semplice, idempotenza, timeout del provider e messaggi di errore senza dettagli interni.


### Browser e pubblicazione

Aggiunte CSP, nosniff, anti-framing, Referrer-Policy, Permissions-Policy, COOP e HSTS per Vercel, Netlify e Apache. Nessun iframe esterno nelle anteprime: solo immagine locale e link esplicito. Script e connessioni del sito limitati alla stessa origine; gli stili inline restano necessari per le animazioni. Una CSP è una difesa aggiuntiva, non una soluzione unica. [15]


## Dati personali: cosa accade davvero


### Mappa dei flussi

| Canale | Dati e destinazione |
| --- | --- |
| Navigazione | File locali; hosting può gestire IP e log |
| Scelta lingua | localStorage: marinaro-language |
| Richiesta progetto | Servizi, tempi, messaggio, nome/email; telefono e azienda facoltativi |
| Candidatura | Area, esperienza, disponibilità, presentazione, nome/email; portfolio facoltativo |
| Invio dopo attivazione | Browser -> endpoint -> Resend -> casella configurata |
| WhatsApp / social | Sito esterno soltanto dopo clic sul link |

Nel codice attuale non esiste un gestionale con database, un account cliente, una newsletter o un caricamento CV. Le risposte dei moduli rimangono nello stato React e non sono salvate nel localStorage. Dopo l’attivazione, le copie email e i log dei fornitori andranno gestiti secondo una conservazione documentata.


### Informativa prima della raccolta

I form sono bloccati per impostazione predefinita e offrono WhatsApp. Per attivarli serve un’informativa reale pubblicata, collegata accanto al modulo e nel footer. La stessa versione deve essere indicata nel frontend e sul server; una pagina vecchia non può inviare contro una versione diversa. Questo blocco tecnico non certifica il contenuto dell’informativa. [4]

Per rispondere a preventivi e candidature si valuta la base precontrattuale, senza aggiungere un consenso marketing obbligatorio. Le finalità promozionali eventuali richiedono una gestione separata. Evitare di richiedere salute, documenti di identità o altri dati non pertinenti. [1][20]


### Fornitori e accessi

Prima dell’attivazione: identificare hosting, email e Resend, stipulare/verificare i relativi accordi da responsabile, controllare localizzazione, subfornitori e trasferimenti extra SEE. Il fatto che un servizio sia noto non risolve da solo questi obblighi. Attivare MFA su hosting, dominio, email e repository. [1][16]


## Obblighi del sito professionale in Italia


### Identità e informazioni aziendali

Marinaro è il nome del brand: bisogna identificare la persona o la società che eroga i servizi e tratta i dati. Pubblicare denominazione/nome, sede o domicilio professionale pertinente e contatto email funzionante. Se l’attività e soggetta a IVA, la P.IVA va indicata anche in home; nel footer di tutte le pagine è una soluzione pratica. REA/Registro Imprese e dati societari ulteriori dipendono dalla forma scelta. Non inventare una società o numeri fiscali. [5][6]


### Prima di presentarsi come agenzia operativa

Con il commercialista chiarire: chi fattura, se operi individualmente o insieme all’altro fondatore, abitualita dell’attività, P.IVA, attività/codici pertinenti, regime fiscale e previdenziale. Il sito è un elemento del contesto, non basta da solo a determinare l’inquadramento. Non esiste una regola generale "sotto 5.000 euro non serve P.IVA": la soglia INPS riguarda una franchigia contributiva del lavoro autonomo occasionale. [13]


### Offerte, portfolio e contratti

Confermare che consulenza, preventivo e prima bozza siano davvero gratuiti e chiarire nel preventivo cosa comprende la bozza. Non mostrare concept come clienti reali, risultati o numeri non dimostrabili. In particolare, la pagina Team contiene ancora "30+ progetti realizzati": va confermato o corretto prima di pubblicare. Ora i concept e i visual AI sono segnalati vicino ai contenuti. [18]

Il sito attuale non ha un checkout attivo. Non servono condizioni di vendita copiate da un negozio online per fingere completezza: servono condizioni coerenti con il rapporto concreto. Nei contratti definire ambito, revisioni, compenso e imposte, scadenze, manutenzione, hosting, proprietà/licenze, uso del portfolio e trattamento dati per conto dei clienti. Se venderai online a consumatori, rivalutare informativa precontrattuale e diritto di recesso prima di attivare acquisti.

Accessibilita: verificare l’ambito concreto del D.Lgs. 82/2022 e l’eventuale esenzione per microimprese che prestano servizi. Non tutti i siti vetrina hanno gli stessi obblighi; mantenere comunque contrasto, tastiera, testi alternativi e rispetto del movimento ridotto. [12]


## Immagini AI, diritti e trasparenza


### Uso commerciale e copyright non sono la stessa cosa

Le condizioni OpenAI attribuiscono all’utente i diritti sull’output nei limiti consentiti dalla legge, senza promettere unicità o assenza di diritti di terzi. L’input deve essere utilizzabile legittimamente. Questo non equivale ad avere un copyright esclusivo su ogni immagine generata. [8]

In Italia la legge 132/2025 valorizza le opere dell’ingegno umano, anche assistite da AI se risultato del lavoro intellettuale dell’autore. Conservare prove di ideazione, composizione e interventi umani. Foto, loghi, persone e marchi di altri restano da verificare; non basta aver trasformato un riferimento con AI. [9]


### Trasparenza applicabile nel 2026

L’art. 50 si applica dal 2 agosto 2026. Per chi usa professionalmente un sistema, l’obbligo di disclosure riguarda i contenuti che costituiscono deepfake; non ogni immagine AI indistintamente. La valutazione include somiglianza a soggetti/oggetti/luoghi plausibili e falsa apparenza di autenticita nel contesto. Le opere creative hanno modalità proporzionate di disclosure, non un’esenzione assoluta. [7]

Per questo portfolio ho adottato una soluzione prudente: etichette leggibili vicino agli esempi di servizio, ai mockup, ai concept e al cartellone dimostrativo. Non una scritta nascosta solo nell’alt o una dichiarazione generica sepolta nel footer. Sono visual di progetto, non prove che un negozio o una campagna fisica esistano. Non sono state inventate firme o credenziali C2PA.


### Cosa conservare e verificare

Originali generati, prompt e date, eventuali Content Credentials, versioni finali e condizioni del servizio usato. Per i ritratti reali: autorizzazione della persona e diritti del fotografo; una modifica estetica non sostituisce queste verifiche. Per Malga e Infinity: autorizzazione al portfolio e licenze di foto/loghi. Pinterest e gli screenshot sono riferimenti, non licenze.

Per il lavoro quotidiano con AI documentare indicazioni o formazione interna proporzionata: non è richiesto un certificato specifico o un AI officer solo per l’art. 4. Non caricare dati riservati di clienti senza titolo e valutazione del servizio. [17]


## Cookie, licenze e organizzazione


### Serve il banner cookie?

Nel codice verificato non risultano Google Analytics, Meta Pixel, tracker pubblicitari, Google Fonts remoti o embed social. La preferenza lingua usa memoria locale persistente fino alla cancellazione dell’utente; è un uso funzionale, da descrivere nell’informativa. Con soli strumenti tecnici non va aggiunto un banner di consenso inutile. [3]

La conclusione riguarda il progetto: hosting, CDN o integrazioni aggiunte dopo possono introdurre altri strumenti. Se attiverai tracciamento non tecnico, serve blocco preventivo e scelta reale prima del caricamento, con possibilità di rifiutare e revocare. Un banner che compare dopo l’invio dei dati non basta. [3]


### Licenze software e provenienza delle immagini

Inclusi inventario di 144 pacchetti installati, licenze dichiarate e testi di licenza disponibili. GSAP ha una licenza propria: l’uso del normale sito commerciale e consentito, ma non va trattata come MIT e non vanno rimossi gli avvisi. [14]

Alcuni pacchetti non contengono un file di licenza autonomo; sono elencati nel registro. Le licenze dichiarate e i link non certificano automaticamente componenti copiati da librerie di esempi o immagini. Le origini non documentate sono marcate da verificare nel registro asset; non le ho dichiarate tutte libere.


### Registro, conservazione e incidenti

Mantenere un registro essenziale dei trattamenti: l’esenzione sotto 250 dipendenti non è automatica, soprattutto per trattamenti non occasionali. Nel progetto trovi uno schema da completare. [10]

Scegliere scadenze motivate per richieste e candidature e applicarle davvero, comprese email e backup. In caso di violazione, documentare l’incidente e valutare tempestivamente il rischio: la notifica al Garante va fatta, ove dovuta, senza ritardo e possibilmente entro 72 ore; l’informazione agli interessati dipende dal rischio elevato e dalle condizioni previste. [11]


## Prima della pubblicazione: ordine operativo

| Priorità | Azione / responsabile |
| --- | --- |
| P0 - dati reali | Titolare, forma fiscale, P.IVA se dovuta, sede, email / titolare e commercialista |
| P0 - privacy | Informativa completa, destinatari, conservazione, diritti e trasferimenti / titolare e consulente |
| P0 - contenuti | Autorizzazioni portfolio, ritratti e riferimenti; verifiche marchi / titolare |
| P1 - hosting | HTTPS, header effettivi, limiti edge, endpoint e accessi / tecnico |
| P1 - email | Dominio mittente verificato, SPF/DKIM e DMARC coerenti, MFA / titolare e tecnico |
| P1 - attivazione | Versione informativa allineata e prova concordata dei due moduli / tecnico |
| P2 - mantenimento | Aggiornamenti, cancellazioni, backup e verifica accessi / titolare |


### Configurazione inclusa

Usare Node 22.12+ o 24 LTS e npm ci. Le credenziali si inseriscono solo nell’ambiente server, mai in VITE_ o nei file pubblici. Compilare src/data/legal.js con percorso locale della vera informativa e versione, poi impostare PRIVACY_NOTICE_VERSION uguale sul server insieme a SITE_URL, MAIL_FROM, MAIL_TO e RESEND_API_KEY.

Vercel e Netlify hanno adattatori server già presenti. Su hosting Apache/PHP la sola cartella dist non esegue questi endpoint Node: occorre un backend compatibile o un adattatore PHP da realizzare. I file .htaccess e _headers non rendono attiva da soli l’email.


### Controlli da fare sul dominio effettivo

Verificare redirect HTTPS, certificato e header in risposta; testare accesso diretto alle pagine e 404 degli endpoint inesistenti; controllare il pannello rete prima e dopo le scelte. Provare gli invii solo a destinatario confermato. Il rate limiting locale non è distribuito: impostare limiti/WAF di piattaforma per traffico reale. Non usare npm run dev o vite preview come server pubblico di produzione.

Limiti residui: account, DNS, casella email, diritti delle immagini, configurazione effettiva dell’hosting e documenti sottoscritti non sono stati verificati. Il browser di controllo non offre WebGL: verificato il fallback della mascotte; il nuovo shader va ricontrollato anche su un dispositivo con GPU.


## Bozza privacy: da completare, non pubblicare così

Questo testo è una base di lavoro. Le parti tra parentesi devono essere completate e validate; non sono dati inventati o tempi imposti dalla legge. Il sito non pubblica automaticamente questa bozza.


### Titolare e finalità

[NOME / DENOMINAZIONE LEGALE], con sede/domicilio professionale in [INDIRIZZO], email [EMAIL PRIVACY], gestisce il sito [DOMINIO]. Indicare il contatto DPO soltanto se nominato/applicabile. Tratta i dati forniti per rispondere alle richieste di progetto e valutare candidature/collaborazioni. Le basi proposte sono le misure precontrattuali richieste dall’interessato e, per la sicurezza, un interesse legittimo da valutare e documentare. [1][2]


### Dati e destinatari

Per i progetti: nome, email, servizio, tempi e messaggio; telefono e azienda facoltativi. Per candidature: nome, email, area, esperienza, disponibilità e presentazione; portfolio facoltativo. Non inviare informazioni sanitarie o altri dati non necessari. I dati possono essere trattati dal personale autorizzato e dai fornitori [HOSTING], [EMAIL], [RESEND SE ATTIVO], nei ruoli effettivi da verificare.


### Durata, trasferimenti e diritti

Definire e motivare [TERMINE RICHIESTE], [TERMINE CANDIDATURE] e [TERMINE LOG]. Esempi da valutare, non obblighi automatici: 12 mesi dalla chiusura della richiesta e 6 mesi per candidature senza seguito. I rapporti contrattuali successivi seguono gli obblighi specifici. Indicare [PAESI / GARANZIE DI TRASFERIMENTO], senza promettere dati solo in UE se non verificato.

Scrivendo a [EMAIL PRIVACY] si possono esercitare i diritti previsti, nei rispettivi presupposti: accesso, rettifica, cancellazione, limitazione, opposizione e portabilita. È possibile proporre reclamo al Garante. Specificare obbligatorieta dei campi, conseguenze del mancato conferimento e assenza di decisioni automatizzate, se confermata. [1][2]


### Tecnologie e contatti esterni

Il codice usa localStorage per ricordare la lingua; il dato resta sul dispositivo fino alla cancellazione. Completare l’elenco reale di cookie/log dell’hosting. WhatsApp e altri link portano a servizi esterni su iniziativa dell’utente, soggetti alle proprie informative. Nessuna iscrizione marketing automatica deve derivare dall’invio di questi moduli.


## Dati da fornire e documenti inclusi


### Le risposte necessarie per chiudere il lavoro

1. Il soggetto che gestisce Marinaro: persona fisica, impresa individuale, società o attività non ancora avviata; chi fattura e ruolo dell’altro fondatore.

2. P.IVA e dati aziendali/professionali effettivi, solo se esistenti. Indirizzo pubblicabile e nome/denominazione da indicare.

3. Email che deve ricevere richieste e candidature, ed email per le richieste privacy; possono coincidere se monitorate.

4. Dominio e piano hosting realmente scelti. Confermare fornitori email, eventuali statistiche o pubblicità.

5. Autorizzazioni a mostrare i lavori reali e i ritratti; fonti/licenze per immagini e componenti provenienti da terzi.


### Nel progetto aggiornato trovi

AUDIT-SICUREZZA-E-LEGALE.md: questo rapporto in forma modificabile. docs/legal/bozza-privacy.md e bozza-note-legali.md: testi da completare. registro-trattamenti.csv: mappa essenziale dei dati. registro-asset.csv: percorsi, hash, origine presunta e verifiche da fare. docs/security/: audit dipendenze prima/dopo, inventario licenze e controlli. public/licenses/third-party.txt: avvisi software disponibili.


### Come ripetere i controlli

npm ci --ignore-scripts; npm test; npm run build; npm run audit:dependencies. Usare il lockfile aggiornato: non cancellarlo per tornare a dipendenze non verificate. Per un rilascio su hosting statico caricare soltanto il contenuto di dist, inclusi gli eventuali file nascosti richiesti; non caricare sorgenti, test, documenti privati o .env nella cartella pubblica.

La manutenzione resta necessaria: ripetere il controllo dopo modifiche, nuove integrazioni e aggiornamenti. Il mini gestionale proposto in precedenza non è stato implementato in questa revisione: richiedera autenticazione, autorizzazioni, archivio protetto e conservazione effettiva dei dati.


## Fonti ufficiali consultate

1. [GDPR, testo ufficiale - artt. 5, 6, 13, 28, 32, 33 e 44](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32016R0679)
2. [Garante: informativa e basi giuridiche](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/8981258)
3. [Garante: linee guida cookie 2021](https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/9677876)
4. [Garante: informativa prima dei form online, provvedimento 27 febbraio 2025](https://www.gpdp.it/web/guest/home/docweb/-/docweb-display/docweb/10114967)
5. [D.Lgs. 70/2003, art. 7 - informazioni sul prestatore](https://www.parlamento.it/parlam/leggi/deleghe/03070dl.htm)
6. [DPR 633/1972, art. 35 - P.IVA in home, testo vigente alla data del controllo](https://def.finanze.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&codiceOrdinamento=0000000000000350000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B75A4827C-3766-4ECC-9C45-00C8D6CDC552%7D)
7. [Commissione europea: trasparenza AI, art. 50](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)
8. [OpenAI: condizioni europee, contenuti e diritti](https://openai.com/it-IT/policies/eu-terms-of-use/)
9. [Legge 132/2025, art. 25 - apporto umano e diritto autore](https://def.finanze.it/DocTribFrontend/getAttoNormativoDetail.do?ACTION=getArticolo&codiceOrdinamento=0000000000000250000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&id=%7B727C8823-31DE-4724-AFD5-1A4EC58809B3%7D)
10. [Garante: registro delle attività di trattamento](https://www.garanteprivacy.it/home/faq/registro-delle-attivita-di-trattamento)
11. [Garante: gestione dei data breach](https://www.garanteprivacy.it/data-breach)
12. [AgID: ambito e deroghe accessibilita](https://accessibilita.agid.gov.it/domande-frequenti/)
13. [INPS: franchigia contributiva dei lavoratori autonomi occasionali](https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.49893.i-contributi-dei-lavoratori-autonomi-occasionali.html)
14. [GSAP: licenza Standard No Charge](https://gsap.com/community/standard-license/)
15. [OWASP: Content Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
16. [Resend: Data Processing Addendum](https://resend.com/legal/dpa)
17. [Commissione europea: alfabetizzazione AI, testo aggiornato](https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers)
18. [AGCM: comunicazione commerciale ingannevole](https://www.agcm.it/per-i-consumatori/le-pratiche-commerciali-scorrette-e-la-pubblicit-ingannevole/)
19. [Vite: avviso sicurezza e versioni corrette, ottobre 2026](https://github.com/vitejs/vite/security/advisories/GHSA-rq7h-c2jc-7f22)
20. [Garante: pertinenza dei dati nelle candidature](https://www.gpdp.it/web/guest/home/docweb/-/docweb-display/docweb/9124510)