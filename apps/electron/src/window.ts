/**
 * 메인 윈도우 생성 및 설정.
 */

import { BrowserWindow } from "electron";
import path from "node:path";

export type CreateWindowOptions = {
  /** preload 등 경로 계산용 __dirname (main.ts 기준). */
  dirname: string;
  isDev: boolean;
};

export function createWindow(options: CreateWindowOptions): BrowserWindow {
  const { dirname, isDev } = options;
  const win = new BrowserWindow({
    width: 1440,
    height: 960,
    backgroundColor: "#1a1a1a",
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(dirname, "render-view/index.html"));
  }

  win.on("maximize", () => {
    win.webContents.send("win:maximize-changed", true);
  });
  win.on("unmaximize", () => {
    win.webContents.send("win:maximize-changed", false);
  });

  return win;
}
