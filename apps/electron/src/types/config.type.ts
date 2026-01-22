type ProjectType = {
  uuid: number;
  type: "unreal";
  isConnect: boolean;
  projectName: string;
  projectPath: string;
  tableCount: number;
};

type DatabaseType = {
  uuid: number;
  type: "csv";
  dataName: string;
  row: number;
};

export type ConfigType = {
  projects: ProjectType[];
};
