import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import EditorialTitle from "../ui/EditorialTitle";
import "./ProjectsTeaser.css";

const featuredProjects = projects.filter(project => project.homeFeatured);

export default function ProjectsTeaser() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects-teaser" className="projects-teaser" aria-labelledby="projects-teaser-title">
      <header className="projects-teaser__header">
        <EditorialTitle id="projects-teaser-title">Works</EditorialTitle>
        <Link className="projects-teaser__header-link" to="/progetti">
          Guarda tutti i progetti <ArrowUpRight aria-hidden="true" />
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
                  alt={`Anteprima del progetto ${project.title}`}
                  loading="lazy"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <motion.div
                className="projects-teaser__project-copy"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
                <strong>{project.result}</strong>
                <ArrowUpRight aria-hidden="true" />
              </motion.div>
            </>
          );

          return <Link key={project.id} className="projects-teaser__project" to={project.detailPath}>{projectContent}</Link>;
        })}
      </div>

    </section>
  );
}
