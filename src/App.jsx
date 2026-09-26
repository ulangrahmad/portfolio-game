import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Download, Menu, X } from "lucide-react";
import Reveal from "./components/Reveal";
import ProjectGallery, { projectsData } from "./components/ProjectGallery";
import SimpleGame from "./components/SimpleGame";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#timeline", label: "Timeline" },
  { href: "#play", label: "Play" },
  { href: "#contact", label: "Contact" },
];

const skills = [
  {
    name: "Cybersecurity",
    detail: "Wazuh, SIEM concepts, Suricata, Wireshark, Nmap, SOC fundamentals",
  },
  {
    name: "Systems & network",
    detail: "Windows and Linux admin, LAN/Wi-Fi troubleshooting, endpoint maintenance",
  },
  {
    name: "Programming",
    detail: "Python, SQL, HTML/CSS, JavaScript, PHP, React",
  },
  {
    name: "Tools",
    detail: "Git, GitHub, VS Code, Docker basics",
  },
];

const timeline = [
  {
    period: "2018 — 2023",
    title: "Gunadarma University",
    detail: "Bachelor of Information Systems · GPA 3.17/4.00.",
  },
  {
    period: "2020 — 2021",
    title: "Food & Beverage Ordering System",
    detail: "Built ordering, menu, auth, and admin flows with HTML, CSS, JavaScript, PHP, and MySQL.",
  },
  {
    period: "Jan 2023 — Dec 2023",
    title: "IT Support · PT. Lawu Cakra Sarana",
    detail: "Windows administration, hardware and network troubleshooting, endpoint security maintenance.",
  },
  {
    period: "Feb 2024 — Jul 2024",
    title: "Meme token web development",
    detail: "Pre-launch sites for token identity, roadmap, and community information.",
  },
  {
    period: "2025",
    title: "Cybersecurity skill path",
    detail: "Google Cybersecurity Professional Certificate and Introduction to SOC training.",
  },
  {
    period: "Jan 2026 — Mar 2026",
    title: "Warehouse Administrator",
    detail: "Inventory, ERP workflows, and stock audits at PT Kakha Berdaya Bersama.",
  },
  {
    period: "2026 — now",
    title: "Home SOC lab",
    detail: "Cisco Introduction to Cybersecurity; building Wazuh, Suricata, and log monitoring practice lab.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const featured = projectsData.find((p) => p.featured);
  const rest = projectsData.filter((p) => !p.featured);

  return (
    <div>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[var(--color-gold)] focus:text-black focus:px-3 focus:py-2 focus:rounded-[8px]"
      >
        Skip to content
      </a>

      <header className="nav">
        <div className="site-shell nav-inner">
          <a href="#top" className="nav-brand">
            Ulang Rahmad
          </a>
          <nav className="nav-links" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="/cv-ulang-rahmad-choliq.pdf" className="nav-cta" download>
              <Download size={14} /> CV
            </a>
            <button
              type="button"
              className="btn btn-ghost md:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="site-shell pb-4 md:hidden flex flex-col gap-3 border-t border-[var(--color-border)] pt-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-[var(--color-soft)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="main">
        <section id="top" className="site-shell hero">
          <Reveal className="hero-copy">
            <p className="section-label">Depok, Indonesia</p>
            <h1>
              Ulang Rahmad<span>.</span>
            </h1>
            <p className="hero-lead">
              Information Systems graduate moving from IT support into SOC and blue-team work.
              I build practical web tools on the side and practice detection skills in a home lab.
            </p>
            <div className="hero-meta">
              <span>SOC / Blue Team focus</span>
              <span>Web development</span>
              <span>Gunadarma University · 2023</span>
            </div>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                Selected work <ArrowDownRight size={16} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Contact
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="about-photo">
              <img src="/avatar.jpg" alt="Ulang Rahmad Choliq outdoors" />
            </div>
          </Reveal>
        </section>

        <hr className="rule site-shell" />

        <section id="work" className="section site-shell">
          <Reveal>
            <p className="section-label">Selected work</p>
            <h2 className="section-title">Projects built around real constraints</h2>
            <p className="section-lead">
              Each project started from a concrete problem — slow ordering, a studio without a clear portofolio site,
              or a token project that needed a pre-launch page before anything public existed.
            </p>
          </Reveal>

          <div className="projects-stack">
            {featured && (
              <Reveal className="project-card featured">
                <div className="project-media">
                  <img src={featured.image} alt="" />
                </div>
                <div className="project-body">
                  <p className="project-kicker">Featured · {featured.year}</p>
                  <h3>{featured.title}</h3>
                  <p className="project-problem">
                    <strong>Problem. </strong>
                    {featured.problem}
                  </p>
                  <p className="project-problem">
                    <strong>What I did. </strong>
                    {featured.solution}
                  </p>
                  <div className="project-meta">
                    <span>{featured.role}</span>
                    <span>{featured.techStack.join(" · ")}</span>
                  </div>
                  <p className="project-problem">{featured.outcome}</p>
                </div>
              </Reveal>
            )}

            <div className="grid gap-6">
              {rest.map((project, index) => (
                <Reveal key={project.id} delay={0.05 * (index + 1)} className={`project-card ${index % 2 === 1 ? "reverse" : ""}`}>
                  <div className="project-media">
                    <img src={project.image} alt="" />
                  </div>
                  <div className="project-body">
                    <p className="project-kicker">{project.year} · {project.role}</p>
                    <h3>{project.title}</h3>
                    <p className="project-problem">
                      <strong>Problem. </strong>
                      {project.problem}
                    </p>
                    <p className="project-problem">{project.solution}</p>
                    <div className="project-meta">
                      <span>{project.techStack.join(" · ")}</span>
                    </div>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer" className="project-link inline-flex items-center gap-1">
                        Repository <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <span className="text-[var(--color-muted)] text-sm">Private / no public link</span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section site-shell pt-0">
          <Reveal>
            <p className="section-label">Gallery</p>
            <h2 className="section-title">Visual notes from the work</h2>
            <p className="section-lead">
              Stylized previews — click a card for problem, approach, and outcome.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <ProjectGallery />
          </Reveal>
        </section>

        <hr className="rule site-shell" />

        <section id="about" className="section site-shell">
          <div className="about-grid">
            <Reveal>
              <div className="about-photo">
                <img src="/avatar.jpg" alt="Portrait of Ulang Rahmad Choliq" />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="section-label">About</p>
              <h2 className="section-title">From support tickets to detection practice</h2>
              <div className="about-copy">
                <p>
                  I started in IT support — fixing endpoints, untangling network issues, and keeping Windows
                  environments usable for people who just needed things to work. That day-to-day work pushed me
                  toward security: once you see how systems fail, you start caring how they get abused.
                </p>
                <p>
                  Now I am training for SOC and blue-team roles. I study SIEM and IDS tooling, run a home lab with
                  Wazuh and Suricata, and keep writing web interfaces when a project needs a clear front door.
                  I prefer small, readable systems over flashy demos.
                </p>
              </div>
              <dl className="about-facts">
                <div className="fact">
                  <dt>Focus</dt>
                  <dd>SOC analyst / blue team</dd>
                </div>
                <div className="fact">
                  <dt>Location</dt>
                  <dd>Depok, Indonesia</dd>
                </div>
                <div className="fact">
                  <dt>Education</dt>
                  <dd>Gunadarma University · Information Systems · 2023</dd>
                </div>
                <div className="fact">
                  <dt>Also</dt>
                  <dd>Web development for product and portofolio sites</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="section site-shell pt-0">
          <Reveal>
            <p className="section-label">Skills</p>
            <h2 className="section-title">Tools I actually use</h2>
          </Reveal>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <Reveal key={skill.name} delay={i * 0.04} className="skill-card">
                <h3>{skill.name}</h3>
                <p>{skill.detail}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <hr className="rule site-shell" />

        <section id="timeline" className="section site-shell">
          <Reveal>
            <p className="section-label">Timeline</p>
            <h2 className="section-title">Path so far</h2>
            <p className="section-lead">
              Education, support work, product sites, and the current move into cybersecurity practice.
            </p>
          </Reveal>
          <div className="timeline">
            {timeline.map((item, i) => (
              <Reveal key={item.period + item.title} delay={i * 0.03} className="timeline-item">
                <time>{item.period}</time>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="play" className="section site-shell pt-0">
          <Reveal>
            <p className="section-label">Aside</p>
            <h2 className="section-title">A small game</h2>
            <p className="section-lead">
              Optional break. Arrow keys or on-screen controls on mobile.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="game-panel">
            <SimpleGame />
          </Reveal>
        </section>

        <hr className="rule site-shell" />

        <section id="contact" className="section site-shell">
          <Reveal>
            <p className="section-label">Contact</p>
            <h2 className="section-title">Say hello</h2>
            <p className="section-lead">
              Open to SOC junior roles, blue-team learning paths, and small web projects with a clear brief.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="contact-list">
            <a className="contact-row" href="mailto:ulangrahmad121@gmail.com">
              <span>Email</span>
              <span>ulangrahmad121@gmail.com</span>
            </a>
            <a
              className="contact-row"
              href="https://www.linkedin.com/in/ulang-rahmad-choliq-4a565b377/"
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              <span>Ulang Rahmad Choliq</span>
            </a>
            <a className="contact-row" href="https://github.com/ulangrahmad" target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <span>github.com/ulangrahmad</span>
            </a>
            <a className="contact-row" href="/cv-ulang-rahmad-choliq.pdf" download>
              <span>Resume</span>
              <span>Download CV.pdf</span>
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="site-shell footer">
        <span>© {new Date().getFullYear()} Ulang Rahmad Choliq</span>
        <span>Editorial layout · v2</span>
      </footer>
    </div>
  );
}
