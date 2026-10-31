import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { BRAND_NAME } from "../lib/brand";
import "./ProjectsPage.css";
import {useTranslation} from "../i18n/context.js";


const MotionLink = motion.create(Link);
const orderedProjects = [...projects.filter(project => project.homeFeatured), ...projects.filter(project => !project.homeFeatured)];

function ProjectRow({ project, index }) {
  const {t:tr}=useTranslation();

  const reduceMotion = useReducedMotion();
  const Card = project.detailPath ? MotionLink : project.liveUrl ? motion.a : motion.article;
  const destination = project.detailPath
    ? { to: project.detailPath, "aria-label": `Scopri il progetto ${project.title}` }
    : project.liveUrl
    ? { href: project.liveUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": `Apri il progetto ${project.title} in una nuova scheda` }
    : { "aria-labelledby": `project-title-${project.id}` };

  return (
    <Card id={project.id} className="editorial-project" {...destination}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
      <div className="editorial-project__media">
        <img src={project.cover} alt={tr(`Anteprima del progetto ${project.title}`)}
          srcSet={project.coverSmall ? `${project.coverSmall} 720w, ${project.cover} ${project.coverWidth}w` : undefined}
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1440px) 46vw, 646px"
          width={project.coverWidth} height={project.coverHeight} loading={index < 2 ? "eager" : "lazy"} decoding="async" />
        {(project.detailPath || project.liveUrl) && <span className="editorial-project__open" aria-hidden="true"><ArrowUpRight size={20} /></span>}
      </div>
      <div className="editorial-project__identity">
        <p>{tr(project.title)}</p>
        <span>{tr(project.category)}<span aria-hidden="true"> · </span>{tr(project.status)}</span>
      </div>
      <h2 id={`project-title-${project.id}`} className="editorial-project__title">{tr(project.result)}</h2>
      <p className="editorial-project__description">{tr(project.description)}</p>
    </Card>
  );
}

export default function ProjectsPage() {
  const {t:tr}=useTranslation();

  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const previous = document.title;
    document.title = `Progetti — ${BRAND_NAME}`;
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="projects-editorial">
      <header className="projects-editorial__hero">
        <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}>{tr("Works")}</motion.h1>
        <p>{tr("Una selezione di siti, identità e strumenti digitali.")}</p>
      </header>
      <section id="project-list" className="projects-editorial__list" aria-label={tr("Elenco dei progetti")}>
        {orderedProjects.map((project, index) => <ProjectRow key={project.id} project={project} index={index} />)}
      </section>
      <section className="projects-editorial__closing" aria-labelledby="projects-next-title">
        <h2 id="projects-next-title">{tr("Il prossimo")}<br /><span>{tr("potrebbe essere il tuo.")}</span></h2>
        <Link to="/contatti">{tr("Parliamone ")}<ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
