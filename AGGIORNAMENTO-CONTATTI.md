# Aggiornamento contatti e interfaccia

- Nuova anteprima FARINA approvata, con varianti responsive e ingrandimento.
- Terza icona del team sostituita con due fumetti (MessagesSquare); mantiene il collegamento alla collaborazione social.
- WhatsApp fisso in basso a destra su tutte le pagine, numero +39 329 756 0298 e messaggio iniziale tradotto. Il pulsante apre la chat; il visitatore sceglie se inviare il messaggio.
- Loader: fase finale ridotta da 2000 a 1000 ms; percentuale e attesa delle risorse conservate. Il tempo totale continua a dipendere dalle risorse.
- Rimossa l’email precedente hello@brodaxy.it. Il footer porta a Contatti e le alternative dirette dei moduli aprono WhatsApp finché non viene confermata una nuova email.

## Stato invii

I moduli Contatti e Lavora con noi hanno già endpoint server e integrazione Resend. Non sono stati configurati account, credenziali o destinatari, né inviati messaggi. Il gestionale non è ancora implementato.

Configurazione pubblica: `src/lib/contact-channels.js`. Inserire qui l’email confermata per abilitare i link email diretti.
Configurazione server: RESEND_API_KEY, MAIL_TO, MAIL_FROM e SITE_URL. MAIL_FROM deve usare un dominio verificato; MAIL_TO è la casella che riceve le notifiche. Nessuna chiave deve finire nel frontend.

Gli adattatori esistenti supportano Vercel e Netlify; la sola cartella dist su hosting statico/PHP non esegue gli endpoint Node. Prima dell’attivazione va verificato l’hosting effettivo.

## Proposta per il passo successivo

Una piccola area riservata, utilizzabile da telefono, con login e due elenchi: richieste clienti e candidature. Ogni invio viene salvato nel database prima della notifica email. Campi: data, nome, email, telefono se fornito, servizio richiesto, messaggio; ruolo e portfolio per le candidature.

Funzioni iniziali: ricerca, filtri, stato (Nuova, Da ricontattare, In corso, Chiusa) e note interne. Accesso consentito ai soli proprietari; nessun dato personale pubblico e nessun archivio affidato al localStorage.

Implementazione proposta: Supabase per database e autenticazione con policy di accesso, Resend per le notifiche. Gli invii pubblici passano da endpoint server con validazione e protezioni antispam; le credenziali amministrative restano sul server. Una notifica fallita non deve perdere la richiesta già salvata.

Prima di procedere servono la casella email che deve ricevere le richieste e il provider/modalità di hosting. Poi si definiscono gli accessi del titolare e si verifica l’intero percorso con una richiesta di prova concordata.

Documentazione ufficiale: https://supabase.com/docs/guides/auth ; https://supabase.com/docs/guides/database/postgres/row-level-security ; https://resend.com/docs/send-with-nodejs

## Revisione mobile del 29 ottobre 2026

La parola DIFFERENT si solleva insieme al pannello nero durante la sua risalita, mantenendo almeno 40 px fra l’intera riga e il bordo del pannello. La posizione iniziale resta invariata; il margine viene ricalcolato al cambio del viewport e al caricamento dei font. Il layout desktop e il percorso con movimento ridotto restano separati. Il pulsante WhatsApp usa ora un verde menta più chiaro (#8ce5b1), con hover #acf0c7.

Verifica mirata: componenti JSX compilati e stati finali del layout controllati nel browser a 320×568, 375×667, 390×844 e 768×1024, con almeno 40 px di distanza; controllata anche la separazione del layout desktop. Il controllo usa rendering statici e la stessa formula di posizionamento dell’animazione; non è una prova completa dell’app React/GSAP. Nessuna dipendenza aggiunta; build Vite completa non eseguita.

## Audit del 29 ottobre 2026

Per lo stato attuale fare riferimento a AUDIT-SICUREZZA-E-LEGALE.md. Dopo questa revisione gli invii richiedono anche l’informativa approvata e pubblicata, con la stessa versione in src/data/legal.js e PRIVACY_NOTICE_VERSION sul server. I moduli restano disabilitati finché mancano questi valori. WhatsApp resta disponibile. Aggiunte etichette AI ai visual dimostrativi; anteprime esterne sostituite con immagini locali e link espliciti.
