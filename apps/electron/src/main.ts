import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import type {
  ConfigType,
  DatabaseJsonType,
  TableType,
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

app.whenReady().then(() => {
  ipcMain.handle("electron:ping", () => {
    console.log("pong!");
  });

  ipcMain.handle("electron:loadAllProjects", async () => {
    const result: ConfigType = JSON.parse(
      await readFile(path.join(__dirname, "config.json"), "utf-8")
    );

    return result;
  });

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

        // 파일에 저장
        await writeFile(
          databaseFilePath,
          JSON.stringify(database, null, 2),
          "utf-8"
        );

        return database.tables;
      } catch (error) {
        console.error("Failed to create table:", error);
        throw error;
      }
    }
  );

  // 테이블 목록 가져오기
  ipcMain.handle(
    "electron:getTables",
    async (_, projectPath: string): Promise<TableType[]> => {
      try {
        const databaseFilePath = path.join(
          projectPath,
          "dataForge",
          "database.json"
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
    }
  );

  createWindow();
});
