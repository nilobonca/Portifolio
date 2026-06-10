import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  priority?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  link = "#",
  priority = false,
}: ProjectCardProps) {
  const isExternal = link.startsWith("http");

  if (isExternal) {
    return (
      <a href={link} className={styles.card} target="_blank" rel="noopener noreferrer">
        <div className={styles.imageContainer}>
          <Image src={imageUrl} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.image} priority={priority} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    );
  }

  return (
    <Link href={link} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={imageUrl} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.image} priority={priority} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
