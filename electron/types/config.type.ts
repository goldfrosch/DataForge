type ProjectType = {
  uuid: number;
  type: "unreal";
  isConnect: boolean;
  projectName: string;
  projectPath: string;
  tables: unknown[];
};

export type ConfigType = {
  projects: ProjectType[];
};
