import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import type {
  ConfigType,
  DatabaseJsonType,
  TableType,
  TableDataJsonType,
  ProjectType,
} from "./types/config.type";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.MODE !== "build";

process.env.DIST = path.join(__dirname, "../../render-view/dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 960,
    backgroundColor: "#1a1a1a",
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      // devTools: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "render-view/index.html"));
  }

  // 최대화 상태 변경 이벤트 리스너
  win.on("maximize", () => {
    win?.webContents.send("win:maximize-changed", true);
  });
  win.on("unmaximize", () => {
    win?.webContents.send("win:maximize-changed", false);
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function getConfigPath(): string {
  return path.join(app.getPath("userData"), "dataforge-config.json");
}

app.whenReady().then(() => {
  ipcMain.handle("electron:ping", () => {
    console.log("pong!");
  });

  ipcMain.handle("electron:loadAllProjects", async (): Promise<ConfigType> => {
    const configPath = getConfigPath();
    if (!existsSync(configPath)) {
      return { projects: [] };
    }
    try {
      const raw = await readFile(configPath, "utf-8");
      return JSON.parse(raw) as ConfigType;
    } catch {
      return { projects: [] };
    }
  });

  ipcMain.handle(
    "electron:saveProjects",
    async (_, config: ConfigType): Promise<void> => {
      const configPath = getConfigPath();
      const dir = path.dirname(configPath);
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
    },
  );

  ipcMain.handle(
    "electron:showOpenDirectoryDialog",
    async (): Promise<string | null> => {
      const result = await dialog.showOpenDialog(win!, {
        properties: ["openDirectory"],
        title: "Select project folder",
      });
      if (result.canceled || result.filePaths.length === 0) return null;
      return result.filePaths[0];
    },
  );

  ipcMain.handle(
    "electron:addProject",
    async (
      _,
      project: Omit<ProjectType, "uuid" | "tableCount"> & { uuid?: number },
    ): Promise<ConfigType> => {
      const configPath = getConfigPath();
      let config: ConfigType = { projects: [] };
      if (existsSync(configPath)) {
        try {
          const raw = await readFile(configPath, "utf-8");
          config = JSON.parse(raw) as ConfigType;
        } catch {
          config = { projects: [] };
        }
      }
      const maxUuid =
        config.projects.length > 0
          ? Math.max(...config.projects.map((p) => p.uuid))
          : 0;
      const newProject: ProjectType = {
        projectName: project.projectName,
        projectPath: project.projectPath,
        type: project.type,
        isConnect: project.isConnect ?? false,
        uuid: project.uuid ?? maxUuid + 1,
        tableCount: 0,
      };
      config.projects.push(newProject);
      const dir = path.dirname(configPath);
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
      return config;
    },
  );

  ipcMain.handle("win:minimize", () => win?.minimize());

  ipcMain.handle("win:toggleMaximize", () => {
    if (win?.isMaximized()) {
      win.unmaximize();
    } else {
      win?.maximize();
    }
    // 최대화 상태 변경 후 현재 상태를 반환
    return win?.isMaximized() ?? false;
  });

  ipcMain.handle("win:isMaximized", () => {
    return win?.isMaximized() ?? false;
  });

  ipcMain.handle("win:close", () => win?.close());

  // 테이블 생성
  ipcMain.handle(
    "electron:createTable",
    async (_, projectPath: string, tableName: string): Promise<TableType[]> => {
      try {
        const dataForgePath = path.join(projectPath, ".dataForge");
        const databaseFilePath = path.join(dataForgePath, "database.json");

        // dataForge 디렉토리 생성 (존재하지 않으면)
        if (!existsSync(dataForgePath)) {
          await mkdir(dataForgePath, { recursive: true });
        }

        // 기존 데이터 로드 또는 새로 생성
        let database: DatabaseJsonType = { tables: [] };

        if (existsSync(databaseFilePath)) {
          const data = await readFile(databaseFilePath, "utf-8");
          database = JSON.parse(data);
        }

        // 새 테이블 추가
        const newTable: TableType = {
          name: tableName,
          createdAt: new Date().toISOString(),
        };

        database.tables.push(newTable);

        await writeFile(
          databaseFilePath,
          JSON.stringify(database, null, 2),
          "utf-8",
        );

        // 빈 테이블 데이터 파일 생성 (columns, rows)
        const tablesDir = path.join(dataForgePath, "tables");
        await mkdir(tablesDir, { recursive: true });
        const tableDataPath = path.join(
          tablesDir,
          `${tableName.replace(/[^a-zA-Z0-9_-]/g, "_")}.json`,
        );
        const initialTableData: TableDataJsonType = {
          columns: [],
          rows: [],
        };
        await writeFile(
          tableDataPath,
          JSON.stringify(initialTableData, null, 2),
          "utf-8",
        );

        return database.tables;
      } catch (error) {
        console.error("Failed to create table:", error);
        throw error;
      }
    },
  );

  // 테이블 목록 가져오기
  ipcMain.handle(
    "electron:getTables",
    async (_, projectPath: string): Promise<TableType[]> => {
      try {
        const databaseFilePath = path.join(
          projectPath,
          ".dataForge",
          "database.json",
        );

        if (!existsSync(databaseFilePath)) {
          return [];
        }

        const data = await readFile(databaseFilePath, "utf-8");
        const database: DatabaseJsonType = JSON.parse(data);

        return database.tables || [];
      } catch (error) {
        console.error("Failed to get tables:", error);
        return [];
      }
    },
  );

  function sanitizeTableFileName(name: string): string {
    return name.replace(/[^a-zA-Z0-9_-]/g, "_");
  }

  // 테이블 데이터 가져오기 (컬럼 + 행)
  ipcMain.handle(
    "electron:getTableData",
    async (
      _,
      projectPath: string,
      tableName: string,
    ): Promise<TableDataJsonType | null> => {
      try {
        const tableFilePath = path.join(
          projectPath,
          ".dataForge",
          "tables",
          `${sanitizeTableFileName(tableName)}.json`,
        );

        if (!existsSync(tableFilePath)) {
          return null;
        }

        const data = await readFile(tableFilePath, "utf-8");
        return JSON.parse(data) as TableDataJsonType;
      } catch (error) {
        console.error("Failed to get table data:", error);
        return null;
      }
    },
  );

  // 테이블 데이터 저장 (컬럼 + 행)
  ipcMain.handle(
    "electron:saveTableData",
    async (
      _,
      projectPath: string,
      tableName: string,
      payload: TableDataJsonType,
    ): Promise<void> => {
      const tablesDir = path.join(projectPath, ".dataForge", "tables");
      if (!existsSync(tablesDir)) {
        await mkdir(tablesDir, { recursive: true });
      }
      const tableFilePath = path.join(
        tablesDir,
        `${sanitizeTableFileName(tableName)}.json`,
      );
      await writeFile(
        tableFilePath,
        JSON.stringify(payload, null, 2),
        "utf-8",
      );
    },
  );

  createWindow();
});
