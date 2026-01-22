import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFile } from "fs/promises";
import type { ConfigType } from "./types/config.type";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.MODE !== 'build';

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
    win.loadURL('http://localhost:5173');
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

    result.projects.flatMap((value) => {
      value.tables = [2, 54, 3, 4, 56];
    });

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
  createWindow();
});
