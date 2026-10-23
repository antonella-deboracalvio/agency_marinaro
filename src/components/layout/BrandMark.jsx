import { BRAND_NAME } from "../../lib/brand";
import monogram from '../../assets/brand/marinaro-monogram.png';
import './BrandMark.css';
export default function BrandMark(){return <span className="brand-mark" aria-label={BRAND_NAME}><img className="brand-mark__symbol" src={monogram} width="795" height="770" alt="" aria-hidden="true"/><span className="brand-mark__wordmark"><span className="brand-mark__name" aria-hidden="true">Marinaro</span><span className="brand-mark__descriptor" aria-hidden="true">Digital Studio</span></span></span>;}
