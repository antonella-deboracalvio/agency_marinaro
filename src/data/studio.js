import webPortrait from "../assets/team/founder-web-real.jpeg";
import webPortraitSmall from "../assets/team/founder-web-real.jpeg";
import webAvatar from "../assets/team/founder-web-real.jpeg";
import designPortrait from "../assets/team/founder-design-updated-1120.webp";
import designPortraitSmall from "../assets/team/founder-design-updated-480.webp";
import designAvatar from "../assets/team/founder-design-updated-avatar.webp";
import socialAvatar from "../assets/team/social-avatar.webp";
import { BRAND_NAME } from "../lib/brand";
import { contactChannels } from "../lib/contact-channels";

// Add real names here when available; the interface does not invent identities.
// Portraits are supplied by the founders.
export const founders = [
  {
    id: "sviluppo", name: "", role: "Co-founder · Sviluppo", title: "Dal problema alla soluzione.",
    description: "Progetto e sviluppo siti web, gestionali e strumenti che semplificano il tuo lavoro.",
    image: webPortrait, smallImage: webPortraitSmall, avatar: webAvatar, shape: "double", illustrative: false,
  },
  {
    id: "design", name: "", role: "Co-founder · Design & sviluppo", title: "Belle idee. Fatte funzionare.",
    description: "Unisco design e sviluppo per dare forma a siti, e-commerce e identità visive curate in ogni dettaglio.",
    image: designPortrait, imageWidth:1120, imageHeight:1164, smallImage: designPortraitSmall, avatar: designAvatar, shape: "arch", illustrative: false,
  },
];

export const socialMember = {
  image: socialAvatar,
  role: "Social media & contenuti",
  description: "Strategia editoriale, grafiche e contenuti per dare continuità alla voce del tuo brand.",
};

export const studio = {
  name: BRAND_NAME,
  email: contactChannels.email,
  whatsappNumber: contactChannels.whatsappNumber,
  projects: "30+",
  deliveryDays: 7,
};
