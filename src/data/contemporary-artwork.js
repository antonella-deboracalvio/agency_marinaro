// Original fictional concepts generated for the contemporary collection.
const picture = (id, brand, alt) => ({
 src: `/images/services/${id}.webp`,
 srcSet: `/images/services/${id}-640.webp 640w, /images/services/${id}-960.webp 960w, /images/services/${id}.webp 1254w`,
 brand, alt: `${alt}`, fit: "contain", position: "50% 50%"
});
export const contemporaryArtwork = {
"d-web": picture("pop-d-web", "MOSSA", "Sito MOSSA su computer, con tipografia rosa e fotografia di movimento."),
"d-mobile": picture("pop-d-mobile", "MOSSA", "Due schermate mobile MOSSA, con identità rosa e nera."),
"d-calendar": picture("pop-d-calendar", "MOSSA", "Calendario MOSSA per le lezioni settimanali."),
"d-booking": picture("pop-d-booking", "MOSSA", "Interfaccia MOSSA per scegliere una lezione sul telefono."),
"d-dashboard": picture("pop-d-dashboard", "PIEGA", "Pannello PIEGA con ordini, prodotti e scorte."),
"d-inventory": picture("pop-d-inventory", "PIEGA", "Tabella delle scorte PIEGA su tablet."),
"d-menu": picture("pop-d-menu", "PIEGA", "Menu digitale PIEGA su smartphone."),
"d-qr": picture("pop-d-qr", "PIEGA", "Supporto da tavolo PIEGA con QR e menu mobile."),
"i-logo": picture("pop-i-logo", "PIEGA", "Logo PIEGA su carte viola e giallo burro."),
"i-sign": picture("pop-i-sign", "PIEGA", "Insegna PIEGA applicata alla facciata di una panetteria."),
"i-palette": picture("pop-i-palette", "MOSSA", "Presentazione MOSSA con logo, palette rosa e nera e tipografia."),
"i-pattern": picture("pop-i-pattern", "MOSSA", "Carta velina MOSSA con grandi fiori grafici rosa e neri."),
"i-packaging": picture("pop-i-packaging", "PIEGA", "Confezione e bicchiere PIEGA con grandi scritte viola e giallo burro."),
"i-shopper": picture("pop-i-shopper", "PIEGA", "Shopper PIEGA viola e confezione per prodotti da forno."),
"i-cards": picture("pop-i-cards", "MOSSA", "Biglietti MOSSA con grandi scritte e forme grafiche rosa, nere e bianche."),
"i-menu": picture("pop-i-menu", "PIEGA", "Menu stampato PIEGA, con titoli viola e copertina giallo burro."),
"c-interior": picture("pop-c-interior", "PIEGA", "Ambiente della panetteria PIEGA, con acciaio e sedute viola."),
"c-product": picture("pop-c-product", "PIEGA", "Fotografia di prodotto PIEGA, con croissant e packaging."),
"c-posts": picture("pop-c-posts", "MOSSA", "Sei composizioni social MOSSA con fotografia, rosa e tipografia."),
"c-stories": picture("pop-c-stories", "MOSSA", "Tre composizioni verticali MOSSA per le stories."),
"c-talent": picture("pop-c-talent", "MOSSA", "Immagine MOSSA con una donna in movimento nello studio."),
"c-hands": picture("pop-c-hands", "PIEGA", "Immagine PIEGA con una persona che tiene bicchiere e confezione."),
"a-poster": picture("pop-a-poster", "FUORI", "Manifesti FUORI gialli, bianchi e neri su una parete urbana."),
"a-tickets": picture("pop-a-tickets", "FUORI", "Ticket e pass FUORI con grafica coordinata al festival."),
"a-promo": picture("pop-a-promo", "PIEGA", "Campagna promozionale PIEGA con poster, flyer e card."),
"a-social": picture("pop-a-social", "FUORI", "Composizioni social FUORI con tipografia e geometrie gialle e nere."),
"a-invite": picture("pop-a-invite", "Giulia / 30", "Invito GIULIA 30 con grande numero nero e blocchi rosa."),
"a-invite-mobile": picture("pop-a-invite-mobile", "Giulia / 30", "Invito digitale GIULIA 30 su smartphone."),
};

