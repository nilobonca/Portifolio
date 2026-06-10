import HomeClient from "@/components/HomeClient";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return <HomeClient projects={projects} />;
}
