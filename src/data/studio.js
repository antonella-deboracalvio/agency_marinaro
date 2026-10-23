import webPortrait from "../assets/team/founder-web.webp";
import webPortraitSmall from "../assets/team/founder-web-small.webp";
import webAvatar from "../assets/team/founder-web-avatar.webp";
import designPortrait from "../assets/team/founder-design.webp";
import designPortraitSmall from "../assets/team/founder-design-small.webp";
import designAvatar from "../assets/team/founder-design-avatar.webp";
import socialAvatar from "../assets/team/social-avatar.webp";
import { BRAND_NAME } from "../lib/brand";

// Add real names here when available; the interface does not invent identities.
// Demo portraits are marked as illustrative until replaced with the founders' photos.
export const founders = [
  {
    id: "sviluppo", name: "", role: "Co-founder · Sviluppo", title: "Dal problema alla soluzione.",
    description: "Progetto e sviluppo siti web, gestionali e strumenti che semplificano il tuo lavoro.",
    image: webPortrait, smallImage: webPortraitSmall, avatar: webAvatar, shape: "double", illustrative: true,
  },
  {
    id: "design", name: "", role: "Co-founder · Design & sviluppo", title: "Dall’idea all’esperienza.",
    description: "Unisco design e sviluppo per dare forma a siti, e-commerce e identità visive curate in ogni dettaglio.",
    image: designPortrait, smallImage: designPortraitSmall, avatar: designAvatar, shape: "arch", illustrative: true,
  },
];

export const socialMember = {
  image: socialAvatar,
  role: "Social media & contenuti",
  description: "Strategia editoriale, grafiche e contenuti per dare continuità alla voce del tuo brand.",
};

export const studio = {
  name: BRAND_NAME,
  email: "hello@brodaxy.it", // Existing contact address; use your monitored inbox.
  whatsappNumber: "", // International number, digits only. Add your real number to show WhatsApp.
  projects: "30+",
  deliveryDays: 7,
};
