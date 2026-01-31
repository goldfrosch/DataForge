type ProjectType = {
  uuid: number;
  type: "unreal" | "unity";
  isConnect: boolean;
  projectName: string;
  projectPath: string;
  tableCount: number;
};

export type TableType = {
  name: string;
  createdAt: string;
};

export type DatabaseJsonType = {
  tables: TableType[];
};

export type ConfigType = {
  projects: ProjectType[];
};
