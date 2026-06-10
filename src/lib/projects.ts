import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "public", "projects");

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  content: string;
}

export function getAllProjects(): ProjectData[] {
  // Ensure the directory exists to avoid errors on fresh clones
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const folderNames = fs.readdirSync(projectsDirectory);
  
  const allProjectsData = folderNames
    .filter((folderName) => {
      const folderPath = path.join(projectsDirectory, folderName);
      return fs.statSync(folderPath).isDirectory();
    })
    .map((folderName) => {
      const id = folderName;
      const fullPath = path.join(projectsDirectory, id, "index.md");
      
      if (!fs.existsSync(fullPath)) return null;

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      
      let imageUrl = matterResult.data.imageUrl;
      if (imageUrl && !imageUrl.startsWith("/") && !imageUrl.startsWith("http")) {
        imageUrl = `/projects/${id}/${imageUrl}`;
      }

      return {
        id,
        content: matterResult.content,
        ...(matterResult.data as Omit<ProjectData, "id" | "content">),
        imageUrl,
      };
    })
    .filter(Boolean) as ProjectData[];

  return allProjectsData;
}

export function getProjectBySlug(id: string): ProjectData | undefined {
  const fullPath = path.join(projectsDirectory, id, "index.md");
  
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  
  let imageUrl = matterResult.data.imageUrl;
  if (imageUrl && !imageUrl.startsWith("/") && !imageUrl.startsWith("http")) {
    imageUrl = `/projects/${id}/${imageUrl}`;
  }

  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as Omit<ProjectData, "id" | "content">),
    imageUrl,
  };
}
