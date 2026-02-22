import type { IProject } from "@/types/Project.type";
import * as styles from "./ProjectList.css";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  list: IProject[];
}

export function ProjectList({ list }: ProjectListProps) {
  if (list.length === 0) {
    return null;
  }

  return (
    <div className={styles.projectListLayout}>
      {list.map((item) => (
        <ProjectCard key={item.uuid} project={item} />
      ))}
    </div>
  );
}
