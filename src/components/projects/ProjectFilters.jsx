
import {useTranslation} from "../../i18n/context.js";
export default function ProjectFilters({ categories, active, onChange }) {
  const {t:tr}=useTranslation();

  return <div className="flex flex-wrap gap-2" aria-label={tr("Filtra i progetti")}>{categories.map((category) => <button key={category} type="button" aria-pressed={active === category} onClick={() => onChange(category)} className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${active === category ? "border-primary bg-primary text-background" : "border-border-strong bg-transparent text-foreground hover:border-primary/50"}`}>{tr(category)}</button>)}</div>;
}
