import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { sfx } from "../utils/sfx";

const projectsData = [
  {
    id: "food-beverage-system",
    title: "FOOD & BEVERAGE ORDERING SYSTEM",
    image: "/project-screenshots/food-beverage-system.svg",
    description: `A web-based application designed to streamline the food and beverage ordering process for restaurants and cafes. It features a comprehensive menu catalog, user authentication, online ordering capabilities, and admin controls for managing orders and inventory. Built with HTML, CSS, JavaScript, PHP, and MySQL.`,
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    link: "",
    outcome: "Streamlined ordering workflow, centralized data management.",
  },
  {
    id: "crypto-landing-pages",
    title: "CRYPTO LANDING PAGES",
    image: "/project-screenshots/crypto-landing-pages.svg",
    description: `Created a responsive pre-launch website for a meme token project. The site presents token identity, planned utility, roadmap, community channels, and launch information before publication. Built to give prospective community members a clear place to learn about the project before its launch.`,
    techStack: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/ulangrahmad/website-owl",
    outcome: "Prepared a clear, responsive public-facing presence for an upcoming meme token launch.",
  },
  {
    id: "lycadesign",
    title: "LYCADESIGN INDONESIA WEBSITE",
    image: "/project-screenshots/lycadesign.svg",
    description: `A responsive website for LYCA Design Indonesia, showcasing their architecture and interior design portfolio. The site was built to provide an elegant and user-friendly experience for potential clients, highlighting their projects and services. Implemented using HTML, CSS, and JavaScript.`,
    techStack: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/ulangrahmad/Lycadedesign",
    outcome: "Enhanced online presence and showcase of design portfolio.",
  },
];

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      className="pixel-box space-y-3 cursor-pointer"
      onClick={() => { sfx.coin(); onClick(project); }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => sfx.hover()}
    >
      <img src={project.image} alt={project.title} className="w-full h-40 object-cover border-2 border-[var(--color-game-border)] mb-2" />
      <h3 className="text-2xl text-[var(--color-game-text-primary)]">{project.title}</h3>
      <p className="text-[var(--color-game-text-secondary)]">Tech: {project.techStack.join(" · ")}</p>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="pixel-box bg-[var(--color-game-panel)] max-w-2xl w-full p-6 space-y-4 relative overflow-y-auto max-h-[90vh]"
      >
        <button onClick={() => { sfx.error(); onClose(); }} className="absolute top-4 right-4 pixel-button">
          <X size={20} />
        </button>
        <img src={project.image} alt={project.title} className="w-full aspect-video object-contain border-2 border-[var(--color-game-border)] mb-4" />
        <h2 className="text-3xl text-[var(--color-game-text-primary)]">{project.title}</h2>
        <p className="text-[var(--color-game-text-secondary)] text-xl">{project.description}</p>
        <p className="text-[var(--color-game-text-primary)]">
          <span className="text-[var(--color-game-text-muted)]">Tech Stack:</span> {project.techStack.join(" · ")}
        </p>
        {project.outcome && (
          <p className="text-[var(--color-game-text-primary)]">
            <span className="text-[var(--color-game-text-muted)]">Outcome:</span> {project.outcome}
          </p>
        )}
        {project.link ? (
          <a href={project.link} target="_blank" rel="noreferrer" onClick={() => sfx.coin()} className="pixel-button pixel-button-yellow inline-flex items-center gap-2">
            VIEW PROJECT <ArrowRight size={16} />
          </a>
        ) : (
          <p className="text-[var(--color-game-text-muted)]">No public link available.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <div className="space-y-6">
      <h2 className="text-4xl text-[var(--color-game-yellow)]">► PROJECT GALLERY</h2>
      <p className="text-xl text-[var(--color-game-text-secondary)]">EXPLORE PAST MISSIONS AND ACHIEVEMENTS.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
        ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}