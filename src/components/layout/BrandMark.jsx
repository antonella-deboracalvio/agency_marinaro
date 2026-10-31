import { BRAND_NAME } from "../../lib/brand";
import './BrandMark.css';
import {useTranslation} from "../../i18n/context.js";
import MarinaroWordmark from '../ui/MarinaroWordmark';

const monogram='/brand/marinaro-monogram.svg';

export default function BrandMark(){
  const {t:tr}=useTranslation();
return <span className="brand-mark" aria-label={tr(BRAND_NAME)}><img className="brand-mark__symbol" src={monogram} width="96" height="96" fetchPriority="high" alt={tr("")} aria-hidden="true"/><span className="brand-mark__wordmark"><MarinaroWordmark className="brand-mark__name"/><span className="brand-mark__descriptor" aria-hidden="true">{tr("Digital Studio")}</span></span></span>;}
