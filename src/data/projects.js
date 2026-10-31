import malga from "../assets/work/malga-1600.webp";
import forma from "../assets/work/forma-1600.webp";
import infinity from "../assets/work/infinity-1600.webp";
import balance from "../assets/work/ritmo-1600.webp";
import ritmoSmall from "../assets/work/ritmo-720.webp";
import mivito from "../assets/work/fuori-standard-1600.webp";
import fuoriSmall from "../assets/work/fuori-standard-720.webp";
import qrMenu from "../assets/work/pausa-cover.svg";
import malgaSmall from "../assets/work/malga-720.webp";
import formaSmall from "../assets/work/forma-720.webp";
import infinitySmall from "../assets/work/infinity-720.webp";
import dashboard from "../assets/work/scorta-1600.webp";
import scortaSmall from "../assets/work/scorta-720.webp";
import food from "../assets/work/sfoglia-1600.webp";
import sfogliaSmall from "../assets/work/sfoglia-720.webp";

export const projectCategories = ["Tutti", "Siti web", "E-commerce", "QR Menu", "Gestionali", "Brand identity"];

export const projects = [
  { id: "malga-cavedine", title: "Malga Cavedine", result: "Territorio, cucina, accoglienza.", category: "Sito web", sector: "Hospitality", status: "Progetto reale", year: "2026", description: "Sito web immersivo per una realtà di montagna, progettato per raccontare cucina, territorio e itinerari.", services: ["Web design", "Sviluppo responsive", "Hosting"], cover: malga, coverSmall: malgaSmall, homeFeatured: true, liveUrl: "https://malgacavedine.it/", previewUrl: "https://malgacavedine.it/", canEmbed: true, featured: true },
  { id: "forma-pilates", title: "Forma Pilates", result: "Il movimento prende forma.", category: "Sito web", sector: "Wellness", status: "Concept", year: "2026", description: "Concept di home page per uno studio Pilates, con percorsi e lezioni in primo piano.", services: ["Art direction", "Web design"], cover: forma, coverSmall: formaSmall, homeFeatured: true, liveUrl: "", previewUrl: "", canEmbed: false },
  { id: "infinity-home", title: "Infinity Home", result: "Un soggiorno nel cuore di Bari.", category: "Sito web", sector: "Hospitality", status: "Progetto reale", year: "2026", description: "Un sito dedicato all’accoglienza, per presentare gli appartamenti e richiedere disponibilità.", services: ["Web design", "Sviluppo responsive"], cover: infinity, coverSmall: infinitySmall, homeFeatured: true, liveUrl: "https://infinityhome.online/", previewUrl: "https://infinityhome.online/", canEmbed: true },
  { id: "ritmo-studio", title: "RITMO Studio", result: "Prenotazioni, senza complicazioni.", category: "Sito + gestionale", sector: "Wellness", status: "Concept", year: "2026", description: "Un gestionale su misura per organizzare lezioni, iscritti e prenotazioni. Dal computer e dal telefono, sempre dalla parte del titolare.", services: ["UX/UI design", "Dashboard", "Prototipo"], cover: balance, coverSmall: ritmoSmall, liveUrl: "", previewUrl: "", canEmbed: false, featured: true },
  { id: "fuori-standard", title: "FUORI STANDARD", result: "Lo stile è tuo.", category: "E-commerce", sector: "Streetwear", status: "Concept", year: "2026", description: "Concept e-commerce per un brand streetwear: capi essenziali, fotografie protagoniste e un percorso di acquisto pulito.", services: ["Art direction", "Web design", "Sviluppo"], cover: mivito, coverSmall: fuoriSmall, liveUrl: "", previewUrl: "", canEmbed: false, featured: true },
  { id: "qr-menu-restaurant", title: "PAUSA · Menu QR", result: "Il menu, sempre aggiornato.", category: "QR Menu", sector: "Hospitality", status: "Concept", year: "2026", description: "Un menu QR da consultare sul telefono, con aggiornamenti in autonomia tramite pannello riservato oppure con il supporto della nostra assistenza.", services: ["UX mobile", "UI design", "QR system"], cover: qrMenu, coverSmall: qrMenu, homeFeatured: true, liveUrl: "", previewUrl: "", canEmbed: false },
  { id: "scorta", title: "SCORTA", result: "Il magazzino, a colpo d’occhio.", category: "Gestionale", sector: "Operations", status: "Concept", year: "2026", description: "Concept di gestionale per consultare le giacenze, seguire i movimenti e individuare gli articoli da riordinare.", services: ["Product design", "Dashboard", "Design system"], cover: dashboard, coverSmall: scortaSmall, liveUrl: "", previewUrl: "", canEmbed: false },
  { id: "sfoglia", title: "SFOGLIA", result: "Il mattino ha gusto.", category: "Sito web", sector: "Food", status: "Concept", year: "2026", description: "Un concept per una caffetteria contemporanea: colazione, caffè e un menu semplice da esplorare.", services: ["Landing page", "Copy direction", "Responsive"], cover: food, coverSmall: sfogliaSmall, detailPath: "/progetti/sfoglia", liveUrl: "", previewUrl: "", canEmbed: false },
];


const artworkSizes = { "qr-menu-restaurant": [1586, 992], "trama": [1536, 1024], "malga-cavedine": [1586, 992], "forma-pilates": [1586, 992], "infinity-home": [1586, 992] };
projects.forEach(project => {
  project.detailPath = `/progetti/${project.id}`;
  [project.coverWidth, project.coverHeight] = artworkSizes[project.id] || [1448, 1086];
});
