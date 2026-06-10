import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { projects } from "@/data/projects";
import styles from "./project.module.css";

// This helps Next.js generate static pages for each project during build
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Voltar para o início
      </Link>

      <div className={styles.imageWrapper}>
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 800px) 100vw, 800px"
          className={styles.image}
          priority
        />
      </div>

      <article className={styles.content}>
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </article>
    </main>
  );
}
