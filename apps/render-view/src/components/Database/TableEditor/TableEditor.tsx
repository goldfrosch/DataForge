import { useEffect, useState } from "react";
import { Button } from "@/components/@Common";
import * as styles from "./TableEditor.css";
import {
  useGetTableDataHook,
  useSaveTableDataMutation,
} from "@/hooks/UseElectronEvent.hook";
import type { IColumn, TableDataRow } from "@/types/TableData.type";
import { DataTable } from "./DataTable";

interface TableEditorProps {
  projectPath: string;
  tableName: string;
}

function generateColumnId(): string {
  return `col_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function emptyRow(columns: IColumn[]): TableDataRow {
  return columns.reduce<TableDataRow>((acc, col) => {
    acc[col.name] =
      col.type === "number" ? 0 : col.type === "boolean" ? false : "";
    return acc;
  }, {});
}

export function TableEditor({ projectPath, tableName }: TableEditorProps) {
  const { data: tableData, isLoading } = useGetTableDataHook(
    projectPath,
    tableName,
  );
  const saveMutation = useSaveTableDataMutation();

  const [columns, setColumns] = useState<IColumn[]>([]);
  const [rows, setRows] = useState<TableDataRow[]>([]);

  const handleAddColumn = () => {
    const name = `Column${columns.length + 1}`;
    const newCol: IColumn = {
      id: generateColumnId(),
      name,
      type: "string",
    };
    setColumns((prev) => [...prev, newCol]);
    setRows((prev) => prev.map((row) => ({ ...row, [name]: "" })));
  };

  const handleRemoveColumn = (col: IColumn) => {
    setColumns((prev) => prev.filter((c) => c.id !== col.id));
    setRows((prev) =>
      prev.map((row) => {
        const next = { ...row };
        delete next[col.name];
        return next;
      }),
    );
  };

  const handleColumnChange = (
    colId: string,
    updates: { name?: string; type?: IColumn["type"] },
  ) => {
    setColumns((prev) =>
      prev.map((c) => {
        if (c.id !== colId) return c;
        const next = { ...c, ...updates };
        if (updates.name !== undefined && updates.name !== c.name) {
          setRows((r) =>
            r.map((row) => {
              const newRow = { ...row };
              newRow[updates.name!] = row[c.name];
              delete newRow[c.name];
              return newRow;
            }),
          );
        }
        return next;
      }),
    );
  };

  const handleAddRow = () => {
    setRows((prev) => [...prev, emptyRow(columns)]);
  };

  const handleRemoveRow = (rowIndex: number) => {
    setRows((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  const handleCellChange = (
    rowIndex: number,
    columnName: string,
    value: string | number | boolean,
  ) => {
    setRows((prev) => {
      const next = [...prev];
      next[rowIndex] = { ...next[rowIndex], [columnName]: value };
      return next;
    });
  };

  const handleSave = () => {
    saveMutation.mutate({
      projectPath,
      tableName,
      data: { columns, rows },
    });
  };

  useEffect(() => {
    if (tableData) {
      setColumns(tableData.columns);
      setRows(tableData.rows);
    } else if (!isLoading) {
      setColumns([]);
      setRows([]);
    }
  }, [tableData, isLoading]);

  if (isLoading) {
    return (
      <div className={styles.tableEditorLayout}>
        <div className={styles.tableEditorEmpty}>Loading table...</div>
      </div>
    );
  }

  return (
    <div className={styles.tableEditorLayout}>
      <div className={styles.tableEditorToolbar}>
        <h2 className={styles.tableEditorTitle}>{tableName}</h2>
        <div className={styles.tableEditorToolbarActions}>
          <Button variant="none" size="m" onClick={handleAddColumn}>
            Add column
          </Button>
          <Button
            variant="none"
            size="m"
            onClick={handleAddRow}
            disabled={columns.length === 0}
          >
            Add row
          </Button>
        </div>
        <Button
          variant="primary"
          size="m"
          onClick={handleSave}
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
      <div className={styles.tableEditorGridWrap}>
        {columns.length === 0 ? (
          <div className={styles.tableEditorEmpty}>
            <p>No columns yet. Add a column to define the table structure.</p>
            <Button variant="primary" size="m" onClick={handleAddColumn}>
              Add column
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            rows={rows}
            onColumnChange={handleColumnChange}
            onRemoveColumn={handleRemoveColumn}
            onCellChange={handleCellChange}
            onRemoveRow={handleRemoveRow}
          />
        )}
      </div>
    </div>
  );
}
