import { useState, useEffect } from "react";
import { Play, Shield, Terminal, Trophy, User, ArrowRight, Heart, Map, Mail, Link, Image } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import PixelPortrait from "./components/PixelPortrait";
import SimpleGame from "./components/SimpleGame";
import { sfx } from "./utils/sfx";
import PixelMonster from "./components/PixelMonster";
import ProjectGallery from "./components/ProjectGallery"; // NEW

// ====== Animated Helpers ======

function BlinkCursor() {
  const reduce = useReducedMotion();
  return (
    <motion.span
      animate={reduce ? {} : { opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
      className="inline-block ml-1"
    >
      █
    </motion.span>
  );
}

function FloatingStar({ delay = 0, x = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute text-[var(--color-game-yellow)] pointer-events-none text-2xl"
      style={{ left: `${x}%`, top: "-5%" }}
      animate={reduce ? {} : { y: ["0%", "110vh"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: "linear" }}
    >
      ✦
    </motion.div>
  );
}

function BouncingSprite({ size = 48, x = 50, delay = 0, variant = "ghost" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, bottom: "8%" }}
      animate={reduce ? {} : { y: [0, -30, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <PixelMonster size={size} variant={variant} />
    </motion.div>
  );
}

function PressStart() {
  return null;
}

function HPBar({ value = 100, flash = false }) {
  const reduce = useReducedMotion();
  return (
    <div className="pixel-bar-bg w-48 relative">
      <motion.div
        className="pixel-bar-fill"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      ></motion.div>
      {flash && !reduce && (
        <motion.div
          className="absolute inset-0 bg-red-500 opacity-70"
          animate={{ opacity: [0.7, 0, 0.7, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </div>
  );
}


function XPBar({ value = 75 }) {
  return (
    <div className="pixel-bar-bg w-48" style={{ background: "#110826" }}>
      <motion.div
        className="h-full"
        style={{ background: "var(--color-game-cyan)" }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, delay: 0.3 }}
      ></motion.div>
    </div>
  );
}

function ScreenTransition({ children, keyId }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={keyId}
      initial={reduce ? false : { opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      onAnimationStart={() => sfx.appear()}
    >
      {children}
    </motion.div>
  );
}

function StatRow({ label, value }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      onMouseEnter={() => sfx.hover()}
      className="flex gap-4 border-b-2 border-dashed border-white/30 pb-2"
    >
      <span className="text-[var(--color-game-yellow)]">► {label}:</span>
      <span>{value}</span>
    </motion.div>
  );
}

// ====== MAIN APP ======

export default function App() {
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState("menu");
  const [loadingGame, setLoadingGame] = useState(false);
  const [hp, setHp] = useState(100);

  useEffect(() => {
    if (ready) {
      const interval = setInterval(() => {
        setHp(prev => Math.max(0, prev - Math.floor(Math.random() * 5)));
      }, 5000); // Simulate HP decay

      return () => clearInterval(interval);
    }
  }, [ready]);

  const handleStart = () => {
    sfx.start();
    setReady(true);
  };

  const handleTab = (id) => {
    sfx.click();
    setScreen(id);
    if (id === 'game') {
      setLoadingGame(true);
      setTimeout(() => setLoadingGame(false), 1500); // Simulate loading time
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto relative overflow-hidden grid-bg">
      <FloatingStar x={10} delay={0} />
      <FloatingStar x={30} delay={2} />
      <FloatingStar x={55} delay={4} />
      <FloatingStar x={75} delay={1} />
      <FloatingStar x={90} delay={3} />

      {ready && (
        <>
          <BouncingSprite x={12} delay={0} variant="ghost" />
          <BouncingSprite x={85} delay={0.5} variant="monster" />
          <BouncingSprite x={50} delay={1} variant="coin" />
        </>
      )}

      {/* READY SCREEN */}
      {!ready && (
        <motion.div
          className="min-h-screen absolute inset-0 flex flex-col items-center justify-center p-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="pixel-box pixel-box-pink max-w-md w-full text-center space-y-6"
            initial={{ scale: 0.8, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onAnimationComplete={() => sfx.appear()}
          >
            <div className="flex justify-center mb-4">
              <PixelPortrait src="/avatar.jpg" size={120} />
            </div>
            <motion.h1
              className="text-4xl text-[var(--color-game-yellow)] text-pixel-shadow"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LET'S PLAY GAME
            </motion.h1>
            <p className="text-2xl">ARE YOU READY ?</p>
            <div className="flex justify-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => sfx.hover()}
                onClick={handleStart}
                className="pixel-button pixel-button-yellow"
              >
                ► YES
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => sfx.hover()}
                onClick={() => {
                  sfx.error();
                  alert("GAME OVER");
                }}
                className="pixel-button"
              >
                ✖ NO
              </motion.button>
            </div>
            <PressStart />
          </motion.div>
        </motion.div>
      )}

      {ready && (
        <>
          <motion.div
            className="pixel-box flex justify-between items-center flex-wrap gap-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <PixelPortrait src="/avatar.jpg" size={48} />
              <span>ULNGRHMD</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="text-[var(--color-game-pink)]" size={20} />
              <span>HP</span>
              <HPBar value={hp} flash={hp < 20} /> {/* HP bar flash */}
            </div>
            <div className="flex items-center gap-3">
              <span>XP</span>
              <XPBar value={75} />
            </div>
          </motion.div>

          <motion.div
            className="flex gap-3 justify-center flex-wrap py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { id: "menu", label: "START", icon: Play },
              { id: "game", label: "PLAY GAME", icon: Play },
              { id: "about", label: "CHARACTER", icon: User },
              { id: "skills", label: "STATS", icon: Shield },
              { id: "roadmap", label: "ROADMAP", icon: Map },
              { id: "projects", label: "QUESTS", icon: Trophy },
              { id: "gallery", label: "GALLERY", icon: Image },
              { id: "contact", label: "CONTACT", icon: Terminal },
            ].map((tab, i) => {
              const Icon = tab.icon;
              const active = screen === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 2 }}
                  onMouseEnter={() => sfx.hover()}
                  onClick={() => handleTab(tab.id)}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`pixel-button flex items-center gap-2 ${active ? "pixel-button-yellow" : ""}`}
                >
                  <Icon size={18} />
                  {tab.label}
                </motion.button>
              );
            })}
          </motion.div>

          <div className="mt-6">
            {screen === "menu" && (
              <ScreenTransition keyId="menu">
                <div className="pixel-box text-center space-y-6 py-16 relative">
                  <motion.h2
                    className="text-6xl text-[var(--color-game-pink)] text-pixel-shadow"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    WELCOME
                  </motion.h2>
                  <p className="text-2xl max-w-xl mx-auto">
                    INFORMATION SYSTEMS GRADUATE BUILDING A CAREER IN CYBERSECURITY
                    <BlinkCursor />
                  </p>
                  <div className="pt-4 flex gap-4 justify-center flex-wrap">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => sfx.hover()}
                      onClick={() => sfx.coin()}
                      href="/cv-ulang-rahmad-choliq.pdf"
                      download
                      className="pixel-button pixel-button-yellow"
                    >
                      ► DOWNLOAD CV
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => sfx.hover()}
                      onClick={() => handleTab("projects")}
                      className="pixel-button"
                    >
                      ► VIEW QUESTS
                    </motion.button>
                  </div>
                </div>
              </ScreenTransition>
            )}

            {screen === "game" && (
              <ScreenTransition keyId="game">
                <div className="pixel-box text-center space-y-6 py-8">
                  <h2 className="text-4xl text-[var(--color-game-green)] text-pixel-shadow">► MINI GAME</h2>
                  {loadingGame ? (
                    <motion.p
                      className="text-2xl text-[var(--color-game-yellow)]"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      INITIALIZING...
                    </motion.p>
                  ) : (
                    <SimpleGame />
                  )}
                </div>
              </ScreenTransition>
            )}

            {screen === "about" && (
              <ScreenTransition keyId="about">
                <div className="pixel-box space-y-6">
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <h2 className="text-4xl text-[var(--color-game-cyan)]">► CHARACTER SELECT</h2>
                    <p className="text-xl text-[var(--color-game-yellow)]">STATUS: READY</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
                    <motion.div
                      className="border-4 border-[var(--color-game-border)] bg-black flex justify-center items-end overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                    >
                      <PixelPortrait src="/avatar.jpg" size={320} portrait />
                    </motion.div>

                    <div className="space-y-4 text-xl">
                      <div className="pixel-box p-4 border-[var(--color-game-cyan)]">
                        <p className="text-[var(--color-game-yellow)] mb-2">► PLAYER DATA</p>
                        <StatRow label="CLASS" value="SOC ANALYST / WEB DEV" />
                        <StatRow label="LOCATION" value="DEPOK, INDONESIA" />
                        <StatRow label="LEVEL" value="GRADUATE (2023)" />
                        <StatRow label="GUILD" value="GUNADARMA UNIVERSITY" />
                      </div>
                      <div className="pixel-box p-4 border-[var(--color-game-pink)]">
                        <p className="text-[var(--color-game-yellow)] mb-2">► BIO</p>
                        <p>IT SUPPORT BACKGROUND TRANSITIONING INTO A CYBERSECURITY THREAT DETECTOR. I HAVE HANDS-ON EXPERIENCE IN WINDOWS ADMINISTRATION, WAZUH SIEM, SURICATA IDS, AND NETWORK SECURITY MONITORING. BEYOND SECURITY, I AM A FULL-STACK WEB DEVELOPER WHO ENJOYS BUILDING INTERACTIVE, PIXEL-ART INSPIRED APPLICATIONS. CURRENTLY FOCUSED ON BUILDING A HOMELAB ENVIRONMENT TO MASTER THREAT HUNTING AND LOG ANALYSIS WORKFLOWS.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] pt-2">
                    <article className="border-2 border-[var(--color-game-border)] p-4 bg-[var(--color-game-card)] space-y-2">
                      <p className="text-[var(--color-game-text-secondary)]">► WEB APPLICATION DEVELOPMENT</p>
                      <h3 className="text-2xl text-[var(--color-game-text-primary)]">FOOD & BEVERAGE ORDERING SYSTEM</h3>
                      <p className="text-xl text-[var(--color-game-text-secondary)]">A comprehensive web-based application designed to streamline restaurant and cafe operations. It features menu categorization, a secure online ordering workflow, user authentication, and robust admin controls for managing orders and inventory in real time.</p>
                    </article>
                    <div className="grid gap-4">
                      <article className="border-2 border-[var(--color-game-border)] p-4 bg-[var(--color-game-card)] space-y-2">
                        <p className="text-[var(--color-game-text-secondary)]">► PROJECT</p>
                        <h3 className="text-2xl text-[var(--color-game-text-primary)]">LYCADESIGN</h3>
                        <p className="text-xl text-[var(--color-game-text-secondary)]">Architecture and interior design website for LYCA Design Indonesia.</p>
                      </article>
                      <article className="border-2 border-[var(--color-game-border)] p-4 bg-[var(--color-game-card)] space-y-2">
                        <p className="text-[var(--color-game-text-secondary)]">► PROJECT</p>
                        <h3 className="text-2xl text-[var(--color-game-text-primary)]">CRYPTO LANDING PAGE</h3>
                        <p className="text-xl text-[var(--color-game-text-secondary)]">Pre-launch website for a meme token project, covering token identity, roadmap, and launch information.</p>
                      </article>
                    </div>
                  </div>
                </div>
              </ScreenTransition>
            )}

            {screen === "skills" && (
              <ScreenTransition keyId="skills">
                <div className="pixel-box space-y-6">
                  <h2 className="text-4xl text-[var(--color-game-pink)]">► SKILL TREE</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl">
                    {[
                      { name: "CYBERSECURITY", val: "WAZUH · SIEM · SURICATA · WIRESHARK · NMAP", color: "pink" },
                      { name: "SYSTEM & NETWORK", val: "WINDOWS/LINUX · LAN/WIFI · TROUBLESHOOTING", color: "cyan" },
                      { name: "PROGRAMMING", val: "PYTHON · SQL · HTML/CSS · JAVASCRIPT · PHP · REACT", color: "yellow" },
                      { name: "TOOLS", val: "GIT · GITHUB · VS CODE · DOCKER · JIRA", color: "green" },
                    ].map((s, i) => (
                      <motion.div
                        key={s.name}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.03, x: 5 }}
                        onMouseEnter={() => sfx.hover()}
                        className="border-2 border-white p-4 cursor-pointer"
                      >
                        <p className={`text-[var(--color-game-${s.color})] mb-2`}>► {s.name}</p>
                        <p>{s.val}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScreenTransition>
            )}

            {screen === "roadmap" && (
              <ScreenTransition keyId="roadmap">
                <div className="pixel-box space-y-6">
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <h2 className="text-4xl text-[var(--color-game-cyan)]">► PLAYER ROADMAP</h2>
                    <p className="text-xl text-[var(--color-game-yellow)]">2018 — NOW</p>
                  </div>
                  <p className="text-xl">MAIN QUEST: BUILDING A CAREER IN CYBERSECURITY WHILE KEEPING WEB DEVELOPMENT ACTIVE.</p>
                  <ol className="relative border-l-4 border-[var(--color-game-cyan)] ml-3 space-y-5 pl-6">
                    {[
                      ["2018 — 2023", "UNIVERSITAS GUNADARMA", "Bachelor of Information Systems · GPA 3.17/4.00."],
                      ["2020 — 2021", "WEB DEVELOPMENT QUEST", "Built Food & Beverage Ordering System using HTML, CSS, JavaScript, PHP, and MySQL."],
                      ["JAN 2023 — DEC 2023", "IT SUPPORT · PT. LAWU CAKRA SARANA", "Windows administration, hardware and network troubleshooting, endpoint security maintenance."],
                      ["FEB 2024 — JUL 2024", "MEME TOKEN WEB DEVELOPMENT", "Built responsive pre-launch websites for meme token projects with token identity, roadmap, and community information."],
                      ["2025", "CYBERSECURITY SKILL PATH", "Completed Google Cybersecurity Professional Certificate and Introduction to SOC training."],
                      ["AUG 2026 — OCT 2026", "QA (MANUAL TESTING) · ADIDATA INFOMATIKA · BANK MANDIRI", "Manual test case execution and bug tracking using Jira."],
                      ["2026 — NOW", "HOME SOC LAB", "Learning Cisco Introduction to Cybersecurity and building Wazuh, Suricata, and log monitoring lab."],
                    ].map((item, index) => (
                      <motion.li
                        key={item[0]}
                        initial={{ x: -24, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.09 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        onMouseEnter={() => sfx.hover()}
                        className="relative border-2 border-[var(--color-game-border)] bg-[var(--color-game-card)] p-4"
                      >
                        <span className="absolute -left-[2.55rem] top-5 w-4 h-4 bg-[var(--color-game-yellow)] border-2 border-[var(--color-game-border)]" />
                        <p className="text-[var(--color-game-text-muted)]">{item[0]}</p>
                        <h3 className="text-2xl text-[var(--color-game-text-primary)]">{item[1]}</h3>
                        <p className="text-xl text-[var(--color-game-text-secondary)]">{item[2]}</p>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </ScreenTransition>
            )}

            {screen === "projects" && (
              <ScreenTransition keyId="projects">
                <div className="pixel-box space-y-6">
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <h2 className="text-4xl text-[var(--color-game-yellow)]">► COMPLETED QUESTS</h2>
                    <p className="text-xl text-[var(--color-game-cyan)]">3 PROJECTS LOGGED</p>
                  </div>

                  <div className="grid gap-4">
                    {[
                      {
                        num: "01",
                        title: "CRYPTO LANDING PAGES",
                        stack: "HTML · CSS · JAVASCRIPT",
                        link: "https://github.com/ulangrahmad/website-owl",
                        note: "Responsive pre-launch website for a meme token, with token identity, roadmap, and community information.",
                      },
                      {
                        num: "02",
                        title: "LYCA DESIGN INDONESIA",
                        stack: "HTML · CSS · JAVASCRIPT",
                        link: "https://github.com/ulangrahmad/Lycadedesign",
                        note: "Architecture and interior design website for LYCA Design Indonesia.",
                      },
                      {
                        num: "03",
                        title: "FOOD & BEVERAGE ORDERING SYSTEM",
                        stack: "HTML · CSS · JAVASCRIPT · PHP · MYSQL",
                        link: "",
                        note: "Online ordering, menu catalog, authentication, and admin flow.",
                      },
                    ].map((p, i) => (
                      <motion.article
                        key={p.num}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.15 }}
                        whileHover={{ x: 8 }}
                        onMouseEnter={() => sfx.hover()}
                        className="border-2 border-[var(--color-game-border)] p-4 space-y-3 bg-[var(--color-game-card)]"
                      >
                        <div className="flex justify-between items-start gap-4 flex-wrap">
                          <div>
                            <p className="text-[var(--color-game-text-muted)]">► PROJECT {p.num}</p>
                            <h3 className="text-2xl text-[var(--color-game-text-primary)]">{p.title}</h3>
                          </div>
                          <span className="text-[var(--color-game-green)]">★ COMPLETED</span>
                        </div>
                        <p className="text-[var(--color-game-yellow)]">STACK: {p.stack}</p>
                        <p className="text-xl text-[var(--color-game-text-secondary)]">{p.note}</p>
                        {p.link ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => sfx.coin()}
                            className="text-[var(--color-game-accent)] underline inline-flex items-center gap-1 hover:text-[var(--color-game-accent-hover)]"
                          >
                            ► VIEW REPO <ArrowRight size={16} />
                          </a>
                        ) : (
                          <p className="text-[var(--color-game-pink)]">PRIVATE / NO PUBLIC LINK</p>
                        )}
                      </motion.article>
                    ))}
                  </div>
                </div>
              </ScreenTransition>
            )}

            {screen === "gallery" && (
              <ScreenTransition keyId="gallery">
                <div className="pixel-box">
                  <ProjectGallery />
                </div>
              </ScreenTransition>
            )}

            {screen === "contact" && (
              <ScreenTransition keyId="contact">
                <div className="pixel-box space-y-4">
                  <h2 className="text-4xl text-[var(--color-game-yellow)]">► SAVE POINT / CONTACT</h2>
                  <div className="space-y-3 text-xl">
                    {[
                      ["EMAIL", "ulangrahmad121@gmail.com", "mailto:ulangrahmad121@gmail.com", <Mail size={20} />],
                      ["LINKEDIN", "ULANG RAHMAD CHOLIQ", "https://www.linkedin.com/in/ulang-rahmad-choliq-4a565b377/", <Link size={20} />],
                      ["GITHUB", "github.com/ulangrahmad", "https://github.com/ulangrahmad", <Link size={20} />],
                      ["RESUME", "DOWNLOAD CV.PDF", "/cv-ulang-rahmad-choliq.pdf", <ArrowRight size={20} />],
                    ].map(([label, val, href, icon], i) => (
                      <motion.a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        download={href.endsWith(".pdf")}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 5 }}
                        onMouseEnter={() => sfx.hover()}
                        className="flex justify-between border-2 border-white p-3"
                      >
                        <span className="text-[var(--color-game-cyan)] flex items-center gap-2">{icon} {label}</span>
                        <span>{val}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </ScreenTransition>
            )}
          </div>

          <motion.div
            className="text-center text-sm opacity-70 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 }}
          >
            © {new Date().getFullYear()} ULNGRHMD · END OF TRANSMISSION
          </motion.div>
        </>
      )}
    </div>
  );
}