import "./EditorialTitle.css";
import {useTranslation} from "../../i18n/context.js";


// Shared typography for WORK, SERVICES, BRANDS and METODO.
export default function EditorialTitle({ children, className = "", ...props }) {
  const {t:tr}=useTranslation();

  return <h2 className={`editorial-title ${className}`.trim()} {...props}>{tr(children)}</h2>;
}
