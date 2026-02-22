export interface IColumn {
  id: string;
  name: string;
  type: "string" | "number" | "boolean";
}

export type TableDataRow = Record<string, string | number | boolean>;

export interface ITableData {
  columns: IColumn[];
  rows: TableDataRow[];
}
