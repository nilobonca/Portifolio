"use client";

import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "@/app/page.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectData } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient({ projects }: { projects: ProjectData[] }) {
  const container = useRef(null);

  useGSAP(() => {
    // Hero entry animation
    gsap.from(".hero-anim", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    });

    // About text scrub reveal
    gsap.fromTo(
      ".about-text",
      { opacity: 0.1, y: 20 },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "center center",
          scrub: 0.5,
        },
      }
    );

    // Projects stagger reveal
    gsap.from(".project-card", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 75%",
      },
    });
  }, { scope: container });

  return (
    <div className={styles.container} ref={container}>
      <header className={styles.header}>
        <div className={styles.logo}>Juan Rego.</div>
        <ThemeToggle />
      </header>

      <main className={styles.main}>
        {/* Cinematic Hero Section */}
        <section className={styles.hero}>
          <div className={`${styles.heroImageWrapper} hero-anim`}>
            <div className={styles.imageBox}>
              <Image src="/avatar.png" alt="Foto de Juan Rego" fill sizes="160px" quality={100} className={styles.avatarImage} priority />
            </div>
          </div>
          <div className={`${styles.heroContent} hero-anim`}>
            <h1 className={styles.title}>
              Desenvolvedor de Software focado em produzir com <span className={styles.highlight}>eficiência</span>.
            </h1>
            <p className={styles.subtitle}>
              Olá, eu sou o Juan Rego. Bem-vindo ao meu portfólio.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className={`${styles.about} about-section`}>
          <h2 className={`${styles.sectionTitle} hero-anim`}>Sobre mim</h2>
          <p className={`${styles.aboutText} about-text`}>
            Sou apaixonado por tecnologia e programação. Especializado em desenvolvimento web,
            busco sempre resolver problemas complexos com soluções simples, elegantes e de alta performance.
            Sem esquecer o design e usabilidade.
          </p>
        </section>

        {/* Gapless Bento Grid Projects */}
        <section className={`${styles.projects} projects-section`}>
          <h2 className={styles.sectionTitle}>Projetos</h2>
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <div key={project.id} className="project-card" style={{ height: '100%' }}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  imageUrl={project.imageUrl}
                  link={`/projetos/${project.id}`}
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Juan Rego. Todos os direitos reservados.</p>
        <div className={styles.socials}>
          <a href="https://github.com/nilobonca" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/juanrego/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
