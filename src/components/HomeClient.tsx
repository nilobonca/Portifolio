"use client";

import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "@/app/page.module.css";
import { useRef } from "react";

const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
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

    gsap.from(".contact-section", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 85%",
      },
    });
  }, { scope: container });

  return (
    <div className={styles.container} ref={container}>
      <header className={styles.header}>
        <div className={styles.logo}>Juan Rego.</div>
        <div className={styles.headerActions}>
          <a href="https://wa.me/5521986200124" className={styles.headerContactButton} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <WhatsAppIcon size={14} />
            +55 21 9862-00124
          </a>
          <ThemeToggle />
        </div>
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
            Sou apaixonado por produzir, tecnologia e solção de problemas. Especializado em desenvolvimento web,
            busco sempre resolver necessidades e ideias com soluções simples, elegantes e de alta performance.
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

        <section className={`${styles.contact} contact-section`}>
          <div className={styles.contactEyebrow}>Disponível para novos projetos</div>
          <h2 className={styles.contactTitle}>Vamos criar algo incrível juntos.</h2>
          <a href="https://wa.me/5521986200124" className={styles.contactButton} target="_blank" rel="noopener noreferrer">
            <span className={styles.contactButtonText}>+55 21 9862-00124</span>
            <span className={styles.contactButtonIconWrapper}>
              <WhatsAppIcon size={20} />
            </span>
          </a>
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
