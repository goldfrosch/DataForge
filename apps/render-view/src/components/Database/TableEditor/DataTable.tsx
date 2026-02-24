import { Fragment } from "react";
import { Button } from "@/components/@Common";
import type { IColumn, TableDataRow } from "@/types/TableData.type";
import * as styles from "./DataTable.css";

interface DataTableProps {
  columns: IColumn[];
  rows: TableDataRow[];
  onColumnChange: (
    colId: string,
    updates: { name?: string; type?: IColumn["type"] },
  ) => void;
  onRemoveColumn: (col: IColumn) => void;
  onCellChange: (
    rowIndex: number,
    columnName: string,
    value: string | number | boolean,
  ) => void;
  onRemoveRow: (rowIndex: number) => void;
}

export function DataTable({
  columns,
  rows,
  onColumnChange,
  onRemoveColumn,
  onCellChange,
  onRemoveRow,
}: DataTableProps) {
  return (
    <div className={styles.dataTableContainer}>
      <div
        className={styles.dataTableGrid}
        style={{
          gridTemplateColumns: `48px repeat(${columns.length}, 250px)`,
        }}
      >
        {/* Header Row */}
        <div className={styles.dataTableHeaderAction} />
        {columns.map((col) => (
          <div key={col.id} className={styles.dataTableHeader}>
            <input
              type="text"
              value={col.name}
              onChange={(e) => onColumnChange(col.id, { name: e.target.value })}
              className={styles.dataTableHeaderInput}
              placeholder="Column name"
            />
            <select
              value={col.type}
              onChange={(e) =>
                onColumnChange(col.id, {
                  type: e.target.value as IColumn["type"],
                })
              }
              className={styles.dataTableHeaderSelect}
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
            </select>
            <Button
              type="button"
              variant="none"
              size="s"
              className={styles.dataTableHeaderDelete}
              onClick={() => onRemoveColumn(col)}
            >
              ×
            </Button>
          </div>
        ))}

        {/* Data Rows */}
        {rows.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            <div className={styles.dataTableRowDeleteCell}>
              <Button
                type="button"
                variant="none"
                size="s"
                className={styles.dataTableRowDeleteButton}
                onClick={() => onRemoveRow(rowIndex)}
              >
                ×
              </Button>
            </div>
            {columns.map((col) => (
              <div
                key={`${rowIndex}-${col.id}`}
                className={styles.dataTableCell}
              >
                {col.type === "boolean" ? (
                  <input
                    type="checkbox"
                    checked={Boolean(row[col.name])}
                    onChange={(e) =>
                      onCellChange(rowIndex, col.name, e.target.checked)
                    }
                    className={styles.dataTableCheckbox}
                  />
                ) : (
                  <input
                    type={col.type === "number" ? "number" : "text"}
                    value={
                      row[col.name] !== undefined && row[col.name] !== null
                        ? String(row[col.name])
                        : ""
                    }
                    onChange={(e) => {
                      const raw = e.target.value;
                      const value = col.type === "number" ? Number(raw) : raw;
                      onCellChange(rowIndex, col.name, value);
                    }}
                    className={styles.dataTableInput}
                  />
                )}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
