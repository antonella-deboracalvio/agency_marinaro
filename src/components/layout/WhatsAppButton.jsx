import { whatsappHref } from "../../lib/contact-channels";
import { useTranslation } from "../../i18n/context";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  const { t } = useTranslation();
  return <a className="whatsapp-contact" href={whatsappHref(t("Ciao, vorrei parlare con voi di un progetto."))}
    target="_blank" rel="noopener noreferrer" aria-label={t("Parla con noi su WhatsApp")} title={t("Parla con noi su WhatsApp")}>
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M16.04 3a12.9 12.9 0 0 0-11.2 19.3L3 29l6.87-1.8A12.97 12.97 0 1 0 16.04 3Zm0 23.66a10.7 10.7 0 0 1-5.46-1.49l-.39-.23-4.07 1.07 1.09-3.97-.26-.41a10.72 10.72 0 1 1 9.09 5.03Zm5.88-8.03c-.32-.16-1.9-.94-2.2-1.05-.29-.1-.5-.16-.72.16-.21.33-.83 1.05-1.02 1.26-.18.22-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6-.95-.84-1.6-1.9-1.8-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.54.1-.2.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.52-.54-.72-.55h-.61c-.22 0-.57.08-.86.4-.3.33-1.13 1.1-1.13 2.68s1.16 3.12 1.32 3.33c.16.22 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.48.21 2.04.13.62-.1 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37Z" />
    </svg>
  </a>;
}
