import { ArrowUpRight, Expand } from "lucide-react";
import {useTranslation} from "../../i18n/context.js";


export default function ProjectCard({ project, onPreview, compact = false }) {
  const {t:tr}=useTranslation();

  const domain = project.liveUrl ? new URL(project.liveUrl).hostname : "Marinaro Digital Studio / anteprima";
  return <article className={`project-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/50 ${project.featured && !compact ? "md:col-span-2" : ""}`}>
    <div className={`m-3 overflow-hidden rounded-[1.2rem] border border-border bg-card ${compact ? "aspect-[4/3]" : project.featured ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
      <div className="flex h-10 items-center gap-3 border-b border-white/10 bg-muted px-4"><span className="flex gap-1.5" aria-hidden="true"><i className="h-2 w-2 rounded-full bg-[#ff6b5f]"/><i className="h-2 w-2 rounded-full bg-[#f5be4f]"/><i className="h-2 w-2 rounded-full bg-[#61c554]"/></span><span className="min-w-0 truncate text-[11px] text-foreground/45">{tr(domain)}</span></div>
      <img src={project.cover} alt={tr(`Anteprima del progetto ${project.title}`)} width="1200" height="800" loading="lazy" className="h-[calc(100%-2.5rem)] w-full object-cover object-top transition duration-500 group-hover:-translate-y-1" />
    </div>
    <div className={`flex flex-1 flex-col ${compact ? "px-5 pb-5" : "px-6 pb-7 pt-2"}`}>
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[.12em]"><span className="rounded-full bg-background px-3 py-1.5 text-foreground">{tr(project.status)}</span><span className="text-muted-foreground">{tr(project.category)}</span></div>
      <h3 className={`${compact ? "mt-4 text-2xl" : "mt-5 text-3xl"} font-semibold tracking-tight text-foreground`}>{tr(project.title)}</h3>
      {!compact && <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{tr(project.description)}</p>}
      <div className="mt-5 flex flex-wrap gap-2">{project.services.map(service => <span key={service} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{tr(service)}</span>)}</div>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6"><span className="text-sm text-muted-foreground">{tr(project.sector)} · {tr(project.year)}</span>{!compact && <div className="flex flex-wrap gap-2">{project.canEmbed && project.previewUrl && <button type="button" onClick={() => onPreview(project)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-background px-4 text-sm font-semibold text-foreground transition hover:bg-secondary"><Expand className="h-4 w-4"/>{tr("Anteprima")}</button>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-semibold text-foreground transition hover:border-primary"><ArrowUpRight className="h-4 w-4"/>{tr("Apri il sito")}</a>}</div>}</div>
    </div>
  </article>;
}
