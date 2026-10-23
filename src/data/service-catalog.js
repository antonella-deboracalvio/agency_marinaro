// Shared by the home, service pages and contact validation (including server).
export const serviceCatalog = [
  {
    id: "digital", name: "Digital", href: "/servizi/digital",
    links: [
      { label: "Siti web su misura", anchor: "siti-web" },
      { label: "Prenotazioni & gestionali", anchor: "prenotazioni" },
      { label: "Menu QR", anchor: "menu-qr" },
    ],
    options: [
      { value: "web", label: "Siti web su misura" },
      { value: "booking", label: "Prenotazioni" },
      { value: "management", label: "Gestionali su misura" },
      { value: "qr", label: "Menu QR" },
      { value: "ecommerce", label: "E-commerce" },
    ],
  },
  {
    id: "identity", name: "Identity", href: "/servizi/identity",
    links: [
      { label: "Logo & visual identity", anchor: "logo" },
      { label: "Packaging", anchor: "packaging" },
      { label: "Brand materials", anchor: "brand-materials" },
    ],
    options: [
      { value: "identity", label: "Logo & visual identity" },
      { value: "packaging", label: "Packaging" },
      { value: "materials", label: "Brand materials" },
    ],
  },
  {
    id: "content", name: "Content", href: "/servizi/content",
    links: [
      { label: "Content shoot", anchor: "content-shoot" },
      { label: "Social content", anchor: "social-content" },
      { label: "Talent content", anchor: "talent-content" },
    ],
    options: [
      { value: "shoot", label: "Content shoot" },
      { value: "social", label: "Social content" },
      { value: "talent", label: "Talent content" },
    ],
  },
  {
    id: "campaigns", name: "Campaigns", href: "/servizi/campaigns",
    links: [
      { label: "Event visuals", anchor: "event-visuals" },
      { label: "Promotional design", anchor: "promotional-design" },
      { label: "Digital invitations", anchor: "digital-invitations" },
    ],
    options: [
      { value: "events", label: "Event visuals" },
      { value: "promotional", label: "Promotional design" },
      { value: "invitations", label: "Digital invitations" },
    ],
  },
];

export const inquiryHref = (service) => `/contatti?servizio=${encodeURIComponent(service)}`;
