import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import ProjectGallery from "@/components/ProjectGallery";
import styles from "./project.module.css";

// This helps Next.js generate static pages for each project during build
export function generateStaticParams() {
  const projects = getAllProjects();
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
  const project = getProjectBySlug(id);

  if (!project) {
    notFound();
  }

  const images = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.imageUrl];

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← Voltar para o início
      </Link>

      <ProjectGallery images={images} title={project.title} />

      <article className={styles.content}>
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </article>
    </main>
  );
}
