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
    win?.isMaximized() ? win?.unmaximize() : win?.maximize();
  });
  ipcMain.handle("win:close", () => win?.close());
  createWindow();
});
