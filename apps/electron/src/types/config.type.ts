export type ProjectType = {
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

export type ColumnType = {
  id: string;
  name: string;
  type: "string" | "number" | "boolean";
};

export type TableDataRowType = Record<string, string | number | boolean>;

export type TableDataJsonType = {
  columns: ColumnType[];
  rows: TableDataRowType[];
};

export type ConfigType = {
  projects: ProjectType[];
};
