import { useEffect, useState } from "react";
import { Button } from "@/components/@Common";
import * as styles from "./TableEditor.css";
import {
  useGetTableDataHook,
  useSaveTableDataMutation,
} from "@/hooks/UseElectronEvent.hook";
import type { IColumn, TableDataRow } from "@/types/TableData.type";

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
          <Button
            variant="primary"
            size="m"
            onClick={handleSave}
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
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
          <table className={styles.tableEditorTable}>
            <thead style={{ display: "flex" }}>
              {columns.map((col) => (
                <th key={col.id} className={styles.tableEditorTh}>
                  <input
                    type="text"
                    value={col.name}
                    onChange={(e) =>
                      handleColumnChange(col.id, { name: e.target.value })
                    }
                    className={styles.tableEditorHeaderInput}
                    placeholder="Column name"
                  />
                  <select
                    value={col.type}
                    onChange={(e) =>
                      handleColumnChange(col.id, {
                        type: e.target.value as IColumn["type"],
                      })
                    }
                    className={styles.tableEditorHeaderSelect}
                  >
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="boolean">boolean</option>
                  </select>
                  <Button
                    type="button"
                    variant="none"
                    size="s"
                    className={styles.tableEditorThDelete}
                    onClick={() => handleRemoveColumn(col)}
                  >
                    ×
                  </Button>
                </th>
              ))}
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td key={col.id} className={styles.tableEditorTd}>
                      {col.type === "boolean" ? (
                        <input
                          type="checkbox"
                          checked={Boolean(row[col.name])}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex,
                              col.name,
                              e.target.checked,
                            )
                          }
                          className={styles.tableEditorInput}
                        />
                      ) : (
                        <input
                          type={col.type === "number" ? "number" : "text"}
                          value={
                            row[col.name] !== undefined &&
                            row[col.name] !== null
                              ? String(row[col.name])
                              : ""
                          }
                          onChange={(e) => {
                            const raw = e.target.value;
                            const value =
                              col.type === "number"
                                ? (Number(raw) as number)
                                : raw;
                            handleCellChange(rowIndex, col.name, value);
                          }}
                          className={styles.tableEditorInput}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
