/**
 * DB·테이블 관련 IPC (getTables, getTableData, saveTableData, createTable).
 */

import { ipcMain } from "electron";
import type { TableType, TableDataJsonType } from "../types/config.type";
import {
  loadDatabase,
  getTablesFromPayload,
  getTableDataFromPayload,
  saveTableDataInDatabase,
  createTableInDatabase,
} from "../database-binary";

export function registerDatabaseIpc(): void {
  ipcMain.handle(
    "electron:createTable",
    async (_, projectPath: string, tableName: string): Promise<TableType[]> => {
      try {
        return await createTableInDatabase(projectPath, tableName);
      } catch (error) {
        console.error("Failed to create table:", error);
        throw error;
      }
    },
  );

  ipcMain.handle(
    "electron:getTables",
    async (_, projectPath: string): Promise<TableType[]> => {
      try {
        const payload = await loadDatabase(projectPath);
        return getTablesFromPayload(payload);
      } catch (error) {
        console.error("Failed to get tables:", error);
        return [];
      }
    },
  );

  ipcMain.handle(
    "electron:getTableData",
    async (
      _,
      projectPath: string,
      tableName: string,
    ): Promise<TableDataJsonType | null> => {
      try {
        const payload = await loadDatabase(projectPath);
        return getTableDataFromPayload(payload, tableName);
      } catch (error) {
        console.error("Failed to get table data:", error);
        return null;
      }
    },
  );

  ipcMain.handle(
    "electron:saveTableData",
    async (
      _,
      projectPath: string,
      tableName: string,
      payload: TableDataJsonType,
    ): Promise<void> => {
      await saveTableDataInDatabase(projectPath, tableName, payload);
    },
  );
}
