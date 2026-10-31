# Prima di pubblicare

Questa revisione include correzioni tecniche e un rapporto. Non e una certificazione di conformita. Apri AUDIT-SICUREZZA-E-LEGALE.md e le bozze in docs/legal. Identita fiscale, contatti privacy, autorizzazioni immagini e hosting sono ancora da confermare.

1. Estrai il progetto in una cartella nuova. Usa il nuovo package-lock.json e installa con npm ci --ignore-scripts. Non mantenere una vecchia node_modules come se fosse aggiornata.
2. Esegui npm test, npm run build e npm run audit:dependencies. La revisione ha superato 52 test e la build; l'audit aggiornato segnala zero vulnerabilita note alla data del rapporto.
3. Pubblica l'informativa approvata sotto public/ (es. privacy.html) con tutti i dati reali. Inserisci il suo percorso e la versione in src/data/legal.js. Il footer e i moduli mostreranno il link. Prima non sono attivi.
4. Configura SITE_URL, MAIL_FROM, MAIL_TO, RESEND_API_KEY e PRIVACY_NOTICE_VERSION solo sul server. La versione deve coincidere con quella pubblicata. Non e un consenso marketing, ne una certificazione automatica. Verifica consegna delle richieste con una prova concordata.
5. Vercel/Netlify hanno gli adattatori API. Su hosting Apache/PHP la sola dist non puo eseguire gli endpoint Node: serve una soluzione backend compatibile. Non caricare .env, sorgenti, test o docs nel document root. Per la parte statica carica solo il contenuto di dist, compresi i file nascosti richiesti.
6. Verifica sul dominio vero HTTPS, intestazioni di sicurezza, configurazione antispam di piattaforma e informative. Controlla permessi di dominio, email e repository; abilita MFA e procedure di backup/ripristino.

Nessuna email reale e stata inviata durante i test. Nessun gestionale/database e stato aggiunto. WhatsApp rimane disponibile al +39 329 756 0298. Le bozze legali non vengono pubblicate automaticamente.
