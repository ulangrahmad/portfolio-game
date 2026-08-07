import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projectsData = [
  {
    id: "food-beverage-system",
    title: "Food & Beverage Ordering System",
    image: "/project-screenshots/food-beverage-system.svg",
    year: "2020–2021",
    role: "Full-stack",
    problem:
      "Paper menus and verbal order handoffs made service slow and error-prone during peak hours.",
    solution:
      "Built a web app with menu catalog, customer ordering flow, authentication, and admin controls for orders and inventory.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    link: "",
    outcome: "Centralized order handling and reduced manual coordination between kitchen and front counter.",
    featured: true,
  },
  {
    id: "crypto-landing-pages",
    title: "Meme Token Pre-launch Site",
    image: "/project-screenshots/crypto-landing-pages.svg",
    year: "2024",
    role: "Frontend",
    problem:
      "The project needed a clear public page before launch so people could understand the token, roadmap, and community channels.",
    solution:
      "Designed and built a responsive pre-launch website focused on token identity, roadmap stages, and community entry points — no live price or market widgets.",
    techStack: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/ulangrahmad/website-owl",
    outcome: "Gave the upcoming token a clean, readable presence before publication.",
    featured: false,
  },
  {
    id: "lycadesign",
    title: "LYCA Design Indonesia",
    image: "/project-screenshots/lycadesign.svg",
    year: "2023",
    role: "Frontend",
    problem:
      "An architecture studio needed a portfolio site that presented projects cleanly without heavy CMS overhead.",
    solution:
      "Built a responsive portfolio website for architecture and interior work, with project showcase and contact paths for prospective clients.",
    techStack: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/ulangrahmad/Lycadedesign",
    outcome: "Clearer online portfolio for studio work and client inquiries.",
    featured: false,
  },
];

function Modal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-modal-title"
      >
        <div className="flex justify-between items-start gap-4 mb-3">
          <p className="project-kicker">{project.year} · {project.role}</p>
          <button type="button" className="btn btn-ghost" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <img src={project.image} alt="" />
        <h3 id="gallery-modal-title">{project.title}</h3>
        <p>
          <strong>Problem. </strong>
          {project.problem}
        </p>
        <p>
          <strong>Approach. </strong>
          {project.solution}
        </p>
        <p>
          <strong>Outcome. </strong>
          {project.outcome}
        </p>
        <p className="project-meta">Tech: {project.techStack.join(" · ")}</p>
        {project.link ? (
          <a href={project.link} target="_blank" rel="noreferrer" className="project-link inline-flex items-center gap-1">
            View repository <ArrowUpRight size={14} />
          </a>
        ) : (
          <p className="text-[var(--color-muted)] text-sm">No public repository.</p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ProjectGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="gallery-grid">
        {projectsData.map((project) => (
          <button
            key={project.id}
            type="button"
            className="gallery-card"
            onClick={() => setSelected(project)}
          >
            <img src={project.image} alt="" />
            <div className="gallery-card-body">
              <h3>{project.title}</h3>
              <p>{project.year} · {project.role}</p>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

export { projectsData };
