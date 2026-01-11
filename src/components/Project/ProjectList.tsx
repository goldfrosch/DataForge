import type { IProject } from "@/types/Project.type";
import * as styles from "./ProjectList.css";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  list: IProject[];
}

export function ProjectList({ list }: ProjectListProps) {
  if (list.length === 0) {
    // TODO: 프로젝트 없을 때의 UI 따로 표현해주기
    return null;
  }

  return (
    <div className={styles.projectListLayout}>
      {list.map((item) => (
        <ProjectCard key={item.id} project={item} />
      ))}
    </div>
  );
}
