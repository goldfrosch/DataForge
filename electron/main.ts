import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null = null;
const preload = path.join(__dirname, "preload.js");
const url = process.env.VITE_DEV_SERVER_URL;
const iconPath = process.env.VITE_PUBLIC ?? "";
const distPath = process.env.DIST ?? "";

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 960,
    icon: path.join(iconPath, "vite.svg"),
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      // devTools: false,
    },
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (url) {
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(distPath, "index.html"));
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

app.whenReady().then(createWindow);
