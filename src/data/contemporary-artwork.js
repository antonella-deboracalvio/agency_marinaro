import {farinaArtwork} from './farina-artwork.js';

// Artwork selected for the contemporary collection.
const picture = (id, brand, alt) => ({
 src: `/images/services/${id}.webp`,
 srcSet: `/images/services/${id}-640.webp 640w, /images/services/${id}-960.webp 960w, /images/services/${id}.webp 1254w`,
 generated: true, brand, alt: `${alt}`, fit: "contain", position: "50% 50%"
});
export const contemporaryArtwork = {
"d-web": picture("pop-d-web", "MOSSA", "Sito MOSSA su computer, con tipografia rosa e fotografia di movimento."),
"d-mobile": picture("pop-d-mobile", "MOSSA", "Due schermate mobile MOSSA, con identità rosa e nera."),
"d-calendar": picture("pop-d-calendar", "MOSSA", "Calendario MOSSA per le lezioni settimanali."),
"d-booking": picture("pop-d-booking", "MOSSA", "Interfaccia MOSSA per scegliere una lezione sul telefono."),
"farina-web": farinaArtwork.website,
"d-dashboard": farinaArtwork.dashboard,
"d-inventory": farinaArtwork.inventory,
"d-menu": farinaArtwork['qr-menu'],
"d-qr": farinaArtwork['qr-menu'],
"i-logo": farinaArtwork.logo,
"i-sign": farinaArtwork.sign,
"i-palette": picture("pop-i-palette", "MOSSA", "Presentazione MOSSA con logo, palette rosa e nera e tipografia."),
"i-pattern": picture("pop-i-pattern", "MOSSA", "Carta velina MOSSA con grandi fiori grafici rosa e neri."),
"i-packaging": farinaArtwork.packaging,
"i-shopper": farinaArtwork.shopper,
"i-cards": picture("pop-i-cards", "MOSSA", "Biglietti MOSSA con grandi scritte e forme grafiche rosa, nere e bianche."),
"i-menu": farinaArtwork['window-menu'],
"c-interior": farinaArtwork.interior,
"c-posts": picture("pop-c-posts", "MOSSA", "Sei composizioni social MOSSA con fotografia, rosa e tipografia."),
"c-stories": picture("pop-c-stories", "MOSSA", "Tre composizioni verticali MOSSA per le stories."),
"c-talent": picture("pop-c-talent", "MOSSA", "Immagine MOSSA con una donna in movimento nello studio."),
"c-hands": farinaArtwork.bread,
"a-poster": picture("pop-a-poster", "FUORI", "Manifesti FUORI gialli, bianchi e neri su una parete urbana."),
"a-tickets": picture("pop-a-tickets", "FUORI", "Ticket e pass FUORI con grafica coordinata al festival."),
"a-social": picture("pop-a-social", "FUORI", "Composizioni social FUORI con tipografia e geometrie gialle e nere."),
"a-invite": picture("pop-a-invite", "Giulia / 30", "Invito GIULIA 30 con grande numero nero e blocchi rosa."),
"a-invite-mobile": picture("pop-a-invite-mobile", "Giulia / 30", "Invito digitale GIULIA 30 su smartphone."),
};

