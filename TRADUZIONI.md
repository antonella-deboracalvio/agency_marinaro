# Lingue del sito

Il sito include italiano, inglese, tedesco e spagnolo. Alla prima visita seleziona la prima lingua supportata tra le preferenze del browser, altrimenti usa l’italiano. La scelta nel menu viene ricordata in questo browser e mantenuta fra le pagine; non serve un servizio esterno o una chiave API.

## Applicare questo aggiornamento

Usa la cartella completa dello ZIP: includi anche `vite.config.js`, poi ferma e riavvia `npm run dev`. Non sono necessarie nuove dipendenze.

## Aggiornare i testi

`src/i18n/messages.js` contiene il testo italiano e, nell’ordine, le versioni inglese, tedesca e spagnola. Quando aggiungi o cambi un testo italiano, aggiorna la relativa voce. Il sistema riconosce anche i segnaposto `{x}` e alcuni testi composti. I nomi dei brand e delle persone restano invariati. Le traduzioni non vengono inventate automaticamente per contenuti aggiunti in futuro: un testo senza voce rimane nella lingua originale.

I componenti leggono la lingua con `useTranslation()` e traducono i testi con `t(...)` (in molti file l’alias locale è `tr`). Non servono un runtime JSX personalizzato, alias o plugin aggiuntivi: la configurazione Vite usa il normale plugin React. Le etichette visibili e gli attributi accessibili vengono tradotti, mentre identificativi, collegamenti, valori dei filtri e dati digitati rimangono invariati. Per aggiungere nuovi contenuti, inserisci la voce nel dizionario e usa `t` nel componente. I nomi delle lingue nel selettore rimangono nella lingua nativa.

I testi incorporati in foto, screenshot e file immagine restano parte dell’immagine originale. Le descrizioni accessibili sono tradotte. I contenuti aperti sui siti esterni appartengono ai rispettivi siti.

## Verifica senza installazioni

Esegui `node --test tests/i18n.test.mjs` per controllare dizionario, selezione lingua e testi dinamici. Il normale avvio e la build restano quelli del progetto (`npm run dev`, `npm run build`) quando le dipendenze esistenti sono disponibili.
