import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createWindow } from "./window";
import {
  registerProjectIpc,
  registerWindowIpc,
  registerDatabaseIpc,
} from "./ipc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.MODE !== "build";

process.env.DIST = path.join(__dirname, "../../render-view/dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null = null;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    win = createWindow({ dirname: __dirname, isDev });
    registerProjectIpc(win);
    registerWindowIpc(win);
  }
});

app.whenReady().then(() => {
  win = createWindow({ dirname: __dirname, isDev });
  registerProjectIpc(win);
  registerWindowIpc(win);
  registerDatabaseIpc();
});
