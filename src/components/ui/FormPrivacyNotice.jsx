import { useTranslation } from "../../i18n/context";
import { hasPublishedPrivacy, legalPublication } from "../../data/legal";
import { whatsappHref } from "../../lib/contact-channels";

export default function FormPrivacyNotice() {
  const { t } = useTranslation();
  return <p className="form-privacy-notice" role="note">
    {hasPublishedPrivacy() ? <>{t("Usiamo i dati solo per gestire la tua richiesta. ")}<a href={legalPublication.privacyNoticeUrl} target="_blank" rel="noopener noreferrer">{t("Leggi l’informativa privacy")}</a></>
      : <>{t("Il modulo non è ancora attivo. ")}<a href={whatsappHref()} target="_blank" rel="noopener noreferrer">{t("Scrivici su WhatsApp")}</a></>}
  </p>;
}
