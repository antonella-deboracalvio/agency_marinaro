import { contemporaryArtwork } from "./contemporary-artwork.js";
import { artwork, serviceArtwork } from "./service-artwork.js";

// Captions and service text stay independent from the image collection.
const visual = (label, color, src = "", alt = label) => ({ label, color, src, alt });

export const servicePages = {
  digital: {
    title: "Soluzioni digitali fatte per funzionare.",
    description: "Creiamo siti web e strumenti digitali semplici da usare, belli da vedere e pensati per rendere più facile il lavoro della tua attività.",
    accent: "#c8d2dc",
    sections: [
      {
        id: "siti-web", label: "Siti web su misura", title: "Il tuo sito, costruito intorno alla tua attività.",
        paragraphs: [
          "Progettiamo un sito per raccontare la tua attività, presentare i tuoi servizi e rendere semplice contattarti. Se vuoi vendere online, definiamo insieme anche il percorso di acquisto.",
          "Organizziamo le pagine, curiamo la grafica e sviluppiamo un sito responsive per desktop e mobile, con uno stile coerente con il tuo brand.",
        ],
        listTitle: "Cosa possiamo realizzare",
        items: ["Struttura e design delle pagine", "Mobile", "Moduli di contatto", "Mappe, informazioni e collegamenti social", "Animazioni leggere", "Pubblicazione online"],
        visuals: [visual("Desktop", "#c7d1db"), visual("Mobile", "#e0ded6")],
        service: "web", cta: "Parliamo del tuo sito",
      },
      {
        id: "prenotazioni", label: "Prenotazioni", title: "Prenotare diventa più semplice. Per tutti.",
        paragraphs: [
          "Il cliente sceglie il servizio, il giorno e l’orario disponibili. Tu controlli gli appuntamenti da un pannello dedicato, senza dover ricopiare tutto a mano.",
          "È una soluzione utile per studi, centri fitness, parrucchieri, barber shop e attività che lavorano su appuntamento.",
        ],
        listTitle: "Come può aiutarti",
        items: ["Giorni e orari disponibili", "Prenotazioni dal sito", "Calendario degli appuntamenti", "Gestione di disponibilità e servizi", "Modifica o cancellazione", "Pannello per il titolare"],
        visuals: [visual("Calendario prenotazioni", "#b5c7ca"), visual("Scelta dell’orario", "#d6dcd6")],
        service: "booking", cta: "Semplifichiamo le prenotazioni",
      },
      {
        id: "gestionali", label: "Gestionali su misura", title: "Uno strumento che segue il tuo modo di lavorare.",
        paragraphs: [
          "Se fogli sparsi o programmi generici ti complicano il lavoro, possiamo costruire un gestionale pensato per la tua attività.",
          "Decidiamo insieme quali informazioni organizzare e quali operazioni rendere più veloci: clienti, prodotti, scorte, ordini o prenotazioni.",
        ],
        listTitle: "Da cosa possiamo partire",
        items: ["Magazzino e scorte", "Archivio clienti", "Prodotti e ordini", "Prenotazioni", "Riepiloghi e dati utili", "Automazioni da definire insieme"],
        visuals: [visual("Pannello di gestione", "#bfc3cf"), visual("Prodotti e scorte", "#d7d7cd")],
        service: "management", cta: "Raccontaci come lavori",
      },
      {
        id: "menu-qr", label: "Menu QR", title: "Il tuo menu. Sempre a portata di telefono.",
        paragraphs: [
          "Il cliente inquadra il QR code e apre il menu sul proprio smartphone, senza scaricare un’app. La grafica riprende lo stile del tuo locale.",
          "Piatti, bevande e prezzi possono essere aggiornati senza cambiare il QR e ristampare ogni volta i materiali sui tavoli.",
        ],
        listTitle: "Cosa possiamo inserire",
        items: ["Categorie e prodotti", "Piatti, bevande e prezzi", "Foto e descrizioni", "Allergeni indicati dal locale", "Versioni in più lingue", "Contatti e informazioni utili"],
        visuals: [visual("Menu su smartphone", "#d6cdbf"), visual("QR da tavolo", "#e4e0d7")],
        service: "qr", cta: "Creiamo il tuo menu",
      },
    ],
    delivery: {
      title: "Un progetto che puoi usare davvero.",
      text: "Prima definiamo le funzioni che ti servono. Poi progettiamo, sviluppiamo e testiamo il risultato insieme.",
      items: [
        { title: "Struttura chiara", text: "Pagine, contenuti e funzioni concordati in base alla tua attività." },
        { title: "Pronto online", text: "Il progetto pubblicato, con accessi e configurazioni previsti dal lavoro." },
        { title: "Passaggio di consegne", text: "Ti mostriamo come usare le parti aggiornabili del tuo sito o gestionale." },
      ],
    },
    closing: { title: "Hai un’idea più specifica?", text: "Raccontaci cosa vuoi realizzare o quale problema vuoi risolvere. Studiamo insieme la soluzione." },
  },
  identity: {
    title: "Diamo un volto riconoscibile alla tua attività.",
    description: "Dal logo ai materiali che usi ogni giorno, creiamo uno stile visivo chiaro, coerente e facile da riconoscere.",
    accent: "#d2c5b4",
    sections: [
      {
        id: "logo", label: "Logo design", title: "Un logo che rappresenta la tua attività.",
        paragraphs: [
          "Progettiamo un segno semplice da riconoscere e adatto ai luoghi in cui lo userai: sito, social, insegna, menu o confezioni.",
          "Prepariamo le varianti necessarie perché funzioni anche in piccolo, su fondi chiari o scuri e nei diversi formati.",
        ],
        listTitle: "Cosa ricevi",
        items: ["Logo principale", "Varianti e composizioni", "Versione chiara e scura", "Simbolo, se previsto dal progetto", "File per il web", "File per la stampa"],
        visuals: [visual("Logo e varianti", "#d8cbbb"), visual("Applicazione su insegna", "#b8c1bf")],
        service: "identity", cta: "Partiamo dal tuo logo",
      },
      {
        id: "visual-identity", label: "Visual identity", title: "Un intero stile. Non solo un logo.",
        paragraphs: [
          "Scegliamo i colori, i caratteri e gli elementi grafici che renderanno riconoscibile la tua attività. Definiamo anche come combinarli, così i materiali parlano la stessa lingua.",
          "Per un bar, per esempio, significa dare coerenza al menu, ai post, alle foto e alle confezioni, anche quando vengono realizzati in momenti diversi.",
        ],
        listTitle: "Cosa definiamo",
        items: ["Logo e palette colori", "Caratteri tipografici", "Elementi grafici e pattern", "Icone", "Indicazioni per le fotografie", "Regole d’uso raccolte in una guida"],
        visuals: [visual("Colori e tipografia", "#d5d1c8"), visual("Elementi del brand", "#c2bacb")],
        service: "identity", cta: "Diamo forma alla tua identità",
      },
      {
        id: "packaging", label: "Packaging", title: "Il tuo brand, anche sul prodotto.",
        paragraphs: [
          "Disegniamo la grafica di etichette, scatole e confezioni seguendo lo stile della tua attività.",
          "Lavoriamo sulle misure e sulle specifiche del fornitore che hai scelto. Ti consegniamo i file pronti per la produzione; la stampa e la realizzazione fisica sono affidate al fornitore.",
        ],
        listTitle: "Dove possiamo applicarlo",
        items: ["Etichette", "Scatole e confezioni", "Bicchieri", "Shopper", "Materiali per l’asporto", "Packaging di prodotto"],
        visuals: [visual("Confezione ed etichetta", "#c8bcaa"), visual("Shopper coordinata", "#dfd9cf")],
        service: "packaging", cta: "Parliamo del tuo packaging",
      },
      {
        id: "brand-materials", label: "Brand materials", title: "Lo stesso stile, nei dettagli di ogni giorno.",
        paragraphs: [
          "Creiamo i materiali che usi per accogliere i clienti, presentarti e far tornare le persone nella tua attività.",
          "Ogni elemento riprende logo, colori e caratteri del brand. Prepariamo i file nel formato richiesto per l’uso digitale o per la stampa.",
        ],
        listTitle: "Qualche esempio",
        items: ["Card fedeltà e appuntamenti", "Gift card e voucher", "Biglietti da visita", "Menu", "Adesivi", "Cartoline di ringraziamento"],
        visuals: [visual("Card e biglietti", "#c4c2cc"), visual("Menu e materiali", "#dfd5c7")],
        service: "materials", cta: "Coordiniamo i tuoi materiali",
      },
    ],
    delivery: {
      title: "Dalla presentazione ai file finali.",
      text: "Prima ti mostriamo l’identità con esempi di utilizzo. Dopo l’approvazione ricevi i materiali previsti dal progetto, organizzati e pronti da usare.",
      items: [
        { title: "La tua identità", text: "Logo nei formati necessari, palette, indicazioni sui caratteri e sugli elementi grafici." },
        { title: "Una guida semplice", text: "Le regole per mantenere lo stesso stile su materiali, social e sito." },
        { title: "File per i fornitori", text: "Esecutivi adattati alle specifiche di stampa, per i materiali concordati." },
      ],
    },
    closing: { title: "Un solo stile, ovunque.", text: "Facciamo in modo che la tua attività si riconosca, online e nel mondo reale." },
  },
  content: {
    title: "Contenuti veri per raccontare la tua attività.",
    description: "Foto, video brevi e grafiche pronte da usare sui tuoi social. Noi creiamo il materiale, tu lo pubblichi.",
    accent: "#c6bed5",
    sections: [
      {
        id: "content-shoot", label: "Content shoot", title: "Portiamo la tua attività dentro i contenuti.",
        paragraphs: [
          "Veniamo da te e realizziamo foto e brevi clip per mostrare ambiente, prodotti, persone e dettagli del tuo lavoro.",
          "Prepariamo insieme ciò che serve raccontare. Il materiale può essere usato sui social, sul sito e nelle comunicazioni della tua attività.",
        ],
        listTitle: "Cosa possiamo raccontare",
        items: ["Ambienti e locale", "Prodotti", "Piatti e bevande", "Dettagli", "Persone e lavoro quotidiano", "Momenti reali"],
        visuals: [visual("Ambiente e atmosfera", "#c5bacd"), visual("Dettagli del prodotto", "#dfd5c7")],
        service: "shoot", cta: "Organizziamo uno shooting",
      },
      {
        id: "social-content", label: "Social content", title: "Il messaggio è tuo. La forma la curiamo noi.",
        paragraphs: [
          "Ci dici cosa vuoi comunicare e prepariamo post, stories e grafiche coordinate, nei formati adatti ai tuoi canali.",
          "Ricevi i contenuti pronti da pubblicare o i template previsti dal pacchetto. La gestione del profilo e la pubblicazione rimangono a te.",
        ],
        listTitle: "Cosa possiamo creare",
        items: ["Post", "Caroselli", "Stories", "Copertine", "Grafiche promozionali", "Template riutilizzabili"],
        visuals: [visual("Post coordinati", "#ccc5d8"), visual("Stories e copertine", "#e0dcda")],
        service: "social", cta: "Prepariamo i tuoi contenuti",
      },
      {
        id: "talent-content", label: "Talent content", title: "Mostriamo la tua attività mentre viene vissuta.",
        paragraphs: [
          "Inseriamo una persona nello shooting per mostrare in modo naturale un prodotto, un servizio o l’esperienza nel tuo locale.",
          "Può essere qualcuno che sorseggia un cocktail, consulta il menu o prova un prodotto. Il talent è il soggetto delle immagini: il servizio non comprende promozione sul suo profilo o influencer marketing.",
        ],
        listTitle: "Immagini da vivere",
        items: ["Persone nel locale", "Prodotti in uso", "Momenti lifestyle", "Foto e clip verticali"],
        visuals: [visual("Esperienza nel locale", "#bdc6bc"), visual("Prodotto in uso", "#d8c9c0")],
        service: "talent", cta: "Progettiamo lo shooting",
      },
    ],
    kits: [
      { name: "Social Starter", text: "Una prima serie di contenuti con uno stile riconoscibile.", items: ["6 post", "3 stories", "Grafiche coordinate"] },
      { name: "Social Kit", text: "Più formati per raccontare la tua attività con continuità.", items: ["9 post", "6 stories", "Copertine highlights", "Stile coordinato"] },
      { name: "Social Refresh", text: "Un nuovo aspetto per i contenuti del tuo profilo.", items: ["Nuovo stile del feed", "Palette e caratteri", "Template", "Layout dei post"] },
    ],
    delivery: {
      title: "Tu li pubblichi. Noi li prepariamo.",
      text: "Definiamo prima quantità, formati e contenuti. Ricevi materiale organizzato per l’uso concordato, senza un servizio di gestione del profilo.",
      items: [
        { title: "Foto e clip", text: "Il materiale selezionato e preparato dallo shooting concordato." },
        { title: "Grafiche nei formati giusti", text: "Post, stories e copertine pronti per i canali scelti." },
        { title: "Uno stile coerente", text: "Colori, caratteri e composizioni riconoscibili tra un contenuto e l’altro." },
      ],
    },
    closing: { title: "Facciamo vedere chi sei.", text: "Raccontaci la tua attività e cosa vuoi mostrare. Costruiamo i contenuti da lì." },
  },
  campaigns: {
    title: "Diamo un’identità anche ai tuoi eventi.",
    description: "Visual e materiali grafici per eventi, promozioni, aperture e occasioni speciali. Un’idea chiara, declinata nei formati che ti servono.",
    accent: "#bfcad5",
    sections: [
      {
        id: "event-visuals", label: "Event visuals", title: "Un evento che si riconosce al primo sguardo.",
        paragraphs: [
          "Creiamo uno stile grafico per il tuo evento e lo portiamo sui materiali necessari: dalla locandina alla story, fino al ticket.",
          "Può essere una serata, un’inaugurazione, una festa privata, un evento aziendale o un lancio. Partiamo dal tipo di occasione e da ciò che vuoi comunicare.",
        ],
        listTitle: "Cosa possiamo creare",
        items: ["Visual principale", "Poster e flyer", "Post e stories", "Ticket", "Pass", "Menu dell’evento"],
        visuals: [visual("Poster dell’evento", "#bdc9d6"), visual("Story e ticket", "#d5c9d5")],
        service: "events", cta: "Raccontaci il tuo evento",
      },
      {
        id: "promotional-design", label: "Promotional design", title: "La tua novità merita di farsi vedere.",
        paragraphs: [
          "Realizziamo grafiche per presentare un’offerta, un nuovo prodotto, un’apertura o un’iniziativa della tua attività.",
          "Mettiamo in evidenza il messaggio e prepariamo i formati per i canali scelti: materiali stampati, sito o social.",
        ],
        listTitle: "Qualche esempio",
        items: ["Locandine", "Poster", "Flyer", "Grafiche per offerte", "Lanci di prodotto", "Nuove aperture"],
        visuals: [visual("Grafica promozionale", "#ccc5b6"), visual("Formato social", "#c1cdc5")],
        service: "promotional", cta: "Diamo spazio alla tua novità",
      },
      {
        id: "digital-invitations", label: "Inviti digitali", title: "Il tuo evento comincia con un link.",
        paragraphs: [
          "Un invito da inviare su WhatsApp, via email o con un QR. Si apre direttamente sul telefono, senza scaricare un’app, con uno stile creato per la tua occasione.",
          "In un’unica pagina riuniamo data, luogo e programma. Possiamo aggiungere la conferma di partecipazione e il collegamento alla mappa, così i tuoi ospiti trovano subito ciò che serve.",
        ],
        listTitle: "Tutto, in un solo link",
        items: ["Data, luogo e programma", "Indicazioni per arrivare", "Conferma di partecipazione", "Condivisione via WhatsApp o email", "Grafica su misura", "Layout per smartphone"],
        visuals: [visual("Invito su smartphone", "#bfc8d0")],
        service: "invitations", cta: "Progettiamo il tuo invito digitale",
      },
    ],
    delivery: {
      title: "Dall’idea a tutti i formati.",
      text: "Definiamo lo stile, lo applichiamo ai materiali concordati e ti consegniamo i file. Le eventuali stampe si realizzano con il fornitore che scegli.",
      items: [
        { title: "Un visual riconoscibile", text: "La proposta grafica che dà un filo comune all’evento o alla promozione." },
        { title: "Formati coordinati", text: "Materiali adattati alle dimensioni dei canali e dei supporti previsti." },
        { title: "Pronti da condividere", text: "File per l’uso digitale e, quando richiesti, esecutivi per la stampa." },
      ],
    },
    closing: { title: "Ogni occasione ha il suo stile.", text: "Dalla locandina a un’intera identità visiva, diamo una forma coerente al tuo prossimo evento." },
  },
};

// Selection is independent of the service copy and of the other image collection.
// Missing/rejected artwork is omitted; aliases sharing one image render only once.
const uniqueVisuals = visuals => [...new Map(visuals.filter(Boolean).map(item => [item.src, item])).values()];

for (const [areaId, page] of Object.entries(servicePages)) {
  const collection = serviceArtwork[areaId];
  for (const section of page.sections) {
    const keys = areaId === 'digital' && section.id === 'siti-web'
      ? ['farina-web', 'd-mobile']
      : collection.sections[section.id];
    section.contemporaryVisuals = uniqueVisuals(keys.map((key, index) => {
      const image = contemporaryArtwork[key];
      return image ? { ...(section.visuals[index] || section.visuals[0]), ...image } : null;
    }));
    section.visuals = section.visuals.map((visual, index) => ({ ...visual, ...artwork[collection.sections[section.id][index]] }));
  }
}
