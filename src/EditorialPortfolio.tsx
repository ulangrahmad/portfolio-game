import React, { useState, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PointMaterial, Preload } from "@react-three/drei";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";

// 3D Icosahedron wireframe
function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    // Subtle float
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.8, 0]} />
        <meshBasicMaterial color="#C68A2D" wireframe transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

// Particle Network
function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const [positions] = useState(() => {
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200 * 3; i++) pos[i] = (Math.random() - 0.5) * 15;
    return pos;
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#C68A2D"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </points>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <FloatingShape />
      <Particles />
      <Preload all />
    </Canvas>
  );
}

// Sections & App below...

// Utility: smooth scroll to section
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden bg-[#171717]"
    >
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-6">
        <div className="max-w-3xl">
          <p className="font-manrope text-[#C68A2D] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Depok · Indonesia
          </p>
          <h1 className="font-fraunces text-6xl md:text-8xl text-[#F5F3EE] font-bold mb-6 tracking-tight leading-[0.9]">
            Ulang Rahmad<span className="text-[#C68A2D]">.</span>
          </h1>
          <p className="font-manrope text-[#B5B5B5] text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            From IT support to Cybersecurity. I specialize in threat detection (SOC/Blue Team) 
            while maintaining a high standard for functional web interfaces.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              onClick={(e) => { e.preventDefault(); scrollToSection("experience"); }}
              className="px-6 py-3 font-manrope font-semibold text-sm text-[#171717] bg-[#C68A2D] rounded-full hover:bg-[#d4b27a] transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection("projects"); }}
              className="px-6 py-3 font-manrope font-semibold text-sm text-[#F5F3EE] border border-[#3d3d3d] rounded-full hover:border-[#C68A2D] transition-colors"
            >
              View Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Experience Section (Timeline)
function Experience() {
  const experiences = [
    {
      id: "experience1",
      title: "Warehouse Administrator",
      company: "PT Kakha Berdaya Bersama",
      location: "Jakarta (Jan–Mar 2026)",
      description: (
        <div className="space-y-2 font-manrope text-[#B5B5B5] text-sm leading-relaxed">
          <p>• Managed inventory and stock audits using simple ERP.</p>
          <p>• Ensured accurate inbound/outbound tracking for daily operations.</p>
        </div>
      ),
      skills: ["Excel OLE", "Subscription/stock aware", "Warehouse Ops"],
    },
    {
      id: "experience2",
      title: "IT Support Staff",
      company: "PT. Lawu Cakra Sarana",
      location: "Depok (Jan–Dec 2023)",
      description: (
        <div className="space-y-2 font-manrope text-[#B5B5B5] text-sm leading-relaxed">
          <p>• Troubleshot Windows and simple network issues across multiple computers.</p>
          <p>• Helped staff with basic applications and hardware (keyboard/monitor).</p>
          <p>• Maintained offline security by regularly updating endpoints, installing windows wazuh linux dns.</p>
        </div>
      ),
      skills: ["Windows 10/11", "LAN", "Basic Security", "Desktop Support"],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-[#171717]">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-fraunces font-bold text-[#F5F3EE] mb-12 tracking-tight">
          Experience
        </h2>
        <div className="relative space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative pl-8 before:absolute before:left-0 before:top-1 before:h-px before:w-8 before:bg-[#C68A2D]"
            >
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-2xl font-fraunces font-semibold text-[#F5F3EE]">{exp.title}</h3>
                <span className="mt-2 sm:mt-0 text-sm font-manrope text-[#B5B5B5]">{exp.location}</span>
              </div>
              <p className="mb-3 font-manrope text-[#C68A2D] text-sm uppercase tracking-wide">
                {exp.company}
              </p>
              {exp.description}
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs font-medium text-[#1a1a1a] bg-[#C68A2D] rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section (Cards)
function Projects() {
  const projects = [
    {
      id: "project1",
      title: "Food & Beverage Ordering System",
      description: (
        <p className="font-manrope text-[#B5B5B5] text-base leading-relaxed">
          Web-based ordering for restaurants featuring menu catalog, customer flow, authentication, and admin
          controls.
        </p>
      ),
      stacks: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      link: "#",
    },
    {
      id: "project2",
      title: "Cryptocurrency Landing Page",
      description: (
        <p className="font-manrope text-[#B5B5B5] text-base leading-relaxed">
          Pre-launch website for a meme token project. Standardised token identity and roadmap, no live price.
        </p>
      ),
      stacks: ["HTML", "CSS", "JavaScript", "React"],
      link: "#",
    },
    {
      id: "project3",
      title: "LYCAD ESIGN PORTFOLIO",
      description: (
        <p className="font-manrope text-[#B5B5B5] text-base leading-relaxed">
          Responsive portofolio for LYCA Design Indonesia – architecture and interior design showcase.
        </p>
      ),
      stacks: ["HTML", "CSS", "JavaScript", "React"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-[#171717]">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-fraunces font-bold text-[#F5F3EE] mb-12 tracking-tight">
          Selected Work
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded border border-[#3d3d3d] bg-[#202020] hover:border-[#C68A2D]"
            >
              <div className="border-b border-[#3d3d3d] bg-[#2a2a2a] px-4 py-2">
                <h3 className="font-fraunces text-lg font-semibold text-[#F5F3EE]">{project.title}</h3>
              </div>
              <div className="p-4 space-y-3">
                {project.description}
                <div className="flex flex-wrap gap-2">
                  {project.stacks.map((stack) => (
                    <span
                      key={stack}
                      className="inline-block rounded px-2 py-1 text-xs font-medium text-[#1a1a1a] bg-[#C68A2D]"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Skills Section (Tags)
function Skills() {
  const skills = [
    {
      id: "skills1",
      headline: "Cybersecurity (in progress)",
     -tags: ["SIEM", "Wazuh", "Suricata", "Wireshark", "Nmap", "Threat Detection", "Incident Response"],
    },
    {
      id: "skills2",
      headline: "Web Development (mastered)",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "MySQL", "React (basic)"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-[#171717]">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-fraunces font-bold text-[#F5F3EE] mb-12 tracking-tight">
          Skills
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {skills.map((category) => (
            <div key={category.id}>
              <h3 className="mb-4 font-fraunces text-xl font-semibold text-[#C68A2D] text-center">
                {category.headline}
              </h3>
              <div className="flex flex-wrap gap-2 font-manrope text-sm text-[#B5B5B5]">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded px-2 py-1 bg-[#2a2a2a] text-[#B5B5B5] border border-[#3d3d3d]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#171717]">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-fraunces font-bold text-[#F5F3EE] mb-8 tracking-tight">
          Get in touch
        </h2>
        <p className="font-manrope text-[#B5B5B5] text-lg mb-8">
          Open for SOC junior roles, blue-team learning paths, and small web projects with a clear brief.
        </p>
        <div className="flex flex-col items-center gap-6">
          <a
            href="https://github.com/ulangrahmad"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 font-manrope font-medium text-sm text-[#F5F3EE] bg-[#202020] border border-[#3d3d3d] rounded hover:border-[#C68A2D] hover:text-[#C68A2D] focus:outline-none focus:ring-2 focus:ring-[#C68A2D] focus:ring-offset-2 focus:ring-offset-[#171717] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="M9 19c-5 1.5-5 2.5-7 2.5s-2-1-2-1c0-2 2-2 2-2s2-1 7-1 7 1 7 1 2 1 2 1-2 0-2 2 0 0-7-2.5z"/>
              <path d="M9 10l2 5-2 5m-2-5l-2 5"/>
              <path d="M9 10l2 5-2 5m0-10l2-5-2-5"/>
              <path d="M5 19c0-3 7-10 7-10s7 7 7 10"/>
              <path d="M5 19c0-3 7-10 7-10s7 7 7 10"/>
            </svg>
            github.com/ulangrahmad
          </a>
          <a
            href="https://www.linkedin.com/in/ulang-rahmad-4a565b377/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 font-manrope font-medium text-sm text-[#F5F3EE] bg-[#202020] border border-[##3d3d3d] rounded hover:border-[#C68A2D] hover:text-[#C68A2D] focus:outline-none focus:ring-2 focus:ring-[#C68A2D] focus:ring-offset-2 focus:ring-offset-[#171717] transition-colors"
          >
            Ulang Rahmad Choliq
          </a>
        </div>
      </div>
    </section>
  );
}

// Navigation (simplified)
function SimpleNav() {
  return (
    <nav className="fixed top-0 z-50 border-b border-[#2a2a2a] bg-[#171717]/90 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#hero" className="font-fraunces font-bold text-lg text-[#F5F3EE]">
            Ulang Rahmad.
          </a>
          <div className="space-x-6 font-manrope text-sm text-[#B5B5B5]">
            <a href="#experience" className="hover:text-[#C68A2D]">
              Experience
            </a>
            <a href="#projects" className="hover:text-[#C68A2D]">
              Projects
            </a>
            <a href="#skills" className="hover:text-[#C68A2D]">
              Skills
            </a>
            <a href="#contact" className="hover:text-[#C68A2D]">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Direktive: Section listing

// THEME palettes
const PALETTE = {
  bg: "#171717",
  surface: "#202020",
  text: "#F5F3EE",
  muted: "#B5B5B5",
  accent: "#C68A2D",
  border: "#3d3d3d",
} as const;

// Main App
function App({ onMouseMove }: { onMouseMove: (e: React.MouseEvent) => void }) {
  const [theme, setTheme] = useState<"dark">("dark");

  return (
    <main className="min-h-screen bg-[#171717] text-[#F5F3EE] font-manrope selection:bg-[#C68A2D] selection:text-[#1a1a1a]">
      <SimpleNav />
      <Hero onMouseMove={onMouseMove} />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}

// Mount
const container = document.getElementById("root");
if (!container) throw new Error("missing root container.");
const root = createRoot(container);
root.render(<App onMouseMove={(e) => {}} />);