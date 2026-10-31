// Original illustrative concepts. These are not client commissions or live UI demos.
const picture = (id, brand, alt, options = {}) => ({
  src: `/images/services/${id}.webp`,
  srcSet: `/images/services/${id}-640.webp 640w, /images/services/${id}-960.webp 960w, /images/services/${id}.webp 1254w`,
  generated: true,
  brand,
  alt,
  position: "50% 50%",
  fit: "cover",
  ...options,
});

export const serviceArtwork = {
  digital: {
    sections: {
      "siti-web": ["d-web", "d-mobile"],
      prenotazioni: ["d-calendar", "d-booking"],
      gestionali: ["d-dashboard", "d-inventory"],
      "menu-qr": ["d-menu", "d-qr"],
    },
  },
  identity: {
    sections: {
      logo: ["i-logo", "i-sign"],
      "visual-identity": ["i-palette", "i-pattern"],
      packaging: ["i-packaging", "i-shopper"],
      "brand-materials": ["i-cards", "i-menu"],
    },
  },
  content: {
    sections: {
      "content-shoot": ["c-interior", "c-product"],
      "social-content": ["c-posts", "c-stories"],
      "talent-content": ["c-talent", "c-hands"],
    },
  },
  campaigns: {
    sections: {
      "event-visuals": ["a-poster", "a-tickets"],
      "promotional-design": ["a-promo", "a-social"],
      "digital-invitations": ["a-invite-mobile"],
    },
  },
};

export const artwork = {
  "d-web": picture("d-web", "Forma", "Concept Forma: sito per uno studio di movimento, presentato su computer.", { fit: "contain" }),
  "d-mobile": picture("d-mobile", "Forma", "Concept Forma: versione mobile del sito con accesso alle prenotazioni."),
  "d-calendar": picture("d-calendar", "Forma", "Concept Forma: calendario settimanale con lezioni e appuntamenti su tablet.", { fit: "contain" }),
  "d-booking": picture("d-booking", "Forma", "Concept Forma: scelta del servizio e dell’orario sul telefono."),
  "d-dashboard": picture("d-dashboard", "Riva", "Concept Riva: pannello di gestione con riepilogo ordini e prodotti.", { fit: "contain" }),
  "d-inventory": picture("d-inventory", "Riva", "Concept Riva: tabella delle scorte di magazzino su tablet."),
  "d-menu": picture("d-menu", "Riva", "Concept Riva: menu digitale di una caffetteria sullo smartphone."),
  "d-qr": picture("d-qr", "Riva", "Concept Riva: supporto da tavolo con QR per il menu."),
  "i-logo": picture("i-logo", "Riva", "Concept Riva: logo in versione bordeaux su avorio e in negativo.", { fit: "contain" }),
  "i-sign": picture("i-sign", "Riva", "Concept Riva: insegna bordeaux con il logo della caffetteria."),
  "i-palette": picture("i-palette", "Riva", "Concept Riva: studio della palette e della tipografia su carta.", { fit: "contain" }),
  "i-pattern": picture("i-pattern", "Riva", "Concept Riva: carta velina con un pattern coordinato al logo."),
  "i-packaging": picture("i-packaging", "Riva", "Concept Riva: bicchiere e confezione coordinati in avorio e bordeaux.", { fit: "contain" }),
  "i-shopper": picture("i-shopper", "Riva", "Concept Riva: shopper in carta con tipografia e fascia bordeaux."),
  "i-cards": picture("i-cards", "Riva", "Concept Riva: biglietti da visita e card fedeltà coordinati.", { fit: "contain" }),
  "i-menu": picture("i-menu", "Riva", "Concept Riva: impaginazione di un menu stampato su carta avorio."),
  "c-interior": picture("c-interior", "Riva", "Immagine Riva: ambiente di una caffetteria con pietra, acciaio e sedute bordeaux."),
  "c-product": picture("c-product", "Riva", "Immagine Riva: dettaglio di un espresso e dei materiali del locale."),
  "c-posts": picture("c-posts", "Riva", "Concept Riva: una serie coordinata di post con fotografia e tipografia.", { fit: "contain" }),
  "c-stories": picture("c-stories", "Riva", "Concept Riva: contenuti verticali e copertine per i social."),
  "c-talent": picture("c-talent", "Riva", "Immagine Riva: una persona vive un momento in caffetteria."),
  "c-hands": picture("c-hands", "Riva", "Immagine Riva: dettaglio del prodotto utilizzato da una persona."),
  "a-poster": picture("a-poster", "Trama", "Concept Trama: manifesto giallo e nero per un evento culturale.", { fit: "contain" }),
  "a-tickets": picture("a-tickets", "Trama", "Concept Trama: ticket e pass coordinati alla grafica dell’evento."),
  "a-promo": picture("a-promo", "Trama", "Concept Trama: flyer e materiali promozionali con tipografia decisa.", { fit: "contain" }),
  "a-social": picture("a-social", "Trama", "Concept Trama: adattamento della campagna al formato social verticale."),
  "a-invite": picture("a-invite", "Lia & Elia", "Concept Lia ed Elia: direzione grafica dell’invito in rosso e avorio.", { fit: "contain" }),
  "a-invite-mobile": picture("a-invite-mobile", "Lia & Elia", "Concept Lia ed Elia: invito digitale con dettagli dell’evento su smartphone."),
};
