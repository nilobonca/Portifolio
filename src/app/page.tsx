import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ThemeToggle from "@/components/ThemeToggle";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Juan Rego.</div>
        <ThemeToggle />
      </header>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Olá, eu sou o Juan Rego. <br />
              <span className={styles.highlight}>Desenvolvedor de Software</span> focado em produzir com eficiência e inteligência.
            </h1>
            <p className={styles.subtitle}>
              Bem-vindo ao meu portfólio. Explore meus projetos abaixo.
            </p>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.imageBox}>
              <Image src="/avatar.png" alt="Foto de Juan Rego" fill sizes="250px" quality={100} className={styles.avatarImage} priority />
            </div>
          </div>
        </section>

        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>Sobre mim</h2>
          <p className={styles.aboutText}>
            Sou apaixonado por tecnologia e programação. Especializado em desenvolvimento web,
            busco sempre resolver problemas complexos com soluções simples, elegantes e de alta performance.
            Sem esquecer o design e usabilidade.
          </p>
        </section>

        {/* Projects Section */}
        <section className={styles.projects}>
          <h2 className={styles.sectionTitle}>Projetos em Destaque</h2>
          <div className={styles.grid}>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
                link={`/projetos/${project.id}`}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Juan Rego. Todos os direitos reservados.</p>
        <div className={styles.socials}>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
