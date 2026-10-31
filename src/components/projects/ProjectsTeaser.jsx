import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import EditorialTitle from "../ui/EditorialTitle";
import "./ProjectsTeaser.css";
import {useTranslation} from "../../i18n/context.js";


const featuredProjects = projects.filter(project => project.homeFeatured);

export default function ProjectsTeaser() {
  const {t:tr}=useTranslation();

  const reduceMotion = useReducedMotion();

  return (
    <section id="projects-teaser" className="projects-teaser" aria-labelledby="projects-teaser-title">
      <header className="projects-teaser__header">
        <EditorialTitle id="projects-teaser-title">{tr("Works")}</EditorialTitle>
        <Link className="projects-teaser__header-link" to="/progetti">{tr("Guarda tutti i progetti ")}<ArrowUpRight aria-hidden="true" />
        </Link>
      </header>

      <div className="projects-teaser__list">
        {featuredProjects.map((project, index) => {
          const projectContent = (
            <>
              <div className="projects-teaser__media">
                <motion.img
                  src={project.cover}
                  srcSet={project.coverSmall ? `${project.coverSmall} 720w, ${project.cover} ${project.coverWidth}w` : undefined}
                  sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1440px) 48vw, 676px"
                  width={project.coverWidth}
                  height={project.coverHeight}
                  decoding="async"
                  alt={tr(`Anteprima del progetto ${project.title}`)}
                  loading="lazy"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
                {project.status === "Concept" && <span className="projects-teaser__concept">{tr("Concept · visual AI")}</span>}
              </div>
              <motion.div
                className="projects-teaser__project-copy"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <h3>{tr(project.title)}</h3>
                  <p>{tr(project.category)}{project.status === "Concept" && <> · {tr("Concept")}</>}</p>
                </div>
                <strong>{tr(project.result)}</strong>
                <ArrowUpRight aria-hidden="true" />
              </motion.div>
            </>
          );

          return <Link key={project.id} className="projects-teaser__project" to={project.detailPath}>{tr(projectContent)}</Link>;
        })}
      </div>

    </section>
  );
}
